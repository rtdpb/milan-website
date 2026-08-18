---
phase: 03-newsletter-substack-integration
plan: "03"
subsystem: navigation-entry-points
tags: [nav, footer, samenwerken, nieuwsbrief, enable, internal-link]
status: complete

dependency_graph:
  requires: ["03-02"]   # /nieuwsbrief page must exist before enabling nav/footer/card links
  provides: ["NEWS-01"] # Nieuwsbrief fully reachable from all three entry points
  affects:
    - src/components/layout/Nav.astro
    - src/components/layout/Footer.astro
    - src/components/sections/Samenwerken.astro

tech_stack:
  added: []
  patterns:
    - "href-or-reason union: navItems entry flipped from reason to href (existing conditional handles render)"
    - "variant field on ladderCards: card-level Button variant control (primary/secondary)"
    - "BASE_URL prefixed internal links (CR-01): ${import.meta.env.BASE_URL}nieuwsbrief"

key_files:
  modified:
    - src/components/layout/Nav.astro
    - src/components/layout/Footer.astro
    - src/components/sections/Samenwerken.astro

decisions:
  - "Nieuwsbrief nav/footer: single-entry change in navItems array; existing item.href conditional renders <a> with active-state aria-current='page' + nav-link--active — no markup change required"
  - "Samenwerken Nieuwsbrief card: no external prop (internal link to /nieuwsbrief, not Substack redirect)"
  - "variant field added to all ladderCards objects: card 0 = 'primary', cards 1-2 = 'secondary'; Button uses variant={card.variant ?? 'secondary'}"
  - "Removed unused TODO_SUBSTACK_URL import from Samenwerken.astro (no longer referenced after enabling)"

metrics:
  duration: "~2 min"
  completed_date: "2026-08-19"
  tasks_completed: 3
  tasks_total: 3
  commits: 2
  status_note: "2 autonomous tasks committed; Task 3 human-verify checkpoint APPROVED by user — build green (6 pages, 0 errors)"

actuals:
  tokens: 8000
  tasks: 2
  commits: 2

requirements: [NEWS-01]
---

# Phase 03 Plan 03: Enable Nieuwsbrief Entry Points Summary

**One-liner:** Flip all three Nieuwsbrief nav/footer/card entries from honest-disabled reason strings to live BASE_URL-prefixed internal links now that the /nieuwsbrief page exists.

## What Was Built

Two autonomous tasks completed; one blocking human-verify checkpoint pending.

### Task 1: Enable Nieuwsbrief in Nav.astro and Footer.astro (commit `4488f23`)

**Nav.astro:**
- Changed `navItems` Nieuwsbrief entry from `reason: 'Nieuwsbrief pagina volgt in fase 3'` to `href: \`${import.meta.env.BASE_URL}nieuwsbrief\``
- The existing `item.href ? <a ...active-state...> : <span aria-disabled>` conditional now renders an `<a>` with `aria-current="page"` + `nav-link--active` when on /nieuwsbrief
- Same `navItems` array drives both desktop and mobile nav panels — one change covers both
- Boek entry remains `reason: 'Boek pagina volgt in fase 5'` (disabled, Phase 5)
- NL|EN switch untouched (Phase 4)
- Updated stale comments to reflect Phase 3 Plan 03 state

**Footer.astro:**
- Same href-or-reason flip for the Nieuwsbrief entry
- Existing `item.href ? <a href={item.href}> : <span aria-disabled>` conditional renders enabled link
- Boek remains disabled

**Build:** `npm run build` exits 0 (6 pages built, 0 errors)

### Task 2: Enable the Samenwerken Nieuwsbrief card CTA (commit `e9bb2a9`)

**Samenwerken.astro:**
- `ladderCards[0]` changes: `disabled: false`, `placeholderReason: undefined`, `href: \`${import.meta.env.BASE_URL}nieuwsbrief\``
- Added `variant` field to all three ladderCards: card 0 → `'primary' as const`, cards 1-2 → `'secondary' as const`
- `<Button>` now uses `variant={card.variant ?? 'secondary'}` — Nieuwsbrief card renders the yellow primary Button
- No `external` prop / `target="_blank"` (internal link to /nieuwsbrief, not a Substack redirect)
- Removed now-unused `TODO_SUBSTACK_URL` import
- Updated docblock and CTA comment to reflect all three CTAs enabled

**Build:** `npm run build` exits 0 (6 pages built, 0 errors)

## Acceptance Criteria Status

- [x] `npm run build` exits 0 — confirmed both tasks
- [x] Nav.astro and Footer.astro Nieuwsbrief entries use `${import.meta.env.BASE_URL}nieuwsbrief` (grep verified)
- [x] Old `reason: 'Nieuwsbrief pagina volgt in fase 3'` string gone from both files
- [x] Boek entries still use `reason:` (disabled) in both files; NL|EN switch unchanged
- [x] Samenwerken ladderCards[0] has `disabled: false`, `placeholderReason: undefined`, `href: ...nieuwsbrief`
- [x] Nieuwsbrief card Button renders `variant="primary"`; other two cards `variant="secondary"`
- [x] No `external` prop / `target="_blank"` on Nieuwsbrief card (internal link)
- [x] Human-verify checkpoint: Task 3 — phase end-to-end verification APPROVED by user (build green, 6 pages, 0 errors)

## Deviations from Plan

**[Rule 1 - Cleanup] Removed unused TODO_SUBSTACK_URL import from Samenwerken.astro**
- **Found during:** Task 2
- **Issue:** After enabling the Nieuwsbrief card with a real href, the `TODO_SUBSTACK_URL` import was no longer used in Samenwerken.astro (the placeholder reason string that embedded it was removed)
- **Fix:** Removed `import { TODO_SUBSTACK_URL } from '../../config';` to keep the file clean
- **Files modified:** `src/components/sections/Samenwerken.astro`
- **Commit:** e9bb2a9

No other deviations — plan executed as written.

## Commits

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Enable Nieuwsbrief in Nav.astro and Footer.astro | `4488f23` | src/components/layout/Nav.astro, src/components/layout/Footer.astro |
| 2 | Enable Samenwerken Nieuwsbrief card CTA | `e9bb2a9` | src/components/sections/Samenwerken.astro |
| 3 | Human-verify checkpoint — phase end-to-end | APPROVED | user approved; build green (6 pages, 0 errors) |

## Threat Surface Scan

No new network endpoints, auth paths, or trust boundary changes introduced.
All hrefs are build-time static values using `import.meta.env.BASE_URL` (T-3-07: no user input, no runtime path construction).
Boek and NL|EN entries confirmed still disabled (T-3-08: no accidental enablement).

## Known Stubs

None in this plan. All three entry points are wired to live pages. The /nieuwsbrief page itself remains in sentinel state (Substack URL placeholder) — tracked in 03-02-SUMMARY.md.

## Self-Check: PASSED

- [x] `src/components/layout/Nav.astro` modified — confirmed
- [x] `src/components/layout/Footer.astro` modified — confirmed
- [x] `src/components/sections/Samenwerken.astro` modified — confirmed
- [x] Commit `4488f23` exists — confirmed
- [x] Commit `e9bb2a9` exists — confirmed
- [x] `npm run build` exits 0 — confirmed (both tasks)
- [x] SUMMARY.md written at `.planning/phases/03-newsletter-substack-integration/03-03-SUMMARY.md`
