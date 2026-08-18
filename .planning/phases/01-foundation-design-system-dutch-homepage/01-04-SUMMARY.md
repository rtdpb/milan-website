---
phase: "01"
plan: "04"
subsystem: testimonials-story-scroll-reveal
tags: [astro, scroll-reveal, intersection-observer, testimonials, dark-band, story, reduced-motion, image-pipeline]
dependency_graph:
  requires:
    - astro-7-scaffold
    - design-tokens-css
    - card-component
    - section-wrapper-component
    - nl-i18n-strings
  provides:
    - reveal-on-scroll-island
    - testimonials-mosaic-section
    - story-dark-band-section
    - verhaal-anchor-target
    - story-portrait-photo
    - story-mission-photo
  affects:
    - plan 01-06 (assembly wires Testimonials + Story into index.astro in document order)
tech_stack:
  added: []
  patterns:
    - IntersectionObserver scroll-reveal island with prefers-reduced-motion JS guard + CSS fallback
    - astro:assets Picture with avif/webp formats, lazy loading, responsive widths
    - Photo source pipeline — sharp downscale from gitignored zip to web-ready src/assets/photos/
    - Fixed-count mixed-size mosaic grid (hard-coded 3 cards for v1)
    - SectionWrapper variant=dark for full-bleed dark band
key_files:
  created:
    - src/components/ui/RevealOnScroll.astro
    - src/components/sections/Testimonials.astro
    - src/components/sections/Story.astro
    - src/assets/photos/milan-story-portrait.jpg
    - src/assets/photos/milan-energy-mission.jpg
  modified: []
decisions:
  - "Portrait source downscaled to 1200px wide (277KB) from 4311x6467 original using sharp — Astro pipeline then generates AVIF/WebP derivatives at build; original stays gitignored"
  - "Mission photo resized to 1000px wide (189KB) from 1440px source — under 300KB threshold"
  - "Yellow accent usage in Story: 4px left-border on eyebrow label (not body text) — only yellow usage in the component, satisfying D-02 single-accent rule"
  - "Yellow quote mark in Testimonials: decorative 80px open-quote on dark card only — D-02 counted signature moment, not body text so no contrast concern"
  - "TypeScript as const literal narrowing worked around via type alias in frontmatter (testimonials array items)"
  - "Body paragraphs in Story pulled from nl.story.body array — rendering each as a separate <p> element preserves verbatim copy from nl.ts"
  - "Story portrait hidden on mobile (display:none) to keep reading column clean; mission photo visible on all sizes at ~50% width"
metrics:
  duration_minutes: 10
  completed_date: "2026-08-18"
  tasks_completed: 3
  tasks_total: 3
  commits: 3
  files_created: 5
  files_modified: 0
status: complete
actuals:
  tokens: 66000
  tasks: 3
  commits: 3
---

# Phase 01 Plan 04: Testimonials Mosaic + Dark Story Band + RevealOnScroll Summary

## One-Line Summary

RevealOnScroll island (IntersectionObserver + full prefers-reduced-motion dual guard), a Sevora-style 3-card testimonials mosaic with one dark accent card and yellow quote mark, and the full-width dark personal story band with verbatim copy, signature, optimized portrait, and id=verhaal anchor — ready for assembly in plan 06.

## What Was Built

### Task 1: RevealOnScroll island (src/components/ui/RevealOnScroll.astro)

A reusable Astro island for subtle scroll-reveal animation:

- **JS side (IntersectionObserver):** threshold 0.15, rootMargin `-40px` bottom — triggers slightly before element fully exits viewport. One-shot (unobserve after reveal). Optional stagger `delay` prop (ms).
- **prefers-reduced-motion JS guard:** `window.matchMedia('(prefers-reduced-motion: reduce)')` — if true, skips IntersectionObserver entirely. No opacity/transform writes race against the CSS fallback.
- **CSS fallback:** `@media (prefers-reduced-motion: reduce)` sets `opacity:1 !important; transform:none !important; transition:none !important` on all `[data-reveal]` elements. Content is NEVER hidden even if JS is blocked.
- **Motion path:** `opacity:0 → 1, translateY(16px) → 0`, duration 400ms, `--ease-out` token. `will-change: opacity, transform` for GPU compositing.
- **No framework (D-14):** vanilla script island, no React/Vue dependencies.

### Task 2: Testimonials.astro (src/components/sections/Testimonials.astro)

Mixed-size testimonial mosaic per UI-SPEC `<TestimonialsSection>` (HOME-05):

**Layout:** 2-column grid on desktop — `3fr 2fr` (large card ~60% | small column ~40%). Single column on mobile.

**Cards (exactly 3 — hard-coded for v1, zero-one-many contract):**
- **Large dark card** (Yang Soo Kloosterhof): `--color-dark-surface` (#222220) background, `--color-dark-text` text. Single yellow decorative open-quote `&ldquo;` at 80px in `--color-accent` (#FFDD11) — one counted signature moment (D-02). Quotes from nl.ts verbatim.
- **Small card 1** (Ruud Koornstra): `--color-surface`, `--color-text`, border + shadow.
- **Small card 2** (Oranjewoud Export Academy): same light surface treatment.

**Compliance:**
- No "trusted by N clients" stat (D-08)
- No star ratings
- All 3 attributions preserved verbatim: Yang Soo Kloosterhof, Ruud Koornstra, Oranjewoud Export Academy (HOME-11)
- Each card wrapped in RevealOnScroll with 80ms stagger

### Task 3: Story.astro + photo assets

**Photos extracted from gitignored fotos zip:**
- `milan-story-portrait.jpg` — from `10 Jaar Soly-76 kopie.jpg` (4311x6467), sharp-resized to 1200px wide = 277KB
- `milan-energy-mission.jpg` — from `Foto.jpeg` (1440x960), sharp-resized to 1000px = 189KB
- Both well under 300KB threshold (FND-10). Originals stay in gitignored zip.

**Story.astro** implements UI-SPEC `<StorySection>` (HOME-06, D-01):
- `SectionWrapper id="verhaal" variant="dark"` — full-bleed dark band + anchor target for hero CTA
- Heading "Waarom ik nu mijn lessen deel" (from nl.story.heading) — `var(--font-display)` fluid type
- Reading column: `max-width: 640px` (long-text backstop, mobile safe), 3 body paragraphs from nl.story.body verbatim
- **ONE yellow accent (D-02):** 4px left-border on `story__eyebrow` in `var(--color-accent)` — only yellow usage in the component
- Signature block: "Milan van der Meulen" in `var(--font-display)` 20px/600, with subtitle
- Mission photo: inline at 50% column width on desktop (floated right), full-width on mobile
- Portrait: `astro:assets Picture`, formats avif/webp, widths [400,600,900], lazy, hidden on mobile (portrait-column display:none < 1024px)
- Desktop: 2-column sticky portrait layout

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] TypeScript `as const` literal type narrowing in testimonials map**
- **Found during:** Task 2 build (astro check)
- **Issue:** nl.ts exports `as const`, creating narrow literal string types per array element. Destructuring with `[largeCard, ...smallCards]` made `smallCards` a union of two distinct literal object types, incompatible with `typeof items[0]` annotation.
- **Fix:** Added `type TestimonialItem` alias and cast `items as unknown as TestimonialItem[]` in frontmatter. The JSX template uses the widened type cleanly.
- **Files modified:** `src/components/sections/Testimonials.astro`

**2. [Rule 1 - Bug] Wrong import path (`@/i18n/nl` → relative path)**
- **Found during:** Task 2 first build
- **Issue:** Used `@/i18n/nl` alias — not in tsconfig.json (only `@i18n/*` is). Other section components use relative imports (`../../i18n/nl`).
- **Fix:** Changed to relative import `../../i18n/nl` (consistent with Samenwerken.astro pattern).
- **Files modified:** `src/components/sections/Testimonials.astro`

**3. [Rule 3 - Blocking] Mission photo over 300KB — resized**
- **Found during:** Task 3 photo extraction
- **Issue:** Initial sharp conversion of Foto.jpeg at quality 82 produced 376KB — over the 300KB threshold (FND-10).
- **Fix:** Resized to 1000px wide (source was 1440px) at quality 80 → 189KB.
- **Files modified:** `src/assets/photos/milan-energy-mission.jpg`

## Verification Results

| Check | Result |
|-------|--------|
| `npm run build` exits 0 | PASS |
| `grep 'prefers-reduced-motion' RevealOnScroll.astro` count >= 1 | PASS (4 matches) |
| `grep 'IntersectionObserver' RevealOnScroll.astro` matches | PASS (3 matches) |
| `grep 'data-reveal' RevealOnScroll.astro` matches | PASS (8 matches) |
| All 3 testimonial attributions in nl.ts (Kloosterhof/Koornstra/Oranjewoud) | PASS |
| One dark accent card (--color-dark-surface) in Testimonials | PASS |
| Single yellow quote mark on dark card (--color-accent) | PASS (1 usage) |
| No fabricated stats in Testimonials source | PASS |
| `id="verhaal"` on Story SectionWrapper | PASS |
| Story `variant="dark"` (--color-dark-band) | PASS |
| Story "Waarom ik nu mijn lessen deel" heading via nl.story.heading | PASS |
| Story "Milan van der Meulen" signature via nl.story.signature | PASS |
| ONE yellow accent in Story (eyebrow left-border only) | PASS (1 CSS rule) |
| Portrait: astro:assets Picture, lazy, avif/webp, widths [400,600,900] | PASS |
| milan-story-portrait.jpg <= 300KB | PASS (277KB) |
| milan-energy-mission.jpg <= 300KB | PASS (189KB) |
| src/pages/index.astro NOT modified | PASS |

## Known Stubs

| Stub | File | Note |
|------|------|-------|
| Testimonials not rendered in index.astro | Assembly deferred | Plan 01-06 (wave 4) wires all sections into document order |
| Story not rendered in index.astro | Assembly deferred | Plan 01-06 wires Story after Samenwerken, with id=verhaal anchor |
| Portrait AVIF/WebP derivatives not in dist/ yet | Not yet rendered | Derivatives generate at build when Story is imported in index.astro (plan 06) |

## Threat Flags

No new security-relevant surface introduced beyond what the plan's threat model covers:
- T-01-08 (Repudiation/fabricated testimonials): Only the 3 supplied quotes with verbatim attributions. No invented numbers. Attributions pulled from nl.ts which preserves exact names.
- T-01-09 (scroll-reveal hidden content): Dual-guard — JS skips observer, CSS forces visible. Content is never trapped hidden under reduced-motion or JS failure.
- T-01-02 (story-photo originals): Portrait/mission imported from src/assets/ at web-optimized sizes (277KB/189KB). Originals in gitignored zip. Astro pipeline generates AVIF/WebP at build — no original JPEG served at runtime.

## Self-Check

Files created/modified:
- `src/components/ui/RevealOnScroll.astro` — FOUND
- `src/components/sections/Testimonials.astro` — FOUND
- `src/components/sections/Story.astro` — FOUND
- `src/assets/photos/milan-story-portrait.jpg` — FOUND
- `src/assets/photos/milan-energy-mission.jpg` — FOUND

Commits:
- `7c89a73` feat(01-04): RevealOnScroll island — FOUND
- `d235271` feat(01-04): Testimonials mixed-size mosaic — FOUND
- `b0dbcb5` feat(01-04): Story dark band + portrait/mission photos — FOUND

`npm run build` exits 0: PASS
src/pages/index.astro not modified: PASS

## Self-Check: PASSED
