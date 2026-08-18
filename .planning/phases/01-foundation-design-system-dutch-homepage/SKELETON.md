# Walking Skeleton — Milan van der Meulen Personal Brand Website

**Phase:** 1
**Generated:** 2026-08-18

## Capability Proven End-to-End

> The smallest user-visible capability that exercises the full stack.

A visitor loading `/` sees a fully-rendered, responsive Dutch homepage skeleton: the split-card **Hero** with the H1 "Je bedrijf schalen, zonder jezelf te verliezen" and the real `10 Jaar Soly-77` photo served as an **optimized AVIF/WebP** derivative (eager, `fetchpriority="high"`) from Astro's build image pipeline — wrapped in `BaseLayout` whose `BaseHead` emits real SEO metadata (title, canonical, OG, JSON-LD), with the design-token CSS (`tokens.css`) and self-hosted display+body fonts applied. `astro build` exits 0, `dist/index.html` is generated, and no full-res original jpg is present in `dist/`.

This slice touches every layer Phase 1 will modify: **config (astro.config.mjs + i18n) → layout (BaseLayout/BaseHead) → design system (tokens.css + @font-face) → image pipeline (astro:assets `<Picture>`) → a real route (index.astro) → a real section component (Hero.astro)**. Every later section (PressStrip, Samenwerken, Testimonials, Story, Newsletter, Articles, Footer) is a horizontal expansion slotted into this proven skeleton without an architectural change.

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Astro 7.2.3 (static output, `output: 'static'`) | Static-first, best-in-class SEO/perf, built-in image pipeline + i18n, zero JS by default (PROJECT.md constraint; RESEARCH §Standard Stack) |
| Language / typing | TypeScript strict + `@astrojs/check` | Astro-native type-checking; catches `.astro` type errors (FND-01) |
| Design system | CSS custom properties in `src/styles/tokens.css` (no utility framework) | D-13/D-14: token-driven, must NOT look like a generic Tailwind/SaaS template |
| Brand font | Self-hosted WOFF2 behind `--font-display` / `--font-body` variables (interim Fraunces + DM Sans) | D-13: single-variable swap for Naste later; no Google Fonts round-trip (FND-07) |
| Image pipeline | `astro:assets` `<Picture>` + sharp → AVIF/WebP derivatives; originals in `.gitignore`d `assets/originals/` | FND-10, D-05: only optimized derivatives in `dist/`; ~86 MB originals never committed/served |
| i18n | Astro built-in i18n, `defaultLocale: 'nl'`, `prefixDefaultLocale: false`, NL at root routes; strings in `src/i18n/nl.ts` | FND-09, D-16: EN adds in Phase 4 without a route refactor |
| SEO | Centralised `BaseHead.astro` (title/description/canonical/OG/Twitter/JSON-LD Person) + `@astrojs/sitemap` + `public/robots.txt` | FND-05; `site` set in config or sitemap generates nothing |
| Honest CTA system | `Button.astro` with `disabled` + `placeholderReason` → `<span role="button" aria-disabled="true">`; no `href="#"`/`href=""` | D-09/D-10/D-12, HOME-10: never a fake working button |
| Directory layout | `src/components/{layout,sections,ui}/`, `src/layouts/`, `src/pages/`, `src/styles/`, `src/assets/{photos,fonts}/`, `src/i18n/` | RESEARCH §Recommended Project Structure |
| Deployment target | Local full-stack run: `npm run build && npm run preview` (production domain `https://milanvandermeulen.nl` is an ASSUMPTION, TODO before deploy) | No host chosen in v1; RESEARCH Open Q1 |

## Stack Touched in Phase 1

- [x] Project scaffold — Astro 7 + TypeScript strict + `@astrojs/check` + `@astrojs/sitemap`, `npm run dev/build/preview`
- [x] Routing — one real route: `src/pages/index.astro` (NL homepage at `/`)
- [x] "Data" read — real read of local content module `src/i18n/nl.ts` (Dutch strings) + real optimized image import from `src/assets/photos/` (the Phase-1 analogue of a DB read; there is no DB in scope)
- [x] UI interaction — the working **mobile-nav toggle** in `Nav.astro` (vanilla-JS island) + rendered honest CTAs (`Button.astro`)
- [x] Deployment — documented local full-stack run: `npm run build` (exit 0) + `npm run preview` serves `dist/` end-to-end

## Out of Scope (Deferred to Later Slices)

> Explicit so future phases do not re-litigate Phase 1's minimalism.

- Coaching / Spreker / Mijn verhaal / Contact **pages** and working forms → Phase 2
- Working contact / lead flow ("Boek lezing", "Plan kennismaking") → Phase 2 (Phase 1 renders these CTAs **disabled**)
- Real Substack newsletter signup + live recent-articles feed → Phase 3 (Phase 1 uses a disabled form + 3 placeholder cards)
- Functional NL/EN switch + English content → Phase 4 (Phase 1 renders a **disabled** "NL | EN" affordance only)
- Book / pre-order page, analytics, CMS → Phase 5
- Real "bekend van" logos, Substack URL, contact destination, LinkedIn URL, Naste font, production domain → wired when supplied (placeholders/TODO now)
- Any backend, auth, database, payments → out of scope for the whole milestone

## Subsequent Slice Plan (this phase's expansion)

Each later plan adds one horizontal slice on top of this skeleton without altering its architectural decisions:

- Plan 02: Global chrome + reusable UI kit + honest-CTA system (Nav, Footer, Button, Card, SectionWrapper, PlaceholderBadge, i18n strings, site config module)
- Plan 03: Credibility band (PressStrip) + Services ladder (Samenwerken 3 cards)
- Plan 04: Testimonials mosaic + dark-band personal Story (+ supporting images + scroll-reveal island)
- Plan 05: Newsletter signup section + Recente artikelen placeholder cards
- Plan 06: Animation/a11y/SEO/perf polish + content-integrity pass + human-verify checkpoint

Later project phases (2–5) add their vertical slices on top of the same architectural backbone recorded above.
