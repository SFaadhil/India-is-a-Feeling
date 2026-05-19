/**
 * IIAF Sheets Loader
 *
 * Reads exchange-program availability from a public Google Sheet and
 * shows/hides the iGV, iGTa, iGTe cards on each entity page accordingly.
 *
 * Setup:
 *   1. Open config/sheets-config.json and paste your Google Sheet ID into "sheetId".
 *   2. Make the sheet public (Share → Anyone with the link → Viewer).
 *   3. Done — save and reload the page.
 *
 * The National tab must have these 11 columns (row 1 = headers):
 *   Name | ID | IGV Searchtool | IGV Booklet | IGV Status |
 *   IGTa Searchtool | IGTa Booklet | IGTa Status |
 *   IGTe Searchtool | IGTe Booklet | IGTe Status
 *
 * Status column: use Google Sheets checkbox (TRUE/FALSE) or type TRUE / FALSE.
 */

(async function () {
  // ── 1. Find the programs section on this page ────────────────────────────
  const section = document.querySelector('[data-entity-id]');
  if (!section) return; // not a city page

  const entityId = section.dataset.entityId;

  // ── 2. Load config ───────────────────────────────────────────────────────
  let config;
  try {
    const res = await fetch('/config/sheets-config.json');
    config = await res.json();
  } catch {
    return; // config not reachable — keep static defaults
  }

  if (!config.sheetId || config.sheetId === 'YOUR_GOOGLE_SHEET_ID_HERE') return;

  // ── 3. Fetch the National tab as CSV ─────────────────────────────────────
  const csvUrl =
    `https://docs.google.com/spreadsheets/d/${config.sheetId}` +
    `/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(config.nationalTab || 'National')}`;

  let rows;
  try {
    const res = await fetch(csvUrl);
    if (!res.ok) return;
    rows = parseCSV(await res.text());
  } catch {
    console.warn('[IIAF] Could not fetch sheet data. Showing all program cards.');
    return;
  }

  if (rows.length < 2) return;

  // ── 4. Locate header row and the entity row ───────────────────────────────
  const headers = rows[0].map(h => h.toLowerCase().trim());
  const entityRow = rows.slice(1).find(
    row => (row[headers.indexOf('id')] || '').toLowerCase().trim() === entityId
  );
  if (!entityRow) return;

  const col = name => (entityRow[headers.indexOf(name.toLowerCase())] || '').trim();

  // ── 5. Program definitions ────────────────────────────────────────────────
  const programs = [
    {
      key:        'gv',
      searchtool: col('igv searchtool'),
      booklet:    col('igv booklet'),
      active:     isTruthy(col('igv status')),
    },
    {
      key:        'gta',
      searchtool: col('igta searchtool'),
      booklet:    col('igta booklet'),
      active:     isTruthy(col('igta status')),
    },
    {
      key:        'gte',
      searchtool: col('igte searchtool'),
      booklet:    col('igte booklet'),
      active:     isTruthy(col('igte status')),
    },
  ];

  // ── 6. Show / hide cards and wire up links ────────────────────────────────
  let visibleCount = 0;

  for (const prog of programs) {
    const card = section.querySelector(`[data-program="${prog.key}"]`);
    if (!card) continue;

    if (!prog.active) {
      card.style.display = 'none';
    } else {
      visibleCount++;

      // Update Opportunities link
      if (prog.searchtool) {
        const stLink = card.querySelector('[data-link="searchtool"]');
        if (stLink) stLink.href = prog.searchtool;
      }

      // Update Booklet link
      if (prog.booklet) {
        const bLink = card.querySelector('[data-link="booklet"]');
        if (bLink) bLink.href = prog.booklet;
      }
    }
  }

  // ── 7. Reflow grid so 1 or 2 visible cards don't leave empty columns ──────
  const grid = section.querySelector('.programs-grid');
  if (grid) grid.dataset.visible = visibleCount;

  // ── Helpers ───────────────────────────────────────────────────────────────

  function isTruthy(val) {
    return ['true', '1', 'yes'].includes(val.toLowerCase());
  }

  function parseCSV(text) {
    const rows = [];
    let row = [], field = '', inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const ch = text[i];

      if (ch === '"') {
        if (inQuotes && text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = !inQuotes;
      } else if (ch === ',' && !inQuotes) {
        row.push(field); field = '';
      } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
        if (ch === '\r' && text[i + 1] === '\n') i++;
        row.push(field); field = '';
        if (row.some(c => c !== '')) rows.push(row);
        row = [];
      } else {
        field += ch;
      }
    }
    if (row.length) { row.push(field); rows.push(row); }
    return rows;
  }
})();
