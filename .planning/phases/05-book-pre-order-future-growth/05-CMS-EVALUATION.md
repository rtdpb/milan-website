# CMS / Editable-Content Evaluation — Phase 5 Decision Artifact

**Phase:** 05 — Book / Pre-order & Future Growth
**Requirement:** GROW-02
**Decision reference:** D-08
**Author:** Claude (executor, 2026-08-19)
**Status:** DEFER — not adopted this phase

---

## Context

All site copy currently lives as typed `as const` objects in `src/i18n/nl.ts` and `src/i18n/en.ts`. These files are validated at build time by a shape-check utility in `src/i18n/utils.ts` (the `DeepWiden<T>` type guard), which ensures the English keys mirror the Dutch structure. This pattern was introduced in Phase 1 and extended across Phases 2–4 to cover ~6 pages of bilingual content. Edits are made directly in source, committed to git, and CI builds the static site.

GROW-02 required evaluating whether to adopt an editable-content (CMS) approach that would allow Milan to update copy without editing TypeScript source files — and either adopt such an approach without destabilizing existing pages, or document a reasoned defer.

---

## Options Comparison

| Option | How It Works | Astro Support | i18n Support | Compatible with Current `nl.ts`/`en.ts` Shape? | Verdict |
|--------|-------------|---------------|--------------|------------------------------------------------|---------|
| **Decap CMS** (formerly Netlify CMS) | Git-based; edits markdown/YAML/JSON files via admin UI; commits to repo | Official Astro guide exists | Limited — single_file structure only for file collections | No — targets markdown/collection files, not TypeScript const objects | Not viable without migration |
| **Sveltia CMS** | Drop-in Decap replacement; faster UI; improved i18n handling | Works with Astro; no official guide | Better than Decap (resolved multiple_files structure issues) | No — same file-based content model as Decap | Not viable without migration |
| **TinaCMS** | Git-based with visual editing; cloud or self-hosted; content in Markdown/MDX/JSON | Official Astro guide exists; integrates with content collections | No native i18n support | No — designed for content collections schema, not TS const objects | Not viable without migration (and weaker i18n story) |
| **Pages CMS** | Lightweight git-based CMS; YAML/JSON/Markdown files | Works with Astro | Basic i18n | No — file-based only | Not viable without migration |
| **Astro Content Collections migration + CMS** | Migrate copy from `nl.ts`/`en.ts` into `.md`/`.mdx`/`.json` content collections; then wire any git-based CMS | First-class Astro support | Native with Astro i18n | Yes — but requires restructuring first | Viable future path (see §Prerequisite) |
| **Keep in code** (status quo) | Edit `nl.ts`/`en.ts` directly; TypeScript validates shape at build time | N/A | Built-in (Phase 4 pattern) | Yes — current approach | Recommended for now |

---

## Recommendation: DEFER (D-08)

**All four git-based CMS options are incompatible with the current content structure without first migrating copy out of TypeScript into file-based content collections.** Adopting a CMS this phase would require that migration as a prerequisite — a larger refactor than Phase 5's scope, and one that risks destabilizing the 12 existing pages just shipped across Phases 1–4. This directly violates GROW-02's "without destabilizing existing pages" clause.

### Four-Point Rationale

**1. Content is typed TypeScript, not files.**
All copy lives in `src/i18n/nl.ts` and `src/i18n/en.ts` as `as const` objects (verified: `nl.ts` lines 1–356+). Every git-based CMS evaluated (Decap, Sveltia, TinaCMS, Pages CMS) targets file-based content — Markdown, MDX, YAML, or JSON stored in content collections or flat files. None of these tools can edit TypeScript source files through their admin UI; there is no standard adapter or plugin that bridges a TypeScript const object to a CMS editing interface.

**2. Adopting a CMS now requires migrating first.**
The prerequisite for any viable CMS integration is restructuring the bilingual copy from `nl.ts`/`en.ts` into Astro content collections (type-safe Markdown or JSON files with Zod schemas). That migration is a separate, non-trivial refactor. Attempting it in Phase 5 would touch every page component that calls `getStrings()`, every `i18n` key reference, and the `utils.ts` shape-check infrastructure — introducing real risk of breakage across the site's bilingual layer. Adopting a CMS now, therefore, would destabilize existing pages, violating GROW-02's explicit "without destabilizing" clause.

**3. Current volume does not justify CMS friction.**
The site has approximately 6 unique pages plus the homepage. Content editing frequency is low — site copy is stable and author-reviewed before publication. The TypeScript build already catches structural errors (shape-check in `utils.ts`) that a CMS configuration layer would not provide. The overhead of a CMS admin UI, authentication, OAuth setup, and git-workflow integration is disproportionate to the editing need at this volume.

**4. The TypeScript pattern provides a meaningful correctness guarantee.**
The `DeepWiden<T>` shape guard in `utils.ts` ensures that every Dutch key has a corresponding English key at build time. This build-time validation is a direct benefit of keeping content in typed code. A CMS migration to file-based content would need to replicate this guarantee using Zod schemas and a content collection type contract — achievable, but a non-trivial porting effort.

---

## Tie-In to GROW-02's "Without Destabilizing" Clause

GROW-02 explicitly required that a CMS, if adopted, must be integrated "without destabilizing existing pages." As the options comparison shows, every CMS option except the status quo requires migrating the content structure first. That migration would touch:

- `src/i18n/nl.ts` and `src/i18n/en.ts` (rewrite as content collection files)
- `src/i18n/utils.ts` (replace `DeepWiden<T>` with Zod schema validation)
- Every page component and section component that calls `getStrings()` (refactor data-fetching pattern)
- The `nlToEn`/`enToNl` slug maps (move or adapt)
- Bilingual hreflang logic in `BaseHead.astro` (may need to adapt if slug lookup changes)

The risk of cross-page regression is real. Deferring CMS adoption is therefore not a conservative cop-out — it is the only path that satisfies both the "adopt without destabilizing" constraint and the "honest evaluation" deliverable simultaneously.

---

## Prerequisite / Future Path

The clean path to a CMS is a two-step sequence:

**Step 1 — Migrate copy to Astro content collections.**
Move `nl.ts`/`en.ts` string objects into type-safe `.md` / `.json` content collection files with Zod schemas mirroring the current shape. Update `getStrings()` and all consuming components. Validate with an equivalent build-time shape check. This is a self-contained refactor that can be planned as a standalone phase (Phase 6 or Phase 7) with no user-facing change.

**Step 2 — Wire a git-based CMS.**
Once content lives in files that a CMS can read and commit, any of Decap CMS, Sveltia CMS, TinaCMS, or Pages CMS can be wired in via a standard `public/admin/config.yml` (or equivalent) file pointing at the collection paths. OAuth/identity setup (Netlify Identity, Cloudflare Access, or similar) would be the remaining configuration step. At that point the CMS admin UI is a config file away — no further code migration needed.

This sequence is well-supported by Astro's first-class content collections API and the official CMS integration guides for Decap and TinaCMS. The decision to defer now preserves the option cleanly.

---

## References

- **D-08** — Phase 5 Context decision: "CMS (GROW-02) = evaluate → recommend DEFER adoption this phase."
- **05-RESEARCH.md §CMS Evaluation** (lines 519–546) — options table and four-point rationale (source material for this document).
- **05-RESEARCH.md §Don't Hand-Roll** — "CMS for TypeScript i18n objects → Defer, migrate to collections first" row and key insight.
- **05-CONTEXT.md §Deferred Ideas** — "CMS adoption (git-based CMS on an Astro content-collections migration) — deferred per D-08; the evaluation names content-collections migration as the prerequisite."
- **ROADMAP.md §Phase 5** — success criterion 3: "CMS approach evaluated and, if adopted, integrated without destabilizing existing pages."
- **REQUIREMENTS.md GROW-02** — "Evaluate an editable-content (CMS) approach and either adopt it without destabilizing existing pages, or document a reasoned defer."
