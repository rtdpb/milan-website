---
phase: "05"
plan: "01"
subsystem: book-page
tags: [book, bilingual, i18n, forms, web3forms, hreflang, nav-footer]
status: complete

dependency_graph:
  requires: []
  provides:
    - /boek NL book teaser page
    - /en/book EN book teaser page
    - BookInterestForm.astro
    - TODO_BOOK_CHECKOUT_URL config seam
    - TODO_PLAUSIBLE_DOMAIN config seam (Plan 02 prep)
    - boek slug map entry (nlToEn)
    - mirrored boek locale keys (nl.ts + en.ts)
    - Boek nav/footer enabled both locales
    - Extended smoke-i18n.js
  affects:
    - src/components/layout/Nav.astro (Boek item enabled)
    - src/components/layout/Footer.astro (Boek item enabled)
    - src/i18n/nl.ts (boek block added)
    - src/i18n/en.ts (boek block mirrored)
    - src/i18n/utils.ts (boek→book slug entry)
    - src/config.ts (2 new TODO_ constants)
    - scripts/smoke-i18n.js (extended)

tech_stack:
  added: []
  patterns:
    - IS_SENTINEL guard (extends existing pattern from Newsletter.astro)
    - Tracer task type — full vertical slice before Plan 02 expansion

key_files:
  created:
    - src/pages/boek.astro
    - src/pages/en/book.astro
    - src/components/forms/BookInterestForm.astro
  modified:
    - src/config.ts (added TODO_BOOK_CHECKOUT_URL + TODO_PLAUSIBLE_DOMAIN)
    - src/i18n/utils.ts (added 'boek':'book' to nlToEn)
    - src/i18n/nl.ts (added boek key block, 24 keys)
    - src/i18n/en.ts (added boek key block, 24 keys mirrored)
    - src/components/layout/Nav.astro (enabled Boek item both locales)
    - src/components/layout/Footer.astro (enabled Boek item both locales)
    - scripts/smoke-i18n.js (extended for /boek + /en/book)

decisions:
  - "D-03 checkout seam: IS_CHECKOUT_SENTINEL true → block OMITTED entirely (never disabled button) — honesty rule honored"
  - "D-02 dual capture: primary Substack redirect (IS_SENTINEL-gated) + secondary BookInterestForm (2-field)"
  - "D-01 honest teaser: no purchase date/title/confirmed info; copy sets 'book in the making' expectation"
  - "HTML comments inside Astro {} ternary expressions cause CompilerError — moved to outer template comments (Rule 1 auto-fix)"

metrics:
  duration_minutes: 8
  completed_date: "2026-08-19"
  tasks_completed: 3
  tasks_total: 3

estimate:
  tokens: 60000

actuals:
  tokens: 74000
  tasks: 3
  commits: 3
---

# Phase 05 Plan 01: Wave-0 Tracer — Book Page Architecture Summary

**One-liner:** Bilingual /boek + /en/book honest-teaser pages with dual interest capture (IS_SENTINEL-gated Substack + BookInterestForm), hreflang cross-linked, Boek nav/footer enabled both locales.

## What Was Built

Plan 05-01 delivers the Phase 5 tracer: the complete book/pre-order page end-to-end and bilingual, proving the full architecture before Plan 02 adds analytics.

### Task 1: Wave-0 infra (e499f1c)

Added two new constants to `src/config.ts` following the existing TODO_ docblock+sentinel pattern:
- `TODO_BOOK_CHECKOUT_URL` (D-03 checkout seam — omitted until supplied, honesty rule)
- `TODO_PLAUSIBLE_DOMAIN` (D-06 analytics seam — Plan 02 prep, inert until supplied)

Added `'boek': 'book'` to the `nlToEn` slug map in `src/i18n/utils.ts` (value was free — confirmed not already a value in the map).

Added 24-key `boek` block to both `src/i18n/nl.ts` and `src/i18n/en.ts` (mirrored shape). The build-time `satisfies Record<Locale, DeepWiden<typeof nl>>` shape check confirmed key parity. Dutch apostrophe-containing strings use double quotes per the existing arc4Body convention.

### Task 2: BookInterestForm (44a18f0)

Created `src/components/forms/BookInterestForm.astro` by adapting ContactForm.astro:
- Two visible fields: name (text, autocomplete=name) + email (email, autocomplete=email, font-size 16px iOS zoom prevention)
- Hidden inputs: access_key, subject (t.boek.emailSubject), redirect, type=boek-interesse
- Honeypot botcheck checkbox (display:none, tabindex=-1, aria-hidden) — T-05-02
- 7-state machine (idle/submitting/success/server-error/network-error) — mirrors ContactForm
- Success branch: only `t.boek.successMsg` written to DOM via `textContent` — never `json.message` (T-05-01)
- max-width 480px centred wrapper containing overflow at 320px (backstop)
- aria-describedby on submit pointing to result region
- Placeholder comment for Plan 02 Plausible `Book: Interest` goal

### Task 3: Book pages + nav/footer + smoke (de37221)

Created `src/pages/boek.astro` and `src/pages/en/book.astro` (three sections each):
1. `#boek-hero` (light) — eyebrow + H1 (--text-5xl fluid) + body + IS_SENTINEL-gated Substack CTA with `id="boek-hero-cta"`
2. `#boek-teaser` (dark, one per page) — honest statement, no purchase button
3. `#boek-capture` (light) — Substack + "of"/"or" separator + BookInterestForm

Honesty rules honored:
- IS_CHECKOUT_SENTINEL true → checkout block OMITTED entirely
- IS_SUBSTACK_SENTINEL true → disabled span (role=button, aria-disabled, opacity 0.5)
- `id="boek-hero-cta"` on hero CTA for Plan 02 StickyCTA IntersectionObserver

hreflang: explicit `nlSlug="boek"` + `enSlug="book"` passed to BaseLayout on both pages. Verified in built HTML: `/boek/` page has `hreflang="en"` pointing to `/en/book/` and vice versa.

Enabled Boek nav/footer items in both locales:
- Nav.astro EN: `href: getRelativeLocaleUrl('en', 'book')`
- Nav.astro NL: `href: \`${base}boek\``
- Footer.astro EN: `href: getRelativeLocaleUrl('en', 'book')`
- Footer.astro NL: `href: \`${import.meta.env.BASE_URL}boek\``

Extended `scripts/smoke-i18n.js` with `/boek` + `/en/book` page-presence assertions. `node scripts/smoke-i18n.js` prints `I18N_SMOKE_OK`.

## Verification Results

- `npm run build` exits 0: 14 pages built (was 12, +2 for /boek + /en/book)
- `node scripts/smoke-i18n.js` prints `I18N_SMOKE_OK`
- `dist/boek/index.html` and `dist/en/book/index.html` exist
- hreflang cross-links verified in built HTML (not self-referential)
- Boek nav link in built HTML: `class="nav-link nav-link--active"` (real anchor, not disabled span)
- No "Pre-order" text in `dist/boek/index.html` while TODO_BOOK_CHECKOUT_URL unreplaced
- TypeScript satisfies shape check confirms nl.ts and en.ts boek blocks are key-for-key mirrored

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] HTML comments inside Astro ternary expressions cause CompilerError**
- **Found during:** Task 3 build
- **Issue:** Placed HTML `<!-- -->` comments inside `{}` Astro template ternary expressions — Astro's compiler throws `CompilerError: Unexpected token` on line 58 of en/book.astro
- **Fix:** Moved comments to outer template level (before/after the ternary blocks, not inside them)
- **Files modified:** src/pages/boek.astro, src/pages/en/book.astro
- **Impact:** No behavioral change — comments are documentation only

**2. [Rule 2 - Auto-fix] Removed `getRelativeLocaleUrl` unused import from en/book.astro**
- **Found during:** Task 3 — TypeScript hint `ts(6133)` in astro check
- **Issue:** Import was included from pattern guide but book page uses `TODO_SUBSTACK_URL` and `TODO_BOOK_CHECKOUT_URL` directly (not locale-URL routing) so the import was unused
- **Fix:** Removed the import from en/book.astro (the book page uses direct config constants for external URLs)
- **Note:** This is a valid deviation — the EN book page's external links (Substack, checkout) are config constants, not internal locale routes

**3. [Rule 1 - Bug] json.message appeared in block-comment docstring (failing acceptance criterion grep)**
- **Found during:** Task 2 acceptance check
- **Issue:** Docblock line `* 5 success — form hidden, static t.boek.successMsg shown (NEVER json.message)` triggered `grep -v '^\s*//' | grep -c "json.message"` returning 1 (block comment `*` prefix not filtered by `^\s*//` grep)
- **Fix:** Replaced with `(API response never echoed)` — functionally identical documentation
- **Files modified:** src/components/forms/BookInterestForm.astro

## Known Stubs

None — all config sentinel constants are by-design placeholders (TODO_BOOK_CHECKOUT_URL, TODO_SUBSTACK_URL, TODO_WEB3FORMS_ACCESS_KEY). The book page ships correctly with IS_SENTINEL guards; no user-visible fake content.

## Threat Surface Scan

No new threat surfaces beyond those already documented in the plan's threat model:
- T-05-01 (DOM XSS via BookInterestForm) — mitigated: only static t.boek.* to DOM
- T-05-02 (spam/abuse honeypot) — mitigated: botcheck checkbox present
- T-05-03 (open redirect via checkout seam) — mitigated: block OMITTED while sentinel
- T-05-04 (tab-napping via Substack anchor) — mitigated: rel="noopener noreferrer"

## Self-Check

All created/modified files exist and commits are verified.
