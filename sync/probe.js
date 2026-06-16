// Probe with India MC ID=1585 + sniff the new AIESEC website's API
// Run: node probe.js
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, '../.env') });

const TOKEN = process.env.AIESEC_TOKEN;
const BASE  = 'https://api.aiesec.org/v2';
const AUTH  = `access_token=${TOKEN}`;
const INDIA_MC = 1585;

async function get(url, extra = '') {
    const sep = url.includes('?') ? '&' : '?';
    const full = url.startsWith('http') ? url + sep + extra : `${BASE}${url}?${AUTH}${extra ? '&' + extra : ''}`;
    try {
        const r    = await fetch(full, { signal: AbortSignal.timeout(8000) });
        const text = await r.text();
        return { status: r.status, body: text, url: full };
    } catch (e) {
        return { status: 0, body: e.cause?.code ?? e.message, url: full };
    }
}

function paging(body) {
    try { const j = JSON.parse(body); return `total=${j.paging?.total_items ?? j.total_items ?? '?'}  data=${j.data?.length ?? '?'}`; }
    catch { return body.slice(0, 120).replace(/\s+/g, ' '); }
}

console.log(`Token: ${TOKEN?.slice(0,12)}…   India MC: ${INDIA_MC}\n`);

// ── 1. GIS v2 API with India MC ID=1585 ─────────────────────
console.log('── 1. GIS v2 with India MC 1585 (all parameter formats) ──');
const v2Variants = [
    `/opportunities.json&home_mcs[]=${INDIA_MC}`,
    `/opportunities.json&home_mcs=${INDIA_MC}`,
    `/opportunities.json&filters[home_mcs][]=${INDIA_MC}`,
    `/opportunities.json&filters[home_mc][]=${INDIA_MC}`,
    `/opportunities.json&filters[home_committee][]=${INDIA_MC}`,
    `/opportunities.json&filters[home_committee_id][]=${INDIA_MC}`,
    `/opportunities.json&mc_id=${INDIA_MC}`,
    `/opportunities.json&programmes[]=7&home_mcs[]=${INDIA_MC}`,
    `/opportunities.json&programmes[]=1&home_mcs[]=${INDIA_MC}`,
];
for (const v of v2Variants) {
    const path = v.split('&')[0];
    const extra = v.split('&').slice(1).join('&');
    const { status, body } = await get(path, extra);
    console.log(`  ${extra.slice(0,55).padEnd(55)}  →  ${status}  ${paging(body)}`);
}

// ── 2. Try the new AIESEC search API ────────────────────────
console.log('\n── 2. New AIESEC website API candidates ──────────────────');
const newEndpoints = [
    `https://aiesec.org/api/v1/opportunities?programmes=7&home_mcs=${INDIA_MC}`,
    `https://aiesec.org/api/opportunities?programmes=7&home_mcs=${INDIA_MC}`,
    `https://aiesec.org/api/v2/opportunities?programmes=7&home_mcs=${INDIA_MC}`,
    `https://api.aiesec.org/graphql`,
    `https://aiesec.org/graphql`,
];
for (const url of newEndpoints) {
    // Try as GET first
    const { status, body } = await get(url);
    console.log(`  ${url.slice(25,75).padEnd(50)}  →  ${status}  ${paging(body)}`);
}

// ── 3. GIS v2 committees with India MC ID ───────────────────
console.log('\n── 3. GIS v2 committees for India ────────────────────────');
const comVariants = [
    `/committees/${INDIA_MC}.json`,
    `/committees.json&filters[parent_id][]=${INDIA_MC}`,
    `/committees.json&filters[mc_id][]=${INDIA_MC}`,
    `/committees.json&mc_id=${INDIA_MC}`,
    `/committees.json&parent_id=${INDIA_MC}`,
];
for (const v of comVariants) {
    const path = v.split('&')[0];
    const extra = v.split('&').slice(1).join('&');
    const { status, body } = await get(path, extra);
    console.log(`  ${v.slice(0,55).padEnd(55)}  →  ${status}  ${body.slice(0,100).replace(/\s+/g,' ')}`);
}

// ── 4. Try without date filter (the website had "Starting from today")
console.log('\n── 4. Opportunities ignoring start date ──────────────────');
const noDateVariants = [
    `/opportunities.json&home_mcs[]=${INDIA_MC}&ignore_date=true`,
    `/opportunities.json&home_mcs[]=${INDIA_MC}&status=all`,
    `/opportunities.json&home_mcs[]=${INDIA_MC}&filters[status][]=open`,
    `/opportunities.json&home_mcs[]=${INDIA_MC}&filters[status][]=approved`,
];
for (const v of noDateVariants) {
    const path = v.split('&')[0];
    const extra = v.split('&').slice(1).join('&');
    const { status, body } = await get(path, extra);
    console.log(`  ${extra.slice(0,55).padEnd(55)}  →  ${status}  ${paging(body)}`);
}
