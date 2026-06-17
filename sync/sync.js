// ============================================================
// IIAF — AIESEC GIS GraphQL → Supabase Sync
// Endpoint: https://gis-api.aiesec.org/graphql
// Auth:     ?access_token=TOKEN  (query param)
// India MC: 1585
//
// Usage:  node sync.js              (full sync)
//         node sync.js --dry-run    (fetch + count, no DB write)
// ============================================================

import { config }        from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createClient }  from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, '../.env') });

// ── Config ──────────────────────────────────────────────────
const AIESEC_TOKEN = process.env.AIESEC_TOKEN;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const INDIA_MC_ID  = Number(process.env.INDIA_MC_ID || '1585');
const PER_PAGE     = 100;

const GQL_URL = `https://gis-api.aiesec.org/graphql?access_token=${AIESEC_TOKEN}`;

// Programme IDs → opportunity type + URL slug
const PROGRAMME_MAP = {
    1: { type: 'igv',  slug: 'global-volunteer' },
    2: { type: 'igta', slug: 'global-talent'    },
    5: { type: 'igte', slug: 'global-teacher'   },
    7: { type: 'igv',  slug: 'global-volunteer' },
    8: { type: 'igta', slug: 'global-talent'    },
    9: { type: 'igte', slug: 'global-teacher'   },
};

// Statuses considered "open" for public display
const OPEN_STATUSES = ['open', 'approved', 'in_progress'];

// Only fetch opportunities whose end date is today or later
// (null-end-date opportunities are excluded by the API — those are unfinished drafts)
function todayISO() {
    return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

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

// ── GraphQL helper ───────────────────────────────────────────
async function gqlQuery(query, variables = {}) {
    const res = await fetch(GQL_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ query, variables }),
        signal:  AbortSignal.timeout(20000),
    });
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`GQL HTTP ${res.status}: ${body.slice(0, 200)}`);
    }
    const json = await res.json();
    if (json.errors?.length) {
        throw new Error(`GQL error: ${json.errors[0].message}`);
    }
    return json.data;
}

// ── Fetch one page of opportunities ─────────────────────────
const OPPORTUNITY_FIELDS = `
    id
    title
    description
    current_status
    programme       { id short_name }
    home_lc         { name }
    organisation    { name }
    sdg_info        { sdg_target { goal_index } }
    logistics_info  { accommodation_provided }
    programme_fees
    duration
    earliest_start_date
    latest_end_date
    openings
    project_name
`;

async function fetchPage(page) {
    const today = todayISO();
    const data = await gqlQuery(`
        query($committee: Int!, $statuses: [String], $page: Int!, $perPage: Int!) {
            allOpportunity(
                filters: {
                    committee:       $committee
                    statuses:        $statuses
                    latest_end_date: { from: "${today}" }
                }
                pagination: { page: $page, per_page: $perPage }
            ) {
                data { ${OPPORTUNITY_FIELDS} }
                paging { total_items total_pages }
            }
        }
    `, {
        committee: INDIA_MC_ID,
        statuses:  OPEN_STATUSES,
        page,
        perPage:   PER_PAGE,
    });
    return data.allOpportunity;
}

// ── Transform GQL record → Supabase row ─────────────────────
function transform(o, syncedAt) {
    const prog     = PROGRAMME_MAP[Number(o.programme?.id)] ?? { type: 'igv', slug: 'global-volunteer' };
    const fee      = o.programme_fees ?? 0;
    const dur      = o.duration;
    const duration = dur ? `${dur} Week${dur !== 1 ? 's' : ''}` : null;

    const rawDesc = o.description ?? '';
    const desc    = rawDesc.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() || null;

    const accommodation = o.logistics_info?.accommodation_provided === 'provided';
    const isOpen        = OPEN_STATUSES.includes(o.current_status);

    return {
        id:            Number(o.id),
        title:         (o.title ?? 'Untitled').trim(),
        description:   desc,
        type:          prog.type,
        project:       o.project_name || null,
        organisation:  o.organisation?.name ?? null,
        lc:            o.home_lc?.name ?? null,
        sdg:           o.sdg_info?.sdg_target?.goal_index ?? null,
        fee,
        accommodation,
        duration,
        start_date:    o.earliest_start_date ?? null,
        end_date:      o.latest_end_date ?? null,
        status:        isOpen ? 'open' : 'closed',
        link:          `https://aiesec.org/opportunity/${prog.slug}/${o.id}`,
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

        const result = await fetchPage(page);
        const paging = result.paging;
        totalPages   = paging.total_pages ?? 1;
        const batch  = result.data ?? [];

        console.log(`${batch.length} records  (total: ${paging.total_items ?? '?'})`);
        allRows.push(...batch.map(o => transform(o, syncStart)));
        page++;
    } while (page <= totalPages);

    console.log(`\n  Fetched ${allRows.length} opportunities total`);

    if (allRows.length === 0) {
        console.log('  Nothing to sync — no open opportunities right now.');
        if (!dryRun) {
            await supabase.from('sync_meta').upsert({
                id: 1, synced_at: syncStart, count: 0,
                duration_ms: Date.now() - startMs,
            });
        }
        return;
    }

    if (dryRun) {
        console.log('\n  [dry-run] First 5 records:');
        allRows.slice(0, 5).forEach(r =>
            console.log(`    ${r.id}  ${r.type.toUpperCase().padEnd(4)}  ${(r.lc ?? '?').padEnd(20)}  "${r.title}"`)
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
        process.stdout.write(`    Rows ${i + 1}–${i + chunk.length} ✓\r`);
    }
    console.log('');

    // ── Mark stale rows as closed ────────────────────────────
    await supabase
        .from('opportunities')
        .update({ status: 'closed' })
        .lt('synced_at', syncStart)
        .eq('status', 'open');

    // ── Update sync metadata ─────────────────────────────────
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
