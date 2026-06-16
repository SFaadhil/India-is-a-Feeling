// ============================================================
// IIAF — AIESEC GIS v2 REST → Supabase Sync
// Endpoint: https://api.aiesec.org/v2/opportunities.json
// Auth:     ?access_token=TOKEN  (query param, not header)
// India MC: 1585  (confirmed via /committees/1585.json)
//
// Usage:  node sync.js              (full sync)
//         node sync.js --dry-run    (fetch + count, no DB write)
// ============================================================

import { config }    from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createClient } from '@supabase/supabase-js';

// Load .env from project root (one level up from /sync)
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, '../.env') });

// ── Config ──────────────────────────────────────────────────
const AIESEC_TOKEN = process.env.AIESEC_TOKEN;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const INDIA_MC_ID  = process.env.INDIA_MC_ID || '1585';   // AIESEC in India
const PER_PAGE     = 50;

const BASE = 'https://api.aiesec.org/v2';

// Programme IDs → opportunity type
const PROGRAMME_MAP = {
    1: 'igv',   // Global Volunteer
    2: 'igta',  // Global Talent
    5: 'igte',  // Global Teacher
    7: 'igv',   // New platform uses 7 for IGV
    8: 'igta',
    9: 'igte',
};

// ── Validate env ────────────────────────────────────────────
function assertEnv({ supabaseRequired = true } = {}) {
    const missing = [];
    if (!AIESEC_TOKEN) missing.push('AIESEC_TOKEN');
    if (supabaseRequired) {
        if (!SUPABASE_URL) missing.push('SUPABASE_URL');
        if (!SUPABASE_KEY) missing.push('SUPABASE_SERVICE_KEY');
    }
    if (missing.length) {
        console.error('Missing environment variables:', missing.join(', '));
        process.exit(1);
    }
}

// ── REST helper ─────────────────────────────────────────────
async function apiGet(path, params = {}) {
    const qs = new URLSearchParams({
        access_token: AIESEC_TOKEN,
        ...params,
    });
    // home_mcs[] must be appended manually (URLSearchParams encodes brackets)
    const url = `${BASE}${path}?${qs}&home_mcs[]=${INDIA_MC_ID}`;

    const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`API ${res.status} for ${path}: ${body.slice(0, 200)}`);
    }
    return res.json();
}

// ── Transform API record → Supabase row ─────────────────────
function transform(o, syncedAt) {
    const type     = PROGRAMME_MAP[o.programme_id] ?? 'igv';
    const fee      = Math.round(o.programme_fees?.programme_fee ?? o.fee ?? 0);
    const durMin   = o.duration_min ?? o.min_duration ?? 4;
    const durMax   = o.duration_max ?? o.max_duration ?? durMin;
    const duration = durMin === durMax
        ? `${durMin} Week${durMin !== 1 ? 's' : ''}`
        : `${durMin}–${durMax} Weeks`;

    // Strip HTML tags from description
    const rawDesc  = o.description ?? o.background ?? '';
    const desc     = rawDesc.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

    return {
        id:            Number(o.id),
        title:         (o.title ?? 'Untitled').trim(),
        description:   desc,
        type,
        project:       o.project_name ?? o.project?.name ?? null,
        organisation:  o.organisation?.name ?? o.host_organisation?.name ?? null,
        lc:            o.home_lc?.name ?? o.home_committee?.name ?? null,
        sdg:           o.sdg_goal?.goal_index ?? o.sdg ?? null,
        fee,
        accommodation: o.specifics_info?.accommodation_provided
                       ?? o.accommodation_provided
                       ?? false,
        duration,
        start_date:    o.earliest_start_date ?? o.start_date ?? null,
        end_date:      o.latest_end_date ?? o.end_date ?? null,
        status:        'open',
        link:          `https://aiesec.org/opportunity/${o.id}`,
        synced_at:     syncedAt,
    };
}

// ── Main sync ────────────────────────────────────────────────
async function sync(dryRun = false) {
    assertEnv({ supabaseRequired: !dryRun });

    const supabase  = dryRun ? null : createClient(SUPABASE_URL, SUPABASE_KEY);
    const syncStart = new Date().toISOString();
    const startMs   = Date.now();

    console.log(`[${syncStart}] IIAF sync starting`);
    console.log(`  India MC: ${INDIA_MC_ID}  |  dry-run: ${dryRun}\n`);

    let page       = 1;
    let totalPages = 1;
    const allRows  = [];

    // ── Fetch all pages ──────────────────────────────────────
    do {
        process.stdout.write(`  Page ${page}/${totalPages}… `);

        const json = await apiGet('/opportunities.json', {
            page,
            per_page: PER_PAGE,
        });

        const paging = json.paging ?? {};
        totalPages   = paging.total_pages ?? 1;
        const batch  = json.data ?? [];

        console.log(`${batch.length} records  (total: ${paging.total_items ?? '?'})`);
        allRows.push(...batch.map(o => transform(o, syncStart)));
        page++;
    } while (page <= totalPages);

    console.log(`\n  Fetched ${allRows.length} opportunities total`);

    if (allRows.length === 0) {
        console.log('  Nothing to sync — AIESEC India has 0 open opportunities right now.');
        console.log('  The sync will automatically pick them up when they go live.');
        if (!dryRun) {
            await supabase.from('sync_meta').upsert({
                id: 1, synced_at: syncStart, count: 0,
                duration_ms: Date.now() - startMs,
            });
        }
        return;
    }

    if (dryRun) {
        console.log('\n  [dry-run] First 3 records:');
        allRows.slice(0, 3).forEach(r =>
            console.log(`    ${r.id}  ${r.type.toUpperCase()}  ${r.lc}  "${r.title}"`)
        );
        return;
    }

    // ── Upsert in chunks ─────────────────────────────────────
    console.log('  Upserting to Supabase…');
    const CHUNK = 200;
    for (let i = 0; i < allRows.length; i += CHUNK) {
        const chunk = allRows.slice(i, i + CHUNK);
        const { error } = await supabase
            .from('opportunities')
            .upsert(chunk, { onConflict: 'id' });
        if (error) throw new Error(`Supabase upsert: ${JSON.stringify(error)}`);
        console.log(`    Rows ${i + 1}–${i + chunk.length} ✓`);
    }

    // ── Mark stale rows as closed ────────────────────────────
    await supabase
        .from('opportunities')
        .update({ status: 'closed' })
        .lt('synced_at', syncStart)
        .eq('status', 'open');

    // ── Update sync metadata ──────────────────────────────────
    const ms = Date.now() - startMs;
    await supabase.from('sync_meta').upsert({
        id: 1, synced_at: syncStart, count: allRows.length, duration_ms: ms,
    });

    console.log(`\nDone in ${(ms / 1000).toFixed(1)}s — ${allRows.length} opportunities live.`);
}

// ── Entry point ──────────────────────────────────────────────
const dryRun = process.argv.includes('--dry-run');
sync(dryRun).catch(err => {
    console.error('\nSync failed:', err.message);
    process.exit(1);
});
