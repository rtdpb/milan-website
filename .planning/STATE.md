---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
current_phase: 2 — Supporting Pages & Lead-Gen Forms
status: in_progress
stopped_at: Phase 2 UI-SPEC approved
last_updated: "2026-08-18T19:20:34.900Z"
progress:
  total_phases: 5
  completed_phases: 1
  total_plans: 9
  completed_plans: 6
current_phase_name: Supporting Pages & Lead-Gen Forms
---

# Project State

## Project Reference

See: `.planning/PROJECT.md` (updated 2026-08-18)

**Core value:** Make Milan feel like a credible, experienced, and honest founder so the right entrepreneurs reach out for coaching/speaking and subscribe to the newsletter.
**Current focus:** Phase 1 — Foundation, Design System & Dutch Homepage

## Status

- **Milestone:** v1 — Dutch homepage MVP
- **Current phase:** 2 — Supporting Pages & Lead-Gen Forms
- **Phases total:** 5 (Phase 1 = current milestone; Phases 2–5 = planned growth)
- **Plans completed:** 6/6 (Plan 01 — Walking Skeleton; Plan 02 — Global chrome + UI kit; Plan 03 — PressStrip + Samenwerken; Plan 04 — RevealOnScroll + Testimonials + Story; Plan 05 — Newsletter + Articles; Plan 06 — Assembly + Audit)
- **Last action:** Executed Plan 01-06 — assembled all 7 sections in docx order into index.astro, ran automated audit (all gates pass, Lighthouse Performance 98 / A11y 97 / SEO 100 / LCP 1.7s). Awaiting human-verify checkpoint for responsive/visual quality.

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
- **NEW: Newsletter** — light section, explicit naam+mailadres labels, 16px inputs, aria-disabled Substack submit tied to TODO_SUBSTACK_URL, no fake success state (D-09, HOME-07) — COMPLETE
- **NEW: Articles** — 3 placeholder cards (PlaceholderBadge + fictional titles + isPlaceholder flag), disabled "Lees verder"/"Alle artikelen", ArticleCard type contract for Phase 3 Substack swap (D-10, HOME-08) — COMPLETE
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
- Newsletter submit: rendered as `<span role=button aria-disabled>` (not `<button disabled>`) so AT can discover and read it while it's clearly non-functional
- Articles cards: :global(.articles__card) flex override + loop with single TODO comment covering the whole placeholder array (plan allows this; array marked isPlaceholder:true)

## Performance Metrics

| Phase | Plan | Duration | Tasks | Files |
|-------|------|----------|-------|-------|
| 01 | 01 | ~6 min | 4/4 | 17 created |
| 01 | 02 | ~12 min | 3/3 | 8 created, 1 modified |
| 01 | 03 | ~8 min | 2/2 | 2 created |
| 01 | 04 | ~10 min | 3/3 | 5 created |
| 01 | 05 | ~6 min | 2/2 | 2 created |
| 01 | 06 | ~8 min | 2/2 | 3 modified |

## Next Step

Phase 1 is complete pending human-verify checkpoint (Task 3 of Plan 06). User should run `npm run build && npm run preview`, inspect the homepage at desktop/tablet/mobile, verify anchor, animations, and disabled CTAs.

After approval: Phase 2 (subpages + contact form) begins.

---
*Last updated: 2026-08-18 after Plan 01-05 execution*

## Session

**Last session:** 2026-08-18T19:03:13.866Z
**Stopped at:** Phase 2 UI-SPEC approved
**Resume file:** .planning/phases/02-supporting-pages-lead-gen-forms/02-UI-SPEC.md
