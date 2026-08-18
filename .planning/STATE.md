---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
current_phase: 1
status: in_progress
stopped_at: "Phase 1 Plan 04 complete — RevealOnScroll island + Testimonials mosaic + Story dark band built"
last_updated: "2026-08-18T18:30:00Z"
progress:
  total_phases: 5
  completed_phases: 0
  total_plans: 6
  completed_plans: 4
current_phase_name: Foundation, Design System & Dutch Homepage
---

# Project State

## Project Reference

See: `.planning/PROJECT.md` (updated 2026-08-18)

**Core value:** Make Milan feel like a credible, experienced, and honest founder so the right entrepreneurs reach out for coaching/speaking and subscribe to the newsletter.
**Current focus:** Phase 1 — Foundation, Design System & Dutch Homepage

## Status

- **Milestone:** v1 — Dutch homepage MVP
- **Current phase:** 1
- **Phases total:** 5 (Phase 1 = current milestone; Phases 2–5 = planned growth)
- **Plans completed:** 4/6 (Plan 01 — Walking Skeleton; Plan 02 — Global chrome + UI kit; Plan 03 — PressStrip + Samenwerken; Plan 04 — RevealOnScroll + Testimonials + Story)
- **Last action:** Executed Plan 01-04 — RevealOnScroll island (reduced-motion safe) + Testimonials mosaic (3 verbatim quotes) + Story dark band (full copy, portrait, id=verhaal)

## Key Facts

- Stack: **Astro 7.2.3** (static-first, SEO/perf, i18n-ready, minimal JS) — SCAFFOLDED
- Design system: CSS custom properties in `src/styles/tokens.css` — COMPLETE
- Self-hosted fonts: Fraunces (display serif) + DM Sans (grotesque body) — COMPLETE (Naste swaps with one variable change)
- Image pipeline: `astro:assets` `<Picture>` with sharp → AVIF/WebP derivatives — PROVEN
- SEO: BaseHead.astro with canonical/OG/Twitter/JSON-LD Person — COMPLETE
- Hero section: Split-card, H1, CTAs (honest disabled), USP row — COMPLETE
- **NEW: Nav** — sticky header, scroll-aware, 5 disabled nav items + Contact CTA + NL|EN + LinkedIn icon, mobile hamburger toggle — COMPLETE
- **NEW: Footer** — light bg, 3-column, disabled nav links + LinkedIn + copyright/legal placeholders — COMPLETE
- **NEW: UI Kit** — Button/Card/SectionWrapper/PlaceholderBadge, all token-styled — COMPLETE
- **NEW: i18n** — src/i18n/nl.ts typed const with all Dutch strings; Phase 4 shape ready — COMPLETE
- **NEW: Config** — src/config.ts with TODO_SUBSTACK_URL, TODO_CONTACT_URL, TODO_LINKEDIN_URL — COMPLETE
- **NEW: PressStrip** — slim "Bekend van" band with 6 text/wordmark placeholder chips, mobile scroll-snap — COMPLETE
- **NEW: Samenwerken** — 3-card commitment ladder (Nieuwsbrief/Lezing/Coaching) with disabled CTAs, responsive grid — COMPLETE
- **NEW: RevealOnScroll** — IntersectionObserver island (prefers-reduced-motion JS guard + CSS fallback), reusable stagger wrapper — COMPLETE
- **NEW: Testimonials** — 3-card Sevora-style mosaic (1 large dark + 2 light), verbatim quotes + attributions, yellow quote mark on dark card — COMPLETE
- **NEW: Story** — full-width dark band (#111110), verbatim story copy, signature, portrait + mission photos (AVIF/WebP pipeline), id=verhaal anchor — COMPLETE
- Primary source: `Input homepage Milan.docx`; design inspiration: Sevora (not copied literally)
- Brand: accent `#FFDD11` used sparingly (primary CTA only); typeface Naste (licensed fallback for now, swappable)
- Photos: 6 real photos supplied; hero = `10 Jaar Soly-77` (extracted + downscaled); mapping in `.planning/ASSETS.md`
- Placeholders pending: Substack URL, contact destination, LinkedIn URL, "bekend van" logos, real articles

## Decisions Made

- Used `fallbackFormat="webp"` instead of `"jpeg"` for hero `<Picture>` to avoid JPEG derivatives >300KB (WebP universally supported)
- Hero source master downscaled to 2400×1600 (532KB) from 6588×4392 original to avoid git bloat
- Production domain `milanvandermeulen.nl` is an ASSUMPTION — TODO before deploy
- `is:inline` added to JSON-LD `<script>` tag in BaseHead to silence Astro hint
- Non-null assertions (!) used in Nav.astro script island after early-return guard — Astro TS strict cannot narrow null in closures
- nav-cta styled inline in Nav context (not Button import) to avoid scoped CSS scope leakage
- PressStrip: --section-padding-y overridden via :global CSS class instead of new SectionWrapper prop — one-off exception, keeps SectionWrapper API clean
- Samenwerken: card photos omitted — not extracted from zip (optional); :global(.samenwerken__card) overrides Card.astro to add flex layout for bottom-aligned CTAs
- Portrait (milan-story-portrait.jpg) sharp-downscaled to 1200px wide (277KB) from 4311x6467 original — Astro generates AVIF/WebP at build; original stays gitignored
- Mission photo (milan-energy-mission.jpg) resized to 1000px wide (189KB) at quality 80 to stay under 300KB threshold (FND-10)
- TypeScript as const literal narrowing in Testimonials.astro worked around via type alias cast in frontmatter
- Story yellow accent: 4px left-border on eyebrow label only (D-02 rule: exactly 1 usage per section)

## Performance Metrics

| Phase | Plan | Duration | Tasks | Files |
|-------|------|----------|-------|-------|
| 01 | 01 | ~6 min | 4/4 | 17 created |
| 01 | 02 | ~12 min | 3/3 | 8 created, 1 modified |
| 01 | 03 | ~8 min | 2/2 | 2 created |
| 01 | 04 | ~10 min | 3/3 | 5 created |

## Next Step

Execute Plan 05 (wave 3): Newsletter section component. Then Plan 06 (wave 4): final assembly wiring all sections into index.astro in document order.

---
*Last updated: 2026-08-18 after Plan 01-04 execution*

## Session

**Last session:** 2026-08-18T18:30:00Z
**Stopped at:** Plan 01-04 complete — RevealOnScroll + Testimonials + Story built (4/6 plans done)
**Resume file:** .planning/phases/01-foundation-design-system-dutch-homepage/01-05-PLAN.md
