---
phase: quick-260824-gak
plan: 01
subsystem: ui/sections
status: complete
tags: [feedback-round, samenwerken, testimonials, spreker, i18n, forms]
completed: 2026-08-24

dependency_graph:
  requires: []
  provides:
    - samenwerken-newsletter-inline-form
    - samenwerken-label-title-swaps
    - samenwerken-green-scarcity-dot
    - testimonials-3up-dark-cards-carousel
    - spreker-spokenat-logo-grid
  affects:
    - src/components/sections/Samenwerken.astro
    - src/components/sections/Testimonials.astro
    - src/pages/spreker.astro
    - src/pages/en/speaking.astro
    - src/i18n/nl.ts
    - src/i18n/en.ts
    - src/styles/tokens.css

tech_stack:
  added:
    - "--color-success: #1F9D55 (CSS token — availability/success indicator)"
  patterns:
    - "Non-anchor pricing card containing inline GET form (Substack subscribe)"
    - "CSS keyframe pulse animation on scarcity dot (prefers-reduced-motion disabled)"
    - "Initials-monogram avatar derived at build time from name string"
    - "IntersectionObserver-driven carousel dots (scroll-snap track)"
    - "Dark logo-card grid with yellow CTA cell as final item"

key_files:
  modified:
    - src/components/sections/Samenwerken.astro
    - src/components/sections/Testimonials.astro
    - src/pages/spreker.astro
    - src/pages/en/speaking.astro
    - src/i18n/nl.ts
    - src/i18n/en.ts
    - src/styles/tokens.css

decisions:
  - "Card 0 (Newsletter) restructured from <a> to <div> so inline <form> can be nested without invalid HTML"
  - "subtext field added to ALL three card objects (empty string on cards 1+2) to keep as const map shape uniform"
  - "labelEmail added to samenwerken i18n object (not re-using newsletter.labelEmail) to keep section self-contained"
  - "Testimonials rebuilt as flat 3-up map (all cards identical format) — drop old feature/support/rule split"
  - "isEn derived from Astro.currentLocale in Testimonials (not t.currentLocale which does not exist on string object)"
  - "en/speaking.astro updated alongside spreker.astro — chips section existed in both"

metrics:
  tasks: 3
  commits: 3
  duration: "~15 min"

actuals:
  tokens: 22000
  tasks: 3
  commits: 3
---

# Quick Task 260824-gak: Feedback-round tweaks to Samenwerken + priority redesigns

Rebuilt Samenwerken Newsletter card with a real inline Substack email form, redesigned Testimonials as a 3-up dark-card carousel with initials avatars, and replaced the spreker chip list with a dark logo-card grid + yellow CTA cell + divider.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Samenwerken card tweaks + i18n (inline newsletter form, label/title swaps, green pulsing dot) | `26df3b8` | Samenwerken.astro, nl.ts, en.ts, tokens.css |
| 2 | Testimonials redesign (3-up dark cards + monogram avatars + carousel control) | `01da8ec` | Testimonials.astro |
| 3 | spreker "Eerder gesproken bij" redesign (dark logo-card grid + CTA card + divider) + i18n | `c70c7e4` | spreker.astro, en/speaking.astro, nl.ts, en.ts |

## Verification

All three tasks: `npm run build` passed with 0 errors after each commit (16 pages, Astro 7.2.3, TypeScript check clean).

## Must-Have Truth Check

- Newsletter card: non-anchor container, eyebrow 'Een dosis inspiratie', big title 'Nieuwsbrief', 'Gratis' tag, single subtext paragraph (no checkmarks), real GET form to `https://milanvandermeulen.substack.com/subscribe` in new tab — DONE
- Presentatie card: eyebrow 'Een uniek ondernemersverhaal', title 'Presentatie' — DONE
- Coaching scarcity dot: green (var(--color-success)), CSS keyframe pulse, disabled under prefers-reduced-motion — DONE
- Testimonials: 3-up dark cards with initials-monogram avatar, yellow quote-mark, verbatim quote, name/role under divider, prev/dot/next carousel control driving scroll-snap track on mobile — DONE
- spreker 'Eerder gesproken bij': 4-col grid of dark logo cards (org name as styled text + placeholder logo slot), yellow 'Boek lezing' CTA card as final cell linking to ATHENAS_URL, eyebrow + 2-line subtext above, 'EN VELE ANDEREN' divider below — DONE
- NL and EN i18n in parity (matching shape, no TypeScript type errors) — DONE
- npm run build succeeds — DONE

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Testimonials: t.currentLocale does not exist on strings object**
- **Found during:** Task 2 — first build attempt after writing Testimonials.astro
- **Issue:** Used `t.currentLocale` where `t` is the i18n strings object; `currentLocale` is a property of `Astro`, not of the strings object. TypeScript threw 4 errors.
- **Fix:** Introduced `const locale = Astro.currentLocale ?? 'nl'` and `const isEn = locale === 'en'` at the top of the component frontmatter; replaced all `t.currentLocale === 'en'` checks with `isEn`.
- **Files modified:** src/components/sections/Testimonials.astro
- **Commit:** 01da8ec (fixed inline before commit)

### Scope Expansion (Both Pages)

The plan specified `src/pages/spreker.astro` for Task 3. `src/pages/en/speaking.astro` is the English mirror of the same page and contained identical `.chips`/`.chip` markup. Updating only NL would break NL/EN parity and leave the EN page with the old chip layout. Applied identical changes to both files (same deviation category as Rule 2 — missing parity is a correctness requirement for a bilingual site).

## Known Stubs

- **Logo placeholder slots** in spreker / speaking "Eerder gesproken bij" grid: each dark card contains a `.sat__logo-placeholder` `<span>` (40×24px grey fill) as a drop-in slot for future real logos. The org name renders as visible styled text so the section is fully functional; the placeholder only affects visual polish. These are intentional and documented — real logos will be supplied in a future design/asset phase.
- **Testimonials avatar monograms** remain as initials (no photo assets supplied). Structure is ready for `<img>` drop-in per code comment.

## Self-Check: PASSED

- src/components/sections/Samenwerken.astro — exists
- src/components/sections/Testimonials.astro — exists
- src/pages/spreker.astro — exists
- src/pages/en/speaking.astro — exists
- src/i18n/nl.ts — exists
- src/i18n/en.ts — exists
- src/styles/tokens.css — exists
- Commits 26df3b8, 01da8ec, c70c7e4 — all in git log
