# Phase 2: Supporting Pages & Lead-Gen Forms - Context

**Gathered:** 2026-08-18
**Status:** Ready for planning

<domain>
## Phase Boundary

Add the four primary conversion **subpages** — **Coaching**, **Spreker**, **Mijn verhaal**, **Contact** — styled with the Phase 1 design system, and make **lead capture functional**: a real, working contact form plus wiring the "Boek lezing" / "Plan kennismaking" / header "Contact" CTAs into that lead flow. New pages must be SEO-, a11y-, and responsive-consistent with the homepage.

**In scope:** `/coaching`, `/spreker`, `/mijn-verhaal`, `/contact` pages; a working contact form (Web3Forms); consolidated lead routing; enabling the nav/CTA items that were disabled placeholders in Phase 1 as their destinations now exist.

**Out of scope (stays deferred):** real Substack newsletter signup + live article feed (Phase 3); NL/EN switch + English content (Phase 4); book/pre-order page + analytics + CMS (Phase 5); auth, database, payments (whole-milestone out of scope). The newsletter "Nieuwsbrief" CTA and NL/EN switch remain honest placeholders until their phases.
</domain>

<decisions>
## Implementation Decisions

### Form Backend & Contact Form (discussed)
- **D-01:** Contact form delivers via a **3rd-party form service — Web3Forms** — so the site stays on **GitHub Pages** (`output: 'static'`) with no server/host change. Form submits client-side (JS `fetch` to `https://api.web3forms.com/submit`); Web3Forms emails the inquiry to Milan's configured address. — **Reversibility:** reversible — swapping to Formspree/Netlify Forms is a localized endpoint change.
- **D-02:** The Web3Forms **access key is a documented `config.ts` placeholder** (e.g. `TODO_WEB3FORMS_ACCESS_KEY`), following the existing honest-placeholder pattern (`TODO_SUBSTACK_URL`, etc.). The form is fully built and wired; it becomes truly live the moment the real key is dropped in — until then it is a clearly-documented non-functional state, **never a fake success**. Destination email lives on the Web3Forms side, so no PII/secret sits in the repo. **Note:** success criterion #2 ("submits successfully to a real endpoint") is met the instant the key is added; the build ships submission-ready.
- **D-03:** **Spam protection = honeypot field** (Web3Forms `botcheck`), Claude's default. No visible CAPTCHA in v1.
- **D-04:** **Post-submit UX = inline success message.** Form submits via JS without a page reload and is replaced in place by a friendly Dutch confirmation ("Bedankt! Ik neem snel contact met je op."). Must include a **no-JS fallback** (standard POST / graceful degradation) so the form still works without JavaScript. — **Reversibility:** reversible.

### Subpage Content Source (discussed)
- **D-05:** Dutch copy for **Coaching, Spreker, Mijn verhaal** is **drafted by Claude for Milan's review**, built **only from material we already have** — the homepage story, USPs (12+ jaar · 180 medewerkers · 9 markten), the Soly arc (9 landen, ~180 medewerkers, ~1M panelen, faillissement), and the 3 existing testimonials. **No invented facts, numbers, quotes, or testimonials** (HOME-11 honesty rule carries forward). Drafted copy should be flagged for user review before final.
- **D-06:** **"Mijn verhaal" page = expanded long-form version** of the homepage story — the full arc (Soly rise → international scale-up → failure → lessons → why he coaches now), using the homepage story section as the seed, with supporting photos, signature, and a CTA into the lead flow. The **homepage keeps its short story teaser**, which links through to `/mijn-verhaal` ("lees mijn hele verhaal"). — **Reversibility:** reversible.
- **D-07:** **Reuse the 3 existing homepage testimonials**, placed by relevance across subpages (e.g. Oranjewoud Export Academy → Spreker; coaching-flavored quotes → Coaching). No new or fabricated testimonials.

### Lead-Flow Routing (Claude's discretion — user said "you decide")
- **D-08:** **Single `/contact` page** with the working form. The form has an **"Onderwerp" (subject/type) field that arrives pre-selected** based on which CTA was clicked, via a query param: `Boek lezing → /contact?type=lezing`, `Plan kennismaking → /contact?type=coaching`, header `Contact → /contact` (type=algemeen). One form, one inbox, and each inquiry self-identifies. — **Reversibility:** reversible.
- **D-09:** Leave a **clean seam to swap in Calendly** for "Plan kennismaking" later (e.g. a `config.ts` placeholder like `TODO_CALENDLY_URL` gated so the CTA points at the form until a scheduling link is supplied). No Calendly in this phase (user has none to provide now).

### Subpage Depth & Structure (Claude's discretion — not selected for discussion)
- **D-10:** Coaching and Spreker are **full but restrained editorial landing pages** (hero → offer/approach → relevant real testimonial → CTA into lead flow), **reusing Phase 1 components** (SectionWrapper, Card, Button, RevealOnScroll, PressStrip patterns where sensible) — not thin stubs. Keep the premium/editorial feel and restrained-yellow rules (D-01–03 from Phase 1). — **Reversibility:** reversible.
- **D-11:** **URLs:** `/coaching`, `/spreker`, `/mijn-verhaal`, `/contact` (Dutch slugs, consistent with NL-only v1 and i18n-ready structure). Nav items currently rendered as **disabled placeholders in Phase 1 get enabled** as each page ships; `TODO_CONTACT_URL` in `config.ts` resolves to `/contact`.
- **D-12:** Each new page carries **its own SEO metadata** via the existing `BaseHead.astro` (unique title/description/canonical/OG) and stays a11y- and responsive-consistent with the homepage (success criterion #4).

### Claude's Discretion
D-08 through D-12 were left to Claude's judgment (user discussed Form backend, Content source, and Lead routing; explicitly said "you decide" on routing specifics and did not select subpage depth/structure). All are open to revision at planning / UI-spec time.
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Primary source of truth (content, structure, CTAs, design direction)
- `Input homepage Milan.docx` — the source for homepage copy, CTA labels, and the future-page structure that Phase 2 realizes. Binary; extracted text + section breakdown captured in `.planning/PROJECT.md` (## Context).
- Design inspiration (composition/type/spacing/cards/image treatment only — do NOT copy): https://sevora.framer.website/

### Project planning docs
- `.planning/PROJECT.md` — project vision, constraints, key decisions, honesty rules
- `.planning/REQUIREMENTS.md` — v2 requirements **PAGE-01–05** (this phase)
- `.planning/ROADMAP.md` §"Phase 2" — goal + 4 success criteria (the acceptance anchor)
- `.planning/ASSETS.md` — photo inventory + section→photo mapping (reserve photos available for subpages, e.g. `10 Jaar Soly-78` speaking shot for Spreker, `_AVM2348` networking shot for Coaching)
- `.planning/phases/01-foundation-design-system-dutch-homepage/01-CONTEXT.md` — Phase 1 design decisions (D-01–17: light editorial base + dark bands, restrained yellow, honest-CTA rule, i18n-ready structure) that ALL carry forward

### Existing code (Phase 1 — read before building)
- `src/config.ts` — placeholder-destination pattern (`TODO_*` constants); add `TODO_WEB3FORMS_ACCESS_KEY` and `TODO_CALENDLY_URL` here; resolve `TODO_CONTACT_URL` → `/contact`
- `src/i18n/nl.ts` — single source of truth for Dutch strings; new page copy goes here under new top-level keys (same shape for Phase 4 EN)
- `src/components/ui/` — Button, Card, SectionWrapper, PlaceholderBadge, RevealOnScroll (reuse)
- `src/layouts/BaseLayout.astro` + `src/components/layout/BaseHead.astro` — per-page SEO/meta; Nav.astro (enable disabled items) + Footer.astro
- `src/components/sections/Story.astro` — seed for the expanded `/mijn-verhaal` page; `src/styles/tokens.css` — design tokens

### External service
- Web3Forms — https://web3forms.com/ (free static-site form API; access key generated against a destination email; honeypot `botcheck` field supported). Endpoint: `https://api.web3forms.com/submit`.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **UI kit** (`src/components/ui/`): Button, Card, SectionWrapper, PlaceholderBadge, RevealOnScroll — subpages should be composed from these, not new bespoke primitives.
- **Design tokens** (`src/styles/tokens.css`) + fonts (Fraunces/DM Sans) — inherit as-is.
- **Story.astro** section — dark-band pattern + signature; direct seed for `/mijn-verhaal`.
- **Testimonials.astro** — mosaic pattern + the 3 real quotes to redistribute across subpages.
- **config.ts** honest-placeholder pattern — extend for the Web3Forms key and Calendly seam.
- **nl.ts** typed-const string store — add page copy here.
- **ASSETS.md** reserve photos — `10 Jaar Soly-78` (speaking) and `_AVM2348` (networking) are unused and available for Spreker/Coaching; hero/story/mission photos already extracted.

### Established Patterns
- **Honest CTA/link rule (D-12 Phase 1):** unknown destinations are disabled + documented, never fake. Phase 2 flips several of these to real (Contact, and the two lead CTAs) and MUST keep the newsletter/NL-EN ones as honest placeholders.
- **Astro static output + `astro:assets` `<Picture>`** image pipeline; minimal-JS islands (RevealOnScroll uses IntersectionObserver + reduced-motion guard) — the contact form's JS submit should follow the same small-island, progressive-enhancement approach.
- **Per-page SEO** through BaseHead.astro (canonical/OG/JSON-LD).

### Integration Points
- **Nav.astro & Footer.astro**: enable the now-real page links; keep still-future links disabled.
- **config.ts**: `TODO_CONTACT_URL` resolves to `/contact`; add form key + Calendly seam.
- **Homepage** (`src/pages/index.astro`): the Samenwerken card CTAs ("Boek lezing", "Plan kennismaking") and header Contact CTA now route into the Phase 2 lead flow; the story teaser links to `/mijn-verhaal`.
- Phase 3 (Substack) and Phase 4 (EN) will build on these pages — keep i18n-ready structure and don't wire newsletter yet.
</code_context>

<specifics>
## Specific Ideas

- **Web3Forms** specifically chosen (over Formspree) for the form backend — free, unlimited, no account beyond an access key; access key held as a `config.ts` placeholder for now.
- **Onberp routing via query param** — CTAs deep-link `/contact?type=lezing|coaching|algemeen` so the "Onderwerp" field arrives pre-selected and inquiries self-identify.
- **Mijn verhaal** should read as the emotional/credibility centerpiece — the honest founder story (rise, 9-country scale, failure, lessons) — homepage teaser links here.
- Reuse real testimonials by relevance (Oranjewoud → Spreker). Never fabricate.
- Inline (no-reload) success confirmation in Dutch, with a no-JS fallback.
</specifics>

<deferred>
## Deferred Ideas

- **Calendly / real scheduling link** for "Plan kennismaking" — seam left in `config.ts`; wire when Milan supplies a link (could land this phase if provided, else later).
- **Real Web3Forms access key + destination email** — user to supply; form ships submission-ready with a documented placeholder until then.
- Real Substack newsletter signup + live recent-articles feed → **Phase 3** (Nieuwsbrief CTA stays an honest placeholder).
- NL/EN switch + English translations of the new pages → **Phase 4** (keep i18n-ready string structure in `nl.ts`).
- Book / pre-order page + analytics/conversion + optional CMS → **Phase 5**.
- Visible CAPTCHA (if spam becomes a problem) — honeypot only for now.

None of the above are to be built in Phase 2 beyond leaving the structure/seams open.
</deferred>

---

*Phase: 2-Supporting Pages & Lead-Gen Forms*
*Context gathered: 2026-08-18*
