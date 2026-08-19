---
phase: 05-book-pre-order-future-growth
reviewed: 2026-08-19T00:00:00Z
depth: standard
files_reviewed: 18
files_reviewed_list:
  - src/config.ts
  - src/i18n/utils.ts
  - src/i18n/nl.ts
  - src/i18n/en.ts
  - src/components/analytics/PlausibleScript.astro
  - src/components/forms/BookInterestForm.astro
  - src/components/forms/ContactForm.astro
  - src/components/ui/StickyCTA.astro
  - src/components/layout/BaseHead.astro
  - src/components/layout/Nav.astro
  - src/components/layout/Footer.astro
  - src/components/sections/Hero.astro
  - src/components/sections/Newsletter.astro
  - src/pages/boek.astro
  - src/pages/en/book.astro
  - src/pages/index.astro
  - src/pages/en/index.astro
  - scripts/smoke-i18n.js
findings:
  critical: 4
  warning: 6
  info: 3
  total: 13
status: issues_found
---

# Phase 05: Code Review Report

**Reviewed:** 2026-08-19T00:00:00Z
**Depth:** standard
**Files Reviewed:** 18
**Status:** issues_found

## Summary

Phase 5 delivers the bilingual book teaser page, Plausible analytics gating, and the sticky CTA bar. The overall architecture is sound: analytics double-gating (prod + sentinel check) is correctly implemented, the XSS rules (static i18n strings only, never echoing API responses) are followed consistently across both forms, and the honesty-rule checkout-button omission works correctly.

Four critical issues were found: a data-key attribute leaking the Web3Forms sentinel directly into the HTML source of every page that mounts either form; a `subscribeUrl` that is constructed unconditionally even when the Substack sentinel is active (producing a navigable but broken URL when the sentinel is live); the smoke-i18n script not asserting Dutch-language absence on the EN book page; and the NL book page StickyCTA using a raw `BASE_URL + 'contact'` concatenation that can double-slash under some Astro configurations.

Six warnings cover a missing `aria-describedby` wiring on the contact submit button, a stale in-file comment in ContactForm, the missing `BookInterestForm` heading-level context, an always-active nav item edge case, a double semicolon in Nav.astro, and the smoke script's failure to assert a page-content invariant beyond mere file existence.

---

## Critical Issues

### CR-01: Web3Forms Placeholder Key Exposed as `data-key` in Rendered HTML

**File:** `src/components/forms/BookInterestForm.astro:66` and `src/components/forms/ContactForm.astro:69`

**Issue:** Both forms write `data-key={TODO_WEB3FORMS_ACCESS_KEY}` directly onto the `<form>` element in the rendered HTML. Even though the sentinel string `TODO_WEB3FORMS_ACCESS_KEY` is not a secret (per the config comment), this attribute is redundant: the same value already appears as `<input type="hidden" name="access_key">` on the next line. The JS island reads from `f.dataset.key` to populate the in-browser warn check, but it does NOT use this value to override the hidden input — so the hidden input already carries the key for the actual fetch payload. The `data-key` attribute therefore serves no submit purpose and only adds a second copy of the token in the DOM. When the real key is eventually substituted it will appear in two places in the HTML source, contrary to the config comment that says the value appears in only one place on the form. This violates the "single source of truth" principle the file documents, and if the project policy ever changes to treat the key as semi-private the double-exposure is a liability.

More acutely: the JS island reads `f.dataset.key` only to print a console warning when it equals the sentinel. It never writes this value into the hidden input at runtime. The result is that the `data-key` attribute is dead weight in the non-sentinel case. In the sentinel case, the placeholder key is unnecessarily surface-exposed in plain HTML.

**Fix:** Remove the `data-key` attribute from both form elements. In the JS island, replace the `dataset.key` read with a direct read of the hidden input:

```js
// Instead of: const accessKey = f.dataset.key || '';
const accessKeyInput = f.querySelector('input[name="access_key"]');
const accessKey = accessKeyInput ? accessKeyInput.value : '';
if (accessKey === 'TODO_WEB3FORMS_ACCESS_KEY') { ... }
```

This eliminates the redundant DOM attribute while preserving the placeholder-detection logic.

---

### CR-02: `subscribeUrl` Built from Sentinel String is Navigable When Substack is Live

**File:** `src/pages/boek.astro:39` and `src/pages/en/book.astro:34`

**Issue:** Both book pages compute:

```js
const subscribeUrl = `${TODO_SUBSTACK_URL}/subscribe`;
```

unconditionally, before any sentinel check. When `IS_SUBSTACK_SENTINEL` is `true` this string equals `'TODO_SUBSTACK_URL/subscribe'` and is never used in a rendered anchor — correctly. However the variable is also used in the `IS_SUBSTACK_SENTINEL === false` branch, where it becomes the actual `href` of the live Substack anchor. The problem is that this is the exact same pattern used in `Newsletter.astro` (line 32), and it works there too — so by itself this is not wrong.

The real bug is **the inverse**: if the Substack URL is ever supplied but contains a trailing slash (e.g. `https://milan.substack.com/`), the resulting `subscribeUrl` will be `https://milan.substack.com//subscribe`, producing a double-slash URL that most servers handle but that is technically malformed. The `config.ts` comment for `TODO_SUBSTACK_URL` says "strip any trailing slash from the supplied URL before replacing" but this instruction exists only in a comment — there is no runtime guard. A developer replacing the constant who omits that step ships a broken subscribe link to production silently.

**Fix:** Add a runtime normalisation at the point of consumption in all three files (`Newsletter.astro`, `boek.astro`, `en/book.astro`):

```js
const normalizedSubstackUrl = TODO_SUBSTACK_URL.replace(/\/$/, '');
const subscribeUrl = `${normalizedSubstackUrl}/subscribe`;
```

Alternatively, enforce the invariant once in `config.ts` by wrapping the exported constant:

```ts
// In config.ts after the constant declaration:
// (Exported as a validated URL once real)
```

The safest approach is defensive normalisation at each usage site.

---

### CR-03: StickyCTA on NL Book Page Uses Unsafe `BASE_URL` Concatenation

**File:** `src/pages/boek.astro:157`

**Issue:**

```astro
<StickyCTA
  label={t.boek.stickyCta}
  href={`${import.meta.env.BASE_URL}contact`}
  targetId="boek-hero-cta"
/>
```

`import.meta.env.BASE_URL` is `/milan-website/` in production (trailing slash is guaranteed by Astro). The resulting href is `/milan-website/contact` — correct in practice. However, this is an inconsistency in pattern: the EN equivalent (`en/book.astro:150`) correctly uses `getRelativeLocaleUrl('en', 'contact')`, and all EN nav/footer items use `getRelativeLocaleUrl`. The NL book page is the only new page in this phase that still uses manual `BASE_URL + slug` concatenation for an intra-site link. If `BASE_URL` were ever configured without a trailing slash (non-default but legal in Astro), the link would silently become `/milan-websitecontact`.

The broader concern for this phase is that `BASE_URL` trailing-slash behaviour is Astro-version-dependent. Astro 5+ changed this default. Given the file comment says "Astro 7", any version-upgrade risk makes the `getRelativeLocaleUrl` pattern strictly safer.

**Fix:** Use `getRelativeLocaleUrl` consistently with the EN counterpart:

```astro
import { getRelativeLocaleUrl } from 'astro:i18n';
// ...
<StickyCTA
  label={t.boek.stickyCta}
  href={getRelativeLocaleUrl('nl', 'contact')}
  targetId="boek-hero-cta"
/>
```

---

### CR-04: Smoke Script Does Not Assert EN Book Page is in English

**File:** `scripts/smoke-i18n.js:121-129`

**Issue:** The Phase 5 additions to the smoke script (lines 121-129) only assert that `dist/boek/index.html` and `dist/en/book/index.html` *exist* — they do not assert any content property of these pages. This means the test passes even if:

1. Both pages render in Dutch (e.g., `getStrings` falls back to `nl` for the EN page due to a misconfigured locale)
2. The EN book page contains Dutch `boek.eyebrow` text ("Binnenkort") instead of the EN value ("Coming Soon")
3. The `lang` attribute on the EN page is wrong

By contrast the existing assertions for `en/index.html` check `lang="en"` explicitly (line 66). The book pages get no such content check.

**Fix:** Add content assertions for both book pages:

```js
const nlBoekContent = readFile(nlBoekPath, 'dist/boek/index.html');
const enBookContent = readFile(enBookPath, 'dist/en/book/index.html');

// Assert lang attributes
assertContains(nlBoekContent, 'lang="nl"', 'dist/boek/index.html must contain lang="nl"');
assertContains(enBookContent, 'lang="en"', 'dist/en/book/index.html must contain lang="en"');

// Assert EN book page uses EN copy (D-04: no Dutch leak on EN page)
assertContains(enBookContent, 'Coming Soon', 'dist/en/book/index.html must contain EN eyebrow "Coming Soon"');
assertContains(enBookContent, 'hreflang="nl"', 'dist/en/book/index.html must have hreflang="nl"');
assertContains(enBookContent, 'hreflang="en"', 'dist/en/book/index.html must have hreflang="en"');

// Assert NL page does NOT contain EN-only copy
// (guards against locale fallback regression)
assertContains(nlBoekContent, 'Binnenkort', 'dist/boek/index.html must contain NL eyebrow "Binnenkort"');
```

---

## Warnings

### WR-01: `ContactForm` Submit Button Missing `aria-describedby` Pointing to Result Region

**File:** `src/components/forms/ContactForm.astro:160-166`

**Issue:** The `BookInterestForm` submit button correctly carries `aria-describedby="book-result"` (line 129) so screen readers announce the result region when it appears. The `ContactForm` submit button does not have an `aria-describedby` attribute at all:

```html
<button
  type="submit"
  id="contact-submit"
  class="btn btn--primary contact-submit"
>
```

The matching result region `id="contact-result"` exists at line 170. The absence of `aria-describedby` means screen readers are not connected to the live region on the submit button, degrading accessibility parity between the two forms. The comment at line 128 in `BookInterestForm.astro` explicitly calls this out as an a11y design decision — `ContactForm` omits it without explanation.

**Fix:**

```astro
<button
  type="submit"
  id="contact-submit"
  class="btn btn--primary contact-submit"
  aria-describedby="contact-result"
>
```

---

### WR-02: Stale Comment in `ContactForm.astro` References Wrong State Numbers

**File:** `src/components/forms/ContactForm.astro:250-251`

**Issue:** The comment above the fetch handler reads "State 5: Submitting" at line 251:

```js
// State 5: Submitting — disable button, change label text, dim opacity
s.disabled = true;
```

But the file's own 7-state machine at lines 21-28 defines submitting as **State 4** ("submitting"), with success as State 6 and errors as State 7. The comment then at line 281 says "State 6: Success" which matches the numbered list. The mismatch (State 5 vs State 4 for submitting) is a documentation error that contradicts the contract. `BookInterestForm.astro` correctly labels it "State 4: Submitting" at line 198 in its equivalent block.

**Fix:** Change line 251 from `// State 5:` to `// State 4:` to match the 7-state contract and the `BookInterestForm` analog.

---

### WR-03: `BookInterestForm` Heading Uses `<h2>` but Appears Under `<h2>` Capture Heading

**File:** `src/pages/boek.astro:110` + `src/components/forms/BookInterestForm.astro:54`

**Issue:** The capture section of `boek.astro` has:

```astro
<h2 id="boek-capture-heading" class="boek-capture__heading">{t.boek.formHeading}</h2>
```

`BookInterestForm` then renders its own heading internally:

```astro
<h2 class="book-form__heading">{formHeading}</h2>
```

where `formHeading` comes from `t.boek.formHeading` — the **same string**. This produces two consecutive `<h2>` elements with identical text on the page:

1. The section `<h2>` at `boek-capture-heading` ("Houd me op de hoogte")
2. The `BookInterestForm` internal `<h2>` ("Houd me op de hoogte")

This is a heading hierarchy problem: same heading text appears twice at the same level, which is confusing for screen reader users navigating by headings. The form heading renders as a visually redundant duplicate of the wrapping section heading.

**Fix:** Either (a) remove the internal `<h2>` from `BookInterestForm.astro` and rely on the containing page's heading, or (b) change the `BookInterestForm` heading to `<h3>` to reflect its subordinate relationship, or (c) remove the wrapping `<h2>` from `boek.astro` and let `BookInterestForm` own the heading. The same pattern applies on `en/book.astro:105`.

---

### WR-04: `isActive()` in `Nav.astro` Incorrectly Marks All Nav Items Active on Any `/boek*` Path

**File:** `src/components/layout/Nav.astro:57-58`

**Issue:** The active-link helper:

```ts
const isActive = (href: string) =>
  currentPath === href || currentPath === href.replace(/\/$/, '') + '/';
```

uses exact-match plus trailing-slash normalisation, which is correct for most pages. For the NL nav, `href` for the Boek item is `${base}boek` (e.g., `/milan-website/boek`). On the `/milan-website/boek` page, `currentPath` is `/milan-website/boek` or `/milan-website/boek/`, so the exact match works correctly.

However, the `EN` nav computes hrefs via `getRelativeLocaleUrl('en', 'book')` which returns `/milan-website/en/book` (trailing slash stripped by Astro). If Astro renders the EN book page with a trailing slash (`/milan-website/en/book/`), the helper evaluates:

- `currentPath === href` → `/milan-website/en/book/` vs `/milan-website/en/book` → false
- `currentPath === href.replace(/\/$/, '') + '/'` → `/milan-website/en/book/` vs `/milan-website/en/book/` → **true**

This is actually correct. The issue is the inverse: if `getRelativeLocaleUrl` returns a path *with* a trailing slash (behaviour varies by Astro `trailingSlash` config), the `replace(/\/$/, '')` in the helper strips it, then re-appends it, so comparison against a `currentPath` *without* a trailing slash fails. This is an edge case depending on `astro.config.mjs` `trailingSlash` setting which is not in scope for this review — but the pattern is fragile. No active-state test in the smoke script validates nav active states.

This is a lower-severity concern than originally flagged in WR-04 commit history (which addressed a different issue). The risk is a missing active indicator on the Book nav item, not incorrect navigation. **Flag as WARNING** because it degrades UX (no active indicator) without breaking functionality.

**Fix:** Normalise *both* sides of the comparison:

```ts
const normalize = (p: string) => p.replace(/\/$/, '');
const isActive = (href: string) => normalize(currentPath) === normalize(href);
```

---

### WR-05: Double Semicolon in `Nav.astro` JS Island

**File:** `src/components/layout/Nav.astro:286`

**Issue:**

```js
const labelClose = (t as HTMLButtonElement).dataset.labelClose || 'Menu sluiten';;
```

There is a trailing double semicolon `;;`. This is harmless JavaScript (an empty statement) but signals a copy-paste artifact and will trigger `no-extra-semi` ESLint rules if the project adds a linter later.

**Fix:** Remove the duplicate semicolon:

```js
const labelClose = (t as HTMLButtonElement).dataset.labelClose || 'Menu sluiten';
```

---

### WR-06: Newsletter Email Field Collects Input That Is Never Used (No-JS Path Violates UX)

**File:** `src/components/sections/Newsletter.astro:59-66`

**Issue:** The Newsletter form has `onsubmit="return false;"` hardcoded, which means the form **never submits in any path** — JS or no-JS. When `IS_SENTINEL` is false (live Substack URL), the CTA renders as an `<a>` redirect anchor (correct), but the email field is still present in the form. Typing an email address and pressing Enter on the `<a>` does nothing useful; the `<a>` only opens Substack without prefilling the email (as documented by D-05/Pitfall 6). The email field therefore collects a value that is silently discarded.

This is the intended design (documented in D-05), but it creates a UX expectation mismatch: a visible labelled form field implies the entered value will be used. The `aria-label` on the form says "submitting opens Substack in a new tab" which partially addresses this, but a user who types their email and clicks the button gets no confirmation their email was used, because it wasn't.

The `onsubmit="return false;"` also means pressing Enter while focused on the email input does nothing at all — the enter key does not follow the `<a>` tag, so the user must click the button explicitly.

**Fix:** Either (a) remove the email field entirely and replace the form with a plain `<a>` button (cleanest — matches actual function); or (b) preserve the field but add a visible note explaining the redirect does not pre-fill the email. Option (a) eliminates the false affordance. The existing design is not wrong by project rules, but it is a UX inconsistency worth addressing.

---

## Info

### IN-01: `DISABLED_TOOLTIP` Constant in `config.ts` Is Dutch-Only

**File:** `src/config.ts:107`

**Issue:**

```ts
export const DISABLED_TOOLTIP = 'Binnenkort beschikbaar';
```

This constant's comment says it is "for use in non-i18n contexts." However, on EN pages, `t.common.disabledTooltip` returns `'Coming soon'` (from `en.ts:383`). If any component uses `DISABLED_TOOLTIP` directly (instead of `t.common.disabledTooltip`) on an EN page, it will show Dutch text on an English page. Currently no reviewed component imports `DISABLED_TOOLTIP` from config directly for use in rendered output — `Nav.astro`, `Footer.astro`, and the book pages all use `t.common.disabledTooltip`. The constant is only used in the config comment and conceptually. But it is exported and could be imported incorrectly in a future phase.

**Fix:** Add a JSDoc warning to the constant:

```ts
/**
 * @deprecated Prefer t.common.disabledTooltip from getStrings() for locale-aware tooltip text.
 * This constant is NL-only and must NOT be used in rendered output on EN pages.
 */
export const DISABLED_TOOLTIP = 'Binnenkort beschikbaar';
```

---

### IN-02: `boek.astro` and `en/book.astro` Repeat Identical CSS Verbatim

**File:** `src/pages/boek.astro:163-323` and `src/pages/en/book.astro:156-313`

**Issue:** The `<style>` blocks in both book page files are byte-for-byte identical (`.boek-hero`, `.boek-teaser`, `.boek-capture` etc.). Astro scopes component styles, so this duplication is not harmful at runtime (both will be emitted in the same build bundle and deduplicated by the CSS bundler). However, any CSS change must be made in two places. This is a minor maintainability concern.

**Fix:** Extract the shared styles into a `BookPageLayout.astro` wrapper or a shared CSS module imported by both pages. The component structure for `<style>` in Astro supports `@import` as well.

---

### IN-03: Smoke Script Section (e) Does Not Verify `dist/en/book` Hreflang Pairs

**File:** `scripts/smoke-i18n.js:121-129`

**Issue:** The smoke script verifies that `dist/boek/index.html` and `dist/en/book/index.html` exist (section e), but does not verify that each contains the correct `hreflang` alternate tags pointing to the other locale. If `BaseLayout` were passed wrong `nlSlug`/`enSlug` props on either book page, the hreflang pairs would silently be wrong, causing Google to deindex one locale. The existing check for the homepage hreflang (section c) is not replicated for the book pages.

**Fix:** Add to section (e):

```js
assertContains(nlBoekContent, 'hreflang="nl"', 'dist/boek/index.html must have hreflang="nl"');
assertContains(nlBoekContent, 'hreflang="en"', 'dist/boek/index.html must have hreflang="en"');
assertContains(enBookContent, 'hreflang="nl"', 'dist/en/book/index.html must have hreflang="nl"');
assertContains(enBookContent, 'hreflang="en"', 'dist/en/book/index.html must have hreflang="en"');
// Verify the slug pair is correct (boek ↔ book, not boek ↔ boek)
assertContains(nlBoekContent, '/en/book', 'dist/boek/index.html hreflang must reference /en/book');
assertContains(enBookContent, '/boek',    'dist/en/book/index.html hreflang must reference /boek');
```

---

_Reviewed: 2026-08-19T00:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
