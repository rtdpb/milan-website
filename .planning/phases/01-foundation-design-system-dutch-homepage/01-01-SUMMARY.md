---
phase: "01"
plan: "01"
subsystem: foundation
tags: [astro, design-system, image-pipeline, seo, i18n, hero, walking-skeleton]
dependency_graph:
  requires: []
  provides:
    - astro-7-scaffold
    - design-tokens-css
    - self-hosted-fonts
    - basehead-seo
    - baselayout-shell
    - hero-lcp-image
    - nl-homepage-route
  affects:
    - all subsequent plans (consume tokens, layout, image pipeline)
tech_stack:
  added:
    - astro@7.2.3
    - sharp@0.35.3
    - "@astrojs/sitemap@3.7.3"
    - "@astrojs/check@0.9.10"
    - typescript@5.x
    - Fraunces WOFF2 (OFL, self-hosted)
    - DM Sans WOFF2 (OFL, self-hosted)
  patterns:
    - CSS custom properties design tokens at :root
    - Astro <Picture> for AVIF/WebP image pipeline
    - BaseLayout + BaseHead centralised SEO + font preloads
    - Swappable brand font variable (--font-display / --font-body)
    - Honest disabled CTA pattern (span role=button aria-disabled=true)
    - i18n config (nl default, no /nl/ prefix, Phase-4 extension path documented)
key_files:
  created:
    - package.json
    - astro.config.mjs
    - tsconfig.json
    - public/robots.txt
    - public/favicon.svg
    - public/og-image.jpg
    - public/fonts/Fraunces-subset.woff2
    - public/fonts/DMSans-subset.woff2
    - src/styles/reset.css
    - src/styles/tokens.css
    - src/styles/global.css
    - src/components/layout/BaseHead.astro
    - src/layouts/BaseLayout.astro
    - src/assets/photos/milan-hero-stage.jpg
    - src/components/sections/Hero.astro
    - src/pages/index.astro
    - package-lock.json
  modified: []
decisions:
  - "Used fallbackFormat=webp instead of jpeg on <Picture> to avoid emitting >300KB JPEG derivatives at 1600px"
  - "Downscaled hero source master to 2400x1600 (532KB) from 6588x4392 original to avoid git bloat; Astro pipeline generates further-optimized derivatives"
  - "Set is:inline on JSON-LD script tag to silence Astro hint about unprocessed script"
  - "Font downloads via Google Fonts API CSS parsing; latin subset used; OFL licensing assumed per RESEARCH A1/A2"
metrics:
  duration_minutes: 6
  completed_date: "2026-08-18"
  tasks_completed: 4
  tasks_total: 4
  commits: 4
  files_created: 17
status: complete
actuals:
  tokens: 74000
  tasks: 4
  commits: 4
---

# Phase 01 Plan 01: Walking Skeleton — Astro 7 Foundation + Hero Section

## One-Line Summary

Astro 7 static site scaffolded with CSS token design system (Fraunces + DM Sans self-hosted), BaseHead/BaseLayout SEO shell, and the split-card Hero section serving the LCP image as optimized AVIF/WebP via the astro:assets pipeline — `npm run build` exits 0.

## What Was Built

The complete walking skeleton proving the Phase-1 architecture end-to-end:

**config → BaseLayout → tokens → astro:assets image pipeline → route → Hero**

### Task 1: Scaffold Astro 7 + Config + Static Assets
- `package.json`: astro@7.2.3, sharp@0.35.3, @astrojs/sitemap@3.7.3, @astrojs/check@0.9.10, TypeScript strict
- `astro.config.mjs`: site/output static/trailingSlash never/i18n (nl default, no prefix)/sitemap integration/sharp image service. Production domain `https://milanvandermeulen.nl` is an ASSUMPTION (RESEARCH Open Q1, TODO before deploy).
- `tsconfig.json`: Astro strict + path aliases (@components, @layouts, etc.)
- `public/robots.txt`: Allow all + Sitemap URL
- `public/favicon.svg`: Interim MvdM initials SVG mark (#1A1A18 bg, #FFDD11 text)
- `public/og-image.jpg`: Interim 1200×630 branded placeholder (20KB, sharp-generated)
- `public/fonts/Fraunces-subset.woff2` + `DMSans-subset.woff2`: Self-hosted WOFF2, OFL-licensed, downloaded from Google Fonts static CDN

### Task 2: Design Tokens + CSS Reset + Global Styles
- `src/styles/tokens.css`: All 11 color tokens (exact UI-SPEC palette values), `--font-display`/`--font-body` swappable stacks, fluid clamp() type scale (`--text-xs` through `--text-5xl`), spacing scale (`--space-xs` through `--space-5xl` + `--space-press-strip-y` + `--space-usps-gap`), radii, shadow, motion tokens, layout vars. `@font-face` blocks for Fraunces + DM Sans with `font-display: swap`. Naste swap is a single documented one-line change.
- `src/styles/reset.css`: Modern minimal reset — box-sizing, margin, img/picture block, `:focus-visible` with `--color-accent` outline (brand-coloured a11y focus ring), global `@media (prefers-reduced-motion: reduce)` rule (FND-08 baseline site-wide)
- `src/styles/global.css`: Imports reset + tokens, body base (--color-bg, --font-body), heading font (--font-display), `.prose` max-width, `.eyebrow`, responsive `.container`, `.skip-link` a11y, `.sr-only`

### Task 3: BaseHead (SEO) + BaseLayout Page Shell
- `src/components/layout/BaseHead.astro`: charset/viewport, title, description, canonical (`new URL(pathname, site)`), OG (type/url/title/desc/image/locale nl_NL/site_name), Twitter `summary_large_image`, JSON-LD Person schema (name "Milan van der Meulen", jobTitle "Ondernemer, coach en spreker", sameAs TODO LinkedIn), font preloads for both WOFF2, favicon
- `src/layouts/BaseLayout.astro`: `<html lang="nl">`, global.css import, BaseHead via props, `.skip-link` → `#main-content`, `<main id="main-content">`, TODO comments for Plan-02 SiteHeader + SiteFooter
- `src/pages/index.astro`: Minimal stub page (replaced in Task 4) — confirmed build passes

### Task 4: Hero Section + LCP Image Pipeline + Index Route (Tracer Close)
- `src/assets/photos/milan-hero-stage.jpg`: Downscaled source master (2400×1600, 532KB) extracted from `fotos/wetransfer_10-jaar-soly-77-jpg_2026-08-18_1205.zip` (`10 Jaar Soly-77.jpg`, original 6588×4392, 26MB). Astro generates AVIF/WebP derivatives at build — originals stay gitignored.
- `src/components/sections/Hero.astro`: Split-card layout (D-04): eyebrow "Founder · Coach · Spreker", H1 "Je bedrijf schalen, zonder jezelf te verliezen", subtext, CTA row (Contact: `<span role="button" aria-disabled="true">` disabled; Mijn verhaal: `<a href="#verhaal">` in-page anchor per D-12), USP row "12+ jaar · 180 medewerkers · 9 markten". `<Picture>` with `priority` (loading=eager + fetchpriority=high — LCP), `formats=['avif','webp']`, `fallbackFormat="webp"`, `widths=[400,800,1200,1600]`, `sizes="(max-width: 768px) 100vw, 50vw"`, Dutch alt text. Scoped token-based CSS with responsive grid (mobile stacked text-first, tablet 1.1/0.9fr, desktop 1/1fr).
- `src/pages/index.astro`: Full NL homepage route at `/` — BaseLayout + Hero, with TODO comments for Plans 03–06 sections

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed `href="#"` text from HTML comments that appeared in built output**
- **Found during:** Task 4 acceptance criteria verification
- **Issue:** Astro includes HTML comment text verbatim in built output; a comment saying "no `href="#"`" was causing the `grep 'href="#"' dist/index.html` check to match
- **Fix:** Rewrote the comments to avoid literal `href="#"` text
- **Files modified:** `src/components/sections/Hero.astro`
- **Commit:** included in `51b6210`

**2. [Rule 1 - Bug] Changed `fallbackFormat` from `"jpeg"` to `"webp"` to prevent >300KB JPEG derivative**
- **Found during:** Task 4 build verification
- **Issue:** The 1600px JPEG fallback was 337KB — marginally exceeding the ~300KB acceptance threshold in the plan
- **Fix:** Changed `fallbackFormat="jpeg"` to `fallbackFormat="webp"` — WebP is supported in all modern browsers (Chrome 32+, Firefox 65+, Safari 14+); removes the JPEG derivative entirely
- **Files modified:** `src/components/sections/Hero.astro`
- **Impact:** AVIF/WebP-only derivatives in `dist/_astro/`. No functional impact; JPEG fallback is a progressive enhancement that is no longer needed given WebP's universal support.

**3. [Rule 1 - Bug] Added `is:inline` to JSON-LD `<script>` tag**
- **Found during:** Task 3 build (`astro check` hint)
- **Issue:** Astro 7 `astro check` emitted a hint that the `<script type="application/ld+json" set:html={...}>` tag would be treated as `is:inline` because it has attributes
- **Fix:** Added explicit `is:inline` directive to silence the hint and make the intent explicit
- **Files modified:** `src/components/layout/BaseHead.astro`

**4. [Auto-deviation - Font strategy] Hero source master downscaled to 2400px**
- **Found during:** Task 4 setup
- **Issue:** The original 6588×4392 (26MB) JPG cannot be committed to git — both gitignored (in fotos/*.zip) and too large for a git source master
- **Fix per environment_notes:** Extracted from zip, downscaled to 2400×1600 (532KB) using sharp, committed to `src/assets/photos/milan-hero-stage.jpg`. Astro's pipeline then generates further-optimized AVIF/WebP derivatives at build. Originals remain in the gitignored archive.
- **Documented in:** SUMMARY (per environment_notes requirement)

## Verification Results

| Check | Result |
|-------|--------|
| `node --version` >= 22.12.0 | PASS (v24.14.0) |
| `npm run build` exits 0 | PASS |
| `dist/index.html` has `<html lang="nl">` | PASS |
| `dist/index.html` has `og:title` | PASS |
| `dist/index.html` has `rel="canonical"` | PASS |
| `dist/index.html` has `application/ld+json` Person | PASS |
| `dist/index.html` has `rel="preload"` for both WOFF2 | PASS |
| `dist/index.html` has `id="main-content"` | PASS |
| `dist/index.html` has `loading="eager"` | PASS |
| `dist/index.html` has `fetchpriority="high"` | PASS |
| `dist/_astro/` has >= 1 AVIF derivative | PASS (4 AVIF files) |
| No JPEG > 300KB in dist/ | PASS (no JPEG in dist/_astro at all) |
| Exactly 1 `<h1>` in built HTML | PASS |
| H1 copy "Je bedrijf schalen, zonder jezelf te verliezen" | PASS |
| No `href="#"` or `href=""` in built HTML | PASS |
| No `fonts.googleapis.com` in CSS | PASS |
| No `/nl/` prefix on routes | PASS |
| `grep 'defaultLocale' astro.config.mjs` returns `nl` | PASS |
| `.gitignore` contains fotos/, assets/originals/, dist/, *.zip | PASS |
| `public/robots.txt` has Sitemap: line | PASS |
| `ls public/fonts/` lists two .woff2 files | PASS |

## Known Stubs

| Stub | File | Note |
|------|------|-------|
| `sameAs: []` in JSON-LD | `src/components/layout/BaseHead.astro` | LinkedIn URL not yet supplied (D-12 / RESEARCH Open Q4). TODO comment in source. Intentional — wired when URL is supplied. |
| Production domain `milanvandermeulen.nl` | `astro.config.mjs` | ASSUMPTION A6 — must be confirmed before first deploy. TODO comment in source. |
| `public/favicon.svg` | `public/favicon.svg` | Interim MvdM initials mark. Replace with brand favicon when supplied. |
| `public/og-image.jpg` | `public/og-image.jpg` | Interim branded placeholder. Replace with real OG image. |
| Naste font | `src/styles/tokens.css` | Preferred brand font not yet supplied. Swap documented as one-line `--font-display` change. |
| `href="#verhaal"` in Hero secondary CTA | `src/components/sections/Hero.astro` | Story section (#verhaal) arrives in Plan 04. This is a legitimate future in-page anchor (D-12). |
| Contact CTA disabled | `src/components/sections/Hero.astro` | Contact destination arrives in Phase 2. Rendered as `aria-disabled="true"` span. |
| Plan 02 SiteHeader + SiteFooter | `src/layouts/BaseLayout.astro` | TODO comments in layout for Plans 02+. Correct — deferred per plan scope. |

## Self-Check

All files exist: PASSED
All commits exist (710f826, 85671dc, dc17f40, 51b6210): PASSED
`npm run build` exits 0: PASSED
All acceptance criteria verified: PASSED

## Self-Check: PASSED
