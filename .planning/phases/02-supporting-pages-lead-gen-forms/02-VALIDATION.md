---
phase: 2
slug: supporting-pages-lead-gen-forms
# status lifecycle: draft (seeded by plan-phase) → validated (set by validate-phase §6)
# audit-milestone §5.5 distinguishes NOT-VALIDATED (draft) from PARTIAL (validated + nyquist_compliant: false) (#2117)
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-08-18
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | none yet — Wave 0 installs (recommend vitest for unit + astro `check`/`build` as the integration gate) |
| **Config file** | none — Wave 0 installs |
| **Quick run command** | `npm run build` (SSG build must succeed — the primary green signal for a static Astro site) |
| **Full suite command** | `npm run build && npm run preview` (+ any Wave 0 unit tests) |
| **Estimated runtime** | ~30–60 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run preview`
- **Before `/gsd-verify-work`:** Full build green + manual form-submit smoke check
- **Max feedback latency:** ~60 seconds

---

## Per-Task Verification Map

> Seed only — the planner fills this from the RESEARCH.md Validation Architecture section and the PLAN.md task breakdown.

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 2-01-01 | 01 | 1 | PAGE-04 | T-2-01 / — | ContactForm posts to Web3Forms; no fake success when key is placeholder | build/unit | `npm run build` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

> Planner refines. Candidate testable behavior: query-param → Onberp pre-select logic, and the Web3Forms submit handler's success/error branching (pure functions extractable for unit test).

- [ ] Test framework install (vitest) — if unit coverage of the form/query-param logic is adopted
- [ ] `npm run build` green as the baseline integration gate for all new pages

*If none: "Existing infrastructure covers all phase requirements."*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Contact form actually delivers an email | PAGE-04 | Requires a real Web3Forms access key + inbox (key is a documented placeholder until supplied) | Drop real key into config.ts, submit the form, confirm inbox receipt |
| Responsive/visual quality of new pages | PAGE-01–04 | Visual judgment | Inspect /coaching, /spreker, /mijn-verhaal, /contact at desktop/tablet/mobile |

*If none: "All phase behaviors have automated verification."*

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
