# Phase 3: Newsletter & Substack Integration - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-18
**Phase:** 3-Newsletter & Substack Integration
**Areas discussed:** Signup method, Feed freshness, Newsletter page depth, Substack URL availability, Form shape, Feed fallback

---

## Signup method — how the on-site signup connects to Substack

| Option | Description | Selected |
|--------|-------------|----------|
| Redirect to Substack | Styled on-site form is a lead-in; button opens Substack's hosted subscribe page (new tab). Robust, honest, no backend; signup completes off-site. | ✓ |
| Embed Substack widget | Native embeddable signup iframe inline; reliable but Substack's styling (off-brand), adds a third-party frame. | |
| Custom form → API POST | Keep our form and POST to Substack's undocumented endpoint via JS. On-brand/inline but fragile, CAPTCHA/CORS-prone, risks fake success. | |

**User's choice:** Redirect to Substack
**Notes:** Chosen for robustness + honesty on a static (no-backend) GitHub Pages site. → CONTEXT D-01.

---

## Feed freshness — keeping "Recente artikelen" current on a static site

| Option | Description | Selected |
|--------|-------------|----------|
| Build-time + scheduled rebuild | Fetch RSS at `astro build` → static cards (SEO, no client JS/proxy); scheduled GitHub Action rebuilds daily so new posts appear automatically. | ✓ (via "You decide") |
| Client-side live fetch | JS fetches RSS on page load via a CORS proxy. Always fresh but needs a proxy, client JS, loading state, weaker SEO. | |
| You decide | Delegate to Claude. | ✓ |

**User's choice:** "You decide" → Claude selected **build-time RSS + scheduled GitHub Action rebuild** (the recommended static-native option).
**Notes:** Best SEO, no proxy, "automatic enough" for a newsletter cadence. → CONTEXT D-02.

---

## Newsletter page depth (/nieuwsbrief, NEWS-01)

| Option | Description | Selected |
|--------|-------------|----------|
| Rich editorial landing | Value-prop + prominent signup + recent-issues/archive from the feed; a real standalone conversion destination. | ✓ (via "You decide") |
| Focused signup page | Lean single-value-prop + signup, minimal extras. | |
| You decide | Delegate to Claude. | ✓ |

**User's choice:** "You decide" → Claude selected **rich editorial landing** (matches the `/coaching` `/spreker` bar from Phase 2).
**Notes:** → CONTEXT D-03.

---

## Substack URL availability

| Option | Description | Selected |
|--------|-------------|----------|
| I'll provide the URL now | Wire everything live this phase. | |
| Not yet — graceful fallback | Build full integration behind `TODO_SUBSTACK_URL`; honest-placeholder until supplied; one grep-replace to go live. | ✓ |
| I have it but it's empty | Publication exists but few/no posts; needs empty-state handling. | |

**User's choice:** Not yet — graceful fallback
**Notes:** Direct reuse of Phase 2's Web3Forms honest-placeholder pattern. Success criteria are met the instant the URL is supplied. → CONTEXT D-04.

---

## Form shape (follow-up — created by the redirect + fallback choices)

| Option | Description | Selected |
|--------|-------------|----------|
| Keep fields, prefill email | Keep naam + e-mail form; redirect with `?email=` prefilled. Name doesn't carry over. | |
| Single CTA button | Drop inputs; one "Schrijf je in op Substack →" button. Fully honest, changes the 2-field design. | |
| You decide | Delegate to Claude. | ✓ |

**User's choice:** "You decide" → Claude selected **e-mail field + `?email=` prefill, name field removed** (keeping a discarded field would be dishonest UX).
**Notes:** Flagged to verify Substack `?email=` prefill at research time; fall back to a plain redirect button if unsupported. → CONTEXT D-05.

---

## Feed fallback (follow-up — honesty rule on a build-time feed)

| Option | Description | Selected |
|--------|-------------|----------|
| Honest empty/placeholder state | On fetch failure / empty feed, show the honest "binnenkort" placeholder; build always succeeds. | |
| Fail the build loudly | Error the build if the feed can't be fetched; never ships broken, but an outage blocks deploys. | |
| You decide | Delegate to Claude. | ✓ |

**User's choice:** "You decide" → Claude selected **honest placeholder fallback + build-log warning** (site never breaks, no fake content).
**Notes:** Also the natural state while `TODO_SUBSTACK_URL` is a placeholder. → CONTEXT D-06.

---

## Claude's Discretion

- **Feed freshness (D-02)** and **feed fallback (D-06)** — delegated ("you decide").
- **Newsletter page depth (D-03)** — delegated ("you decide").
- **Form shape (D-05)** — delegated ("you decide").
- **RSS → ArticleCard field mapping (D-07)** — not surfaced for discussion; Claude's discretion, with fabrication-free field handling flagged for research.

## Deferred Ideas

- Real `TODO_SUBSTACK_URL` (Milan to supply) — phase ships wired behind the placeholder.
- Instant/real-time feed freshness (client-side fetch + CORS proxy) — rejected for this phase.
- Substack embed iframe / custom-form API POST — rejected signup alternatives; could revisit.
- NL/EN translations of `/nieuwsbrief` + feed strings → Phase 4.
- Newsletter-conversion analytics / signup A-B → Phase 5 (GROW-01).
- Full on-site post archive/blog → out of scope; "Alle artikelen" links to Substack.
