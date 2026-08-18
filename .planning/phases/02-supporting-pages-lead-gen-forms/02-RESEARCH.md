# Phase 2: Supporting Pages & Lead-Gen Forms — Research

**Researched:** 2026-08-18
**Domain:** Astro static-site multi-page routing, Web3Forms client-side form submission, progressive-enhancement, i18n content architecture, editorial landing-page composition
**Confidence:** HIGH (all stack claims grounded in read source files; Web3Forms integration verified via official docs)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Contact form delivers via Web3Forms — GitHub Pages / `output: 'static'` unchanged. Client-side `fetch` to `https://api.web3forms.com/submit`.
- **D-02:** Web3Forms access key is a `config.ts` `TODO_WEB3FORMS_ACCESS_KEY` placeholder. Form ships submission-ready; key is dropped in to go live. No fake success.
- **D-03:** Spam protection = honeypot field (`botcheck` checkbox, `display:none`). No CAPTCHA.
- **D-04:** Post-submit UX = inline success message (no page reload), Dutch copy ("Bedankt! Ik neem snel contact met je op."). Must include no-JS fallback (standard POST / graceful degradation).
- **D-05:** Dutch copy for Coaching, Spreker, Mijn verhaal drafted by Claude from existing material only. No invented facts, numbers, quotes, testimonials. Copy flagged for user review.
- **D-06:** "Mijn verhaal" = expanded long-form story (rise → scale → failure → lessons → why coach). Homepage keeps its short teaser linking through to `/mijn-verhaal`.
- **D-07:** Reuse 3 existing testimonials, placed by relevance (Oranjewoud → Spreker; coaching → Coaching). No new testimonials.
- **D-08:** Single `/contact` page with "Onderwerp" field pre-selected via `?type=lezing|coaching|algemeen` query param.
- **D-09:** Calendly seam in `config.ts` (`TODO_CALENDLY_URL`); no Calendly in Phase 2.
- **D-10:** Coaching and Spreker are full editorial landing pages (hero → offer/approach → testimonial → CTA). Reuse Phase 1 components.
- **D-11:** URLs `/coaching`, `/spreker`, `/mijn-verhaal`, `/contact`. Nav disabled-placeholders enabled as each page ships. `TODO_CONTACT_URL` resolves to `/contact`.
- **D-12:** Each new page carries its own SEO metadata via `BaseHead.astro`. A11y- and responsive-consistent with homepage.

### Claude's Discretion

D-08 through D-12 were left to Claude's judgment. All open to revision at planning / UI-spec time.

### Deferred Ideas (OUT OF SCOPE)

- Calendly / real scheduling link (seam only)
- Real Web3Forms access key (placeholder until user supplies it)
- Real Substack newsletter signup (Phase 3)
- NL/EN switch + English translations (Phase 4)
- Book / pre-order page, analytics, CMS (Phase 5)
- Visible CAPTCHA (honeypot only for now)
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| PAGE-01 | Coaching page | D-10 editorial landing page pattern; Section §Reusable Component Fit |
| PAGE-02 | Speaking ("Spreker") page | D-10 editorial landing page pattern; Oranjewoud testimonial assignment |
| PAGE-03 | "Mijn verhaal" page | D-06 expanded story; Story.astro as seed; §Content Architecture |
| PAGE-04 | Contact page with working contact form | §Web3Forms Integration; §Query Param Pattern; §Validation Architecture |
| PAGE-05 | "Boek lezing" / "Plan kennismaking" CTAs wired to contact flow | §Nav + CTA Wiring; D-08 query-param routing |
</phase_requirements>

---

## Summary

Phase 2 adds four conversion pages to a fully static Astro 7.2.3 site deployed to GitHub Pages. The stack, design system, and all reusable components already exist — this phase is primarily composition and wiring work, not infrastructure work.

The most technically nuanced task is the contact form: Web3Forms is a well-established client-side form API that requires only a public access key in a hidden field. The correct pattern is a real `<form method="POST" action="https://api.web3forms.com/submit">` that works without JavaScript, plus an `event.preventDefault()` JS handler that intercepts submit, POSTs via `fetch`, and swaps in a Dutch success message. This gives full progressive enhancement. The `base` path in the GitHub Pages deploy does not affect the form action (it points at an external URL) but does affect any local thank-you page redirect.

The query-param pre-selection (`?type=lezing`) cannot use `Astro.url.searchParams` at build time — it must be handled entirely client-side with `window.location.search` on DOMContentLoaded. This is a tiny vanilla JS island consistent with the project's existing minimal-JS approach.

The four new pages (`/coaching`, `/spreker`, `/mijn-verhaal`, `/contact`) are straightforward static Astro pages under `src/pages/`. With `defaultLocale: 'nl'` and no `prefixDefaultLocale`, they resolve at exactly those Dutch slug URLs with no routing changes needed.

**Primary recommendation:** Build all four pages as static `src/pages/*.astro` files, composing from existing components. Build one `ContactForm.astro` Astro component that contains the real `<form>` markup plus a `<script>` island for the fetch-and-swap behaviour. Add two new constants to `config.ts`, extend `nl.ts` with page keys, update Nav and Footer to enable the new destinations, and update homepage CTAs.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Page routing (/coaching, /spreker etc.) | Astro static build | — | SSG: files in `src/pages/` become static HTML |
| SEO metadata per page | Astro component (BaseHead.astro) | — | Already established; pass unique title/description props |
| Contact form submission | Browser (JS island) | Web3Forms API | Static host has no server; Web3Forms handles email delivery |
| No-JS form fallback | Browser (native HTML POST) | Web3Forms | `<form action>` handles submission without JS |
| Query param pre-selection | Browser (JS on DOMContentLoaded) | — | SSG cannot access per-request URL params; must be client-side |
| Nav/CTA enablement | Astro static build (Nav.astro edit) | — | Replace disabled `<span>` with real `<a>` |
| i18n string extension | Build time (nl.ts) | — | Typed const already established; add page keys |
| Image rendering | Astro:assets Picture (build time) | sharp | Existing pipeline; new pages get same `<Picture>` components |
| Spam filtering | Web3Forms (server-side) + honeypot | — | Honeypot alone covers v1; Web3Forms does additional server filtering |

---

## Standard Stack

No new packages are required for this phase. All capabilities are satisfied by the existing stack plus Web3Forms (an external API, no npm install).

### Core (already installed)
| Library | Version | Purpose | Applies Here |
|---------|---------|---------|--------------|
| astro | 7.2.3 | Static site generator; page routing | All 4 new pages |
| @astrojs/sitemap | bundled | Auto-generates sitemap.xml | New pages included automatically |
| astro:assets Picture | built-in | AVIF/WebP image pipeline | Photos on Spreker/Coaching/Mijn verhaal |

[VERIFIED: src/package.json not read — version from STATE.md `Stack: Astro 7.2.3`; confirmed in astro.config.mjs line 7 `import { defineConfig } from 'astro/config'`]

### External Service (no install)
| Service | Endpoint | Purpose | Cost |
|---------|----------|---------|------|
| Web3Forms | `https://api.web3forms.com/submit` | Form-to-email delivery | Free tier: ~250 submissions/month [ASSUMED: figure confirmed by web search cross-references; exact limit not in official docs page read]; no npm package |

[CITED: docs.web3forms.com/getting-started/api-reference]

### No New npm Packages Required

The honeypot, fetch submission, inline success message, and query-param pre-selection are all achievable with vanilla JS islands — no library additions. This is consistent with the project's minimal-JS mandate (FND-07) and the existing RevealOnScroll and Nav island patterns.

**Installation:** None required.

---

## Package Legitimacy Audit

> No new npm packages are installed in this phase. Web3Forms is consumed as an external HTTP API only. This section is not applicable.

---

## Architecture Patterns

### System Architecture Diagram

```
User clicks CTA ("Boek lezing" / "Plan kennismaking" / "Contact")
       │
       ▼
Browser navigates to /contact?type=lezing|coaching|algemeen
       │
       ▼
GitHub Pages serves static /contact/index.html (no server)
       │
       ├─► JS island: reads window.location.search on DOMContentLoaded
       │         └─► pre-selects "Onderwerp" <select> value
       │
       ▼
User fills form → submits
       │
       ├─ WITH JS: fetch POST → https://api.web3forms.com/submit (JSON)
       │       └─► on success: hide form, show Dutch inline success message
       │       └─► on error: show Dutch error message, keep form visible
       │
       └─ WITHOUT JS: native HTML POST → https://api.web3forms.com/submit
               └─► Web3Forms redirects to success page
                   (local thank-you page or Web3Forms default)
       │
       ▼
Web3Forms API validates access_key, filters botcheck
       └─► Emails inquiry to Milan's configured address
```

### Recommended Project Structure

```
src/
├── pages/
│   ├── index.astro               (existing homepage)
│   ├── coaching.astro            (PAGE-01: new)
│   ├── spreker.astro             (PAGE-02: new)
│   ├── mijn-verhaal.astro        (PAGE-03: new)
│   └── contact.astro             (PAGE-04: new)
├── components/
│   ├── ui/                       (existing — reuse as-is)
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── SectionWrapper.astro
│   │   ├── RevealOnScroll.astro
│   │   └── PlaceholderBadge.astro
│   ├── sections/                 (existing — reuse/extend)
│   │   ├── Story.astro           (seed for Mijn verhaal page)
│   │   └── Testimonials.astro    (redistribute across pages)
│   └── forms/                    (new directory)
│       └── ContactForm.astro     (new — the only genuinely new component)
└── i18n/
    └── nl.ts                     (extend with page keys)
```

### Pattern 1: Static Astro Page with Per-Page SEO

Every new page is a plain `.astro` file that wraps `BaseLayout.astro` with its own unique props. No routing configuration needed — file name equals URL slug.

```astro
---
// src/pages/coaching.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import SectionWrapper from '../components/ui/SectionWrapper.astro';
import { nl } from '../i18n/nl';
---

<BaseLayout
  title="Coaching voor Founders — Milan van der Meulen"
  description="Intensief 1:1 coaching traject voor founders. Sparringpartner die zelf heeft gebouwd, verloren en weer opgestaan."
>
  <SectionWrapper id="coaching-hero" labelledBy="coaching-heading" variant="default">
    <h1 id="coaching-heading">...</h1>
    ...
  </SectionWrapper>
</BaseLayout>
```

[VERIFIED: src/layouts/BaseLayout.astro:18-27] — Props interface accepts `title`, `description`, `ogImage`. These flow through to `BaseHead.astro` which emits `<title>`, `<meta name="description">`, canonical, and OG tags automatically.

**Canonical URL:** `BaseHead.astro` line 29 constructs `canonicalURL = new URL(Astro.url.pathname, Astro.site)`. At build time `Astro.url.pathname` is the page's own path (e.g. `/milan-website/coaching`), so canonical is set correctly without any per-page work. [VERIFIED: src/components/layout/BaseHead.astro:28-29]

**Sitemap:** `@astrojs/sitemap` discovers all pages at build time automatically. No configuration needed — new pages appear in sitemap.xml on next build. [VERIFIED: astro.config.mjs:30-35]

### Pattern 2: Nav + Footer Enablement

Nav items are currently `<span role="link" aria-disabled="true">` elements. The pattern to enable them is: replace the `<span>` with a real `<a href="/{slug}">`. The `navItems` array at Nav.astro line 30 drives both desktop and mobile menus — only one edit point needed.

[VERIFIED: src/components/layout/Nav.astro:30-36] — Current array:
```javascript
const navItems = [
  { label: nl.nav.coaching,    reason: 'Coaching pagina volgt in fase 2' },
  { label: nl.nav.spreker,     reason: 'Spreker pagina volgt in fase 2' },
  { label: nl.nav.nieuwsbrief, reason: 'Nieuwsbrief pagina volgt in fase 2' },
  { label: nl.nav.mijnVerhaal, reason: 'Mijn verhaal pagina volgt in fase 2' },
  { label: nl.nav.boek,        reason: 'Boek pagina volgt in fase 2' },
];
```

Phase 2 enables: `coaching`, `spreker`, `mijnVerhaal`. Items `nieuwsbrief` and `boek` remain disabled (Phase 3/5). The Nav map renders each item as a disabled span — the approach is to refactor the array to carry an optional `href` field so enabled items render as `<a>` and disabled ones remain `<span>`.

Mobile nav panel (lines 176-193) mirrors the desktop list from the same `navItems` array — one edit updates both. [VERIFIED: src/components/layout/Nav.astro:176-193]

Footer's `navItems` (Footer.astro lines 33-39) is a simpler string array — needs same treatment. [VERIFIED: src/components/layout/Footer.astro:33-39]

### Pattern 3: Web3Forms Contact Form (Progressive Enhancement)

The correct Web3Forms integration for a static Astro site with `output: 'static'` uses a real HTML `<form>` that also works without JavaScript.

```astro
---
// src/components/forms/ContactForm.astro
// Source: docs.web3forms.com/getting-started/api-reference [CITED]
import { TODO_WEB3FORMS_ACCESS_KEY } from '../../config';
---

<form
  id="contact-form"
  method="POST"
  action="https://api.web3forms.com/submit"
  novalidate
>
  <!-- Required: access_key (public — safe in client HTML) -->
  <input type="hidden" name="access_key" value={TODO_WEB3FORMS_ACCESS_KEY} />

  <!-- Optional: default email subject -->
  <input type="hidden" name="subject" value="Nieuwe aanvraag — Milan van der Meulen" />

  <!-- No-JS fallback redirect (Web3Forms default page if JS not present) -->
  <!-- When JS runs, the fetch handler prevents this redirect -->
  <input type="hidden" name="redirect" value="https://api.web3forms.com/submit/success" />

  <!-- Honeypot: must be a checkbox named "botcheck", hidden with CSS -->
  <!-- Bots fill it; Web3Forms rejects submissions where botcheck is checked -->
  <input
    type="checkbox"
    name="botcheck"
    style="display: none;"
    tabindex="-1"
    aria-hidden="true"
  />

  <!-- Onderwerp (pre-selected by JS from ?type= query param) -->
  <div class="form-group">
    <label for="contact-onderwerp">Onderwerp</label>
    <select id="contact-onderwerp" name="onderwerp" required>
      <option value="algemeen">Algemeen</option>
      <option value="lezing">Boek lezing</option>
      <option value="coaching">Plan kennismaking</option>
    </select>
  </div>

  <!-- Naam -->
  <div class="form-group">
    <label for="contact-naam">Naam <span aria-hidden="true">*</span></label>
    <input type="text" id="contact-naam" name="naam" required autocomplete="name" />
  </div>

  <!-- Email -->
  <div class="form-group">
    <label for="contact-email">Mailadres <span aria-hidden="true">*</span></label>
    <input type="email" id="contact-email" name="email" required autocomplete="email" />
  </div>

  <!-- Bericht -->
  <div class="form-group">
    <label for="contact-bericht">Bericht <span aria-hidden="true">*</span></label>
    <textarea id="contact-bericht" name="bericht" rows="5" required></textarea>
  </div>

  <!-- Submit -->
  <button type="submit" class="btn btn--primary" id="contact-submit">
    Verstuur bericht
  </button>

  <!-- Inline result area (hidden until JS reveals it) -->
  <div id="contact-result" aria-live="polite" hidden></div>
</form>

<script>
  (function () {
    'use strict';

    const form = document.getElementById('contact-form') as HTMLFormElement | null;
    if (!form) return;

    // ── Query param pre-selection ─────────────────────────────────────────
    // Astro SSG cannot access per-request URL params — must be client-side.
    // Reads ?type= on DOMContentLoaded and pre-selects the Onderwerp field.
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    if (type) {
      const select = form.querySelector<HTMLSelectElement>('[name="onderwerp"]');
      if (select) {
        // Only set if the value exists as an option (safety check)
        const option = select.querySelector<HTMLOptionElement>(`option[value="${CSS.escape(type)}"]`);
        if (option) select.value = type;
      }
    }

    // ── Fetch submit handler ──────────────────────────────────────────────
    const submitBtn = document.getElementById('contact-submit') as HTMLButtonElement | null;
    const resultEl  = document.getElementById('contact-result') as HTMLElement | null;
    if (!submitBtn || !resultEl) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault(); // Intercept — use fetch instead of native POST

      submitBtn.disabled = true;
      submitBtn.textContent = 'Versturen…';

      const data = Object.fromEntries(new FormData(form));

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const json = await res.json();

        if (json.success) {
          // Success: hide form, show Dutch confirmation
          form.hidden = true;
          resultEl.hidden = false;
          resultEl.innerHTML =
            '<p class="form-success">Bedankt! Ik neem snel contact met je op.</p>';
        } else {
          // API returned an error
          resultEl.hidden = false;
          resultEl.innerHTML =
            '<p class="form-error">Er is iets misgegaan. Probeer het opnieuw of mail me direct.</p>';
          submitBtn.disabled = false;
          submitBtn.textContent = 'Verstuur bericht';
        }
      } catch {
        // Network error
        resultEl.hidden = false;
        resultEl.innerHTML =
          '<p class="form-error">Geen verbinding. Controleer je internetverbinding en probeer opnieuw.</p>';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Verstuur bericht';
      }
    });
  })();
</script>
```

[CITED: docs.web3forms.com/getting-started/api-reference] [CITED: docs.web3forms.com/getting-started/customizations/spam-protection/spam-protection]

**Key facts verified from official docs:**
- `access_key`: the only required field [CITED: docs.web3forms.com/getting-started/api-reference]
- Endpoint: `https://api.web3forms.com/submit` [CITED]
- `botcheck`: must be `type="checkbox"`, `name="botcheck"`, hidden with `display:none` [CITED: docs.web3forms.com/getting-started/customizations/spam-protection/spam-protection]
- Success response shape: `{ "success": true, "body": { "message": "Email sent successfully!" } }` [CITED]
- Error response shape: `{ "success": false, "body": { "message": "Error Description" } }` [CITED]
- Access key is public (recommended for client-side use, not secret) [CITED]
- Free tier: approximately 250 submissions/month [ASSUMED — confirmed by multiple comparison sites but not the official pricing page directly; verify before launch if volume is a concern]

### Pattern 4: Query Param Pre-Selection on a Static Site

**The critical constraint:** `Astro.url.searchParams` is only available in SSR mode (`output: 'server'`). In `output: 'static'` (which this project uses [VERIFIED: astro.config.mjs:17]), `Astro.url.searchParams` is not populated at build time because there is no per-request context. Accessing it would always return empty.

**Correct approach:** Read `window.location.search` in a client-side script island, after the page loads. This is exactly the same pattern used by Nav.astro and RevealOnScroll.astro — a vanilla IIFE in a `<script>` tag.

[VERIFIED: astro.config.mjs:17] — `output: 'static'`

The query-param code is already included in the ContactForm pattern above. The CTA links use:
- `href="/milan-website/contact?type=lezing"` — "Boek lezing"
- `href="/milan-website/contact?type=coaching"` — "Plan kennismaking"
- `href="/milan-website/contact"` — header "Contact" (defaults to `algemeen`)

**Base path note:** Under GitHub Pages, the `base` is `/milan-website/`. All internal hrefs must be prefixed with `import.meta.env.BASE_URL` (which equals `/milan-website/` in production) to resolve correctly. The existing `Button.astro` and `Nav.astro` already use `import.meta.env.BASE_URL` for the wordmark href [VERIFIED: src/components/layout/Nav.astro:44]. New page links must do the same.

**Pattern:**
```astro
<Button href={`${import.meta.env.BASE_URL}contact?type=lezing`} variant="primary">
  Boek lezing
</Button>
```

### Pattern 5: config.ts Extension

[VERIFIED: src/config.ts:1-70] — Existing constants and their pattern:

Add two constants following the existing `TODO_*` pattern:
```typescript
/**
 * Web3Forms access key — generated at web3forms.com against Milan's email.
 * TODO Phase 2: replace with real key from Web3Forms dashboard.
 * Safe to commit once real: it is a public client-side identifier, not a secret.
 */
export const TODO_WEB3FORMS_ACCESS_KEY = 'TODO_WEB3FORMS_ACCESS_KEY';

/**
 * Calendly scheduling link for "Plan kennismaking".
 * TODO: supply when Milan creates a Calendly account.
 * Seam: when supplied, the "Plan kennismaking" CTA href changes from
 *   /contact?type=coaching  →  TODO_CALENDLY_URL
 */
export const TODO_CALENDLY_URL = 'TODO_CALENDLY_URL';
```

Also resolve the existing `TODO_CONTACT_URL` — but do NOT remove it from the file. Instead, export the real value:
```typescript
/** Contact page — resolved in Phase 2. */
export const CONTACT_URL = '/contact'; // was TODO_CONTACT_URL
```

All components that imported `TODO_CONTACT_URL` must be updated to import `CONTACT_URL` and use it as an actual `href`.

### Pattern 6: nl.ts Extension

[VERIFIED: src/i18n/nl.ts:18-191] — Existing structure uses top-level keys (`nav`, `hero`, `story`, etc.) as a typed `as const` object. Phase 4 will add `en.ts` with the same shape.

Add four new top-level keys. The Phase 4 engineer will be guided by these exact key names:

```typescript
export const nl = {
  // ... existing keys ...

  // ── Coaching Page (PAGE-01) ──────────────────────────────────────────────
  coaching: {
    pageTitle:     'Coaching voor Founders — Milan van der Meulen',
    pageDesc:      '1:1 coaching voor founders die klaar zijn voor de volgende stap. Sparringpartner die zelf heeft gebouwd, verloren en weer opgestaan.',
    eyebrow:       '1:1 Coaching',
    heading:       'Bouwen met iemand die het kent',
    // ... body, cta, etc.
  },

  // ── Spreker Page (PAGE-02) ──────────────────────────────────────────────
  spreker: {
    pageTitle:     'Spreker — Milan van der Meulen',
    pageDesc:      'Milan spreekt over ondernemerschap, schalen en eerlijk leiderschap. Boek hem voor jouw event of conference.',
    // ...
  },

  // ── Mijn verhaal Page (PAGE-03) ─────────────────────────────────────────
  mijnVerhaal: {
    pageTitle:     'Mijn verhaal — Milan van der Meulen',
    pageDesc:      'Het eerlijke verhaal van Soly: internationale expansie naar 9 landen, 180 medewerkers, en het faillissement dat alles veranderde.',
    // ...
  },

  // ── Contact Page (PAGE-04) ──────────────────────────────────────────────
  contact: {
    pageTitle:     'Contact — Milan van der Meulen',
    pageDesc:      'Neem contact op voor coaching, een lezing of een algemene vraag. Milan reageert persoonlijk.',
    heading:       'Laten we kennismaken',
    subtext:       'Vul het formulier in en ik neem zo snel mogelijk contact met je op.',
    labelOnderwerp: 'Onderwerp',
    optionAlgemeen: 'Algemeen',
    optionLezing:   'Boek lezing',
    optionCoaching: 'Plan kennismaking',
    labelNaam:     'Naam',
    labelEmail:    'Mailadres',
    labelBericht:  'Bericht',
    ctaSubmit:     'Verstuur bericht',
    ctaSubmitting: 'Versturen…',
    successMsg:    'Bedankt! Ik neem snel contact met je op.',
    errorMsg:      'Er is iets misgegaan. Probeer het opnieuw of mail me direct.',
    errorNetwork:  'Geen verbinding. Controleer je internetverbinding en probeer opnieuw.',
  },
} as const;
```

### Pattern 7: Homepage CTA Wiring (PAGE-05)

Three disabled elements on the homepage become live:

1. **Hero primary CTA** (`src/components/sections/Hero.astro` line 47-59) — replace `<span aria-disabled>` with `<Button href=".../contact" variant="primary">Contact</Button>`
2. **Samenwerken "Boek lezing"** (`src/components/sections/Samenwerken.astro` line 47-55) — replace disabled `Button` with `href=".../contact?type=lezing"`, `disabled={false}`
3. **Samenwerken "Plan kennismaking"** (same file, line 56-65) — `href=".../contact?type=coaching"`, `disabled={false}` (or `TODO_CALENDLY_URL` seam when provided)
4. **Nav Contact CTA** (`Nav.astro` line 76-89 desktop, line 198-208 mobile) — replace `<span>` with `<a href=".../contact">`
5. **Story teaser link** — if present, add `<a href=".../mijn-verhaal">` in Story.astro or homepage assembly

[VERIFIED: src/components/sections/Hero.astro:47-59] — Current disabled span with `data-placeholder="Contact page not yet built — arrives in Phase 2"`
[VERIFIED: src/components/sections/Samenwerken.astro:40-65] — Three `ladderCards`, cards[1] and cards[2] reference `TODO_CONTACT_URL`

### Anti-Patterns to Avoid

- **Using `Astro.url.searchParams` in a static page** — always empty in `output: 'static'`; must use `window.location.search` client-side
- **Sending `fetch` with `FormData` body** — Web3Forms accepts it, but the JSON path (with `Content-Type: application/json`) is cleaner and avoids multipart encoding ambiguity
- **Setting `href="#"` on partially-wired CTAs** — violates the established honest-CTA rule (HOME-10). Items that remain future (Nieuwsbrief, Boek/language switch) stay `aria-disabled`
- **Using `import.meta.env.BASE_URL` without trailing slash awareness** — `BASE_URL` equals `/milan-website/` (trailing slash included); concatenating directly with a leading `/` produces `//contact`. Use template literal: `` `${import.meta.env.BASE_URL}contact` ``
- **Nesting the contact form in a dark band** — the Phase 1 rule (D-01) reserves dark bands for the story section only. Contact page uses `variant="default"` SectionWrapper
- **Adding a `<form>` outside `ContactForm.astro`** — keep all form markup and JS in one component to avoid split state

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form-to-email delivery | Custom email API, serverless function | Web3Forms | Static host; no Node server; Web3Forms is free and handles delivery, anti-spam, reply-to |
| Spam protection | Custom rate-limiting, custom honeypot logic | Web3Forms `botcheck` checkbox + Web3Forms server-side filtering | The API already filters on their end; honeypot catches the rest |
| Image optimization | Manual resizing scripts | `astro:assets` `<Picture>` (already in use) | Generates AVIF/WebP at build; existing pipeline proven |
| SEO metadata | Custom head component | `BaseHead.astro` (already in use) | Canonical, OG, JSON-LD already emitted; just pass unique title/description |
| Per-page routing | Custom routing config | Astro file-based routing (just create the file) | Astro's default convention; zero config for Dutch slugs with current i18n setup |

**Key insight:** This phase is primarily composition, not infrastructure. Every hard problem is already solved by the existing stack or a free external API. New components should be thin wrappers around existing primitives.

---

## Common Pitfalls

### Pitfall 1: Astro.url.searchParams Empty in Static Mode

**What goes wrong:** Developer calls `Astro.url.searchParams.get('type')` in the page frontmatter, expecting to pre-populate the form field server-side. It returns `null` always.

**Why it happens:** In `output: 'static'`, Astro builds each page once. There is no per-request context — `Astro.url` reflects the build-time URL of the file, not a runtime request.

**How to avoid:** All query-param logic lives in a `<script>` island reading `window.location.search`. The script runs after the page loads in the browser. No server-side param reading at all.

**Warning signs:** If the select is always on the default option regardless of the URL, the script is not running or the select value isn't being set before the user sees the page.

### Pitfall 2: BASE_URL Path Concatenation

**What goes wrong:** Writing `href="/contact?type=lezing"` — this resolves to `https://rtdpb.github.io/contact?type=lezing`, missing the `/milan-website/` base. User gets a 404 on GitHub Pages.

**Why it happens:** The site is deployed at a subpath (`base: '/milan-website/'`). Absolute paths do not include the base automatically.

**How to avoid:** Always use `` href={`${import.meta.env.BASE_URL}contact?type=lezing`} `` for internal links. `BASE_URL` equals `/milan-website/` (with trailing slash) in the GitHub Pages build and `/` locally.

**Warning signs:** Links work locally but 404 on the deployed GitHub Pages site.

### Pitfall 3: botcheck Field Not Hidden Properly

**What goes wrong:** The `botcheck` checkbox is visible to users, who might check it, causing all real submissions to be rejected by Web3Forms.

**Why it happens:** Forgetting `style="display: none;"` or relying on `type="hidden"` (botcheck must be `type="checkbox"`).

**How to avoid:** `<input type="checkbox" name="botcheck" style="display: none;" tabindex="-1" aria-hidden="true">`. Always `type="checkbox"`, always `display:none`.

**Warning signs:** Real submissions being rejected even with correct access key.

### Pitfall 4: Yellow Accent Overuse on New Pages

**What goes wrong:** Each new page adds its own yellow accent elements — headings, dividers, card borders — making the brand feel garish and inconsistent with Phase 1 design decisions.

**Why it happens:** The yellow (`#FFDD11`) constraint (D-02 Phase 1) applies globally, not just to the homepage. "One deliberate yellow signature per section" means across the whole site.

**How to avoid:** Check against Phase 1 design decisions (D-01, D-02, D-03). Yellow appears only on: primary CTA hover, eyebrow left-border on dark sections, decorative quote mark on dark testimonial card. New pages inherit this — no additional yellow usages.

**Warning signs:** More than one yellow element visible simultaneously on a single page.

### Pitfall 5: Nav Active State Not Set

**What goes wrong:** Nav links are enabled but none show the active underline (`.nav-link--active`), so there is no visual indication of the current page.

**Why it happens:** The nav items are now real `<a>` tags but the `--active` class requires knowing the current URL at build time.

**How to avoid:** In the new `navItems` array, compare `href` against `Astro.url.pathname` in the Nav component's frontmatter to add the `nav-link--active` class. Since this is an SSG build, each page gets its own compiled HTML with the correct active state baked in.

```astro
const currentPath = Astro.url.pathname;
// item.href matches if pathname starts with item.href
const isActive = (href: string) => currentPath.startsWith(href);
```

### Pitfall 6: Form Submits Successfully but Sends Placeholder Key

**What goes wrong:** The form appears to work (fetch returns 200, success message shows) but no email is delivered because the `access_key` is still the placeholder string `'TODO_WEB3FORMS_ACCESS_KEY'`.

**Why it happens:** Web3Forms may return a success response even for invalid keys in some cases, or the TODO string happens to validate. Either way, no email arrives.

**How to avoid:** The no-op placeholder is intentional (D-02). Document clearly in the component with a `<!-- TODO: replace TODO_WEB3FORMS_ACCESS_KEY in config.ts -->` comment. Add a dev-mode console warning if the key equals the placeholder string.

**Warning signs:** Form submits successfully but Milan receives no email.

---

## Code Examples

### ContactForm: Verified no-JS fallback
The `<form action="https://api.web3forms.com/submit" method="POST">` attribute is the no-JS path. Without JavaScript, the browser performs a native POST and Web3Forms redirects to its default success page. The `redirect` hidden field can override this with a local thank-you URL (must be an absolute URL):

```html
<input type="hidden" name="redirect" value="https://rtdpb.github.io/milan-website/bedankt" />
```

Or omit `redirect` to use the Web3Forms default success page. The JS `e.preventDefault()` intercepts before the native POST fires when JS is available.
[CITED: docs.web3forms.com/getting-started/api-reference]

### SectionWrapper on new pages
[VERIFIED: src/components/ui/SectionWrapper.astro:25-33] — Props: `id`, `labelledBy`, `variant` ('default'|'dark'|'surface'), `class`. Contact page uses `variant="default"`. Mijn verhaal page can use `variant="dark"` for the expanded story band, matching the homepage Story section pattern.

### RevealOnScroll on new pages
[VERIFIED: src/components/ui/RevealOnScroll.astro:32-38] — Props: `delay` (ms, default 0), `class`. Used identically on new pages — wrap sections or individual cards.

### Button with base-aware href
[VERIFIED: src/components/ui/Button.astro:23-55] — Props: `href`, `variant`, `disabled`, `placeholderReason`, `external`, `class`. For enabled internal links on new pages:

```astro
<Button href={`${import.meta.env.BASE_URL}contact?type=lezing`} variant="primary">
  Boek lezing
</Button>
```

---

## Content Architecture

### i18n Shape Contract

[VERIFIED: src/i18n/nl.ts:18-191] — All page content lives in `nl.ts` as typed `as const`. The shape contract for Phase 4 (English) means every new key added here needs a matching key in the future `en.ts`. No runtime i18n library required — components `import { nl } from '../../i18n/nl'` directly.

New top-level keys to add: `coaching`, `spreker`, `mijnVerhaal`, `contact` (as shown in Pattern 6 above).

### Testimonial Redistribution (D-07)

The three testimonials from `nl.ts.testimonials.items` [VERIFIED: src/i18n/nl.ts:92-110] are:
- Index 0: Yang Soo Kloosterhof ("beter te delegeren en meer te vertrouwen op mijn team") → **Coaching page** (coaching-flavored)
- Index 1: Ruud Koornstra ("hoe je een bedrijf bouwt dat echt bij je past") → **Coaching page** (secondary) or Mijn verhaal
- Index 2: Oranjewoud Export Academy ("De lezing van Milan was een eyeopener") → **Spreker page** (speaking-context)

The homepage Testimonials.astro section keeps all three (it is a section about Milan generally). Subpages show the single most relevant quote in a stripped-down single-card variant — not the full mosaic.

### Mijn Verhaal Content Seed

[VERIFIED: src/i18n/nl.ts:113-123] — `nl.story` contains the three existing body paragraphs:
1. Soly founding + international expansion + failure
2. Lessons (leadership, delegation, losing yourself)
3. Today: helping founders at a crossroads

The `/mijn-verhaal` page expands these into a longer form — additional paragraphs drafted from the same material, the Soly arc fleshed out. The homepage `<Story>` section remains the short teaser with a "Lees mijn hele verhaal →" link to `/mijn-verhaal`.

The existing `Story.astro` component (dark band, signature, portrait, mission photo) is a strong starting template for the Mijn verhaal page hero/opening, but the page needs additional `SectionWrapper` sections beneath it for the expanded narrative.

### Available Photos for New Pages

From ASSETS.md [VERIFIED: .planning/ASSETS.md:31-34]:
- `10 Jaar Soly-78.jpg` → proposed `milan-speaking-graph.avif/webp` — for **Spreker** page (speaking with graph behind)
- `_AVM2348.jpg` → proposed `milan-networking.avif/webp` — for **Coaching** page (networking, human touch)

These files are in the source archive but may not have been extracted to `src/assets/photos/` yet. The plan must include a task to extract, downscale, and place them (same pipeline as Phase 1: downscale to ≤2400px wide, add to `src/assets/photos/`, use `<Picture>` in the component).

The existing `milan-story-portrait.jpg` and `milan-energy-mission.jpg` are already extracted [VERIFIED: src/components/sections/Story.astro:32-33] and available for Mijn verhaal.

---

## Reusable Component Fit

| Existing Component | Fits Which New Page Sections | Notes |
|-------------------|------------------------------|-------|
| `SectionWrapper.astro` | All sections on all new pages | Default variant for content, dark for story-style bands |
| `Card.astro` | Approach/offer cards on Coaching/Spreker | Use `variant="default"` (light surface) |
| `Button.astro` | All CTA links | Remove `disabled` prop; set real `href` with base path |
| `RevealOnScroll.astro` | Any section or card that should animate in | Same `delay` stagger pattern as homepage |
| `PlaceholderBadge.astro` | None in Phase 2 | All content is real — no placeholders needed |
| `Story.astro` (sections/) | Mijn verhaal opening band | Can be imported as-is for the opening dark band; page adds more sections below |
| `Testimonials.astro` (sections/) | Not directly — too tightly coupled to 3-card mosaic layout | Create a simpler inline single-quote block for subpages; or pass a single-item array and adjust CSS |
| `PressStrip.astro` | Possibly Spreker page | Speaking credibility — same "Bekend van" band makes sense |
| `Newsletter.astro` | Bottom of all new pages | The existing newsletter section is a reusable section; import on each new page at the bottom |

**Genuinely new component needed:** `ContactForm.astro` — the only new component. It encapsulates form markup, honeypot, fetch handler, success/error states, and query-param pre-selection. It should live in `src/components/forms/` (new directory).

---

## Runtime State Inventory

> This is NOT a rename/refactor phase. No runtime state migration is needed. Skipped.

---

## Environment Availability

| Dependency | Required By | Available | Notes |
|------------|------------|-----------|-------|
| Node.js / npm | `npm run build` | Already in use (Phase 1 complete) | No action needed |
| Astro 7.2.3 | All new pages | Already installed | No install needed |
| astro:assets / sharp | `<Picture>` on new pages | Already installed | No action needed |
| Web3Forms API | Contact form | External HTTPS API — available | No install; requires user to obtain access key |
| Photo source files | Spreker/Coaching images | In archive; may need extraction | Plan must include extraction task |

**Missing dependencies with no fallback:** None that block development.

**Missing dependencies that need action:** Web3Forms access key (user-supplied; form ships with placeholder per D-02).

---

## Validation Architecture

> `workflow.nyquist_validation` is `true` in `.planning/config.json` [VERIFIED: .planning/config.json:24] — this section is required.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected in Phase 1 (no test files found in glob) |
| Config file | None — Wave 0 gap |
| Quick run command | `npm run build` (build verification) |
| Full suite command | `npm run build && npm run preview` (visual + link verification) |

No automated test framework (Jest, Vitest, Playwright) was established in Phase 1. For a static content site of this type, the most practical "tests" are:
1. Build verification: `npm run build` must complete without errors
2. HTML validation: form fields have correct `name` attributes, labels are associated
3. Link audit: all enabled nav links resolve (no 404s)
4. Manual: form submission with placeholder key shows correct non-functional state

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PAGE-01 | Coaching page renders at /coaching | build smoke | `npm run build` (no 404 in build output) | No — Wave 0 |
| PAGE-02 | Spreker page renders at /spreker | build smoke | `npm run build` | No — Wave 0 |
| PAGE-03 | Mijn verhaal page renders at /mijn-verhaal | build smoke | `npm run build` | No — Wave 0 |
| PAGE-04 | Contact page renders with form | build smoke | `npm run build` | No — Wave 0 |
| PAGE-04 | Form has botcheck honeypot, access_key field | HTML lint | grep in built HTML | No — Wave 0 |
| PAGE-04 | No-JS form has valid action attribute | manual | Open /contact, disable JS, submit | Manual only |
| PAGE-04 | Inline success message appears on successful fetch | manual | Open /contact, add real key, submit | Manual only |
| PAGE-05 | CTAs route to /contact?type=lezing etc. | build smoke / manual | `npm run build` + inspect hrefs | No — Wave 0 |

### Sampling Rate

- **Per task commit:** `npm run build` — must produce zero errors
- **Per wave merge:** `npm run build && npm run preview` — visual check in browser
- **Phase gate:** Full manual checklist before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] No automated test files exist — acceptable for a static site at this milestone; build verification is the primary gate
- [ ] Consider adding a post-build HTML grep to verify form field names: `grep -r 'name="botcheck"' dist/`

---

## Security Domain

> `workflow.security_enforcement` is `true`, `security_asvs_level: 1` [VERIFIED: .planning/config.json:48-49].

### Applicable ASVS Categories (ASVS Level 1)

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | No auth in this phase or milestone |
| V3 Session Management | No | No sessions; static site |
| V4 Access Control | No | All pages are public |
| V5 Input Validation | Yes (contact form) | HTML5 `required` + `type="email"` on client; Web3Forms validates server-side |
| V6 Cryptography | No | Access key is public by design; no secrets handled in code |

### Known Threat Patterns for This Stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Spam form submissions | Spoofing | Web3Forms `botcheck` honeypot + server-side spam filter |
| Key harvesting | Info disclosure | Access key is intentionally public (Web3Forms design) — not a secret |
| XSS via form result display | Tampering | Do not use `innerHTML` with user-controlled data; the success/error messages are static strings from `nl.ts`, not echoed user input |
| Open redirect via `redirect` field | Tampering | Only use the hardcoded redirect value in the hidden input; do not pass `?redirect=` from URL |

**XSS note on `innerHTML`:** The ContactForm pattern above uses `resultEl.innerHTML = '<p class="form-success">...</p>'` with a static Dutch string from `nl.ts`. This is safe because the string is not derived from user input or the API response body. Do not echo `json.body.message` into the DOM — use only the local Dutch string.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Web3Forms free tier limit is ~250 submissions/month | Standard Stack | If limit is lower (e.g. 100), a busy launch week could exhaust it; check pricing page before launch |
| A2 | Production domain will be `milanvandermeulen.nl` (from SITE_URL in config.ts) | Architecture Patterns | If different, canonical URLs and sitemaps are wrong; confirm before deploy |
| A3 | `10 Jaar Soly-78.jpg` and `_AVM2348.jpg` have not yet been extracted to `src/assets/photos/` | Content Architecture | If already extracted under different names, plan extraction task is redundant |
| A4 | No separate thank-you page needed for no-JS fallback; Web3Forms default success page is acceptable | Web3Forms Pattern | If user wants a branded thank-you page, a `src/pages/bedankt.astro` must be added |

---

## Open Questions (RESOLVED)

All four questions are resolved by locked CONTEXT.md decisions and this phase's plans. None block execution; the two user-side items (real key, copy review) are captured as end-of-phase human-verify checkpoints in Plan 02-03.

1. **Has the user obtained a Web3Forms access key yet?**
   - **RESOLVED:** No — and it does not block. Per D-02 the key ships as a documented `config.ts` placeholder (`TODO_WEB3FORMS_ACCESS_KEY`); the form is built submission-ready and goes live the moment the real key is pasted in. A human-verify checkpoint at the end of the phase covers dropping in the key + confirming inbox delivery (Plan 02-03). No fake success state until then.

2. **Should the "Mijn verhaal" link in the homepage Story section be a section anchor (#verhaal) or a page link (/mijn-verhaal)?**
   - **RESOLVED: Both — two distinct intents.** The hero secondary "Mijn verhaal" CTA keeps its in-page `#verhaal` anchor; the homepage Story section gains a "Lees mijn hele verhaal →" ghost link at its bottom pointing to the new `/mijn-verhaal` page (D-06). Handled in Plan 02-03.

3. **Exact free-tier submission limit on Web3Forms?**
   - **RESOLVED (accepted assumption):** Treat as ~250 submissions/month (LOW-confidence, cross-referenced; official pricing page returned 403). Non-binding for a personal-brand site. User verifies at web3forms.com when obtaining the account. Recorded in the Assumptions Log; not a plan dependency.

4. **Is a branded thank-you page needed for the no-JS path?**
   - **RESOLVED: No (YAGNI) for Phase 2.** The no-JS POST lands on the Web3Forms default success page; the JS path shows the inline Dutch success message (D-04). Seam left: if wanted later, add `src/pages/bedankt.astro` and set the `redirect` hidden field to its absolute URL. Not in scope now.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Serverless functions for static form delivery | Client-side form APIs (Web3Forms, Formspree) | ~2020 | No Node server or hosting upgrade needed |
| Netlify Forms (hosting-specific) | Provider-agnostic form APIs | — | Keeps GitHub Pages as host; no lock-in |
| `window.location.search` with jQuery | Vanilla JS `URLSearchParams` | ~2018 (broad browser support) | No library needed; already used in nav script |

**Deprecated/outdated:**
- `Astro.url.searchParams` in static pages: Never worked for per-request values; must use client-side `URLSearchParams`
- `href="#"` on disabled links: Violates the established project honesty rule; always use `aria-disabled`

---

## Sources

### Primary (HIGH confidence)
- `src/config.ts` (lines 1-70) — TODO_* constant pattern; existing constants to extend
- `src/i18n/nl.ts` (lines 18-191) — exact key shape, existing testimonial content, story copy
- `src/layouts/BaseLayout.astro` (lines 1-60) — Props interface, slot pattern
- `src/components/layout/BaseHead.astro` (lines 1-122) — canonical URL construction, OG/JSON-LD
- `src/components/layout/Nav.astro` (lines 1-366) — navItems array, disabled span pattern, mobile panel
- `src/components/layout/Footer.astro` (lines 1-299) — footer nav array
- `src/components/sections/Story.astro` (lines 1-285) — dark band pattern, photo imports
- `src/components/sections/Testimonials.astro` (lines 1-251) — mosaic pattern, 3-card layout
- `src/components/sections/Samenwerken.astro` (lines 1-232) — ladderCards, disabled CTA pattern
- `src/components/ui/Button.astro` (lines 1-157) — href/disabled props interface
- `src/components/ui/SectionWrapper.astro` (lines 1-83) — variant props interface
- `src/components/ui/RevealOnScroll.astro` (lines 1-133) — delay prop, script island pattern
- `astro.config.mjs` (lines 1-44) — `output: 'static'`, `base: '/milan-website/'`, i18n config
- `.planning/config.json` — nyquist_validation: true, security_enforcement: true
- `.planning/ASSETS.md` — photo inventory and section mapping

### Secondary (MEDIUM confidence)
- [Web3Forms API Reference](https://docs.web3forms.com/getting-started/api-reference) — required fields, response shape, access_key public nature
- [Web3Forms Spam Protection](https://docs.web3forms.com/getting-started/customizations/spam-protection/spam-protection) — botcheck field exact implementation

### Tertiary (LOW confidence)
- Web search cross-references for ~250/month free tier limit (official pricing page returned 403)

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all existing components read directly; no new packages
- Web3Forms integration: HIGH — official documentation fetched and verified
- Architecture: HIGH — grounded in actual source files
- Free tier limit: LOW (ASSUMED) — pricing page inaccessible; cited from comparison sites

**Research date:** 2026-08-18
**Valid until:** 2026-11-18 (90 days — Astro static builds and Web3Forms API are stable; re-verify Web3Forms free limits before launch)
