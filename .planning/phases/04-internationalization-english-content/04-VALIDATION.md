---
phase: 4
slug: internationalization-english-content
# status lifecycle: draft (seeded by plan-phase) → validated (set by validate-phase §6)
# audit-milestone §5.5 distinguishes NOT-VALIDATED (draft) from PARTIAL (validated + nyquist_compliant: false) (#2117)
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-08-19
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> Derived from 04-RESEARCH.md §Validation Architecture.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None installed — no unit/integration test runner in the project. Validation is Astro's TypeScript check + build-time verification + a Wave 0 smoke script. |
| **Config file** | none — Wave 0 creates `scripts/smoke-i18n.js` |
| **Quick run command** | `npm run build` (astro check + static build; the `satisfies Record<Locale, Strings>` constraint fails the build if `en.ts` drifts from `nl.ts`) |
| **Full suite command** | `npm run build && node scripts/smoke-i18n.js` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build` (catches `en.ts` shape mismatch, missing keys, type errors at compile time)
- **After every plan wave:** Run `npm run build && node scripts/smoke-i18n.js`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** ~30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 4-01-01 | 01 | 0 | I18N-01/02 | — | N/A | type/build | `npm run build` | ❌ W0 (`en.ts`, `utils.ts`) | ⬜ pending |
| 4-01-02 | 01 | 0 | I18N-01/02 | — | N/A | smoke | `node scripts/smoke-i18n.js` | ❌ W0 (smoke script) | ⬜ pending |
| 4-xx-xx | — | 1+ | I18N-01 | — | Switch resolves to correct opposite-locale URL | type/build | `npm run build` | ❌ W0 | ⬜ pending |
| 4-xx-xx | — | 1+ | I18N-02 | — | All 6 EN pages emitted with `lang="en"` | smoke | `node scripts/smoke-i18n.js` | ❌ W0 | ⬜ pending |
| 4-xx-xx | — | 1+ | I18N-02 (SEO) | — | hreflang alternates + sitemap EN entries present | smoke | `node scripts/smoke-i18n.js` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky. Exact task IDs finalized by the planner; the planner MUST keep Wave 0 (`en.ts`, `utils.ts`, `scripts/smoke-i18n.js`) ahead of any component refactor so the sampling commands exist.*

---

## Wave 0 Requirements

- [ ] `src/i18n/en.ts` — English translation object; must exist (and satisfy the shared `Strings` shape) before any component refactor compiles
- [ ] `src/i18n/utils.ts` — `getStrings(locale)` helper + `Locale`/`Strings` types; must exist before component refactor
- [ ] `scripts/smoke-i18n.js` — post-build check of `dist/`: EN page files present, `lang="en"` on `<html>`, hreflang alternates present, sitemap contains EN URLs

*Existing `npm run build` covers TypeScript shape validation via the `satisfies` constraint — no test-framework install needed for type-level checks.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| NL/EN switch visibly changes language and lands on the equivalent page | I18N-01 | Requires a browser; visual/interaction check | `npm run dev`, open `/`, click NL→EN, confirm you land on `/en/` (or the equivalent subpage) in English and can navigate onward staying in EN |
| English copy reads naturally in the founder voice (draft for Milan) | I18N-02 | Subjective language/tone quality (D-03) | Milan reviews the rendered EN pages; flagged as draft, not a blocker to the build |
| Honest "newsletter is in Dutch" note reads correctly on EN | I18N-02 (D-02) | Copy/tone judgment | Visual review of EN newsletter + articles sections |

---

## Validation Sign-Off

- [ ] All tasks have an `<automated>` verify (`npm run build` and/or smoke script) or a Wave 0 dependency
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references (`en.ts`, `utils.ts`, `scripts/smoke-i18n.js`)
- [ ] No watch-mode flags in any verify command
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter (by validate-phase)

**Approval:** pending
