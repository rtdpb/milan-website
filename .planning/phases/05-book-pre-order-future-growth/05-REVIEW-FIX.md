---
phase: 05-book-pre-order-future-growth
fixed_at: 2026-08-19T17:00:00Z
review_path: .planning/phases/05-book-pre-order-future-growth/05-REVIEW.md
iteration: 1
findings_in_scope: 10
fixed: 10
skipped: 0
status: all_fixed
---

# Phase 05: Code Review Fix Report

**Fixed at:** 2026-08-19T17:00:00Z
**Source review:** `.planning/phases/05-book-pre-order-future-growth/05-REVIEW.md`
**Iteration:** 1

**Summary:**
- Findings in scope: 10 (CR-01..04, WR-01..06; IN-03 folded into CR-04; IN-01/IN-02 out of scope)
- Fixed: 10
- Skipped: 0

## Fixed Issues

### CR-01: Web3Forms `data-key` removed from both form elements

**Files modified:** `src/components/forms/BookInterestForm.astro`, `src/components/forms/ContactForm.astro`
**Commit:** bb1dc47
**Applied fix:** Removed `data-key={TODO_WEB3FORMS_ACCESS_KEY}` attribute from both `<form>` elements. Updated the JS island in each file to read the access key from `f.querySelector('input[name="access_key"]').value` instead of `f.dataset.key`, eliminating the redundant second DOM copy while preserving the placeholder-detection console warning.

---

### CR-02: Trailing slash stripped on Substack subscribe URL

**Files modified:** `src/pages/boek.astro`, `src/pages/en/book.astro`, `src/components/sections/Newsletter.astro`
**Commit:** ff07176
**Applied fix:** Added `.replace(/\/$/, '')` before appending `/subscribe` at all three usage sites. Defensive normalisation guards against a supplier-side trailing slash producing a `//subscribe` double-slash URL silently in production.

---

### CR-03: NL StickyCTA uses `getRelativeLocaleUrl` instead of manual concat

**Files modified:** `src/pages/boek.astro`
**Commit:** eb59fed
**Applied fix:** Added `import { getRelativeLocaleUrl } from 'astro:i18n'` and replaced `href={\`${import.meta.env.BASE_URL}contact\`}` with `href={getRelativeLocaleUrl('nl', 'contact')}`, matching the EN book page pattern and making the href base-safe regardless of Astro's `trailingSlash` configuration.

---

### CR-04 + IN-03: Smoke script content assertions for book pages

**Files modified:** `scripts/smoke-i18n.js`
**Commit:** 7cc126b
**Applied fix:** Replaced existence-only checks (lines 126-127) with full content assertions: `lang="nl"` on NL page, `lang="en"` on EN page, NL eyebrow text ("Binnenkort"), EN eyebrow text ("Coming Soon"), and `hreflang="nl"`/`hreflang="en"` alternates with correct slug cross-references (`/en/book` on NL page, `/boek` on EN page). Script now prints `[smoke-i18n] /boek + /en/book page content assertions: OK` before `I18N_SMOKE_OK`.

---

### WR-01 + WR-02: ContactForm submit button aria-describedby + stale comment

**Files modified:** `src/components/forms/ContactForm.astro`
**Commit:** 2b5b6bf
**Applied fix:** Added `aria-describedby="contact-result"` to the submit button (matching `BookInterestForm`'s pattern). Corrected the inline comment from "State 5: Submitting" to "State 4: Submitting" to match the 7-state contract defined in the file header and the `BookInterestForm` analog.

---

### WR-03: Duplicate consecutive `<h2>` headings resolved

**Files modified:** `src/components/forms/BookInterestForm.astro`
**Commit:** 15d7e09
**Applied fix:** Changed `<h2 class="book-form__heading">` to `<h3 class="book-form__heading">` in `BookInterestForm.astro`. The containing section in `boek.astro`/`en/book.astro` provides the `<h2>` heading; the form's internal heading is subordinate and correctly becomes an `<h3>`. CSS class-based styles are unaffected by the tag change.

---

### WR-04 + WR-05: Nav.astro `isActive` normalization + double semicolon

**Files modified:** `src/components/layout/Nav.astro`
**Commit:** a287f05
**Applied fix (WR-04):** Replaced the two-branch `isActive` comparison with a `normalize` helper that strips trailing slashes from BOTH `currentPath` and `href` before comparing — eliminating the false negative that occurred when `getRelativeLocaleUrl` returned a path with or without a trailing slash that didn't match `currentPath`.
**Applied fix (WR-05):** Removed the stray double semicolon `;;` at the end of the `labelClose` assignment.

---

### WR-06: Newsletter email field that silently discarded user input removed

**Files modified:** `src/components/sections/Newsletter.astro`
**Commit:** 1732259
**Applied fix:** Removed the `<form>` wrapper, email `<input>`, its `<label>`, and the `newsletter__form`/`newsletter__fields`/`newsletter__field-group`/`newsletter__label`/`newsletter__input` CSS blocks. Replaced with a `<div class="newsletter__cta-block">` containing only the honest conditional CTA — the disabled sentinel `<span>` or the live Substack redirect `<a>`. The Plausible `Newsletter: Subscribe` goal listener targets `.newsletter__submit:not(.newsletter__submit--disabled)` and is unaffected. All bilingual sentinel/live states preserved. `labelEmail` removed from destructuring (locale key retained in nl.ts/en.ts for other components).

---

## Skipped Issues

None — all in-scope findings were fixed.

---

## Verification

**Build:** `npm run build` — 0 errors, 0 warnings, 14 pages built (run in isolated worktree `rf-05-903-1787151142`).
**Smoke test:** `node scripts/smoke-i18n.js` — prints `I18N_SMOKE_OK` with new content assertions passing (run in worktree against worktree dist).
**Dutch leak check:** `grep -r "Binnenkort|Houd me op de hoogte|Schrijf je|Mailadres" dist/en/` — no matches.
**Verification environment:** Isolated git worktree (`gsd-reviewfix/05-903`), same repo, no shared node_modules mutation.

---

_Fixed: 2026-08-19T17:00:00Z_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
