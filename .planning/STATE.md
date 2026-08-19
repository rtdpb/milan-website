---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
current_phase: 3
status: in_progress
stopped_at: Phase 4 context gathered
last_updated: "2026-08-19T10:17:32.590Z"
progress:
  total_phases: 5
  completed_phases: 3
  total_plans: 14
  completed_plans: 12
current_phase_name: Newsletter & Substack Integration
---

# Project State

## Project Reference

See: `.planning/PROJECT.md` (updated 2026-08-18)

**Core value:** Make Milan feel like a credible, experienced, and honest founder so the right entrepreneurs reach out for coaching/speaking and subscribe to the newsletter.
**Current focus:** Phase 3 — Newsletter & Substack Integration

## Status

- **Milestone:** v1 — Dutch homepage MVP
- **Current phase:** 3
- **Phases total:** 5 (Phase 1 = current milestone; Phases 2–5 = planned growth)
- **Plans completed:** 6/6 Phase 1 + 3/3 Phase 2 (all PAGE-01..05 delivered)
- **Last action:** Executed Plan 03-02 — /nieuwsbrief editorial landing page + Newsletter.astro email-only Substack redirect rewire; 6 pages built, 0 errors.

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
- **NEW: Config** — src/config.ts with TODO_SUBSTACK_URL, CONTACT_URL (resolved), TODO_WEB3FORMS_ACCESS_KEY, TODO_CALENDLY_URL, TODO_LINKEDIN_URL — COMPLETE
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
- Placeholders pending: Web3Forms access key (form submission-ready), Calendly URL seam, Substack URL, LinkedIn URL, "bekend van" logos, real articles
- **NEW: ContactForm** — Web3Forms progressive-enhancement form (no-JS fallback, honeypot, 7-state machine, static Dutch copy, XSS-safe) — COMPLETE
- **NEW: /contact page** — H1 + subtext, ContactForm (max-width 640px), Newsletter — COMPLETE
- **NEW: Nav Contact CTA enabled** — desktop + mobile, import.meta.env.BASE_URL href — COMPLETE
- **NEW: /coaching page** — editorial landing page (hero/offer-dark-band/testimonial/CTA/Newsletter), networking photo, Yang Soo Kloosterhof testimonial, Plan kennismaking → /contact?type=coaching — COMPLETE
- **NEW: /spreker page** — editorial landing page (split-hero/PressStrip/aanbod-dark-band/testimonial/CTA/Newsletter), speaking-graph photo, Oranjewoud testimonial, Boek lezing → /contact?type=lezing — COMPLETE
- **NEW: Nav Coaching + Spreker enabled** — href-or-reason refactor, active-state aria-current + nav-link--active, mobile panel covered — COMPLETE
- **NEW: Footer Coaching + Spreker enabled** — same href-or-reason shape, real <a> links — COMPLETE
- **NEW: /mijn-verhaal page** — expanded founder story (4 arc sections, .prose max-w 680px, Story.astro opening dark band, terminal CTA into /contact?type=coaching), nl.mijnVerhaal copy drafted from existing material, flagged for Milan review (D-05) — COMPLETE
- **NEW: Homepage Hero Contact CTA enabled** — real <a href={BASE_URL}contact> replacing disabled span — COMPLETE
- **NEW: Samenwerken Lezing + Coaching CTAs enabled** — Lezing → /contact?type=lezing, Coaching → /contact?type=coaching; Nieuwsbrief stays disabled (Phase 3) — COMPLETE
- **NEW: Story teaser link** — "Lees mijn hele verhaal →" → /mijn-verhaal added to Story.astro with isMijnVerhaalPage guard (no self-link on /mijn-verhaal) — COMPLETE
- **NEW: Nav + Footer mijnVerhaal enabled** — real <a> links with active-state; Nieuwsbrief + Boek remain only disabled placeholders — COMPLETE
- **NEW (Phase 3-01): RSS pipeline tracer** — fast-xml-parser@5.11.0 installed; src/lib/rss.ts (fetchSubstackFeed + ArticleCard/PlaceholderCard); Articles.astro rewired behind IS_SENTINEL guard (D-04: placeholder state honest, D-02: build-time fetch, D-06: fallback); .github/workflows/deploy.yml with push+cron+dispatch+concurrency — COMPLETE
- **NEW (Phase 3-02): /nieuwsbrief page + Newsletter rewire** — src/pages/nieuwsbrief.astro (hero/value-prop/signup/10-item archive), Newsletter.astro email-only Substack redirect (naam field removed D-05), nl.nieuwsbrief copy block added; NEWS-01/NEWS-02 delivered — COMPLETE

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
- ContactForm script: data-* bridge on <form> element (not on <script> tag) to pass nl.contact strings into TypeScript-processed island — avoids Astro is:inline downgrade
- CONTACT_URL docblock: removed grep-comment alias to satisfy grep -c TODO_CONTACT_URL === 0 acceptance criterion
- Nav/Footer navItems: refactored from plain string/reason-only array to href-or-reason union shape — no explicit TypeScript union annotation needed, Astro's implicit type inference handles conditional render without errors
- mijnVerhaal nav item: remains disabled in Plan 02 — page ships in Plan 03; reason string updated to "fase 2, plan 3"
- nl.coaching + nl.spreker: copy drafted from story.body/USPs/samenwerken — flagged for Milan review (D-05); no invented facts/numbers/testimonials
- isMijnVerhaalPage guard in Story.astro: prevents circular self-link when Story.astro used as /mijn-verhaal opening band; baked at build time via Astro.url.pathname.includes
- Samenwerken ladderCards as const removed: added explicit disabled/href/placeholderReason fields; TypeScript inference handles conditional render without explicit union type
- nl.mijnVerhaal arc4Body: switched to double-quoted string to avoid TypeScript parse error on Dutch apostrophe in 's avonds (Rule 1 auto-fix)
- Phase 3-01 action versions: used stable fallback majors (checkout@v4, withastro/action@v3, deploy-pages@v4); RESEARCH listed v7/v6/v5 as ASSUMED; runtime GitHub verification not possible
- Phase 3-01 Task 3: no code changes — rss.ts behaviors (a)-(d) correctly implemented in tracer; smoke assertion RSS_SMOKE_OK
- Phase 3-02 Tasks 1+2 atomic commit: nl.ts labelNaam removal paired with Newsletter.astro destructure update — TypeScript would error between tasks if committed separately
- Phase 3-02 nl.nieuwsbrief.pageDesc: double-quoted string for Dutch apostrophe in "Milan's" (consistent with arc4Body pattern)
- Phase 3-02 social proof omitted: no newsletter-specific quote exists; fabricating or repurposing coaching/speaking quotes prohibited (HOME-11, UI-SPEC §2e)
- [Phase ?]: Nieuwsbrief nav/footer: single-entry navItems change; existing item.href conditional handles active-state render — no markup change required
- [Phase ?]: Samenwerken Nieuwsbrief card: no external prop (internal link to /nieuwsbrief, not Substack redirect); variant field added to ladderCards

## Performance Metrics

| Phase | Plan | Duration | Tasks | Files |
|-------|------|----------|-------|-------|
| 01 | 01 | ~6 min | 4/4 | 17 created |
| 01 | 02 | ~12 min | 3/3 | 8 created, 1 modified |
| 01 | 03 | ~8 min | 2/2 | 2 created |
| 01 | 04 | ~10 min | 3/3 | 5 created |
| 01 | 05 | ~6 min | 2/2 | 2 created |
| 01 | 06 | ~8 min | 2/2 | 3 modified |
| 02 | 01 | ~8 min | 3/3 | 2 created, 4 modified |
| 02 | 02 | ~15 min | 3/3 | 4 created, 3 modified |
| 02 | 03 | ~15 min | 3/3 | 1 created, 6 modified |
| 03 | 01 | ~10 min | 3/3 | 2 created, 4 modified |
| 03 | 02 | ~12 min | 3/3 | 1 created, 2 modified |
**Per-Plan Metrics:**

| Plan | Duration | Tasks | Files |
|------|----------|-------|-------|
| Phase 03 P03 | ~2 min | 2 tasks | 3 files |

## Next Step

Phase 3 Plan 03 complete and human-verified. All three Nieuwsbrief entry points (Nav desktop+mobile, Footer, Samenwerken card) now link to /nieuwsbrief. Phase 3 (all 3 plans) done — NEWS-01 delivered; NEWS-02/NEWS-03 ship integration-ready behind the TODO_SUBSTACK_URL sentinel (one grep-replace flips the whole newsletter integration live). Next: Phase 4 (Internationalization — NL/EN switch) or milestone review.

---
*Last updated: 2026-08-19 after Plan 03-03 execution*

## Session

**Last session:** 2026-08-19T09:50:14.891Z
**Stopped at:** Phase 4 context gathered
**Resume file:** .planning/phases/04-internationalization-english-content/04-CONTEXT.md
