---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
current_phase: 1
status: in_progress
stopped_at: "Phase 1 Plan 02 complete — Global chrome + UI kit built"
last_updated: "2026-08-18T18:12:00Z"
progress:
  total_phases: 5
  completed_phases: 0
  total_plans: 6
  completed_plans: 2
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
- **Plans completed:** 2/6 (Plan 01 — Walking Skeleton; Plan 02 — Global chrome + UI kit)
- **Last action:** Executed Plan 01-02 — site header (Nav) + site footer + reusable UI kit + single-source i18n/config

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

## Performance Metrics

| Phase | Plan | Duration | Tasks | Files |
|-------|------|----------|-------|-------|
| 01 | 01 | ~6 min | 4/4 | 17 created |
| 01 | 02 | ~12 min | 3/3 | 8 created, 1 modified |

## Next Step

Execute Plan 03: Homepage sections — PressStrip, Samenwerken (3-card commitment ladder), Testimonials mosaic.

---
*Last updated: 2026-08-18 after Plan 01-02 execution*

## Session

**Last session:** 2026-08-18T18:12:00Z
**Stopped at:** Plan 01-02 complete — Global chrome + UI kit built and wired into BaseLayout
**Resume file:** .planning/phases/01-foundation-design-system-dutch-homepage/01-03-PLAN.md
