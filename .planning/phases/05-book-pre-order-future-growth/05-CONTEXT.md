# Phase 5: Book / Pre-order & Future Growth - Context

**Gathered:** 2026-08-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Add the final growth layer to the (now bilingual) personal-brand site:

1. **Book / pre-order page (BOOK-01)** — a bilingual `/boek` (NL) + `/en/book` (EN) page presenting Milan's book as an honest "in the making" teaser with real interest capture (no fake purchase). Enable the existing disabled **"Boek"** nav placeholder in both locales.
2. **Analytics + one conversion optimization (GROW-01)** — privacy-first, cookieless analytics (no consent banner) with conversion-event tracking on the key lead actions, plus one concrete, buildable conversion optimization.
3. **CMS evaluation (GROW-02, optional)** — evaluate an editable-content approach and either adopt it without destabilizing existing pages, or document a reasoned defer.

**In scope:** the book page (NL+EN) + nav/footer enablement + interest capture; analytics install behind a config seam with goal tracking; one conversion optimization; a written CMS evaluation.

**Out of scope (belongs elsewhere / constraints):** self-built payments/checkout/database/auth (project constraint — any real purchase path is an *external hosted* link via a config seam, never self-built); real book content/title/cover/date (not available yet — page is a teaser); confirming the production domain (separate infra task, but note analytics + book seams depend on it).
</domain>

<decisions>
## Implementation Decisions

### Book / Pre-order (discussed)
- **D-01:** **Book status = "coming / no details yet."** No firm title, cover, or release date exists. The page is an **honest "book in the making" teaser** that captures interested readers — never a fake purchase button (honesty rule / HOME-10). Copy should set the expectation that the book is forthcoming. — **Reversibility:** reversible.
- **D-02:** **Interest capture = BOTH.** Primary action: subscribe/redirect to the **Substack** newsletter (framed for book updates — book news goes out via the newsletter already being grown). Secondary: a lightweight **Web3Forms** "notify me about the book" email form (book-specific subject/`type`, landing in Milan's existing inbox). Reuse the existing Substack + Web3Forms seams — no new infra. — **Reversibility:** reversible.
- **D-03:** **Leave a documented external-checkout config seam.** Build the waitlist/teaser page now, but add a documented config constant (e.g. `TODO_BOOK_CHECKOUT_URL` in `src/config.ts`) so a real external pre-order/buy link (Gumroad / Bol.com / publisher / Stripe Payment Link) can swap in later via grep-replace with no redesign. Matches the existing `TODO_SUBSTACK_URL` / `TODO_CALENDLY_URL` / `TODO_LINKEDIN_URL` pattern. Until supplied, no purchase button is shown (or it is a clearly-disabled placeholder, per the honesty rule). — **Reversibility:** reversible.

### Analytics & Privacy (discussed)
- **D-04:** **Privacy-first, cookieless analytics = Plausible.** Chosen for GDPR/EU-friendliness, no cookie-consent banner requirement, lightweight script, and premium/honest brand fit. **No cookie/consent banner is added** (a direct consequence of cookieless analytics). — **Reversibility:** costly — switching vendors later re-does the script + event wiring, but is mechanical.
- **D-05:** **Track key conversion events + pageviews.** Beyond pageviews, add custom goal/event tracking on the 3 lead actions: **contact form submit, newsletter signup, book-interest signup.** This measures what actually converts and pairs with the D-06 conversion optimization. — **Reversibility:** reversible.
- **D-06:** **Analytics wired behind a config seam.** The Plausible script + domain live behind a config constant (e.g. `TODO_PLAUSIBLE_DOMAIN` / an enable flag) and stay **inert until Milan supplies the account/domain** — consistent with the site's `TODO_` placeholder + honesty pattern. Note: the production domain (`SITE_URL`) is still a `TODO`; analytics activation depends on confirming it. The `astro:i18n`/BaseHead injection must load the script only in production with a real domain. — **Reversibility:** reversible.

### Conversion Optimization & CMS (Claude's discretion — on-brief calls, open to revision)
- **D-07:** **Conversion optimization (GROW-01) = a persistent/sticky primary CTA** on long pages (e.g. a sticky or end-of-page "Plan kennismaking" / contact CTA), with its click tracked as a Plausible goal so its effect is measurable. Chosen as the single, concrete, buildable-now lever that respects the premium/restrained design (subtle, not a pop-up). The stronger "lead magnet = free first chapter for a newsletter signup" play is **deferred** — it needs book content that does not exist yet (see Deferred Ideas). The planner may substitute an equally-valid single optimization if it better fits the design system. — **Reversibility:** reversible.
- **D-08:** **CMS (GROW-02) = evaluate → recommend DEFER adoption this phase.** Deliverable is a short written evaluation (in the phase docs) concluding that content stays in code for now. Rationale: content currently lives in typed `src/i18n/nl.ts` / `en.ts` objects; git-based CMSes (Decap/Sveltia/Pages CMS/TinaCMS) target markdown / Astro **content collections**, not TS objects, so adopting one now would require restructuring the just-shipped bilingual content and risks destabilizing existing pages (violating GROW-02's "without destabilizing" clause). The evaluation should name **migrating copy to Astro content collections** as the prerequisite for a future CMS. If the user overrides toward adoption, prefer a git-based CMS on a content-collections migration — but that is a larger effort than this phase's intent. — **Reversibility:** reversible (evaluation is a doc; no code lock-in).

### Claude's Discretion
- D-07 and D-08 were delegated by the user; made per the brief, the honesty/no-payments constraints, and the freshly-shipped bilingual structure. Both are open to revision at planning/UI-spec time. Exact sticky-CTA placement/affordance and the precise Plausible goal names are implementation details for research/planning.
- All book-page and analytics copy must ship **bilingual (NL + EN)** following the Phase 4 pattern (`getStrings(Astro.currentLocale)`, keys mirrored in `nl.ts`/`en.ts`, EN under `/en/*` with translated slug `/en/book`, hreflang alternates). EN copy is a Milan-review draft (carry forward Phase 4 D-03).
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase spec & requirements
- `.planning/ROADMAP.md` §"Phase 5: Book / Pre-order & Future Growth" — goal + 3 success criteria (acceptance anchor).
- `.planning/REQUIREMENTS.md` — BOOK-01 (book/pre-order page), GROW-01 (conversion + analytics), GROW-02 (optional CMS / editable content). Also §"Out of Scope" (payments, database, full CMS) — the constraints that make D-01/D-03/D-08 the honest choices.
- `.planning/PROJECT.md` — vision, constraints (no auth/db/payments/CMS infra; premium restrained design; honesty rules), Key Decisions table.

### Prior-phase decisions that constrain this phase
- `.planning/phases/01-foundation-design-system-dutch-homepage/01-CONTEXT.md` — D-12 (honest CTA/link handling: unknown destinations disabled + documented, never fake) and the `TODO_` config-seam pattern this phase extends.
- `.planning/phases/04-internationalization-english-content/04-CONTEXT.md` — the bilingual contract (NL root / EN `/en/*`, translated slugs, `getStrings` threading, hreflang, EN-as-Milan-review-draft). The book page + analytics UI must follow it.

### Existing code to read/extend
- `src/config.ts` — the `TODO_*` placeholder-destination constants; add `TODO_BOOK_CHECKOUT_URL` (D-03) and the Plausible domain/enable constant (D-06) here following the documented grep-replace pattern.
- `src/components/layout/Nav.astro` — the disabled **"Boek"** nav placeholder (`t.nav.boek`, reason "Book page follows in phase 5" / "Boek pagina volgt in fase 5") to enable in BOTH locales; also `Footer.astro`.
- `src/components/layout/BaseHead.astro` / `src/layouts/BaseLayout.astro` — where the Plausible `<script>` gets injected (production + real-domain only, D-06).
- `src/components/forms/ContactForm.astro` + `src/lib/rss.ts` / Newsletter/Substack seam — analogs for the book Web3Forms notify form and the Substack subscribe action (D-02).
- `src/i18n/nl.ts` / `src/i18n/en.ts` + `src/i18n/utils.ts` — add book-page + any CTA copy keys to BOTH; add the `/en/book` slug to the NL↔EN slug map (`nlToEn`/`enToNl`).
- `src/pages/` — existing NL pages + `src/pages/en/*` wrappers are the pattern for `/boek` (NL) and `/en/book` (EN).

No external ADRs/specs beyond the above — decisions captured here and in the referenced files. Plausible docs (script + custom events / goals) are the key external reference for research.
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `TODO_` config-seam pattern in `src/config.ts` — extend for `TODO_BOOK_CHECKOUT_URL` + Plausible domain (grep-replaceable, honest-disabled until supplied).
- Web3Forms `ContactForm.astro` (with `?type=` routing to one inbox) — the analog for the book "notify me" form.
- Substack subscribe seam (Newsletter section / nieuwsbrief page) — the analog for the primary book-interest action.
- Bilingual machinery from Phase 4 (`getStrings`, `nlToEn`/`enToNl` slug map, EN page wrappers, hreflang in BaseHead) — the book page + nav enablement plug straight in.
- Design system (Button, Card, SectionWrapper, PlaceholderBadge) + honest-CTA/placeholder conventions.

### Established Patterns
- **Honesty rule (global):** disabled/documented placeholders, never fake buttons — governs the "coming soon" book page and the deferred checkout seam.
- **Bilingual-by-default:** every new page/string ships NL + EN with mirrored keys; EN under `/en/*` with a translated slug (`/en/book`).
- **Config-seam pattern:** external/unknown destinations live as `TODO_` constants in `config.ts`, inert until supplied.
- **Subpath-safe hrefs:** `import.meta.env.BASE_URL` / `getRelativeLocaleUrl` (GitHub Pages `/milan-website/` base). Any analytics/checkout URL handling must stay base-safe.

### Integration Points
- `Nav.astro` + `Footer.astro` — enable the "Boek" item (both locales) once `/boek` + `/en/book` exist.
- `BaseHead.astro` — inject the Plausible script (prod + real-domain gated) and the conversion-event hooks.
- Contact/newsletter/book forms — attach Plausible goal events (D-05) on submit/subscribe.
</code_context>

<specifics>
## Specific Ideas

- The book page's honest framing: a teaser ("the book I'm writing about scaling without losing yourself" — align tone with the homepage hero/story), not a store page. Capture interest, set no false expectations about availability.
- Plausible custom events/goals should be named clearly (e.g. `Contact: Submit`, `Newsletter: Subscribe`, `Book: Interest`) so the dashboard is readable.
- Sticky CTA (D-07) must stay subtle and premium — respect `prefers-reduced-motion` and the restrained yellow-accent rule; no intrusive pop-ups/exit-intent modals.
</specifics>

<deferred>
## Deferred Ideas

- **Lead-magnet conversion play** (free first chapter / founder-lessons PDF in exchange for a newsletter signup) — stronger conversion lever than the sticky CTA, but needs real book/guide content that doesn't exist yet. Revisit when book content is available.
- **Real book pre-order/checkout** (Gumroad/Bol/publisher/Stripe) — deferred until the book and platform are chosen; the D-03 config seam makes it a drop-in later.
- **CMS adoption** (git-based CMS on an Astro content-collections migration) — deferred per D-08; the evaluation names content-collections migration as the prerequisite.
- **A/B testing tooling** — heavier on a static site; not attempted this phase (single conversion optimization instead, per GROW-01 "at least one").
- **Confirming the production domain** + removing the GitHub Pages `base` — separate infra task that analytics + book seams depend on.

None of the above are built in Phase 5 beyond the seams/evaluation noted.
</deferred>

---

*Phase: 5-Book / Pre-order & Future Growth*
*Context gathered: 2026-08-19*
