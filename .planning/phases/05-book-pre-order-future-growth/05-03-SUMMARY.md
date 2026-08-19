---
phase: "05"
plan: "03"
subsystem: planning-artifacts
tags: [cms, evaluation, defer, grow-02, documentation]
dependency_graph:
  requires:
    - "05-RESEARCH.md §CMS Evaluation (lines 519-546)"
    - "05-CONTEXT.md D-08"
  provides:
    - "05-CMS-EVALUATION.md (GROW-02 documented decision artifact)"
  affects: []
tech_stack:
  added: []
  patterns:
    - "Decision artifact pattern: self-contained markdown evaluation doc with options table + reasoned DEFER"
key_files:
  created:
    - ".planning/phases/05-book-pre-order-future-growth/05-CMS-EVALUATION.md"
  modified: []
decisions:
  - "D-08 confirmed as DEFER: all four git-based CMS options (Decap, Sveltia, TinaCMS, Pages CMS) are incompatible with the current nl.ts/en.ts TypeScript const shape without a content-collections migration prerequisite"
  - "Astro content-collections migration named as the clean two-step future path before any CMS can be wired"
  - "GROW-02 satisfied via reasoned DEFER: adoption would violate the without-destabilizing clause; keeping copy in code is the honest choice at current volume (~6 pages)"
metrics:
  duration: "~5 min"
  completed: "2026-08-19"
  tasks_completed: 1
  tasks_total: 1
  commits: 1
status: complete
actuals:
  tokens: 5000
  tasks: 1
  commits: 1
---

# Phase 05 Plan 03: CMS Evaluation (GROW-02) Summary

## One-liner

Written CMS evaluation concluding reasoned DEFER: git-based CMSes target markdown/files, not TypeScript `as const` objects, making adoption impossible without a content-collections migration that would destabilize existing pages (D-08, GROW-02).

## What Was Built

This was a documentation-only plan. A single file was created:

**`.planning/phases/05-book-pre-order-future-growth/05-CMS-EVALUATION.md`** — a self-contained decision artifact containing:

1. **Context paragraph** — explains that all copy lives as typed `as const` objects in `src/i18n/nl.ts` / `en.ts`, validated at build by `utils.ts` shape check.

2. **Options comparison table** — 6 rows covering Decap CMS, Sveltia CMS, TinaCMS, Pages CMS, Astro Content Collections migration + CMS, and the status quo (keep in code). Each row evaluated for Astro support, i18n support, and compatibility with the current `nl.ts`/`en.ts` shape. All four git-based CMS tools verdict: "Not viable without migration."

3. **DEFER recommendation with four-point rationale:**
   - Content is typed TypeScript, not files — no CMS can edit TS const objects
   - Adopting now = migrating first (touching every page component, utils.ts, slug maps, BaseHead hreflang)
   - Current volume (~6 pages, low edit frequency) does not justify CMS friction
   - TypeScript shape guard provides a correctness guarantee that a file-based CMS config would need to replicate via Zod schemas

4. **Tie-in to GROW-02's "without destabilizing" clause** — explicit section enumerating the files a migration would touch and the cross-page regression risk.

5. **Prerequisite / future path** — two-step sequence: (1) migrate `nl.ts`/`en.ts` to content collections with Zod schemas, (2) wire any git-based CMS via standard config. Clean future Phase 6 or Phase 7 scope.

6. **References** — D-08, 05-RESEARCH.md §CMS Evaluation, 05-CONTEXT.md, ROADMAP.md Phase 5, REQUIREMENTS.md GROW-02.

No source files were modified. Git status was confined to `.planning/`.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Write the CMS evaluation doc (evaluate → reasoned DEFER) | 069eee1 | `.planning/phases/05-book-pre-order-future-growth/05-CMS-EVALUATION.md` (created) |

## Acceptance Criteria Verification

All criteria passed (automated checks):

| Criterion | Check | Result |
|-----------|-------|--------|
| File exists | `test -f 05-CMS-EVALUATION.md` | PASS |
| DEFER mentioned | `grep -c -i "defer"` | 9 matches |
| Decap in options table | `grep -c "Decap"` | 5 matches |
| Content collections named | `grep -c -i "content collection"` | 10 matches |
| "Destabiliz" tie-in present | `grep -c -i "destabiliz"` | 8 matches |
| D-08 referenced | `grep -c "D-08"` | 4 matches |
| No source files modified | `git status --short` | Only `.planning/` file untracked |

## Deviations from Plan

None. Plan executed exactly as written. The evaluation reasoning was pre-derived in 05-RESEARCH.md §CMS Evaluation (lines 519–546) and codebase-verified; this task assembled it into the self-contained artifact format.

## Known Stubs

None. This is a documentation deliverable; there are no stubs.

## Threat Flags

None. Documentation-only plan — no new network endpoints, auth paths, file access patterns, or schema changes at trust boundaries.

## Self-Check: PASSED

- [x] `.planning/phases/05-book-pre-order-future-growth/05-CMS-EVALUATION.md` exists (verified with `test -f`)
- [x] Commit `069eee1` exists (`git log --oneline -1` confirms)
- [x] All acceptance criteria grep counts >= 1 (all pass with margin)
- [x] No source files modified (git status shows only `.planning/` files)
