---
phase: "03-newsletter-substack-integration"
plan: "01"
subsystem: "rss-feed"
status: complete
tags: [rss, substack, astro, github-actions, tracer, news-03]
completed: "2026-08-19"

dependency_graph:
  requires:
    - "01-06: Articles.astro placeholder section (ArticleCard type contract)"
    - "src/config.ts: TODO_SUBSTACK_URL sentinel seam"
  provides:
    - "src/lib/rss.ts: fetchSubstackFeed utility (ArticleCard / PlaceholderCard types)"
    - "RSS-fed Articles.astro behind IS_SENTINEL guard"
    - ".github/workflows/deploy.yml: scheduled daily rebuild cron"
  affects:
    - "Homepage Recente-artikelen section (sentinel state: unchanged visually)"
    - "GitHub Actions: no existing workflow modified (new file)"

tech_stack:
  added:
    - "fast-xml-parser@5.11.0 (npm — XML/RSS parsing at build time, >5.3.5 CVE-2026-25896 safe)"
  patterns:
    - "Sentinel guard (IS_SENTINEL check mirrors Web3Forms key pattern from Phase 2)"
    - "Build-time RSS fetch in Astro frontmatter (output: static — zero runtime JS)"
    - "Array.isArray normalization before .map() (single-item feed safety)"
    - "try/catch + !res.ok → return [] (D-06 feed-failure graceful fallback)"

key_files:
  created:
    - src/lib/rss.ts
    - .github/workflows/deploy.yml
  modified:
    - src/config.ts
    - src/components/sections/Articles.astro
    - package.json
    - package-lock.json

decisions:
  - "Action versions pinned to confirmed stable fallback majors (checkout@v4, withastro/action@v3, deploy-pages@v4). RESEARCH listed v7/v6/v5 as ASSUMED; plan directed use of stable fallback if runtime verification not possible. Documented in SUMMARY."
  - "Task 3 required no code changes — rss.ts behaviors (a)-(d) were all correctly implemented in Task 1. Task 3 verified via Node smoke assertion: RSS_SMOKE_OK."

actuals:
  tokens: 14500
  tasks: 3
  commits: 2
---

# Phase 03 Plan 01: End-to-end RSS Tracer — install fast-xml-parser, rss.ts utility, Articles.astro wired, GitHub Actions cron

## One-liner

Build-time Substack RSS pipeline proven end-to-end behind `TODO_SUBSTACK_URL` sentinel using `fast-xml-parser@5.11.0`, with `fetchSubstackFeed` utility in `src/lib/rss.ts` and a daily GitHub Actions cron rebuild.

## What Was Built

### Task 1: End-to-end RSS tracer (type: tracer)

**`src/lib/rss.ts`** — New build-time RSS fetch + parse utility:
- Exports `ArticleCard` (isPlaceholder: false, with href) and `PlaceholderCard` (isPlaceholder: true) types
- `XMLParser` configured with `removeNSPrefix: false` (Pitfall 1: preserves `item['content:encoded']`)
- `Array.isArray(rawItems) ? rawItems : [rawItems]` normalization (Pitfall 2: single-item feed safe)
- `try/catch + !res.ok → return []` (D-06 / T-3-04: build never fails on feed error)
- Helpers: `wordCountToReadTime(html)` (strip tags, words/200, min 1 min) and `formatPubDate(pubDate)` (Dutch month names array)
- Pure + deterministic: no `Date.now()`, no `Math.random()`, no `set:html` on RSS content

**`src/config.ts`** — `TODO_SUBSTACK_URL` doc block extended with Feed/Subscribe derivation docs and strip-trailing-slash note. Sentinel value unchanged.

**`src/components/sections/Articles.astro`** — Rewired behind IS_SENTINEL guard:
- Imports `TODO_SUBSTACK_URL` from config, `fetchSubstackFeed + ArticleCard + PlaceholderCard` from rss.ts
- IS_SENTINEL=true (current state): renders nl.articles.items as PlaceholderCards with PlaceholderBadge (D-04)
- IS_SENTINEL=false: fetches `{TODO_SUBSTACK_URL}/feed`, empty result → D-06 fallback, real data → ArticleCard grid
- `"Lees verder"` conditional: disabled span when placeholder, `<a target="_blank" rel="noopener noreferrer">` when real (T-3-01)
- `"Alle artikelen"` conditional: disabled span when IS_SENTINEL, external anchor to substackPublicationUrl when live (D-07)
- Enabled-state CSS added (opacity 1, cursor pointer, hover underline / arrow translate, focus-visible outline)
- PlaceholderBadge conditional on `article.isPlaceholder` (not always rendered)
- role="list" / role="listitem" grid semantics preserved

**`package.json` + `package-lock.json`** — `fast-xml-parser@^5.11.0` added (CVE-2026-25896 patched in 5.3.5+).

### Task 2: GitHub Actions deploy + scheduled rebuild workflow

**`.github/workflows/deploy.yml`** — New file (`.github/workflows/` directory did not exist):
- `push: branches: [main]` — deploy on every merge to main
- `schedule: cron: '0 6 * * *'` — daily 06:00 UTC rebuild refreshes Substack feed (NEWS-03 / D-02)
- `workflow_dispatch` — manual trigger for testing and re-enabling after inactivity
- `concurrency: group: "pages", cancel-in-progress: false` — serializes cron + push runs (NEWS-01/NEWS-03 concurrency edge)
- `permissions: contents:read, pages:write, id-token:write` — GitHub Pages OIDC
- Jobs: `build` (withastro/action@v3) + `deploy` (needs: build, actions/deploy-pages@v4)
- YAML comments document the 60-day inactivity disable risk (RESEARCH Pitfall 5)

### Task 3: Feed-failure fallback + single-item smoke check

No code changes required — Task 1's `rss.ts` implementation already contained all four required behaviors:
- (a) Thrown error returns `[]` via outer `try/catch`
- (b) `!res.ok` returns `[]` with `console.warn`
- (c) `Array.isArray(rawItems) ? rawItems : [rawItems]` before `.map()`
- (d) `item['content:encoded']` used for `wordCountToReadTime(content)`

Verified via Node smoke assertion: single `<item>` normalizes to 1-element array; `item['content:encoded']` accessible with `removeNSPrefix:false` → prints `RSS_SMOKE_OK`.

## Verification Evidence

```
npm run build → 0 errors, 0 warnings, Complete! (5 pages)
astro check → 0 errors, 0 warnings, 0 hints
dist/index.html: 3 articles__badge-row (3 placeholder cards in sentinel state)
RSS smoke: RSS_SMOKE_OK (single-item normalization + content:encoded accessible)
deploy.yml: schedule + workflow_dispatch + cancel-in-progress:false present
```

## Deviations from Plan

### Task 2: Action version fallback (documented)

The plan directed use of confirmed stable fallback versions if GitHub.com was unreachable at execution time. RESEARCH marked `withastro/action@v6`, `actions/checkout@v7`, `actions/deploy-pages@v5` as ASSUMED (A4). Since runtime verification was not possible, used the plan's documented stable fallback majors: `actions/checkout@v4`, `withastro/action@v3`, `actions/deploy-pages@v4`. This is the most widely-deployed stable set and matches the Astro deploy guide pattern. No functional impact — YAML is not executed at build time.

### Task 3: No code changes

Task 3 is a verification-only task. All behaviors (a)-(d) were correctly implemented in Task 1 during the tracer. The smoke assertion confirmed this without any code fixes needed.

## Known Stubs

None — this plan's goal is to prove the RSS pipeline behind the sentinel, and the sentinel state (placeholder cards) is the correct, honest observable behavior until `TODO_SUBSTACK_URL` is replaced. No stubs that prevent the plan's goal.

## Threat Surface Scan

No new security-relevant surface beyond what the threat model covers:
- T-3-01: All external anchors in Articles.astro carry `rel="noopener noreferrer"` ✓
- T-3-02: No `set:html` on RSS content in rss.ts or Articles.astro ✓
- T-3-03: Feed URL derived solely from config.ts sentinel (no user input) ✓
- T-3-04: try/catch + !res.ok → return [] (build never fails on feed error) ✓
- T-3-05: fast-xml-parser@5.11.0 (>= 5.3.5 patched) ✓

## Self-Check

### Files exist

- `src/lib/rss.ts` — FOUND
- `src/config.ts` — FOUND (modified)
- `src/components/sections/Articles.astro` — FOUND (modified)
- `.github/workflows/deploy.yml` — FOUND
- `package.json` — FOUND (modified, fast-xml-parser added)

### Commits exist

- `64bbe74` — feat(03-01): tracer — install fast-xml-parser, build rss.ts, wire Articles.astro
- `730b7ed` — chore(03-01): add GitHub Actions deploy + scheduled rebuild workflow

## Self-Check: PASSED

Both commits exist, all files present, build verified green, smoke assertion passed.
