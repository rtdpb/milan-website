# Requirements: Milan van der Meulen — Personal Brand Website

**Defined:** 2026-08-18
**Core Value:** Make Milan feel like a credible, experienced, and honest founder so the right entrepreneurs reach out for coaching/speaking and subscribe to the newsletter.

## v1 Requirements

Initial milestone — the focused Dutch homepage MVP. All map to **Phase 1**.

### Foundation & Design System

- [ ] **FND-01**: Astro project scaffolded with component-based structure and build/dev tooling
- [ ] **FND-02**: Design system with tokens — color (incl. `#FFDD11` used sparingly as accent), typographic scale, spacing scale — and a swappable brand-font variable (licensed Naste-fallback now)
- [ ] **FND-03**: Reusable UI components — CTA/button variants, cards, section wrapper, nav, footer
- [ ] **FND-04**: High-quality responsive layouts across desktop, tablet, and mobile
- [ ] **FND-05**: Baseline SEO + metadata — title, description, Open Graph/Twitter, favicon, semantic HTML, sitemap, robots
- [ ] **FND-06**: Accessibility baseline — landmarks, alt text, visible focus states, color contrast, keyboard navigation
- [ ] **FND-07**: Performance baseline — optimized fonts, minimal JS, strong Core Web Vitals
- [ ] **FND-08**: Subtle, purposeful animations that respect `prefers-reduced-motion`
- [ ] **FND-09**: i18n-ready structure (routing/content organized so EN adds without a refactor); NL content only in v1
- [ ] **FND-10**: Responsive image pipeline — AVIF/WebP derivatives, `srcset`/`sizes`, lazy loading, focal-point crops; originals kept separate and uncommitted

### Homepage

- [ ] **HOME-01**: Header — nav (Coaching · Spreker · Nieuwsbrief · Mijn verhaal · Boek), Contact CTA, NL/EN switch affordance, LinkedIn icon (placeholders where target unknown)
- [ ] **HOME-02**: Hero — title "Je bedrijf schalen, zonder jezelf te verliezen", subtext, primary CTA Contact, secondary CTA Mijn verhaal, USPs (12+ jaar · 180 medewerkers · 9 markten), hero photo (`10 Jaar Soly-77`)
- [ ] **HOME-03**: Credibility "bekend van" logo carousel — MT Sprout, Quote, NOS, EenVandaag, Telegraaf, De Ondernemer (placeholder logos)
- [ ] **HOME-04**: "Samenwerken" section — three offer cards (Nieuwsbrief, Presentatie/lezing, 1:1 Coaching), each with its supplied CTA
- [ ] **HOME-05**: Testimonials section — the 3 supplied quotes with attributions (Yang Soo Kloosterhof, Ruud Koornstra, Oranjewoud Export Academy)
- [ ] **HOME-06**: Personal story "Waarom ik nu mijn lessen deel" — full supplied copy, signature, supporting photo(s)
- [ ] **HOME-07**: Newsletter signup section (naam + mailadres) — submits to placeholder/Substack endpoint
- [ ] **HOME-08**: "Recente artikelen" section — 3 static placeholder article cards
- [ ] **HOME-09**: Footer — navigation, LinkedIn, legal/placeholder content
- [ ] **HOME-10**: All supplied CTAs functional where the destination is known; clearly-marked placeholders otherwise
- [ ] **HOME-11**: Preserve supplied factual claims, names, and quotes verbatim; flag suspected typos/inconsistencies rather than silently changing them

## v2 Requirements

Deferred to later phases — tracked, not in the first milestone.

### Supporting Pages & Lead-Gen (Phase 2)

- **PAGE-01**: Coaching page
- **PAGE-02**: Speaking ("Spreker") page
- **PAGE-03**: "Mijn verhaal" page
- **PAGE-04**: Contact page with a working contact form
- **PAGE-05**: "Boek lezing" and "Plan kennismaking" CTAs wired to the contact/form flow

### Newsletter & Substack (Phase 3)

- **NEWS-01**: Newsletter page
- **NEWS-02**: Newsletter signup wired to Substack
- **NEWS-03**: Automatic display of recent Substack articles (replaces static placeholders)

### Internationalization (Phase 4)

- **I18N-01**: Functional NL/EN language switch
- **I18N-02**: English translations of homepage and pages

### Book & Growth (Phase 5)

- **BOOK-01**: Book / pre-order page
- **GROW-01**: Conversion + analytics features
- **GROW-02**: Optional CMS / editable content system

## Out of Scope

| Feature | Reason |
|---------|--------|
| Authentication / user accounts | No gated content in v1 |
| Database | Content is static/in-repo for this milestone |
| Payments | Coaching/speaking are lead-gen, not e-commerce |
| Full CMS now | Possible later (GROW-02); avoid building it prematurely |
| Live Substack article feed now | Static placeholders in v1 (NEWS-03 later) |
| LinkedIn feed integration | Not attempted in the MVP |
| English content now | Structure stays i18n-ready; EN is Phase 4 |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FND-01 | Phase 1 | Pending |
| FND-02 | Phase 1 | Pending |
| FND-03 | Phase 1 | Pending |
| FND-04 | Phase 1 | Pending |
| FND-05 | Phase 1 | Pending |
| FND-06 | Phase 1 | Pending |
| FND-07 | Phase 1 | Pending |
| FND-08 | Phase 1 | Pending |
| FND-09 | Phase 1 | Pending |
| FND-10 | Phase 1 | Pending |
| HOME-01 | Phase 1 | Pending |
| HOME-02 | Phase 1 | Pending |
| HOME-03 | Phase 1 | Pending |
| HOME-04 | Phase 1 | Pending |
| HOME-05 | Phase 1 | Pending |
| HOME-06 | Phase 1 | Pending |
| HOME-07 | Phase 1 | Pending |
| HOME-08 | Phase 1 | Pending |
| HOME-09 | Phase 1 | Pending |
| HOME-10 | Phase 1 | Pending |
| HOME-11 | Phase 1 | Pending |

**Coverage:**
- v1 requirements: 21 total
- Mapped to phases: 21
- Unmapped: 0 ✓

---
*Requirements defined: 2026-08-18*
*Last updated: 2026-08-18 after initial definition*
