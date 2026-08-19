# Phase 4: Internationalization & English Content — Research

**Researched:** 2026-08-19
**Domain:** Astro 7 i18n routing, bilingual static site architecture, hreflang/SEO
**Confidence:** MEDIUM

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Testimonials translated faithfully into English; names/roles unchanged; no "translated from Dutch" marker. Preserve meaning; do not embellish.
- **D-02:** Substack articles + newsletter signup stay on EN site with an honest "in Dutch" label. Publication itself is NOT translated.
- **D-03:** EN copy is Claude-drafted in founder voice, flagged as draft for Milan's review. Natural/idiomatic, not word-for-word. Factual claims/names/attributions preserved verbatim.
- **D-04:** Target variant = International English (`en`). hreflang code `en` (paired with `nl`).
- **D-05:** Keep existing Dutch URLs at site root; add English under `/en/*` — `prefixDefaultLocale: false`. This deliberately differs from the Phase 1 commented plan (which sketched `prefixDefaultLocale: true`).
- **D-06:** EN page slugs: `/en/`, `/en/coaching`, `/en/speaking` (spreker), `/en/about` (mijn-verhaal), `/en/newsletter` (nieuwsbrief), `/en/contact`. Dutch slugs stay at root.
- **D-07:** Language switch lands visitor on equivalent page in the other language using a per-page NL↔EN slug map. Default NL. No forced browser-language detection. Persistence is URL-path-based.

### Claude's Discretion

- D-05, D-06, D-07 (routing, slugs, switch) were delegated and are open to revision at planning/UI-spec time.
- Exact hreflang/`x-default` wiring, per-locale title/description strings, canonical URL construction, and sitemap multi-locale config are implementation details for research/planning to resolve.

### Deferred Ideas (OUT OF SCOPE)

- Translating the Substack publication / producing English newsletter content.
- Confirming the production domain and removing the GitHub Pages base.
- Additional locales beyond NL/EN.
- Book/pre-order page, analytics/conversion, optional CMS (Phase 5).
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| I18N-01 | Functional NL/EN language switch that changes language and persists across navigation | D-07: URL-path persistence, per-page NL↔EN slug map, `getRelativeLocaleUrl` from `astro:i18n` |
| I18N-02 | English translations of homepage and all existing pages | `src/i18n/en.ts` mirroring `nl.ts` shape; EN page files under `src/pages/en/`; `getStrings()` helper pattern |
</phase_requirements>

---

## Summary

Phase 4 activates Astro 7's built-in i18n routing to produce a bilingual (NL/EN) static site. The Dutch homepage and pages continue to live at the site root (no `/nl/` prefix), while EN pages are created under `src/pages/en/` with translated slugs. All routing, URL generation, and hreflang wiring use Astro's native `astro:i18n` helpers — no external library is needed or desired.

The key risk area is the `astro.config.mjs` edit. The existing file has `prefixDefaultLocale` in a **commented-out block at the wrong level** (top-level `i18n.prefixDefaultLocale`). In Astro 7, `prefixDefaultLocale` must be inside `i18n.routing` (nested sub-object). The default value of `routing.prefixDefaultLocale` is `false`, which is exactly what D-05 requires — so the correct Phase 4 config is a **clean upgrade** that adds `locales: ['nl','en']` and either omits `routing` (to accept the default `false`) or explicitly sets `routing: { prefixDefaultLocale: false }`.

The EN copy task is well-bounded: 6 pages, ~200 string keys total in `nl.ts`, all translateable from existing Dutch. Content integrity rules from D-03 keep factual claims verbatim. The only structural decision for the planner is whether to thread locale strings via a shared `getStrings()` helper (recommended — zero prop-drilling, Astro.currentLocale is free in every component) or via per-locale page file imports (simpler but not DRY across shared components).

**Primary recommendation:** Use `Astro.currentLocale` + a `getStrings()` helper in `src/i18n/utils.ts`; have shared section components call `getStrings(Astro.currentLocale)` directly rather than receiving strings as props. Keep EN page files thin wrappers that reuse the same section components. This minimizes markup duplication while requiring zero prop changes to existing section components.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| URL routing / locale detection | Frontend Server (Astro build) | — | Astro's file-based routing and i18n config handle all locale-to-URL mapping at build time; no runtime routing |
| String selection (NL vs EN) | Astro component (build-time) | — | `Astro.currentLocale` resolves at build; components call `getStrings()` inline |
| Language switch links | Astro component (build-time) | — | `getRelativeLocaleUrl()` from `astro:i18n` computes the link at build; no JS needed |
| hreflang / `<html lang>` / canonical | BaseHead.astro | BaseLayout.astro | SEO head is the single ownership point for all per-locale meta |
| Sitemap multi-locale | `@astrojs/sitemap` config | — | The integration generates all hreflang alternates in XML automatically |
| EN translation content | `src/i18n/en.ts` | Page-specific `pageTitle`/`pageDesc` strings | Single source of truth for all EN copy; pages pull from it |
| Contact form locale | `src/components/forms/ContactForm.astro` | — | Labels change per locale; `?type=` deep-links and Web3Forms routing unchanged |
| Articles "in Dutch" note | `src/components/sections/Articles.astro` | `src/components/sections/Newsletter.astro` | EN locale must show a note; these components receive strings from `en.ts` |

---

## Standard Stack

### Core (already installed — no new packages)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| astro (built-in `astro:i18n`) | 7.2.3 | Locale routing, URL helpers, `Astro.currentLocale` | Zero-dep, built into Astro; no library needed for 2-locale site |
| `@astrojs/sitemap` | 3.7.3 | Multi-locale sitemap with hreflang alternates in XML | Already installed; handles sitemap i18n out of the box |

**No new packages are installed in Phase 4.** All functionality comes from Astro's built-in i18n system.

### Package Legitimacy Audit

> No new packages are installed in this phase. Existing packages are pre-installed and used in Phases 1–3.

| Package | Registry | Verdict | Disposition |
|---------|----------|---------|-------------|
| `astro` | npm | SUS (flagged "too-new" by registry age check — this is a false positive: `astro` is the canonical Astro framework with 3.9M weekly downloads, published by withastro on GitHub) | Approved — already installed and used across Phases 1–3 |
| `@astrojs/sitemap` | npm | OK | Approved — already installed |

**Packages removed due to SLOP verdict:** none
**Packages flagged as suspicious:** none (the `astro` "SUS" verdict is a false positive from a recent patch release — the package itself is `withastro/astro` on GitHub with 3.9M weekly downloads)

---

## Architecture Patterns

### System Architecture Diagram

```
Build-time request for /en/speaking
         │
         ▼
src/pages/en/speaking.astro
         │
         ├─ getStrings('en')          ← src/i18n/utils.ts reads en.ts
         │         │
         │         └─ en.spreker.*    ← src/i18n/en.ts (draft, Milan review)
         │
         ├─ BaseLayout (lang='en')
         │         │
         │         ├─ BaseHead (locale='en', slug='speaking', nlSlug='spreker')
         │         │       │
         │         │       ├─ <html lang="en">
         │         │       ├─ hreflang nl  → getAbsoluteLocaleUrl('nl','spreker')
         │         │       ├─ hreflang en  → getAbsoluteLocaleUrl('en','speaking')
         │         │       └─ hreflang x-default → NL absolute URL
         │         │
         │         ├─ Nav.astro (lang='en')
         │         │       └─ NL/EN switch → getRelativeLocaleUrl('nl','spreker')
         │         │
         │         └─ Footer.astro (lang='en')
         │
         └─ Section components (receive strings from getStrings('en'))
                   ├─ Hero, PressStrip, Samenwerken ...
                   └─ Newsletter (shows "in Dutch" note from en.newsletter)
```

### Recommended Project Structure

```
src/
├── i18n/
│   ├── nl.ts            # EXISTING — all Dutch strings (as const)
│   ├── en.ts            # NEW — mirrors nl.ts shape exactly (as const)
│   └── utils.ts         # NEW — getStrings(locale) helper
├── pages/
│   ├── index.astro      # NL homepage (keep — no change)
│   ├── coaching.astro   # NL (keep — refactor to getStrings)
│   ├── spreker.astro    # NL (keep — refactor to getStrings)
│   ├── mijn-verhaal.astro # NL (keep — refactor to getStrings)
│   ├── nieuwsbrief.astro  # NL (keep — refactor to getStrings)
│   ├── contact.astro    # NL (keep — refactor to getStrings)
│   └── en/
│       ├── index.astro      # EN homepage → /en/
│       ├── coaching.astro   # EN coaching → /en/coaching
│       ├── speaking.astro   # EN → /en/speaking (spreker)
│       ├── about.astro      # EN → /en/about (mijn-verhaal)
│       ├── newsletter.astro # EN → /en/newsletter (nieuwsbrief)
│       └── contact.astro    # EN → /en/contact
└── components/
    ├── layout/
    │   ├── BaseLayout.astro  # Add locale prop + lang attr
    │   ├── BaseHead.astro    # Add locale prop + hreflang + <html lang>
    │   ├── Nav.astro         # Make NL|EN switch functional
    │   └── Footer.astro      # Locale-aware strings
    └── sections/             # All components: getStrings(Astro.currentLocale)
```

### Pattern 1: `astro.config.mjs` i18n Activation

**What:** Add EN locale and restructure the routing sub-object correctly.
**Key finding:** In Astro 7, `prefixDefaultLocale` lives inside `i18n.routing`, NOT at the top level. The existing commented plan has it at the wrong level. The default value of `routing.prefixDefaultLocale` is `false` — which is what D-05 requires — so Phase 4 can either add an explicit `routing: { prefixDefaultLocale: false }` or omit `routing` entirely.

```js
// astro.config.mjs — Phase 4 change
// Source: [VERIFIED: node_modules/astro/dist/types/public/config.d.ts:routing object]
i18n: {
  defaultLocale: 'nl',
  locales: ['nl', 'en'],  // ADD 'en'
  // routing.prefixDefaultLocale defaults to false — NL stays at root, EN under /en/*
  // No routing block needed unless you want to be explicit:
  // routing: { prefixDefaultLocale: false },
},

integrations: [
  sitemap({
    i18n: {
      defaultLocale: 'nl',
      locales: {
        nl: 'nl-NL',
        en: 'en',   // ADD this entry (D-04: hreflang code 'en', not 'en-US')
      },
    },
  }),
],
```

**Critical:** Remove or replace the commented `prefixDefaultLocale: true` in the comment block — it now documents incorrect behavior for D-05.

### Pattern 2: `getStrings()` Locale Helper

**What:** Single helper in `src/i18n/utils.ts` that returns the correct strings object for the current locale.
**When to use:** In every page and component that needs locale strings (replaces `import { nl } from '../../i18n/nl'`).

```typescript
// src/i18n/utils.ts
// Source: [CITED: docs.astro.build/en/recipes/i18n/]
import { nl } from './nl';
import { en } from './en';

export type Locale = 'nl' | 'en';
export type Strings = typeof nl;

const strings: Record<Locale, Strings> = { nl, en };

/**
 * Returns the full strings object for the given locale.
 * Falls back to 'nl' for any unrecognised locale value.
 */
export function getStrings(locale: string | undefined): Strings {
  return strings[(locale as Locale) ?? 'nl'] ?? strings.nl;
}
```

**Usage in components (recommended approach — no prop-drilling):**
```astro
---
// src/components/sections/Newsletter.astro
import { getStrings } from '../../i18n/utils';
const t = getStrings(Astro.currentLocale);
const { heading, subtext, labelEmail, cta, disclaimer } = t.newsletter;
---
```

**Usage in pages (same pattern):**
```astro
---
// src/pages/en/coaching.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getStrings } from '../../i18n/utils';
// Astro.currentLocale is 'en' for /en/* pages automatically
const t = getStrings(Astro.currentLocale);
---
<BaseLayout title={t.coaching.pageTitle} description={t.coaching.pageDesc}>
  ...
</BaseLayout>
```

`Astro.currentLocale` is `'nl'` for root pages (no prefix → falls back to `defaultLocale`), `'en'` for `/en/*` pages. [VERIFIED: node_modules/astro/dist/types/public/config.d.ts]

### Pattern 3: EN Page Files (Thin Wrappers)

**What:** Each `src/pages/en/*.astro` file imports the same section components as the NL page, but `Astro.currentLocale` is automatically `'en'` — so `getStrings()` returns EN strings with no prop changes.
**When to use:** Every EN page.

```astro
---
// src/pages/en/coaching.astro  →  /en/coaching
// Source: [ASSUMED — derived from Astro i18n file-based routing pattern]
import BaseLayout from '../../layouts/BaseLayout.astro';
import SectionWrapper from '../../components/ui/SectionWrapper.astro';
import Newsletter from '../../components/sections/Newsletter.astro';
import { getStrings } from '../../i18n/utils';
const t = getStrings(Astro.currentLocale); // 'en'
---
<BaseLayout title={t.coaching.pageTitle} description={t.coaching.pageDesc}>
  <!-- Same component tree as NL coaching.astro — components call getStrings internally -->
  ...
  <Newsletter />
</BaseLayout>
```

**Implication:** Most section components (`Newsletter`, `Articles`, `Testimonials`, etc.) need their `import { nl } from '../../i18n/nl'` replaced with `getStrings(Astro.currentLocale)`. This is the primary refactoring task of the phase — affects 9 components and 5 page files.

### Pattern 4: NL↔EN Slug Map for Language Switch

**What:** A static map from NL slug → EN slug (and reverse) so the Nav switch can construct the equivalent page URL.
**When to use:** In `Nav.astro` to build the language switch link.

```typescript
// src/i18n/utils.ts — add to the helper file
// Source: [ASSUMED — derived from D-06 slug mapping requirement]

/** NL slug → EN slug mapping (root-relative, no leading slash) */
export const nlToEn: Record<string, string> = {
  '':              '',           // homepage → /en/
  'coaching':      'coaching',
  'spreker':       'speaking',
  'mijn-verhaal':  'about',
  'nieuwsbrief':   'newsletter',
  'contact':       'contact',
};

/** EN slug → NL slug mapping */
export const enToNl: Record<string, string> = Object.fromEntries(
  Object.entries(nlToEn).map(([nl, en]) => [en, nl])
);
```

### Pattern 5: Language Switch in Nav

**What:** Replace the `<span class="lang-switch">` disabled affordance with a functional locale link.
**Key rule:** Must be base-path safe. `getRelativeLocaleUrl` from `astro:i18n` handles the base path automatically.

```astro
---
// Nav.astro — language switch section
// Source: [CITED: docs.astro.build/en/reference/modules/astro-i18n/]
import { getRelativeLocaleUrl } from 'astro:i18n';
import { nlToEn, enToNl } from '../../i18n/utils';

const currentLocale = Astro.currentLocale ?? 'nl';
const isEn = currentLocale === 'en';

// Extract current slug from pathname (strip base path + locale prefix)
const base = import.meta.env.BASE_URL; // '/milan-website/'
const pathWithoutBase = Astro.url.pathname.startsWith(base)
  ? Astro.url.pathname.slice(base.length)
  : Astro.url.pathname.slice(1);
// pathWithoutBase is e.g. '' | 'coaching' | 'en/speaking'

const currentSlug = isEn
  ? pathWithoutBase.replace(/^en\/?/, '')   // 'speaking'
  : pathWithoutBase.replace(/\/$/, '');     // 'spreker'

// Map to the opposite locale's slug
const oppositeSlug = isEn
  ? (enToNl[currentSlug] ?? '')
  : (nlToEn[currentSlug] ?? '');

const oppositeLocale = isEn ? 'nl' : 'en';
const switchHref = getRelativeLocaleUrl(oppositeLocale, oppositeSlug);
---

<a href={switchHref} class="lang-switch" aria-label={isEn ? 'Schakel naar Nederlands' : 'Switch to English'}>
  {isEn ? 'NL' : 'EN'}
</a>
```

**Note on displayed text (D-07):** Show the OTHER language as the link label (clicking "EN" takes you to EN; clicking "NL" takes you to NL). The convention varies — show the label for the locale you're switching TO, not the current one.

### Pattern 6: BaseHead / BaseLayout — Locale Wiring

**What:** Add `locale` prop to `BaseHead.astro` and `BaseLayout.astro`; emit `<html lang>`, hreflang alternates, and localized canonical.
**Critical detail:** `getAbsoluteLocaleUrl` requires `site` to be set — it is (`https://rtdpb.github.io`). The base path (`/milan-website/`) is automatically applied by the helper.

```astro
---
// BaseHead.astro — updated interface + hreflang
// Source: [CITED: docs.astro.build/en/reference/modules/astro-i18n/#getabsolutelocaleurl]
import { getAbsoluteLocaleUrl } from 'astro:i18n';

interface Props {
  title: string;
  description: string;
  ogImage?: string;
  locale?: string;          // NEW
  /** NL slug for hreflang cross-linking (needed when EN slug differs from NL slug) */
  nlSlug?: string;          // NEW — e.g. 'spreker' when on /en/speaking
  enSlug?: string;          // NEW — e.g. 'speaking' when on /spreker
}

const { title, description, ogImage, locale = 'nl', nlSlug, enSlug } = Astro.props;

// Clean path for hreflang (strip base + locale prefix)
const base = import.meta.env.BASE_URL;
const rawPath = Astro.url.pathname.startsWith(base)
  ? Astro.url.pathname.slice(base.length)
  : Astro.url.pathname.slice(1);

// Use explicit slug overrides (for translated-slug pages) or derive from raw path
const effectiveNlSlug = nlSlug ?? rawPath.replace(/^en\/?/, '').replace(/\/$/, '');
const effectiveEnSlug = enSlug ?? rawPath.replace(/^en\/?/, '').replace(/\/$/, '');

const nlAbsUrl = getAbsoluteLocaleUrl('nl', effectiveNlSlug);
const enAbsUrl = getAbsoluteLocaleUrl('en', effectiveEnSlug);

// Localized OG locale
const ogLocale = locale === 'en' ? 'en_US' : 'nl_NL';
---

<!-- in <head> -->
<html lang={locale}>   <!-- moved from BaseLayout — or pass as prop -->
<link rel="alternate" hreflang="nl" href={nlAbsUrl} />
<link rel="alternate" hreflang="en" href={enAbsUrl} />
<link rel="alternate" hreflang="x-default" href={nlAbsUrl} />  <!-- NL as x-default: D-04, D-05 -->
<meta property="og:locale" content={ogLocale} />
<!-- og:locale:alternate for the other locale -->
<meta property="og:locale:alternate" content={locale === 'en' ? 'nl_NL' : 'en_US'} />
```

**Note on `<html lang>`:** Currently hardcoded in `BaseLayout.astro` as `lang="nl"`. Phase 4 must make this dynamic. Either pass `locale` down from the page to `BaseLayout` → `BaseHead`, or read `Astro.currentLocale` directly in `BaseLayout`. The latter is cleaner.

### Pattern 7: `en.ts` Shape Contract

**What:** `src/i18n/en.ts` must export `en` with exactly the same top-level keys as `nl.ts` and the same TypeScript literal structure.

```typescript
// src/i18n/en.ts — structural skeleton (content is draft, reviewed by Milan)
// Source: [VERIFIED: src/i18n/nl.ts:1-345 — nl.ts shape is the contract]
export const en = {
  nav: {
    coaching:    'Coaching',
    spreker:     'Speaking',       // EN label for spreker nav item
    nieuwsbrief: 'Newsletter',
    mijnVerhaal: 'My Story',
    boek:        'Book',
    contact:     'Contact',
    nlEnSwitch:  'NL | EN',
    linkedin:    "Milan van der Meulen's LinkedIn",
    openMenu:    'Open menu',
    closeMenu:   'Close menu',
    navLabel:    'Main navigation',
  },
  hero: {
    eyebrow:      'Founder · Coach · Speaker',
    h1:           'Scale your business, without losing yourself',
    subtext:      'I help bold entrepreneurs scale their business. Not from abstract theory, but from lived experience.',
    ctaPrimary:   'Contact',
    ctaSecondary: 'My story',
    usp1: '12+ years',
    usp2: '180 employees',   // VERBATIM number — D-03
    usp3: '9 markets',       // VERBATIM number — D-03
  },
  // ... (all top-level keys from nl.ts: pressStrip, samenwerken, testimonials,
  //      story, newsletter, articles, footer, contact, coaching, mijnVerhaal,
  //      spreker, nieuwsbrief, common)
  newsletter: {
    // D-02: honest "in Dutch" note
    heading:    'Stay informed',
    subtext:    'A monthly honest update on entrepreneurship, scaling, and the lessons I learn along the way. The newsletter is written in Dutch.',
    labelEmail: 'Email address',
    cta:        'Subscribe',
    disclaimer: 'No spam. Unsubscribe whenever you want.',
  },
  // ...
} as const;

export type EnStrings = typeof en;
// TypeScript will enforce shape compatibility with NlStrings in utils.ts
```

**Key EN copy decisions (D-03):**
- `hero.usp2`: `'180 employees'` — verbatim number
- `hero.usp3`: `'9 markets'` — verbatim number
- `hero.usp1`: `'12+ years'` — verbatim number
- All testimonial quotes: faithful EN translation of verbatim Dutch quotes (D-01)
- `newsletter.subtext`: must contain "The newsletter is written in Dutch" or equivalent (D-02)
- `articles` section: include "Written in Dutch" note in `heading` or add a `dutchNote` key (D-02)

### Anti-Patterns to Avoid

- **Do NOT use `prefixDefaultLocale: true`** — this would move existing NL pages to `/nl/*`, breaking all existing links and resetting SEO. D-05 explicitly requires `false`.
- **Do NOT place `prefixDefaultLocale` at `i18n.prefixDefaultLocale` (top level)** — in Astro 7, it belongs inside `i18n.routing`. Top-level placement may be silently ignored or cause a config error. [VERIFIED: node_modules/astro/dist/types/public/config.d.ts]
- **Do NOT hardcode `import { nl }` in shared section components** — after Phase 4, they must use `getStrings(Astro.currentLocale)` to serve both locales correctly.
- **Do NOT use `Astro.currentLocale` without a fallback** — on static builds, it returns `undefined` in some edge cases (e.g., 404 pages). Always use `Astro.currentLocale ?? 'nl'`.
- **Do NOT call `getAbsoluteLocaleUrl` without `site` configured** — it silently returns a relative URL instead of an absolute one. `site: 'https://rtdpb.github.io'` is set, so this is safe here.
- **Do NOT fabricate new factual claims in EN copy** — D-03 locks numbers (12+, 180, 9) and names (Yang Soo Kloosterhof, Ruud Koornstra, Oranjewoud Export Academy) as verbatim.
- **Do NOT translate the Substack content** — D-02. The publication stays Dutch; only the EN site label changes.
- **Do NOT use `import.meta.env.BASE_URL` manually for locale URLs** — use `getRelativeLocaleUrl()` instead; it handles the base path internally.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Locale-aware URL construction | Custom `${BASE_URL}en/coaching` string concatenation | `getRelativeLocaleUrl('en', 'coaching')` from `astro:i18n` | Handles base path, trailing slash, locale prefix automatically |
| hreflang absolute URLs | `new URL('/en/coaching', Astro.site)` manually | `getAbsoluteLocaleUrl('en', 'coaching')` | Correctly incorporates base, site, and locale prefix |
| Sitemap hreflang alternates | Hand-coded XML or custom sitemap | `@astrojs/sitemap` with i18n block | Handles all URL pairs and xhtml:link generation |
| Locale detection in components | URL parsing logic in each component | `Astro.currentLocale` (Astro global) | Zero-cost build-time value, always correct |

**Key insight:** Astro's built-in i18n system was designed for exactly this use case — 2-locale static site with one locale at root, one under a prefix. Rolling custom URL logic creates drift risk when the base path changes (e.g., when the production domain replaces GitHub Pages).

---

## Common Pitfalls

### Pitfall 1: `prefixDefaultLocale` at the Wrong Config Level

**What goes wrong:** Placing `prefixDefaultLocale: false` (or `true`) at `i18n.prefixDefaultLocale` (top-level) instead of `i18n.routing.prefixDefaultLocale`. The existing commented plan in `astro.config.mjs` has it at the wrong level.
**Why it happens:** Astro 3.5 introduced i18n with routing options nested under `i18n.routing` (since v3.7.0). The commented plan predates this understanding.
**How to avoid:** Use `i18n: { ..., routing: { prefixDefaultLocale: false } }` — or omit `routing` entirely since `false` is the default. [VERIFIED: node_modules/astro/dist/types/public/config.d.ts]
**Warning signs:** Build succeeds but NL pages also get `/nl/` prefix, or EN pages don't get `/en/` prefix.

### Pitfall 2: `Astro.currentLocale` Returns `undefined` on Static 404

**What goes wrong:** `Astro.currentLocale` can return `undefined` for pages outside the locale tree (e.g., `404.astro`). Using it without a fallback crashes or renders no strings.
**How to avoid:** Always `Astro.currentLocale ?? 'nl'` as the fallback in `getStrings()`.
**Warning signs:** Build warnings about undefined locale; 404 page renders in wrong language.

### Pitfall 3: Double-Prefix in Hreflang URLs

**What goes wrong:** Constructing hreflang URLs by appending `/en/` to `Astro.url.pathname` when the pathname already contains `/milan-website/en/speaking`. Result: `https://rtdpb.github.io/milan-website/en/milan-website/en/speaking`.
**How to avoid:** Always use `getAbsoluteLocaleUrl(locale, slug)` where `slug` is the slug only (e.g., `'speaking'`), not the full pathname.
**Warning signs:** Google Search Console reports invalid hreflang URLs.

### Pitfall 4: Hardcoded `nl` Imports in Shared Components After Refactor

**What goes wrong:** `Newsletter.astro`, `Articles.astro`, `Footer.astro`, `Nav.astro`, and 5 other section components still `import { nl }` after Phase 4. EN pages using those components silently render Dutch text.
**Why it happens:** 9 components and 5 page files all hardcode `import { nl }`. It is easy to miss one.
**How to avoid:** Systematic grep for `import.*from.*i18n/nl` post-refactor — should return zero results (all replaced with `getStrings`). This grep is the verification step.
**Warning signs:** `/en/coaching` shows Dutch testimonial text despite having `en.ts`.

### Pitfall 5: Base Path Missing from Language Switch Links

**What goes wrong:** The Nav switch constructs `/en/speaking` but the deployed URL is `/milan-website/en/speaking`. The link 404s on GitHub Pages.
**How to avoid:** Always `getRelativeLocaleUrl('en', 'speaking')` — this returns `/milan-website/en/speaking` automatically. Never concatenate locale paths manually.
**Warning signs:** Language switch works locally (`astro dev`) but 404s on the deployed site.

### Pitfall 6: Sitemap Mismatch Between `astro.config.mjs` i18n and `sitemap()` i18n

**What goes wrong:** Adding EN to `astro.config.mjs i18n.locales` but forgetting to add `en: 'en'` to the `sitemap()` i18n block. The sitemap only contains NL hreflang alternates.
**How to avoid:** Both config blocks must be updated in the same commit. [VERIFIED: node_modules/@astrojs/sitemap/dist/index.d.ts — sitemap has its OWN i18n config]
**Warning signs:** Sitemap XML has `<xhtml:link hreflang="nl-NL">` entries but no `<xhtml:link hreflang="en">` entries.

### Pitfall 7: `og:locale` Still Hardcoded as `nl_NL` on EN Pages

**What goes wrong:** `BaseHead.astro` currently has `<meta property="og:locale" content="nl_NL" />` hardcoded. EN pages emit the wrong OG locale.
**How to avoid:** Conditionally render `og:locale` based on the `locale` prop: `locale === 'en' ? 'en_US' : 'nl_NL'`.
**Warning signs:** Social sharing on EN pages shows Dutch OG locale in debugger.

---

## Code Examples

### Complete `astro.config.mjs` i18n + sitemap change

```js
// Source: [VERIFIED: node_modules/astro/dist/types/public/config.d.ts:routing.prefixDefaultLocale]
// Source: [VERIFIED: node_modules/@astrojs/sitemap/dist/index.d.ts:SitemapOptions.i18n]
i18n: {
  defaultLocale: 'nl',
  locales: ['nl', 'en'],
  // routing.prefixDefaultLocale defaults to false — NL stays at root
},

integrations: [
  sitemap({
    i18n: {
      defaultLocale: 'nl',
      locales: {
        nl: 'nl-NL',
        en: 'en',    // D-04: hreflang code 'en', not 'en-US'
      },
    },
  }),
],
```

### `getStrings()` helper — complete `src/i18n/utils.ts`

```typescript
// Source: [CITED: docs.astro.build/en/recipes/i18n/ — useTranslations pattern adapted]
import { nl } from './nl';
import { en } from './en';

export type Locale = 'nl' | 'en';
export type Strings = typeof nl;

const strings = { nl, en } satisfies Record<Locale, Strings>;

export function getStrings(locale: string | undefined): Strings {
  if (locale === 'en') return strings.en;
  return strings.nl;  // default + fallback
}
```

**Note:** Using `satisfies Record<Locale, Strings>` enforces that `en.ts` has the same shape as `nl.ts` at compile time — TypeScript catches missing or mistyped keys automatically.

### Slug map and switch URL in `Nav.astro`

```typescript
// Source: [ASSUMED — derived from D-06 slug decisions and astro:i18n docs]
import { getRelativeLocaleUrl } from 'astro:i18n';

// Per-page NL↔EN slug map (D-06)
const nlToEn: Record<string, string> = {
  '':             '',
  'coaching':     'coaching',
  'spreker':      'speaking',
  'mijn-verhaal': 'about',
  'nieuwsbrief':  'newsletter',
  'contact':      'contact',
};
const enToNl: Record<string, string> = Object.fromEntries(
  Object.entries(nlToEn).map(([n, e]) => [e, n])
);

const currentLocale = Astro.currentLocale ?? 'nl';
const isEn = currentLocale === 'en';
const base = import.meta.env.BASE_URL; // '/milan-website/'

// Strip base path + locale prefix to get bare slug
let rawSlug = Astro.url.pathname.startsWith(base)
  ? Astro.url.pathname.slice(base.length)
  : Astro.url.pathname.slice(1);
rawSlug = rawSlug.replace(/\/$/, '');              // strip trailing slash
const currentSlug = isEn ? rawSlug.replace(/^en\/?/, '') : rawSlug;

const oppositeLocale = isEn ? 'nl' : 'en';
const oppositeSlug = isEn
  ? (enToNl[currentSlug] ?? '')
  : (nlToEn[currentSlug] ?? '');
const switchHref = getRelativeLocaleUrl(oppositeLocale, oppositeSlug);
```

### `BaseLayout.astro` locale wiring

```astro
---
// BaseLayout.astro — add locale to <html lang>
// Source: [CITED: docs.astro.build/en/recipes/i18n/ — html lang pattern]
const lang = Astro.currentLocale ?? 'nl';
---
<html lang={lang}>   <!-- was: lang="nl" hardcoded -->
```

### hreflang in `BaseHead.astro` — simplified (same-slug pages)

```astro
---
// For pages where NL slug == EN slug (coaching, contact)
// Source: [CITED: eastondev.com/blog/en/posts/dev/20251202-astro-i18n-guide/]
import { getAbsoluteLocaleUrl } from 'astro:i18n';

const locale = Astro.currentLocale ?? 'nl';
const base = import.meta.env.BASE_URL;
let slug = Astro.url.pathname.startsWith(base)
  ? Astro.url.pathname.slice(base.length)
  : Astro.url.pathname.slice(1);
slug = slug.replace(/^en\/?/, '').replace(/\/$/, '');
// For translated slugs, the page passes nlSlug/enSlug as props to override
---
<link rel="alternate" hreflang="nl" href={getAbsoluteLocaleUrl('nl', nlSlug ?? slug)} />
<link rel="alternate" hreflang="en" href={getAbsoluteLocaleUrl('en', enSlug ?? slug)} />
<link rel="alternate" hreflang="x-default" href={getAbsoluteLocaleUrl('nl', nlSlug ?? slug)} />
```

---

## Runtime State Inventory

> This is a rename/refactor phase for components. Checked all 5 categories.

| Category | Items Found | Action Required |
|----------|-------------|-----------------|
| Stored data | None — no database; all content is in-repo TypeScript files | None |
| Live service config | None — no external service stores locale config | None |
| OS-registered state | None | None |
| Secrets/env vars | None — no locale-specific secrets | None |
| Build artifacts | `dist/` output is regenerated on every build; no stale locale artifacts persist | Run `astro build` fresh |

**Nothing found in categories 1–4 — verified by codebase audit. Category 5: clean after `astro build`.**

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Top-level `i18n.prefixDefaultLocale` | Nested `i18n.routing.prefixDefaultLocale` | Astro 3.7.0 | The existing commented plan is outdated — must use `routing` sub-object |
| Hardcoded `lang="nl"` in BaseLayout | `lang={Astro.currentLocale ?? 'nl'}` | Phase 4 | `<html lang>` becomes correct for EN pages |
| `import { nl }` in every component | `getStrings(Astro.currentLocale)` | Phase 4 | Components serve correct locale without prop-drilling |
| `<span>NL | EN</span>` disabled | Functional `<a href={switchHref}>` | Phase 4 | I18N-01 delivered |

**Deprecated/outdated in this codebase:**
- `nav.nlEnSwitch` in `nl.ts` (currently `'NL | EN'` — Phase 4 replaces the element entirely with two separate locale link states)
- `common.nlEnSwitch` in `nl.ts` (same — used only as the disabled affordance label in `Nav.astro`)

---

## Environment Availability

> All dependencies are already installed. No new CLI tools or services needed.

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Astro build | ✓ | 24.14.0 | — |
| npm | Package scripts | ✓ | 11.9.0 | — |
| astro (runtime) | All pages | ✓ | 7.2.3 | — |
| @astrojs/sitemap | Sitemap generation | ✓ | 3.7.3 | — |
| astro:i18n (built-in) | URL helpers, locale detection | ✓ | included in 7.2.3 | — |
| @astrojs/check | TypeScript type checking (build script) | ✓ | 0.9.10 | — |

**Missing dependencies with no fallback:** None.

---

## Validation Architecture

> `nyquist_validation: true` in `.planning/config.json` — section required.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None installed — no test runner in the project |
| Config file | None — Wave 0 must create basic smoke test infrastructure |
| Quick run command | `npm run build` (type-check + build, catches most i18n errors at compile time) |
| Full suite command | `npm run build && node scripts/smoke-i18n.js` (smoke script to be created in Wave 0) |

**Note:** This site has no unit/integration test framework. The natural validation for i18n correctness is Astro's own TypeScript check (`astro check`) plus build-time verification (if `en.ts` is missing a key that `nl.ts` has, the `satisfies` constraint fails the build). Visual/functional testing is manual (browser review).

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| I18N-01 | NL/EN switch changes language and persists | smoke (build output check) | `node scripts/smoke-i18n.js` | ❌ Wave 0 |
| I18N-01 | Switch links resolve to correct opposite-locale URL | TypeScript (slug map type check) | `npm run build` | ❌ Wave 0 |
| I18N-02 | All 6 EN pages exist in build output | smoke (dist/ file check) | `node scripts/smoke-i18n.js` | ❌ Wave 0 |
| I18N-02 | EN pages have `lang="en"` on `<html>` | smoke (HTML parse) | `node scripts/smoke-i18n.js` | ❌ Wave 0 |
| I18N-02 | `en.ts` shape matches `nl.ts` (TypeScript satisfies) | type check | `npm run build` | ❌ Wave 0 (en.ts doesn't exist yet) |
| SEO-01 | hreflang alternates present on all pages | smoke (HTML parse) | `node scripts/smoke-i18n.js` | ❌ Wave 0 |
| SEO-01 | Sitemap contains EN URLs | smoke (XML parse) | `node scripts/smoke-i18n.js` | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `npm run build` (astro check + build; catches TypeScript shape mismatches in `en.ts`)
- **Per wave merge:** `npm run build && node scripts/smoke-i18n.js`
- **Phase gate:** Full suite green before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] `scripts/smoke-i18n.js` — checks dist/ for EN page files, `lang="en"`, hreflang links, sitemap EN entries
- [ ] `src/i18n/en.ts` — the translation file itself (must exist before any component refactoring compiles)
- [ ] `src/i18n/utils.ts` — `getStrings()` helper (must exist before component refactoring)

*(Existing `npm run build` covers TypeScript shape validation via the `satisfies` constraint — no additional framework install needed for type-level tests.)*

---

## Security Domain

> `security_enforcement: true`, `security_asvs_level: 1` in `.planning/config.json`.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | No auth in this site |
| V3 Session Management | No | URL-path locale persistence — no session |
| V4 Access Control | No | Public static site |
| V5 Input Validation | Partial | Contact form already validated; EN form labels change but no new input surface |
| V6 Cryptography | No | No new crypto operations |

### Known Threat Patterns for This Stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Open redirect via language switch | Spoofing | `getRelativeLocaleUrl` only generates in-site paths; no user-supplied URLs accepted |
| XSS via translated strings | Tampering | `en.ts` is a static TypeScript const — no runtime interpolation of user data |
| Prototype pollution in slug map | Tampering | Slug map uses `Record<string, string>` with known keys — no user input touches it |

**No new security surface is introduced by this phase.** The language switch is a static anchor tag with a build-time-computed href. The EN pages reuse the same security-hardened components from Phases 1–3.

---

## Project Constraints (from CLAUDE.md)

| Constraint | Impact on Phase 4 |
|------------|-------------------|
| Tech stack: Astro static-first | EN pages must be static files; no SSR/server-side locale detection |
| Brand: accent `#FFDD11` used sparingly | Language switch element must not use yellow (matches current disabled affordance style) |
| Infra minimalism: no auth, database, CMS | No locale preference stored in cookies/DB; URL-path only (D-07) |
| Assets: no large originals committed | EN pages reuse existing optimized AVIF/WebP assets; no new photo work needed |
| No fake working buttons (HOME-10) | EN pages must carry forward the honesty rule: disabled placeholders stay disabled |
| Preserve factual claims verbatim (HOME-11) | Numbers (12+, 180, 9) and names must be verbatim in EN copy |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The slug map `nlToEn`/`enToNl` can be a static object in `utils.ts` — no dynamic routing or content collection slugs | Patterns 4, 5 | If slugs become dynamic later, the map needs a runtime lookup; for 6 fixed pages this is safe |
| A2 | `getRelativeLocaleUrl('en', 'speaking')` returns `/milan-website/en/speaking` with the `/milan-website/` base path applied automatically | Pattern 5 | If the helper does not apply the base, all switch links will 404 on GitHub Pages; verified from docs ("base path aware") but not in a local build test |
| A3 | `Astro.currentLocale` is `'nl'` for root pages (index.astro, coaching.astro etc.) and `'en'` for /en/* pages — no additional configuration needed | Pattern 2 | If behavior differs, `getStrings()` returns wrong locale; mitigation: add explicit locale prop to BaseLayout as a fallback |
| A4 | The `satisfies Record<Locale, Strings>` TypeScript pattern enforces shape parity between `en.ts` and `nl.ts` at build time | en.ts Shape Contract | If TypeScript version or Astro check config does not support `satisfies`, shape mismatches go undetected; TS 5.0+ is installed so this is safe |
| A5 | The Nav switch label convention (show the OTHER locale) is preferred over showing the CURRENT locale | Pattern 5 | User preference — reversible; just swap the ternary |
| A6 | `og:locale: 'en_US'` for the EN locale is appropriate (international English, D-04) | BaseHead wiring | D-04 specifies hreflang `en` but does not specify OG locale sub-tag; `en_US` is conventional and harmless for a non-US-specific site |

---

## Open Questions

1. **How should the Nav switch be styled for the active vs. inactive locale?**
   - What we know: The current disabled span is `opacity: 0.4; cursor: not-allowed`. For Phase 4, the switch becomes a functional link (or two separate links: "NL" and "EN").
   - What's unclear: Should both locales show as text with the current one highlighted, or show only the OTHER locale as a link?
   - Recommendation: Show both ("NL | EN") with the current locale bold/underlined and the other as a link. This matches the existing affordance text. Defer exact styling to the planner.

2. **Should the `<html lang>` attribute be `'en'` or `'en-GB'` / `'en-US'`?**
   - What we know: D-04 specifies hreflang code `en` (international English). The `lang` HTML attribute and hreflang code are distinct.
   - What's unclear: HTML spec recommends a regional subtag for `lang` (`en-GB` or `en-US`), but `en` is valid and appropriate for international content.
   - Recommendation: Use `lang="en"` on the `<html>` element to match the hreflang code and keep it neutral.

3. **Which page's `story.imageAlt` should be used for EN?**
   - What we know: `nl.story.imageAlt` is `'Milan van der Meulen op het podium.'` (Dutch text in an alt attribute).
   - Recommendation: Add `en.story.imageAlt: 'Milan van der Meulen on stage.'` to `en.ts`.

---

## Sources

### Primary (MEDIUM confidence)
- Astro 7.2.3 type definitions: `node_modules/astro/dist/types/public/config.d.ts` — i18n config schema, `routing.prefixDefaultLocale` exact placement and default value [VERIFIED]
- `@astrojs/sitemap` v3.7.3 type definitions: `node_modules/@astrojs/sitemap/dist/index.d.ts` — `SitemapOptions.i18n` exact shape [VERIFIED]
- `src/i18n/nl.ts` (lines 1–345) — complete NL strings structure that `en.ts` must mirror [VERIFIED]
- `astro.config.mjs` (lines 20–27) — existing i18n block and sitemap config [VERIFIED]
- `src/components/layout/Nav.astro` (lines 96–105) — existing NL|EN disabled switch [VERIFIED]
- `src/components/layout/BaseHead.astro` (lines 28–31, 111) — canonical URL and hardcoded og:locale [VERIFIED]
- `src/components/layout/BaseLayout.astro` (line 31) — hardcoded `lang="nl"` [VERIFIED]

### Secondary (MEDIUM confidence — CITED from official docs)
- [docs.astro.build/en/reference/modules/astro-i18n/](https://docs.astro.build/en/reference/modules/astro-i18n/) — `getAbsoluteLocaleUrl`, `getRelativeLocaleUrl` signatures and examples
- [docs.astro.build/en/recipes/i18n/](https://docs.astro.build/en/recipes/i18n/) — `useTranslations`/`getLangFromUrl` pattern (basis for `getStrings()`)
- [docs.astro.build/en/guides/internationalization/](https://docs.astro.build/en/guides/internationalization/) — `prefixDefaultLocale: false` file structure, `Astro.currentLocale` behavior
- [docs.astro.build/en/guides/integrations-guide/sitemap/](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — `@astrojs/sitemap` i18n config

### Tertiary (LOW confidence — web search / community)
- [eastondev.com i18n guide](https://eastondev.com/blog/en/posts/dev/20251202-astro-i18n-guide/) — hreflang + path-stripping pattern in BaseHead [CITED: code shapes]
- [better-i18n.com Astro guide](https://better-i18n.com/en/blog/astro-i18n-multi-language-sites/) — per-locale page file architecture recommendation

---

## Metadata

**Confidence breakdown:**
- Config changes (astro.config.mjs): HIGH — verified against Astro 7 type defs in node_modules
- `getStrings()` helper pattern: MEDIUM — cited from official Astro i18n recipe
- `getRelativeLocaleUrl` / `getAbsoluteLocaleUrl` behavior: MEDIUM — cited from official reference
- `@astrojs/sitemap` i18n config: HIGH — verified from node_modules type defs
- hreflang path-stripping in BaseHead: MEDIUM — cited from community guide, consistent with official docs
- EN copy content: LOW — draft, needs Milan review (D-03)
- Slug map behavior in Nav: LOW (A2 — base path on helpers not locally confirmed)

**Research date:** 2026-08-19
**Valid until:** 2026-09-18 (Astro stable releases; 30-day window for stable packages)
