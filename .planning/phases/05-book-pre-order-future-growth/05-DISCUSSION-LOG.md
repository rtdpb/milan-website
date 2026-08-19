# Phase 5: Book / Pre-order & Future Growth - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-19
**Phase:** 5-Book / Pre-order & Future Growth
**Areas discussed:** Pre-order mechanism, Analytics & privacy (Conversion win + CMS approach delegated to Claude)

---

## Area selection

| Area | Selected |
|------|----------|
| Pre-order mechanism | ✓ |
| Analytics & privacy | ✓ |
| Conversion win | (delegated) |
| CMS approach | (delegated) |

---

## Pre-order mechanism

### Book status
| Option | Selected |
|--------|----------|
| Coming / no details yet | ✓ |
| Real, details known | |
| Real but pre-order only | |

**Choice:** Coming / no details yet → honest teaser, no fake purchase.

### Interest-capture target
| Option | Selected |
|--------|----------|
| Substack newsletter | |
| Web3Forms (book inbox) | |
| Both | ✓ |

**Choice:** Both — Substack subscribe primary + Web3Forms notify form.

### Future checkout seam
| Option | Selected |
|--------|----------|
| Leave a documented seam (TODO_BOOK_CHECKOUT_URL) | ✓ |
| Waitlist only, no seam | |

**Choice:** Leave a documented config seam for a future external checkout link.

---

## Analytics & privacy

### Analytics approach
| Option | Selected |
|--------|----------|
| Privacy-first (Plausible/Fathom) | ✓ |
| Google Analytics 4 | |
| None / defer | |

**Choice:** Privacy-first, cookieless → no consent banner.

### Event tracking
| Option | Selected |
|--------|----------|
| Track key conversions | ✓ |
| Pageviews only | |

**Choice:** Track key conversions (contact submit, newsletter signup, book interest) + pageviews.

### Tool + seam
| Option | Selected |
|--------|----------|
| Plausible, behind a config seam | ✓ |
| Fathom, behind a config seam | |
| You decide the tool | |

**Choice:** Plausible, wired behind a config seam (inert until account/domain supplied).

---

## Claude's Discretion

- **Conversion optimization (D-07):** persistent/sticky primary CTA on long pages, tracked as a Plausible goal (lead-magnet play deferred — needs book content).
- **CMS (D-08):** evaluate → recommend defer adoption; content stays in code; content-collections migration named as the prerequisite for a future CMS.

## Deferred Ideas

- Lead-magnet (free chapter) conversion play — needs book content.
- Real external pre-order/checkout (Gumroad/Bol/publisher/Stripe) — deferred; D-03 seam makes it a drop-in.
- CMS adoption on a content-collections migration — deferred per D-08.
- A/B testing tooling — too heavy for a static site this phase.
- Confirm production domain + remove GitHub Pages base — separate infra task.
