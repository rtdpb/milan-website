---
phase: 1
slug: foundation-design-system-dutch-homepage
# status lifecycle: draft (seeded by plan-phase) → validated (set by validate-phase §6)
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-08-18
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> A static Astro site with no dynamic logic is validated via build-smoke + source/DOM assertions + Lighthouse + a manual a11y/visual checklist, not unit tests (per RESEARCH.md ## Validation Architecture).

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Build-smoke + `grep`/DOM source assertions + Lighthouse CLI; optional Playwright e2e smoke |
| **Config file** | none — Wave 0 scaffolds `astro.config.mjs` |
| **Quick run command** | `npm run build` (astro build, exit 0) |
| **Full suite command** | `npm run build && npx lighthouse http://localhost:4321 --output=json --quiet` |
| **Estimated runtime** | ~30–90 seconds |

---

## Sampling Rate

- **After every task commit:** `npm run build` (must exit 0) + the task's grep/DOM assertion
- **After every plan wave:** full build + affected source assertions; Lighthouse after the image/SEO wave
- **Before `/gsd-verify-work`:** full build green + Lighthouse perf/a11y ≥ target + manual a11y checklist
- **Max feedback latency:** ~90 seconds

---

## Per-Task Verification Map

Seeded from RESEARCH.md; the executor/validate-phase refines per PLAN task IDs.

| Req | Behavior | Test Type | Automated Command | File Exists |
|-----|----------|-----------|-------------------|-------------|
| FND-01 | Astro builds; pages compile | smoke | `npm run build` (exit 0) | ❌ W0 |
| FND-02 | CSS tokens + font variables at :root | source | `grep -r "\-\-font-display" src/styles/` | ❌ W0 |
| FND-05 | Canonical/OG/JSON-LD/sitemap in built HTML | DOM | `npm run build && grep "og:title" dist/index.html` | ❌ W0 |
| FND-06 | Landmarks, alt text, focus states, contrast | Lighthouse a11y + manual | `npx lighthouse … --only-categories=accessibility` | ❌ W0 |
| FND-07 | LCP < 2.5s; no render-blocking | Lighthouse perf | `npx lighthouse … --only-categories=performance` | ❌ W0 |
| FND-08 | Animations suppressed under reduced-motion | manual DevTools | emulate `prefers-reduced-motion: reduce` | manual |
| FND-09 | `defaultLocale:'nl'`, no `/nl/` prefix | source | `grep "defaultLocale" astro.config.mjs` | ❌ W0 |
| FND-10 | Hero serves AVIF; no original jpg in dist | build output | `ls dist/_astro/ | grep ".avif"` | ❌ W0 |
| HOME-02 | Hero `<picture>` eager + fetchpriority=high | DOM | `grep 'loading="eager"' dist/index.html` | ❌ W0 |
| HOME-10 | No `href="#"`/`href=""` on nav/CTA; disabled use aria-disabled | source audit | `grep -rE 'href="(#?)"' src/` returns none | ❌ W0 |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `astro.config.mjs` — set `site`, `i18n` (defaultLocale nl, prefixDefaultLocale false), `integrations: [sitemap()]`
- [ ] `src/styles/tokens.css` — base token file exists before any components
- [ ] `src/layouts/BaseLayout.astro` — imports tokens/reset globally
- [ ] `.gitignore` — excludes `fotos/`, `assets/originals/`, `dist/` (already excludes fotos/dist/zip)

*If none: "Existing infrastructure covers all phase requirements."*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Reduced-motion suppresses animations | FND-08 | Requires DevTools media emulation | Emulate `prefers-reduced-motion: reduce`, scroll page, confirm no reveal/motion |
| Responsive layout desktop/tablet/mobile | FND-04 | Visual judgment | Inspect at 1440/768/375px; hero stacks text→image; no overflow |
| Editorial "not-templated" look + restrained yellow | FND-02/03 | Subjective brand quality | Visual review against UI-SPEC color/type contract |

---

## Validation Sign-Off

- [ ] All tasks have automated verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 90s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
