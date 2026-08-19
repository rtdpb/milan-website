# Phase 5: Book / Pre-order & Future Growth — Research

**Researched:** 2026-08-19
**Domain:** Plausible Analytics (Astro injection + custom events) · Bilingual book page · Sticky CTA · CMS evaluation
**Confidence:** MEDIUM

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Book status = "coming / no details yet." Honest teaser only — no fake purchase button.
- **D-02:** Interest capture = BOTH: primary = Substack subscribe redirect (framed for book updates); secondary = Web3Forms "notify me" form (book-specific subject/`type`). No new infra.
- **D-03:** Leave a documented external-checkout config seam (`TODO_BOOK_CHECKOUT_URL` in `src/config.ts`). No purchase button shown until supplied. Matches existing `TODO_` pattern.
- **D-04:** Privacy-first, cookieless analytics = Plausible. No cookie/consent banner.
- **D-05:** Track conversion events + pageviews: contact form submit, newsletter signup, book-interest signup.
- **D-06:** Analytics behind a config seam (`TODO_PLAUSIBLE_DOMAIN` or similar). Inert until real domain supplied. Load only in production with real domain.
- **D-07:** Conversion optimization = a persistent/sticky primary CTA on long pages, click tracked as a Plausible goal. Subtle, not a pop-up.
- **D-08:** CMS evaluation → recommend DEFER. Deliver a written evaluation. Name Astro content-collections migration as the prerequisite. Do NOT adopt a CMS this phase.
- All book page + analytics copy ships **bilingual NL+EN** (`/boek` + `/en/book`), following Phase 4 patterns.

### Claude's Discretion

- D-07 (sticky CTA) and D-08 (CMS evaluation) delegated; open to revision at planning/UI-spec time.
- Exact sticky-CTA placement/affordance and Plausible goal names are implementation details for research/planning.
- EN copy is a Milan-review draft (Phase 4 D-03 carry-forward).

### Deferred Ideas (OUT OF SCOPE)

- Lead-magnet conversion play (free first chapter / founder-lessons PDF) — needs book content.
- Real book pre-order/checkout (Gumroad/Bol/publisher/Stripe) — deferred until book platform chosen.
- CMS adoption (git-based CMS on content-collections migration) — eval only, no adoption.
- A/B testing tooling.
- Confirming the production domain / removing the GitHub Pages `base`.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| BOOK-01 | Book / pre-order page — bilingual `/boek` + `/en/book`, interest capture, nav/footer enablement | §Book Page Architecture covers exact page structure, slug-map entry, nav/footer wiring, dual capture (Substack + Web3Forms) |
| GROW-01 | Conversion + analytics — Plausible install, conversion-event tracking, one conversion optimization | §Plausible Analytics covers script injection, goal API, config seam; §Sticky CTA covers the optimization |
| GROW-02 | Optional CMS / editable content — evaluate and either adopt without destabilizing, or document defer | §CMS Evaluation covers the written deliverable and rationale |
</phase_requirements>

---

## Summary

Phase 5 layers three largely independent capabilities on top of the already-bilingual Astro static site. The codebase from Phases 1–4 provides all the machinery needed: config seams (`TODO_*`), bilingual routing (`nlToEn`/`enToNl`), `getStrings()` threading, Web3Forms and Substack seams, and the `BaseHead.astro` injection point.

**Plausible Analytics** is the lightest-lift analytics option for a Dutch-founded personal-brand site: cookieless, no consent banner needed in the EU, EU-hosted infrastructure, and a clean `<script defer>` tag in BaseHead. The key implementation detail is gating it behind a config constant (`TODO_PLAUSIBLE_DOMAIN`) so it stays inert on the GitHub Pages placeholder domain — exactly mirroring the existing `TODO_*` pattern. Custom events fire via `window.plausible('EventName')` after a one-line queue guard in BaseHead; goals are registered in the Plausible dashboard to match.

**The book page** is the simplest deliverable: a new bilingual page pair (`/boek`, `/en/book`) following the exact same pattern as existing supporting pages. It enables the disabled "Boek" nav/footer placeholder (both locales), adds one NL↔EN slug-map entry (`'boek' → 'book'`), extends `nl.ts`/`en.ts` with `boek` copy keys, and reuses the Substack-redirect + Web3Forms seams for interest capture. A `TODO_BOOK_CHECKOUT_URL` seam in `config.ts` prepares for a future real checkout link with no redesign.

**The CMS evaluation** (GROW-02) is a documentation deliverable, not a code change. The core finding is that git-based CMSes (Decap, Sveltia, TinaCMS) all target Markdown/MDX files or Astro content collections — not the typed TypeScript i18n object shape the site currently uses (`nl.ts`/`en.ts`). Adopting a CMS now would require restructuring all existing content and risks destabilizing the bilingual pages just shipped. The written recommendation is to defer and name content-collections migration as the prerequisite.

**Primary recommendation:** Follow the phased injection pattern — add `TODO_PLAUSIBLE_DOMAIN` to `config.ts`, inject the Plausible `<script>` in BaseHead gated on `import.meta.env.PROD && !IS_PLACEHOLDER_DOMAIN`, add a sticky-bottom CTA component with IntersectionObserver visibility, build the bilingual book page following coaching/speaking/mijn-verhaal page patterns, and write the CMS evaluation doc. Three work-streams, all independent after the config seam is added.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Plausible script injection | Frontend Server (Astro build/BaseHead) | — | Static site: script tag baked into HTML at build; no server needed |
| Plausible custom event firing | Browser / Client | — | JS runs on click/submit in the user's browser; `window.plausible()` is client-side |
| Production-only analytics gate | Frontend Server (Astro build-time constant) | — | `import.meta.env.PROD` and domain check evaluated at build, not runtime |
| Book interest capture — Substack | Browser / Client | — | Redirect anchor; no server-side processing |
| Book interest capture — Web3Forms | Browser / Client + CDN (Web3Forms API) | — | Client-side fetch POST to web3forms.com API |
| Book page routing (NL+EN) | Frontend Server (Astro static gen) | — | Static pages at `/boek` and `/en/book`; hreflang in BaseHead |
| Nav/footer "Boek" enablement | Frontend Server (Astro build) | — | Slug-map entry + `href` in navItems arrays |
| Sticky CTA | Browser / Client | Frontend Server (Astro Island) | IntersectionObserver JS runs in browser; Astro generates the markup |
| CMS evaluation | Documentation only | — | No code tier; deliverable is a written doc |

---

## Standard Stack

### Core (no new packages needed)

This phase adds **zero new npm dependencies**. All capabilities are achievable with the existing stack:

| Capability | Solution | In Repo Already |
|------------|----------|-----------------|
| Analytics | Plausible `<script>` tag (CDN, no npm pkg) | No — add script tag |
| Book interest — Substack | `Newsletter.astro` Substack-redirect pattern (reuse) | Yes |
| Book interest — Web3Forms | `ContactForm.astro` Web3Forms pattern (reuse) | Yes |
| Bilingual routing | `nlToEn`/`enToNl` + `getStrings()` (Phase 4) | Yes |
| Sticky CTA | Vanilla JS island (existing Nav.astro pattern) | Yes — pattern |
| CMS evaluation | Markdown doc | Yes — doc only |

**No `npm install` commands required for this phase.** [VERIFIED: src/config.ts:1-93] All infrastructure (Web3Forms, Substack, config seams) already exists.

### Plausible Script Variants

| Variant | Script URL | Use When |
|---------|-----------|----------|
| Standard (pageviews only) | `https://plausible.io/js/script.js` | Pageview tracking only |
| Tagged events (CSS-class events + pageviews) | `https://plausible.io/js/script.tagged-events.js` | When using CSS-class event tracking |

For this phase: use `script.js` + the manual `window.plausible()` JS approach for event tracking. The CSS-class tagged-events approach requires adding classes to markup, which is harder to audit. Manual JS calls (`window.plausible('Contact: Submit')`) from existing form submit handlers give cleaner, auditable event firing.

---

## Package Legitimacy Audit

> No new npm packages are installed in this phase. Plausible is loaded as a `<script>` tag from `plausible.io` CDN — not an npm package.

| Package | Registry | Verdict | Disposition |
|---------|----------|---------|-------------|
| (none) | — | — | N/A — zero new dependencies |

**Packages removed due to SLOP verdict:** none
**Packages flagged as suspicious (SUS):** none

---

## Architecture Patterns

### System Architecture Diagram

```
User Browser
│
├── GET /boek or /en/book
│     └── Astro static page (built at deploy time)
│           ├── BaseHead.astro → <script defer data-domain={PLAUSIBLE_DOMAIN} src="…/script.js">
│           │     (only rendered when IS_PROD && !IS_PLACEHOLDER_DOMAIN)
│           ├── Book teaser content (nl.boek / en.boek strings)
│           ├── Substack subscribe redirect (IS_SENTINEL guard, same as Newsletter.astro)
│           └── Web3Forms "notify me" form (POST to api.web3forms.com)
│
├── JS events (client-side, after page load)
│     ├── Contact form submit → window.plausible('Contact: Submit')
│     ├── Newsletter signup click → window.plausible('Newsletter: Subscribe')
│     └── Book interest form submit → window.plausible('Book: Interest')
│
├── Sticky CTA (bottom of viewport)
│     ├── IntersectionObserver watches hero CTA (hides sticky when hero CTA visible)
│     └── Sticky CTA click → window.plausible('Sticky CTA: Click')
│
└── Plausible dashboard (plausible.io)
      └── Goals: Contact: Submit, Newsletter: Subscribe, Book: Interest, Sticky CTA: Click
```

### Recommended Project Structure (new files only)

```
src/
├── pages/
│   ├── boek.astro              # NL book page (/boek)
│   └── en/
│       └── book.astro          # EN book page (/en/book)
├── components/
│   ├── analytics/
│   │   └── PlausibleScript.astro   # Production-gated Plausible script + queue guard
│   └── ui/
│       └── StickyCTA.astro     # Sticky bottom CTA island (D-07)
└── i18n/
    ├── nl.ts                   # Add boek: { ... } key block
    └── en.ts                   # Add boek: { ... } key block (EN draft)
```

`config.ts` gets two new constants: `TODO_BOOK_CHECKOUT_URL` and `TODO_PLAUSIBLE_DOMAIN`.

---

### Pattern 1: Plausible Script Injection in BaseHead (Production + Real Domain Gate)

**What:** A dedicated `PlausibleScript.astro` component (or inline in BaseHead) that renders the Plausible `<script>` tag only when both conditions are true: (1) the build is production, and (2) the Plausible domain is not the placeholder sentinel.

**When to use:** Every page, via BaseHead.astro (already used by all pages).

**The config seam — add to `src/config.ts`:**
```typescript
/**
 * Plausible Analytics domain — must match the domain registered in Plausible dashboard.
 * TODO Phase 5: replace with real domain once Plausible account and domain are confirmed.
 * Sentinel check: TODO_PLAUSIBLE_DOMAIN === 'TODO_PLAUSIBLE_DOMAIN' → analytics inert.
 * Used in: src/components/analytics/PlausibleScript.astro
 */
export const TODO_PLAUSIBLE_DOMAIN = 'TODO_PLAUSIBLE_DOMAIN';
```

**`src/components/analytics/PlausibleScript.astro`:**
```astro
---
// Source: plausible.io/docs + websearch [CITED: plausible.io/docs/plausible-script]
import { TODO_PLAUSIBLE_DOMAIN } from '../../config';

// Gate 1: Only inject in production builds (Astro/Vite built-in)
const isProd = import.meta.env.PROD;

// Gate 2: Only inject when a real domain has been supplied (D-06)
const IS_PLACEHOLDER = TODO_PLAUSIBLE_DOMAIN === 'TODO_PLAUSIBLE_DOMAIN';

const shouldInject = isProd && !IS_PLACEHOLDER;
---

{shouldInject && (
  <>
    {/* Plausible pageview tracking script */}
    <script
      defer
      data-domain={TODO_PLAUSIBLE_DOMAIN}
      src="https://plausible.io/js/script.js"
    ></script>
    {/* Queue guard: allows plausible() calls before script loads
        Source: Plausible community docs [CITED: github.com/plausible/analytics discussions] */}
    <script is:inline>
      window.plausible = window.plausible || function() {
        (window.plausible.q = window.plausible.q || []).push(arguments);
      };
    </script>
  </>
)}
```

Add to `BaseHead.astro` frontmatter imports:
```typescript
import PlausibleScript from '../analytics/PlausibleScript.astro';
```
And in the `<head>` output:
```astro
<PlausibleScript />
```

**Note on `is:inline`:** The queue guard script must be `is:inline` so Astro does not move or bundle it — it must execute synchronously after the Plausible `<script>` tag. [ASSUMED: Astro `is:inline` behavior for second script tag; consistent with existing `BaseHead.astro:166` JSON-LD pattern]

---

### Pattern 2: Custom Event Firing — `window.plausible()`

**What:** Fire named conversion events from existing JS islands (ContactForm.astro, Newsletter.astro) and the new book interest form. All events are queued-safe because of the queue guard above.

**Function signature:** [CITED: plausible.io/docs/custom-event-goals]
```javascript
window.plausible('EventName');
// With optional callback (e.g., before form redirect):
window.plausible('EventName', { callback: function() { /* do something after */ } });
// With custom properties:
window.plausible('EventName', { props: { method: 'web3forms' } });
```

**Event names for this phase (D-05, CONTEXT.md §Specifics):**
- `'Contact: Submit'` — fired after successful Web3Forms contact form submit
- `'Newsletter: Subscribe'` — fired when user clicks the Substack subscribe redirect
- `'Book: Interest'` — fired after successful Web3Forms book-notify form submit
- `'Sticky CTA: Click'` — fired on sticky CTA click (D-07)

**Registration:** Each event name must be added as a Custom Event Goal in the Plausible dashboard under Settings → Goals. Goal names must match character-for-character.

**Pitfall:** The `window.plausible` function is only defined on the browser. Never call it in Astro frontmatter (server-side). All calls must be inside `<script>` blocks (client-side islands). [ASSUMED: standard browser/server boundary, consistent with existing ContactForm.astro island pattern]

---

### Pattern 3: Wiring Events into Existing Islands

**ContactForm.astro — add after `json.success === true` check (line ~273):**
```javascript
// Fire Plausible 'Contact: Submit' goal (GROW-01, D-05)
if (typeof window.plausible === 'function') {
  window.plausible('Contact: Submit');
}
```

**Newsletter.astro — add to the subscribe redirect `<a>` click handler (or inline script):**
Since `Newsletter.astro` uses a plain anchor tag (no JS submit handler), fire the event on `click` via an inline script attached to the anchor. The cleanest pattern: add a small inline script that attaches a click listener:
```javascript
// In a <script> island in Newsletter.astro
const subscribeAnchor = document.querySelector('.newsletter__submit:not(.newsletter__submit--disabled)');
if (subscribeAnchor) {
  subscribeAnchor.addEventListener('click', function() {
    if (typeof window.plausible === 'function') {
      window.plausible('Newsletter: Subscribe');
    }
  });
}
```

**Book interest form (new BookInterestForm.astro) — same structure as ContactForm.astro, add after successful submit:**
```javascript
if (typeof window.plausible === 'function') {
  window.plausible('Book: Interest');
}
```

---

### Pattern 4: Book Page — Bilingual Page Pair

**What:** Two new Astro pages following the exact coaching/spreker/mijn-verhaal pattern. Thin wrappers over `BaseLayout`, using `getStrings(Astro.currentLocale)`.

**`src/pages/boek.astro` (NL):**
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import SectionWrapper from '../components/ui/SectionWrapper.astro';
import BookInterestForm from '../components/forms/BookInterestForm.astro';
import Newsletter from '../components/sections/Newsletter.astro';
import { getStrings } from '../i18n/utils';
const t = getStrings(Astro.currentLocale);
---
<BaseLayout
  title={t.boek.pageTitle}
  description={t.boek.pageDesc}
  enSlug="book"
  nlSlug="boek"
>
  <!-- Book teaser content using t.boek.* keys -->
</BaseLayout>
```

**`src/pages/en/book.astro` (EN):** Identical structure with same `enSlug="book"` / `nlSlug="boek"` props. Astro.currentLocale is 'en' automatically for `/en/*` pages. [VERIFIED: src/pages/en/index.astro:1-79]

**Slug map addition — `src/i18n/utils.ts`:** [VERIFIED: src/i18n/utils.ts:71-78]
```typescript
export const nlToEn: Record<string, string> = {
  '':             '',
  'coaching':     'coaching',
  'spreker':      'speaking',
  'mijn-verhaal': 'about',
  'nieuwsbrief':  'newsletter',
  'contact':      'contact',
  'boek':         'book',   // ADD THIS
};
```
`enToNl` is auto-derived from `nlToEn` (inversion). [VERIFIED: src/i18n/utils.ts:98-100]

**Nav/Footer enablement:** In `Nav.astro` and `Footer.astro`, replace the `{ label: t.nav.boek, reason: '...' }` disabled items with `{ label: t.nav.boek, href: ... }` entries — NL uses `${base}boek`, EN uses `getRelativeLocaleUrl('en', 'book')`. [VERIFIED: src/components/layout/Nav.astro:63-77] [VERIFIED: src/components/layout/Footer.astro:32-46]

---

### Pattern 5: Book Interest Capture — Dual Seam

**Primary: Substack redirect** — same pattern as `Newsletter.astro` IS_SENTINEL guard [VERIFIED: src/components/sections/Newsletter.astro:31-32]:
```astro
const IS_SUBSTACK_SENTINEL = TODO_SUBSTACK_URL === 'TODO_SUBSTACK_URL';
const subscribeUrl = `${TODO_SUBSTACK_URL}/subscribe`;
```
The book page Substack CTA: when IS_SUBSTACK_SENTINEL is false, render a real `<a href={subscribeUrl}>` redirect. When true, render the disabled span with tooltip.

**Secondary: Web3Forms "notify me"** — new `BookInterestForm.astro` component, structurally simpler than `ContactForm.astro` (fewer fields: name + email only). Key differences from ContactForm: different subject, different `?type=` value (`type=boek-interesse`), shorter form (no topic select, no message textarea). [VERIFIED: src/components/forms/ContactForm.astro:1-53]

```astro
<!-- Hidden inputs for Web3Forms -->
<input type="hidden" name="access_key" value={TODO_WEB3FORMS_ACCESS_KEY} />
<input type="hidden" name="subject" value={t.boek.emailSubject} />
<input type="hidden" name="redirect" value="https://web3forms.com/success" />
<!-- type identifier for inbox routing (matches ContactForm ?type= pattern) -->
<input type="hidden" name="type" value="boek-interesse" />
<!-- Honeypot -->
<input type="checkbox" name="botcheck" style="display:none" tabindex="-1" aria-hidden="true" />
```

**`TODO_BOOK_CHECKOUT_URL` seam** — add to `config.ts` following the documented pattern:
```typescript
/**
 * External pre-order / purchase URL for the book.
 * TODO Phase 5+: replace when a real pre-order link is chosen
 * (Gumroad / Bol.com / publisher / Stripe Payment Link).
 * Until supplied: NO purchase button is shown (honesty rule, D-03, HOME-10).
 * Sentinel check: TODO_BOOK_CHECKOUT_URL === 'TODO_BOOK_CHECKOUT_URL'
 * Used in: src/pages/boek.astro, src/pages/en/book.astro
 */
export const TODO_BOOK_CHECKOUT_URL = 'TODO_BOOK_CHECKOUT_URL';
```
In the book page: check the sentinel and show either a disabled affordance or a real `<a>` link — same IS_SENTINEL pattern already used in Newsletter.astro.

---

### Pattern 6: Sticky CTA (D-07) — IntersectionObserver Island

**What:** A fixed-bottom bar with the primary CTA ("Plan kennismaking" / "Book a call") that appears when the hero CTA scrolls out of view, disappears when it re-enters. Tracks click as a Plausible goal.

**Where it appears:** Homepage (`/`, `/en/`) and the book page (`/boek`, `/en/book`) — both are long pages where the hero CTA scrolls away. Supporting pages (coaching, spreker) already have terminal CTA sections; the sticky CTA can be included there too but with lower priority.

**Component structure (`src/components/ui/StickyCTA.astro`):**

```astro
---
interface Props {
  label: string;         // button text (localized, from getStrings())
  href: string;          // destination (e.g. contact URL, BASE_URL safe)
  targetId: string;      // id of the hero CTA element to observe
  plausibleGoal?: string; // Plausible event name on click
}
const { label, href, targetId, plausibleGoal = 'Sticky CTA: Click' } = Astro.props;
---

<div class="sticky-cta" id="sticky-cta" aria-hidden="true" hidden>
  <div class="sticky-cta__inner">
    <a href={href} class="btn btn--primary sticky-cta__btn" id="sticky-cta-btn">
      {label}
    </a>
  </div>
</div>

<script define:vars={{ targetId, plausibleGoal }}>
(function() {
  'use strict';
  var banner = document.getElementById('sticky-cta');
  var btn = document.getElementById('sticky-cta-btn');
  var hero = document.getElementById(targetId);
  if (!banner || !btn || !hero) return;

  // Respect prefers-reduced-motion: no animate-in, just show/hide
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      var show = !entry.isIntersecting;
      banner.hidden = !show;
      banner.setAttribute('aria-hidden', show ? 'false' : 'true');
      if (!prefersReduced) {
        banner.classList.toggle('sticky-cta--visible', show);
      }
    });
  }, { threshold: 0 });

  observer.observe(hero);

  // Plausible goal tracking on click
  btn.addEventListener('click', function() {
    if (typeof window.plausible === 'function') {
      window.plausible(plausibleGoal);
    }
  });
})();
</script>

<style>
  .sticky-cta {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 90; /* below nav (z-index: 100) */
    background-color: var(--color-bg);
    border-top: 1px solid var(--color-border);
    padding-block: var(--space-md);
    transform: translateY(100%);
    transition: transform var(--duration-base) var(--ease-out);
  }

  .sticky-cta--visible {
    transform: translateY(0);
  }

  /* No transition when reduced motion is preferred */
  @media (prefers-reduced-motion: reduce) {
    .sticky-cta {
      transition: none;
    }
  }

  .sticky-cta__inner {
    max-width: var(--max-width);
    margin-inline: auto;
    padding-inline: var(--space-lg);
    display: flex;
    justify-content: center;
  }

  @media (min-width: 768px) {
    .sticky-cta__inner {
      padding-inline: var(--space-3xl);
    }
  }
</style>
```

**Usage in homepage (`src/pages/index.astro`):**
```astro
<StickyCTA
  label={t.hero.ctaPrimary}
  href={`${import.meta.env.BASE_URL}contact`}
  targetId="hero-cta"
  plausibleGoal="Sticky CTA: Click"
/>
```

The hero CTA `<a>` element needs an `id="hero-cta"` attribute added (or the observer can watch the `<Hero />` section element by its existing id). Prefer watching the primary CTA anchor itself.

**z-index:** Nav is `z-index: 100` [VERIFIED: src/components/layout/Nav.astro:421]; sticky CTA should use `z-index: 90` — below nav, above page content.

---

### Anti-Patterns to Avoid

- **Calling `window.plausible()` without a guard:** The function only exists after the Plausible script loads AND the queue guard is in place. Always check `typeof window.plausible === 'function'` before calling. The queue guard in BaseHead handles most cases but the typeof check is belt-and-suspenders.
- **Loading Plausible in development:** Use the `import.meta.env.PROD` gate. The standard `script.js` does not track localhost by default, but the IS_PLACEHOLDER gate is an additional safety net during development.
- **Hard-coding `data-domain` as the GitHub Pages URL:** The `data-domain` must be the production domain registered in Plausible dashboard (e.g. `milanvandermeulen.nl`), NOT `rtdpb.github.io`. Since `SITE_URL` is still a TODO [VERIFIED: src/config.ts:19-20], use a separate `TODO_PLAUSIBLE_DOMAIN` constant.
- **Firing Plausible events in Astro frontmatter:** All `window.plausible()` calls must be inside `<script>` client-side islands. The Astro component script runs on the server at build time.
- **Double-counting book interest:** The Substack redirect anchor and the Web3Forms form are separate capture mechanisms. Attach the Plausible goal to BOTH (one on click for the redirect, one on form success for Web3Forms). Name them differently if you want to distinguish: `'Book: Subscribe'` (Substack click) vs `'Book: Interest'` (Web3Forms submit).
- **Forgetting base-path safety on the PlausibleScript src:** The Plausible CDN URL (`https://plausible.io/js/script.js`) is absolute — NOT prefixed with `BASE_URL`. Only relative internal hrefs need base-path prefixing. [VERIFIED: src/components/layout/BaseHead.astro:27-28]
- **Setting sticky CTA z-index above nav:** Nav is `z-index: 100`; sticky CTA should be 90 to avoid overlapping mobile nav panel (z-index: 200).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Analytics tracking | Custom event collection system | Plausible `window.plausible()` | Edge cases (ad blockers, CORS, sampling), and legal compliance concerns |
| Cookie consent management | Custom banner/modal | Nothing — Plausible is cookieless | No cookies = no consent banner needed under GDPR |
| Book interest email delivery | Custom email endpoint / Netlify function | Web3Forms existing seam | No backend infrastructure; already proven in ContactForm |
| Bilingual routing | Custom locale detection | Astro i18n + `getStrings()` from Phase 4 | Already proven, type-safe, build-time checked |
| CMS for TypeScript i18n objects | Git-based CMS adapter | Defer — migrate content to collections first | Git-based CMSes target markdown/JSON/YAML, not TS const objects |

**Key insight:** All three git-based CMS options (Decap, Sveltia, TinaCMS) are designed around file-based content (Markdown, MDX, YAML, JSON) stored in content collections or flat files — not TypeScript `as const` objects. Connecting them to `nl.ts`/`en.ts` would require a custom adapter or a full content restructuring.

---

## CMS Evaluation (GROW-02 Deliverable Content)

This section is the substance of the GROW-02 written evaluation. The planner should include this reasoning in the phase deliverable (e.g. as a `05-CMS-EVALUATION.md` doc or in the PLAN itself).

### Options Evaluated

| Option | How It Works | Astro Support | i18n Support | Compatible with Current `nl.ts`/`en.ts` Shape? |
|--------|-------------|---------------|--------------|------------------------------------------------|
| **Decap CMS** (formerly Netlify CMS) | Git-based; edits markdown/YAML/JSON files via admin UI; commits to repo | Astro official guide exists | Limited i18n for file collections (single_file structure only for file collections) [CITED: github.com/decaporg/decap-cms issues] | No — targets markdown/collection files, not TypeScript const objects |
| **Sveltia CMS** | Drop-in Decap replacement; faster UI; better i18n support than Decap | Works with Astro; no official guide | Better i18n than Decap (resolved multiple_files structure issues) | No — same file-based content model as Decap |
| **TinaCMS** | Git-based with visual editing; cloud or self-hosted; content stored in Markdown/MDX/JSON | Astro official guide exists; integrates with content collections | No native i18n support | No — designed for content collections schema, not TS const objects |
| **Pages CMS** | Lightweight git-based CMS; YAML/JSON/Markdown files | Works with Astro | Basic i18n | No — file-based only |
| **Astro Content Collections migration + CMS** | Migrate copy from `nl.ts`/`en.ts` into `.md`/`.mdx`/`.json` content collections; then use any git-based CMS | First-class Astro support | Native with Astro i18n | Yes — but requires restructuring first |
| **Keep in code** (status quo) | Edit `nl.ts`/`en.ts` directly; TypeScript validates shape at build time | N/A | Built-in (Phase 4 pattern) | Yes — current approach |

### Recommendation: DEFER (D-08 — confirmed)

**Rationale:**

1. **Content is typed TypeScript, not files.** All copy lives in `src/i18n/nl.ts` and `src/i18n/en.ts` as `as const` objects [VERIFIED: src/i18n/nl.ts:18-356]. Every git-based CMS targets file-based content (markdown, YAML, JSON). None can edit TypeScript source files through their admin UI.

2. **Adopting a CMS now = migrating first.** The prerequisite for any CMS is restructuring the bilingual copy into Astro content collections. That is a larger refactor than Phase 5's scope — and would risk destabilizing the 12 existing pages just shipped in Phases 1–4 (violating GROW-02's "without destabilizing" clause).

3. **Current volume does not justify CMS friction.** The site has ~6 pages + homepage. Content editing frequency is low. The TypeScript build catches structural errors (shape check in `utils.ts`) that a CMS config would not.

4. **The prerequisite:** Migrate `nl.ts`/`en.ts` copy into Astro content collections (type-safe markdown or JSON files with Zod schemas). Once that is done, any git-based CMS can be wired in with a standard config file. This is a clean future Phase 6 or Phase 7.

**Written deliverable:** The planner should produce `05-CMS-EVALUATION.md` containing the above table + rationale, so it exists as a documented decision artifact for future reference.

---

## Runtime State Inventory

> Omitted — this is not a rename/refactor/migration phase. Phase 5 adds new pages and integrations; it does not rename existing identifiers.

---

## Common Pitfalls

### Pitfall 1: Plausible Domain Mismatch

**What goes wrong:** The `data-domain` attribute does not match what is registered in the Plausible dashboard → zero tracking data appears in the dashboard, no errors thrown.

**Why it happens:** The Plausible domain must be exactly the production domain (e.g. `milanvandermeulen.nl`), not the GitHub Pages URL (`rtdpb.github.io`). Since `SITE_URL` in config.ts is still an unconfirmed TODO [VERIFIED: src/config.ts:19-20], a separate `TODO_PLAUSIBLE_DOMAIN` constant ensures the right value is used.

**How to avoid:** Use the IS_PLACEHOLDER sentinel gate — analytics are inert until the correct domain is supplied. When domain is confirmed, grep-replace `TODO_PLAUSIBLE_DOMAIN` with the actual domain, same as all other TODO_ constants.

**Warning signs:** Plausible dashboard shows zero pageviews after deploy. Check the `data-domain` attribute in browser DevTools → Network tab.

### Pitfall 2: Analytics Fires in Development/Staging

**What goes wrong:** Test visits, staging, and localhost traffic contaminate production analytics data.

**Why it happens:** Forgetting the `import.meta.env.PROD` gate. Plausible's standard `script.js` does not track localhost by default, but on staging environments with a custom domain, it might.

**How to avoid:** The IS_PLACEHOLDER gate (D-06) prevents any analytics when `TODO_PLAUSIBLE_DOMAIN` is not replaced. Additionally, `import.meta.env.PROD` is `false` during `npm run dev`. [ASSUMED: `import.meta.env.PROD` is false during `astro dev`; standard Vite behavior]

### Pitfall 3: Book Page `enSlug`/`nlSlug` Missing from BaseHead

**What goes wrong:** Hreflang alternates for `/boek` and `/en/book` are generated incorrectly (both point to the same URL), hurting bilingual SEO.

**Why it happens:** BaseHead.astro uses `effectiveNlSlug` / `effectiveEnSlug` — for translated slugs, the caller must pass explicit `nlSlug="boek"` and `enSlug="book"` props to BaseLayout, which forwards them to BaseHead. [VERIFIED: src/components/layout/BaseHead.astro:55-62]

**How to avoid:** Pass explicit `nlSlug` and `enSlug` props on both the NL and EN book page. Pattern established by existing translated-slug pages (spreker ↔ speaking, mijn-verhaal ↔ about).

### Pitfall 4: Sticky CTA Overlapping Mobile Nav

**What goes wrong:** The sticky CTA `z-index` conflicts with the mobile nav panel (`z-index: 200`) or the site header (`z-index: 100`).

**Why it happens:** Not checking existing z-index values before adding a new fixed element.

**How to avoid:** Nav is `z-index: 100`, mobile panel is `z-index: 200` [VERIFIED: src/components/layout/Nav.astro:427, 671]. Sticky CTA must use `z-index: 90` — visible above page content but below both nav elements.

### Pitfall 5: `plausible()` Called Before Queue Guard

**What goes wrong:** `window.plausible is not a function` error in browser console, event not tracked.

**Why it happens:** The Plausible `<script defer>` tag loads asynchronously. If a form submit fires before it loads, `window.plausible` is undefined.

**How to avoid:** The queue guard (`window.plausible = window.plausible || function() { ... }`) in the second inline script handles this. Additionally, the `typeof window.plausible === 'function'` check in each event handler is belt-and-suspenders.

### Pitfall 6: Duplicate Slug Entry in `nlToEn` Map

**What goes wrong:** Adding `'boek': 'book'` would fail silently if another slug accidentally maps to `'book'` — the uniqueness assertion in `utils.ts` would throw a build error. [VERIFIED: src/i18n/utils.ts:89-96]

**Why it happens:** The `enToNl` inversion is validated at module evaluation time. A duplicate EN slug is caught at build.

**How to avoid:** Verify `'book'` is not already a value in `nlToEn` before adding. Currently: `nlToEn` values are `''`, `'coaching'`, `'speaking'`, `'about'`, `'newsletter'`, `'contact'` — `'book'` is free. [VERIFIED: src/i18n/utils.ts:71-78]

### Pitfall 7: `TODO_BOOK_CHECKOUT_URL` Accidentally Left as Active Href

**What goes wrong:** If the sentinel string is used as an `href`, browsers navigate to `TODO_BOOK_CHECKOUT_URL` (a broken URL) rather than showing a disabled state.

**How to avoid:** Mirror the IS_SENTINEL pattern exactly from Newsletter.astro [VERIFIED: src/components/sections/Newsletter.astro:31-32]:
```astro
const IS_CHECKOUT_SENTINEL = TODO_BOOK_CHECKOUT_URL === 'TODO_BOOK_CHECKOUT_URL';
```
Then conditionally render either a disabled span or a real `<a>` element.

---

## Code Examples

### Example 1: Production-Gated Plausible Script Tag

```astro
---
// Source: [CITED: plausible.io/docs/plausible-script], [CITED: santychuy.com/blog/plausible-astro-simplified-web-analytics-guide]
import { TODO_PLAUSIBLE_DOMAIN } from '../../config';
const isProd = import.meta.env.PROD;
const IS_PLACEHOLDER = TODO_PLAUSIBLE_DOMAIN === 'TODO_PLAUSIBLE_DOMAIN';
const shouldInject = isProd && !IS_PLACEHOLDER;
---
{shouldInject && (
  <>
    <script defer data-domain={TODO_PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.js"></script>
    <script is:inline>
      window.plausible = window.plausible || function() {
        (window.plausible.q = window.plausible.q || []).push(arguments);
      };
    </script>
  </>
)}
```

### Example 2: Firing a Custom Plausible Event (Contact Form Success)

```javascript
// Source: [CITED: plausible.io/docs/custom-event-goals]
// Add inside ContactForm.astro JS island, after json.success === true check:
if (typeof window.plausible === 'function') {
  window.plausible('Contact: Submit');
}
```

### Example 3: Book Page i18n Key Block (NL)

```typescript
// Add to src/i18n/nl.ts after existing keys:
boek: {
  pageTitle:   'Boek — Milan van der Meulen',
  pageDesc:    'Het boek dat Milan schrijft over schalen zonder jezelf te verliezen. Schrijf je in voor updates.',
  eyebrow:     'Binnenkort',
  heading:     'Een boek over schalen zonder jezelf te verliezen',
  body:        'Ik schrijf een boek. Over wat ik heb geleerd in tien jaar bouwen, groeien en uiteindelijk failliet gaan. Geen succesverhaal — een eerlijk verslag van wat er werkelijk gebeurt als je een bedrijf opschaalt.',
  subtext:     'Schrijf je in voor updates en ontvang het nieuws als eerste.',
  ctaSubstack: 'Schrijf je in voor updates',
  ctaNotify:   'Stuur mij een seintje',
  formHeading: 'Houd me op de hoogte',
  labelNaam:   'Naam',
  labelEmail:  'Mailadres',
  ctaSubmit:   'Stuur mij een seintje',
  ctaSubmitting: 'Versturen…',
  successMsg:  'Bedankt! Je hoort het als het boek er is.',
  errorMsg:    'Er is iets misgegaan. Probeer het opnieuw.',
  errorNetwork: 'Geen verbinding. Controleer je internetverbinding.',
  emailSubject: 'Boek interesse via milanvandermeulen.nl',
  checkoutCta: 'Pre-order',   // shown only when TODO_BOOK_CHECKOUT_URL is supplied
},
```

Equivalent keys must be mirrored in `en.ts` with English copy. The `utils.ts` shape-check enforces this at build time. [VERIFIED: src/i18n/utils.ts:48]

### Example 4: Sticky CTA IntersectionObserver Pattern

```javascript
// Source: [ASSUMED] Standard IntersectionObserver pattern — consistent with RevealOnScroll.astro
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    var show = !entry.isIntersecting;
    banner.hidden = !show;
    banner.setAttribute('aria-hidden', show ? 'false' : 'true');
    if (!prefersReduced) {
      banner.classList.toggle('sticky-cta--visible', show);
    }
  });
}, { threshold: 0 });
observer.observe(heroElement);
```

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| Google Analytics (cookie-based) | Plausible (cookieless) | No consent banner needed in EU |
| Git-based CMS directly on markdown | CMS on Astro content collections | CMS requires content collections as prerequisite |
| Custom sticky CTAs with scroll listeners | IntersectionObserver API | Lower CPU, no passive-scroll overhead |
| Script variant juggling | Single `script.js` + manual `window.plausible()` | Simpler, fewer script tags, no CSS class pollution |

**Deprecated/outdated:**
- `window.plausible.q` pattern without the queue guard: Always include the guard even though Plausible's own `defer` attribute should load it before user interaction in most cases. [CITED: github.com/plausible/analytics discussions]

---

## Open Questions

1. **Production domain confirmation**
   - What we know: `SITE_URL = 'https://milanvandermeulen.nl'` is marked as an assumption [VERIFIED: src/config.ts:19-20]; current deploy is on GitHub Pages (`rtdpb.github.io/milan-website/`).
   - What's unclear: Has `milanvandermeulen.nl` been registered and confirmed? The Plausible account must be created for this domain.
   - Recommendation: Treat `TODO_PLAUSIBLE_DOMAIN` as a pure placeholder until the domain is confirmed. The planner should note this as a human-checkpoint before activating analytics.

2. **Which pages should show the sticky CTA?**
   - What we know: D-07 says "on long pages." Homepage and book page are the primary candidates.
   - What's unclear: Should coaching, spreker, and mijn-verhaal pages also have the sticky CTA? They already have terminal CTA sections.
   - Recommendation: Implement on homepage + book page only for Phase 5. Extend to supporting pages in a later pass if analytics show need.

3. **Plausible event naming: colon-separated vs plain**
   - What we know: Goal names must match character-for-character between code and dashboard [CITED: plausible.io/docs/custom-event-goals].
   - What's unclear: Whether `'Contact: Submit'` (with colon-space) is supported in the Plausible dashboard goal name field.
   - Recommendation: Use the colon-space format as proposed in CONTEXT.md §Specifics. If the dashboard rejects it, fall back to underscored names (`'Contact_Submit'`). Register goals before the domain goes live.

4. **Web3Forms type value for book interest**
   - What we know: ContactForm uses `type` values `algemeen`, `lezing`, `coaching` [VERIFIED: src/components/forms/ContactForm.astro:218].
   - What's unclear: Whether Milan wants a separate inbox filter for book interest vs. the main contact inbox.
   - Recommendation: Use `type=boek-interesse` as a hidden input value — it routes to the same Web3Forms inbox but is distinguishable by subject line filter.

---

## Environment Availability

> No new external tools or runtimes required. Phase 5 adds a CDN script tag and reuses existing web services.

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Plausible account + domain | Analytics (D-04) | ✗ (not yet created) | — | Script stays inert via IS_PLACEHOLDER gate until supplied |
| `milanvandermeulen.nl` domain | Plausible data-domain | ✗ (unconfirmed) | — | Same IS_PLACEHOLDER gate |
| Web3Forms access key | Book interest form | ✗ (placeholder) | — | Form submits fail gracefully (existing State 7 pattern) |
| Substack URL | Book subscribe redirect | ✗ (placeholder) | — | IS_SUBSTACK_SENTINEL disables redirect button |

**Missing dependencies with no fallback:** None — all dependencies have sentinel/IS_PLACEHOLDER patterns already proven in the codebase.

**Missing dependencies with fallback:** All four above are behind existing or new `TODO_*` config seams. The site deploys and looks correct with all of them as placeholders.

---

## Validation Architecture

> `workflow.nyquist_validation` is `true` in `.planning/config.json`.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | No automated test framework installed (Astro build + smoke scripts) |
| Config file | `scripts/smoke-i18n.js` (post-build ES module check) — [VERIFIED: STATE.md:72] |
| Quick run command | `npm run build` (build-time TypeScript shape check via `utils.ts` satisfies) |
| Full suite command | `npm run build && node scripts/smoke-i18n.js` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| BOOK-01 | `/boek` page renders with NL content | smoke | `npm run build` (build fails if page missing) | ❌ Wave 0 |
| BOOK-01 | `/en/book` page renders with EN content | smoke | `npm run build && node scripts/smoke-i18n.js` | ❌ Wave 0 |
| BOOK-01 | "Boek" nav/footer links active in both locales | smoke/manual | `npm run build` (would fail on broken import), manual browser check | — |
| BOOK-01 | `nlToEn['boek'] === 'book'` and `enToNl['book'] === 'boek'` | unit (build-time) | `npm run build` — uniqueness assertion in utils.ts throws if broken | ✅ `src/i18n/utils.ts` |
| GROW-01 | Plausible script NOT injected in dev | smoke | `npm run dev` + check HTML for script absence | — |
| GROW-01 | Plausible script injected in prod build when domain supplied | smoke | `TODO_PLAUSIBLE_DOMAIN` replaced + `npm run build` | — |
| GROW-01 | Custom event calls compile without TS errors | build | `npm run build` | — |
| GROW-02 | CMS evaluation doc exists | manual | file presence check | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `npm run build` (catches TypeScript shape errors and Astro build failures)
- **Per wave merge:** `npm run build && node scripts/smoke-i18n.js`
- **Phase gate:** Full build green + manual browser verification of `/boek` and `/en/book` before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] `src/pages/boek.astro` — covers BOOK-01 (NL page)
- [ ] `src/pages/en/book.astro` — covers BOOK-01 (EN page)
- [ ] `src/components/analytics/PlausibleScript.astro` — covers GROW-01 (analytics component)
- [ ] `src/components/ui/StickyCTA.astro` — covers GROW-01 (conversion optimization)
- [ ] `src/components/forms/BookInterestForm.astro` — covers BOOK-01 (interest capture)
- [ ] `.planning/phases/05-book-pre-order-future-growth/05-CMS-EVALUATION.md` — covers GROW-02

---

## Security Domain

> `security_enforcement: true`, `security_asvs_level: 1` in `.planning/config.json`.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | No auth in this phase |
| V3 Session Management | No | No sessions |
| V4 Access Control | No | Static public pages only |
| V5 Input Validation | Yes | BookInterestForm: same Web3Forms pattern as ContactForm — server-side validation by Web3Forms; client: `checkValidity()` + fixed allowlist for any query params |
| V6 Cryptography | No | No cryptographic operations |

### Known Threat Patterns for This Stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| DOM XSS via API response echoing | Tampering | ContactForm pattern: only static strings from `t.boek.*` written to DOM — NEVER `json.message` or user input. [VERIFIED: src/components/forms/ContactForm.astro:277-281] |
| Honeypot bypass (spam) | Spoofing | Web3Forms `botcheck` checkbox (same as ContactForm). [VERIFIED: src/components/forms/ContactForm.astro:86-89] |
| Plausible script loaded from CDN | Dependency | CDN is `plausible.io` (EU-hosted, established provider). No subresource integrity needed for a first-party analytics tool — but verify CDN URL is exactly `https://plausible.io/js/script.js` |
| Open redirect via `TODO_BOOK_CHECKOUT_URL` | Elevation | IS_SENTINEL pattern: URL only used when admin confirms it — never user-supplied |
| Substack redirect target | Spoofing | `subscribeUrl` is derived only from `TODO_SUBSTACK_URL` constant — never user input. [VERIFIED: src/components/sections/Newsletter.astro:31-32] |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `import.meta.env.PROD` is `false` during `astro dev` and `true` during `astro build` production builds | Plausible Pattern 1 | Analytics fires in development; test data contaminates dashboard |
| A2 | Goal names with colon-space (`'Contact: Submit'`) are accepted in the Plausible dashboard | Custom Events Pattern | Goals don't register; events tracked but not attributed to goals |
| A3 | The Plausible standard `script.js` does not track localhost by default (dev safety) | Pitfall 2 | dev traffic appears in analytics if IS_PLACEHOLDER gate is bypassed |
| A4 | `is:inline` on the Plausible queue guard script prevents Astro from bundling/deferring it | Pattern 1 | Queue guard executes after form handlers, causing `window.plausible is not a function` errors |
| A5 | Web3Forms accepts `type=boek-interesse` as a hidden field value and includes it in the email | Book Interest Form | Inbox routing note absent; less clear to Milan which emails are book interest |
| A6 | `IntersectionObserver` is supported in all browsers targeted by this site (no polyfill needed) | Sticky CTA Pattern | Sticky CTA never appears or errors on older browsers |
| A7 | The hero CTA element can receive an `id="hero-cta"` attribute without breaking existing styles or scripts | Sticky CTA Pattern | `document.getElementById` fails, sticky CTA never observes the hero |

**If this table is empty:** N/A — 7 assumed claims listed above. Most are low-risk (standard browser APIs, well-documented Astro behavior) but should be verified during execution.

---

## Sources

### Primary (MEDIUM confidence — verified against official docs or authoritative source)

- [plausible.io/docs/custom-event-goals](https://plausible.io/docs/custom-event-goals) — Custom event API, `window.plausible()` signature, CSS class approach
- [plausible.io/docs/plausible-script](https://plausible.io/docs/plausible-script) — Script tag placement, `data-domain` attribute, script variants
- [plausible.io/cookieless-web-analytics](https://plausible.io/cookieless-web-analytics) — GDPR compliance without consent banner

### Secondary (MEDIUM confidence — websearch with cross-reference)

- [santychuy.com/blog/plausible-astro-simplified-web-analytics-guide](https://santychuy.com/blog/plausible-astro-simplified-web-analytics-guide) — Plausible + Astro integration pattern, `import.meta.env.PROD` usage
- [deepwiki.com/plausible/docs/3.2-custom-events-and-tracking](https://deepwiki.com/plausible/docs/3.2-custom-events-and-tracking) — Tagged events URL format, window.plausible queue
- [github.com/plausible/analytics discussions #1564, #1170](https://github.com/plausible/analytics/discussions/1564) — Queue pattern `window.plausible.q`
- [plausible.io/blog/legal-assessment-gdpr-eprivacy](https://plausible.io/blog/legal-assessment-gdpr-eprivacy) — Legal assessment of cookieless analytics under GDPR

### Tertiary (LOW confidence — training knowledge, codebase-verified)

- [decapcms.org/docs/i18n/](https://decapcms.org/docs/i18n/) — Decap CMS i18n limitations for file collections
- [tina.io/docs/frameworks/astro](https://tina.io/docs/frameworks/astro) — TinaCMS Astro integration
- IntersectionObserver sticky CTA pattern — standard browser API, MDN-documented

### Codebase (VERIFIED — read this session)

- `src/config.ts:1-93` — TODO_ seam pattern, SITE_URL placeholder, all existing constants
- `src/i18n/nl.ts:18-356` — Full NL copy object shape, all existing top-level keys
- `src/i18n/en.ts:1-50` — EN shape (mirrors NL), existing keys
- `src/i18n/utils.ts:71-100` — `nlToEn` map values, `enToNl` inversion, uniqueness guard
- `src/components/layout/Nav.astro:63-77` — Disabled "Boek" navItems pattern, `reason` field
- `src/components/layout/Footer.astro:32-46` — Disabled "Boek" footer item
- `src/components/layout/BaseHead.astro:27-62` — Base path handling, hreflang pattern, `nlSlug`/`enSlug` props
- `src/components/forms/ContactForm.astro:86-89, 218, 277-281` — Honeypot, type field, XSS-safe DOM pattern
- `src/components/sections/Newsletter.astro:31-32` — IS_SENTINEL guard pattern
- `src/components/layout/Nav.astro:421, 671` — z-index values (100 header, 200 mobile panel)
- `src/pages/en/index.astro:1-79` — EN page wrapper pattern (no prop-drilling, locale auto)
- `astro.config.mjs:20-27` — i18n config, defaultLocale, trailingSlash

---

## Metadata

**Confidence breakdown:**
- Plausible script injection pattern: MEDIUM — cross-referenced against official docs and Astro community guides
- Plausible custom events API: MEDIUM — confirmed from official docs
- GDPR/no-consent-banner finding: MEDIUM — confirmed from Plausible's own legal analysis
- Book page architecture: HIGH — directly derived from verified codebase patterns
- CMS evaluation: MEDIUM — based on official docs + github issues for i18n limitations
- Sticky CTA pattern: LOW-MEDIUM — standard browser API (IntersectionObserver), consistent with existing `RevealOnScroll.astro` pattern in repo

**Research date:** 2026-08-19
**Valid until:** 2026-09-18 (30 days — Plausible API is stable; Astro API is stable at v7)
