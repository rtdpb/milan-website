# Phase 4: Internationalization & English Content - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-19
**Phase:** 4-Internationalization & English Content
**Areas discussed:** Translation & honesty (URL structure, English slugs, switch behavior delegated to Claude)

---

## Area selection

| Area | Description | Selected |
|------|-------------|----------|
| URL structure | Keep NL at root + EN at /en/*, or move NL to /nl/* | (delegated) |
| English slugs | Translate EN slugs vs reuse Dutch slugs under /en/ | (delegated) |
| Switch behavior | Same-page vs home; auto-detect vs NL default; persistence | (delegated) |
| Translation & honesty | Testimonials, Dutch Substack for EN, copy authorship | ✓ |

**User's choice:** Discuss "Translation & honesty" only; delegate the other three to Claude.

---

## Translation & honesty

### Testimonial quotes on the EN site

| Option | Description | Selected |
|--------|-------------|----------|
| Translate faithfully | Natural English, meaning intact, names/roles unchanged | ✓ |
| Keep original Dutch | Show quotes in Dutch on EN site | |
| Translate + note | English with a "translated from Dutch" marker | |

**User's choice:** Translate faithfully.

### Dutch Substack articles + newsletter signup for EN visitors

| Option | Description | Selected |
|--------|-------------|----------|
| Show + honest label | Keep feed/signup, clearly note content is in Dutch | ✓ |
| Keep, no label | Same feed/signup, no language note | |
| Hide for EN | Omit articles + newsletter on EN until EN content exists | |

**User's choice:** Show + honest "in Dutch" label.

### English copy authorship & standard

| Option | Description | Selected |
|--------|-------------|----------|
| Claude drafts, Milan reviews | Natural EN in founder voice, flagged as draft for review | ✓ |
| Claude drafts as final | Ships as-is, no review gate | |
| Milan supplies EN | Placeholders for Milan to fill in himself | |

**User's choice:** Claude drafts, Milan reviews.

### English variant / hreflang target

| Option | Description | Selected |
|--------|-------------|----------|
| International English (en) | Neutral spelling, hreflang `en` | ✓ |
| British English (en-GB) | UK spelling/idiom, hreflang `en-GB` | |
| American English (en-US) | US spelling/idiom, hreflang `en-US` | |

**User's choice:** International English (`en`).

---

## Claude's Discretion

- **URL structure (D-05):** Keep Dutch URLs at root, EN under `/en/*` (`prefixDefaultLocale: false`) — diverges from the Phase 1 commented `prefixDefaultLocale: true` plan to avoid breaking already-built NL pages. Flagged for planner to confirm against the `base` subpath.
- **English slugs (D-06):** Translate slugs — `/en/coaching`, `/en/speaking`, `/en/about`, `/en/newsletter`, `/en/contact`, `/en/`.
- **Switch behavior (D-07):** Toggle lands on the equivalent page in the other language; default to NL (no forced browser-detect redirect); URL-path-based persistence.

## Deferred Ideas

- Translating the Substack publication / English newsletter content — out of scope (publication stays Dutch).
- Confirming the production domain and removing the GitHub Pages `base` — separate infra task.
- Additional locales beyond NL/EN — not requested.
- Book/pre-order, analytics/CMS → Phase 5.
