---
status: testing
phase: 03-newsletter-substack-integration
source: [03-VERIFICATION.md]
started: 2026-08-19T01:20:00Z
updated: 2026-08-19T01:20:00Z
---

## Current Test

number: 1
name: Visual — /nieuwsbrief page responsiveness and layout
expected: |
  Hero H1 with eyebrow, subtext, and primary CTA (disabled in sentinel state); value-prop 3 tiles flex-row on >=640px; Newsletter signup section with single email field; archive grid with 3 placeholder cards; Nieuwsbrief nav item shows active underline/accent; mobile nav panel shows enabled Nieuwsbrief link. No overflow at 375/768/1280px.
awaiting: user response

## Tests

### 1. Visual — /nieuwsbrief page responsiveness and layout
expected: Hero/value-prop/signup/archive all render without overflow at mobile/tablet/desktop; active nav indicator on Nieuwsbrief; mobile panel shows enabled Nieuwsbrief link.
result: [pending]

### 2. Visual — homepage newsletter signup is single-field centered
expected: Email field only (no naam field), max-width 480px centered, submit affordance visually dimmed / non-clickable, no fake success state.
result: [pending]

### 3. Visual — Samenwerken Nieuwsbrief card CTA is a yellow primary Button
expected: First card CTA is yellow (#FFDD11), links to /nieuwsbrief (same tab, not target=_blank), clickable (not aria-disabled); other cards use secondary buttons.
result: [pending]

### 4. Adjacency (backstop) — same-day / duplicate-title posts render as distinct cards
expected: With a real Substack feed containing same-day or duplicate-title posts, every RSS item renders as a separate card (keyed by link/guid); no merging/dedup. Requires the real TODO_SUBSTACK_URL to exercise.
result: [pending]

### 5. Idempotency (backstop) — two consecutive builds produce identical article HTML
expected: With a real Substack URL set, `npm run build` run twice yields byte-identical article HTML (no timestamps/randomness). Requires the real TODO_SUBSTACK_URL to exercise.
result: [pending]

### 6. Populated grid (backstop) — 1-item and 2-item rows do not stretch awkwardly
expected: With a real 1- or 2-post feed, a partial row renders cards at natural width without awkwardly filling the 3-column grid. Requires the real TODO_SUBSTACK_URL to exercise.
result: [pending]

## Summary

total: 6
passed: 0
issues: 0
pending: 6
skipped: 0
blocked: 0

## Gaps
