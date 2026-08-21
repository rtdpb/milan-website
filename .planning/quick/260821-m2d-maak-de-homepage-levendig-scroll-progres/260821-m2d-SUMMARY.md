---
phase: quick-260821-m2d
plan: "01"
subsystem: motion
tags: [scroll-animation, reveal-variants, parallax, count-up, svg-draw, progress-bar]
status: complete
dependency_graph:
  requires: []
  provides: [scroll-progress-bar, reveal-variants, parallax, timeline-mounted, growth-curve]
  affects: [BaseLayout.astro, global.css, tokens.css, Timeline.astro, index.astro, en/index.astro]
tech_stack:
  added: []
  patterns: [rAF-throttle, stroke-dashoffset-draw, data-anim-variant, data-parallax, data-countup-prefix]
key_files:
  created:
    - src/components/ui/ScrollProgress.astro
    - src/components/ui/GrowthCurve.astro
  modified:
    - src/layouts/BaseLayout.astro
    - src/styles/global.css
    - src/styles/tokens.css
    - src/components/sections/Timeline.astro
    - src/components/sections/Testimonials.astro
    - src/components/sections/Samenwerken.astro
    - src/components/sections/Story.astro
    - src/pages/index.astro
    - src/pages/en/index.astro
    - src/i18n/nl.ts
    - src/i18n/en.ts
decisions:
  - "Parallax on Story portrait figure (data-parallax) on the <figure> wrapper, not the <Picture> — avoids data-anim conflict, no sticky guard needed since figure has no observer"
  - "~1M zonnepanelen count-up uses data-countup=1 + data-countup-prefix=~ + data-suffix=M so the counter animates 0→1M without ticking through a million integers"
  - "GrowthCurve draw triggered by parent [data-anim].is-in via existing observer, no new IntersectionObserver — draw transition lives in global.css"
  - "Timeline headline stats row (9/~180/~1M) added above the dot-map, inside the existing tl__head-text data-anim block for a unified entry reveal"
  - "Testimonials: feature card scale-in, two supporting cards alternate left/right — converging feel without being gimmicky"
  - "Samenwerken: all 3 cards scale-in, consistent editorial entry for the commitment ladder"
  - "Story text column gets data-anim-variant=right; portrait gets data-parallax=0.05 on separate node (no transform conflict)"
metrics:
  duration: "~20 min"
  completed: "2026-08-21"
  tasks_completed: 3
  tasks_total: 3
  commits: 3
  files_created: 2
  files_modified: 11
estimate:
  tokens: 62000
actuals:
  tokens: 32000
  tasks: 3
  commits: 3
---

# Quick 260821-m2d: Maak de homepage levendig — scroll progress, richer reveals, building counters, draw-on-scroll growth curve

One-liner: Scroll-driven motion pass — fixed yellow progress bar, directional/scale/parallax reveal variants, ~1M zonnepanelen count-up, and editorial self-drawing growth-curve SVG, all extending existing primitives without new dependencies.

## Tasks Completed

| # | Name | Commit | Files |
|---|------|--------|-------|
| 1 (tracer) | Scroll progress bar + motion tokens | `cddac98` | ScrollProgress.astro, BaseLayout.astro, tokens.css |
| 2 | Richer reveal variants + parallax | `88dd11a` | global.css, BaseLayout.astro, Testimonials.astro, Samenwerken.astro, Story.astro |
| 3 | Timeline mounted + ~1M counter + growth-curve SVG | `1c5d0b0` | Timeline.astro, GrowthCurve.astro, index.astro, en/index.astro, nl.ts, en.ts |

## What Was Built

### Task 1 — Scroll Progress Bar

`src/components/ui/ScrollProgress.astro` — a 3px fixed bar at the very top of the viewport (z-index 300, above Nav at 100 and mobile panel at 200). Fill colour `var(--color-accent)` (#FFDD11) on the `<span>`, track transparent. Driven by `transform: scaleX(0→1)` — zero CLS, composited-only. Passive scroll listener + rAF throttle (`ticking` boolean). Divide-by-zero guard when page is not scrollable. Under prefers-reduced-motion the island returns early; bar stays at `scaleX(0)` — invisible hairline.

Mounted as the FIRST child of `<body>` in `BaseLayout.astro` so it appears site-wide.

New tokens in `tokens.css`: `--progress-height: 3px`, `--ease-draw: cubic-bezier(0.33,1,0.68,1)`, `--duration-draw: 1100ms`.

### Task 2 — Reveal Variants + Parallax

`global.css` extended with `data-anim-variant` modifiers on the existing `[data-anim]` system:
- `left`: `translateX(-28px)` → none
- `right`: `translateX(28px)` → none
- `scale`: `scale(0.94) + opacity:0` → none + opacity:1

All share the same duration/easing as the base; stagger (`--i`) continues to work because variants are additional attrs on the same `[data-anim]` node.

`BaseLayout.astro` script extended:
- Count-up: additive `data-countup-prefix` seam (`prefix + Math.round(eased*target) + suffix`). Hero stats (no prefix) unchanged.
- Parallax: single rAF-throttled scroll pass over `[data-parallax]` elements. Strength from the attribute (default 0.06), clamped ±24px. Gated behind `!reduce`. Elements fully off-screen are skipped.

Reduced-motion block in `global.css` neutralises variants (`opacity:1 !important; transform:none !important`), pins `[data-parallax]` to `transform:none !important`, and shows `.growth-curve__path` fully drawn.

Applied tastefully:
- **Testimonials**: feature card `scale`, supporting cards alternate `left` / `right`
- **Samenwerken**: all 3 cards `scale` (commitment-ladder entry)
- **Story**: text column `right`, portrait figure `data-parallax="0.05"` (separate node — no transform conflict)

### Task 3 — Timeline + ~1M Counter + GrowthCurve

`Timeline.astro` updated:
- Imports `GrowthCurve.astro`
- Added `.tl__stats-row` headline stats (9 / ~180 / ~1M) above the dot-map using the prefix seam:
  - `data-countup="9"` — plain count
  - `data-countup="180" data-countup-prefix="~"` — counts `~0` → `~180`
  - `data-countup="1" data-countup-prefix="~" data-suffix="M"` — counts `~0M` → `~1M` (never ticks through a million)
- `GrowthCurve` mounted in a `data-anim` wrapper inside the header block

`GrowthCurve.astro` — editorial thin-stroke upward curve path (`viewBox 0 0 320 180`), `currentColor` stroke at 50% opacity for a ghost-line feel. Single yellow `var(--color-accent)` end-dot at the peak. Draw mechanic: `stroke-dasharray: 600; stroke-dashoffset: 600` → transitions to 0 when parent `[data-anim]` receives `.is-in` (global.css rule — no new observer). Reduced-motion: `stroke-dashoffset: 0 !important; transition: none !important` shows fully drawn.

i18n: `solarPanelsValue`, `solarPanelsLabel`, `growthCurveAriaLabel` added to `timeline` block in both `nl.ts` and `en.ts` (same-shape contract maintained).

Timeline mounted in `index.astro` (NL) and `en/index.astro` (EN) between `<Story />` and `<Newsletter />`.

## Build Results

All three `npx astro build` runs passed with 0 errors. 14 pages built each time.

## Deviations from Plan

None — plan executed exactly as written. All must_haves satisfied:
- Fixed yellow progress bar fills on scroll via transform:scaleX (not width)
- Three building counters (9, ~180, ~1M) in the Timeline band
- Self-made editorial SVG growth curve draws via stroke-dashoffset
- Directional/scale variants + parallax portrait applied tastefully
- prefers-reduced-motion: all new animations fully bypassed / shown in final state

## Known Stubs

None. No placeholder values flow to UI rendering. All numbers (9, ~180, ~1M) are factual values from CLAUDE.md and the story copy.

## Threat Flags

None. This pass is CSS/vanilla-JS animation only — no new network endpoints, auth paths, file access patterns, or schema changes.

---

## Visual Checkpoint — What to Verify in the Dev Server

Start the dev server (`npm run dev` / `npx astro dev`) and open the NL homepage (`/`).

### 1. Scroll Progress Bar
- Scroll any distance → the thin yellow (#FFDD11) line at the very top of the viewport fills left-to-right proportionally. It sits above the sticky Nav (visible over the header). It is 3px tall, no yellow track (only the fill is yellow).

### 2. Stats/Timeline Band
- Scroll past the Story section — the navy "Het verhaal in cijfers" band appears directly below it.
- Three large yellow numbers count up from 0 when they enter the viewport: **9** (markten), **~180** (medewerkers), **~1M** (zonnepanelen). The `~` prefix and `M` suffix appear throughout the animation, no integer overflow.

### 3. Growth Curve SVG
- In the Timeline header area: a thin editorial line draws itself from bottom-left to top-right as the section enters view. A small yellow dot appears at the peak once the line is drawn.

### 4. Directional / Scale Reveals
- **Testimonials**: the large featured card scales into view; the two smaller cards slide in from opposite sides (left / right).
- **Samenwerken**: all three cards (Newsletter, Presentatie, Coaching) scale in together.
- **Story**: the text column slides in from the right; the portrait photo has a subtle lift/parallax as you scroll through the section.

### 5. Reduced-Motion Test
In Chrome DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce":
- Progress bar: invisible (static scaleX(0) — no animation)
- Stats band: counters show their final values immediately (`9`, `~180`, `~1M`) without counting
- Growth curve: shown fully drawn from the start, no stroke animation
- All sections: appear in full final position and opacity immediately, no reveals/transitions
- Story portrait: no parallax offset (pinned to natural position)

Nothing is ever hidden under reduced-motion — all content is always readable.

## Self-Check

- [x] `src/components/ui/ScrollProgress.astro` — exists
- [x] `src/components/ui/GrowthCurve.astro` — exists
- [x] `src/components/sections/Timeline.astro` — modified with stats row + GrowthCurve
- [x] `src/layouts/BaseLayout.astro` — ScrollProgress mounted, parallax pass, prefix seam
- [x] `src/styles/global.css` — variants + reduced-motion rules
- [x] Commits: `cddac98`, `88dd11a`, `1c5d0b0` — all present
- [x] Build: 0 errors, 14 pages, Complete!

## Self-Check: PASSED
