# Phase 3: Newsletter & Substack Integration - Context

**Gathered:** 2026-08-18
**Status:** Ready for planning

<domain>
## Phase Boundary

Replace the two honest placeholders left from Phase 1 with the **real Substack**: a functional newsletter **signup**, a dedicated **newsletter page** (`/nieuwsbrief`, NEWS-01), and a **"Recente artikelen" feed** that auto-updates with the latest real Substack posts (removing the static placeholder cards). Maps to **NEWS-01, NEWS-02, NEWS-03**.

**In scope:**
- Wire newsletter signup to Substack (NEWS-02) — on both the homepage `Newsletter.astro` section and the new page.
- New `/nieuwsbrief` page (NEWS-01), styled with the Phase 1 design system.
- Auto-updating recent-articles feed from Substack RSS (NEWS-03) — replaces the 3 placeholder cards in `Articles.astro`.
- Enable the currently-disabled **Nieuwsbrief** nav item, footer link, and the Samenwerken "Nieuwsbrief" card CTA — routing them to `/nieuwsbrief`.

**Out of scope (stays deferred):** NL/EN switch + English content (Phase 4); book/pre-order + analytics + optional CMS (Phase 5); auth, database, payments (whole-milestone out of scope). The site remains **static on GitHub Pages** — no server/backend is introduced in this phase.

**The reality shaping this phase:** Substack has **no official public subscribe API** for static sites, but it publishes a standard **RSS feed** (`<publication>/feed`). That single fact drives the signup mechanism (redirect) and the feed mechanism (build-time RSS) below.
</domain>

<decisions>
## Implementation Decisions

### Newsletter Signup Mechanism (discussed)
- **D-01:** **Signup connects via redirect to Substack's hosted subscribe page.** The on-site form/button hands off to `https://<publication>.substack.com/subscribe` opened in a **new tab** with `target="_blank" rel="noopener noreferrer"` (T-01-04 tab-napping rule from Phase 1). This is the most **robust and honest** option — no fragile undocumented API calls, no backend, and it works within static GitHub Pages. Explicitly **rejected:** (a) POSTing to Substack's undocumented `/api/v1/free` endpoint (fragile, CAPTCHA/CORS-prone, risks a fake-success state that violates the honesty rule) and (b) the Substack embed iframe (off-brand styling, third-party frame). — **Reversibility:** reversible — swapping to an embed later is a localized component change.
- **D-05:** **Form shape = e-mail-focused redirect** *(Claude's discretion — user said "you decide", recommended: keep email + prefill, drop name)*. Keep a styled on-site signup as the visual lead-in, but reduce it to a single **e-mail field** + "Schrijf je in" action; on submit, redirect to the Substack subscribe URL with the email **prefilled** (`?email=<typed>` — Substack's subscribe flow accepts an email query param). The Phase 1 **naam field is removed** because a redirect cannot honestly carry it into Substack — keeping a field that gets silently discarded would violate the honesty rule (this is a deliberate, flagged change to HOME-07's original naam+email form). — **Reversibility:** reversible. **⚠ Verify at research/plan time:** confirm Substack still honours `?email=` prefill; if not, fall back to a plain "Schrijf je in op Substack →" button with no prefill (still honest).

### Recent-Articles Feed Mechanism (Claude's discretion — user said "you decide")
- **D-02:** **Build-time RSS fetch + scheduled rebuild.** At `astro build`, fetch the Substack RSS feed (`<publication>/feed`) and render the article cards as **static HTML** — best SEO, no runtime JS, no CORS proxy dependency, fully static-native. A **scheduled GitHub Action (cron, e.g. daily)** re-runs the build+deploy so new posts appear "automatically" (NEWS-03) without manual intervention. Explicitly **rejected:** client-side runtime fetch (needs a third-party CORS proxy since Substack RSS lacks CORS headers, adds client JS + loading state, weaker SEO). — **Reversibility:** reversible — the data-source swap is isolated behind the `ArticleCard` contract; the markup loop is unchanged.
- **D-06:** **Feed failure/empty behavior = honest placeholder, build never breaks** *(Claude's discretion — user said "you decide")*. If the RSS feed is unreachable or the publication has no posts yet (which is also the natural state while `TODO_SUBSTACK_URL` is a placeholder — see D-04), render the existing **honest "binnenkort" placeholder/empty state** rather than failing the build or fabricating posts (honesty rule, HOME-11). Emit a **build-log warning** so the failure is visible. The build always succeeds; the site never breaks. Explicitly **rejected:** failing the build on fetch error (a Substack outage would block all deploys).

### Dedicated Newsletter Page (Claude's discretion — user said "you decide")
- **D-03:** **`/nieuwsbrief` = rich editorial landing page** (not a thin signup stub), reusing the Phase 1/2 design system. Structure: hero / value-prop ("wat je krijgt & waarom je je inschrijft") → prominent signup (per D-01/D-05) → recent issues from the feed (per D-02) → optional social proof. It should read as a real standalone conversion destination, consistent with how `/coaching` and `/spreker` were built in Phase 2. — **Reversibility:** reversible.

### Substack URL Availability (discussed)
- **D-04:** **Substack publication URL is NOT supplied yet → graceful-fallback / honest-placeholder pattern**, identical to Phase 2's Web3Forms key (D-02 there). Phase 3 builds the **full integration behind `TODO_SUBSTACK_URL`** (`config.ts`); signup and feed stay in their honest disabled/placeholder state until the real URL is dropped in, at which point **one grep-replace flips everything live**. — **Reversibility:** reversible. **Note on success criteria:** NEWS-02 ("successfully subscribes a reader") and NEWS-03 ("shows the latest real posts") are met the **instant** `TODO_SUBSTACK_URL` is replaced — the build ships fully wired and integration-ready, exactly as Phase 2's form shipped submission-ready. Downstream planning must treat this as the honest analog, not as an incomplete phase.

### Claude's Discretion (article display details — not selected for discussion)
- **D-07:** **RSS → `ArticleCard` field mapping.** Homepage "Recente artikelen" shows the **latest 3** posts (preserving the current 3-card layout + `ArticleCard` contract in `Articles.astro`); the `/nieuwsbrief` archive may show more (e.g. latest 6–10). Map RSS `<item>` fields: `title` → title, `link` → real Substack post URL (`target="_blank" rel="noopener noreferrer"` on "Lees verder"), `pubDate` → date display, `description`/`content:encoded` → excerpt. **"Alle artikelen"** → the Substack publication home. **Fields RSS does not provide** (`category`, `readTime` in the current `ArticleCard` type) must be handled honestly — derive `readTime` from a word-count estimate, and either omit the category eyebrow or use a neutral static label; **never fabricate** a category (HOME-11). Remove the `isPlaceholder` flag once real data is present. — **⚠ Verify at research time:** exactly which fields Substack's RSS exposes (cover image via `enclosure`? `dc:creator`?), and pick an RSS parser (e.g. `fast-xml-parser` / `rss-parser`) — the planner/researcher decides the tool.
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase requirements & acceptance anchor
- `.planning/ROADMAP.md` §"Phase 3: Newsletter & Substack Integration" — goal + 3 success criteria (the acceptance anchor).
- `.planning/REQUIREMENTS.md` §"Newsletter & Substack (Phase 3)" — **NEWS-01** (newsletter page), **NEWS-02** (signup wired to Substack), **NEWS-03** (auto recent-articles feed).

### Project planning docs
- `.planning/PROJECT.md` — vision, constraints, honesty rules, and Key Decisions table (note the "Static placeholder articles in v1" / "Live Substack feed deferred to a later phase" entries this phase now delivers).
- `.planning/phases/01-foundation-design-system-dutch-homepage/01-CONTEXT.md` — Phase 1 design decisions (light editorial base + dark bands, restrained yellow, honest-CTA rule, i18n-ready structure) — all carry forward.
- `.planning/phases/02-supporting-pages-lead-gen-forms/02-CONTEXT.md` — Phase 2 pattern precedent: **honest-placeholder-behind-a-config-constant** (Web3Forms key, D-02) is the exact model for D-04 here; page-building conventions for `/coaching` `/spreker` apply to `/nieuwsbrief`; static-GitHub-Pages / BASE_URL routing rule (CR-01) applies.
- `.planning/ASSETS.md` — photo inventory + section→photo mapping (check for a reserve photo suitable for the `/nieuwsbrief` hero).
- Primary content source: `Input homepage Milan.docx` — source for the newsletter section copy/tone; extracted text + section breakdown captured in `.planning/PROJECT.md` §Context.

### Existing code (read before building)
- `src/config.ts` — `TODO_SUBSTACK_URL` is the single grep-replaceable seam for D-04; extend/derive the RSS feed URL and subscribe URL from it. Honest-placeholder pattern documented in the file header.
- `src/components/sections/Newsletter.astro` — the homepage signup section; currently a disabled placeholder with inline `TODO Phase 3` markers pointing at exactly the redirect/rewire this phase performs (D-01/D-05). Note the `T-01-04` `rel="noopener noreferrer"` requirement already documented there.
- `src/components/sections/Articles.astro` — the "Recente artikelen" section; carries the **`ArticleCard` data-shape contract** and `TODO Phase 3` markers. D-02/D-07 swap the hardcoded `nl.articles.items` array for the RSS source without changing the markup loop.
- `src/i18n/nl.ts` — single source of truth for Dutch strings (`nl.newsletter`, `nl.articles`, `nl.common`); new `/nieuwsbrief` copy and any feed-related strings go here (same shape keeps Phase 4 EN ready).
- `src/components/ui/` — Button, Card, SectionWrapper, PlaceholderBadge, RevealOnScroll (reuse; do not build new primitives).
- `src/components/layout/Nav.astro` + `Footer.astro` — enable the disabled **Nieuwsbrief** item/link → `/nieuwsbrief` (href-or-reason union shape established in Phase 2); keep the **Boek** item disabled (Phase 5) and the **NL/EN** switch a placeholder (Phase 4).
- `src/components/sections/Samenwerken.astro` — the "Nieuwsbrief" commitment-ladder card CTA is still disabled; wire it to `/nieuwsbrief` (Lezing/Coaching were enabled in Phase 2).
- `src/layouts/BaseLayout.astro` + `src/components/layout/BaseHead.astro` — per-page SEO/meta for the new `/nieuwsbrief` page; `src/styles/tokens.css` — design tokens.

### External service
- **Substack RSS** — `https://<publication>.substack.com/feed` (standard RSS 2.0; used by D-02 at build time). Fields to confirm at research time: `title`, `link`, `pubDate`, `description`, `content:encoded`, `enclosure` (cover image?), `dc:creator`.
- **Substack subscribe URL** — `https://<publication>.substack.com/subscribe` (redirect target for D-01; confirm `?email=` prefill support for D-05).
- Design inspiration (composition/type/spacing only — do NOT copy): https://sevora.framer.website/

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`Newsletter.astro`** — already-styled signup section with accessible labels, focus rings, disabled-placeholder submit, and `TODO Phase 3` markers referencing `TODO_SUBSTACK_URL`. D-05 reduces this to an e-mail-focused redirect form.
- **`Articles.astro`** — 3-card grid + the `ArticleCard` type contract (`category`, `title`, `excerpt`, `date`, `readTime`, `isPlaceholder`) explicitly designed for this phase's RSS swap; the markup loop stays, only the data source changes (D-02/D-07).
- **UI kit** (`src/components/ui/`) + **design tokens** + Fraunces/DM Sans fonts — compose `/nieuwsbrief` from these, mirroring `/coaching` and `/spreker`.
- **`config.ts`** honest-placeholder pattern (`TODO_SUBSTACK_URL`) — the single seam for D-04.
- **`nl.ts`** typed-const string store — add `/nieuwsbrief` copy + feed strings here.

### Established Patterns
- **Honest-placeholder-behind-a-config-constant** (Phase 2 D-02, Web3Forms): build the full integration, keep it visibly non-functional until the real value is supplied, one grep-replace to go live, never a fake success. D-04 is the direct reuse of this pattern.
- **Honest CTA/link rule** (Phase 1 D-12): unknown destinations are disabled + documented, never `href="#"`; external redirects carry `rel="noopener noreferrer"` (T-01-04).
- **Static Astro output + `astro:assets`**; minimal-JS islands with reduced-motion guards. D-02's build-time fetch keeps the feed **zero-runtime-JS**, consistent with this.
- **Per-page SEO** via `BaseHead.astro`; **BASE_URL-prefixed internal links** (never bare `/nieuwsbrief` — 404s under the GitHub Pages subpath, CR-01).
- **href-or-reason union** nav/footer item shape (Phase 2) — flip Nieuwsbrief from reason → href.

### Integration Points
- **`Nav.astro` / `Footer.astro`**: enable Nieuwsbrief → `/nieuwsbrief`; keep Boek + NL/EN as placeholders.
- **`Samenwerken.astro`**: Nieuwsbrief card CTA → `/nieuwsbrief`.
- **`Newsletter.astro`** (homepage) + **`/nieuwsbrief`**: both use the D-01/D-05 redirect signup.
- **`Articles.astro`** (homepage) + **`/nieuwsbrief`** archive: both consume the D-02 build-time RSS source.
- **Build/deploy**: a scheduled GitHub Action (cron) is a NEW infra piece this phase introduces for NEWS-03 freshness — the only new "infra", and it stays within static-hosting bounds.

</code_context>

<specifics>
## Specific Ideas

- Signup is a **redirect**, not an on-site subscribe — the styled form is a lead-in, the actual opt-in completes on Substack (honest hand-off, new tab, `rel="noopener noreferrer"`).
- Prefill the e-mail into the Substack subscribe URL (`?email=`) if supported; drop the name field rather than discard it silently.
- Feed is **built at deploy time from RSS** and kept fresh by a **daily scheduled GitHub Action rebuild** — "automatic" without a backend.
- `/nieuwsbrief` should feel like a real destination (value-prop + signup + recent issues), matching the `/coaching` `/spreker` editorial bar.
- Everything ships **integration-ready behind `TODO_SUBSTACK_URL`**; it goes fully live the moment Milan supplies the publication URL (same as the Web3Forms key).

</specifics>

<deferred>
## Deferred Ideas

- **Real `TODO_SUBSTACK_URL`** — Milan to supply the Substack publication URL; the phase ships fully wired with a graceful placeholder until then (D-04).
- **Instant/real-time article freshness** — build-time + daily rebuild is the chosen tradeoff; a client-side live fetch (with CORS proxy) was considered and rejected for this phase.
- **Substack embed iframe / custom-form API POST** — considered and rejected for the signup mechanism (D-01); could revisit if the redirect UX proves insufficient.
- **NL/EN translations of `/nieuwsbrief` + newsletter/feed strings** → **Phase 4** (keep i18n-ready `nl.ts` structure).
- **Analytics on newsletter conversion / A-B of the signup** → **Phase 5** (GROW-01).
- **Full post archive / blog on-site (beyond the recent-issues list)** — out of scope; "Alle artikelen" links to the Substack publication instead.

None of the above are to be built in Phase 3 beyond leaving the structure/seams open.

</deferred>

---

*Phase: 3-Newsletter & Substack Integration*
*Context gathered: 2026-08-18*
