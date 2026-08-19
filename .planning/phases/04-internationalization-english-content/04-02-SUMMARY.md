---
phase: 04-internationalization-english-content
plan: 02
subsystem: i18n
tags: [i18n, en-locale, hreflang, bilingual, footer, contact-form, en-pages]
status: complete

dependency_graph:
  requires:
    - 04-01 (en.ts, utils.ts, smoke-i18n.js, en/index.astro, locale-wired BaseLayout/BaseHead/Nav)
  provides:
    - src/pages/en/coaching.astro (/en/coaching)
    - src/pages/en/speaking.astro (/en/speaking — D-06 translated slug)
    - src/pages/en/about.astro (/en/about — D-06 translated slug)
    - src/pages/en/newsletter.astro (/en/newsletter — D-06 translated slug)
    - src/pages/en/contact.astro (/en/contact)
    - Footer locale-parameterized (EN footer links use translated slugs)
    - ContactForm locale-parameterized (EN labels, unchanged Web3Forms routing)
    - PlaceholderBadge locale-parameterized
    - Five NL pages migrated to getStrings with hreflang slug overrides
  affects:
    - All pages (Footer, ContactForm, PlaceholderBadge now locale-aware)
    - hreflang cross-links for spreker↔speaking, mijn-verhaal↔about, nieuwsbrief↔newsletter
    - NL↔EN switch now works page-to-page across all 6 pages

tech_stack:
  added: []
  patterns:
    - getStrings(Astro.currentLocale) — now applied to all shared components and all pages
    - nlSlug/enSlug BaseLayout props — used by translated-slug NL pages and EN wrappers
    - getRelativeLocaleUrl('en', slug) — all EN-internal CTAs

key_files:
  created:
    - src/pages/en/coaching.astro
    - src/pages/en/speaking.astro
    - src/pages/en/about.astro
    - src/pages/en/newsletter.astro
    - src/pages/en/contact.astro
  modified:
    - src/components/layout/Footer.astro
    - src/components/forms/ContactForm.astro
    - src/components/ui/PlaceholderBadge.astro
    - src/pages/coaching.astro
    - src/pages/spreker.astro
    - src/pages/mijn-verhaal.astro
    - src/pages/nieuwsbrief.astro
    - src/pages/contact.astro

decisions:
  - "Footer EN nav items use getRelativeLocaleUrl to translated slugs (speaking/newsletter/about) — this is the same pattern as Nav.astro from Plan 01, consistent across both nav components."
  - "COPYRIGHT_YEAR import removed from Footer.astro — now using t.footer.copyright which includes the full localized copyright string from en.ts/nl.ts."
  - "ContactForm's Web3Forms action, honeypot field, 7-state machine, and ?type= option values (algemeen/lezing/coaching) are byte-for-byte unchanged — only label strings change via getStrings (T-04-05 accepted)."
  - "PlaceholderBadge uses t.common.placeholderLabel as default — both NL and EN have '[Placeholder]' in this field (en.ts line 341), so no visible change on current placeholder cards."

metrics:
  duration: ~8 min
  completed: 2026-08-19
  tasks: 3
  commits: 3
  files_created: 5
  files_modified: 8

estimate:
  tokens: 100000

actuals:
  tokens: 68000
  tasks: 3
  commits: 3
---

# Phase 04 Plan 02: Five EN Page Wrappers + Component Refactor Summary

**One-liner:** Refactored the last three shared components (Footer, ContactForm, PlaceholderBadge) and all five NL page files from hardcoded `nl` imports to `getStrings(Astro.currentLocale)`, added hreflang slug overrides for translated-slug pages, and emitted five EN page wrappers at `/en/coaching`, `/en/speaking`, `/en/about`, `/en/newsletter`, `/en/contact` — completing the fully bilingual six-page site with zero remaining Dutch-only pages.

## What Was Built

### Task 1: Component refactor — Footer, ContactForm, PlaceholderBadge

- **`Footer.astro`**: Replaced `import { nl }` with `getStrings(Astro.currentLocale)`. Added `isEn` branch for `navItems` — EN nav links use `getRelativeLocaleUrl('en', 'speaking'|'newsletter'|'about'|'coaching')`, NL keeps `BASE_URL` slugs. All `nl.footer.*` refs → `t.footer.*`. Removed unused `COPYRIGHT_YEAR` import (now using `t.footer.copyright`). Footer aria-label and wordmark aria-label are locale-conditional.
- **`ContactForm.astro`**: Replaced `import { nl }` with `getStrings(Astro.currentLocale)`. All `nl.contact.*` destructured from `t.contact` instead. Web3Forms action, honeypot checkbox, 7-state machine, `?type=` option values `(algemeen|lezing|coaching)` — byte-for-byte unchanged. Data-* bridge on `<form>` element carries localized strings to the TypeScript island as before.
- **`PlaceholderBadge.astro`**: Replaced `import { nl }` with `getStrings(Astro.currentLocale)`. Default label uses `t.common.placeholderLabel`. Aria-label attribute kept as-is (Dutch text — the badge is a developer-facing marker for both locales).

### Task 2: Migrate five NL pages to getStrings + hreflang slug overrides

- **`coaching.astro`**: `getStrings(Astro.currentLocale)` + `t.coaching.*`. No slug override needed (coaching == coaching).
- **`spreker.astro`**: `getStrings` + `t.spreker.*`. Added `nlSlug="spreker" enSlug="speaking"` to `<BaseLayout>` — hreflang `en` alternate now correctly points to `/en/speaking`.
- **`mijn-verhaal.astro`**: `getStrings` + `t.mijnVerhaal.*` via `mv`. Added `nlSlug="mijn-verhaal" enSlug="about"` to `<BaseLayout>` — hreflang `en` alternate points to `/en/about`.
- **`nieuwsbrief.astro`**: `getStrings` + all `nl.nieuwsbrief.*`, `nl.articles.*`, `nl.common.*` refs → `t.*`. Added `nlSlug="nieuwsbrief" enSlug="newsletter"` to `<BaseLayout>`.
- **`contact.astro`**: `getStrings` + `t.contact.*`. No slug override needed.

### Task 3: Five EN page wrappers at translated slugs

- **`en/coaching.astro`** → `/en/coaching`: Mirrors NL coaching. Internal CTAs use `getRelativeLocaleUrl('en', 'contact')+'?type=coaching'` and `getRelativeLocaleUrl('en', 'about')`. No slug override needed.
- **`en/speaking.astro`** → `/en/speaking`: Mirrors NL spreker. `nlSlug="spreker" enSlug="speaking"`. CTAs use `getRelativeLocaleUrl('en', 'contact')+'?type=lezing'`.
- **`en/about.astro`** → `/en/about`: Mirrors NL mijn-verhaal. `nlSlug="mijn-verhaal" enSlug="about"`. CTAs use `getRelativeLocaleUrl('en', 'contact')` and `getRelativeLocaleUrl('en', 'speaking')`. Story.astro's isMijnVerhaalPage guard (extended in Plan 01 to match `/about`) prevents circular teaser link.
- **`en/newsletter.astro`** → `/en/newsletter`: Mirrors NL nieuwsbrief. `nlSlug="nieuwsbrief" enSlug="newsletter"`. D-02 honest note present in `t.nieuwsbrief.subtext` ("Written in Dutch."). RSS archive + PlaceholderBadge locale-aware.
- **`en/contact.astro`** → `/en/contact`: Mirrors NL contact. ContactForm reads `getStrings('en')` automatically via `Astro.currentLocale`. No new input surface introduced; Web3Forms routing unchanged.

## Verification

```
npm run build   → 0 errors, 12 pages built
node scripts/smoke-i18n.js → I18N_SMOKE_OK
```

Additional spot checks passing:
- `grep -rl "from.*i18n/nl" src/` → 0 files (zero direct nl imports remain)
- `grep "hreflang" dist/en/speaking/index.html` → nl→/spreker, en→/en/speaking, x-default→/spreker
- `grep "hreflang" dist/en/about/index.html` → nl→/mijn-verhaal, en→/en/about
- `grep "hreflang" dist/en/newsletter/index.html` → nl→/nieuwsbrief, en→/en/newsletter
- `grep -c 'lang="en"'` → 1 in each of the 5 EN subpages
- EN coaching contains internal link to `/en/contact` (not `/contact`)
- EN about contains internal link to `/en/speaking` (not `/spreker`)

## Deviations from Plan

None — plan executed exactly as written. The Footer EN nav was an additive improvement (locale-branching navItems) consistent with the Nav.astro pattern from Plan 01, not a deviation.

## Known Stubs

None that prevent the plan's goal. Article cards remain placeholder (same as NL; controlled by `TODO_SUBSTACK_URL` sentinel). EN copy is draft for Milan's review (D-03 — expected and documented in en.ts). The PlaceholderBadge `aria-label` remains in Dutch (`Placeholder inhoud — wordt vervangen door echte content`) — this is a developer-facing attribute on a marker pill, not user-facing copy, and both locales see it only on placeholder cards.

## Threat Flags

No new threat surface introduced. EN internal CTAs use `getRelativeLocaleUrl` from fixed slug maps — no user-supplied URL reflected (T-04-04 mitigated). EN ContactForm reuses existing hardened Web3Forms integration unchanged; only label strings change (T-04-05 accepted). hreflang absolute URLs emit only public site URLs via `getAbsoluteLocaleUrl` (T-04-06 accepted).

## Commits

| Hash | Description |
|------|-------------|
| f44e03e | feat(04-02): Task 1 — refactor Footer, ContactForm, PlaceholderBadge to getStrings |
| c4f8dc9 | feat(04-02): Task 2 — migrate five NL pages to getStrings + hreflang slug overrides |
| 7cda5d6 | feat(04-02): Task 3 — emit five EN page wrappers at translated slugs + smoke green |

## Self-Check: PASSED

- `src/pages/en/coaching.astro` — created, builds to dist/en/coaching/index.html
- `src/pages/en/speaking.astro` — created, builds to dist/en/speaking/index.html
- `src/pages/en/about.astro` — created, builds to dist/en/about/index.html
- `src/pages/en/newsletter.astro` — created, builds to dist/en/newsletter/index.html
- `src/pages/en/contact.astro` — created, builds to dist/en/contact/index.html
- `Footer.astro` — 0 `i18n/nl` imports, 1 `getStrings` call
- `ContactForm.astro` — 0 `i18n/nl` imports, 1 `getStrings` call
- `PlaceholderBadge.astro` — 0 `i18n/nl` imports, 1 `getStrings` call
- All 5 NL pages — 0 `i18n/nl` imports each
- `grep -rl "from.*i18n/nl" src/` — 0 files
- `npm run build` — exits 0 (12 pages)
- `node scripts/smoke-i18n.js` — I18N_SMOKE_OK
- Commits f44e03e, c4f8dc9, 7cda5d6 — verified in git log
