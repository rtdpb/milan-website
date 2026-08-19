---
phase: "05"
plan: "02"
subsystem: analytics-sticky-cta
tags: [analytics, plausible, sticky-cta, conversion, bilingual, i18n]
status: complete

dependency_graph:
  requires:
    - 05-01 (PlausibleScript config seam TODO_PLAUSIBLE_DOMAIN, BookInterestForm Plan-01 placeholder)
  provides:
    - PlausibleScript.astro (production + real-domain gated analytics injector)
    - BaseHead PlausibleScript injection
    - Contact: Submit goal (ContactForm)
    - Newsletter: Subscribe goal (Newsletter)
    - Book: Interest goal (BookInterestForm — fills Plan-01 placeholder)
    - Sticky CTA: Click goal (StickyCTA)
    - StickyCTA.astro component (IntersectionObserver-driven, reduced-motion-safe)
    - id="hero-cta" on Hero.astro primary CTA
    - StickyCTA on homepage NL + EN and book page NL + EN
  affects:
    - src/components/analytics/PlausibleScript.astro (new)
    - src/components/layout/BaseHead.astro (PlausibleScript injection)
    - src/components/forms/ContactForm.astro (Contact: Submit goal)
    - src/components/sections/Newsletter.astro (Newsletter: Subscribe goal)
    - src/components/forms/BookInterestForm.astro (Book: Interest goal)
    - src/components/ui/StickyCTA.astro (new)
    - src/components/sections/Hero.astro (id="hero-cta")
    - src/pages/index.astro (StickyCTA placement)
    - src/pages/en/index.astro (StickyCTA placement)
    - src/pages/boek.astro (StickyCTA placement)
    - src/pages/en/book.astro (StickyCTA placement)

tech_stack:
  added: []
  patterns:
    - isProd + IS_PLACEHOLDER double-gate for production-only analytics (D-06)
    - is:inline queue-guard shim for window.plausible buffering
    - typeof (window as any).plausible === 'function' guard (TS strict-mode safe)
    - define:vars props-to-script island for StickyCTA IntersectionObserver
    - IntersectionObserver threshold 0 — show=!isIntersecting for exit detection
    - prefers-reduced-motion guard in both CSS and JS (extends RevealOnScroll pattern)

key_files:
  created:
    - src/components/analytics/PlausibleScript.astro
    - src/components/ui/StickyCTA.astro
  modified:
    - src/components/layout/BaseHead.astro (PlausibleScript import + placement)
    - src/components/forms/ContactForm.astro (Contact: Submit goal)
    - src/components/sections/Newsletter.astro (Newsletter: Subscribe goal)
    - src/components/forms/BookInterestForm.astro (Book: Interest goal, replaces Plan-01 TODO)
    - src/components/sections/Hero.astro (id="hero-cta")
    - src/pages/index.astro (StickyCTA + getStrings import)
    - src/pages/en/index.astro (StickyCTA + getStrings + getRelativeLocaleUrl imports)
    - src/pages/boek.astro (StickyCTA import + placement)
    - src/pages/en/book.astro (StickyCTA + getRelativeLocaleUrl imports + placement)

decisions:
  - "window.plausible typed as (window as any).plausible throughout — TS strict mode has no Plausible type; avoids adding a global.d.ts for a single third-party shim"
  - "StickyCTA script island uses vanilla JS (no TypeScript) to avoid TS errors in define:vars context"
  - "Newsletter.astro Plausible script uses (window as any) cast — Astro processes .astro <script> blocks as TypeScript by default"
  - "typeof guard omitted from plain-JS StickyCTA island (uses if (typeof window.plausible === 'function') directly — no cast needed in plain JS)"

metrics:
  duration_minutes: 8
  completed_date: "2026-08-19"
  tasks_completed: 3
  tasks_total: 3

estimate:
  tokens: 60000

actuals:
  tokens: 68000
  tasks: 3
  commits: 3
---

# Phase 05 Plan 02: GROW-01 Analytics + StickyCTA Summary

**One-liner:** Privacy-first Plausible analytics wired behind a config seam with four guarded conversion goals, plus an IntersectionObserver-driven sticky CTA on homepage and book page, both bilingual.

## What Was Built

Plan 05-02 delivers GROW-01: cookieless analytics and one concrete conversion optimization.

### Task 1: PlausibleScript + BaseHead injection (3619e2c)

Created `src/components/analytics/PlausibleScript.astro` — a dedicated component that renders the Plausible `<script defer data-domain="...">` and an `is:inline` queue-guard shim, but ONLY when both gates pass:

- Gate 1: `import.meta.env.PROD` — inert during `astro dev`
- Gate 2: `!IS_PLACEHOLDER` — inert while `TODO_PLAUSIBLE_DOMAIN` is unreplaced

When either gate fails, the component renders nothing. Verified: `grep -rc "plausible.io/js/script.js" dist/` returns 0 across all built pages while the domain is the placeholder sentinel.

The queue guard is `is:inline` so Astro does not bundle/defer it — it executes synchronously after the `<script defer>` tag, creating `window.plausible.q` immediately so early event calls are safely buffered.

Injected `<PlausibleScript />` into `src/components/layout/BaseHead.astro` after the x-default hreflang block.

### Task 2: 4 Plausible conversion goals (2c52c82)

All four goals are guarded with `typeof (window as any).plausible === 'function'` (TS strict-mode safe cast) and live inside client-side `<script>` islands:

- **Contact: Submit** — fires after `json.success === true` in ContactForm.astro (existing success branch)
- **Newsletter: Subscribe** — new `<script>` island added to Newsletter.astro; attaches a click listener on `.newsletter__submit:not(.newsletter__submit--disabled)` — the `:not()` guard excludes the disabled sentinel span
- **Book: Interest** — replaces the Plan-01 TODO placeholder in BookInterestForm.astro's success branch
- **Sticky CTA: Click** — wired in Task 3 (StickyCTA component)

Auto-fix applied: TypeScript strict mode requires `(window as any).plausible` — the `window` type has no `plausible` property. Applied to all three script contexts.

### Task 3: StickyCTA component + placement (94d0345)

Created `src/components/ui/StickyCTA.astro`:

- Props: `label`, `href`, `targetId`, `plausibleGoal` (default `'Sticky CTA: Click'`)
- Fixed-bottom bar: `position:fixed; bottom:0; z-index:90` (below nav 100, mobile panel 200)
- Background: `--color-bg` — NOT yellow; accent stays on the button only
- IntersectionObserver (threshold 0) watches `targetId` element; shows when `!entry.isIntersecting`
- Initial state: `hidden` attribute + `aria-hidden="true"` — invisible and out of tab order
- Entrance animation: `translateY(100%)` → `translateY(0)` via CSS transition; `transition: none` under `@media (prefers-reduced-motion: reduce)`
- Mobile: button `width:100%; max-width:360px`; desktop: auto-width centred
- Click fires guarded Plausible goal

Added `id="hero-cta"` to the `<a>` in Hero.astro primary CTA (does not change href or classes).

Placed on four pages:
- `src/pages/index.astro` — `targetId="hero-cta"`, href `${BASE_URL}contact`
- `src/pages/en/index.astro` — `targetId="hero-cta"`, href `getRelativeLocaleUrl('en', 'contact')`
- `src/pages/boek.astro` — `targetId="boek-hero-cta"` (existing from Plan-01), href `${BASE_URL}contact`
- `src/pages/en/book.astro` — `targetId="boek-hero-cta"`, href `getRelativeLocaleUrl('en', 'contact')`

## Verification Results

- `npm run build` exits 0: 14 pages built, 0 errors, 0 warnings, 2 hints (expected — Astro warns about `define:vars` and `defer` attributes being treated as `is:inline`; these are intentional)
- `node scripts/smoke-i18n.js` prints `I18N_SMOKE_OK`
- `grep -rc "plausible.io/js/script.js" dist/` returns 0 across all dist files — analytics inert with placeholder domain
- All 4 goal name strings confirmed in respective files: `Contact: Submit`, `Newsletter: Subscribe`, `Book: Interest`, `Sticky CTA: Click`
- StickyCTA placed on all 4 pages with correct `targetId` values

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] TypeScript strict mode: window.plausible does not exist on Window type**
- **Found during:** Task 2 first build attempt (`astro check` runs TypeScript)
- **Issue:** `ts(2339): Property 'plausible' does not exist on type 'Window & typeof globalThis'` — Astro processes `.astro` script blocks as TypeScript by default. Calling `window.plausible(...)` directly fails strict mode with 6 errors across ContactForm, Newsletter, BookInterestForm.
- **Fix:** Cast to `(window as any).plausible` with `typeof` guard — standard approach for third-party browser globals in TS strict mode without adding a global type declaration file
- **Files modified:** ContactForm.astro, Newsletter.astro, BookInterestForm.astro, StickyCTA.astro
- **Impact:** No behavioral change — cast is transparent at runtime; the `typeof` guard still prevents calls when the function is absent

## User Setup Required (not blocking build)

Per the plan's `user_setup` section — the following must be done when the domain is confirmed:

1. Create a Plausible account for the production domain
2. Register 4 Custom Event Goals (exact strings, character-for-character):
   - `Contact: Submit`
   - `Newsletter: Subscribe`
   - `Book: Interest`
   - `Sticky CTA: Click`
3. Replace `TODO_PLAUSIBLE_DOMAIN` in `src/config.ts` with the confirmed production domain (e.g. `milanvandermeulen.nl`)

## Known Stubs

None — all analytics are intentionally inert behind the `TODO_PLAUSIBLE_DOMAIN` sentinel until a real domain is confirmed. The StickyCTA and all goal call sites are fully implemented; they silently no-op while Plausible is not yet active.

## Threat Surface Scan

No new threat surfaces beyond those documented in the plan's threat model:
- T-05-05 (Plausible CDN supply-chain) — mitigated: script absent from dist while sentinel unreplaced; exact pinned URL used
- T-05-06 (privacy) — accepted: cookieless by design, no consent banner
- T-05-07 (event injection) — mitigated: goal names are hard-coded literals, no user input flows into plausible calls

No new threat surfaces introduced.

## Self-Check: PASSED

All created files exist on disk:
- FOUND: src/components/analytics/PlausibleScript.astro
- FOUND: src/components/ui/StickyCTA.astro

All task commits verified in git log:
- FOUND: 3619e2c — PlausibleScript + BaseHead injection
- FOUND: 2c52c82 — 4 Plausible conversion goals
- FOUND: 94d0345 — StickyCTA component + placement
