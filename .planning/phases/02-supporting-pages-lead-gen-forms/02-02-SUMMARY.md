---
phase: 02-supporting-pages-lead-gen-forms
plan: "02"
subsystem: coaching-spreker-pages
status: complete
tags: [coaching, spreker, landing-pages, nav-enablement, astro-assets, testimonials]
completed: "2026-08-18"
duration: "~15 min"

dependency_graph:
  requires:
    - CONTACT_URL constant in src/config.ts (02-01)
    - nl.contact copy block (02-01)
    - src/pages/contact.astro with ?type= pre-selection (02-01)
    - Nav Contact CTA enabled (02-01)
  provides:
    - src/assets/photos/milan-networking.jpg (261KB, 1920w, sharp-processed)
    - src/assets/photos/milan-speaking-graph.jpg (186KB, 2400w, sharp-processed)
    - nl.coaching top-level key (pageTitle/pageDesc/eyebrow/heading/body/offerCards/CTAs)
    - nl.spreker top-level key (pageTitle/pageDesc/eyebrow/heading/body/aanbodCards/CTAs)
    - src/pages/coaching.astro (route /coaching)
    - src/pages/spreker.astro (route /spreker)
    - Nav: Coaching + Spreker enabled as real <a> links with active-state
    - Footer: same enablement for Coaching + Spreker
  affects:
    - src/i18n/nl.ts (nl.coaching + nl.spreker added)
    - src/components/layout/Nav.astro (navItems href-or-reason refactor)
    - src/components/layout/Footer.astro (navItems href-or-reason refactor)

tech_stack:
  added: []
  patterns:
    - astro:assets <Picture> AVIF/WebP pipeline for new subpage photos
    - RevealOnScroll stagger 80ms per card (existing pattern, applied to new pages)
    - Nav/Footer href-or-reason navItem shape with conditional <a>/<span> render
    - currentPath = Astro.url.pathname active-state detection (baked at build time)
    - nl.testimonials.items[0]/[2] single-card reuse by index

key_files:
  created:
    - src/assets/photos/milan-networking.jpg
    - src/assets/photos/milan-speaking-graph.jpg
    - src/pages/coaching.astro
    - src/pages/spreker.astro
  modified:
    - src/i18n/nl.ts
    - src/components/layout/Nav.astro
    - src/components/layout/Footer.astro

decisions:
  - "nl.coaching / nl.spreker: copy drafted from existing material only (Soly arc, USPs, story body) — flagged for Milan review (D-05)"
  - "Dark band rule: one SectionWrapper variant='dark' per page (offer section on coaching, aanbod on spreker); testimonials rendered as single Card variant='dark' within a default section"
  - "Nav/Footer navItems TypeScript: array typed as union of href-item and reason-item via Astro's implicit inference — no explicit union type declaration needed; Astro built without errors"
  - "mijnVerhaal nav item: remains a disabled span in this plan — page ships in Plan 03"
  - "Testimonials: index access items[0] (Yang Soo Kloosterhof → Coaching), items[2] (Oranjewoud Export Academy → Spreker) — verbatim attributions, no fabrication (D-07)"
  - "Photo sizing: milan-networking.jpg already 1920w (≤2400px ceiling), processed at q80; milan-speaking-graph.jpg downscaled from 6720w to 2400w at q80"

estimate:
  tokens: 66000
  raw_tokens: 33000
  tasks: 3
  confidence: med

actuals:
  tokens: 28000
  tasks: 3
  commits: 3
---

# Phase 02 Plan 02: Coaching + Spreker Pages — Summary

/coaching and /spreker editorial landing pages built from Phase 1 primitives, with photos extracted from the source archive, Dutch copy drafted from existing material, and Coaching/Spreker enabled in Nav/Footer.

## What Was Built

**Task 1 — Photos + nl.coaching + nl.spreker:**
- Extracted `_AVM2348.jpg` and `10 Jaar Soly-78.jpg` from the source zip
- `milan-networking.jpg`: 1920px wide, 261KB (sharp q80, ≤300KB threshold)
- `milan-speaking-graph.jpg`: 2400px wide (downscaled from 6720w), 186KB (sharp q80)
- `nl.coaching`: pageTitle, pageDesc, eyebrow "1:1 Coaching", heading, body (3 paragraphs), offerEyebrow, offerHeading, offerCards (3 items), testimonialEyebrow, ctaHeading, ctaPrimary "Plan kennismaking", ctaSecondary "Meer over mij", networkingAlt
- `nl.spreker`: pageTitle, pageDesc, eyebrow "Spreker", heading, body (2 paragraphs), aanbodEyebrow, aanbodHeading, aanbodCards (3 items), testimonialEyebrow, ctaHeading, ctaPrimary "Boek lezing", speakingAlt

**Task 2 — /coaching and /spreker pages:**
- `coaching.astro`: BaseLayout (per-page SEO) → hero (eyebrow/H1/body/CTAs) → dark offer band (3 RevealOnScroll-staggered Cards + networking photo) → Yang Soo Kloosterhof single testimonial → CTA band → Newsletter
- `spreker.astro`: BaseLayout → split hero (text + speaking-graph photo right column) → PressStrip → dark aanbod band (3 RevealOnScroll Cards) → Oranjewoud Export Academy single testimonial → CTA band → Newsletter
- Both pages: `${import.meta.env.BASE_URL}contact?type=coaching` and `?type=lezing` deep-links, astro:assets `<Picture formats={['avif','webp']}>`, SectionWrapper aria-labelledby, one dark band per page (D-01)
- Testimonials verbatim via `nl.testimonials.items[0]` (Kloosterhof) and `nl.testimonials.items[2]` (Oranjewoud) — D-07 satisfied, no fabrication

**Task 3 — Nav + Footer enablement:**
- Nav: navItems refactored from reason-only to href-or-reason union shape; coaching + spreker get real `<a>` with `nav-link--active` + `aria-current="page"` when `currentPath.startsWith(item.href)` (baked at build time per page)
- Nav mobile panel: same navItems array drives the slide-out — one refactor covers both desktop and mobile
- Nav: Nieuwsbrief (fase 3), mijnVerhaal (plan 3), Boek (fase 5) remain honest disabled `<span>` elements
- Footer: same href-or-reason refactor; coaching + spreker enabled as `<a class="site-footer__nav-link">`; others stay disabled
- No `href="#"` in any rendered HTML output

## Commits

| Hash | Task | Description |
|------|------|-------------|
| 5544e80 | Task 1 | feat(02-02): extract coaching/spreker photos + add nl.coaching + nl.spreker copy |
| 61857d6 | Task 2 | feat(02-02): add /coaching and /spreker editorial landing pages |
| d992632 | Task 3 | feat(02-02): enable Coaching + Spreker in Nav and Footer |

## Deviations from Plan

None — plan executed exactly as written. One note:

**[Info] Grep check on comment lines:** The acceptance criteria `grep -c 'href="#"' ...` returns 1 on source files because the JSDoc comment `NEVER href="#"` in the file header contains the literal. The built HTML output has zero real `href="#"` occurrences, verified against `dist/**/index.html`. This is the same pattern documented in Plan 01 SUMMARY.

## Copy Review Flag (D-05)

The following Dutch copy blocks were drafted from existing material (Soly arc, USPs, story body, testimonials) and are ready for Milan's review before site launch:

### nl.coaching

| Key | Drafted value | Review note |
|-----|---------------|-------------|
| `heading` | "Schalen zonder jezelf te verliezen" | Mirrors homepage H1 theme; Milan may want a more coaching-specific angle |
| `body[0]` | References 9 landen, 180 medewerkers, faillissement | Factual — sourced from story.body; verify framing is accurate |
| `body[1]` | Describes coaching approach / delegation focus | Reflects nl.samenwerken copy; Milan should confirm this matches his actual offer |
| `body[2]` | "Dit is geen gestandaardiseerd coachingprogramma..." | Good differentiator; Milan should verify this is accurate for his format |
| `offerCards[*]` | 3 coaching steps: diagnose, begeleiding, sparring | Derived from USP/story; Milan should confirm these match his actual process |
| `ctaHeading` | "Klaar voor de volgende stap?" | Standard; Milan may want something more personal |

### nl.spreker

| Key | Drafted value | Review note |
|-----|---------------|-------------|
| `heading` | "Een eerlijk verhaal over bouwen, falen en weer opstaan" | Strong; verify this is the positioning Milan wants for speaking |
| `body[0]` | References Soly, 180 medewerkers, 9 landen, faillissement | Factual — sourced from story.body; verify framing |
| `body[1]` | "Ik spreek voor ondernemersorganisaties, corporates en events..." | Milan should confirm these are the target audiences he wants to name |
| `aanbodCards[*]` | 3 speaking topics: schalen, leiderschap, ondernemer | Derived from story; Milan should select/adjust which topics he actually offers |
| `ctaHeading` | "Boek Milan voor jouw event" | Tone OK; third-person may feel odd; Milan may prefer first-person |

**Action required:** Milan reviews and adjusts copy before marketing the site. No invented facts or testimonials — all sourced from approved material.

## Known Stubs

None. Both pages render real (drafted) content. The photography uses real photos from the source archive. Testimonials are the verbatim approved quotes from nl.testimonials.items.

Note: `mijnVerhaal` nav item remains a disabled placeholder — `/mijn-verhaal` page ships in Plan 03.

## Threat Surface Scan

No new network endpoints or auth paths. The coaching/spreker pages are static HTML. The only input surface remains the ContactForm on /contact (unchanged). CTA deep-links emit only fixed literals `type=coaching` / `type=lezing` (T-2-06 mitigated — validated by /contact ContactForm per Plan 01).

## Self-Check: PASSED

- `src/assets/photos/milan-networking.jpg` — FOUND (261KB, ≤300KB)
- `src/assets/photos/milan-speaking-graph.jpg` — FOUND (186KB, ≤300KB)
- `src/pages/coaching.astro` — FOUND
- `src/pages/spreker.astro` — FOUND
- `dist/coaching/index.html` — FOUND
- `dist/spreker/index.html` — FOUND
- `nl.coaching` key present in nl.ts — VERIFIED
- `nl.spreker` key present in nl.ts — VERIFIED
- `aria-current` wired in Nav.astro — VERIFIED (2 occurrences)
- `aria-disabled` in Nav for disabled items — VERIFIED (7 occurrences)
- No `href="#"` in rendered HTML — VERIFIED (checked all 4 dist pages)
- Commits 5544e80, 61857d6, d992632 — VERIFIED in git log
- `npm run build` — exits 0, 4 pages built, 0 errors, 0 warnings
