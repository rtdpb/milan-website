---
phase: 04-internationalization-english-content
plan: 01
subsystem: i18n
tags: [i18n, en-locale, hreflang, nav-switch, astro-i18n, bilingual]
status: complete

dependency_graph:
  requires:
    - 03-newsletter-substack-rss
  provides:
    - en.ts (EN string source)
    - utils.ts (getStrings helper + slug maps)
    - scripts/smoke-i18n.js (post-build smoke check)
    - src/pages/en/index.astro (EN homepage)
    - locale-parameterized BaseLayout + BaseHead + Nav
    - 7 refactored homepage section components
  affects:
    - All pages (BaseLayout lang attr, skip-link, BaseHead hreflang)
    - Nav (functional NL↔EN switch, locale-branched navItems)
    - All 7 homepage section components (getStrings replaces import{nl})

tech_stack:
  added:
    - astro:i18n built-in (getRelativeLocaleUrl, getAbsoluteLocaleUrl, Astro.currentLocale)
  patterns:
    - getStrings(Astro.currentLocale) — zero-prop-drilling locale helper
    - satisfies Record<Locale, DeepWiden<typeof nl>> — build-time shape enforcement
    - nlToEn / enToNl slug maps — NL↔EN path translation for Nav switch and hreflang

key_files:
  created:
    - src/i18n/en.ts
    - src/i18n/utils.ts
    - scripts/smoke-i18n.js
    - src/pages/en/index.astro
  modified:
    - astro.config.mjs
    - src/layouts/BaseLayout.astro
    - src/components/layout/BaseHead.astro
    - src/components/layout/Nav.astro
    - src/components/sections/Hero.astro
    - src/components/sections/PressStrip.astro
    - src/components/sections/Samenwerken.astro
    - src/components/sections/Testimonials.astro
    - src/components/sections/Story.astro
    - src/components/sections/Newsletter.astro
    - src/components/sections/Articles.astro
    - src/pages/index.astro

decisions:
  - "DeepWiden<T> utility type used instead of bare satisfies Record<Locale, typeof nl> because nl.ts uses `as const` literal types — en.ts values ('Speaking' etc.) cannot satisfy literal types like 'Spreker' from nl. DeepWiden recursively widens leaf string literals to string, enabling the shape check without literal-value mismatch (Rule 1 auto-fix)."
  - "smoke-i18n.js converted from CJS require() to ES import because package.json has type:module — CJS require() throws ReferenceError at runtime (Rule 3 auto-fix)."
  - "Story.astro isMijnVerhaalPage guard extended to also match /about (EN slug for mijn-verhaal) to prevent circular teaser link on the EN story page."
  - "Newsletter.astro hardcoded Dutch strings (aria-label, placeholder, sentinel notes) made locale-conditional with ternary to avoid Dutch text on EN pages."
  - "Story.astro signature-role 'Founder, Coach & Spreker' made locale-conditional (EN: 'Founder, Coach & Speaker')."

metrics:
  duration: ~12 min
  completed: 2026-08-19
  tasks: 3
  commits: 3
  files_created: 4
  files_modified: 12

estimate:
  tokens: 95000

actuals:
  tokens: 72000
  tasks: 3
  commits: 3
---

# Phase 04 Plan 01: Wave-0 i18n Infra + Homepage EN Slice Summary

**One-liner:** Activated Astro's bilingual i18n system (NL root / EN under `/en/*`), created `en.ts` + `utils.ts` locale infrastructure, wired hreflang/lang into the shared layout, built a functional NL↔EN Nav switch, refactored all 7 homepage section components to `getStrings()`, and delivered the working `/en/` homepage — smoke-verified end-to-end.

## What Was Built

### Task 1: Wave-0 infra (en.ts + utils.ts + smoke script + astro.config.mjs)

- **`src/i18n/en.ts`**: Complete EN strings object matching nl.ts shape exactly — all 15 top-level keys, same array lengths. D-03 verbatim numbers (12+ years, 180 employees, 9 markets), D-01 testimonial names/roles byte-identical, D-02 "written in Dutch" notes in `newsletter.subtext`, `nieuwsbrief.subtext`, and `articles.heading`. Docblock marks it as draft for Milan review (D-03).
- **`src/i18n/utils.ts`**: `getStrings(locale)` helper; `Locale`/`Strings` types; `nlToEn`/`enToNl` slug maps for spreker↔speaking, mijn-verhaal↔about, nieuwsbrief↔newsletter. `DeepWiden<T>` utility type enables build-time structural shape check.
- **`scripts/smoke-i18n.js`**: Zero-dep ES module smoke check — verifies `dist/en/index.html` exists, `lang="en"`, root `lang="nl"`, three hreflang alternates on both pages, `/en/` URL in sitemap.
- **`astro.config.mjs`**: `locales: ['nl', 'en']`, sitemap `en: 'en'` (D-04 hreflang code), removed stale `prefixDefaultLocale: true` comment (D-05).

### Task 2: Locale-wire BaseLayout + BaseHead + Nav switch

- **`BaseLayout.astro`**: `lang={Astro.currentLocale ?? 'nl'}` on `<html>`, `getStrings` for skip-link, passes `locale`/`nlSlug`/`enSlug` props to BaseHead.
- **`BaseHead.astro`**: Three `<link rel="alternate">` hreflang tags (nl, en, x-default via `getAbsoluteLocaleUrl`), dynamic `og:locale` + `og:locale:alternate`.
- **`Nav.astro`**: Replaced `import {nl}` with `getStrings(Astro.currentLocale)`; locale-branched `navItems` (EN uses `getRelativeLocaleUrl`, NL keeps `BASE_URL` slugs); disabled `<span class="lang-switch">` replaced with functional `<a href={switchHref}>` showing the opposite locale label (I18N-01, D-07).

### Task 3: Homepage EN slice + section component refactors

- **7 homepage section components** (Hero, PressStrip, Samenwerken, Testimonials, Story, Newsletter, Articles): replaced `import {nl} from '../../i18n/nl'` with `getStrings(Astro.currentLocale)`. Zero remaining `i18n/nl` imports in any component.
- **`src/pages/en/index.astro`**: Thin wrapper → `/en/`; component tree identical to NL homepage; `Astro.currentLocale` is `'en'` automatically for all `/en/*` routes.
- **`src/pages/index.astro`**: Corrected stale comment that claimed Phase 4 would add `prefixDefaultLocale: true` and move NL to `/nl/*`.

## Verification

```
npm run build   → 0 errors, 7 pages built
node scripts/smoke-i18n.js → I18N_SMOKE_OK
```

Additional spot checks passing:
- `grep -c 'lang="en"' dist/en/index.html` → 1
- `grep -c 'lang="nl"' dist/index.html` → 1
- `grep -c 'hreflang=' dist/index.html` → 1 (contains nl + en + x-default)
- `grep -c 'written in Dutch' dist/en/index.html` → 2 (newsletter + articles)
- `grep -c 'Scale your business' dist/en/index.html` → 1 (EN H1 present)
- `grep -rc 'i18n/nl' src/components/sections/*.astro` → 0 for all files

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] `satisfies Record<Locale, Strings>` literal-type mismatch**
- **Found during:** Task 1 build
- **Issue:** `Strings = typeof nl` has `as const` literal types (`"Spreker"`, `"Coaching"` etc.). `en.ts` with `"Speaking"` cannot satisfy `typeof nl` — TypeScript errors on every EN string value.
- **Fix:** Created `DeepWiden<T>` recursive utility type that widens all leaf string literals to `string`, then used `{ nl, en } satisfies Record<Locale, DeepWiden<typeof nl>>`. Shape parity (key presence + nesting depth) is still enforced at build time.
- **Files modified:** `src/i18n/utils.ts`
- **Commit:** 886cca5

**2. [Rule 3 - Blocking] `smoke-i18n.js` CJS `require()` fails in ES module project**
- **Found during:** Task 3 smoke script run
- **Issue:** `package.json` contains `"type": "module"` — Node treats all `.js` files as ES modules; `require()` throws `ReferenceError`.
- **Fix:** Rewrote script using `import fs from 'fs'` / `import path from 'path'` / `import { fileURLToPath } from 'url'` and derived `__dirname` via `fileURLToPath(import.meta.url)`.
- **Files modified:** `scripts/smoke-i18n.js`
- **Commit:** 0955a45

**3. [Rule 2 - Missing critical] Story.astro isMijnVerhaalPage guard not extended to EN slug**
- **Found during:** Task 3 review
- **Issue:** Guard only checked `pathname.includes('mijn-verhaal')` — the EN equivalent `/en/about` would not be caught, allowing a circular self-link on the EN story page.
- **Fix:** Extended guard to `currentPath.includes('mijn-verhaal') || currentPath.includes('/about')`.
- **Files modified:** `src/components/sections/Story.astro`
- **Commit:** 0955a45

**4. [Rule 2 - Missing critical] Newsletter.astro and Story.astro hardcoded Dutch strings**
- **Found during:** Task 3 review
- **Issue:** Newsletter form `aria-label`, input `placeholder`, sentinel notes were hardcoded Dutch; Story `signature-role` had hardcoded "Spreker".
- **Fix:** Made each string locale-conditional with a simple `isEn ?` ternary; strings are short and not in nl.ts so no new string key was added.
- **Files modified:** `src/components/sections/Newsletter.astro`, `src/components/sections/Story.astro`
- **Commit:** 0955a45

## Commits

| Hash | Description |
|------|-------------|
| 886cca5 | feat(04-01): Wave-0 infra — en.ts + utils.ts + smoke script + config activation |
| 2437e24 | feat(04-01): Locale-wire BaseLayout + hreflang BaseHead + functional Nav switch |
| 0955a45 | feat(04-01): Homepage EN slice — refactor section components + /en/index.astro + smoke green |

## Known Stubs

None that prevent the plan's goal. The article cards remain placeholder (intentional — same as NL; controlled by `TODO_SUBSTACK_URL` sentinel). The EN copy is draft for Milan's review (D-03 — this is expected and documented).

## Threat Flags

No new threat surface introduced. The language switch uses `getRelativeLocaleUrl` with a fixed slug map — no user-supplied URL touches the href (T-04-01 mitigated). Static TypeScript const EN strings with no runtime interpolation (T-04-02 accepted). Slug map lookup uses a fixed keyset (T-04-03 mitigated).

## Self-Check: PASSED

- `src/i18n/en.ts` — created, contains all 15 keys
- `src/i18n/utils.ts` — created, exports getStrings/nlToEn/enToNl
- `scripts/smoke-i18n.js` — created, exits 0 with I18N_SMOKE_OK
- `src/pages/en/index.astro` — created, builds to dist/en/index.html
- `astro.config.mjs` — updated, locales=['nl','en'], sitemap en:'en'
- `src/layouts/BaseLayout.astro` — updated, lang={lang}
- `src/components/layout/BaseHead.astro` — updated, hreflang alternates
- `src/components/layout/Nav.astro` — updated, functional lang switch
- All 7 section components — 0 i18n/nl imports remaining
- `npm run build` — exits 0 (7 pages)
- `node scripts/smoke-i18n.js` — I18N_SMOKE_OK
- Commits 886cca5, 2437e24, 0955a45 — verified in git log
