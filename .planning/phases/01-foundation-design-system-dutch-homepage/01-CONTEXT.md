# Phase 1: Foundation, Design System & Dutch Homepage - Context

**Gathered:** 2026-08-18
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver a premium, editorial, fully responsive **Dutch homepage** matching `Input homepage Milan.docx`, built on an **Astro** foundation with a **reusable design system** and an **optimized responsive image pipeline**. Includes all docx homepage sections, baseline SEO/a11y/performance/metadata, and an architecture that is i18n-ready and extensible for future pages — without building future-phase infrastructure (no auth/db/payments/CMS, no live Substack/LinkedIn feeds, no EN content, no subpages).
</domain>

<decisions>
## Implementation Decisions

### Color & Mood (discussed)
- **D-01:** Base theme is **light editorial** (off-white/cream background, near-black text, generous whitespace, Sevora-inspired) with **1–2 full-width dark "feature bands"** used as dramatic anchors. Designated dark band: the **personal story** ("Waarom ik nu mijn lessen deel"). Testimonials may use a single dark accent card within an otherwise light section. — Reversibility: reversible (token-driven).
- **D-02:** Yellow `#FFDD11` is **restrained overall but allowed a few deliberate "signature moments"** (e.g. the hero photo's yellow backdrop; possibly one yellow highlight/section accent). Default UI (buttons/marks/hover) uses yellow sparingly; the page must never read as "covered in yellow."
- **D-03:** **Neutral-only palette** — near-black, white/cream, greys — with **yellow as the single accent**. No navy/indigo secondary color (the docx-card navy is not adopted). Keeps it premium and un-templated. — Reversibility: reversible.

### Hero Treatment (discussed)
- **D-04:** Hero uses a **split "card" layout**: text block (title, subtext, primary CTA Contact, secondary CTA Mijn verhaal, USP row) on the **left**; hero photo in a **large rounded card on the right** (Sevora-style). Stacks vertically on mobile (text then image). No full-bleed text-overlay hero.
- **D-05:** Hero photo = **`10 Jaar Soly-77`** (yellow+blue stage backdrop), used **as-is as a signature yellow moment** — not desaturated. The rest of the page stays restrained so this stays special. It is the **LCP image**: eager-load, high priority, still served as optimized AVIF/WebP with responsive crops.
- **D-06:** The **"bekend van" press-logo strip sits directly under the hero** (slim credibility band, Sevora-style), using clearly-marked placeholder logo chips until real logos are supplied.

### Services & Testimonials (Claude's discretion — on-brief call)
- **D-07:** "Samenwerken" (Sectie 2) renders as a **3-card row ordered as a commitment ladder**: Nieuwsbrief (gratis, laagdrempelig) → Presentatie/lezing → 1:1 Coaching. Small Dutch eyebrow labels (inspired by the reference's "01/02/03" ladder but **not** copied verbatim, and in Dutch). Each card carries its supplied CTA (Schrijf je gratis in → Substack; Boek lezing → contact/lead; Plan kennismaking → contact/lead). Equal-height cards; keep restrained (photos optional per `ASSETS.md`, not required).
- **D-08:** Testimonials (Sectie 3) use a **mixed-size mosaic** inspired by the reference (one larger card + smaller cards) with the **3 supplied quotes + attributions**. **No fabricated "trusted by N clients" stat** — we don't have a real number (honesty rule).

### Forms & Placeholders (Claude's discretion — on-brief call)
- **D-09:** **Newsletter signup** — both touchpoints (Sectie 2 card CTA and Sectie 5 inline `naam` + `mailadres` form) resolve to **redirecting to Substack in a new tab** (per docx). The inline form is fully designed, but because the Substack URL is not yet supplied, the submit action is a **clearly-marked placeholder link (disabled/`TODO`), not a fake success state**. Wire the real URL later (Phase 3 replaces this with true Substack integration). — Reversibility: reversible.
- **D-10:** **"Recente artikelen"** (Sectie 6) shows **3 designed placeholder article cards** with plausible founder-topic titles/dates/read-time, each **clearly flagged as placeholder** (visible marker/badge + code comment). Real Substack articles arrive in Phase 3.
- **D-11:** **Press logos** are **text/wordmark placeholder chips** (outlet names, greyscale, clearly not final logos), swappable when real assets arrive.
- **D-12:** **Honest CTA/link handling (global):** any CTA or nav item whose destination is a future page/unknown endpoint (nav: Coaching/Spreker/Nieuwsbrief/Mijn verhaal/Boek; header Contact; NL/EN switch; LinkedIn icon) is **rendered but disabled/non-clickable and documented as a placeholder** — never a fake working button. In-page anchor CTAs (e.g. "Mijn verhaal" → story section, newsletter CTAs → signup section) may link to on-page sections where sensible.

### Design System & Build (Claude's discretion)
- **D-13:** Design tokens as **CSS custom properties** (color, type scale, spacing scale, radii, shadows, motion). Brand typeface behind a **single swappable variable** (`--font-display` / `--font-brand`): interim = a properly-licensed **editorial serif for display headings + a clean grotesque sans for body** (matches Sevora's serif-display character); Naste swaps in later with one change. — Reversibility: costly — a font/token swap touches every component's typography, but is mechanical.
- **D-14:** **Astro components + scoped/token-based CSS.** A utility framework (e.g. Tailwind) is *optional* and left to research/planner, but the output **must not look like a generic AI/SaaS template** — bespoke spacing, type, and composition over stock utility patterns. Minimal JS: interactivity (carousel, mobile nav, scroll-reveal) via small Astro islands / vanilla JS only.
- **D-15:** **Animations:** subtle, purposeful scroll-reveal (fade/translate) and hover micro-interactions; **respect `prefers-reduced-motion`**; no heavy parallax.
- **D-16:** **i18n-ready structure:** NL is the default/only locale now; organize routing/content (e.g. content collections or a locale-scoped structure) so EN can be added in Phase 4 without a refactor. The NL/EN switch is a disabled placeholder affordance now.
- **D-17:** **Content/tone:** Dutch, informal "je", confident and honest — matches the docx. Preserve supplied factual claims/names; obvious spelling/language errors may be corrected, factual claims/names not without consulting the user.

### Claude's Discretion
D-07 through D-16 above were left to my judgment (user selected only Color & Hero to discuss) and made per the brief. All are open to revision at planning/UI-spec time.
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Primary source of truth (content, structure, CTAs, design direction)
- `Input homepage Milan.docx` — THE source for homepage copy, section order, CTAs, and future pages. Binary; extracted text + section breakdown is captured in `.planning/PROJECT.md` (## Context) and the design-reference screenshots inside it informed these decisions.
- Design inspiration (composition/type/spacing/cards/image treatment only — do NOT copy): https://sevora.framer.website/

### Project planning docs
- `.planning/PROJECT.md` — project vision, constraints, key decisions
- `.planning/REQUIREMENTS.md` — v1 requirements FND-01–10, HOME-01–11 (this phase)
- `.planning/ROADMAP.md` §"Phase 1" — goal + 5 success criteria (the acceptance anchor)
- `.planning/ASSETS.md` — photo inventory, section→photo mapping, asset pipeline rules, font/placeholder plan

### Assets
- `fotos/wetransfer_10-jaar-soly-77-jpg_2026-08-18_1205.zip` — 6 source photos (originals; keep OUT of production/git). Hero = `10 Jaar Soly-77.jpg`.
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None yet — greenfield. No existing components, no `.planning/codebase/` maps. This phase creates the reusable component library and design system from scratch.

### Established Patterns
- None yet. Patterns established here (tokens, component conventions, image pipeline) become the baseline for Phases 2–5.

### Integration Points
- Future phases (subpages, forms, Substack, i18n, book/pre-order) will consume this phase's design system, components, and i18n-ready structure. Build extensibly but do not implement their infrastructure now.
</code_context>

<specifics>
## Specific Ideas

- Sevora reference specifics that informed decisions: serif display headings, off-white base with dark rounded cards, slim logo strip under hero, mixed-size testimonial mosaic, split hero with a large image card.
- The docx "commitment ladder" (01 START HERE FREE / 02 GO DEEPER / 03 WORK WITH ME) is an English *example* — adapt the ordering concept into Dutch, do not copy the wording.
- Hero photo's yellow backdrop is treated as a lucky, authentic on-brand moment rather than a problem to neutralize.
</specifics>

<deferred>
## Deferred Ideas

- Coaching / Spreker / Mijn verhaal / Contact pages → Phase 2
- Working contact form + "Boek lezing"/"Plan kennismaking" lead flow → Phase 2
- Real Substack signup + live recent-articles feed → Phase 3
- NL/EN switch + English translations → Phase 4
- Book / pre-order page + analytics/conversion + optional CMS → Phase 5
- LinkedIn feed integration → out of scope (not attempted)

None of the above are to be built in Phase 1 — the structure must merely not block them.
</deferred>

---

*Phase: 1-Foundation, Design System & Dutch Homepage*
*Context gathered: 2026-08-18*
