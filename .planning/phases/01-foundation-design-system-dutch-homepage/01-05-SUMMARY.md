---
phase: 01-foundation-design-system-dutch-homepage
plan: "05"
subsystem: sections/newsletter-articles
status: complete
tags: [newsletter, articles, placeholder, accessibility, responsive, dutch]

dependency_graph:
  requires:
    - 01-02  # Button, Card, SectionWrapper, PlaceholderBadge, config.ts, nl.ts
  provides:
    - src/components/sections/Newsletter.astro
    - src/components/sections/Articles.astro
  affects:
    - 01-06  # Assembly plan wires these into index.astro

tech_stack:
  added: []
  patterns:
    - "Honest disabled CTA pattern (D-09, HOME-10): aria-disabled + tabindex=-1 + data-placeholder"
    - "Explicit label + 16px input font-size (iOS zoom prevention, FND-06)"
    - "ArticleCard data shape contract (isPlaceholder flag) for Phase 3 Substack swap"
    - "PlaceholderBadge used per-card in rendered loop (D-10)"

key_files:
  created:
    - src/components/sections/Newsletter.astro
    - src/components/sections/Articles.astro
  modified: []

decisions:
  - "Submit is a <span role=button> with aria-disabled — not a <button disabled> — so it remains in the DOM and is visible/readable by AT while clearly non-functional"
  - "Articles loop uses nl.articles.items mapped with isPlaceholder:true — single TODO comment covers the whole placeholder array (plan allows this pattern)"
  - "newsletter__submit-note paragraph with aria-live=polite gives AT users explicit context about the disabled state"
  - "Articles cards use :global(.articles__card) override to add flex layout for bottom-aligned 'Lees verder'"

metrics:
  duration: ~6 min
  completed: "2026-08-18"
  tasks_completed: 2
  tasks_total: 2
  commits: 2
  files_created: 2
  files_modified: 0

actuals:
  tokens: 14500
  tasks: 2
  commits: 2
---

# Phase 01 Plan 05: Newsletter + Recente Artikelen Summary

One-liner: Honest newsletter signup (naam+mailadres, labelled, 16px, aria-disabled Substack CTA) and three clearly-flagged placeholder article cards (PlaceholderBadge + TODO comments + ArticleCard type contract for Phase 3 swap).

## What Was Built

### Task 1 — Newsletter.astro (83a2880)

Newsletter signup section (Sectie 5, HOME-07). A light `SectionWrapper` (variant=default, `--color-bg`) containing:

- Display-serif heading from `nl.newsletter.heading` ("Blijf op de hoogte")
- Body subtext from `nl.newsletter.subtext`
- Responsive form: two explicit `<label>` elements — `for="nl-naam"` (type=text, autocomplete=given-name) and `for="nl-email"` (type=email, autocomplete=email) — stacked on mobile, side-by-side on desktop (FND-04)
- Input fields: `border: 1px solid --color-border`, `border-radius: 8px`, `height: 48px`, `padding-inline: 16px`, `font-size: 1rem` (fixed 16px, prevents iOS zoom, FND-06), focus ring `outline: 2px solid --color-accent` with 2px offset
- Submit "Schrijf je in": `<span role="button" aria-disabled="true" tabindex="-1">` tied to `TODO_SUBSTACK_URL` from config.ts — no JS handler, no success state, no href (D-09, HOME-10, T-01-10)
- `aria-describedby` links submit to a screen-reader note explaining the pending state
- TODO Phase 3 comment documents the Substack redirect pattern including `rel="noopener noreferrer"` (T-01-04)
- Disclaimer ("Geen spam. Afmelden wanneer je wilt.") from nl.ts

### Task 2 — Articles.astro (2083b08)

"Recente artikelen" section (Sectie 6, HOME-08). A light `SectionWrapper` containing:

- H2 heading from `nl.articles.heading` ("Recente artikelen")
- 3-column responsive grid (1 col mobile → 2 col tablet → 3 col desktop, FND-04)
- Three `Card` components, each with:
  - `PlaceholderBadge` pill top-right (visible [Placeholder] marker per D-10)
  - Category eyebrow (uppercase label, `--color-text-secondary`)
  - Title from `nl.articles.items` (fictional founder-topic copy — not asserted as real articles, HOME-11, D-10)
  - One-sentence excerpt
  - Meta row: date + "X min leestijd" in `--text-xs` / caption style
  - "Lees verder →" as `<span role="link" aria-disabled="true" tabindex="-1">` (no real URL, no href=#, D-12)
  - Code comment `<!-- TODO: replace with real Substack article (Phase 3) -->` per card template loop
- DATA SHAPE CONTRACT documented in JSDoc comment — `ArticleCard` type with `isPlaceholder: true` flag so Phase 3 can swap array source for real Substack collection without restructuring markup
- "Alle artikelen" link: `<span role="link" aria-disabled="true" tabindex="-1">` (D-12, HOME-10)

## Verification

All acceptance criteria met:

- `npm run build` exits 0 — both components compile without errors or warnings
- `src/pages/index.astro` NOT modified (plan 01-06 owns assembly)
- Newsletter: `for="nl-naam"` and `for="nl-email"` explicit labels present; `type="email"` + autocomplete; 16px font-size; `TODO_SUBSTACK_URL` referenced; `aria-disabled="true"` on submit
- Newsletter: no thank/bedankt/success/onsubmit/addEventListener match; no href="#"
- Articles: "Recente artikelen" heading present; 3 cards from nl.articles.items; each carries PlaceholderBadge; `isPlaceholder: true` on all items; no href="#"; "Lees verder" and "Alle artikelen" are aria-disabled

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

| Stub | File | Reason |
|------|------|--------|
| Newsletter submit disabled | `src/components/sections/Newsletter.astro` | Intentional: `TODO_SUBSTACK_URL` not yet supplied. Phase 3 wires real Substack redirect. |
| Article cards are placeholders | `src/components/sections/Articles.astro` | Intentional: D-10 — real Substack articles arrive in Phase 3. `isPlaceholder: true` flag marks all 3. |
| "Alle artikelen" disabled | `src/components/sections/Articles.astro` | Intentional: future blog/newsletter page is Phase 2/3 scope. |

## Threat Surface Scan

No new security surface beyond what was planned:

| Flag | File | Description |
|------|------|-------------|
| T-01-10 mitigated | Newsletter.astro | Submit is aria-disabled span — no handler, no success UI, no data leaves browser |
| T-01-04 documented | Newsletter.astro | Phase 3 redirect TODO comment explicitly requires `rel="noopener noreferrer"` |
| T-01-11 mitigated | Articles.astro | Visible PlaceholderBadge + fictional titles + isPlaceholder flag + TODO comments |

## Self-Check: PASSED

- `src/components/sections/Newsletter.astro` — FOUND
- `src/components/sections/Articles.astro` — FOUND
- Commit 83a2880 — Newsletter.astro (feat 01-05)
- Commit 2083b08 — Articles.astro (feat 01-05)
- `npm run build` exit 0 — confirmed
- `src/pages/index.astro` unchanged — confirmed
