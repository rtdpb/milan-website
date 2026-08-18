---
phase: "03-newsletter-substack-integration"
plan: "02"
subsystem: "newsletter-page"
status: complete
tags: [newsletter, nieuwsbrief, substack, redirect, rss-archive, astro, news-01, news-02]
completed: "2026-08-19"

dependency_graph:
  requires:
    - "03-01: src/lib/rss.ts (fetchSubstackFeed, ArticleCard, PlaceholderCard types)"
    - "03-01: TODO_SUBSTACK_URL sentinel seam in src/config.ts"
    - "01-05: Newsletter.astro (existing form structure + submit styles)"
    - "01-05: Articles.astro (grid + card inner layout pattern)"
    - "02-02: coaching.astro (hero composition and padding contract)"
  provides:
    - "src/pages/nieuwsbrief.astro: /nieuwsbrief editorial landing page (NEWS-01)"
    - "src/components/sections/Newsletter.astro: email-only Substack redirect signup (NEWS-02)"
    - "nl.nieuwsbrief key block: all /nieuwsbrief Dutch copy strings"
  affects:
    - "Homepage Newsletter section (naam field removed — single email field layout)"
    - "All pages reusing Newsletter.astro (signup is now sentinel-gated redirect anchor)"

tech_stack:
  added: []
  patterns:
    - "Sentinel guard: IS_SENTINEL drives disabled span vs live <a> redirect (News-02)"
    - "Conditional spread: {...(!IS_SENTINEL && { external: true })} for Button external prop"
    - "Task-pair commit: Tasks 1+2 committed together (nl.ts removal paired with Newsletter.astro update)"
    - "Double-quoted string for Dutch apostrophe in nl.nieuwsbrief.pageDesc (Rule 1 auto-fix pattern)"

key_files:
  created:
    - src/pages/nieuwsbrief.astro
  modified:
    - src/i18n/nl.ts
    - src/components/sections/Newsletter.astro

decisions:
  - "Tasks 1+2 committed atomically: nl.ts labelNaam removal paired with Newsletter.astro destructure update to avoid dangling reference (TypeScript would error between tasks)"
  - "nl.nieuwsbrief.pageDesc uses double-quoted string to avoid TypeScript parse error on Dutch apostrophe in 'Milan's' (consistent with arc4Body pattern from Phase 2)"
  - "Social proof section OMITTED: no newsletter-specific quote exists; fabricating or repurposing coaching/speaking quotes is prohibited (HOME-11, UI-SPEC §2e)"
  - "No dark band on /nieuwsbrief page: all sections default or surface — editorial light throughout (UI-SPEC §2a; coaching.astro has one dark band, nieuwsbrief.astro has none)"
  - "Value-prop heading uses visually-hidden h2: aria-labelledby contract satisfied without visual disruption to lightweight tile layout"
  - "Nav/Footer/Samenwerken nieuwsbrief enable: not in 03-02 task list or files_modified — out of plan scope; deferred to plan executor or Phase 3 continuation"

metrics:
  duration: "~12 min"
  completed: "2026-08-19"

actuals:
  tokens: 15500
  tasks: 3
  commits: 2
---

# Phase 03 Plan 02: /nieuwsbrief Page + Newsletter Signup Rewire Summary

## One-liner

Email-only Substack redirect signup (IS_SENTINEL guard) + full /nieuwsbrief editorial landing page (hero / value-prop / signup / 10-item archive) reusing the Phase 1 RSS pipeline.

## What Was Built

### Task 1+2: nl.nieuwsbrief copy block + Newsletter.astro rewire (committed atomically)

**`src/i18n/nl.ts`** — New `nieuwsbrief` key block added:
- `pageTitle`: "Nieuwsbrief — Milan van der Meulen"
- `pageDesc`: "Elke maand eerlijke lessen over ondernemen, schalen en leiderschap. Schrijf je in op Milan's Substack nieuwsbrief." (double-quoted for Dutch apostrophe safety)
- `eyebrow`, `heading`, `subtext`, `cta`, `archiveHeading`: full Dutch copy per UI-SPEC
- `valueProps`: 3-item array: Eerlijk / Praktisch / Maandelijks with descriptions
- `labelNaam` removed from `nl.newsletter` (D-05: redirect cannot carry name into Substack)

**`src/components/sections/Newsletter.astro`** — Rewired to email-only Substack redirect:
- `IS_SENTINEL = TODO_SUBSTACK_URL === 'TODO_SUBSTACK_URL'` + `subscribeUrl = ${TODO_SUBSTACK_URL}/subscribe`
- Destructure updated: `{ heading, subtext, labelEmail, cta, disclaimer }` (labelNaam removed)
- Naam field-group (id="nl-naam") entirely removed (D-05)
- Single email field with `max-width: 480px; margin-inline: auto` centering (UI-SPEC §Surface 1)
- Submit conditional: sentinel → existing aria-disabled `<span>` unchanged; live → `<a href={subscribeUrl} target="_blank" rel="noopener noreferrer">` (T-3-01)
- Hover/focus CSS added: `:not(--disabled):hover` → accent-dark + scale(1.02); `:focus-visible` → 2px accent outline
- No `?email=` prefill, no JS redirect handler, no on-site success state (prohibitions upheld)
- `onsubmit="return false;"` retained (form never submitted on-site)

### Task 3: /nieuwsbrief editorial landing page

**`src/pages/nieuwsbrief.astro`** — New page following coaching.astro composition pattern:

**Section 1 — Hero (`variant="default"`):**
- Eyebrow, H1 `id="nieuwsbrief-hero-heading"` (text-wrap:balance, --text-5xl), subtext
- Primary CTA: `<Button disabled={IS_SENTINEL} external={!IS_SENTINEL} href={subscribeUrl}>` — sentinel-gated
- Hero CSS: max-width 720px, flex column, gap --space-lg, padding-block --space-2xl/--space-4xl
- Single yellow element (primary CTA button) — restrained-yellow rule upheld

**Section 2 — Value-prop (`variant="surface"`):**
- 3 lightweight tiles from `nl.nieuwsbrief.valueProps` — no Card component (UI-SPEC §2b: keep lightweight)
- Flex row-wrap on ≥640px, column on mobile
- Visually-hidden H2 for aria-labelledby semantics
- No yellow in this section

**Section 3 — Signup (`variant="default"`):**
- `<Newsletter />` component reused as-is — the Phase 3 rewired redirect version
- No duplicate signup markup

**Section 4 — Archive (`variant="default"`):**
- H2: nl.nieuwsbrief.archiveHeading ("Eerder verschenen")
- `archiveArticles: ArticleCard[] | PlaceholderCard[]` via sentinel guard, maxItems 10
- Same 1→2→3 responsive grid as Articles.astro; RevealOnScroll stagger (delay={i * 80})
- PlaceholderBadge only on `article.isPlaceholder` cards
- "Lees verder": disabled span when placeholder, `<a aria-label>` when live (T-3-01, a11y)
- "Alle artikelen": disabled span when IS_SENTINEL, `<a target="_blank" rel="noopener noreferrer">` when live
- D-06 fallback: empty feed → console.warn + placeholder cards

**Section 5 — Social proof:**
- OMITTED — no newsletter-specific testimonial/quote exists (HOME-11, UI-SPEC §2e)

**SEO:**
- `<BaseLayout title={nl.nieuwsbrief.pageTitle} description={nl.nieuwsbrief.pageDesc}>`
- Unique title "Nieuwsbrief — Milan van der Meulen" + meta description set

## Verification Evidence

```
npm run build → 0 errors, 6 pages built (was 5 in Plan 01)
dist/nieuwsbrief/index.html: FOUND
Built HTML: 1 H1, title correct, archiveHeading present, 3 placeholder badges, valueProps OK
Newsletter.astro: subscribeUrl OK, noopener OK, naam_gone OK, aria-disabled OK
nl.ts: nieuwsbrief key OK, archiveHeading OK, labelNaam removed from nl.newsletter
no_testimonial grep: 0 (no social proof section rendered)
BASE_URL: all internal hrefs use import.meta.env.BASE_URL
```

## Deviations from Plan

### Task-pair commit (documented dependency)

Tasks 1 and 2 were committed together (`e5f10f6`) rather than separately. The plan explicitly states "This removal must be paired with the Newsletter.astro destructure update in Task 2 (do not leave a dangling reference)." Running `npx astro check` between the two changes would produce a TypeScript error (`Property 'labelNaam' does not exist`). Committing atomically as a pair is the correct approach and was anticipated by the plan.

### Nav/Footer/Samenwerken not updated

The UI-SPEC §Surface 4 describes enabling the Nieuwsbrief link in Nav, Footer, and Samenwerken.astro. These changes are NOT in the plan's `files_modified` list or task list — they were out of scope for 03-02. The /nieuwsbrief page is reachable by direct URL. Nav/Footer/Samenwerken enabling is deferred to a continuation plan or Phase 3 wrap-up.

## Known Stubs

None — the plan's goal (NEWS-01 page + NEWS-02 redirect signup) is fully delivered. The sentinel state (placeholder cards + disabled CTA) is the correct, honest observable behavior until `TODO_SUBSTACK_URL` is replaced. One grep-replace of the sentinel value flips everything live.

## Threat Surface Scan

No new security-relevant surface beyond what the threat model covers:
- T-3-01: All external anchors in Newsletter.astro carry `rel="noopener noreferrer"` ✓
- T-3-01: All external anchors in nieuwsbrief.astro carry `rel="noopener noreferrer"` ✓
- T-3-02: No `set:html` on RSS content in nieuwsbrief.astro ✓
- T-3-06: subscribeUrl is `${TODO_SUBSTACK_URL}/subscribe` hardcoded — no user-controlled URL construction; no `?email=` prefill ✓

## Self-Check

### Files exist

- `src/i18n/nl.ts` — FOUND (modified)
- `src/components/sections/Newsletter.astro` — FOUND (modified)
- `src/pages/nieuwsbrief.astro` — FOUND (created)
- `dist/nieuwsbrief/index.html` — FOUND (built)

### Commits exist

- `e5f10f6` — feat(03-02): add nl.nieuwsbrief copy; rewire Newsletter to email-only Substack redirect
- `1280524` — feat(03-02): create /nieuwsbrief editorial landing page (NEWS-01)

## Self-Check: PASSED

Both commits exist, all files present, build verified green (6 pages), all acceptance criteria passed.
