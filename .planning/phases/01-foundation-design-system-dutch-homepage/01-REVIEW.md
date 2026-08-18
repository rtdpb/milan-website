---
phase: 01-foundation-design-system-dutch-homepage
reviewed: 2026-08-18T00:00:00Z
depth: standard
files_reviewed: 20
files_reviewed_list:
  - astro.config.mjs
  - package.json
  - tsconfig.json
  - src/pages/index.astro
  - src/layouts/BaseLayout.astro
  - src/components/layout/BaseHead.astro
  - src/components/layout/Nav.astro
  - src/components/layout/Footer.astro
  - src/components/ui/Button.astro
  - src/components/ui/Card.astro
  - src/components/ui/SectionWrapper.astro
  - src/components/ui/PlaceholderBadge.astro
  - src/components/ui/RevealOnScroll.astro
  - src/components/sections/Hero.astro
  - src/components/sections/PressStrip.astro
  - src/components/sections/Samenwerken.astro
  - src/components/sections/Testimonials.astro
  - src/components/sections/Story.astro
  - src/components/sections/Newsletter.astro
  - src/components/sections/Articles.astro
  - src/config.ts
  - src/i18n/nl.ts
  - src/styles/tokens.css
  - src/styles/reset.css
  - src/styles/global.css
findings:
  critical: 0
  warning: 6
  info: 4
  total: 10
status: clean
---

# Phase 01: Code Review Report

**Reviewed:** 2026-08-18
**Depth:** standard
**Files Reviewed:** 25
**Status:** clean — no BLOCKER or HIGH issues. Six warnings and four info items to address before or during Phase 2.

## Summary

This is a solid Phase 1 foundation. The honesty-rule pattern (aria-disabled everywhere, no `href="#"`, placeholder reasons in `data-*` and `title`) is consistently applied. Base-path handling via `import.meta.env.BASE_URL` is correctly threaded through the font `@font-face` declaration in BaseHead and both wordmark anchors. The image pipeline uses `astro:assets` with eager + `fetchpriority` only on the hero LCP image and lazy everywhere else. Reduced-motion is handled at both the CSS global layer (reset.css) and the JS observer layer (RevealOnScroll). TypeScript strict mode is enabled.

The six warnings below are real defects — they will cause double padding, a broken OG image URL, an inaccessible form submission, a subtle aria labelling conflict, an attribute syntax error at build time, and a missing focus-trap concern in the mobile nav. None rises to a deploy-blocking severity for a static marketing site, but several will be visible to users or tools.

---

## Warnings

### WR-01: Double section padding — `section` rule in global.css conflicts with SectionWrapper

**File:** `src/styles/global.css:112-114` and `src/components/ui/SectionWrapper.astro:49`

**Issue:** `global.css` declares `section { padding-block: var(--section-padding-y); }` as a generic element rule. `SectionWrapper.astro` also applies `padding-block: var(--section-padding-y)` on `.section-wrapper` (which IS the `<section>` element). Every SectionWrapper-wrapped section therefore receives double the intended vertical padding — two applications of `clamp(32px, 6vw, 128px)`. The hero section avoids this because it is a plain `<section>` styled in-component, but all seven SectionWrapper-wrapped sections (PressStrip, Samenwerken, Testimonials, Story, Newsletter, Articles) are affected.

**Fix:** Remove the generic `section` rule from `global.css`. All sections that need padding already get it via SectionWrapper's `.section-wrapper` rule. If a one-off bare `<section>` ever needs padding it should apply it locally.

```css
/* global.css — DELETE these three lines */
section {
  padding-block: var(--section-padding-y);
}
```

---

### WR-02: OG/Twitter image URL is relative, `new URL()` resolves incorrectly under the GitHub Pages base path

**File:** `src/components/layout/BaseHead.astro:23,31`

**Issue:** The default `ogImage` value is built as `` `${base}og-image.jpg` `` which under GitHub Pages produces `'/milan-website/og-image.jpg'` — a relative path without origin. Then on line 31 `new URL(ogImage, Astro.site)` is called. `Astro.site` is `'https://rtdpb.github.io'` (no trailing path). `new URL('/milan-website/og-image.jpg', 'https://rtdpb.github.io')` correctly resolves to `https://rtdpb.github.io/milan-website/og-image.jpg`, so this case is actually fine.

However, if a page passes an `ogImage` prop that is a full relative path (e.g. `'/other-image.jpg'`) the leading `/` overrides the base, producing `https://rtdpb.github.io/other-image.jpg` (dropping the `/milan-website/` prefix) — a 404. The safe pattern is to always pass base-prefixed values or accept full absolute URLs only.

**Fix:** Add a guard comment and enforce the convention, or make the resolution explicit:

```ts
// BaseHead.astro — make base-prefixing the explicit contract
const {
  title,
  description,
  // Callers MUST pass a base-relative path (starting with BASE_URL) or a full URL.
  // Do NOT pass a root-relative path like '/image.jpg' — it will drop the base prefix.
  ogImage = `${base}og-image.jpg`,
} = Astro.props;

// Build absolute OG URL — only works correctly when ogImage is already base-prefixed
// or is an absolute URL.
const ogImageAbsolute = ogImage.startsWith('http')
  ? ogImage
  : new URL(ogImage, Astro.site).toString();
```

---

### WR-03: Newsletter form is submittable — `required` fields + no `action` + no `onsubmit` handler means native browser form submission fires to the current page URL

**File:** `src/components/sections/Newsletter.astro:54-127`

**Issue:** The `<form>` has `novalidate` (suppresses native validation UI) but no `action` attribute and no JS submit handler. A user who presses Enter in the email field — a standard browser behaviour — will trigger a native GET form submission to the current page URL, appending `?naam=...&email=...` to the query string. This is not a security issue on a static site but it IS an unexpected navigation (page reload, scroll position lost, query params in the URL bar) and could confuse users or analytics. The `aria-label` on the form states "versturen is tijdelijk uitgeschakeld" but the form is not actually disabled.

**Fix:** Add a minimal JS submit interceptor, or set `action="javascript:void(0)"` (ugly but effective), or — cleanest — convert the form to presentational markup since there is no submit path yet:

```astro
<!-- Option A: intercept submit with a one-liner script -->
<form
  class="newsletter__form"
  aria-label="Nieuwsbrief aanmelden — versturen is tijdelijk uitgeschakeld"
  novalidate
  onsubmit="return false;"
>
```

Or annotate via a small inline script block at component level:

```html
<script>
  document.getElementById('newsletter-form')?.addEventListener('submit', (e) => e.preventDefault());
</script>
```

---

### WR-04: `aria-labelledby` on `<h3>` creates a circular/redundant labelling — `samenwerken-card-{n}` id is on the `<p>` eyebrow, not the heading

**File:** `src/components/sections/Samenwerken.astro:82-88`

**Issue:** The pattern is:
```html
<p class="samenwerken__eyebrow" id="samenwerken-card-1">01 — Begin hier gratis</p>
<h3 class="samenwerken__card-title" aria-labelledby="samenwerken-card-1">Nieuwsbrief</h3>
```
`aria-labelledby` on a heading element replaces its accessible name with the referenced element's text. Screen readers will announce the `<h3>` as "01 — Begin hier gratis" (the eyebrow text), not "Nieuwsbrief" (the heading text). The heading's own visible text is silenced. This is the reverse of the intended effect; the pattern should be used on a region/section to label it with the heading, not on the heading itself.

**Fix:** Remove `aria-labelledby` from the `<h3>`. Headings derive their accessible name from their own content. If the intent is to associate the eyebrow with the card as a group label, wrap in a `<section aria-labelledby="samenwerken-card-1">` or simply leave the DOM order to do the work — screen readers will read the eyebrow followed by the heading in sequence.

```astro
<!-- REMOVE aria-labelledby from h3 -->
<h3 class="samenwerken__card-title">
  {card.title}
</h3>
```

---

### WR-05: Template-literal `aria-label` attribute in JSX position uses backtick syntax — Astro `.astro` files require `{...}` expression syntax for dynamic attributes

**File:** `src/components/sections/Articles.astro:103`

**Issue:** Line 103 reads:
```astro
aria-label=`Lees "${article.title}" — binnenkort beschikbaar`
```
This is a bare template literal as an attribute value (not wrapped in `{}`). In `.astro` files, dynamic attribute expressions must be wrapped in `{}`. Without the braces the literal backtick characters become part of the attribute string instead of being evaluated. Astro's compiler may accept this without error in some versions but the output HTML will be malformed — the attribute value will contain the literal backtick characters and `${}` syntax rather than the interpolated string. This is a **build-correctness** defect.

**Fix:**
```astro
aria-label={`Lees "${article.title}" — binnenkort beschikbaar`}
```

---

### WR-06: Mobile nav focus trap does not cover the close button when it is the only focusable element, and does not restore focus on Escape key at the document level

**File:** `src/components/layout/Nav.astro:336-357`

**Issue:** The focus trap queries `button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])` inside the panel. When the panel is open and all nav items are `tabindex="-1"` disabled spans (as they are in Phase 1), the only focusable element in the panel is the close button (`#nav-close`). With only one focusable element, the trap loop logic computes `first === last === closeBtn`. Pressing Tab on the close button checks `document.activeElement === last` → true → focuses `first` (= `closeBtn`) and calls `e.preventDefault()`. This creates an infinite Tab cycle stuck on the close button, which is technically correct trap behaviour, but Shift+Tab on the close button also goes to `first` (same element), so both directions work — that part is fine.

The actual bug: the `document.addEventListener('keydown', ...)` Escape handler on line 328 fires regardless of whether the nav is open; it checks `aria-expanded === 'true'` which is correct. But the handler is registered on `document` (not `panel`), so it fires even when focus is inside the panel. This is correct. No real bug in the Escape path.

The real gap: **when `closeNav()` is called, focus is moved to `t` (the toggle button) with `t.focus()`, but if the nav was opened programmatically or focus was elsewhere when open was triggered, `t` may not be visible** (on desktop the hamburger is `display:none`). This is a desktop-irrelevant issue since the panel is mobile-only, but worth noting.

Additionally the `reducedMotion` check on line 261 is evaluated **once at script parse time** and cached. If the user changes their OS preference mid-session (unlikely but possible), the cached value is stale. This is a low-priority robustness gap.

**Fix for the display:none focus issue:**
```js
function closeNav() {
  // ... existing logic ...
  // Only focus toggle if it is visible (mobile only)
  if (t.offsetParent !== null) {
    t.focus();
  }
}
```

**Fix for reducedMotion staleness (optional):**
```js
// Instead of caching once:
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
// Use prefersReducedMotion() at call sites instead of the cached boolean.
```

---

## Info

### IN-01: Hero section does not use SectionWrapper — padding is duplicated manually and it's inconsistent with other sections

**File:** `src/components/sections/Hero.astro:110-119`

**Issue:** Hero applies its own `padding-block` values in-component rather than using `SectionWrapper`. This is deliberate (the hero has custom padding values and is not a dark/surface variant), but combined with WR-01's double-padding on SectionWrapper, the hero is the one section that will be correctly padded while all SectionWrapper sections are double-padded. Inconsistency makes it hard to reason about spacing globally.

**Suggestion:** After fixing WR-01, document explicitly in the hero comment that it intentionally manages its own padding, or add a `no-pad` variant to SectionWrapper.

---

### IN-02: Hero subtext copy in component does not match `nl.ts` copy — strings are hardcoded

**File:** `src/components/sections/Hero.astro:38-40`

**Issue:** The hero subtext in `Hero.astro` reads:
> "Na negen landen, 180 medewerkers en een miljoen zonnepanelen weet ik wat er misgaat als je als founder te snel groeit. Nu help ik andere ondernemers schalen op hun eigen voorwaarden."

The canonical copy in `nl.ts` (line 43) reads:
> "Als founder heb ik Soly van start-up naar 9 landen en 180 medewerkers gebracht. Nu help ik andere ondernemers hetzelfde te doen — op hun manier, in hun tempo."

These are different sentences. The eyebrow (line 41 in nl.ts: `'Founder · Coach · Spreker'`) and H1 (line 42) match between component and nl.ts, but the subtext was replaced with a paraphrase and adds the claim "een miljoen zonnepanelen" which does not appear in nl.ts. Additionally the primary CTA label ("Contact") and secondary CTA label ("Mijn verhaal") are hardcoded strings in Hero.astro lines 57 and 66, not sourced from `nl.hero.ctaPrimary` / `nl.hero.ctaSecondary`.

**Fix:** Import `nl` in Hero.astro and use `nl.hero.subtext`, `nl.hero.ctaPrimary`, `nl.hero.ctaSecondary` for consistency with the single source of truth.

```astro
---
import { nl } from '../../i18n/nl';
---
<p class="hero__subtext">{nl.hero.subtext}</p>
<!-- ... -->
<span ...>{nl.hero.ctaPrimary}</span>
<a href="#verhaal" ...>{nl.hero.ctaSecondary}</a>
```

---

### IN-03: Hero.astro duplicates the `.btn` CSS block that Button.astro already owns

**File:** `src/components/sections/Hero.astro:186-237`

**Issue:** Hero.astro contains a full copy of `.btn`, `.btn--primary`, `.btn--secondary`, `.btn--disabled` CSS rules (lines 186-237). Button.astro already owns these rules. In Astro's scoped CSS model this is not a runtime conflict (component styles are scoped), but it means any change to button appearance must be made in two places. The comment on line 185 acknowledges this ("Plan 02 Button.astro will own this globally") — this is a planned cleanup, but it is a real duplication defect now.

**Fix:** Once Button.astro is wired into the hero CTAs (Phase 2), remove the duplicated CSS block from Hero.astro. As an interim, at minimum add a cross-reference comment noting that these rules must stay in sync with Button.astro.

---

### IN-04: `canonicalURL` uses `Astro.url.pathname` which includes the base path, but `Astro.site` is just the origin — the canonical URL is correct, but only if `site` is updated to the real domain before launch

**File:** `src/components/layout/BaseHead.astro:28` and `astro.config.mjs:15`

**Issue:** `Astro.site` is set to `'https://rtdpb.github.io'` (line 15 of astro.config.mjs). The canonical URL therefore resolves to `https://rtdpb.github.io/milan-website/` — a GitHub Pages URL, not the intended production domain `https://milanvandermeulen.nl`. If this is deployed to production before `site` is updated in the config, every page will carry a canonical pointing at the GitHub Pages URL. Search engines will index the GitHub URL. This is already documented as a TODO in both astro.config.mjs and config.ts, but it is worth flagging as a ship-blocker for production launch (not for Phase 1 development).

**Fix:** Before cutting the first production deploy, change `astro.config.mjs`:
```js
site: 'https://milanvandermeulen.nl',
// base: '/milan-website/',  // REMOVE for root-domain deploy
```
And update the font/asset base path strategy accordingly (fonts live in `public/fonts/` so they will serve at `/fonts/` on root-domain deploys — the `import.meta.env.BASE_URL` logic will resolve correctly since BASE_URL becomes `'/'`).

---

_Reviewed: 2026-08-18_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
