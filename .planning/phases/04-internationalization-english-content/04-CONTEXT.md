# Phase 4: Internationalization & English Content - Context

**Gathered:** 2026-08-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Turn the existing i18n-ready structure into a **working bilingual (NL/EN) site**:

1. A functional **NL/EN language switch** that changes the language and persists across navigation (I18N-01).
2. **Complete, quality English translations** of the homepage and all existing pages (I18N-02).
3. **Correct multi-locale SEO** — hreflang, localized `<title>`/metadata, per-locale canonical URLs, sitemap covering both locales (ROADMAP success criterion 3).

In scope: activating the EN locale in `astro.config.mjs`, creating `src/i18n/en.ts` (mirroring `nl.ts`), EN routes for every existing page (homepage, coaching, spreker, mijn-verhaal, nieuwsbrief, contact), a working switch, and per-locale head/SEO.

**Out of scope (belongs elsewhere):** new pages/sections beyond what already exists; a Book/pre-order page (Phase 5); analytics/CMS (Phase 5); English-language Substack/newsletter content (the publication stays Dutch — see D-02); confirming/switching the production domain (separate infra task, not this phase).
</domain>

<decisions>
## Implementation Decisions

### Translation & Honesty (discussed)
- **D-01:** **Testimonials are translated faithfully into English.** The 3 real quotes (Yang Soo Kloosterhof, Ruud Koornstra, Oranjewoud Export Academy) render in natural English on the EN site; **names and roles are unchanged**. No "translated from Dutch" marker required — a faithful translation is the standard, honest treatment. Preserve meaning; do not embellish or add claims. — **Reversibility:** reversible (copy in `en.ts`).
- **D-02:** **Substack articles + newsletter signup stay on the EN site, with an honest "in Dutch" label.** The `Recente artikelen` feed and the newsletter signup remain visible/functional for EN visitors, but the EN copy must clearly state the newsletter/articles are written in Dutch (e.g. an EN-locale note like "The newsletter is written in Dutch"). Keeps the funnel working while being honest about what an English subscriber receives. The Substack publication itself is **not** translated. — **Reversibility:** reversible.
- **D-03:** **English copy is Claude-drafted in the founder voice, flagged as draft for Milan's review before it's considered final.** Translations are natural and idiomatic (not literal word-for-word), matching the confident, honest, direct "founder" tone of the Dutch copy. This mirrors the Phase 1 content-integrity approach (HOME-11 / D-17): factual claims, names, and attributions preserved verbatim; only phrasing is localized. EN copy ships as a reviewable draft — mark it clearly (e.g. a note in `en.ts` and/or the phase verification checklist) so Milan can adjust tone before final sign-off.
- **D-04:** **Target variant = International English (`en`).** Neutral English avoiding US/UK-specific spellings where reasonable; **hreflang code `en`** (paired with `nl`). Chosen for a Dutch founder addressing a mixed European/international founder audience. — **Reversibility:** costly — changing the hreflang code later touches every page head + sitemap, but is mechanical.

### URL Structure, Slugs & Switch (Claude's discretion — on-brief calls, open to revision)
- **D-05:** **Keep existing Dutch URLs at the site root; add English under `/en/*`** — i.e. `prefixDefaultLocale: false` (NL stays unprefixed as the default locale, EN is prefixed). **This deliberately differs from the Phase 1 commented plan** in `astro.config.mjs` (which sketched `prefixDefaultLocale: true`, moving NL to `/nl/*`). Rationale: the NL homepage + pages are already built (Phases 1–3) and are the live/primary audience; moving them to `/nl/*` would break existing/shared links and reset their SEO for no user benefit. **The researcher/planner should confirm** Astro's `prefixDefaultLocale: false` behaviour and validate it against the `base: '/milan-website/'` subpath deploy. — **Reversibility:** costly — flipping to prefixed NL later changes every NL URL (redirects + SEO).
- **D-06:** **Translate EN page slugs for readability + EN keyword SEO:** `/en/coaching`, `/en/speaking` (spreker), `/en/about` (mijn-verhaal), `/en/newsletter` (nieuwsbrief), `/en/contact`, and `/en/` for the homepage. Dutch slugs stay as-is at root (`/coaching`, `/spreker`, `/mijn-verhaal`, `/nieuwsbrief`, `/contact`). — **Reversibility:** reversible per-route (rename + hreflang mapping).
- **D-07:** **Switch behavior:** the NL/EN toggle lands the visitor on the **equivalent page in the other language** (not always the homepage), using a per-page NL↔EN slug map. **Default to NL** on first visit — **no forced browser-language detection/redirect** (static-site friendly, predictable, honest for a Dutch-first personal brand). **Persistence is URL-path-based** — because the locale lives in the path (`/en/...`), it inherently persists across navigation with no cookie/JS state required; internal links within a locale keep their prefix. — **Reversibility:** reversible.

### Claude's Discretion
- D-05, D-06, D-07 (routing, slugs, switch) were delegated by the user and made per the brief and the existing codebase; all are open to revision at planning/UI-spec time. The switch's exact placement/affordance (replacing the existing non-functional `NL | EN` element in `Nav.astro`) is left to planning.
- Exact hreflang/`x-default` wiring, per-locale `<title>`/description strings, canonical URL construction, and sitemap multi-locale config are implementation details for research/planning to resolve — the decisions above set the constraints.
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase spec & requirements
- `.planning/ROADMAP.md` §"Phase 4: Internationalization & English Content" — goal + 3 success criteria (acceptance anchor: switch persists, complete EN translations, correct hreflang/localized SEO).
- `.planning/REQUIREMENTS.md` — I18N-01 (functional NL/EN switch), I18N-02 (English translations of homepage + pages).
- `.planning/PROJECT.md` — vision, constraints, content-integrity/honesty rules; Key Decisions table (NL-only-now + i18n-ready structure).

### Prior-phase decisions that constrain this phase
- `.planning/phases/01-foundation-design-system-dutch-homepage/01-CONTEXT.md` — **D-16** (i18n-ready structure: `en.ts` mirrors `nl.ts`, no i18n library, NL/EN switch was a disabled placeholder) and **D-17** (content/tone rules). This is the locked approach EN must follow.

### Existing code to read/extend
- `astro.config.mjs` — the `i18n` block (currently `defaultLocale: 'nl', locales: ['nl']`) and its commented Phase 4 plan; also `site` + `base: '/milan-website/'` subpath deploy and the `@astrojs/sitemap` i18n config. **Note the D-05 divergence from the commented `prefixDefaultLocale: true` plan.**
- `src/i18n/nl.ts` — single source of truth for all copy; documents the exact "add `en.ts` with the same top-level keys" contract. `en.ts` MUST mirror its shape.
- `src/config.ts` — site constants + placeholder destinations (`CONTACT_URL` uses `import.meta.env.BASE_URL`; `TODO_SUBSTACK_URL`, etc.). Relevant to per-locale URL construction.
- `src/components/layout/Nav.astro` — hosts the existing non-functional `NL | EN` switch placeholder (`nav.nlEnSwitch`) to be made functional.
- `src/components/layout/BaseHead.astro` — current SEO/metadata head; extend for hreflang + localized metadata + per-locale canonical.
- `src/pages/*.astro` — existing NL routes (`index`, `coaching`, `spreker`, `mijn-verhaal`, `nieuwsbrief`, `contact`) that need EN counterparts.
- `src/components/sections/Articles.astro`, `Newsletter.astro`, `src/lib/rss.ts` — the Dutch Substack feed/signup that D-02 keeps (with an "in Dutch" label) on EN.

### Content source of truth
- `Input homepage Milan.docx` (via `.planning/PROJECT.md` §Context) — original Dutch copy; the basis for faithful EN translation. Preserve factual claims/names.

No external ADRs/specs beyond the above — decisions are captured here and in the referenced files.
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/i18n/nl.ts`: complete keyed copy object; `en.ts` is a direct structural mirror (same top-level keys: `nav`, `hero`, `pressStrip`, `samenwerken`, `testimonials`, `story`, `newsletter`, `articles`, …). No new i18n dependency needed.
- `Astro i18n` (built-in, already configured for `nl`): activate `en` via `locales: ['nl','en']`. Use `astro:i18n` helpers (`getRelativeLocaleUrl`, etc.) for the switch/slug map.
- `@astrojs/sitemap` already wired with an `i18n` block — extend `locales` to include `en: 'en'`.
- Design system, components, and layouts are locale-agnostic (copy is injected) — they should render EN with minimal change once each imports the active-locale strings.

### Established Patterns
- **No i18n library** — components import a strings object directly (currently `nl`). Phase 4 must thread the active locale's strings (nl|en) into each component/page rather than hardcoding `nl`.
- **Honesty rule (global):** unknown/placeholder destinations are disabled, never fake; factual claims/names preserved. EN copy inherits this (D-01, D-02, D-03).
- **Subpath deploy:** all internal hrefs are `BASE_URL`-prefixed (`import.meta.env.BASE_URL`) to survive the `/milan-website/` GitHub Pages base — EN routing + the switch must stay `BASE_URL`-safe.

### Integration Points
- `Nav.astro` NL/EN switch element → make functional with a per-page slug map.
- `BaseHead.astro` → add hreflang (`nl`, `en`, `x-default`), localized title/description, per-locale canonical.
- `astro.config.mjs` i18n + sitemap blocks → add `en`.
- Contact form (`ContactForm.astro`, Web3Forms) → EN labels + subject/`?type=` values still route to the one inbox.
</code_context>

<specifics>
## Specific Ideas

- The EN "newsletter is written in Dutch" note (D-02) should read naturally in English and match the honest tone — not an apology, just a clear expectation-setter.
- EN slugs to use: `speaking` (spreker), `about` (mijn-verhaal), `newsletter` (nieuwsbrief); `coaching`/`contact` are identical in both languages.
- Keep the hero USPs factual in EN ("12+ years", "180 employees", "9 markets") — numbers/claims unchanged, only language localized.
</specifics>

<deferred>
## Deferred Ideas

- Translating the Substack publication / producing English newsletter content — out of scope; publication stays Dutch (D-02).
- Confirming the production domain (`milanvandermeulen.nl`) and removing the GitHub Pages `base` — a separate deploy/infra task; not required to build the bilingual structure.
- Additional locales beyond NL/EN — not requested.
- Book/pre-order page, analytics/conversion, optional CMS → Phase 5.

None of the above are built in Phase 4 — the structure must simply not block them.
</deferred>

---

*Phase: 4-Internationalization & English Content*
*Context gathered: 2026-08-19*
