-- ============================================================
-- IIAF Opportunities — Supabase Schema
-- Run this once in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- Main opportunities table
CREATE TABLE IF NOT EXISTS opportunities (
    id              BIGINT      PRIMARY KEY,
    title           TEXT        NOT NULL,
    description     TEXT,
    type            TEXT        CHECK (type IN ('igv', 'igta', 'igte')),
    project         TEXT,
    organisation    TEXT,
    lc              TEXT,
    sdg             INTEGER,
    fee             INTEGER     DEFAULT 0,
    accommodation   BOOLEAN     DEFAULT false,
    duration        TEXT,
    start_date      DATE,
    end_date        DATE,
    status          TEXT        DEFAULT 'open',
    link            TEXT,
    synced_at       TIMESTAMPTZ DEFAULT now()
);

-- Track the last successful sync run
CREATE TABLE IF NOT EXISTS sync_meta (
    id          INTEGER     PRIMARY KEY DEFAULT 1,
    synced_at   TIMESTAMPTZ,
    count       INTEGER,
    duration_ms INTEGER
);

-- ── Indexes for fast filtering ────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_opp_status      ON opportunities (status);
CREATE INDEX IF NOT EXISTS idx_opp_type        ON opportunities (type);
CREATE INDEX IF NOT EXISTS idx_opp_lc          ON opportunities (lc);
CREATE INDEX IF NOT EXISTS idx_opp_project     ON opportunities (project);
CREATE INDEX IF NOT EXISTS idx_opp_sdg         ON opportunities (sdg);
CREATE INDEX IF NOT EXISTS idx_opp_fee         ON opportunities (fee);
CREATE INDEX IF NOT EXISTS idx_opp_start_date  ON opportunities (start_date);

-- Full-text search index on title + description + organisation
CREATE INDEX IF NOT EXISTS idx_opp_fts ON opportunities
    USING gin(to_tsvector('english', coalesce(title,'') || ' ' || coalesce(description,'') || ' ' || coalesce(organisation,'')));

-- ── Row Level Security ────────────────────────────────────────
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_meta     ENABLE ROW LEVEL SECURITY;

-- Anyone can read (frontend uses anon key)
CREATE POLICY "public_read_opportunities" ON opportunities
    FOR SELECT USING (true);

CREATE POLICY "public_read_sync_meta" ON sync_meta
    FOR SELECT USING (true);
-- Note: service role key (used by the sync script) bypasses RLS automatically
