---
app: hytek-budget
url: https://budget.hytekframing.com.au  # every path 307-redirects to https://hytek-install.vercel.app/dashboard (next.config.ts), checked 17/09/2026
status: side-tool                    # Scott, 17/09/2026 (side-tool decision) — not archived; NOT part of the live business system. Mothballed 22/04/2026 (tag mothballed-2026-04-22)
live_system: false
role: none                           # no Postgres role of its own
unattended: none                     # no cron, no vercel.json, no scheduled task — and the deployed site serves nothing but the redirect
shared_tables_owned: []              # it owns none; the dormant code below WOULD write four SHARED tables that hytek-install owns
credential_names: [NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY]   # FINDING: names on the Vercel project (values not read). No code reads the service-role name; which project it points at was not read (CLAUDE.md says SHARED)
supabase:
  project_refs: []                   # no literal ref in code; the URL comes from NEXT_PUBLIC_SUPABASE_URL (SHARED, gqtikzguvhukpujyxkez, per CLAUDE.md)
  env:
    - NEXT_PUBLIC_SUPABASE_URL
    - NEXT_PUBLIC_SUPABASE_ANON_KEY
tables:
  owns:                              # DORMANT CODE — declared so the scanner tells the truth, not a claim of ownership. hytek-install owns these. Unreachable while the redirect stands
    - install_claims                 # src/lib/queue.ts (offline queue, dynamic table name)
    - job_variations                 # src/app/log/page.tsx via the queue
    - job_rework                     # src/lib/queue-drain.ts
    - rework_photos                  # src/lib/queue-drain.ts (+ storage bucket install-photos)
  reads: [jobs, profiles, install_budget_items, install_claims]
  rpcs: []
hosts:
  approved:
    - hytek-install.vercel.app       # the redirect target, nothing is fetched from it
env:
  privileged: []                     # no code reads a privileged name
crons: []
events:
  out: []
  in: []
exemptions: []
---

# hytek-budget — passport

**Status: side tool (Scott, 17/09/2026) — not archived; not part of the live system.**

**Last checked: 17/09/2026**

## What it is

A mobile budget-logging app for install crews (claims, variations, rework with a
photo, an offline queue for poor phone signal). It was **mothballed on
22/04/2026** when `hytek-install` took over all of its work. Since then every
request to `budget.hytekframing.com.au` gets a 307 redirect to the Install
dashboard (`next.config.ts`), so none of its screens or code are served.

## Who uses it

Nobody directly. Anyone with an old bookmark lands on hytek-install.

## What it touches — read this before un-mothballing

- **Would write SHARED tables.** The code still contains the offline queue that
  inserts into `install_claims`, `job_variations`, `job_rework` and
  `rework_photos` and uploads to the `install-photos` bucket, signed in as the
  user with the public (anon) key. Those tables belong to **hytek-install**.
  Deleting the `redirects()` block would switch that on again and give the
  tables a second writer, which breaks rule 4. **Do not un-mothball without
  retiring that code first.**
- **Credentials (finding).** The Vercel project still carries
  `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` and
  `SUPABASE_SERVICE_ROLE_KEY`, set 150 days before 17/09/2026. No code reads the
  service-role one. Which project that key belongs to was not read either; that
  it is SHARED comes from the repo's CLAUDE.md. Whether that value still works after the 15/09/2026 key swap
  was not tested (values were not read). Removing it is a credential change for
  Scott or the orchestrator, not this passport.
- **SQL.** `sql/` holds historical scripts for SHARED install tables, pasted
  by hand in April 2026. They are history, not a migration lane: nothing here
  runs them.
- **Schedules:** none. The GitHub repo holds only the `ANTHROPIC_API_KEY` secret
  for the org-wide "ai-fix" workflow (runs only when an issue is labelled).

## Checks

`npm test` (vitest). No typecheck script. The canonical
`hytek-brain/tool/architecture-check.ts --root <this repo>` passes against this
passport.
