# Phase 3 — Substack External-API Coverage Matrix

**Generated:** 2026-08-18 (gsd-planner)
**Policy:** Full API Coverage by Default — Opt Out, Never Opt In. INTEGRATE is the default; every OPT-OUT carries a one-line reason.
**External service:** Substack (hosted newsletter platform). Substack exposes **no official public API** for programmatic subscribe; it exposes a standard **RSS 2.0 feed** and **hosted web pages**. The capability surface below is therefore "the web/RSS surface a static site can consume," not a REST API.

---

## Capability Matrix

| # | Substack capability | Surface | Decision | Plan | Reason |
|---|---------------------|---------|----------|------|--------|
| C-1 | RSS feed fetch (`<pub>/feed`) — recent posts | RSS 2.0 over HTTPS, build-time | **INTEGRATE** | 01 | NEWS-03. Fetched at `astro build` in `src/lib/rss.ts`; parsed with `fast-xml-parser`; mapped to `ArticleCard[]`. |
| C-2 | RSS item fields: `title`, `link`, `pubDate`, `description`, `content:encoded` | RSS item XML | **INTEGRATE** | 01 | NEWS-03. `title`/`link`/`pubDate`/`description` mapped to `ArticleCard`; `content:encoded` used ONLY for word-count→readTime (never rendered as HTML). |
| C-3 | RSS item field: `dc:creator` (author) | RSS item XML | **OPT-OUT** | 01 | Single-author publication (Milan) — author is implicit sitewide; a per-card author byline adds no signal. Preserved in parse output shape but not surfaced. |
| C-4 | RSS item field: `enclosure` (cover image) | RSS item XML | **OPT-OUT** | 01 | Substack sets `@_length="0"` on some posts (RESEARCH Pitfall 3) → broken images. `ArticleCard` has no image field in this MVP; cover art is a deferred enhancement. |
| C-5 | RSS item field: `category` | RSS item XML | **OPT-OUT** | 01 | Substack RSS does not emit a usable `category` per item; fabricating one violates HOME-11. Neutral static label `"Artikel"` is used instead. |
| C-6 | Hosted subscribe page (`<pub>/subscribe`) redirect | Web page, new-tab redirect | **INTEGRATE** | 02 | NEWS-02. On-site signup hands off to Substack's hosted opt-in via `target="_blank" rel="noopener noreferrer"` (D-01). |
| C-7 | Subscribe `?email=` prefill query param | Web page query param | **OPT-OUT** | 02 | Unconfirmed by Substack docs/community (RESEARCH A1/Pitfall 6). Prefilling an unhonored param would silently discard the email → honesty violation. Plain redirect button is the honest default (D-05 fallback). |
| C-8 | Publication home link (`<pub>`) | Web page link | **INTEGRATE** | 01 | NEWS-03 / D-07. "Alle artikelen" → Substack publication home (new tab). |
| C-9 | Undocumented subscribe API POST (`/api/v1/free`) | Reverse-engineered endpoint | **OPT-OUT** | — | D-01 explicitly rejected: fragile, CAPTCHA/CORS-prone, risks a fake-success state (honesty violation). Not a public API. |
| C-10 | Substack embed iframe | Third-party iframe | **OPT-OUT** | — | D-01 explicitly rejected: off-brand styling, third-party frame, iframe-sizing issues. |
| C-11 | Client-side runtime RSS fetch | Browser fetch | **OPT-OUT** | 01 | Substack RSS sends no CORS headers → browser-blocked; needs a third-party proxy; weaker SEO; adds runtime JS. Build-time fetch (C-1) supersedes it. |
| C-12 | Scheduled freshness (rebuild cadence) | GitHub Actions cron | **INTEGRATE** | 01 | NEWS-03 "automatically." Daily `schedule:` cron in `deploy.yml` rebuilds+redeploys so new posts appear without manual action. |

---

## Subtraction Record Summary

- **INTEGRATE (5):** C-1, C-2, C-6, C-8, C-12 — the full delivered surface (feed fetch, core item fields, subscribe redirect, publication link, scheduled freshness).
- **OPT-OUT (7):** C-3 (single-author), C-4 (zero-length enclosure), C-5 (no honest category), C-7 (unconfirmed prefill), C-9 (rejected undocumented POST — D-01), C-10 (rejected iframe — D-01), C-11 (CORS-blocked runtime fetch).

Every opt-out is either an explicit locked decision (D-01/D-05), a documented technical failure mode (RESEARCH pitfalls), or an honesty-rule constraint (HOME-11). No capability was dropped silently.

**Sentinel note:** All INTEGRATE capabilities ship behind `TODO_SUBSTACK_URL` (D-04). They are fully wired but render the honest placeholder/disabled state until Milan supplies the publication URL — at which point one grep-replace flips C-1, C-2, C-6, C-8 live and C-12 keeps them fresh.
