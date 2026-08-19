---
phase: 04-internationalization-english-content
verified: 2026-08-19T14:30:00Z
status: human_needed
score: 8/9 must-haves verified
behavior_unverified: 0
overrides_applied: 0
human_verification:
  - test: "Browser NL→EN switch on homepage — click 'EN' → land on /en/ in English, navigate to Coaching/Speaking/About/Newsletter/Contact via EN nav, confirm each stays English at translated slug"
    expected: "Each EN page loads in English, URL shows /en/coaching, /en/speaking, /en/about, /en/newsletter, /en/contact respectively. Switch on any EN subpage takes you to the equivalent NL page (e.g. /en/speaking → /spreker), not the NL homepage."
    why_human: "Nav active-state, slug detection, and focus-trap behavior on mobile require a real browser to confirm correct runtime wiring. Static HTML inspection confirmed links are correct but navigation flow requires manual validation."
  - test: "Screen-reader audit on EN pages — confirm no Dutch strings are announced to screen-reader users on visible/interactive elements"
    expected: "Wordmark aria-label ('naar startpagina'), Samenwerken section grid aria-label ('Samenwerkingsopties'), press strip logo chip aria-labels ('logo volgt'), and disabled Book tooltip ('Binnenkort beschikbaar') are the known remaining Dutch accessibility strings. Confirm whether these are acceptable for the milestone or should be fixed."
    why_human: "These are aria-label values on non-visible elements. Whether they constitute a UX defect for EN screen-reader users is a product decision — they do not affect visible copy but do affect screen-reader experience."
  - test: "Review EN copy quality and tone — skim all 6 EN pages for founder voice, factual accuracy, and translation naturalness (D-03)"
    expected: "Copy reads like natural International English in Milan's confident, honest founder voice. Numbers verbatim (12+ years, 180 employees, 9 markets). Testimonial names unchanged. No embellishment or omission of factual claims."
    why_human: "Copy quality and tone matching require human judgment; static verification confirmed structure and key invariants only."
  - test: "Sitemap hreflang coverage for translated-slug EN pages — confirm Google Search Console or sitemap validator shows correct cross-locale linking for /en/about, /en/newsletter, /en/speaking"
    expected: "Ideally xhtml:link alternates appear in sitemap for these three pages. Confirmed absent in dist/sitemap-0.xml (known @astrojs/sitemap limitation with translated slugs). The <link rel='alternate'> hreflang in each page's <head> IS correct; confirm whether this is sufficient for SEO purposes."
    why_human: "Sitemap xhtml:link absence vs page-level hreflang adequacy is an SEO judgment call requiring search console validation or an SEO tool."
---

# Phase 4: Internationalization & English Content — Verification Report

**Phase Goal:** Turn the i18n-ready structure into a working bilingual site with a real NL/EN switch and English content.
**Verified:** 2026-08-19T14:30:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Visiting /en/ renders homepage in English with `<html lang="en">`, while / stays Dutch with `<html lang="nl">` (I18N-02) | VERIFIED | `dist/en/index.html` opens with `<html lang="en">`, title "Milan van der Meulen — Founder Coach & Speaker"; `dist/index.html` opens with `<html lang="nl">`, title "...Spreker". Both confirmed in dist/. |
| 2 | The Nav NL/EN switch is a functional `<a>` that lands on the equivalent page in the other locale; locale persists via URL path across navigation (I18N-01, D-07) | VERIFIED | Built HTML shows `<a href="/milan-website/en/" class="lang-switch">` from NL home; `<a href="/milan-website/" class="lang-switch">` from EN home. spreker→`/en/speaking/`, mijn-verhaal→`/en/about/`, nieuwsbrief→`/en/newsletter/` all correct. No cookie/JS state needed — locale in URL path. |
| 3 | Every homepage `<head>` emits hreflang nl + en + x-default alternates and a locale-correct og:locale; sitemap includes both locales (SEO criterion 3, D-04) | VERIFIED | `dist/index.html` contains `hreflang="nl"`, `hreflang="en"`, `hreflang="x-default"` alternates pointing to full absolute URLs. `og:locale` = `nl_NL` (NL), `en_US` (EN). `dist/en/index.html` mirrors same three alternates. `dist/sitemap-0.xml` includes 6 `/en/*` URLs. **Warning:** translated-slug EN pages (en/about, en/newsletter, en/speaking) lack `xhtml:link` alternates in sitemap — known @astrojs/sitemap limitation; page-level hreflang IS correct and complete. |
| 4 | `en.ts` has the exact same key shape as `nl.ts`, enforced at build time by `satisfies Record<Locale, DeepWiden<typeof nl>>` (I18N-02) | VERIFIED | `src/i18n/utils.ts` line 48: `const _shapeCheck = { nl, en } satisfies Record<Locale, DeepWiden<typeof nl>>;`. Build exits 0 (12 pages), confirming the shape constraint passes. `DeepWiden<T>` widens leaf literals to `string` while enforcing key presence and nesting — confirmed correct fix for the `as const` literal-type mismatch. |
| 5 | Existing NL Dutch URLs stay at the site root (no /nl/ prefix); EN lives under /en/* (D-05) | VERIFIED | `astro.config.mjs` has `locales: ['nl', 'en']` with no `routing.prefixDefaultLocale: true`. `dist/` shows NL pages at root (`/coaching/`, `/spreker/` etc.) and EN pages at `/en/*`. No `/nl/` directory exists in dist/. |
| 6 | All five remaining pages exist in English at translated slugs: /en/coaching, /en/speaking, /en/about, /en/newsletter, /en/contact — each with English copy and `<html lang="en">` (I18N-02, D-06) | VERIFIED | All 6 directories confirmed in `dist/en/`: `coaching/`, `speaking/`, `about/`, `newsletter/`, `contact/`, `index.html`. Each contains `<html lang="en">` (1 match each). D-01 testimonial names Yang Soo Kloosterhof, Ruud Koornstra, Oranjewoud verbatim in dist. D-02 "written in Dutch" notes present in newsletter/articles sections. |
| 7 | The NL/EN switch on every page lands on the equivalent page via the slug map (I18N-01, D-07) — including translated slugs | VERIFIED | Spot-checked all translated-slug pairs: `/spreker` switch→`/en/speaking/` ✓; `/en/speaking` switch→`/spreker/` ✓; `/mijn-verhaal` switch→`/en/about/` ✓; `/nieuwsbrief` switch→`/en/newsletter/` ✓; `/en/newsletter` switch→`/nieuwsbrief/` ✓ (all confirmed from built dist/ HTML). |
| 8 | Every page's `<head>` emits correct hreflang alternates that cross-link the matching NL and EN slugs (SEO criterion 3) | VERIFIED | `/en/speaking/`: `hreflang="nl"` → `/spreker/`, `hreflang="en"` → `/en/speaking/`, `hreflang="x-default"` → `/spreker/`. `/en/about/`: nl→`/mijn-verhaal/`, en→`/en/about/`. `/en/newsletter/`: nl→`/nieuwsbrief/`, en→`/en/newsletter/`. All confirmed in built HTML. |
| 9 | No source file under src/ still imports i18n/nl directly — every string comes through `getStrings(Astro.currentLocale)` (I18N-02) | VERIFIED | `grep -rl "from.*i18n/nl" src/` excluding `utils.ts` returns 0 files. Zero direct `nl` imports remain across all components, layouts, and pages. |

**Score:** 8/9 truths verified (1 routed to human verification for browser testing + accessibility audit; 0 failed)

**Note on truth 2:** The switch wiring is verified in built HTML. The human verification item is for confirming full navigation flow in browser — not a FAILED finding, but runtime behavior requires human confirmation per Step 3 classification rules for interactive navigation invariants.

---

### Deferred Items

None — all roadmap success criteria are addressed in this phase.

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/i18n/en.ts` | EN strings object, mirrors nl.ts | VERIFIED | Exists, 15 top-level keys, D-01/D-02/D-03 honored, docblock marks as draft |
| `src/i18n/utils.ts` | getStrings helper + slug maps + shape check | VERIFIED | Exports getStrings, Locale, Strings, nlToEn, enToNl; WR-01 collision guard added |
| `scripts/smoke-i18n.js` | Post-build smoke check, exits 0 | VERIFIED | ES module (type:module compatible), exits 0 with I18N_SMOKE_OK on current dist/ |
| `src/pages/en/index.astro` | EN homepage wrapper → /en/ | VERIFIED | Exists; thin wrapper with correct component tree; no getStrings import needed post-CR-02 fix |
| `src/pages/en/coaching.astro` | EN coaching → /en/coaching | VERIFIED | Exists; builds to dist/en/coaching/index.html with lang="en" |
| `src/pages/en/speaking.astro` | EN speaking → /en/speaking (D-06) | VERIFIED | Exists; nlSlug="spreker" enSlug="speaking"; builds correctly |
| `src/pages/en/about.astro` | EN about → /en/about (D-06) | VERIFIED | Exists; nlSlug="mijn-verhaal" enSlug="about"; builds correctly |
| `src/pages/en/newsletter.astro` | EN newsletter → /en/newsletter (D-06) | VERIFIED | Exists; nlSlug="nieuwsbrief" enSlug="newsletter"; D-02 note present |
| `src/pages/en/contact.astro` | EN contact → /en/contact | VERIFIED | Exists; Web3Forms routing unchanged; English labels and emailSubject |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `getStrings(Astro.currentLocale)` | en.ts / nl.ts | locale === 'en' branch in utils.ts | VERIFIED | Returns strings.en for 'en', strings.nl for anything else |
| Nav lang switch | equivalent page in other locale | nlToEn / enToNl slug maps + getRelativeLocaleUrl | VERIFIED | All 6 NL pages switch to correct EN slug; all 6 EN pages switch to correct NL slug |
| BaseHead hreflang | absolute locale URLs | getAbsoluteLocaleUrl('nl', effectiveNlSlug) + ('en', effectiveEnSlug) | VERIFIED | nlSlug/enSlug props forwarded BaseLayout→BaseHead; translated-slug pages pass explicit overrides |
| EN nav items | /en/* pages | getRelativeLocaleUrl('en', slug) | VERIFIED | EN navItems use getRelativeLocaleUrl; NL keeps BASE_URL slugs |
| ContactForm emailSubject | locale-aware value | t.contact.emailSubject from getStrings | VERIFIED | EN contact renders "New message via milanvandermeulen.nl"; NL renders Dutch equivalent |

---

### Data-Flow Trace (Level 4)

Phase 4 is a translation/i18n layer over a static site — all data flows from static const objects (en.ts / nl.ts) through getStrings(). No dynamic data fetches were added. The existing Articles RSS sentinel and newsletter Substack placeholder are unchanged from Phase 3.

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|--------------|--------|-------------------|--------|
| All EN section components | `t.*` (translated strings) | `getStrings('en')` → `en.ts` static const | Yes — build-time static | FLOWING |
| BaseHead hreflang hrefs | nlAbsUrl / enAbsUrl | `getAbsoluteLocaleUrl()` from astro:i18n | Yes — computed from Astro.url + site config | FLOWING |
| Nav switch switchHref | `getRelativeLocaleUrl(oppositeLocale, oppositeSlug)` | nlToEn / enToNl maps | Yes — derived from fixed slug map | FLOWING |

---

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| Smoke test: EN homepage exists with lang=en, NL hreflang, sitemap /en/ | `node scripts/smoke-i18n.js` | `I18N_SMOKE_OK` | PASS |
| All 6 EN pages have lang=en | grep loop on dist/en/ | 1 match each in all 6 files | PASS |
| Zero direct i18n/nl imports in src/ (except utils.ts) | `grep -rl "from.*i18n/nl" src/` | 0 files | PASS |
| EN contact page shows English email subject | grep dist/en/contact/index.html | "New message via milanvandermeulen.nl" | PASS |
| NL contact page retains Dutch email subject | grep dist/contact/index.html | "Nieuw bericht via milanvandermeulen.nl" | PASS |
| Translated-slug hreflang: /en/speaking ↔ /spreker | grep dist/en/speaking/index.html | nl→/spreker/, en→/en/speaking/ | PASS |
| D-01 testimonial names verbatim in EN | grep dist/en/index.html | Yang Soo Kloosterhof, Ruud Koornstra, Oranjewoud present | PASS |
| D-02 "written in Dutch" in EN newsletter section | grep dist/en/index.html | "The newsletter is written in Dutch." | PASS |
| D-03 verbatim numbers in EN hero | grep dist/en/index.html | "180 employees", "12+ year" | PASS |

---

### Probe Execution

No formal probe scripts declared beyond `scripts/smoke-i18n.js` (verified above as PASS).

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|------------|------------|-------------|--------|----------|
| I18N-01 | 04-01-PLAN.md, 04-02-PLAN.md | Functional NL/EN language switch | SATISFIED | Nav switch is a functional `<a>` with correct hrefs for all 6 pages in both locales, verified in dist/ HTML |
| I18N-02 | 04-01-PLAN.md, 04-02-PLAN.md | English translations of homepage and pages | SATISFIED | All 6 EN pages exist at translated slugs, en.ts has 15 keys matching nl.ts shape, D-01/D-02/D-03 honored |

Both requirements covered by both plans. No orphaned requirements for Phase 4.

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `src/components/sections/Samenwerken.astro` | 104 | `aria-label="Samenwerkingsopties"` hardcoded Dutch on EN pages | WARNING | Screen-reader users on EN pages hear Dutch on the offers grid. Not user-visible copy. Not flagged in 04-REVIEW.md; not in review-fix scope. |
| `src/components/layout/Nav.astro` | 85 | `aria-label={\`${SITE_NAME} — naar startpagina\`}` hardcoded Dutch on EN pages | WARNING | Screen-reader users on EN pages hear "naar startpagina" (Dutch for "to homepage") for the wordmark. Not in review-fix scope. |
| `dist/en/index.html` (runtime) | — | Press strip logo chips: `aria-label="MT Sprout — logo volgt"` etc. (Dutch on EN pages) | INFO | "logo volgt" is a developer/placeholder marker. Screen-reader-only, not user-visible. These are existing placeholder strings from Phase 1 (HOME-10); Phase 4 didn't address press strip chip aria-labels. |
| `src/config.ts` | — | `DISABLED_TOOLTIP = 'Binnenkort beschikbaar'` (Dutch) renders on EN "Book" nav item | INFO | Disabled "Book" nav item tooltip appears in Dutch on EN pages. Existing Phase 1 behavior; Phase 4 scope was to make the switch and content bilingual — disabled placeholders were not in scope. |
| Sitemap | — | `en/about`, `en/newsletter`, `en/speaking` lack `xhtml:link` alternates | WARNING | Sitemap plugin cannot auto-detect NL↔EN slug mapping for translated slugs. Page-level `<link rel="alternate">` hreflang IS correct. Known @astrojs/sitemap limitation with non-identical slugs. |

No TBD/FIXME/XXX markers found in phase-modified source files (these exist only in comments documenting future work, e.g. LinkedIn URL — pre-existing from Phase 1).

---

### Human Verification Required

#### 1. Full navigation flow in browser (language switch + EN nav persistence)

**Test:** Run `npm run dev`. On homepage `/`, click the language switch ("EN") → should land on `/en/` in English. From `/en/`, navigate to Coaching, Speaking, About, Newsletter, Contact via the nav — each should stay English and use the translated slug (`/en/speaking`, `/en/about`, `/en/newsletter`). On an EN subpage (e.g. `/en/speaking`), click the switch → should land on the equivalent Dutch page (`/spreker`), not the NL homepage.

**Expected:** Complete round-trip navigation stays in the correct locale. Active nav state highlights the current page. Mobile hamburger panel shows correct EN labels.

**Why human:** Static HTML confirms links are correct. Runtime navigation wiring (URL routing, active state detection, focus trap) requires a real browser. These are interactive flow invariants that grep cannot exercise.

---

#### 2. Screen-reader accessibility audit for residual Dutch strings

**Test:** Use VoiceOver (macOS) or NVDA (Windows) on `/en/` and `/en/speaking`. Listen for:
- Wordmark aria-label: "Milan van der Meulen — naar startpagina" (Dutch "to homepage")
- Samenwerken grid: "Samenwerkingsopties" (Dutch "collaboration options")
- Press strip chips: "[Logo name] — logo volgt" (Dutch "logo follows")
- Disabled Book nav item: "Binnenkort beschikbaar" (Dutch "coming soon")

**Expected:** Product decision needed: either accept these Dutch accessibility strings (all are non-visible, non-interactive copy in placeholder/static contexts) or fix them for full screen-reader EN experience.

**Why human:** These are aria-label values on non-visible or disabled elements. Whether they constitute an acceptable UX limitation vs. an accessibility gap requires a product/accessibility judgment call, not automated verification.

---

#### 3. EN copy quality and tone review (D-03)

**Test:** Skim all 6 EN pages for tone, naturalness, and factual accuracy. The `en.ts` docblock marks it as a draft for Milan's review.

**Expected:** Copy reads as natural International English in Milan's confident, honest, direct founder voice. Numbers verbatim (12+ years, 180 employees, 9 markets). No embellishment. Testimonial quotes are faithful English translations, names/roles unchanged.

**Why human:** Copy quality and tone judgment cannot be automated. D-03 explicitly flags EN copy as Milan-review draft.

---

#### 4. Sitemap xhtml:link coverage for translated-slug EN pages (SEO judgment)

**Test:** Validate `dist/sitemap-0.xml` in a sitemap validator or Google Search Console. Confirm whether the absence of `xhtml:link` alternates on `en/about`, `en/newsletter`, `en/speaking` causes SEO issues, given that page-level `<link rel="alternate">` hreflang IS present.

**Expected:** Google's guidance accepts page-level hreflang as the primary signal; sitemap hreflang is supplementary. However, confirm this is acceptable for the project's SEO strategy.

**Why human:** SEO tool output and search console validation required. The page-level hreflang is correct; whether the missing sitemap alternates need a workaround is a product/SEO call.

---

### Gaps Summary

No BLOCKER gaps were found. The phase goal — a working bilingual site with NL/EN switch and English content — is substantively achieved and verified in the built output. All code review findings (CR-01..CR-04, WR-01..WR-06) have been applied and confirmed in the built HTML.

Four items require human decision/validation before the phase can be marked fully closed:
1. Runtime navigation flow (interactive behavior in browser)
2. Residual Dutch accessibility strings on EN pages (4 instances — scope/product decision)
3. EN copy quality sign-off (D-03 Milan review)
4. Sitemap xhtml:link gap for translated-slug EN pages (SEO judgment)

The residual Dutch aria-labels (Samenwerken grid label, wordmark href label, press strip chip labels, disabled tooltip) are WARNING-level observations not identified in the 04-REVIEW.md. They do not block the phase goal but should be recorded for the next developer session.

---

_Verified: 2026-08-19T14:30:00Z_
_Verifier: Claude (gsd-verifier)_
