---
status: testing
phase: 04-internationalization-english-content
source: [04-VERIFICATION.md]
started: 2026-08-19T14:45:00Z
updated: 2026-08-19T14:45:00Z
---

## Current Test

number: 1
name: Browser NL→EN switch navigation flow
expected: |
  Click "EN" on the homepage → land on /en/ in English. Navigate to Coaching / Speaking /
  About / Newsletter / Contact via the EN nav and confirm each stays English at its translated
  slug (/en/coaching, /en/speaking, /en/about, /en/newsletter, /en/contact). The switch on any
  EN subpage returns you to the equivalent NL page (e.g. /en/speaking → /spreker), not the NL
  homepage. Mobile hamburger open/close reads English aria-labels.
awaiting: user response

## Tests

### 1. Browser NL→EN switch navigation flow
expected: Each EN page loads in English; URL shows the translated slug; switching on an EN subpage lands on the equivalent NL page (not the NL home). Static HTML confirmed all links correct — this validates runtime nav/active-state/focus-trap in a real browser.
result: [pending]

### 2. EN copy quality and tone (D-03 — Milan review draft)
expected: All 6 EN pages read like natural International English in Milan's confident, honest founder voice. Numbers verbatim (12+ years, 180 employees, 9 markets), testimonial names unchanged, no embellishment or dropped factual claims. This is the expected human sign-off for the Claude-drafted EN copy.
result: [pending]

### 3. Sitemap hreflang coverage for translated-slug EN pages (SEO judgment)
expected: Decide whether page-level `<link rel="alternate" hreflang>` (present and correct on every page) is sufficient for SEO, or whether the missing `xhtml:link` sitemap alternates for /en/about, /en/newsletter, /en/speaking need a workaround. This is a known @astrojs/sitemap limitation with translated slugs; per-page hreflang is the backstop. Validate via Google Search Console / an SEO tool if desired.
result: [pending]

## Summary

total: 3
passed: 0
issues: 0
pending: 3
skipped: 0
blocked: 0

## Gaps

Resolved during execution (no longer pending):
- Verifier item 2 (residual Dutch accessibility strings — wordmark "naar startpagina", Samenwerken "Samenwerkingsopties", press-strip "logo volgt" chips, disabled-CTA "Binnenkort beschikbaar" tooltip) was **fixed in code** (commit `2d83ca1`): all four are now locale-resolved via new `nl.ts`/`en.ts` keys and confirmed absent from `dist/en/` (grep = 0). No longer requires a product decision.
- Verifier code-review blockers CR-01..CR-04 + warnings WR-01..WR-06 were fixed (commits `a81378e`…`a7ddecd`) before this UAT.
