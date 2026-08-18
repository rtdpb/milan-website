# Milan van der Meulen — Personal Brand Website

## What This Is

A premium personal-brand website for **Milan van der Meulen**, an experienced founder who scaled Soly internationally (9 countries, ~180 employees, ~1M solar panels) before its failure, and now offers 1:1 founder coaching, speaking engagements, and a monthly newsletter for entrepreneurs. The site tells his honest founder story and generates qualified leads for coaching and speaking while growing his Substack. The first milestone delivers a polished, Dutch-language homepage on a foundation built to grow into a multi-page, bilingual site.

## Core Value

Make Milan feel like a **credible, experienced, and honest founder** — human and distinctive, not a generic consultant template — so the right entrepreneurs reach out for coaching/speaking and subscribe to the newsletter.

## Business Context

- **Customer**: Ambitious founders/entrepreneurs (coaching, speaking) + newsletter readers
- **Revenue model**: Lead-gen for paid 1:1 coaching and paid speaking engagements; newsletter as top-of-funnel
- **Success metric**: Qualified coaching/speaking leads + newsletter (Substack) subscribers
- **Strategy notes**: Primary source of truth = `Input homepage Milan.docx` (content, structure, CTAs, design direction, future pages)

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Dutch homepage matching the docx: header, hero, credibility indicators, collaboration/services, testimonials, personal story, newsletter signup, recent articles, footer
- [ ] Reusable component library and a consistent design system (premium, editorial, restrained yellow accent)
- [ ] Real photography used throughout instead of generic placeholders, with an optimized responsive asset pipeline
- [ ] All supplied CTAs functional where destinations are known; clearly-marked placeholders elsewhere
- [ ] Baseline SEO, accessibility, performance, responsive behaviour, and metadata
- [ ] Architecture that does not block future pages, i18n (NL/EN), Substack integration, or a later CMS

### Out of Scope (this milestone)

- Authentication / user accounts — no gated content in v1
- Database — content is static/in-repo in v1
- Payments — coaching/speaking are lead-gen, not e-commerce
- Full CMS — possible later; avoid building it now
- Live Substack article feed — static placeholders in v1
- LinkedIn feed integration — not attempted in the MVP
- English content + NL/EN switch — deferred to a later phase (structure stays i18n-ready)
- Coaching / Speaking / Newsletter / "Mijn verhaal" / Book (pre-order) / Contact pages — future phases

## Context

- **Primary source**: `Input homepage Milan.docx` (Dutch homepage copy, section structure, CTAs, and design references). Design inspiration: https://sevora.framer.website/ (composition, typography, spacing, cards, image treatment) — inspiration only, not to be copied literally.
- **Homepage sections (from docx)**: Header (nav: Coaching · Spreker · Nieuwsbrief · Mijn verhaal · Boek pre-order; header CTA: Contact; NL/EN switch + LinkedIn icon) → Hero ("Je bedrijf schalen, zonder jezelf te verliezen", primary CTA Contact, secondary CTA Mijn verhaal, USPs 12+ jaar · 180 medewerkers · 9 markten) → "bekend van" logo carousel (MT Sprout, Quote, NOS, EenVandaag, Telegraaf, De Ondernemer) → Sectie 2 "Samenwerken" (Nieuwsbrief / Presentatie / 1:1 Coaching cards) → Sectie 3 Testimonials (Yang Soo Kloosterhof, Ruud Koornstra, Oranjewoud Export Academy) → Sectie 4 personal story "Waarom ik nu mijn lessen deel" (signed Milan van der Meulen) → Sectie 5 newsletter signup (naam + mailadres) → Sectie 6 "Recente artikelen" (static placeholders in v1) → Footer.
- **Photography**: 6 real photos supplied (`fotos/wetransfer_…zip`, ~86 MB). Manifest and section mapping recorded in `.planning/ASSETS.md`. Hero = "10 Jaar Soly-77" (yellow stage backdrop, on-brand).
- **Content integrity**: Preserve supplied factual claims, names, and quotes. Flag suspected typos/inconsistencies (e.g. "markteno.a." spacing, "commerci�le" encoding artifacts) rather than silently rewriting.

## Constraints

- **Tech stack**: Astro — static-first, best-in-class SEO/performance, content collections for articles, first-class i18n for future NL/EN, straightforward path to a later CMS; islands for subtle animations. Decided over Next.js (lighter for a content site).
- **Brand — color**: Accent `#FFDD11` used sparingly as an accent, never blanketing the page.
- **Brand — typography**: Preferred typeface "Naste" (commercial; files not yet supplied). MVP uses a properly-licensed editorial lookalike as a fallback, isolated behind a single font variable so Naste can be swapped in later.
- **Design**: Premium, editorial, personal, confident, modern; strong typography + generous spacing; subtle, purposeful animations; high-quality responsive layouts (desktop/tablet/mobile); must feel human, not like an AI-generated SaaS landing page.
- **Assets**: Do not commit/serve the ~86 MB full-res originals as production assets; originals kept separate from optimized AVIF/WebP derivatives; responsive sizes + lazy loading.
- **Infra minimalism**: No auth, accounts, payments, database, or CMS in this milestone. Don't build infrastructure future phases will need until those phases.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Astro over Next.js | Content-driven, SEO/perf-first, easy i18n + future CMS, minimal JS | — Pending |
| Licensed Naste-fallback font now, swappable later | Naste files/license not yet available; unblock design system | — Pending |
| Placeholders for unknown links/assets (Substack URL, contact, LinkedIn, "bekend van" logos) | Destinations not yet supplied; keep MVP moving | — Pending |
| Hero photo = "10 Jaar Soly-77" | Yellow backdrop matches `#FFDD11`; honest, confident expression; subject faces into layout | — Pending |
| NL-only content now, i18n-ready structure | Focused first milestone; EN is a later phase | — Pending |
| Static placeholder articles in v1 | Live Substack/LinkedIn feeds deferred to a later phase | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-08-18 after initialization*
