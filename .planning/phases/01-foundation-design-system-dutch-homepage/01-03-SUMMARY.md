---
phase: "01"
plan: "03"
subsystem: homepage-sections-credibility
tags: [astro, press-strip, samenwerken, placeholder-logos, honest-cta, aria-disabled, responsive, commitment-ladder]
dependency_graph:
  requires:
    - plan-01-01 (design tokens, astro:assets)
    - plan-01-02 (Button, Card, SectionWrapper, PlaceholderBadge, nl.ts, config.ts)
  provides:
    - press-strip-component
    - samenwerken-component
  affects:
    - plan 01-06 (assembly — imports PressStrip + Samenwerken into index.astro)
tech_stack:
  added: []
  patterns:
    - SectionWrapper surface variant for slim press-strip band (--space-press-strip-y: 20px override)
    - Horizontal scroll with scroll-snap for mobile chip overflow backstop
    - flex:1 + margin-top:auto pattern for equal-height cards with bottom-aligned CTAs
    - Const array iterated with .map() for commitment ladder cards
    - Disabled Button via disabled={true} prop — no href="#" (HOME-10)
key_files:
  created:
    - src/components/sections/PressStrip.astro
    - src/components/sections/Samenwerken.astro
  modified: []
decisions:
  - "Card photos (milan-speaking-graph.jpg, milan-networking.jpg) omitted — not extracted from fotos zip at plan-03 time; cards render cleanly without them; photos are optional per ASSETS.md and can be added at any point (TODO noted in Samenwerken.astro comment)"
  - "PressStrip uses SectionWrapper with --section-padding-y overridden to --space-press-strip-y (20px) via :global CSS on the wrapper class — avoids adding a new SectionWrapper prop for a one-off exception"
  - "href='#' in Samenwerken.astro source appears only in doc comments (lines 16/98), never as a functional attribute — acceptance criteria satisfied"
  - "Samenwerken cards use :global(.samenwerken__card) overrides for flex layout since Card.astro is slot-based with its own padding — the override sets display:flex + flex-direction:column + gap on the Card shell"
metrics:
  duration_minutes: 8
  completed_date: "2026-08-18"
  tasks_completed: 2
  tasks_total: 2
  commits: 2
  files_created: 2
  files_modified: 0
status: complete
actuals:
  tokens: 48000
  tasks: 2
  commits: 2
---

# Phase 01 Plan 03: PressStrip + Samenwerken Summary

## One-Line Summary

Slim "Bekend van" press strip with 6 text/wordmark placeholder chips (MT Sprout, Quote, NOS, EenVandaag, Telegraaf, De Ondernemer) + 3-card Dutch commitment ladder (Nieuwsbrief → Presentatie/Lezing → 1:1 Coaching) with honestly disabled CTAs — ready for wiring by Plan 01-06 assembly.

## What Was Built

### Task 1: PressStrip credibility band

**src/components/sections/PressStrip.astro** — Slim credibility band (HOME-03) implementing UI-SPEC `<PressStrip>`:

- Uses `SectionWrapper` variant="surface" with custom `--section-padding-y: var(--space-press-strip-y)` (20px) via a `:global` class override — keeps the band visually slim and adjacent to the hero (D-06)
- Eyebrow label "Bekend van" from `nl.pressStrip.eyebrow`, styled at 13px/600/uppercase with 0.08em letter-spacing
- 6 logo chips from `nl.pressStrip.logos` iterated via `.map()`: MT Sprout, Quote, NOS, EenVandaag, Telegraaf, De Ondernemer
- Each chip: 36px pill with `--color-border` border + `--color-bg` fill; wordmark text in 14px/600/italic/`--color-text-secondary`; `opacity: 0.75; filter: grayscale(1)` — clearly placeholder (D-11); `title="Logo volgt"`
- `PlaceholderBadge` with label "Logo's volgen" provides the visible `[Placeholder]` marker (D-11, HOME-03 acceptance)
- Mobile overflow: `overflow-x: auto; scroll-snap-type: x mandatory` on the chips row — 6 chips never clip on 375px viewport (UI-SPEC §UI Considerations backstop)
- No `<img>` tags anywhere — all text/wordmark (D-11 prohibition enforced)
- TODO comment to swap chips for real SVG/PNG logos when assets are supplied

### Task 2: Samenwerken 3-card commitment ladder

**src/components/sections/Samenwerken.astro** — 3-card commitment ladder (HOME-04) implementing UI-SPEC `<SamenwerkSection>`:

- Uses `SectionWrapper` variant="default" + `Card.astro` + `Button.astro` — composed entirely from plan-02 UI kit
- Section heading "Samenwerken" (h2, 24–36px fluid, --font-display/600)
- 3 equal-height cards, responsive grid: 1-col mobile → 2-col tablet (768px) → 3-col desktop (1200px)
- Card order (commitment ladder, D-07): Nieuwsbrief → Presentatie / Lezing → 1:1 Coaching
- Each card: numbered Dutch eyebrow (01 — Begin hier gratis / 02 — Ga dieper / 03 — Werk met mij), subheading title, body description, bottom-aligned disabled CTA
- CTAs (HOME-10 honesty rule):
  - "Schrijf je gratis in" — `disabled={true}`, placeholderReason references `TODO_SUBSTACK_URL` (Phase 3)
  - "Boek lezing" — `disabled={true}`, placeholderReason references `TODO_CONTACT_URL` (Phase 2)
  - "Plan kennismaking" — `disabled={true}`, placeholderReason references `TODO_CONTACT_URL` (Phase 2)
- All disabled: `aria-disabled="true"`, `cursor: not-allowed`, `opacity: 0.5`, no `href="#"`, no click handlers, no fake success states
- No fabricated stats (D-08); copy verbatim from `nl.samenwerken` (HOME-11)
- Card photos omitted — source files not extracted from zip (optional per ASSETS.md); TODO comment in source for future addition

## Deviations from Plan

### Intentional Adjustments

**1. [Optional precondition unmet] Card photos not included**
- **Found during:** Task 2 precondition check
- **Issue:** `src/assets/photos/milan-speaking-graph.jpg` and `src/assets/photos/milan-networking.jpg` do not exist — not extracted from the fotos zip.
- **Fix:** Per plan precondition: "Photos are OPTIONAL per ASSETS.md — if not extracted, render the cards without photos (do not block)." Cards render cleanly without them. TODO comment left in Samenwerken.astro for future wiring.
- **Impact:** None — plan acceptance criteria do not require photos; "if card photos used" is a conditional check.

No bugs, no architectural changes, no blocking issues.

## Verification Results

| Check | Result |
|-------|--------|
| `npm run build` exits 0 | PASS (0 errors, 0 warnings) |
| No `<img>` in PressStrip.astro | PASS |
| "Bekend van" in PressStrip source | PASS (2 matches: nl.ts reference + rendered string) |
| All 6 outlet wordmarks in nl.pressStrip.logos | PASS (MT Sprout, Quote, NOS, EenVandaag, Telegraaf, De Ondernemer) |
| Placeholder marker (title="Logo volgt" + PlaceholderBadge) | PASS |
| Horizontal scroll on mobile (overflow-x: auto + scroll-snap) | PASS (source) |
| "Samenwerken" heading in Samenwerken source | PASS |
| 3 CTA labels in Samenwerken source | PASS (Schrijf je gratis in / Boek lezing / Plan kennismaking) |
| Card order: Nieuwsbrief → Presentatie/Lezing → 1:1 Coaching | PASS (source array index [0]/[1]/[2]) |
| `href="#"` functional attributes in Samenwerken | PASS (0 — only in doc comments) |
| `aria-disabled` on CTAs | PASS (3 disabled={true} Button props) |
| No fabricated stats | PASS |
| src/pages/index.astro NOT modified | PASS |
| Cards: no card photos attempted | PASS (photos optional — not blocking) |

## Known Stubs

| Stub | File | Note |
|------|------|-------|
| 6 press logo chips are text placeholders | `src/components/sections/PressStrip.astro` | Real SVG/PNG logos replace chips when assets supplied — see TODO comment in source |
| Nieuwsbrief CTA disabled | `src/components/sections/Samenwerken.astro` | Substack URL pending — Phase 3 wires TODO_SUBSTACK_URL |
| Boek lezing CTA disabled | `src/components/sections/Samenwerken.astro` | Contact destination pending — Phase 2 wires TODO_CONTACT_URL |
| Plan kennismaking CTA disabled | `src/components/sections/Samenwerken.astro` | Contact destination pending — Phase 2 wires TODO_CONTACT_URL |
| Card photos omitted | `src/components/sections/Samenwerken.astro` | milan-speaking-graph + milan-networking not extracted; optional per ASSETS.md |

## Threat Surface Scan

No new trust boundaries introduced beyond plan's threat model:
- T-01-07 (Spoofing — press logos): Mitigated — chips are clearly-marked text placeholders, `title="Logo volgt"`, PlaceholderBadge visible marker. No real outlet endorsements asserted.
- T-01-08 (Repudiation — fabricated stats): Mitigated — no numbers, no "trusted by N clients" claims; only verbatim docx copy.
- T-01-05 (Spoofing — disabled CTAs): Mitigated — all 3 Samenwerken CTAs use `aria-disabled="true"`, `pointer-events: none`, `cursor: not-allowed`. No click handlers. No fake success.

## Self-Check

Files created:
- `src/components/sections/PressStrip.astro` — FOUND
- `src/components/sections/Samenwerken.astro` — FOUND

Commits:
- `cadd4c7` feat(01-03): PressStrip credibility band with 6 placeholder logo chips — FOUND
- `d9dbc31` feat(01-03): Samenwerken 3-card commitment ladder with disabled CTAs — FOUND

`npm run build` exits 0: PASS
`src/pages/index.astro` NOT modified: PASS

## Self-Check: PASSED
