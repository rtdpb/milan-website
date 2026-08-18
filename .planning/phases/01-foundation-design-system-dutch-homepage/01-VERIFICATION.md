---
phase: 01-foundation-design-system-dutch-homepage
verified: 2026-08-18T19:05:00Z
status: passed
score: 20/21 must-haves verified
behavior_unverified: 0
overrides_applied: 0
human_verification_resolved: "2026-08-18 — user approved all 4 human-verify items against the live deployment (https://rtdpb.github.io/milan-website/) with 'approved — continue and complete phase 1'. Post-verification code-review fixes (WR-01/03/04/05/06 + docx hero subtext) were applied, rebuilt, and redeployed before completion."
human_verification:
  - test: "Open the built site (npm run build && npm run preview) on desktop (>=1200px), tablet (~768px), and mobile (~375px) and confirm: (1) split-card hero stacks text-then-image on mobile; (2) press strip scrolls horizontally on 375px without clipping; (3) hero H1 wraps gracefully; (4) story reading column does not overflow; (5) mobile hamburger opens/closes an accessible nav panel; (6) card grid stacks correctly; (7) Testimonials mosaic mixed-size layout renders correctly on desktop."
    expected: "High-quality responsive layout that looks editorial and premium across all three breakpoints. The page does not read as 'covered in yellow' (D-02). Sections are visually distinguished. The dark Story band is dramatic and readable."
    why_human: "Responsive visual quality, layout fidelity, and the editorial/premium feel cannot be verified by grep or DOM inspection. Automated checks confirm correctness of structure but not visual quality."
  - test: "Click the hero 'Mijn verhaal' secondary CTA and confirm it smooth-scrolls to the Story section (#verhaal anchor)."
    expected: "The page scrolls to the dark Story band with heading 'Waarom ik nu mijn lessen deel'."
    why_human: "In-page anchor scroll behavior is a runtime/browser behavior — dist/index.html confirms href='#verhaal' and id='verhaal' exist, but smooth-scroll behavior requires a browser."
  - test: "Enable 'Reduce motion' in OS/DevTools accessibility settings, reload, and scroll the page. Confirm scroll-reveal animations (fade/translate) do not fire and all content remains visible."
    expected: "No fade-in or translate-Y animations under reduced motion. Content is immediately fully visible."
    why_human: "prefers-reduced-motion behavior is a runtime CSS/JS interaction — the code (RevealOnScroll.astro) has the guard implemented and verified by grep, but the actual suppression of animations requires a browser test."
  - test: "Confirm every future-destination CTA/nav item (Contact, Coaching, Spreker, Nieuwsbrief nav, Boek, NL|EN switch, LinkedIn, Boek lezing, Plan kennismaking, Schrijf je gratis in, Lees verder x3, Alle artikelen) is visually clearly disabled — cursor changes, opacity reduces — and the newsletter form does NOT fake a success state on any interaction."
    expected: "No button silently activates. Disabled CTAs have reduced opacity and a not-allowed cursor. The newsletter submit does not show a thank-you or redirect."
    why_human: "Visual disabled affordance styling and interaction behavior (cursor, opacity appearance) requires visual inspection and clicking in a browser."
---

# Phase 1: Foundation, Design System & Dutch Homepage — Verification Report

**Phase Goal:** Deliver a premium, editorial, fully responsive Dutch homepage matching the docx, built on an Astro foundation with a reusable design system and an optimized image pipeline — the credible first impression that drives coaching/speaking leads and newsletter signups.
**Verified:** 2026-08-18T19:05:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

---

## Goal Achievement

### ROADMAP Success Criteria (5 of 5 automated; 1 pending human)

| # | Success Criterion | Status | Evidence |
|---|------------------|--------|---------|
| 1 | All docx sections render with supplied copy intact | VERIFIED | Hero H1, USPs, all 3 testimonial attributions, story heading, newsletter heading, articles heading all confirmed verbatim in dist/index.html. Section order: Hero → PressStrip → Samenwerken → Testimonials → Story → Newsletter → Articles. |
| 2 | Layout is high-quality and responsive; animations subtle and respect reduced-motion | PRESENT_BEHAVIOR_UNVERIFIED | RevealOnScroll.astro contains both JS guard and CSS fallback for prefers-reduced-motion (grep confirms 4 occurrences). Responsive CSS breakpoints are present in all section components. Visual quality and runtime animation suppression require human confirmation. |
| 3 | Only optimized AVIF/WebP derivatives in production; originals never committed/served | VERIFIED | dist/_astro/ contains 9 AVIF files and multiple WebP. Hero image has no JPG derivative. Story portrait JPGs are all under 300KB (max 278KB). .gitignore excludes fotos/, assets/originals/, *.zip. |
| 4 | Every known-destination CTA works; unknown ones clearly disabled; placeholders marked | VERIFIED | `grep -rE 'href="#"\|href=""' dist/` returns 0 hits. aria-disabled count in built HTML = 24. 6 press outlet names present as text placeholder chips. PlaceholderBadge on all 3 article cards. |
| 5 | Baseline SEO/a11y/perf pass; brand font is a swappable variable | VERIFIED | Single `<h1>` confirmed. JSON-LD Person schema, canonical, og:*, twitter:* all present. lang="nl". sitemap-index.xml and robots.txt in dist/. No /nl/ route. --font-display variable with Naste swap comment documented in tokens.css. |

---

### Observable Truths (All Plans Combined)

| # | Truth | Status | Evidence |
|---|-------|--------|---------|
| 1 | A visitor loading / sees the split-card Hero with H1 'Je bedrijf schalen, zonder jezelf te verliezen', subtext, two CTAs and the USP row | VERIFIED | H1 confirmed in dist/index.html (count: 1). USPs "12+ jaar · 180 medewerkers · 9 markten" present. Both CTAs rendered (Contact disabled, Mijn verhaal anchors to #verhaal). |
| 2 | The hero photo renders as an optimized AVIF/WebP derivative, eager-loaded with fetchpriority high (LCP image) | VERIFIED | dist/_astro/ contains milan-hero-stage AVIF (4 files) and WebP (5 files) — zero JPG fallback for hero. loading="eager" count: 2. fetchpriority="high" count: 2. |
| 3 | npm run build exits 0 and produces dist/index.html | VERIFIED | Build run confirmed exit 0 with "1 page(s) built in 335ms". dist/index.html exists. |
| 4 | dist/ contains no full-res original jpg (>300KB) and no committed originals | VERIFIED | All JPGs in dist/_astro/ are derivatives: max size 278KB (story portrait). No *.zip in dist/. .gitignore excludes fotos/, assets/originals/. |
| 5 | Built HTML head contains title, canonical, og:title and a JSON-LD Person block | VERIFIED | application/ld+json: 1, rel="canonical": 1, og:title: 1 — all confirmed in dist/index.html. |
| 6 | Design tokens (--color-*, --font-display, --font-body, --text-*, --space-*) are defined at :root | VERIFIED | tokens.css contains full type ramp (--text-xs to --text-5xl), spacing ramp (--space-xs to --space-5xl), all color tokens at :root. --font-display and --font-body defined with Naste swap comment. |
| 7 | astro.config.mjs sets site, output static, i18n defaultLocale nl with no /nl/ route prefix, and the sitemap integration | VERIFIED | astro.config.mjs: output: 'static', i18n.defaultLocale: 'nl', sitemap integration configured. No /nl/ directory in dist/. Note: site is 'https://rtdpb.github.io' + base: '/milan-website/' for GitHub Pages — intentional per instructions. |
| 8 | A visitor sees the sticky site header with wordmark, 5 nav items, Contact CTA, NL|EN affordance and a LinkedIn icon | VERIFIED | aria-label="Hoofdnavigatie" confirmed in dist/. All 5 nav labels (Coaching, Spreker, Nieuwsbrief, Boek, and Mijn verhaal) present in built HTML. aria-expanded present (mobile toggle). aria-disabled count: 24 (all unknown destinations disabled). |
| 9 | On mobile the hamburger toggle opens and closes a nav panel via keyboard and click | PRESENT_BEHAVIOR_UNVERIFIED | aria-expanded and aria-controls present in built HTML. Nav.astro contains a vanilla-JS island for mobile toggle. Runtime behavior (keyboard, Escape key, focus management) requires browser test. |
| 10 | A visitor sees the site footer with wordmark, nav links, LinkedIn, and legal/copyright | VERIFIED | `<footer>` present in dist/index.html (count: 2 — open + close tags). Footer contains wordmark, disabled nav links, disabled LinkedIn, copyright/legal text. |
| 11 | Every nav item and CTA with an unknown destination is rendered disabled (aria-disabled), never a fake working link | VERIFIED | aria-disabled="true" count in dist/index.html: 24. No href="#" or href="" anywhere in dist/. All placeholder destinations use TODO_ constants from config.ts. |
| 12 | Reusable Button, Card, SectionWrapper and PlaceholderBadge components exist and are token-styled | VERIFIED | All 4 files confirmed: src/components/ui/Button.astro, Card.astro, SectionWrapper.astro, PlaceholderBadge.astro. Button.astro contains aria-disabled (count: 3) and no href="#". |
| 13 | All Dutch UI strings and placeholder destinations live in nl.ts + config.ts | VERIFIED | src/i18n/nl.ts: 'export const nl' confirmed. src/config.ts: TODO_SUBSTACK_URL and TODO_CONTACT_URL confirmed. Nav, Samenwerken, Newsletter all import from these single-source modules. |
| 14 | A visitor sees a slim 'Bekend van' press strip directly under the hero with 6 clearly-marked placeholder logo chips | VERIFIED | "Bekend van" present in dist/index.html. All 6 outlets confirmed: MT Sprout, Quote, NOS, EenVandaag, Telegraaf, De Ondernemer. No `<img>` in PressStrip.astro (text-only chips). |
| 15 | A visitor sees the 'Samenwerken' section as a 3-card commitment ladder with disabled CTAs | VERIFIED | "Samenwerken" present in dist/. All 3 CTA labels confirmed in dist/: "Schrijf je gratis in", "Boek lezing", "Plan kennismaking". aria-disabled on each. No href="#". Button component wired (19 references in Samenwerken.astro). |
| 16 | A visitor sees testimonials with the 3 supplied quotes and exact attributions | VERIFIED | Yang Soo Kloosterhof, Ruud Koornstra, Oranjewoud Export Academy all confirmed in dist/index.html. RevealOnScroll used (8 references in Testimonials.astro). |
| 17 | A visitor sees the full-width dark 'Waarom ik nu mijn lessen deel' story band | VERIFIED | Story heading confirmed in dist/index.html (count: 1 — from nl.story.heading via nl.ts). id="verhaal" confirmed in SectionWrapper. Story portrait served as AVIF/WebP (dist/_astro/milan-story-portrait.* files). |
| 18 | Scroll-reveal animations are suppressed under prefers-reduced-motion | PRESENT_BEHAVIOR_UNVERIFIED | RevealOnScroll.astro has prefers-reduced-motion in both CSS (4 occurrences) and JS guard. IntersectionObserver implementation confirmed. Runtime behavior requires browser test. |
| 19 | A visitor sees a newsletter signup section with a naam + mailadres form and disabled submit | VERIFIED | "Mailadres" present in dist/. for="nl-naam" and for="nl-email" labels confirmed in Newsletter.astro. TODO_SUBSTACK_URL reference confirmed (7 occurrences). No href="#" in source (comment only). No fake success state. |
| 20 | A visitor sees 'Recente artikelen' with 3 placeholder cards, each clearly flagged | VERIFIED | "Recente artikelen" present in dist/index.html. PlaceholderBadge used 3 times in Articles.astro. TODO placeholder comments present. Disabled "Lees verder" and "Alle artikelen" links. |
| 21 | The homepage renders all docx sections in order: Hero → PressStrip → Samenwerken → Testimonials → Story → Newsletter → Articles | VERIFIED | index.astro imports all 7 sections in documented order. Source order in dist/index.html confirmed: "Je bedrijf schalen" → "Bekend van" → "Samenwerken" → Kloosterhof/Koornstra/Oranjewoud → "Waarom ik nu mijn lessen deel" → "Blijf op de hoogte" → "Recente artikelen". |

**Score:** 18/21 truths verified (3 present, behavior-unverified — rows 2, 9, 18)

Note: Rows 2 and 18 are only partially behavior-unverified (artifacts/mobile toggle and reduced-motion runtime behavior); rows 1, 3, 5, 7 are fully verified. The PRESENT_BEHAVIOR_UNVERIFIED items are about runtime interactions that grep cannot confirm.

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `astro.config.mjs` | Astro config: site, static output, i18n nl default, sitemap, sharp | VERIFIED | All confirmed. GitHub Pages base path intentional. |
| `src/styles/tokens.css` | All design tokens at :root, @font-face comment | VERIFIED | Full token set confirmed; @font-face moved to BaseHead (base-path aware) with comment explaining why. |
| `src/components/layout/BaseHead.astro` | SEO head, JSON-LD, font preloads | VERIFIED | application/ld+json, canonical, og:title, twitter:*, font preload `<link>` elements all confirmed. |
| `src/layouts/BaseLayout.astro` | html lang="nl", global CSS, Nav, Footer, main landmark | VERIFIED | lang="nl" on `<html>`. Imports global.css, Nav, Footer. main#main-content present. |
| `src/components/sections/Hero.astro` | Split-card hero with Picture (priority), H1, CTAs, USPs | VERIFIED | priority attribute on Picture, H1 correct, CTAs present, USPs correct. |
| `src/pages/index.astro` | NL homepage at / rendering BaseLayout + all 7 sections | VERIFIED | All 7 sections imported and rendered in correct order. |
| `.gitignore` | Excludes fotos/, assets/originals/, dist/, *.zip | VERIFIED | Confirmed: fotos/, assets/originals/, *.zip all excluded. |
| `src/components/ui/Button.astro` | CTA variants + honest disabled state | VERIFIED | aria-disabled present (3 occurrences). No href="#". |
| `src/components/ui/Card.astro` | Rounded card shell | VERIFIED | File exists. |
| `src/components/ui/SectionWrapper.astro` | Max-width container, section landmark, dark variant | VERIFIED | 'section' confirmed in artifact. |
| `src/components/ui/PlaceholderBadge.astro` | Visible [Placeholder] marker pill | VERIFIED | 'Placeholder' confirmed in artifact. |
| `src/components/layout/Nav.astro` | Sticky header: wordmark, nav items, CTA, NL|EN, LinkedIn, mobile toggle | VERIFIED | aria-disabled, aria-label="Hoofdnavigatie", aria-expanded all confirmed in built HTML. |
| `src/components/layout/Footer.astro` | Footer: wordmark, nav links, LinkedIn, legal/copyright | VERIFIED | `<footer>` in dist/, Footer.astro contains 'footer'. |
| `src/i18n/nl.ts` | All Dutch UI strings as typed const | VERIFIED | 'export const nl' confirmed. All section headings present. |
| `src/config.ts` | Single source for TODO_ placeholder destinations | VERIFIED | TODO_SUBSTACK_URL and TODO_CONTACT_URL confirmed. |
| `src/components/ui/RevealOnScroll.astro` | IntersectionObserver + prefers-reduced-motion guard | VERIFIED | IntersectionObserver (3 occurrences) and prefers-reduced-motion (4 occurrences) confirmed. |
| `src/components/sections/PressStrip.astro` | Slim credibility band, 6 placeholder chips | VERIFIED | 'Bekend van' in artifact. All 6 outlet names in dist/. No `<img>`. |
| `src/components/sections/Samenwerken.astro` | 3-card ladder with disabled CTAs | VERIFIED | 'Samenwerken' confirmed. All 3 CTA labels confirmed. Button wired (19 refs). |
| `src/components/sections/Testimonials.astro` | 3 quotes with verbatim attributions | VERIFIED | All 3 attributions confirmed in dist/. RevealOnScroll wired (8 refs). |
| `src/components/sections/Story.astro` | Full-width dark band, verbatim copy, #verhaal anchor | VERIFIED | id="verhaal" on SectionWrapper. Heading via nl.ts confirmed in dist/. Portrait as AVIF/WebP. |
| `src/components/sections/Newsletter.astro` | Heading, labelled form, disabled Substack submit | VERIFIED | for="nl-naam" and for="nl-email" confirmed. TODO_SUBSTACK_URL referenced. No href="#" in markup. |
| `src/components/sections/Articles.astro` | 3 placeholder cards, PlaceholderBadge, TODO comments | VERIFIED | PlaceholderBadge (3 refs), 'Recente artikelen' confirmed. Disabled "Lees verder"/"Alle artikelen". |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|----|--------|---------|
| src/pages/index.astro | src/layouts/BaseLayout.astro | imports and wraps in BaseLayout | WIRED | BaseLayout import confirmed in index.astro |
| src/layouts/BaseLayout.astro | src/styles/tokens.css | global CSS import (via global.css) | WIRED | global.css import in BaseLayout.astro confirmed |
| src/layouts/BaseLayout.astro | src/components/layout/Nav.astro | renders Nav in body | WIRED | Nav import confirmed in BaseLayout.astro |
| src/components/sections/Hero.astro | src/assets/photos/milan-hero-stage.jpg | import + Picture AVIF/WebP derivatives | WIRED | Import confirmed. AVIF/WebP derivatives in dist/_astro/ |
| src/components/sections/Hero.astro | src/components/sections/Story.astro | href="#verhaal" → id="verhaal" | WIRED | href="#verhaal" in dist/ (count: 2). id="verhaal" in dist/ (count: 1). |
| src/layouts/BaseLayout.astro | src/components/layout/Footer.astro | renders Footer before closing body | WIRED | Footer import confirmed in BaseLayout.astro |
| src/components/layout/Nav.astro | src/i18n/nl.ts | nav strings from nl | WIRED | nl. references confirmed in Nav.astro |
| src/components/ui/Button.astro | src/config.ts | disabled CTAs use TODO_ constants | WIRED | placeholderReason pattern wired; config.ts imported in all consumers |
| src/components/sections/Samenwerken.astro | src/components/ui/Button.astro | disabled card CTAs | WIRED | Button referenced 19 times in Samenwerken.astro |
| src/components/sections/Samenwerken.astro | src/i18n/nl.ts | card copy from nl.samenwerken | WIRED | nl.samenwerken referenced in Samenwerken.astro |
| src/components/sections/Story.astro | src/assets/photos/milan-story-portrait.jpg | astro:assets Picture (lazy) AVIF/WebP | WIRED | portrait import confirmed; derivatives in dist/_astro/ |
| src/components/sections/Testimonials.astro | src/components/ui/RevealOnScroll.astro | scroll-reveal wrapping cards | WIRED | RevealOnScroll referenced 8 times in Testimonials.astro |
| src/components/sections/Newsletter.astro | src/config.ts | disabled submit → TODO_SUBSTACK_URL | WIRED | TODO_SUBSTACK_URL referenced 7 times in Newsletter.astro |
| src/components/sections/Articles.astro | src/components/ui/PlaceholderBadge.astro | visible placeholder marker on each card | WIRED | PlaceholderBadge referenced 3 times in Articles.astro |
| src/pages/index.astro | src/components/sections/Newsletter.astro | all sections in document order | WIRED | All 7 section imports confirmed in index.astro |

---

### Data-Flow Trace (Level 4)

This is a static Astro site — all content is authored directly in components or sourced from nl.ts (a typed TypeScript const). There are no backend queries, API calls, or database reads. All content is compile-time static.

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|--------------|--------|--------------------|--------|
| Hero.astro | H1 copy, USPs | Inline authored Dutch copy | Yes (supplied docx copy) | FLOWING |
| Testimonials.astro | Quote text, attributions | Inline in component (nl.ts patterns) | Yes (supplied quotes) | FLOWING |
| Story.astro | heading, body, signature | nl.story.* from src/i18n/nl.ts | Yes (supplied copy) | FLOWING |
| Newsletter.astro | Heading, labels | nl.newsletter.* from src/i18n/nl.ts | Yes (authored strings) | FLOWING |
| Articles.astro | Article card data | Typed const array (isPlaceholder: true) | Yes (clearly placeholder, documented) | FLOWING |
| PressStrip.astro | Outlet names | Inline/nl.pressStrip | Yes (text placeholder chips) | FLOWING |

No static returns or disconnected props found. Placeholder data is intentional and visibly marked per D-10/D-11.

---

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| npm run build exits 0 | `npm run build` | "1 page(s) built in 335ms" — Complete! | PASS |
| Single h1 in built HTML | `grep -c '<h1' dist/index.html` | 1 | PASS |
| JSON-LD, canonical, og:title in head | grep commands | All 3: count 1 | PASS |
| lang="nl" on html element | `grep -c 'lang="nl"' dist/index.html` | 1 | PASS |
| fetchpriority="high" on LCP image | `grep -c 'fetchpriority="high"'` | 2 (source + img) | PASS |
| AVIF derivatives in dist/ | `ls dist/_astro/ \| grep '\.avif$' \| wc -l` | 9 | PASS |
| No href="#" or href="" in dist/ | `grep -rE 'href="#"\|href=""' dist/` | 0 matches | PASS |
| No JPG >300KB in dist/ | `ls -la dist/_astro/*.jpg` | Max 278KB | PASS |
| sitemap-index.xml and robots.txt exist | `ls dist/sitemap-index.xml dist/robots.txt` | Both present | PASS |
| aria-disabled count in built HTML | `grep -c 'aria-disabled="true"' dist/index.html` | 24 | PASS |
| All 6 press outlet names in dist/ | grep each name individually | All 6 confirmed | PASS |
| All 3 testimonial attributions in dist/ | grep each name | All 3 confirmed | PASS |
| id="verhaal" + href="#verhaal" in dist/ | grep both | id: 1, href: 2 | PASS |
| Self-hosted fonts (no CDN) | `grep -c 'fonts.googleapis.com' dist/index.html` | 0 | PASS |
| Two WOFF2 font files in public/fonts/ | `ls public/fonts/` | Fraunces-subset.woff2, DMSans-subset.woff2 | PASS |
| prefers-reduced-motion in reset.css | `grep -c 'prefers-reduced-motion' src/styles/reset.css` | 2 | PASS |
| TODO_SUBSTACK_URL in config.ts | `grep -c 'TODO_SUBSTACK_URL' src/config.ts` | 1 | PASS |
| No /nl/ route in dist/ | `ls dist/nl` | Directory does not exist | PASS |

---

### Requirements Coverage

| Requirement | Source Plans | Description | Status | Evidence |
|-------------|-------------|-------------|--------|---------|
| FND-01 | 01-01 | Astro project scaffolded with component-based structure | SATISFIED | astro.config.mjs, package.json, component tree all present |
| FND-02 | 01-01 | Design system tokens + swappable font variable | SATISFIED | tokens.css with full token set; --font-display with Naste swap comment |
| FND-03 | 01-02 | Reusable UI components (Button, Card, SectionWrapper, etc.) | SATISFIED | All 4 UI components confirmed in src/components/ui/ |
| FND-04 | 01-03, 01-04, 01-05, 01-06 | Responsive layouts across desktop/tablet/mobile | NEEDS HUMAN | CSS breakpoints confirmed; visual quality needs human review |
| FND-05 | 01-01 | Baseline SEO/metadata | SATISFIED | title, canonical, OG, Twitter, JSON-LD, sitemap-index.xml, robots.txt all confirmed |
| FND-06 | 01-06 | Accessibility baseline (landmarks, alt text, focus states) | SATISFIED | 1 h1, header/nav/main/footer landmarks, 24 aria-disabled, explicit form labels, skip-link confirmed |
| FND-07 | 01-01, 01-06 | Performance baseline (self-hosted fonts, minimal JS, CWV) | SATISFIED | Self-hosted WOFF2, font preloads, eager+fetchpriority hero. Lighthouse 98 performance / LCP 1.7s / CLS 0 per SUMMARY. |
| FND-08 | 01-04, 01-06 | Subtle animations + prefers-reduced-motion | NEEDS HUMAN | RevealOnScroll code verified; runtime behavior needs browser test |
| FND-09 | 01-01, 01-02 | i18n-ready structure, NL default at root | SATISFIED | nl.ts single-source strings; i18n.defaultLocale='nl'; no /nl/ prefix; Phase-4 comment in config |
| FND-10 | 01-01, 01-06 | Responsive image pipeline, originals uncommitted | SATISFIED | 9 AVIFs in dist/; AVIF+WebP for all 3 photos; no JPG >300KB; hero has no JPG fallback; originals gitignored |
| HOME-01 | 01-02 | Header with nav, Contact CTA, NL/EN switch, LinkedIn | SATISFIED | aria-label="Hoofdnavigatie", 5 nav labels, aria-expanded toggle, 24 aria-disabled confirmed |
| HOME-02 | 01-01 | Hero with H1, subtext, CTAs, USPs, hero photo | SATISFIED | H1 verbatim, USPs verbatim, AVIF/WebP LCP image, eager+fetchpriority confirmed |
| HOME-03 | 01-03 | 'Bekend van' press strip with 6 placeholder logo chips | SATISFIED | All 6 outlet names confirmed; no real logo images; PlaceholderBadge/marker present |
| HOME-04 | 01-03 | Samenwerken 3-card commitment ladder | SATISFIED | All 3 CTAs confirmed in dist/; aria-disabled; no href="#" |
| HOME-05 | 01-04 | Testimonials with 3 supplied quotes + attributions | SATISFIED | All 3 attributions verbatim in dist/ |
| HOME-06 | 01-04 | Personal story dark band with full copy, signature, photo | SATISFIED | id="verhaal", heading in dist/, portrait AVIF/WebP derivatives confirmed |
| HOME-07 | 01-05 | Newsletter signup section | SATISFIED | Labelled form (nl-naam, nl-email), disabled submit, TODO_SUBSTACK_URL confirmed |
| HOME-08 | 01-05 | 'Recente artikelen' placeholder cards | SATISFIED | Heading, PlaceholderBadge x3, disabled links confirmed |
| HOME-09 | 01-02 | Footer with nav, LinkedIn, legal/copyright | SATISFIED | `<footer>` confirmed; disabled nav links; disabled LinkedIn; copyright text |
| HOME-10 | 01-02 through 01-06 | Honest CTAs — no fake working buttons | SATISFIED | 0 href="#" or href="" in entire dist/; 24 aria-disabled; no fake success state |
| HOME-11 | 01-01 through 01-06 | Preserve supplied factual claims/names/quotes | SATISFIED | All verbatim content confirmed: H1, USPs, 3 attributions, story heading. No suspected inconsistencies noted in SUMMARY. |

**Total:** 19/21 SATISFIED; 2 NEEDS HUMAN (FND-04 visual quality, FND-08 animation runtime).

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| Multiple src/ files | Various | `TODO` comments | INFO | All TODO markers reference formal follow-up work with named phases (Phase 2, Phase 3) or named constants (TODO_SUBSTACK_URL, TODO_LINKEDIN_URL). None are unresolvable. Per the debt-marker gate, these are NOT blockers because each references a formal phase or named constant. |
| src/components/layout/BaseHead.astro | 64 | `// TODO: replace TODO_LINKEDIN_URL` | INFO | References a named constant (TODO_LINKEDIN_URL) — auditable and grep-replaceable. Not a blocker. |
| dist/_astro/ | — | Story portrait has JPG fallback derivatives (max 278KB) | INFO | All under 300KB threshold. The FND-10 prohibition is "no served *.jpg >300KB". Compliant. Hero has no JPG fallback at all (WebP-only, per Hero.astro fallbackFormat="webp"). |

No `TBD`, `FIXME`, or `XXX` markers found in any src/ file — the debt-marker blocker gate is clear.

---

### Human Verification Required

The automated verification confirms that all code exists, is wired correctly, and the build exits 0 with correct output. Four items require visual/interactive browser confirmation:

#### 1. Responsive Visual Quality Across Breakpoints (FND-04, SC-2)

**Test:** Run `npm run build && npm run preview`. Open the printed URL (typically http://localhost:4321/milan-website/).
- Desktop (>=1200px): Confirm the split-card hero (text left, rounded photo right), all sections in order, the mixed-size testimonials mosaic, the full-width dark story band, editorial typography and generous whitespace. Page should NOT read as "covered in yellow" (D-02 — yellow as restrained signature moments only).
- Tablet (~768px): Resize or emulate. Confirm hero stacks gracefully, cards in 2-col where appropriate, press strip scrolls horizontally without clipping.
- Mobile (~375px): Confirm hero stacks text-then-image, H1 wraps gracefully, story column does not overflow, hamburger menu is accessible.

**Expected:** An editorial, premium Dutch personal brand homepage that looks polished and credible across all three breakpoints.
**Why human:** Visual quality, composition, and the editorial/premium feel cannot be verified by grep or DOM inspection.

#### 2. In-Page Anchor Scroll (SC-2)

**Test:** Click the hero "Mijn verhaal" secondary CTA button.
**Expected:** The page scrolls to the dark Story section with heading "Waarom ik nu mijn lessen deel".
**Why human:** href="#verhaal" and id="verhaal" are both confirmed in dist/index.html (automated), but smooth-scroll behavior is a runtime browser interaction.

#### 3. Reduced-Motion Animation Suppression (FND-08)

**Test:** Enable "Reduce motion" in OS settings or DevTools (e.g. Rendering → "Emulate CSS media feature prefers-reduced-motion"), reload the page, and scroll to the Testimonials and Story sections.
**Expected:** No fade-in or translate-Y scroll animations fire. Content is immediately fully visible at all scroll positions.
**Why human:** The prefers-reduced-motion guard exists in RevealOnScroll.astro (confirmed by grep — 4 occurrences in CSS and JS). Runtime suppression requires a browser test.

#### 4. Disabled CTA Visual Affordance + Newsletter Non-Submit (HOME-10)

**Test:** Confirm every future-destination interactive element is visually clearly disabled (reduced opacity, not-allowed cursor). Attempt to interact with the newsletter form fields and click the "Schrijf je in" submit.
**Expected:** Disabled elements have clear visual affordance. The newsletter form does NOT show a thank-you, success message, or redirect — the submit does nothing.
**Why human:** CSS cursor/opacity appearance and interaction behavior (absence of side effects) require visual and click inspection.

---

### Gaps Summary

No gaps blocking goal achievement. All 21 requirements are either SATISFIED or pending only visual/runtime human confirmation. The automated gates produce a very strong baseline:

- Build exits 0
- 0 placeholder href="#" or href="" links in the entire built site
- 9 AVIF files in dist/; all photo JPG derivatives under 300KB; hero has no JPG fallback
- Single h1; all landmarks; JSON-LD Person; canonical; og:*; lang="nl"; no /nl/ route
- 24 aria-disabled elements covering all unknown-destination CTAs and nav items
- All 3 testimonial attributions verbatim; H1 and USPs verbatim; story heading verbatim
- Self-hosted fonts; no Google Fonts CDN; font preloads present

The only items pending human sign-off are intrinsically visual/interactive: the responsive layout quality at breakpoints, in-page anchor scroll, reduced-motion animation suppression, and disabled CTA visual affordance.

**One notable decision to call out:** The SUMMARY's plan-06 task count (tasks_completed: 2, tasks_total: 2) omits the blocking `checkpoint:human-verify` Task 3. The SUMMARY itself notes "visual confirmation pending human checkpoint" for SC-2. This verification confirms that the human checkpoint has NOT been completed and routes it to the human verification section above.

---

_Verified: 2026-08-18T19:05:00Z_
_Verifier: Claude (gsd-verifier)_
