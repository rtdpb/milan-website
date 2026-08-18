---
phase: 02-supporting-pages-lead-gen-forms
verified: 2026-08-18T19:59:02Z
status: passed
score: 13/13 must-haves verified
behavior_unverified: 0
overrides_applied: 0
human_verification_accepted_by_user: 2026-08-18
human_verification_note: "User approved phase completion 2026-08-18. The human_verification items below were ACCEPTED (not machine-tested) and remain the user's pre-launch actions — in particular the real Web3Forms key + inbox delivery (PAGE-04) and the Dutch copy review (D-05)."
human_verification:
  - test: "Drop the real Web3Forms access key into src/config.ts (TODO_WEB3FORMS_ACCESS_KEY) and submit the contact form, then confirm the inquiry arrives in Milan's inbox."
    expected: "An email arrives at Milan's configured destination within a few minutes containing the form fields (naam, email, onderwerp, bericht)."
    why_human: "The placeholder key is a documented design decision (D-02). Automated checks cannot send a real email. The form is submission-ready; delivery requires a real key and a live inbox."
  - test: "Milan reviews the Claude-drafted Dutch copy in nl.coaching, nl.spreker, and nl.mijnVerhaal before the site goes live."
    expected: "Milan confirms the tone, facts, and framing are accurate and consistent with his voice (informal 'je', no invented stats or quotes, correct Soly arc details)."
    why_human: "Copy was drafted from existing material only (D-05) but requires the subject-matter expert to validate. Grep cannot verify editorial quality or factual nuance."
  - test: "Open /coaching, /spreker, /mijn-verhaal, and /contact on desktop (>960px), tablet (768px), and mobile (375px). Inspect layout, typography, spacing, and photo rendering."
    expected: "All four pages render with the same editorial premium feel as the Phase 1 homepage. No layout breaks, overflow, or truncation at any breakpoint. Photos render in AVIF/WebP with correct aspect ratios."
    why_human: "Responsive visual quality cannot be verified by grep or build output alone."
  - test: "Click 'Plan kennismaking' on /coaching and on the Samenwerken homepage section. Confirm the contact form lands with 'Plan kennismaking' pre-selected in the Onderwerp dropdown."
    expected: "Browser navigates to /contact?type=coaching and the select shows 'Plan kennismaking' selected on arrival (no page reload needed)."
    why_human: "The ?type= pre-selection is a client-side JS behavior triggered at runtime; the build verifies the HTML is present but not whether the JS executes correctly in a browser."
  - test: "Click 'Boek lezing' on /spreker and on the Samenwerken section. Confirm the contact form lands with 'Boek lezing' pre-selected."
    expected: "Browser navigates to /contact?type=lezing and the select shows 'Boek lezing' selected on arrival."
    why_human: "Same reason as above — client-side JS behavior requires browser verification."
  - test: "Verify 'Nieuwsbrief' and 'Boek' remain clearly non-clickable disabled affordances in the nav and footer, with the tooltip 'Binnenkort beschikbaar'."
    expected: "Hovering shows a not-allowed cursor and the tooltip text. Tab key skips them. No navigation occurs."
    why_human: "Interaction quality and screen-reader behavior require human/AT testing."
---

# Phase 2: Supporting Pages & Lead-Gen Forms — Verification Report

**Phase Goal:** Add the primary conversion subpages (Coaching, Spreker, Mijn verhaal, Contact) and make lead capture functional so "Boek lezing" / "Plan kennismaking" / Contact produce real inquiries.
**Verified:** 2026-08-18T19:59:02Z
**Status:** HUMAN VERIFICATION NEEDED
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Coaching page exists and is styled with the Phase 1 design system | VERIFIED | `src/pages/coaching.astro` exists; composes SectionWrapper, Card, Button, RevealOnScroll, Picture from Phase 1; builds to `dist/coaching/index.html` (0 errors, 0 warnings in `astro check`) |
| 2 | Spreker page exists and is styled with the Phase 1 design system | VERIFIED | `src/pages/spreker.astro` exists; uses same primitives; builds to `dist/spreker/index.html`; includes PressStrip and Newsletter reuse |
| 3 | Mijn verhaal page exists and is styled with the Phase 1 design system | VERIFIED | `src/pages/mijn-verhaal.astro` exists; reuses Story.astro dark band + SectionWrapper + .prose 680px constraint; builds to `dist/mijn-verhaal/index.html` |
| 4 | Contact page exists with a working Web3Forms form (submission-ready, honest non-functional state) | VERIFIED | `src/pages/contact.astro` + `src/components/forms/ContactForm.astro` exist; `method="POST"`, `action="https://api.web3forms.com/submit"`, `name="access_key"`, `name="botcheck"`, `aria-live="polite"` all present in built HTML; no `Astro.url.searchParams`, no `json.body.message` in source |
| 5 | "Plan kennismaking" CTA routes to /contact?type=coaching with BASE_URL prefix | VERIFIED | Confirmed in coaching.astro (line 50), Samenwerken.astro (line 70), mijn-verhaal.astro (line 108); builds resolve to `/milan-website/contact?type=coaching` in dist/ HTML |
| 6 | "Boek lezing" CTA routes to /contact?type=lezing with BASE_URL prefix | VERIFIED | Confirmed in spreker.astro (line 52), Samenwerken.astro (line 58); builds resolve to `/milan-website/contact?type=lezing` in dist/ HTML |
| 7 | Contact form has honeypot, is XSS-safe (no API response echoed), and never shows fake success | VERIFIED | `name="botcheck"` type="checkbox" with `display:none`, `tabindex="-1"`, `aria-hidden="true"` present; 0 occurrences of `json.body.message` or `Astro.url.searchParams`; placeholder key triggers `console.warn` only, never a success state (verified in JS island lines 194–199) |
| 8 | Onderwerp select pre-selects from ?type= query param (client-side, validated against allowlist) | VERIFIED | `window.location.search` used (2 occurrences); validated against `new Set(['algemeen', 'lezing', 'coaching'])` (not CSS.escape — note: plan called for CSS.escape but implementation uses Set allowlist, which is actually safer per WR-01 note in the file itself); unknown values fall back to 'algemeen' |
| 9 | Coaching shows exactly ONE testimonial (Yang Soo Kloosterhof); Spreker shows exactly ONE (Oranjewoud Export Academy) | VERIFIED | `nl.testimonials.items[0]` (Yang Soo Kloosterhof, line 96 of nl.ts) used in coaching.astro line 32; `nl.testimonials.items[2]` (Oranjewoud Export Academy, line 106 of nl.ts) used in spreker.astro line 33; verbatim from nl.ts — no fabricated testimonials |
| 10 | Nav and Footer: Coaching, Spreker, Mijn verhaal enabled as real links with active-state; Nieuwsbrief and Boek remain honest disabled placeholders | VERIFIED | Nav.astro navItems array: coaching/spreker/mijn-verhaal have `href`, nieuwsbrief/boek have `reason`; `aria-current` wired via `currentPath.startsWith(item.href)`; Footer.astro mirrors same structure; confirmed in dist/index.html built output |
| 11 | No href="#" on any CTA across all modified files | VERIFIED | grep for `href="#"` across all 9 modified files returns 0 real instances (only comment text containing the string) |
| 12 | npm run build exits 0 with all 5 pages produced | VERIFIED | Build output: 5 pages in 409ms, 0 errors, 0 warnings, 0 hints in astro check; all routes present: `/coaching/index.html`, `/spreker/index.html`, `/mijn-verhaal/index.html`, `/contact/index.html`, `/index.html` |
| 13 | Story section on homepage has "Lees mijn hele verhaal" teaser link to /mijn-verhaal; self-link guard prevents circular link on /mijn-verhaal | VERIFIED | Story.astro lines 40–41: `const isMijnVerhaalPage = currentPath.includes('mijn-verhaal')`; teaser link wrapped in `{!isMijnVerhaalPage && (...)}` (line 104); `href={teaserLink}` uses BASE_URL prefix; link visible in built dist/index.html |

**Score: 13/13 truths verified**

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| PAGE-01 | 02-02-PLAN.md | Coaching page | SATISFIED | `src/pages/coaching.astro` builds green; editorial hero + offer cards + single testimonial + CTA band + Newsletter |
| PAGE-02 | 02-02-PLAN.md | Spreker page | SATISFIED | `src/pages/spreker.astro` builds green; hero + PressStrip + aanbod cards + single testimonial + CTA band + Newsletter |
| PAGE-03 | 02-03-PLAN.md | Mijn verhaal page | SATISFIED | `src/pages/mijn-verhaal.astro` builds green; Story dark band + 4 prose arcs + terminal CTA + Newsletter |
| PAGE-04 | 02-01-PLAN.md | Contact page with working form | SATISFIED | `src/pages/contact.astro` + `ContactForm.astro`; progressive enhancement; submission-ready; real Web3Forms endpoint |
| PAGE-05 | 02-03-PLAN.md | Boek lezing / Plan kennismaking CTAs wired | SATISFIED | Samenwerken (homepage), Hero, coaching.astro, spreker.astro, mijn-verhaal.astro all carry correct ?type= deep-links |

Note: REQUIREMENTS.md traceability table does not yet include Phase 2 entries (PAGE-01 through PAGE-05 appear in the v2 section but are not in the traceability table rows). This is a documentation gap in REQUIREMENTS.md, not a code gap. The requirements themselves are fully satisfied in the codebase.

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/config.ts` | Exports CONTACT_URL, TODO_WEB3FORMS_ACCESS_KEY, TODO_CALENDLY_URL; no dangling TODO_CONTACT_URL | VERIFIED | All 3 new constants present; grep for TODO_CONTACT_URL in src/ returns 0 results |
| `src/i18n/nl.ts` | Top-level contact, coaching, spreker, mijnVerhaal keys | VERIFIED | All 4 keys present (2 occurrences each: in the main const and the exported function); includes "Laten we kennismaken", all form strings, both testimonial attributions |
| `src/components/forms/ContactForm.astro` | New component with progressive-enhancement form | VERIFIED | Exists; 402 lines; substantive implementation with JS island, honeypot, all form fields, aria-live, fetch handler |
| `src/pages/contact.astro` | Renders at /contact, composes ContactForm | VERIFIED | Exists; imports ContactForm; builds to dist/contact/index.html with botcheck and access_key in output |
| `src/pages/coaching.astro` | Editorial coaching landing page | VERIFIED | Exists; uses milan-networking.jpg via astro:assets Picture; CTA to /contact?type=coaching |
| `src/pages/spreker.astro` | Editorial spreker landing page | VERIFIED | Exists; uses milan-speaking-graph.jpg via astro:assets Picture; CTA to /contact?type=lezing |
| `src/pages/mijn-verhaal.astro` | Full-length founder story page | VERIFIED | Exists; reuses Story.astro; 4 narrative arcs with .prose max-width 680px |
| `src/assets/photos/milan-networking.jpg` | Downscaled photo, under 300KB | VERIFIED | 266,771 bytes (260KB); under 300KB threshold |
| `src/assets/photos/milan-speaking-graph.jpg` | Downscaled photo, under 300KB | VERIFIED | 190,036 bytes (186KB); under 300KB threshold |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| Nav Contact CTA | `/contact` | `href="${import.meta.env.BASE_URL}contact"` | WIRED | Nav.astro line 87; confirmed as real `<a>` in dist/index.html (`href="/milan-website/contact"`) |
| Nav Coaching link | `/coaching` | `href="${import.meta.env.BASE_URL}coaching"` in navItems | WIRED | Nav.astro line 35; confirmed in dist/index.html |
| Nav Spreker link | `/spreker` | `href="${import.meta.env.BASE_URL}spreker"` in navItems | WIRED | Nav.astro line 36; confirmed in dist/index.html |
| Nav Mijn verhaal link | `/mijn-verhaal` | `href="${import.meta.env.BASE_URL}mijn-verhaal"` in navItems | WIRED | Nav.astro line 38; confirmed in dist/index.html |
| ContactForm hidden input `access_key` | `TODO_WEB3FORMS_ACCESS_KEY` config constant | `value={TODO_WEB3FORMS_ACCESS_KEY}` | WIRED | ContactForm.astro line 70; constant imported from config.ts |
| ContactForm form action | `https://api.web3forms.com/submit` | `action="https://api.web3forms.com/submit"` | WIRED | ContactForm.astro line 58; confirmed in dist/contact/index.html |
| Onderwerp select | `?type=` query param | `window.location.search` + Set allowlist | WIRED | ContactForm.astro lines 204–211; client-side only (correct — not SSR) |
| Coaching primary CTA | `/contact?type=coaching` | `href="${import.meta.env.BASE_URL}contact?type=coaching"` | WIRED | coaching.astro line 50, line 125 (CTA band); mijn-verhaal.astro line 108 |
| Spreker primary CTA | `/contact?type=lezing` | `href="${import.meta.env.BASE_URL}contact?type=lezing"` | WIRED | spreker.astro line 52, line 126 (CTA band) |
| Samenwerken "Boek lezing" | `/contact?type=lezing` | `href="${import.meta.env.BASE_URL}contact?type=lezing"` | WIRED | Samenwerken.astro line 58 |
| Samenwerken "Plan kennismaking" | `/contact?type=coaching` | `href="${import.meta.env.BASE_URL}contact?type=coaching"` | WIRED | Samenwerken.astro line 70 |
| Hero "Contact" CTA | `/contact` | `href="${import.meta.env.BASE_URL}contact"` | WIRED | Hero.astro line 51; real `<a>` (no aria-disabled) |
| Story teaser link | `/mijn-verhaal` | `href={teaserLink}` with BASE_URL; guarded on /mijn-verhaal | WIRED | Story.astro line 105; isMijnVerhaalPage guard at line 41; confirmed in dist/index.html |
| Footer Coaching/Spreker/Mijn verhaal | respective routes | navItems with href | WIRED | Footer.astro lines 36–39; confirmed in dist/index.html |

---

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|--------------|--------|--------------------|--------|
| coaching.astro | `testimonial` | `nl.testimonials.items[0]` (Yang Soo Kloosterhof, nl.ts line 95–97) | Yes — real testimonial from nl.ts | FLOWING |
| spreker.astro | `testimonial` | `nl.testimonials.items[2]` (Oranjewoud Export Academy, nl.ts line 104–108) | Yes — real testimonial from nl.ts | FLOWING |
| ContactForm.astro | `copySuccess`, `copyError`, `copyNetwork` | `data-*` attributes sourced from `nl.contact` in template; read at runtime | Yes — static nl.contact strings; never API response | FLOWING |
| coaching.astro | `networkingSrc` | `import networkingSrc from '../assets/photos/milan-networking.jpg'` | Yes — real photo file (260KB, committed) | FLOWING |
| spreker.astro | `speakingSrc` | `import speakingSrc from '../assets/photos/milan-speaking-graph.jpg'` | Yes — real photo file (186KB, committed) | FLOWING |

---

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| npm run build exits 0 | `npm run build` | 5 pages built in 409ms, 0 errors, 0 warnings, 0 hints in `astro check` | PASS |
| Contact form renders in built HTML (botcheck + access_key present) | `grep -c 'name="botcheck"' dist/contact/index.html` | 1 | PASS |
| aria-live polite on result region in built HTML | `grep -c 'aria-live="polite"' dist/contact/index.html` | 2 (one in ContactForm output) | PASS |
| Coaching page deep-link present in built HTML | `grep -c "type=coaching" dist/coaching/index.html` | 1 | PASS |
| Spreker page deep-link present in built HTML | `grep -c "type=lezing" dist/spreker/index.html` | 1 | PASS |
| Story teaser link to mijn-verhaal present on homepage | grep in dist/index.html | `/milan-website/mijn-verhaal` href found with "Lees mijn hele verhaal →" text | PASS |
| Nav coaching/spreker/mijn-verhaal as real links in built HTML | grep dist/index.html | All three present as real `<a href="/milan-website/coaching|spreker|mijn-verhaal">` elements | PASS |
| Samenwerken ?type= deep-links present in homepage HTML | grep dist/index.html | `contact?type=lezing` and `contact?type=coaching` both present | PASS |
| No href="#" in built pages | grep across dist/ HTML files | 0 literal `href="#"` occurrences in any page output | PASS |

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `src/components/forms/ContactForm.astro` | 54, 69 | `TODO:` comments (documented placeholder markers) | INFO | Intentional per D-02 and PLAN 02-01 Task 2: "this literal TODO string is the intended documented-placeholder marker, not comment cruft." References formal work item (drop real Web3Forms key). Not a blocker. |
| `src/components/layout/Nav.astro` | 43 | `TODO Plan 02 — Nav wired into BaseLayout` (comment) | INFO | Stale descriptive comment from Phase 1 planning. No work item reference needed — the nav IS wired. Minor documentation hygiene; does not affect functionality. |
| REQUIREMENTS.md traceability table | 99–108 | PAGE-01 through PAGE-05 not in the traceability table rows (only in the v2 section) | WARNING | Documentation gap only. Requirements are satisfied in code. The traceability table should be updated to include Phase 2 rows, but this does not block the phase goal. |

---

### Human Verification Required

#### 1. Web3Forms Inbox Delivery

**Test:** Replace `TODO_WEB3FORMS_ACCESS_KEY` in `src/config.ts` with the real key from the Web3Forms dashboard (web3forms.com — free tier sufficient). Deploy or run `npm run preview`, fill out the contact form at `/contact`, and submit.
**Expected:** An inquiry email arrives at Milan's configured inbox within a few minutes containing all form fields.
**Why human:** The placeholder key is by design (D-02). Automated checks cannot send a real email or verify inbox delivery. The form is submission-ready; only the key is missing.

#### 2. Dutch Copy Review (D-05)

**Test:** Milan reads `nl.coaching` (coaching page copy), `nl.spreker` (spreker page copy), and `nl.mijnVerhaal` (full story copy) in `src/i18n/nl.ts` — or views the rendered pages at `/coaching`, `/spreker`, and `/mijn-verhaal`.
**Expected:** Milan confirms tone (informal "je"), factual accuracy (Soly arc: 9 landen, ~180 medewerkers, ~1M panelen, faillissement), no invented statistics or quotes, and that the framing matches how he wants to present himself.
**Why human:** Copy was drafted from existing material only (D-05) but editorial and factual accuracy must be confirmed by the subject-matter expert, not by grep.

#### 3. Responsive Visual Quality

**Test:** Open all four new pages (`/coaching`, `/spreker`, `/mijn-verhaal`, `/contact`) in a browser at desktop (1440px), tablet (768px), and mobile (375px).
**Expected:** All pages render with the same editorial premium feel as the Phase 1 homepage. No layout breaks, overflow, or truncation. Photos render at appropriate sizes with AVIF/WebP served. Typography, spacing, and the single-dark-band rule visually hold.
**Why human:** Visual layout quality cannot be verified by build output alone.

#### 4. ?type= Query Param Pre-selection (Browser Behavior)

**Test:** Navigate to `/contact?type=coaching` in a browser. Check the Onderwerp select. Then navigate to `/contact?type=lezing` and check.
**Expected:** On `?type=coaching` the select shows "Plan kennismaking" pre-selected. On `?type=lezing` it shows "Boek lezing". On `/contact` with no param it shows "Algemeen".
**Why human:** The pre-selection is a client-side JS behavior (`URLSearchParams` + Set allowlist) that runs after hydration. The build verifies the HTML and JS are present but not that they execute correctly in a browser.

#### 5. Click-Flow: CTA to Pre-filled Form

**Test:** From the homepage, click "Plan kennismaking" (Samenwerken section) and "Boek lezing" (Samenwerken section). From `/coaching`, click "Plan kennismaking". From `/spreker`, click "Boek lezing".
**Expected:** Each CTA navigates to `/contact` with the correct `?type=` parameter and the form dropdown pre-selects accordingly.
**Why human:** Verifies the end-to-end user path including browser navigation and JS execution — not verifiable by static analysis.

#### 6. Honest Disabled CTAs (UX)

**Test:** In nav and footer, hover over and attempt to click "Nieuwsbrief" and "Boek". Tab through the nav.
**Expected:** Cursor shows `not-allowed`, tooltip "Binnenkort beschikbaar" appears on hover, Tab skips them, no navigation occurs.
**Why human:** Interaction affordance quality (cursor, tooltip, tab order) requires human/AT browser testing.

---

### Gaps Summary

No blockers. All 13 must-have truths are VERIFIED in the codebase.

The 6 human verification items above are expected outcomes — they were documented in advance in the PLAN (D-02, D-05) as items requiring human action or browser validation. None represent a code deficiency:

- Item 1 (inbox delivery) requires a real Web3Forms key — deliberately withheld per D-02.
- Items 2–3 (copy review, visual quality) are editorial/UX sign-offs — not automatable.
- Items 4–6 (JS behavior, click flows, disabled CTAs) require browser execution.

The REQUIREMENTS.md traceability table should be updated to add Phase 2 rows for PAGE-01 through PAGE-05, but this does not block shipping.

---

_Verified: 2026-08-18T19:59:02Z_
_Verifier: Claude (gsd-verifier)_
