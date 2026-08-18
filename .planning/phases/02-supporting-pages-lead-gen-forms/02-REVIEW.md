---
phase: 02-supporting-pages-lead-gen-forms
reviewed: 2026-08-18T00:00:00Z
depth: standard
files_reviewed: 12
files_reviewed_list:
  - src/components/forms/ContactForm.astro
  - src/pages/contact.astro
  - src/pages/coaching.astro
  - src/pages/spreker.astro
  - src/pages/mijn-verhaal.astro
  - src/config.ts
  - src/i18n/nl.ts
  - src/components/layout/Nav.astro
  - src/components/layout/Footer.astro
  - src/components/sections/Hero.astro
  - src/components/sections/Samenwerken.astro
  - src/components/sections/Story.astro
findings:
  critical: 1
  warning: 4
  info: 2
  total: 7
status: issues_found
---

# Phase 02: Code Review Report

**Reviewed:** 2026-08-18
**Depth:** standard
**Files Reviewed:** 12
**Status:** issues_found

## Summary

This phase added four subpages (coaching, spreker, mijn-verhaal, contact) and the Web3Forms ContactForm. The XSS safeguards in ContactForm.astro are solid: no API response body is echoed into the DOM, static nl.ts strings are used exclusively, and the honeypot checkbox is present. Internal hrefs are consistently built with `${import.meta.env.BASE_URL}slug` throughout all new pages. The honest-CTA rule is applied correctly.

The most significant finding is a dormant production bug in `src/config.ts`: the exported `CONTACT_URL` constant is defined with a bare `/contact` path (no BASE_URL prefix), which would 404 on GitHub Pages if any code consumed it. Additionally, the `CSS.escape` query-param guard in ContactForm uses the wrong API for the job and carries latent correctness risk. Two layout/styling defects round out the set.

---

## Critical Issues

### CR-01: `CONTACT_URL` in config.ts has no BASE_URL prefix — will 404 on GitHub Pages

**File:** `src/config.ts:35`

**Issue:** The exported constant `CONTACT_URL = '/contact'` carries a bare absolute path. Every other internal link in the codebase correctly uses the `${import.meta.env.BASE_URL}contact` pattern, which on GitHub Pages resolves to `/milan-website/contact`. A bare `/contact` resolves to the GitHub Pages root and produces a 404. The constant is currently unused by any of the reviewed files, but it is a named public export that any future file could import and use — at which point it silently ships a broken link. Its name implies it is the correct authoritative constant for the contact URL, making it a trap.

**Fix:** Add the BASE_URL prefix (this must be done at the use-site, not in config.ts, because `import.meta.env` is not available in a plain `.ts` module at the top level; the constant should be removed or clearly documented as not safe for use as an `href`):

Option A — Remove the constant entirely; all callers already use the inline pattern:
```ts
// Remove this line from src/config.ts:
// export const CONTACT_URL = '/contact';
```

Option B — Rename to make the limitation explicit, preventing accidental use:
```ts
/** Path segment only — callers must prepend import.meta.env.BASE_URL */
export const CONTACT_PATH = 'contact';
// Used as: href={`${import.meta.env.BASE_URL}${CONTACT_PATH}`}
```

---

## Warnings

### WR-01: `CSS.escape` is the wrong tool for the query-param option-value guard

**File:** `src/components/forms/ContactForm.astro:208-213`

**Issue:** `CSS.escape(typeParam)` escapes a string to be safe as a CSS *identifier* (e.g., escaping `.` to `\.`). It is then used inside an attribute selector: `option[value="${safeValue}"]`. CSS attribute value selectors already match literal strings — they do not interpret CSS identifiers — so the escaped form of a value with CSS-special characters would never match the actual `value` attribute, silently falling through to the default option rather than raising an error. More critically, if `typeParam` contains a double-quote character (`"`), `CSS.escape` does not escape it, meaning the constructed selector string `option[value=""...]` is broken. The intent is to validate `typeParam` against a fixed allowlist; `CSS.escape` does not do that.

Concretely: `?type=coaching"` → `CSS.escape` returns `coaching"` → selector becomes `option[value="coaching""]` → `querySelector` throws a `SyntaxError` and the unhandled exception causes the IIFE to crash silently, breaking the submit handler entirely.

**Fix:** Replace the CSS.escape approach with a direct allowlist check:
```ts
const VALID_TYPES = new Set(['algemeen', 'lezing', 'coaching']);
const typeParam = params.get('type');
if (typeParam && VALID_TYPES.has(typeParam)) {
  sel.value = typeParam;
}
// Unknown / unmatched values are silently ignored → remains "algemeen" default
```
This is semantically correct, handles all edge-case characters, and is easier to read.

---

### WR-02: `novalidate` on the form disables native validation for the no-JS path

**File:** `src/components/forms/ContactForm.astro:59`

**Issue:** The `<form>` has `novalidate`, which disables the browser's built-in HTML5 constraint validation for ALL paths, including the no-JS (native POST) path. On the no-JS path, a visitor can submit the form with empty `naam`, `email`, and `bericht` fields. The form POSTs to Web3Forms which then returns a server-side error (or silently discards), rather than the browser blocking submission locally. The JS path is unaffected (it runs `new FormData(f)` and the required fields still carry the `required` attribute for AT). The `novalidate` attribute was presumably added to allow custom JS validation styling, but custom validation is not implemented — the JS handler does not inspect field values at all before POSTing.

**Fix:** Either remove `novalidate` so the no-JS path retains native validation, or add explicit field validation in the JS submit handler before the fetch call:
```ts
// Option: validate before disabling button
if (!f.checkValidity()) {
  f.reportValidity();
  return;
}
// then proceed to set submitting state and fetch
```
If `novalidate` is intentionally kept for styling purposes (custom error messages), the JS handler must perform its own validation before sending.

---

### WR-03: Spreker testimonial card uses `variant="dark"` inside a light-background section

**File:** `src/pages/spreker.astro:104`

**Issue:** The testimonial `<Card>` in `spreker.astro` is rendered with `variant="dark"` (dark card background) inside `<SectionWrapper ... variant="default">` (light/cream background). The equivalent testimonial section in `coaching.astro` (line 103) correctly uses `<Card variant="default">`. This produces a dark card panel on a light page section in the Spreker page, which is visually inconsistent with the overall design and with how the Coaching page renders the same pattern. The dark-card-on-light-section combination is not described in the UI-SPEC as intentional.

**Fix:** Change to `variant="default"` to match the coaching.astro pattern and the light section background:
```astro
<!-- spreker.astro line 104 — change from: -->
<Card variant="dark">
<!-- to: -->
<Card variant="default">
```
Also update the `.testimonial-card__quote` and attribution color values in the `<style>` block (currently set to `var(--color-dark-text)` for this card, which would render as off-white text — invisible on a light card background).

---

### WR-04: Spreker hero image uses `loading="lazy"` — LCP candidate not eagerly loaded

**File:** `src/pages/spreker.astro:65`

**Issue:** The speaking photo in the spreker hero (`milan-speaking-graph.jpg`) occupies the right half of the above-the-fold split-column layout on tablet and desktop. It is the largest visible image in the initial viewport and therefore the LCP candidate. It uses `loading="lazy"`, which instructs the browser to defer fetching it until it scrolls near the viewport — on a page where it already IS in the viewport. The homepage correctly marks its equivalent hero image with `priority` (Astro's shorthand for `loading="eager" fetchpriority="high"`). The spreker page omits this.

**Fix:**
```astro
<Picture
  src={speakingSrc}
  formats={['avif', 'webp']}
  widths={[400, 600, 800]}
  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 520px"
  loading="eager"
  fetchpriority="high"
  alt={speakingAlt}
  class="spreker-hero__img"
/>
```
Or use the Astro `priority` prop if the `Picture` component accepts it (check astro:assets docs for the current API).

---

## Info

### IN-01: `data-key` attribute on the form element duplicates the hidden input value

**File:** `src/components/forms/ContactForm.astro:66, 70`

**Issue:** The access key is stored in two places: the `data-key` attribute on `<form>` (consumed by the JS island) and the `<input type="hidden" name="access_key">` (consumed by the native POST path). Both end up in the rendered HTML. The duplication is harmless (the key is intentionally public) but the `data-key` approach adds a second vector that is easy to miss in future audits. A cleaner pattern would be to read the key from the hidden input directly in the JS handler.

**Fix:** In the JS island, read the key from the hidden input rather than a duplicated data attribute:
```ts
const accessKeyInput = f.querySelector('input[name="access_key"]') as HTMLInputElement | null;
const accessKey = accessKeyInput?.value || '';
```
Then remove `data-key` from the `<form>` element.

---

### IN-02: `CONTACT_URL` constant is exported but consumed by no reviewed file — dead export

**File:** `src/config.ts:35`

**Issue:** `CONTACT_URL` is exported from config.ts but is not imported anywhere in the reviewed files. Nav.astro, Footer.astro, Hero.astro, Samenwerken.astro, and all page files use the inline `${import.meta.env.BASE_URL}contact` pattern instead. A dead named export is not a bug, but combined with CR-01's finding that the constant value is unsafe to use as an `href`, leaving it as an export increases the risk that a future developer imports and uses it without reading the caveats.

**Fix:** Remove the export or replace it with the renamed `CONTACT_PATH` suggested in CR-01 with a clear docstring explaining it is not an `href`-ready value.

---

_Reviewed: 2026-08-18_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
