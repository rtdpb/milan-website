# Phase 1: Foundation, Design System & Dutch Homepage — Research

**Researched:** 2026-08-18
**Domain:** Astro 7 static site, CSS design tokens, editorial typography, responsive image pipeline, SEO/a11y, i18n-ready structure
**Confidence:** MEDIUM (Astro docs fetched from official docs.astro.build; npm registry verified; font/animation guidance from websearch)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Base theme is **light editorial** (off-white/cream background, near-black text, generous whitespace, Sevora-inspired) with **1–2 full-width dark "feature bands"** used as dramatic anchors. Designated dark band: the **personal story** ("Waarom ik nu mijn lessen deel"). Testimonials may use a single dark accent card within an otherwise light section. — Reversibility: reversible (token-driven).
- **D-02:** Yellow `#FFDD11` is **restrained overall but allowed a few deliberate "signature moments"** (e.g. the hero photo's yellow backdrop; possibly one yellow highlight/section accent). Default UI (buttons/marks/hover) uses yellow sparingly; the page must never read as "covered in yellow."
- **D-03:** **Neutral-only palette** — near-black, white/cream, greys — with **yellow as the single accent**. No navy/indigo secondary color. — Reversibility: reversible.
- **D-04:** Hero uses a **split "card" layout**: text block left; hero photo in a **large rounded card on the right** (Sevora-style). Stacks vertically on mobile.
- **D-05:** Hero photo = **`10 Jaar Soly-77`** (yellow+blue stage backdrop). It is the **LCP image**: eager-load, high priority, served as optimized AVIF/WebP with responsive crops.
- **D-06:** **"bekend van" press-logo strip sits directly under the hero** (slim credibility band), using clearly-marked placeholder logo chips until real logos are supplied.
- **D-07:** "Samenwerken" renders as a **3-card row** (commitment ladder): Nieuwsbrief → Presentatie/lezing → 1:1 Coaching. Each card carries its supplied CTA.
- **D-08:** Testimonials use a **mixed-size mosaic** with the **3 supplied quotes + attributions**. No fabricated stats.
- **D-09:** Newsletter signup: inline form is fully designed, submit action is a **clearly-marked placeholder link (disabled/TODO)**, not a fake success state. Wire real Substack URL in Phase 3.
- **D-10:** "Recente artikelen" shows **3 designed placeholder article cards**, clearly flagged as placeholder.
- **D-11:** Press logos are **text/wordmark placeholder chips** (greyscale), swappable when real assets arrive.
- **D-12:** **Honest CTA/link handling (global):** any CTA whose destination is unknown is **rendered but disabled/non-clickable and documented**. In-page anchor CTAs may link to on-page sections.
- **D-13:** Design tokens as **CSS custom properties**. Brand typeface behind a **single swappable variable** (`--font-display` / `--font-brand`): interim = properly-licensed editorial serif + clean grotesque sans.
- **D-14:** **Astro components + scoped/token-based CSS.** Utility framework optional but output **must not look like a generic AI/SaaS template**. Minimal JS: interactivity via small Astro islands / vanilla JS only.
- **D-15:** **Animations:** subtle, purposeful scroll-reveal (fade/translate) and hover micro-interactions; **respect `prefers-reduced-motion`**; no heavy parallax.
- **D-16:** **i18n-ready structure:** NL is the default/only locale now; EN added in Phase 4 without a refactor.
- **D-17:** **Content/tone:** Dutch, informal "je", confident and honest. Preserve factual claims; flag suspected factual inconsistencies.

### Claude's Discretion

D-07 through D-16 above were left to Claude's judgment (user selected only Color & Hero to discuss) and made per the brief. All are open to revision at planning/UI-spec time.

### Deferred Ideas (OUT OF SCOPE)

- Coaching / Spreker / Mijn verhaal / Contact pages → Phase 2
- Working contact form + "Boek lezing"/"Plan kennismaking" lead flow → Phase 2
- Real Substack signup + live recent-articles feed → Phase 3
- NL/EN switch + English translations → Phase 4
- Book / pre-order page + analytics/conversion + optional CMS → Phase 5
- LinkedIn feed integration → out of scope (not attempted)
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FND-01 | Astro project scaffolded with component-based structure and build/dev tooling | §Standard Stack, §Architecture Patterns |
| FND-02 | Design system with tokens — color, typographic scale, spacing scale — and swappable brand-font variable | §Design System, §Fonts, §Code Examples |
| FND-03 | Reusable UI components — CTA/button variants, cards, section wrapper, nav, footer | §Architecture Patterns, §Component Conventions |
| FND-04 | High-quality responsive layouts across desktop, tablet, and mobile | §Architecture Patterns, §Responsive Layout |
| FND-05 | Baseline SEO + metadata — title, description, Open Graph/Twitter, favicon, semantic HTML, sitemap, robots | §SEO/Metadata |
| FND-06 | Accessibility baseline — landmarks, alt text, visible focus states, color contrast, keyboard navigation | §Accessibility |
| FND-07 | Performance baseline — optimized fonts, minimal JS, strong Core Web Vitals | §Performance, §Fonts |
| FND-08 | Subtle, purposeful animations that respect `prefers-reduced-motion` | §Animations |
| FND-09 | i18n-ready structure (routing/content organized so EN adds without a refactor); NL content only in v1 | §i18n-Ready Structure |
| FND-10 | Responsive image pipeline — AVIF/WebP derivatives, srcset/sizes, lazy loading, focal-point crops; originals kept separate and uncommitted | §Image Pipeline |
| HOME-01 | Header — nav, Contact CTA, NL/EN switch affordance, LinkedIn icon (placeholders where target unknown) | §Architecture Patterns |
| HOME-02 | Hero — title, subtext, primary/secondary CTAs, USPs, hero photo (`10 Jaar Soly-77`) | §Image Pipeline, §Code Examples |
| HOME-03 | Credibility "bekend van" logo carousel — placeholder logo chips | §Architecture Patterns |
| HOME-04 | "Samenwerken" section — 3 offer cards with CTAs | §Architecture Patterns |
| HOME-05 | Testimonials section — 3 supplied quotes with attributions | §Architecture Patterns |
| HOME-06 | Personal story "Waarom ik nu mijn lessen deel" — full copy, signature, supporting photo(s) | §Image Pipeline |
| HOME-07 | Newsletter signup section — submits to placeholder/Substack endpoint | §Architecture Patterns |
| HOME-08 | "Recente artikelen" section — 3 static placeholder article cards | §Architecture Patterns |
| HOME-09 | Footer — navigation, LinkedIn, legal/placeholder content | §Architecture Patterns |
| HOME-10 | Every CTA with known destination works; unknown destinations clearly documented and disabled | §Common Pitfalls |
| HOME-11 | Preserve supplied factual claims, names, and quotes; flag suspected inconsistencies | §Common Pitfalls |
</phase_requirements>

---

## Summary

This phase builds a greenfield Astro 7 static site: a premium Dutch homepage for a founder personal brand with a reusable design system, responsive image pipeline, baseline SEO/a11y, subtle animations, and an i18n-ready structure. Astro 7.2.3 (released June 2026, latest on npm) is the correct target — it requires Node 22.12+ and uses a new Rust compiler that is strict about HTML validity. The overall architecture is: a single layout component importing global CSS tokens, scoped component CSS for encapsulation, `astro:assets` `<Picture>` for image optimization, and an `i18n` config block enabling NL-only routing that can be extended to EN in Phase 4.

The key technical challenge is the image pipeline: 6 large originals (~86 MB) must never land in production or git; only optimized AVIF/WebP derivatives at multiple responsive widths are served. Astro's built-in `<Picture>` component handles this automatically when images are placed in `src/assets/` — the build outputs optimized derivatives and discards the originals. The hero photo (`10 Jaar Soly-77.jpg`, 6588×4392, landscape) is the LCP image and must use the `priority` prop (eager + fetchpriority=high).

The design system is pure CSS custom properties defined at `:root` in a global token file. Scoped styles in each component reference those tokens via `var(--token-name)`. The brand font is isolated behind `--font-display` and `--font-brand` variables so Naste can swap in with a single change. For the interim, the recommended free/SIL-licensed editorial pairing is **Fraunces** (display serif, Google Fonts OFL) + **DM Sans** (grotesque, Google Fonts OFL), both self-hosted as WOFF2.

**Primary recommendation:** Scaffold with `npm create astro@latest`, select the "Empty" template + TypeScript strict, then layer in the design system, image pipeline, and components in a structured wave plan.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Page rendering / HTML | Astro SSG (build time) | — | Static-first; all pages pre-rendered to HTML |
| Design tokens / CSS | Browser (CSS custom properties) | — | Inherited via :root; no server involvement |
| Image optimization | Astro build pipeline (sharp) | — | AVIF/WebP generated at build, not at request time |
| SEO metadata / JSON-LD | Astro SSG (build time) | — | Baked into static HTML; no hydration needed |
| Navigation / mobile menu | Vanilla JS island | Astro component (markup) | Minimal JS for toggle only |
| Press logo carousel | CSS-only or minimal JS island | — | Prefer CSS scroll-snap; JS only if needed |
| Scroll-reveal animations | Vanilla JS island (IntersectionObserver) | CSS fallback | Tiny island; respects prefers-reduced-motion |
| Forms (newsletter) | HTML + disabled/placeholder state | Phase 3 replaces with Substack | No server in Phase 1; redirect only |
| i18n routing | Astro i18n config | — | Built-in; file-based routing per locale |
| Analytics / tracking | Deferred (Phase 5) | — | Out of scope this phase |

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| astro | 7.2.3 [VERIFIED: npm registry] | Static site framework, routing, components, image pipeline | Best-in-class SSG: zero JS by default, built-in image optimization, first-class i18n, Vite 8 dev server |
| sharp | 0.35.3 [VERIFIED: npm registry] | Image processing backend for astro:assets (AVIF, WebP generation) | Default image service for Astro; required for local image optimization |
| @astrojs/sitemap | 3.7.3 [VERIFIED: npm registry] | Automatic sitemap-index.xml generation | Official Astro integration; required for SEO |
| @astrojs/check | 0.9.10 [VERIFIED: npm registry] | TypeScript type-checking in .astro files | Official tool for astro-specific type errors |
| typescript | 5.x [VERIFIED: npm registry] | Type safety across all source files | Included in every Astro starter; strict mode recommended |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Fraunces (Google Fonts / self-hosted WOFF2) | v1 (OFL) [ASSUMED] | Display/heading serif — SIL-licensed editorial lookalike for Naste fallback | Self-host WOFF2 to avoid Google Fonts round-trip; swap var when Naste arrives |
| DM Sans (Google Fonts / self-hosted WOFF2) | v3 (OFL) [ASSUMED] | Clean grotesque sans-serif for body text | Pairs well with display serifs; SIL/OFL-licensed |

> No utility CSS framework (e.g. Tailwind) is added. Per D-14, the output must not look like a generic template. Pure CSS tokens + scoped component styles are the architecture.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS custom properties | Tailwind CSS | Tailwind produces recognizable template aesthetic (forbidden by D-14); token approach gives full compositional control |
| Fraunces + DM Sans | Playfair Display + Inter | Playfair is heavier/older-feeling; DM Sans is equivalent; Fraunces has more optical character closer to high-contrast display serifs |
| Vanilla JS IntersectionObserver island | GSAP / Motion One | GSAP adds ~100 KB; Motion One (~18 KB) is viable but adds dependency; IO + CSS is zero-dep |
| astro:assets `<Picture>` | unpic/astro | unpic adds CDN flexibility but is overkill for a static site with local assets |

**Installation (greenfield):**
```bash
npm create astro@latest -- --template empty --typescript strict
# Then add integrations:
npx astro add sitemap
npm install sharp
```

**Version verification results (npm registry, 2026-08-18):**
- `astro`: 7.2.3 (published 2026-08-18) [VERIFIED: npm registry]
- `@astrojs/sitemap`: 3.7.3 (published 2026-05-26) [VERIFIED: npm registry]
- `sharp`: 0.35.3 (published 2026-07-01) [VERIFIED: npm registry]
- `@astrojs/check`: 0.9.10 (published 2026-07-27) [VERIFIED: npm registry]
- `typescript`: current stable [VERIFIED: npm registry]

---

## Package Legitimacy Audit

> Package legitimacy gate run via `gsd-tools query package-legitimacy check` on 2026-08-18.

| Package | Registry | Age | Downloads | Source Repo | Verdict | Disposition |
|---------|----------|-----|-----------|-------------|---------|-------------|
| astro | npm | ~4 yrs (est) | 3,941,987/wk | github.com/withastro/astro | SUS (too-new version flag) | Approved — false positive; established framework with 3.9M weekly downloads and official GitHub org |
| @astrojs/sitemap | npm | ~2 yrs (est) | 2,042,716/wk | github.com/withastro/astro | OK | Approved |
| sharp | npm | ~9 yrs (est) | 74,893,373/wk | github.com/lovell/sharp | OK | Approved |
| @astrojs/check | npm | ~1 yr (est) | 2,123,037/wk | github.com/withastro/astro | SUS (too-new version flag) | Approved — false positive; official Astro tooling |
| typescript | npm | ~12 yrs | 180,404,383/wk | github.com/microsoft/TypeScript | OK | Approved |

**Packages removed due to SLOP verdict:** none
**Packages flagged as suspicious (SUS):** astro and @astrojs/check flagged "too-new" by the seam algorithm because their latest point-releases published in 2026 — this is a known false-positive pattern for actively maintained packages. Both are official packages under the `withastro` GitHub org with millions of weekly downloads. The planner does NOT need to add checkpoint:human-verify for these; they are confirmed legitimate.

---

## Architecture Patterns

### System Architecture Diagram

```
Browser request
      |
      v
[Astro 7 SSG — build-time output]
      |
      +---> src/pages/index.astro  (NL default, no prefix)
      |           |
      |           v
      |     src/layouts/BaseLayout.astro
      |           |
      |     +-----+-----+
      |     |           |
      |   <head>    <body>
      |  BaseHead   (slot)
      |  (tokens,       |
      |  canonical,  Section components
      |  OG, JSON-LD)    |
      |             [Hero, PressStrip, Samenwerken,
      |              Testimonials, Story, Newsletter,
      |              Articles, Footer]
      |
      +---> src/assets/ (originals in → AVIF/WebP out via sharp)
      |           |
      |           v
      |     dist/_astro/*.avif, *.webp (generated at build)
      |
      +---> public/ (robots.txt, favicon, OG image)
      |
      +---> src/styles/tokens.css  (global :root custom properties)
                  |
                  v
            all components via var(--token-name)
```

### Recommended Project Structure

```
src/
├── assets/
│   ├── photos/            # Optimized source photos (imported in components)
│   │   ├── milan-hero-stage.jpg          # hero LCP (processed by Astro)
│   │   ├── milan-story-portrait.jpg      # personal story vertical
│   │   ├── milan-energy-mission.jpg      # story supporting
│   │   ├── milan-speaking-graph.jpg      # samenwerken card
│   │   └── milan-networking.jpg          # samenwerken / coaching
│   └── fonts/             # WOFF2 files (Fraunces, DM Sans subsets)
├── components/
│   ├── layout/
│   │   ├── BaseHead.astro              # <head>: meta, canonical, OG, JSON-LD, font preloads
│   │   ├── Nav.astro                   # header navigation + mobile toggle
│   │   └── Footer.astro               # footer navigation + legal
│   ├── sections/
│   │   ├── Hero.astro                  # split-card hero (HOME-02)
│   │   ├── PressStrip.astro            # "bekend van" logo chips (HOME-03)
│   │   ├── Samenwerken.astro           # 3-card services section (HOME-04)
│   │   ├── Testimonials.astro          # mixed-size mosaic (HOME-05)
│   │   ├── Story.astro                 # dark band personal story (HOME-06)
│   │   ├── Newsletter.astro            # signup section (HOME-07)
│   │   ├── Articles.astro              # placeholder article cards (HOME-08)
│   │   └── Footer.astro               # (can be same as layout/Footer)
│   └── ui/
│       ├── Button.astro               # CTA variants (primary, secondary, disabled)
│       ├── Card.astro                 # reusable card shell
│       ├── SectionWrapper.astro       # max-width container + section padding
│       ├── PlaceholderBadge.astro     # visible "placeholder" marker
│       └── RevealOnScroll.astro       # IntersectionObserver island wrapper
├── layouts/
│   └── BaseLayout.astro              # wraps all pages: BaseHead + Nav + slot + Footer
├── pages/
│   └── index.astro                   # Dutch homepage (NL default, no locale prefix)
├── styles/
│   ├── tokens.css                    # :root CSS custom properties (ALL design tokens)
│   ├── reset.css                     # modern CSS reset (box-sizing, margin, etc.)
│   └── global.css                    # body base styles, imports tokens + reset
└── content/                          # (future: content collections for articles)
    └── config.ts                     # content collection schema placeholder

public/
├── robots.txt
├── favicon.svg
├── og-image.jpg                      # 1200×630 OG fallback image
└── fonts/                            # WOFF2 files (if not in src/assets/fonts/)

assets/
└── originals/                        # Full-res originals (.gitignore'd)
    └── *.jpg (from the zip)

astro.config.mjs
tsconfig.json
.gitignore                            # includes assets/originals/ and fotos/
```

### Pattern 1: Global Design Tokens via CSS Custom Properties

**What:** All design values (color, type scale, spacing, radius, shadow, motion) defined as CSS custom properties at `:root` in `src/styles/tokens.css`. Components reference tokens via `var(--token-name)`. Scoped component CSS handles component-specific rules.

**When to use:** Always — tokens go in `tokens.css`, component layout/appearance goes in the component's `<style>` block.

**Example:**
```css
/* src/styles/tokens.css — imported in BaseLayout.astro */
/* Source: Astro docs styling guide + D-02, D-03, D-13 decisions */

:root {
  /* ── Color Tokens ─────────────────────────────────── */
  --color-bg:           #F8F6F1;   /* off-white/cream base */
  --color-bg-dark:      #111110;   /* dark feature band (story section) */
  --color-text:         #1A1917;   /* near-black body text */
  --color-text-inverse: #F8F6F1;   /* text on dark bands */
  --color-accent:       #FFDD11;   /* yellow — restrained, signature moments */
  --color-grey-100:     #F0EDE7;
  --color-grey-300:     #C8C4BC;
  --color-grey-500:     #8C887F;
  --color-grey-700:     #4A4740;
  --color-border:       #DDD9D2;

  /* ── Typography — Font Stacks ─────────────────────── */
  /* D-13: single swappable variable; swap Naste in here when files arrive */
  --font-display:   'Fraunces', Georgia, 'Times New Roman', serif;
  --font-body:      'DM Sans', system-ui, -apple-system, sans-serif;

  /* ── Fluid Type Scale (clamp: min, preferred, max) ── */
  /* Preferred = viewport-relative + static rem anchor   */
  --text-xs:    clamp(0.75rem,  0.7rem  + 0.25vw, 0.875rem);
  --text-sm:    clamp(0.875rem, 0.85rem + 0.25vw, 1rem);
  --text-base:  clamp(1rem,     0.95rem + 0.25vw, 1.125rem);
  --text-lg:    clamp(1.125rem, 1rem    + 0.5vw,  1.375rem);
  --text-xl:    clamp(1.25rem,  1rem    + 0.75vw, 1.75rem);
  --text-2xl:   clamp(1.5rem,   1.1rem  + 1vw,    2.25rem);
  --text-3xl:   clamp(1.875rem, 1.2rem  + 1.5vw,  3rem);
  --text-4xl:   clamp(2.25rem,  1.3rem  + 2vw,    4rem);
  --text-5xl:   clamp(3rem,     1.5rem  + 3vw,    5.5rem);

  /* ── Spacing Scale ─────────────────────────────────── */
  --space-1:  0.25rem;
  --space-2:  0.5rem;
  --space-3:  0.75rem;
  --space-4:  1rem;
  --space-6:  1.5rem;
  --space-8:  2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;
  --space-32: 8rem;

  /* ── Layout ─────────────────────────────────────────── */
  --max-width:        1280px;
  --content-width:    1024px;
  --section-padding-y: clamp(var(--space-12), 8vw, var(--space-32));

  /* ── Radii ──────────────────────────────────────────── */
  --radius-sm:  4px;
  --radius-md:  8px;
  --radius-lg:  16px;
  --radius-xl:  24px;
  --radius-card: 20px;   /* Sevora-style rounded cards */

  /* ── Shadows ────────────────────────────────────────── */
  --shadow-card: 0 2px 16px rgba(26,25,23,0.08), 0 1px 4px rgba(26,25,23,0.04);

  /* ── Motion ─────────────────────────────────────────── */
  --duration-fast:   150ms;
  --duration-base:   300ms;
  --duration-slow:   500ms;
  --ease-out:        cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Pattern 2: LCP Hero Image with Astro Picture Component

**What:** Hero image loaded eagerly with `priority` prop, served as AVIF+WebP, with responsive widths for srcset.

**When to use:** Hero section only. All other section images use default lazy loading.

**Example:**
```astro
---
// src/components/sections/Hero.astro
// Source: docs.astro.build/en/reference/modules/astro-assets/
import { Picture } from 'astro:assets';
import heroImage from '../../assets/photos/milan-hero-stage.jpg';
---

<section class="hero">
  <div class="hero__text">
    <!-- heading, CTAs, USPs -->
  </div>
  <div class="hero__image-card">
    <Picture
      src={heroImage}
      formats={['avif', 'webp']}
      fallbackFormat="jpeg"
      widths={[400, 800, 1200, 1600]}
      sizes="(max-width: 768px) 100vw, 50vw"
      alt="Milan van der Meulen spreekt op het 10 Jaar Soly evenement, geel en blauw podium"
      priority
    />
  </div>
</section>
```

> Note: The `priority` prop sets `loading="eager"` and `fetchpriority="high"` automatically. [CITED: docs.astro.build/en/reference/modules/astro-assets/]

### Pattern 3: i18n-Ready Routing Structure

**What:** Configure Astro's built-in i18n with `defaultLocale: 'nl'` and no prefix on the default locale. NL content lives at root routes. When EN is added in Phase 4, `prefixDefaultLocale: true` is switched on and files move to `/nl/` and `/en/` directories — a one-time refactor the i18n config anticipates.

**Example:**
```js
// astro.config.mjs
// Source: docs.astro.build/en/guides/internationalization/
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://milanvandermeulen.nl',  // required for sitemap + canonical
  output: 'static',
  trailingSlash: 'never',
  i18n: {
    defaultLocale: 'nl',
    locales: ['nl'],
    // Phase 4: add 'en' here and set prefixDefaultLocale: true
    // locales: ['nl', 'en'],
    // prefixDefaultLocale: true,
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'nl',
        locales: { nl: 'nl-NL' },
      },
    }),
  ],
  image: {
    // sharp is the default service; configure output formats:
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
```

### Pattern 4: SEO BaseHead Component

**What:** Centralised `<head>` component covering canonical URL, title, description, OG, Twitter card, JSON-LD Person schema, font preloads.

**Example:**
```astro
---
// src/components/layout/BaseHead.astro
// Source: eastondev.com/blog/en/posts/dev/20251202-astro-seo-complete-guide/
// and docs.astro.build/en/guides/images/ for font preloads

interface Props {
  title: string;
  description: string;
  ogImage?: string;
}

const {
  title,
  description,
  ogImage = '/og-image.jpg',
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
const ogImageURL = new URL(ogImage, Astro.site);

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Milan van der Meulen',
  url: Astro.site?.toString(),
  sameAs: [
    'TODO_LINKEDIN_URL',
  ],
  jobTitle: 'Ondernemer, coach en spreker',
};
---

<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalURL} />

<!-- Fonts: preload critical WOFF2 subset -->
<link rel="preload" href="/fonts/Fraunces-subset.woff2"
  as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/fonts/DMSans-subset.woff2"
  as="font" type="font/woff2" crossorigin />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content={canonicalURL} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImageURL} />
<meta property="og:locale" content="nl_NL" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImageURL} />

<!-- JSON-LD -->
<script type="application/ld+json" set:html={JSON.stringify(personSchema)} />

<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

### Pattern 5: Scroll-Reveal Island (Vanilla JS + prefers-reduced-motion)

**What:** A zero-dependency Astro island that applies IntersectionObserver to children. CSS handles the actual animation. The entire JS block is skipped if `prefers-reduced-motion: reduce` is set.

**Example:**
```astro
---
// src/components/ui/RevealOnScroll.astro
// Source: webSearch findings on IntersectionObserver + prefers-reduced-motion 2025
---

<div class="reveal-wrapper" data-reveal>
  <slot />
</div>

<style>
  [data-reveal] {
    opacity: 0;
    transform: translateY(24px);
    transition:
      opacity var(--duration-slow) var(--ease-out),
      transform var(--duration-slow) var(--ease-out);
  }

  [data-reveal].is-visible {
    opacity: 1;
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    [data-reveal] {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
</style>

<script>
  // Respect prefers-reduced-motion: skip observer entirely
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // unobserve once animated
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
  }
</script>
```

### Pattern 6: Self-Hosting WOFF2 Fonts

**What:** Download and self-host only the WOFF2 subset needed for the character set (Latin + Dutch: A-Z a-z 0-9 punctuation, no extended latin required initially). Define `@font-face` in `tokens.css` with `font-display: swap`.

**Example:**
```css
/* src/styles/tokens.css — @font-face declarations */
/* Source: websearch findings on font-display swap, WOFF2 subsetting 2025 */

@font-face {
  font-family: 'Fraunces';
  src: url('/fonts/Fraunces-subset.woff2') format('woff2');
  font-weight: 300 900;      /* variable font if using variable axis */
  font-style: normal;
  font-display: swap;
  unicode-range: U+0020-007E, U+00A0-00FF; /* Basic Latin + Latin-1 Supplement */
}

@font-face {
  font-family: 'DM Sans';
  src: url('/fonts/DMSans-subset.woff2') format('woff2');
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0020-007E, U+00A0-00FF;
}

/* When Naste files arrive: add @font-face here and update --font-display.
   Only this one line changes to swap the brand font: */
/* --font-display: 'Naste', Georgia, serif; */
```

### Pattern 7: Placeholder CTA Button (Honest Disabled State)

**What:** A `Button.astro` component that accepts a `disabled` or `placeholder` prop. When disabled, it renders as non-interactive with a visible ARIA label and a `data-placeholder` attribute for documentation purposes.

**Example:**
```astro
---
// src/components/ui/Button.astro
interface Props {
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  placeholderReason?: string; // e.g. "Coaching page not yet built (Phase 2)"
}

const { href, variant = 'primary', disabled = false, placeholderReason } = Astro.props;
---

{disabled ? (
  <span
    class={`btn btn--${variant} btn--disabled`}
    aria-disabled="true"
    data-placeholder={placeholderReason}
    title={placeholderReason}
    role="button"
    tabindex="-1"
  >
    <slot />
  </span>
) : (
  <a href={href} class={`btn btn--${variant}`}>
    <slot />
  </a>
)}
```

### Anti-Patterns to Avoid

- **Importing photos from `public/`:** Photos placed in `public/` are served as-is with no optimization. Always import photos into `src/assets/` so Astro's build pipeline generates AVIF/WebP derivatives.
- **Missing `priority` on the hero:** Without `priority`, the LCP image loads lazily, severely hurting Core Web Vitals. The hero `<Picture>` must have `priority`.
- **Missing `site` in astro.config:** `@astrojs/sitemap` silently generates nothing if `site` is not set. Always set it.
- **Tailwind or utility-class patterns:** Per D-14, generic utility patterns produce a templated look. Use token-based scoped CSS.
- **Injecting year into search queries or hardcoding stale font CDN URLs:** Fonts must be self-hosted; never point to fonts.googleapis.com in production (extra round-trip, CWV penalty).
- **Fabricated statistics or fake links:** Per D-08 and D-12, no invented "trusted by N clients" stats; no functioning CTAs that go nowhere. Use `Button.astro` with `disabled + placeholderReason`.
- **Unclosed HTML tags:** Astro 7's Rust compiler now throws build errors for unclosed non-void elements. All template HTML must be valid.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image resizing/format conversion | Custom build script | `astro:assets` `<Picture>` + sharp | Edge cases: focal-point metadata, EXIF stripping, AVIF encoder quirks — Astro handles all this |
| Sitemap generation | Manual sitemap.xml | `@astrojs/sitemap` | Handles i18n hreflang, dynamic pages, changefreq; error-prone to hand-maintain |
| Font subsetting | Manual pyftsubset run | Google Fonts download page (subset UI) or `glyphhanger` | Character range math is complex; use tooling |
| Open Graph image | Complex image generation | Static 1200×630 jpg in `public/og-image.jpg` | Phase 1 scope; per-page OG is a Phase 5 concern |
| Animation library | Custom scroll tracker | IntersectionObserver island (see Pattern 5) | Browser-native, zero-weight, all browsers |
| CSS reset | Custom reset | Minimal modern reset (3–5 rules) in `reset.css` | `box-sizing: border-box`, `margin: 0`, `img { max-width: 100% }`, `:focus-visible` |

**Key insight:** Astro's built-in tools (image pipeline, sitemap, i18n) cover the full surface area of this phase. The risk is hand-rolling something Astro already does, then discovering Astro's version has the edge cases handled and the custom version doesn't.

---

## Common Pitfalls

### Pitfall 1: Originals in `public/` or Git

**What goes wrong:** Developer places the 86 MB originals in `public/photos/` — they are committed to git and served directly (no AVIF/WebP optimization).
**Why it happens:** `public/` is the "just works" path; Astro processes `src/assets/` but not `public/`.
**How to avoid:** All production photos live in `src/assets/photos/` (imported in components). The `fotos/` zip and `assets/originals/` are added to `.gitignore` on day one.
**Warning signs:** `dist/` contains `.jpg` files larger than ~300 KB; `git status` shows the originals zip.

### Pitfall 2: Hero Loads Lazily (LCP Regression)

**What goes wrong:** Hero `<Picture>` has no `priority` prop; browser lazy-loads it; LCP score tanks.
**Why it happens:** Default loading is lazy; the prop is easy to miss.
**How to avoid:** Always add `priority` to the first above-the-fold image. Only one or two images per page should have `priority`.
**Warning signs:** Lighthouse "Largest Contentful Paint element" shows hero image with loading=lazy in the generated HTML.

### Pitfall 3: Sitemap Generates Nothing

**What goes wrong:** `@astrojs/sitemap` is installed and added to integrations, but `sitemap-index.xml` is empty or absent.
**Why it happens:** The `site` property in `astro.config.mjs` is not set; the integration silently skips generation without it.
**How to avoid:** Set `site: 'https://milanvandermeulen.nl'` in config before adding the integration.
**Warning signs:** `dist/sitemap-index.xml` is empty or missing after `astro build`.

### Pitfall 4: i18n Refactor Required When EN Lands

**What goes wrong:** NL content is placed in `src/pages/nl/index.astro` with a `/nl/` prefix, meaning all NL URLs need to change when EN is added (or NL moves).
**Why it happens:** Developer assumes "I'll handle i18n properly later" and picks a structure that conflicts with Phase 4.
**How to avoid:** Place NL content at `src/pages/index.astro` (root). Set `defaultLocale: 'nl'`, `prefixDefaultLocale: false`. When EN is added in Phase 4, switch to `prefixDefaultLocale: true` and add `/nl/` prefix then — this is a known one-time refactor, not a surprise.
**Warning signs:** URLs contain `/nl/` in Phase 1.

### Pitfall 5: Placeholder CTAs That "Look" Functional

**What goes wrong:** A `<a href="#">` or empty-href button is used for unknown destinations; it appears clickable and does nothing (or jumps to page top).
**Why it happens:** HTML default; developer defers the `href` to "fill in later".
**How to avoid:** Use `Button.astro` with `disabled={true}` and `placeholderReason` prop. Render as a `<span role="button" aria-disabled="true">`. Document in `TODO` comments.
**Warning signs:** Any `href="#"` or `href=""` in the codebase for nav links or CTA buttons.

### Pitfall 6: Astro 7 Rust Compiler Strictness

**What goes wrong:** A component has an unclosed non-void element (e.g. `<div class="foo">` without `</div>`); build fails with a compiler error.
**Why it happens:** Astro 7 replaced the JS compiler with a Rust compiler that is strict about HTML validity. Previously these errors were silently ignored.
**How to avoid:** All `.astro` template HTML must be valid. Use `@astrojs/check` during development.
**Warning signs:** Build error messages referencing "unclosed element" or "invalid HTML".

### Pitfall 7: Font Flicker (FOUT) on Dark Feature Bands

**What goes wrong:** With `font-display: swap`, the fallback font loads first at a different metric, causing layout shift specifically visible on the dark story band (where the type is large and prominent).
**Why it happens:** `swap` shows fallback immediately; the brand font swaps in after load.
**How to avoid:** Use `size-adjust` in the fallback `@font-face` declaration to metric-match the fallback to Fraunces. Preload the WOFF2 with `<link rel="preload">` in BaseHead.
**Warning signs:** CLS score above 0.1 in Lighthouse.

### Pitfall 8: Yellow Everywhere (D-02 Violation)

**What goes wrong:** Developer uses `--color-accent` (#FFDD11) for buttons, hover states, backgrounds, borders, highlights all at once — the page reads as garish and template-like.
**Why it happens:** Yellow is the accent token; it's easy to over-apply when building components in isolation.
**How to avoid:** Yellow is reserved for: (a) the hero photo's backdrop (not under our control), (b) one or two deliberate signature moments (e.g. a large heading underline or a single section rule). Default button uses near-black fill; yellow reserved for the CTA hover or one primary CTA at most.
**Warning signs:** More than 2–3 yellow elements visible simultaneously in any viewport.

---

## Fonts

### Recommended Interim Pairing

**Display (headings, hero, section titles):** Fraunces [ASSUMED — SIL Open Font License, available via Google Fonts; confirms to editorial high-contrast serif character]
- Optical size axis allows large-display settings that enhance contrast and character
- High contrast, ink-trap details at display sizes — closer to editorial serif character than Playfair Display
- Variable font available; subset Latin for Dutch (Basic Latin + Latin Extended supplement: accented e, ij, oe)
- License: SIL Open Font License 1.1 — free commercial use confirmed [ASSUMED — from Google Fonts page]

**Body (navigation, cards, body copy, captions):** DM Sans [ASSUMED — SIL Open Font License, available via Google Fonts]
- Clean geometric grotesque; pairs with display serifs without competing
- Designed by Colophon Foundry; 2022 variable font update
- License: SIL Open Font License 1.1 — free commercial use confirmed [ASSUMED]

### Self-Hosting Strategy

1. Download WOFF2 variable font files from Google Fonts (use the "Download family" button; the zip includes `.woff2` files) [ASSUMED — Google Fonts download process]
2. Optionally subset to Latin + Latin-1 Supplement using `glyphhanger` or pyftsubset
3. Place in `public/fonts/` (served statically; no build-time processing)
4. Declare `@font-face` in `tokens.css` with `font-display: swap`
5. Preload the 2 critical WOFF2 files in `BaseHead.astro` with `<link rel="preload" as="font">`

### Swappable Variable Pattern

```css
:root {
  --font-display: 'Fraunces', Georgia, 'Times New Roman', serif;
  --font-body:    'DM Sans', system-ui, -apple-system, sans-serif;
}
/* When Naste is supplied: replace the value of --font-display here only */
```

All heading elements and display-size type use `font-family: var(--font-display)`. When the Naste WOFF2 files arrive, the `@font-face` declaration is added and `--font-display` is updated — one change, zero component edits.

---

## i18n-Ready Structure

**Phase 1 (NL only):**
- `defaultLocale: 'nl'`, `locales: ['nl']`, `prefixDefaultLocale: false` (default)
- All pages at root: `src/pages/index.astro`, `src/pages/over.astro`, etc.
- NL URLs: `/`, `/over/`, etc. (no `/nl/` prefix)

**Phase 4 (NL + EN):**
- Add `'en'` to `locales`; set `prefixDefaultLocale: true`
- Move NL pages: `src/pages/index.astro` → `src/pages/nl/index.astro`
- Add EN pages: `src/pages/en/index.astro`
- URLs become: `/nl/`, `/en/`
- This is a known one-time structural change; no component changes needed

**Content strings:**
- For Phase 1, hard-code Dutch copy directly in component files (no i18n library)
- Define a `src/i18n/nl.ts` translation object now so Phase 4 only adds `src/i18n/en.ts`

```typescript
// src/i18n/nl.ts
// Create now; Phase 4 adds en.ts alongside it
export const nl = {
  nav: {
    coaching: 'Coaching',
    spreker: 'Spreker',
    nieuwsbrief: 'Nieuwsbrief',
    mijnVerhaal: 'Mijn verhaal',
    boek: 'Boek',
    contact: 'Contact',
  },
  hero: {
    title: 'Je bedrijf schalen, zonder jezelf te verliezen',
    // ...
  },
  // ...
} as const;
```

[ASSUMED — this is the standard minimal i18n pattern; no specific Astro doc cited]

---

## SEO / Metadata Checklist

| Item | Implementation | Notes |
|------|---------------|-------|
| `<title>` | Per-page prop → BaseHead | "Milan van der Meulen — [Page]" |
| `<meta description>` | Per-page prop → BaseHead | 150–160 chars |
| Canonical URL | `new URL(Astro.url.pathname, Astro.site)` | Requires `site` in config |
| Open Graph | og:type, og:url, og:title, og:description, og:image, og:locale | `nl_NL` locale |
| Twitter Card | summary_large_image | 1200×630 OG image |
| JSON-LD | Person schema in BaseHead | Establish authorship |
| Sitemap | `@astrojs/sitemap` integration | Requires `site` in config |
| robots.txt | Static file in `public/robots.txt` | Allow all + sitemap URL |
| Favicon | `public/favicon.svg` + `<link rel="icon">` | SVG preferred |
| hreflang | Added in Phase 4 when EN exists | Not needed in Phase 1 |
| Semantic HTML | `<header>`, `<main>`, `<nav>`, `<article>`, `<footer>`, `<section>` with headings | WCAG + crawler |
| Lang attribute | `<html lang="nl">` | Dutch content |

[CITED: docs.astro.build/en/guides/images/, docs.astro.build/en/guides/configuring-astro/, eastondev.com/blog/en/posts/dev/20251202-astro-seo-complete-guide/]

---

## Image Pipeline Details

### Source → Output Workflow

```
fotos/*.zip (86 MB, .gitignore'd)
      |
      | (manual step: extract + copy selected photos)
      v
assets/originals/*.jpg  (.gitignore'd — never committed)
      |
      | (manual step: copy/rename optimized source to src/assets/photos/)
      v
src/assets/photos/milan-hero-stage.jpg  (still full-res, but in src/)
      |
      | astro build (sharp)
      v
dist/_astro/milan-hero-stage.[hash].[avif|webp]  (at multiple widths)
```

### Responsive Widths per Section

| Section | Source Dims | Recommended `widths` | `sizes` |
|---------|-------------|---------------------|---------|
| Hero | 6588×4392 landscape | `[400, 800, 1200, 1600]` | `(max-width: 768px) 100vw, 50vw` |
| Personal story (portrait) | 4311×6467 portrait | `[400, 600, 800]` | `(max-width: 768px) 90vw, 400px` |
| Story — mission | 1440×960 (lower res) | `[400, 800, 1200]` | `(max-width: 768px) 90vw, 45vw` |
| Samenwerken — speaking | 6720×4480 landscape | `[400, 600, 800]` | `(max-width: 768px) 90vw, 30vw` |
| Samenwerken — networking | 1920×1282 (lower res) | `[400, 600, 800]` | `(max-width: 768px) 90vw, 30vw` |

### Focal-Point Crops

Astro's `<Picture>` does not support in-component art-direction crops natively. Two approaches for the hero (which needs a tighter crop on mobile):

**Option A (CSS art direction):** Use `object-fit: cover` + `object-position: center top` on the `<img>` inside the Picture; the CSS changes the display crop without generating new image files. Simpler; works when the focal point is centered.

**Option B (HTML art direction):** Pre-generate two crops manually (desktop-wide crop, mobile-portrait crop), use standard `<picture>` HTML with `<source media="(max-width: 768px)" ...>`. More precise but requires manual crops outside Astro's pipeline.

**Recommendation:** Start with Option A (object-position on the generated img). If the hero crop looks wrong on mobile after review, generate a manual portrait crop and use Option B for the hero only.

---

## Accessibility Baseline

| Requirement | Implementation |
|-------------|---------------|
| Landmark regions | `<header>`, `<main>`, `<nav aria-label="Hoofdnavigatie">`, `<footer>` |
| Alt text | Descriptive, Dutch, on all images. Hero: describes Milan, the setting, the mood. Decorative: `alt=""`. |
| Heading hierarchy | One `<h1>` per page (hero title). Sections use `<h2>`. No skipped levels. |
| Visible focus states | CSS `:focus-visible` with 2px outline using `--color-accent` or high-contrast fallback |
| Color contrast | Body text (#1A1917 on #F8F6F1): ~17:1. Yellow (#FFDD11) on dark (#111110): ~12:1. Never use yellow as text on cream (fails 4.5:1 for body text). |
| Keyboard navigation | Tab through nav links; mobile menu toggle operable via keyboard; disabled buttons use `aria-disabled` |
| Form labels | Newsletter form: `<label for="naam">` and `<label for="mailadres">` explicit labels |
| Dutch `lang` attribute | `<html lang="nl">` on BaseLayout |

[ASSUMED — WCAG 2.1 AA baseline; contrast ratios approximate until exact palette is confirmed in tokens]

---

## Performance Baseline

| Metric | Target | Strategy |
|--------|--------|----------|
| LCP | < 2.5s | Hero image: priority prop + AVIF + preload WOFF2 |
| CLS | < 0.1 | Image width/height on all `<Image>`/`<Picture>`; font size-adjust on fallback |
| INP | < 200ms | Zero framework JS on static sections; minimal island JS |
| FCP | < 1.8s | Self-hosted fonts (no Google Fonts round-trip); minimal above-fold CSS |
| Total JS | < 20 KB gzipped | Only IntersectionObserver island + mobile nav toggle; no framework runtime |
| Font payload | < 80 KB | 2 subsetted WOFF2 files, preloaded |

---

## Animations

**Architecture:** CSS-only transitions for hover micro-interactions (buttons, card lift); vanilla JS IntersectionObserver island for scroll-reveal (Pattern 5 above).

**Scope of animations in Phase 1:**
- Hero: no entrance animation (LCP content should not be animated in; just render)
- Sections below the fold: fade-in + slight translateY (24px → 0) on scroll into view
- Buttons: hover scale(1.02) + background-color transition (150ms)
- Press logo strip: CSS `overflow-x: auto; scroll-snap-type: x mandatory` for carousel — no JS needed
- Navigation: mobile menu slide-down (CSS max-height transition on toggle class added by tiny `<script>` island)

**prefers-reduced-motion:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
This global rule in `reset.css` suppresses all transitions/animations for users who opt out. The IntersectionObserver island also checks `matchMedia('(prefers-reduced-motion: reduce)')` and skips observation entirely (Pattern 5).

[CITED: webSearch findings on IntersectionObserver + prefers-reduced-motion 2025]

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `<img srcset>` hand-written | `<Picture formats={['avif','webp']}>` with `layout` prop | Astro 5.10 (layout prop), Astro 7 (stable) | Auto-generates srcset+sizes; zero boilerplate |
| remark/rehype Markdown pipeline | Sätteri (Rust, built-in Astro 7) | Astro 7 (Jun 2026) | Only relevant if using `.md` files — not directly impactful for Phase 1's `.astro` components |
| JS scroll listeners | IntersectionObserver API | Widely supported since 2019; now the standard | Lower CPU overhead; unobserve pattern prevents wasted work |
| Google Fonts `<link>` in `<head>` | Self-hosted WOFF2 with `font-display: swap` | Best practice since ~2021; critical for CWV since 2022 | Eliminates cross-origin DNS lookup; faster FCP |
| `<html lang="en">` default | `<html lang="nl">` explicitly | N/A | Required for correct screen reader pronunciation and NL SEO |
| Hardcoded px values | `clamp()` fluid type scale | ~2022; mainstream 2024–2025 | Eliminates breakpoint typography juggling |
| `display: flex` carousel with JS | `overflow-x: auto; scroll-snap-type: x mandatory` | CSS Scroll Snap (broadly supported since 2020) | Native scrollable strip with no JS |

**Deprecated/outdated:**
- `@astrojs/image` (legacy integration): Replaced by `astro:assets` (built into Astro 3+). Do not use.
- `Astro.glob()`: Partially superseded by Content Collections for structured content. Use Content Collections for articles in Phase 3.
- `font-display: block` for brand fonts: Causes invisible text (FOIT); use `swap` with metric-matched fallback.

---

## Validation Architecture

> `workflow.nyquist_validation` is not explicitly set to false in `.planning/config.json` (no config.json found); treat as enabled.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Manual browser inspection + Lighthouse CLI / PageSpeed Insights (no unit test framework needed for a static HTML/CSS site in Phase 1) |
| Config file | none — see Wave 0 |
| Quick run command | `astro build && astro preview` |
| Full suite command | `astro build && npx lighthouse http://localhost:4321 --output=json` |

> Note: A static Astro site with no dynamic logic is not a good candidate for unit/integration tests in Phase 1. Validation is visual + Lighthouse audit + manual a11y checklist. If a test framework is desired, Playwright e2e smoke tests cover the meaningful surface area (critical links work, disabled buttons have aria-disabled, images load, no console errors).

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FND-01 | Astro dev server starts; pages compile | smoke | `astro build` (exit code 0) | ❌ Wave 0 (must scaffold first) |
| FND-02 | CSS tokens defined at :root; font variables present | visual + source | `grep -r "\-\-font-display" src/styles/` | ❌ Wave 0 |
| FND-05 | Canonical, OG, JSON-LD, sitemap present in built HTML | DOM inspection | `astro build && grep "og:title" dist/index.html` | ❌ Wave 0 |
| FND-07 | LCP < 2.5s; no render-blocking resources | Lighthouse | `npx lighthouse http://localhost:4321 --only-categories=performance` | ❌ Wave 0 |
| FND-08 | Animations do not fire with prefers-reduced-motion: reduce | browser DevTools | Emulate `prefers-reduced-motion: reduce` in DevTools | manual |
| FND-09 | defaultLocale='nl' in astro.config; no /nl/ prefix on routes | source inspection | `grep "defaultLocale" astro.config.mjs` | ❌ Wave 0 |
| FND-10 | Hero image serves AVIF; no original jpg in dist/ | build output | `ls dist/_astro/ | grep ".avif"` | ❌ Wave 0 |
| HOME-02 | Hero `<picture>` has `loading="eager"` + `fetchpriority="high"` | DOM inspection | `grep "loading=\"eager\"" dist/index.html` | ❌ Wave 0 |
| HOME-10 | No `href="#"` or `href=""` on nav/CTA links | source audit | `grep -r 'href=""' src/` | ❌ Wave 0 |

### Wave 0 Gaps

- [ ] `astro.config.mjs` — must set `site`, `i18n`, `integrations: [sitemap()]`
- [ ] `src/styles/tokens.css` — base token file must exist before any components
- [ ] `src/layouts/BaseLayout.astro` — imports tokens.css globally
- [ ] `.gitignore` — must exclude `fotos/`, `assets/originals/`, `dist/` on day one

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js 22.12+ | Astro 7 | UNKNOWN — must verify | — | Upgrade Node if older |
| npm | Package management | UNKNOWN | — | Use pnpm/yarn (minor change) |
| sharp (npm) | astro:assets image processing | Will install automatically | 0.35.3 | No fallback — required for AVIF/WebP |
| A browser with DevTools | Manual a11y validation | ✓ (assumed) | — | — |

**Missing dependencies with no fallback:**
- Node.js 22.12+ is required for Astro 7. If the developer's machine runs Node 18 or 20, Astro 7 will not install. The plan should include a Node version check in Wave 0.

**Missing dependencies with fallback:**
- None beyond Node version.

> Environment check for Wave 0: `node --version` (must be ≥ 22.12.0)

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Fraunces is licensed SIL OFL and free for commercial use | Fonts | Legal exposure if font license restricts commercial use; low risk (OFL is well-established) |
| A2 | DM Sans is licensed SIL OFL and free for commercial use | Fonts | Same as A1; low risk |
| A3 | `src/i18n/nl.ts` translation object approach is sufficient for Phase 4 EN addition without refactor | i18n-Ready Structure | Phase 4 may prefer a dedicated i18n library (astro-i18next, inlang, etc.); the object approach is the simplest path |
| A4 | `object-position: center top` CSS is sufficient for hero crop on mobile | Image Pipeline | If the hero's focal point (Milan's face/expression) is cropped out on mobile, Option B (manual art-direction crop) is required |
| A5 | Node 22.12+ is available on the developer's machine | Environment | If not, Wave 0 must add a Node upgrade step before any Astro commands |
| A6 | milanvandermeulen.nl is the production domain | SEO/Config | Wrong domain in `site` config means canonical URLs and sitemap are incorrect; must be confirmed before first deploy |
| A7 | Astro 7's `priority` prop on `<Picture>` sets both `loading="eager"` and `fetchpriority="high"` | Image Pipeline | Docs confirm for `<Image>`; behavior should be identical on `<Picture>` but not explicitly stated in fetched doc |
| A8 | The press logo carousel can be implemented as a horizontal scroll-snap strip with no JS | Architecture | If client requires an auto-advancing carousel with timing, JS is needed |

**If this table is empty:** All claims were verified or cited — no user confirmation needed. (It is not empty — A1–A8 require confirmation or are low-risk accepted assumptions.)

---

## Open Questions

1. **Production domain name**
   - What we know: `milanvandermeulen.nl` is mentioned nowhere in the project docs; no domain is specified.
   - What's unclear: The exact domain for the `site` config option (affects canonical URLs, sitemap, OG image paths).
   - Recommendation: Use a placeholder like `https://milanvandermeulen.nl` and update at deployment time. Flag as a TODO in `astro.config.mjs`.

2. **Naste font files timeline**
   - What we know: Naste is preferred; files not yet supplied.
   - What's unclear: When Naste will be provided, and whether it is a variable font or a static file family.
   - Recommendation: Proceed with Fraunces now; the token swap is trivially mechanical.

3. **Mobile hero layout: image above or below text?**
   - What we know: D-04 says "stacks vertically on mobile (text then image)".
   - What's unclear: Whether the image appears above the text on mobile (visually dominant, typical for portrait-style founders) or below (text-first, safe choice for LCP).
   - Recommendation: Text first (copy then image) on mobile — keeps the heading as the first visible content, avoids LCP penalty from image-first layout on slow connections.

4. **Substack URL and LinkedIn URL**
   - What we know: Both are documented as placeholders. Newsletter CTAs disabled.
   - What's unclear: When these will be supplied.
   - Recommendation: Use `TODO_SUBSTACK_URL` and `TODO_LINKEDIN_URL` string constants defined in one place (`src/i18n/nl.ts` or a `src/config.ts`) so they are easy to grep and replace.

---

## Project Constraints (from CLAUDE.md)

CLAUDE.md contains no explicit actionable directives beyond the project constraints already captured in CONTEXT.md. The GSD workflow enforcement note applies: use `/gsd-execute-phase` for phase work; no direct repo edits outside a GSD workflow. Technology stack, color, typography, and infra constraints are all captured in the Locked Decisions above.

---

## Sources

### Primary (MEDIUM confidence — official docs fetched via WebFetch)
- [docs.astro.build/en/guides/images/](https://docs.astro.build/en/guides/images/) — Image and Picture components, lazy/eager loading, src/ vs public/
- [docs.astro.build/en/reference/modules/astro-assets/](https://docs.astro.build/en/reference/modules/astro-assets/) — Image API props including `priority`, `formats`, `widths`, `sizes`
- [docs.astro.build/en/guides/internationalization/](https://docs.astro.build/en/guides/internationalization/) — i18n config, prefixDefaultLocale, getRelativeLocaleUrl
- [docs.astro.build/en/guides/styling/](https://docs.astro.build/en/guides/styling/) — Scoped CSS, global styles, :root tokens, define:vars
- [docs.astro.build/en/basics/project-structure/](https://docs.astro.build/en/basics/project-structure/) — Required vs conventional directories
- [docs.astro.build/en/guides/configuring-astro/](https://docs.astro.build/en/guides/configuring-astro/) — Config file options, site, trailingSlash

### Secondary (LOW confidence — web search + curated articles)
- [eastondev.com/blog/en/posts/dev/20251202-astro-seo-complete-guide/](https://eastondev.com/blog/en/posts/dev/20251202-astro-seo-complete-guide/) — BaseHead pattern, JSON-LD, canonical URL, OG/Twitter tags
- [eastondev.com/blog/en/posts/dev/20251203-astro-image-optimization-guide/](https://eastondev.com/blog/en/posts/dev/20251203-astro-image-optimization-guide/) — Picture component code patterns
- [morello.dev/blog/astro-7](https://morello.dev/blog/astro-7) — Astro 7 breaking changes, Sätteri, build speed
- [docs.astro.build/en/guides/upgrade-to/v7/](https://docs.astro.build/en/guides/upgrade-to/v7/) — Rust compiler strictness, whitespace changes, Node 22.12 minimum
- [moderncss.dev/generating-font-size-css-rules-and-creating-a-fluid-type-scale/](https://moderncss.dev/generating-font-size-css-rules-and-creating-a-fluid-type-scale/) — clamp() formula, fluid type scale

### Tertiary (LOW confidence — training knowledge, tagged [ASSUMED])
- Font licensing claims for Fraunces and DM Sans (OFL): corroborated by Google Fonts search results but not directly verified against font license files this session
- i18n translation object pattern (`src/i18n/nl.ts`): standard community approach, not an official Astro recommendation

---

## Metadata

**Confidence breakdown:**
- Standard stack (versions): HIGH — npm registry verified 2026-08-18
- Astro image pipeline: MEDIUM — official Astro docs fetched and read directly
- i18n structure: MEDIUM — official Astro i18n docs fetched and read directly
- CSS design tokens / fluid type: LOW-MEDIUM — established community pattern, confirmed via websearch
- Font licensing: LOW-MEDIUM — asserted via Google Fonts description + websearch, not license file read
- Astro 7 breaking changes: MEDIUM — official migration guide fetched, secondary blog corroborating

**Research date:** 2026-08-18
**Valid until:** 2026-09-18 (Astro moves fast; re-verify versions before executing if > 2 weeks have elapsed)
