# Phase 5 — API / Integration Coverage Matrix

**Generated:** 2026-08-19 (planner)
**Scope:** New external integration this phase = **Plausible Analytics**. Web3Forms and Substack are reused unchanged from Phases 2/3 and are noted but not re-integrated.

Policy: **INTEGRATE by default.** Each capability of the new integration is enumerated and given an explicit disposition. OPT-OUT decisions carry a one-line reason.

---

## New Integration: Plausible Analytics

Capability surface enumerated from the Plausible script + custom-events API (05-RESEARCH.md §Plausible Analytics, §Custom Events). The site loads `https://plausible.io/js/script.js` (standard variant) behind the `TODO_PLAUSIBLE_DOMAIN` config seam, production-only.

| Capability | Disposition | Reason |
|------------|-------------|--------|
| Pageview tracking (`script.js`) | **INTEGRATE** | Core requirement (GROW-01, D-05) — measures traffic to every page including `/boek` + `/en/book`. |
| Custom goal: `Contact: Submit` | **INTEGRATE** | Key lead action (D-05). Fired on successful Web3Forms contact submit. |
| Custom goal: `Newsletter: Subscribe` | **INTEGRATE** | Key lead action (D-05). Fired on click of live Substack redirect anchor. |
| Custom goal: `Book: Interest` | **INTEGRATE** | Key lead action (D-05). Fired on successful BookInterestForm submit. |
| Custom goal: `Sticky CTA: Click` | **INTEGRATE** | Conversion-optimization measurement (D-07). Fired on sticky-CTA click; makes the optimization's effect measurable. |
| Funnels | **OPT-OUT** | Not needed for a single-page-per-goal lead-gen personal site; no multi-step purchase flow exists. |
| Revenue / ecommerce tracking (`revenue` prop) | **OPT-OUT** | No payments/checkout in this milestone (project constraint); no revenue to attribute. |
| Custom props / dimensions beyond the 4 goals | **OPT-OUT** | Not needed yet — the 4 named goals cover every tracked action; extra props add dashboard noise with no current question to answer. |
| Outbound-link auto-tracking (`script.outbound-links.js`) | **OPT-OUT** | Not needed for a lead-gen personal site; the LinkedIn/Substack links that matter are already covered by named goals where relevant. |
| File-download tracking (`script.file-downloads.js`) | **OPT-OUT** | No downloadable assets shipped this phase (lead-magnet PDF is deferred — see 05-CONTEXT.md Deferred Ideas). |
| 404 tracking (`script.404.js`) | **OPT-OUT** | Not needed yet for a small static site; no custom 404 analytics question. |
| Tagged-events variant (`script.tagged-events.js`, CSS-class events) | **OPT-OUT** | Manual `window.plausible()` calls from existing JS islands are cleaner and more auditable than CSS-class markup (05-RESEARCH.md §Plausible Script Variants). |
| Hash-based routing / SPA pageviews (`script.hash.js`) | **OPT-OUT** | Static multi-page Astro site with full-page navigation; no SPA/hash routing. |
| Custom `data-api` / self-hosted proxy | **OPT-OUT** | Not needed yet; direct `plausible.io` CDN is acceptable for this brand (established EU-hosted provider, cookieless). |

---

## Reused Integrations (not new — noted for completeness)

| Integration | Status | Notes |
|-------------|--------|-------|
| Web3Forms | **REUSED unchanged** | `BookInterestForm.astro` reuses the existing `ContactForm.astro` Web3Forms pattern (`access_key`, honeypot, `type=` routing). No new endpoint, no new config beyond the existing `TODO_WEB3FORMS_ACCESS_KEY`. Already integrated Phase 2. |
| Substack | **REUSED unchanged** | Book page primary capture reuses the `Newsletter.astro` IS_SENTINEL Substack-redirect pattern (`TODO_SUBSTACK_URL`). No new config. Already integrated Phase 3. |

---

## Sign-off

- All INTEGRATE capabilities are wired in Plan 02 (analytics) except pageviews which is automatic once the script injects.
- All OPT-OUT capabilities carry a one-line reason above.
- Web3Forms + Substack are reused with zero new integration surface.
