# Phase 2: Supporting Pages & Lead-Gen Forms - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-18
**Phase:** 2-Supporting Pages & Lead-Gen Forms
**Areas discussed:** Form backend/endpoint, Subpage content source, Lead-flow routing

---

## Area selection

| Option | Description | Selected |
|--------|-------------|----------|
| Form backend/endpoint | How the contact form submits on a static GitHub Pages site | ✓ |
| Subpage content source | Where copy for Coaching/Spreker/Mijn verhaal comes from | ✓ |
| Lead-flow routing | How Boek lezing / Plan kennismaking / Contact consolidate | ✓ |
| Subpage depth & structure | Full editorial pages vs lean pages; component reuse | (left to Claude) |

---

## Form backend/endpoint

### Q1 — Delivery mechanism on a static host
| Option | Description | Selected |
|--------|-------------|----------|
| 3rd-party form service | Keep GitHub Pages; POST to Web3Forms/Formspree | ✓ |
| Switch host to Netlify | Move hosting for built-in form handling | |
| mailto: link | No backend; opens visitor's email app | |

**User's choice:** 3rd-party form service (stay on GitHub Pages).

### Q2 — Which service + credentials now?
| Option | Description | Selected |
|--------|-------------|----------|
| Web3Forms + I'll provide key | Form works for real on first deploy | |
| Web3Forms, placeholder for now | Wired to Web3Forms; access key stays a documented TODO in config.ts | ✓ |
| Formspree instead | Use Formspree (account + form ID) | |

**User's choice:** Web3Forms, access key as a `config.ts` placeholder for now.

### Q3 — Post-submit behavior
| Option | Description | Selected |
|--------|-------------|----------|
| Inline success message | JS submit, form replaced in place with Dutch confirmation, no reload | ✓ |
| Redirect to thank-you page | Navigate to /bedankt | |
| You decide | Claude default (inline + no-JS fallback) | |

**User's choice:** Inline success message.
**Notes:** Honeypot spam protection added as Claude default; no-JS fallback required.

---

## Subpage content source

### Q1 — Copy source for Coaching / Spreker / Mijn verhaal
| Option | Description | Selected |
|--------|-------------|----------|
| I draft, you review | Claude drafts Dutch copy from real material only; user reviews | ✓ |
| You supply the copy | User writes it; pages built around placeholders | |
| Lean pages, minimal copy | Short single-purpose pages | |

**User's choice:** I draft, you review — from real material only, no invented facts/numbers/quotes.

### Q2 — "Mijn verhaal" page relative to homepage story
| Option | Description | Selected |
|--------|-------------|----------|
| Expanded long-form version | Full arc; homepage keeps a teaser linking here | ✓ |
| Same copy, standalone page | Reuse homepage story text on its own URL | |
| You decide | Claude default (expanded long-form) | |

**User's choice:** Expanded long-form version.

### Q3 — Reuse existing testimonials on subpages?
| Option | Description | Selected |
|--------|-------------|----------|
| Yes, reuse & place by relevance | Route real quotes to fitting pages (Oranjewoud → Spreker) | ✓ |
| No testimonials on subpages | Keep quotes on homepage only | |
| You decide | Claude default (reuse real quotes) | |

**User's choice:** Yes, reuse & place by relevance. No fabricated testimonials.

---

## Lead-flow routing

### Q1 — How the three lead CTAs route
| Option | Description | Selected |
|--------|-------------|----------|
| One Contact page, pre-filled subject | All CTAs → /contact with Onderwerp pre-selected via query param | (Claude default applied) |
| Calendly for kennismaking | Plan kennismaking → Calendly; others → form | |
| You decide | Claude picks; leaves Calendly seam | ✓ |

**User's choice:** You decide.
**Notes:** Claude applied the single-Contact-page-with-pre-filled-subject approach (`/contact?type=lezing|coaching|algemeen`) and left a `config.ts` seam to swap in Calendly later.

---

## Claude's Discretion

- **Lead-flow routing specifics** — user said "you decide"; applied single `/contact` page + pre-filled Onderwerp query param + Calendly seam (D-08, D-09).
- **Subpage depth & structure** — not selected for discussion; decided full-but-restrained editorial landing pages reusing Phase 1 components, Dutch URL slugs, per-page SEO (D-10, D-11, D-12).
- **Spam protection** — honeypot only (D-03).

## Deferred Ideas

- Real Web3Forms access key + destination email — user to supply; form ships submission-ready with a documented placeholder.
- Calendly / real scheduling link for "Plan kennismaking" — seam left in config.ts.
- Real Substack newsletter signup + live article feed → Phase 3 (Nieuwsbrief CTA stays an honest placeholder).
- NL/EN switch + English translations of new pages → Phase 4.
- Book / pre-order + analytics + optional CMS → Phase 5.
- Visible CAPTCHA if spam becomes a problem — honeypot only for now.
