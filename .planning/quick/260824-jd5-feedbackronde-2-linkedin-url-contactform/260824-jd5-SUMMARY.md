---
quick_id: 260824-jd5
status: complete
phase: quick
plan: 260824-jd5
subsystem: frontend
tags: [feedback, linkedin, contact-form, nieuwsbrief, testimonials, coaching-header]
date_completed: "2026-08-24"
duration: ~10 min
tasks_completed: 4
commits: 4
files_modified: 10
dependency_graph:
  requires: []
  provides: [linkedin-live, contact-form-v2, nieuwsbrief-hero-form, testimonial-photos, coaching-fullbleed]
  affects: [Nav, Footer, ContactForm, nieuwsbrief, Testimonials, coaching]
tech_stack:
  patterns: [conditional-sentinel-anchor, yellow-pill-cta, inline-email-form, full-bleed-header, photo-map]
key_files:
  created: []
  modified:
    - src/config.ts
    - src/components/layout/Nav.astro
    - src/components/layout/Footer.astro
    - src/components/forms/ContactForm.astro
    - src/pages/nieuwsbrief.astro
    - src/components/sections/Testimonials.astro
    - src/pages/coaching.astro
    - src/pages/en/coaching.astro
    - src/i18n/nl.ts
    - src/i18n/en.ts
decisions:
  - LinkedIn wired via linkedinLive sentinel check (=== 'TODO_LINKEDIN_URL') — disabled span preserved as fallback branch
  - ContactForm: native mailto action retained for no-JS path; privacy consent checkbox uses accent-color for native checkbox tint
  - Nieuwsbrief hero form: IS_SENTINEL branch kept for correctness even though Substack is now live
  - Testimonial photoMap keyed by exact i18n name strings — safe since names are proper nouns identical in NL/EN
  - Coaching header: reused spreker .shero CSS pattern verbatim (renamed to .chero); anim-kenburns on header element (not figure)
actuals:
  tokens: 22000
  tasks: 4
  commits: 4
---

# Quick Task 260824-jd5: Feedbackronde 2 — LinkedIn URL, Contact Form, Nieuwsbrief Hero, Testimonial Photos, Coaching Header

**One-liner:** Wired real LinkedIn URL as live anchors in Nav/Footer, overhauled contact form (removed dropdown, added optional company/phone + required privacy consent + yellow pill submit), added inline Substack email form to nieuwsbrief hero, added real photos for Yang Soo/Ruud in testimonials, and converted coaching header (NL + EN) to full-bleed background-image matching the spreker page.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | LinkedIn URL + real anchors in Nav & Footer | b3cc9c5 | src/config.ts, Nav.astro, Footer.astro |
| 2 | Contact form overhaul + i18n | 390e582 | ContactForm.astro, nl.ts, en.ts |
| 3 | Nieuwsbrief hero email form + Testimonials photos | 49c9461 | nieuwsbrief.astro, Testimonials.astro, nl.ts, en.ts |
| 4 | Coaching full-bleed header (NL + EN) | 6c05d09 | coaching.astro, en/coaching.astro |

## Commits

- `b3cc9c5` feat(260824-jd5): wire real LinkedIn URL + live anchors in Nav & Footer
- `390e582` feat(260824-jd5): overhaul contact form — remove dropdown, add fields + consent + pill CTA
- `49c9461` feat(260824-jd5): nieuwsbrief hero inline email form + testimonial real photos
- `6c05d09` feat(260824-jd5): coaching full-bleed background-image header (NL + EN)

## What Was Built

### Task 1 — LinkedIn
- `src/config.ts`: `TODO_LINKEDIN_URL` typed as `string` and set to the real LinkedIn profile URL
- Nav.astro: computed `linkedinLive` sentinel; desktop `.linkedin-icon` and mobile `.mobile-nav__linkedin` both conditionally render a real `<a href target="_blank" rel="noopener noreferrer">` vs the existing aria-disabled span; live anchor CSS overrides set `cursor: pointer` and normal opacity
- Footer.astro: same conditional pattern for `.ft__linkedin`; hover shows accent color

### Task 2 — Contact Form
- `nl.ts` + `en.ts`: removed `labelOnderwerp`, `optionAlgemeen`, `optionLezing`, `optionCoaching`, `mailtoFallbackPre`; added `labelBedrijf`, `labelTelefoon`, `privacyConsentPre`, `privacyConsentLink` (identical shapes)
- `ContactForm.astro`: full rewrite — no subject select, no mailto-fallback paragraph; optional Naam bedrijf (company) + Telefoonnummer (phone) fields; required privacy checkbox with `<a href={privacyHref}>` linking to NL `/privacybeleid` or EN `/en/privacy`; submit button is yellow pill (`var(--color-accent)`, `var(--radius-pill)`, 54px, font-weight 700) with inline arrow SVG + `translateY(-2px)` / `translateX(3px)` hover; JS body builder appends company/phone only when non-empty; `prefers-reduced-motion` guard on transitions

### Task 3 — Nieuwsbrief Hero + Testimonials
- `nl.ts` + `en.ts`: added `nieuwsbrief.labelEmail` key (Mailadres / Email address)
- `nieuwsbrief.astro`: replaced `<Button>` in hero with IS_SENTINEL-gated inline form — live branch is a `<form method="get" target="_blank">` posting to Substack `/subscribe`; sr-only email label; yellow pill submit button with arrow SVG; Plausible `Newsletter: Subscribe` goal on form submit; disabled span for sentinel branch; pill input + full CSS with `prefers-reduced-motion` guard
- `Testimonials.astro`: imported `Image` from `astro:assets` + two JPG imports; built `photoMap` keyed by exact testimonial name string; avatar markup conditionally renders `<Image width=88 height=88>` for Yang Soo Kloosterhof + Ruud Koornstra, monogram for Oranjewoud; `.tst__avatar` gets `overflow: hidden`; `.tst__avatar-img` CSS clips to circle

### Task 4 — Coaching Full-bleed Header
- `coaching.astro` + `en/coaching.astro`: changed heroSrc import to `milan-networking.jpg`; replaced split `<header class="chero">` + `chero__inner` grid with full-bleed `<header class="chero anim-kenburns">` containing absolute-positioned `<Picture>`, dark scrim `<div>`, and overlaid `<div class="chero__inner">` with eyebrow + h1; CSS replaced entirely with spreker-mirrored `.shero*` adapted as `.chero*`; both NL and EN files are byte-parallel in the header region

## Deviations from Plan

None — plan executed exactly as written.

## i18n Parity Check

Both `nl.ts` and `en.ts` `contact` block shapes after changes:
- Added: `labelBedrijf`, `labelTelefoon`, `privacyConsentPre`, `privacyConsentLink`
- Removed: `labelOnderwerp`, `optionAlgemeen`, `optionLezing`, `optionCoaching`, `mailtoFallbackPre`

Both `nieuwsbrief` block shapes: added `labelEmail` in the same position.

Astro's `satisfies Record<Locale, Strings>` type check in `src/i18n/utils.ts` validates shape parity at build time — build passed 0 errors.

## Known Stubs

None — all changes are live/functional (LinkedIn URL real, Substack URL real, photos real, privacy page exists).

## Self-Check: PASSED

- `src/config.ts`: TODO_LINKEDIN_URL = real URL ✓
- Nav.astro: linkedinLive conditional ✓
- Footer.astro: linkedinLive conditional ✓
- ContactForm.astro: no dropdown, no fallback p, company/phone/consent present, yellow pill submit ✓
- nieuwsbrief.astro: IS_SENTINEL-gated inline form ✓
- Testimonials.astro: photoMap with real photos ✓
- coaching.astro: full-bleed chero ✓
- en/coaching.astro: full-bleed chero ✓
- Build: 16 pages, 0 errors ✓
- Commits: b3cc9c5, 390e582, 49c9461, 6c05d09 ✓
