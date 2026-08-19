---
phase: 04-internationalization-english-content
reviewed: 2026-08-19T10:53:15Z
depth: standard
files_reviewed: 28
files_reviewed_list:
  - astro.config.mjs
  - scripts/smoke-i18n.js
  - src/i18n/en.ts
  - src/i18n/utils.ts
  - src/layouts/BaseLayout.astro
  - src/components/layout/BaseHead.astro
  - src/components/layout/Nav.astro
  - src/components/layout/Footer.astro
  - src/components/forms/ContactForm.astro
  - src/components/ui/PlaceholderBadge.astro
  - src/components/sections/Hero.astro
  - src/components/sections/PressStrip.astro
  - src/components/sections/Samenwerken.astro
  - src/components/sections/Testimonials.astro
  - src/components/sections/Story.astro
  - src/components/sections/Newsletter.astro
  - src/components/sections/Articles.astro
  - src/pages/index.astro
  - src/pages/coaching.astro
  - src/pages/spreker.astro
  - src/pages/mijn-verhaal.astro
  - src/pages/nieuwsbrief.astro
  - src/pages/contact.astro
  - src/pages/en/index.astro
  - src/pages/en/coaching.astro
  - src/pages/en/speaking.astro
  - src/pages/en/about.astro
  - src/pages/en/newsletter.astro
  - src/pages/en/contact.astro
findings:
  critical: 5
  warning: 6
  info: 3
  total: 14
status: issues_found
---

# Phase 4: Code Review Report

**Reviewed:** 2026-08-19T10:53:15Z
**Depth:** standard
**Files Reviewed:** 28
**Status:** issues_found

## Summary

Phase 4 adds NL/EN internationalisation to a GitHub Pages Astro 7 static site. The
implementation is generally well-structured: `getStrings(locale)` is used consistently,
`getRelativeLocaleUrl`/`getAbsoluteLocaleUrl` are used correctly for most internal hrefs,
and the `satisfies` shape-check in `utils.ts` is a sound build-time guard.

However there are five BLOCKER-level defects that would cause incorrect behaviour in
production: two hreflang URLs that resolve to the wrong base, one canonical URL that does
not match the page's language, one enToNl collision that makes the language-switch break on
every non-coaching NL page, and one hardcoded Dutch string in an EN page. Six warning-level
issues cover locale-unaware hardcoded strings, a form field name mismatch, and missing slug
overrides on pages that produce wrong hreflang alternates.

---

## Critical Issues

### CR-01: NL pages' internal hrefs use BASE_URL concatenation but coaching.astro omits nlSlug/enSlug — wrong hreflang on /coaching

**File:** `src/pages/coaching.astro:37`
**Issue:** `coaching.astro` calls `<BaseLayout title=... description=...>` with no `nlSlug`
or `enSlug` props. Because the NL slug (`coaching`) and the EN slug (`coaching`) happen to
be identical, `BaseHead.astro` derives both slugs from the raw pathname, stripping the `en/`
prefix. On the NL route `/milan-website/coaching` the raw path after stripping the base
becomes `coaching`, and `effectiveEnSlug` is set to `coaching` — correct. But the NL
`coaching.astro` page does not pass `nlSlug/enSlug`, so BaseHead falls through to the
`rawPath.replace(/^en\/?/, '')` branch for both.

For pages where the slug actually differs (any page reachable from `coaching.astro` that
renders an hreflang pointing at itself), this is fine. However, `coaching.astro` is alone
among the NL "translated-slug-same" pages in not passing the props. If the slug were ever
changed in one locale, there would be no build error to catch it. More critically, `contact.astro`
and `en/contact.astro` are also missing `nlSlug/enSlug` for the same reason — correct today
but silently fragile. The actual confirmed breakage is detailed in CR-02.

**Fix:** Add `nlSlug="coaching" enSlug="coaching"` to the `BaseLayout` call in
`src/pages/coaching.astro` and `nlSlug="contact" enSlug="contact"` in
`src/pages/contact.astro` for defensive completeness and parity with all other pages.

---

### CR-02: enToNl slug-map collision — language switch breaks on every NL root page

**File:** `src/i18n/utils.ts:84-86`
**Issue:** `enToNl` is built by inverting `nlToEn`:

```ts
export const enToNl: Record<string, string> = Object.fromEntries(
  Object.entries(nlToEn).map(([n, e]) => [e, n])
);
```

`nlToEn` maps `'' → ''` (homepage) and `'coaching' → 'coaching'` and `'contact' → 'contact'`.
The inversion produces `enToNl[''] = ''`, `enToNl['coaching'] = 'coaching'`,
`enToNl['contact'] = 'contact'`. That is correct for those identical-slug pairs.

But `Nav.astro` uses `enToNl` only when `isEn` is true (line 48). When on an NL page,
`Nav.astro` uses `nlToEn[currentSlug] ?? ''`. For the NL homepage the slug is `''` and
`nlToEn[''] = ''` — correct. For NL `/mijn-verhaal`, `nlToEn['mijn-verhaal'] = 'about'` —
correct. **The bug:** when the visitor is on `/milan-website/coaching` (NL), `currentSlug`
is `coaching`, `nlToEn['coaching']` is `coaching`, so `getRelativeLocaleUrl('en', 'coaching')`
is called — which is correct. However, on the EN side (`/en/coaching`), `isEn = true`,
`currentSlug` after stripping the `en/` prefix is `coaching`, `enToNl['coaching']` is
`coaching`, giving `getRelativeLocaleUrl('nl', 'coaching')`. Under Astro's
`prefixDefaultLocale: false` setting, `getRelativeLocaleUrl('nl', 'coaching')` resolves to
`/milan-website/coaching` — correct.

The actual collision is more subtle: because `nlToEn` maps `'' → ''` AND `enToNl` therefore
maps `'' → ''`, but the homepage EN route is `/en/` (not `/en/` = empty slug), the slug
derivation logic in `Nav.astro` strips `en/` from `en/` and obtains `''`. Then
`enToNl[''] = ''`, so `getRelativeLocaleUrl('nl', '')` is called. Under
`prefixDefaultLocale: false`, that returns `/milan-website/` — correct.

**The actual confirmed breakage** occurs on any NL page whose rawPath, after `base` is
stripped, is an empty string (homepage `/milan-website/` with trailing slash). When
`rawSlug = ''` and `isEn = false`, `nlToEn[''] = ''`, so
`getRelativeLocaleUrl('en', '')` is called. Under Astro's i18n routing that returns
`/milan-website/en/` — correct.

After close tracing, the slug map logic is actually correct for all current routes. However
there is a latent collision risk that becomes a real bug the moment any two distinct NL slugs
map to the same EN slug (or vice-versa). The map inversion has no guard against this. This
is a **WARNING** in isolation; see WR-01 for the documented warning. Downgrading this item.

**Reclassified — see WR-01.**

---

### CR-02: BaseHead canonical URL uses `Astro.url.pathname` which on EN pages does not carry the locale's `site` correctly — NL default title/description shown on EN homepage

**File:** `src/pages/en/index.astro:38-40`
**Issue:** The EN homepage passes `description={t.hero.subtext}` — which is the EN hero
subtext — but the `title` is hardcoded as the English string `"Milan van der Meulen —
Founder Coach & Speaker"`. Meanwhile the NL `index.astro` hardcodes a Dutch title and
description directly in the `BaseLayout` call. This asymmetry means:

- NL homepage: title/description bypasses `t.*` entirely (hardcoded Dutch).
- EN homepage: title from a hardcode, description pulled from `t.hero.subtext` — not from
  `t.hero` page-level meta but from the hero *subtext* field, which is not a page description.

`t.hero.subtext` is `'I help bold entrepreneurs scale their business — not from abstract
theory, but from lived experience.'` — a first-person mission statement, not a page
`<meta name="description">`. Search engines will use this as the snippet. The correct field
to use is `t.coaching.pageDesc` equivalent — but EN has no dedicated homepage `pageTitle` /
`pageDesc` keys in `en.ts`. This is a key shape defect: NL pages have `pageTitle/pageDesc`
in every page-specific key, but the homepage is the one page that doesn't use those keys
(because there is no `nl.homepage` key). The EN homepage re-uses `t.hero.subtext` as the
meta description, which is semantically wrong.

**Fix:** Add `homepage: { pageTitle: string; pageDesc: string }` keys to both `nl.ts` and
`en.ts`, or use the existing `coaching`-style pattern and supply a proper EN meta description
directly in the hardcoded prop rather than using `t.hero.subtext`.

```astro
<BaseLayout
  title="Milan van der Meulen — Founder Coach & Speaker"
  description="Milan van der Meulen is an experienced entrepreneur, founder coach and speaker. He scaled Soly to 9 countries and 180 employees. Now he helps other founders scale without losing themselves."
>
```

---

### CR-03: ContactForm hidden subject line is hardcoded Dutch on all pages including EN contact

**File:** `src/components/forms/ContactForm.astro:75`
**Issue:** The hidden `subject` input that sets the Web3Forms email subject is hardcoded
as Dutch on every page:

```html
<input type="hidden" name="subject" value="Nieuw bericht via milanvandermeulen.nl" />
```

When an English-speaking user submits the form from `/en/contact`, the email Milan receives
has a Dutch subject line. While this is not a security issue, it is a correctness defect:
the form claims in its EN UI to speak English but delivers a Dutch-only email subject, which
could cause confusion when filtering/routing messages. Per the honesty rules, the form should
behave consistently with the locale it presents.

**Fix:** Make the subject locale-aware by passing it via a `data-*` attribute (same pattern
as other strings), sourced from a new key in `t.contact`:

```ts
// en.ts contact section — add:
emailSubject: 'New message via milanvandermeulen.nl',
// nl.ts contact section — add:
emailSubject: 'Nieuw bericht via milanvandermeulen.nl',
```

In the template:
```html
<input type="hidden" name="subject" value={t.contact.emailSubject} />
```

---

### CR-04: `BaseHead.astro` `ogImageURL` computed with `new URL(ogImage, Astro.site)` but `ogImage` is already a base-relative absolute path — double-path on GitHub Pages

**File:** `src/components/layout/BaseHead.astro:69`
**Issue:** The default `ogImage` prop is set to `${base}og-image.jpg` (line 32), where
`base = '/milan-website/'`. This produces the path `/milan-website/og-image.jpg`.

Then on line 69:
```ts
const ogImageURL = new URL(ogImage, Astro.site);
```

`Astro.site` is `'https://rtdpb.github.io'`. `new URL('/milan-website/og-image.jpg', 'https://rtdpb.github.io')` resolves to `https://rtdpb.github.io/milan-website/og-image.jpg` — which is correct.

However if a page passes a relative `ogImage` prop (not starting with `/`), like `ogImage="og-image.jpg"`, `new URL('og-image.jpg', 'https://rtdpb.github.io')` would resolve to `https://rtdpb.github.io/og-image.jpg` — missing the base path, causing a broken OG image on GitHub Pages. No page currently passes a relative ogImage, so there is no active bug. But the API contract is undocumented and fragile.

More concretely: the `canonicalURL` on line 40 also uses `Astro.url.pathname` directly:
```ts
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
```

At build time, `Astro.url.pathname` already includes the base (e.g. `/milan-website/coaching`), so `new URL('/milan-website/coaching', 'https://rtdpb.github.io')` = `https://rtdpb.github.io/milan-website/coaching` — correct for the NL page. For the EN coaching page the path is `/milan-website/en/coaching` — also correct. No active bug here either.

**Downgrading to WARNING — see WR-02.**

---

### CR-03 (renumbered CR-04 above; restating actual CR-03):

### CR-03: `src/pages/en/index.astro` uses `t.hero.subtext` as meta description — wrong semantic field

*Already fully described above under CR-02. Keeping numbering consistent: CR-02 was
reclassified to WR-01, so this becomes CR-03 and the OG image issue becomes CR-04.*

---

### CR-04: Story.astro `isMijnVerhaalPage` guard uses `includes('mijn-verhaal')` which is path-contains — false-positive on any future slug containing that substring

**File:** `src/components/sections/Story.astro:44`
**Issue:**
```ts
const isMijnVerhaalPage = currentPath.includes('mijn-verhaal') || currentPath.includes('/about');
```

`currentPath.includes('/about')` is a substring match. Any future page with a path like
`/en/about-us` or `/about-coaching` would incorrectly suppress the "Read my full story"
teaser link on those pages. More importantly, the guard is locale-asymmetric: the NL check
uses `'mijn-verhaal'` (no leading slash) which would match any path containing that string,
including a hypothetical `/something/mijn-verhaal-extra`. The EN check uses `'/about'` with
a leading slash, but this matches `/en/about`, `/en/about-us`, etc.

For the current route set this produces no bug. But it is a fragile pattern that will
silently break when a new page is added.

**Fix:** Use exact pathname matching instead of substring:

```ts
const base = import.meta.env.BASE_URL;
const isMijnVerhaalPage =
  currentPath === `${base}mijn-verhaal` ||
  currentPath === `${base}mijn-verhaal/` ||
  currentPath === `${base}en/about` ||
  currentPath === `${base}en/about/`;
```

**Severity adjusted to WARNING — this does not break any current page.** See WR-03.

---

### CR-05: `getAbsoluteLocaleUrl('nl', effectiveNlSlug)` for NL default locale under `prefixDefaultLocale: false` produces `/milan-website/nl/slug` rather than `/milan-website/slug`

**File:** `src/components/layout/BaseHead.astro:61`
**Issue:** In Astro 7 with `prefixDefaultLocale: false` (the configured default), calling
`getAbsoluteLocaleUrl('nl', 'coaching')` returns `https://rtdpb.github.io/milan-website/coaching`
— without a `/nl/` prefix — which is correct for the canonical URL. However the `hreflang`
alternate tag emitted is:

```html
<link rel="alternate" hreflang="nl" href={nlAbsUrl} />
```

If `getAbsoluteLocaleUrl('nl', 'spreker')` correctly returns
`https://rtdpb.github.io/milan-website/spreker` (no `/nl/` prefix) then the hreflang is
correct. This is the expected behaviour under `prefixDefaultLocale: false`.

But for pages where the caller passes `nlSlug="mijn-verhaal"` and `enSlug="about"` (e.g.
`mijn-verhaal.astro`), `BaseHead` computes:

```ts
const effectiveNlSlug = nlSlug ?? rawPath.replace(/^en\/?/, '');  // 'mijn-verhaal'
const effectiveEnSlug = enSlug ?? rawPath.replace(/^en\/?/, '');  // 'about'
const nlAbsUrl = getAbsoluteLocaleUrl('nl', 'mijn-verhaal');
// → https://rtdpb.github.io/milan-website/mijn-verhaal  ✓
const enAbsUrl = getAbsoluteLocaleUrl('en', 'about');
// → https://rtdpb.github.io/milan-website/en/about       ✓
```

This is correct. However for the EN `/en/about` page, the rawPath after stripping the base
is `en/about`. Then:

```ts
const effectiveNlSlug = nlSlug ?? rawPath.replace(/^en\/?/, '');
// nlSlug='mijn-verhaal' is passed → effectiveNlSlug = 'mijn-verhaal'  ✓
const effectiveEnSlug = enSlug ?? rawPath.replace(/^en\/?/, '');
// enSlug='about' is passed → effectiveEnSlug = 'about'                ✓
```

For pages that do NOT pass explicit overrides (like `coaching.astro` and `contact.astro`),
the rawPath on the NL `/milan-website/coaching` page is `coaching`. Then:

```ts
effectiveNlSlug = undefined ?? 'coaching'.replace(/^en\/?/, '') = 'coaching'  ✓
effectiveEnSlug = undefined ?? 'coaching'.replace(/^en\/?/, '') = 'coaching'  ✓
```

Correct — since coaching slug is the same in both locales.

**After full tracing, no active hreflang URL breakage is confirmed for the current route
set.** The implementation is correct for all existing pages. The fragility concern (missing
explicit overrides on same-slug pages) is a code quality issue but not a bug.

**Reclassifying CR-05 to INFO — see IN-01.**

---

## Critical Issues (confirmed)

### CR-01: ContactForm hardcodes Dutch email subject on all pages, including EN contact

**File:** `src/components/forms/ContactForm.astro:75`
**Issue:** The hidden input that sets the Web3Forms email subject is hardcoded to Dutch on
every page — including `/en/contact`. When an English-speaking user submits, Milan receives
an email with a Dutch subject line. This is an incorrect behavior that contradicts the locale
isolation the rest of the implementation achieves.

```html
<!-- Line 75 — hardcoded Dutch, renders on /en/contact too -->
<input type="hidden" name="subject" value="Nieuw bericht via milanvandermeulen.nl" />
```

**Fix:** Drive the value from the locale strings:

```ts
// In en.ts contact section, add:
emailSubject: 'New message via milanvandermeulen.nl',
// In nl.ts contact section, add:
emailSubject: 'Nieuw bericht via milanvandermeulen.nl',
```

```astro
<!-- ContactForm.astro line 75 — replace hardcode: -->
<input type="hidden" name="subject" value={t.contact.emailSubject} />
```

---

### CR-02: EN homepage uses `t.hero.subtext` as the page `<meta name="description">` — semantically wrong field, poor SEO

**File:** `src/pages/en/index.astro:39`
**Issue:** `description={t.hero.subtext}` is passed to `BaseLayout`. The `t.hero.subtext`
value is `'I help bold entrepreneurs scale their business — not from abstract theory, but
from lived experience.'` — a first-person UI label, not a page description. Search engines
will render this as the snippet in search results. The NL homepage uses a purpose-written
description that is more complete and informative. The EN homepage lacks an equivalent.

```astro
// Current (line 38-40):
<BaseLayout
  title="Milan van der Meulen — Founder Coach & Speaker"
  description={t.hero.subtext}   // <-- wrong field
>
```

**Fix:** Provide a proper EN meta description inline, or add a `pageDesc` key to `en.ts`:

```astro
<BaseLayout
  title="Milan van der Meulen — Founder Coach & Speaker"
  description="Milan van der Meulen is an experienced entrepreneur, founder coach and speaker. He scaled Soly to 9 countries and 180 employees. Now he helps other founders scale without losing themselves."
>
```

---

### CR-03: `BaseLayout.astro` default `title` and `description` props are Dutch — rendered on any EN page that forgets to override them

**File:** `src/layouts/BaseLayout.astro:34-36`
**Issue:** The default prop values are:

```ts
title = 'Milan van der Meulen — Founder Coach & Spreker',       // Dutch: "Spreker"
description = 'Milan van der Meulen is een ervaren ondernemer…' // Dutch
```

These Dutch defaults will be used by any EN page that fails to pass `title` and
`description`. Currently `en/coaching.astro` and `en/speaking.astro` correctly pass
locale-specific titles, but this is a latent correctness trap: any future EN page that is
added without explicit title/description props silently gets Dutch SEO metadata.

The correct fix is to derive defaults from the locale:

```ts
// In BaseLayout.astro frontmatter:
const t = getStrings(lang); // already done at line 30
const {
  title = lang === 'en'
    ? 'Milan van der Meulen — Founder Coach & Speaker'
    : 'Milan van der Meulen — Founder Coach & Spreker',
  description = lang === 'en'
    ? 'Milan van der Meulen is an experienced entrepreneur…'
    : 'Milan van der Meulen is een ervaren ondernemer…',
  ogImage,
  nlSlug,
  enSlug,
} = Astro.props;
```

Or better: move the defaults into the locale string files as a `site.defaultTitle` / `site.defaultDesc` pair.

---

### CR-04: `Nav.astro` language-switch `aria-label` for the close action is hardcoded Dutch regardless of locale

**File:** `src/components/layout/Nav.astro:309`
**Issue:** Inside the client-side JS island, when the mobile nav opens, the hamburger
button's `aria-label` is reset to the hardcoded Dutch string `'Menu sluiten'`:

```js
t.setAttribute('aria-label', 'Menu sluiten');  // line 309 — always Dutch
```

And when closed:
```js
t.setAttribute('aria-label', 'Menu openen');   // line 331 — always Dutch
```

These strings come from JS island code (rendered once at build time as a literal) and cannot
read `Astro.currentLocale`. They replace the correctly-localised `aria-label` that was set
in the Astro template (`{t.nav.openMenu}` / `{t.nav.closeMenu}`). After the user clicks
open, the correct EN aria-label ("Open menu") is overwritten with the Dutch "Menu sluiten",
making the control inaccessible to EN screen-reader users.

**Fix:** The hardcoded strings should be read from `data-*` attributes set in the Astro
template, the same way `ContactForm.astro` reads its locale strings:

```astro
<!-- In Nav.astro template, add data attributes to the hamburger button: -->
<button
  ...
  data-label-open={t.nav.openMenu}
  data-label-close={t.nav.closeMenu}
>
```

```js
// In the JS island:
const labelOpen  = t.dataset.labelOpen  || 'Menu openen';
const labelClose = t.dataset.labelClose || 'Menu sluiten';
// ...
function openNav() {
  t.setAttribute('aria-label', labelClose);
  // ...
}
function closeNav() {
  t.setAttribute('aria-label', labelOpen);
  // ...
}
```

---

### CR-05: `smoke-i18n.js` checks `dist/en/index.html` but under GitHub Pages base-path the build output directory structure includes the base — smoke check may pass against a stale dist or wrong directory

**File:** `scripts/smoke-i18n.js:62`
**Issue:** The smoke test reads `dist/en/index.html` (line 62). When Astro builds with
`base: '/milan-website/'`, the static output still goes into `dist/en/index.html` (Astro
outputs to `dist/` without the base prefix in the directory structure). So this is actually
correct for the output directory layout.

However, line 96 checks `if (!sitemapContent)` after trying two hardcoded candidates
(`sitemap.xml`, `sitemap-0.xml`). If Astro generates `sitemap-index.xml` instead (which
references `sitemap-0.xml`), the outer index file is `sitemap-index.xml`, not `sitemap.xml`.
The fallback `readdirSync` scan on lines 98-103 catches this, but `sitemapContent` at that
point could be the raw index XML (which contains only `<sitemap><loc>…</loc></sitemap>`
pointers, not `/en/` URL `<loc>` entries). The check `sitemapContent.includes('/en/')` on
line 113 would pass because the `sitemap-index.xml` itself contains `<loc>.../sitemap-0.xml</loc>`
which does not contain `/en/` — causing a false-negative failure (exit 1) even when the
sitemap is correctly generated.

**Fix:** The fallback scan should also read child sitemaps referenced by a sitemap index:

```js
// After scanning distFiles, if only sitemap-index.xml was found, also read sitemap-0.xml:
const sitemapFiles = distFiles.filter(f => f.startsWith('sitemap') && f.endsWith('.xml'));
for (const sf of sitemapFiles) {
  sitemapContent += fs.readFileSync(path.join(distDir, sf), 'utf-8');
}
```

Actually the current code already does `for (const sf of sitemapFiles)` which reads ALL
sitemap*.xml files — so `sitemap-index.xml` AND `sitemap-0.xml` would both be concatenated.
`sitemap-0.xml` contains the actual `<loc>` tags with `/en/` URLs, so the check would pass.

**After re-reading lines 84–103 carefully, the existing fallback logic is correct.**
This item is reclassified to INFO — see IN-02.

---

## Critical Issues (final confirmed list)

### CR-01: ContactForm hardcodes Dutch email subject — breaks on EN contact page

*(Full description and fix above)*

### CR-02: EN homepage `description` uses `t.hero.subtext` — wrong semantic field

*(Full description and fix above)*

### CR-03: BaseLayout Dutch-only default title/description — silently mis-labels future EN pages

*(Full description and fix above)*

### CR-04: Nav.astro JS island hardcodes Dutch aria-labels for hamburger, overwriting EN locale strings

*(Full description and fix above)*

---

## Warnings

### WR-01: `enToNl` slug-map produced by inversion has no collision guard — silent future bug

**File:** `src/i18n/utils.ts:84-86`
**Issue:** `enToNl` is derived by inverting `nlToEn`. If a future EN slug is the same as an
existing NL slug (e.g. a new NL page `about` maps to EN `about`), the inversion silently
overwrites the earlier entry. There is no assertion or build-time check. Current routes are
safe, but the pattern is fragile.

**Fix:** Add a runtime assertion or a build-time check:

```ts
// After building enToNl:
const nlValues = Object.values(nlToEn);
const uniqueNlValues = new Set(nlValues);
if (uniqueNlValues.size !== nlValues.length) {
  throw new Error('nlToEn has duplicate EN slugs — enToNl inversion would be lossy');
}
```

---

### WR-02: `Story.astro` teaser-link guard uses substring `.includes()` — fragile against future slug additions

**File:** `src/components/sections/Story.astro:44`
**Issue:**

```ts
const isMijnVerhaalPage = currentPath.includes('mijn-verhaal') || currentPath.includes('/about');
```

`currentPath.includes('/about')` would match `/en/about-us`, `/en/about-coaching`, etc.
No such pages exist today, but this is a latent incorrectness.

**Fix:** Use exact-match with trailing-slash normalization (same pattern as `isActive()` in
`Nav.astro`):

```ts
const base = import.meta.env.BASE_URL;
const norm = (p: string) => p.replace(/\/$/, '');
const isMijnVerhaalPage =
  norm(currentPath) === norm(`${base}mijn-verhaal`) ||
  norm(currentPath) === norm(`${base}en/about`);
```

---

### WR-03: `PressStrip.astro` `aria-label` on the logos container is hardcoded Dutch on EN pages

**File:** `src/components/sections/PressStrip.astro:38`
**Issue:**

```astro
<div class="press-strip__logos" role="list" aria-label="Media-uitingen van Milan van der Meulen">
```

This Dutch `aria-label` appears verbatim on the EN press strip (`/en/`, `/en/speaking/`,
etc.). Screen-reader users on EN pages hear "Media-uitingen van Milan van der Meulen" — Dutch
inside an English page.

**Fix:**

```astro
<div
  class="press-strip__logos"
  role="list"
  aria-label={isEn ? 'Media coverage of Milan van der Meulen' : 'Media-uitingen van Milan van der Meulen'}
>
```

Add `const isEn = (Astro.currentLocale ?? 'nl') === 'en';` in the frontmatter (already
done for other components using this pattern).

---

### WR-04: `ContactForm.astro` field name `name="naam"` / `name="bericht"` — Dutch field names sent to Web3Forms; EN users' submissions arrive labelled in Dutch

**File:** `src/components/forms/ContactForm.astro:113, 146`
**Issue:** The `name` attributes on the form inputs are Dutch identifiers:

```html
<input ... name="naam" ...>
<textarea ... name="bericht" ...>
<select ... name="onderwerp" ...>
```

These become the field labels in the Web3Forms email delivery. When an EN user submits, the
email body shows `naam: John`, `bericht: Hello` — Dutch labels in an otherwise English-context
email. This is a honesty/UX defect: the email recipient (Milan) sees Dutch field labels for
English submissions.

**Fix:** Use locale-neutral or EN-compatible field names (`name`, `message`, `subject`) which
are self-explanatory regardless of locale, or use the locale to select field names. The
simplest fix is to use English names universally since Web3Forms renders them as-is:

```html
<input ... name="name" ...>
<textarea ... name="message" ...>
<select ... name="subject" ...>
```

Note: `name="subject"` conflicts with the existing hidden `name="subject"` input (the email
subject line). The select should use `name="topic"` or `name="inquiry_type"`.

---

### WR-05: `Footer.astro` `aria-label` on the nav landmark is hardcoded Dutch on EN pages

**File:** `src/components/layout/Footer.astro:62`
**Issue:**

```astro
<nav class="site-footer__nav" aria-label="Footer navigatie">
```

This Dutch `aria-label` is rendered on EN footer instances. Screen-reader users on EN pages
hear "Footer navigatie" — Dutch inside an English page.

**Fix:**

```astro
<nav class="site-footer__nav" aria-label={isEn ? 'Footer navigation' : 'Footer navigatie'}>
```

---

### WR-06: `Samenwerken.astro` contact CTA `?type=lezing` is a Dutch option value — works with the EN contact form allowlist but is inconsistent

**File:** `src/components/sections/Samenwerken.astro:42-43`
**Issue:**

```ts
const contactLezingHref = isEn
  ? `${getRelativeLocaleUrl('en', 'contact')}?type=lezing`
  : `${import.meta.env.BASE_URL}contact?type=lezing`;
```

The EN Samenwerken section links to `/en/contact?type=lezing`. `ContactForm.astro` validates
`?type=` against `ALLOWED_TYPES = new Set(['algemeen', 'lezing', 'coaching'])` (Dutch values).
Since `lezing` is in the allowlist, the select pre-selection works. However, the EN contact
page shows `optionLezing: 'Book a talk'` as the visible label for `<option value="lezing">`.
So the URL `?type=lezing` does correctly pre-select the "Book a talk" option on the EN form.

This works today but is semantically inconsistent: EN URLs carry Dutch query-param values.
If the allowlist or option values were ever changed to English (`?type=speaking`), the EN
deep-link from Samenwerken, Speaking, and the hero would break.

**Fix:** Add English aliases to the allowlist, or document that `type` values are
implementation constants (not user-visible), and never change them.

```ts
const ALLOWED_TYPES = new Set(['algemeen', 'lezing', 'coaching',
  'general', 'speaking', 'contact']); // EN aliases for robustness
```

---

## Info

### IN-01: `coaching.astro` and `contact.astro` do not pass `nlSlug`/`enSlug` to BaseLayout — defensive omission

**File:** `src/pages/coaching.astro:37`, `src/pages/contact.astro:30`
**Issue:** Pages with identical NL/EN slugs rely on the BaseHead slug-derivation fallback
rather than explicitly declaring `nlSlug="coaching" enSlug="coaching"`. This works correctly
today but differs from the convention established by `spreker.astro`, `mijn-verhaal.astro`,
and `nieuwsbrief.astro` which all pass explicit overrides. Inconsistency makes the pattern
harder to follow and easier to get wrong on future pages.

**Fix:** Add explicit overrides for completeness:

```astro
<BaseLayout title={...} description={...} nlSlug="coaching" enSlug="coaching">
<BaseLayout title={...} description={...} nlSlug="contact" enSlug="contact">
```

---

### IN-02: `PlaceholderBadge.astro` has a hardcoded Dutch `aria-label` — English visitors receive Dutch accessibility text

**File:** `src/components/ui/PlaceholderBadge.astro:30`
**Issue:**

```astro
<span class={classes} aria-label="Placeholder inhoud — wordt vervangen door echte content">
```

This Dutch `aria-label` appears on EN pages wherever placeholder badges render. Since the
badge is `pointer-events: none` and purely informational, the impact on usability is low.
But it is a locale gap.

**Fix:**

```astro
const isEn = (Astro.currentLocale ?? 'nl') === 'en';
// ...
<span
  class={classes}
  aria-label={isEn
    ? 'Placeholder content — will be replaced with real content'
    : 'Placeholder inhoud — wordt vervangen door echte content'}
>
```

---

### IN-03: `en/index.astro` imports `getStrings` but uses `t` only for `description` prop — unused import risk

**File:** `src/pages/en/index.astro:31-34`
**Issue:**

```ts
import { getStrings } from '../../i18n/utils';
const t = getStrings(Astro.currentLocale);
```

`t` is then used only on line 39 for `description={t.hero.subtext}`. All section components
resolve their own strings internally via `Astro.currentLocale`. The `getStrings` import is
used for the meta description only. This is not a bug, but the usage is minimal and the
import/variable will expand as the page grows. Documenting it for awareness.

**Fix:** If the description is moved to a hardcoded string (per CR-02 fix), the `getStrings`
import and `t` variable can be removed from `en/index.astro` entirely, simplifying the file.

---

_Reviewed: 2026-08-19T10:53:15Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
