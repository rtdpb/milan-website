---
phase: 5
slug: book-pre-order-future-growth
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-08-19
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> Derived from 05-RESEARCH.md §Validation Architecture.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None installed — Astro build (`astro check` + `satisfies` shape check) + the existing `scripts/smoke-i18n.js` post-build check. |
| **Config file** | `scripts/smoke-i18n.js` (extend for the new `/boek` + `/en/book` pages) |
| **Quick run command** | `npm run build` (build-time TypeScript shape check via `utils.ts satisfies`; fails on missing page/broken import) |
| **Full suite command** | `npm run build && node scripts/smoke-i18n.js` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** `npm run build` (catches TS shape errors, missing locale keys, Astro build failures)
- **After every plan wave:** `npm run build && node scripts/smoke-i18n.js`
- **Before `/gsd-verify-work`:** full build green + manual browser check of `/boek` and `/en/book`
- **Max feedback latency:** ~30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 5-01-01 | 01 | 0 | BOOK-01 | — | N/A | type/build | `npm run build` | ❌ W0 (boek.astro, en/book.astro, forms) | ⬜ pending |
| 5-xx-xx | — | 1+ | BOOK-01 | — | `/boek` + `/en/book` render; nav/footer "Boek" enabled both locales; `nlToEn['boek']==='book'` | smoke | `npm run build && node scripts/smoke-i18n.js` | ❌ W0 | ⬜ pending |
| 5-xx-xx | — | 1+ | GROW-01 | — | Plausible script absent in dev, present in prod build when domain supplied; custom-event calls compile | build/smoke | `npm run build` | ❌ W0 (PlausibleScript.astro) | ⬜ pending |
| 5-xx-xx | — | 1+ | GROW-01 | — | Sticky CTA renders, respects reduced-motion, fires a Plausible goal on click | build/manual | `npm run build` + browser | ❌ W0 (StickyCTA.astro) | ⬜ pending |
| 5-xx-xx | — | 1+ | GROW-02 | — | CMS evaluation artifact exists with a reasoned defer recommendation | manual | file presence check | ❌ W0 (05-CMS-EVALUATION.md) | ⬜ pending |

*Exact task IDs finalized by the planner; keep Wave 0 (pages, analytics component, forms, CMS-eval doc) ahead of dependent tasks so the sampling commands exist. Analytics prod-injection + sticky-CTA click + book-interest submit are inherently browser/manual (recorded in Manual-Only below).*

---

## Wave 0 Requirements

- [ ] `src/pages/boek.astro` — NL book page (BOOK-01)
- [ ] `src/pages/en/book.astro` — EN book page (BOOK-01)
- [ ] `src/components/analytics/PlausibleScript.astro` — analytics component, prod+domain gated (GROW-01)
- [ ] `src/components/ui/StickyCTA.astro` — conversion optimization (GROW-01)
- [ ] `src/components/forms/BookInterestForm.astro` — Web3Forms notify form (BOOK-01, D-02)
- [ ] `.planning/phases/05-book-pre-order-future-growth/05-CMS-EVALUATION.md` — written CMS evaluation (GROW-02)
- [ ] `boek`/`book` keys mirrored in `src/i18n/nl.ts` and `en.ts`; `'boek':'book'` added to the slug map

*Existing `npm run build` covers TypeScript shape validation via the `satisfies` constraint — no test-framework install needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Book interest capture works end-to-end (Substack subscribe + Web3Forms notify submit) | BOOK-01 | Requires a browser + live endpoints | `npm run dev`, open `/boek`, exercise both the subscribe action and the notify form |
| Sticky CTA appears on scroll, is subtle/premium, respects reduced-motion, and fires the Plausible goal | GROW-01 | Runtime scroll + IntersectionObserver + analytics event | Browser scroll test on homepage/book page; confirm goal in Plausible (once domain live) |
| Plausible only loads in production with a real domain (inert on placeholder) | GROW-01 (D-06) | Depends on prod build + real domain not yet confirmed | Confirm no script in dev; confirm script + `data-domain` after `TODO_PLAUSIBLE_DOMAIN` supplied |
| EN book copy quality/tone (Milan-review draft) | BOOK-01 | Subjective copy judgment | Milan reviews `/en/book` |

---

## Validation Sign-Off

- [ ] All tasks have an automated verify (`npm run build` / smoke) or a Wave 0 dependency
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references (pages, analytics, forms, CMS-eval doc)
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set by validate-phase

**Approval:** pending
