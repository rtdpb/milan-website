---
phase: "01"
plan: "02"
subsystem: global-chrome-ui-kit
tags: [astro, design-system, nav, footer, i18n, honest-cta, aria-disabled, mobile-nav]
dependency_graph:
  requires:
    - astro-7-scaffold
    - design-tokens-css
    - baselayout-shell
  provides:
    - site-header-nav
    - site-footer
    - button-component
    - card-component
    - section-wrapper-component
    - placeholder-badge-component
    - nl-i18n-strings
    - config-placeholder-destinations
    - honest-disabled-cta-system
  affects:
    - plans 03-05 (consume Button/Card/SectionWrapper/PlaceholderBadge)
    - plan 03 (consumes nl.ts strings + config.ts for sections)
    - all future pages (inherit Nav + Footer via BaseLayout)
tech_stack:
  added: []
  patterns:
    - Single-source config module (src/config.ts) for TODO_ placeholder destinations
    - Typed i18n const object (src/i18n/nl.ts) — Phase 4 adds en.ts alongside
    - Honest disabled CTA system (aria-disabled + no href hash, centralised in Button.astro)
    - Vanilla JS island for mobile nav toggle + scroll-aware header (no framework)
    - Non-null assertion pattern for TS strict null checks inside Astro script islands
key_files:
  created:
    - src/config.ts
    - src/i18n/nl.ts
    - src/components/ui/Button.astro
    - src/components/ui/Card.astro
    - src/components/ui/SectionWrapper.astro
    - src/components/ui/PlaceholderBadge.astro
    - src/components/layout/Nav.astro
    - src/components/layout/Footer.astro
  modified:
    - src/layouts/BaseLayout.astro
decisions:
  - "Used non-null assertions (!) after early-return null guard in Nav.astro script island — Astro's astro check TypeScript strict mode cannot narrow null inside closures even after a guard; this is the idiomatic fix"
  - "nav-cta (Contact button in header) is styled inline rather than importing Button.astro component — avoids component scope leakage in the nav island context"
  - "Mobile nav panel uses hidden attribute + CSS visibility (belt+suspenders) for reliable show/hide without z-index artifacts"
metrics:
  duration_minutes: 12
  completed_date: "2026-08-18"
  tasks_completed: 3
  tasks_total: 3
  commits: 3
  files_created: 8
  files_modified: 1
status: complete
actuals:
  tokens: 88000
  tasks: 3
  commits: 3
---

# Phase 01 Plan 02: Global Chrome + Reusable UI Kit Summary

## One-Line Summary

Site header (sticky, scroll-aware, 5 disabled nav items + Contact CTA + NL|EN + LinkedIn) + site footer (light, 3-column, disabled nav + copyright) wired into BaseLayout via Nav.astro and Footer.astro, plus a reusable UI kit (Button/Card/SectionWrapper/PlaceholderBadge) and single-source content/config modules — all CTAs honestly disabled where destinations are unknown.

## What Was Built

### Task 1: Single-source config + nl.ts + Reusable UI kit

**src/config.ts** — Centralised placeholder destinations:
- `TODO_SUBSTACK_URL`, `TODO_CONTACT_URL`, `TODO_LINKEDIN_URL`, `TODO_PRIVACY_URL`, `TODO_TERMS_URL` — grep-replaceable sentinel constants (no fake navigable URLs)
- `SITE_NAME`, `SITE_URL`, `DISABLED_TOOLTIP`, `COPYRIGHT_YEAR`
- Each constant carries a comment naming the phase that wires the real value

**src/i18n/nl.ts** — Typed `nl` const with groups: `nav`, `hero`, `pressStrip`, `samenwerken` (commitment ladder eyebrows + 3 cards with CTAs), `testimonials` (3 verbatim quotes + attributions), `story`, `newsletter`, `articles` (3 placeholder cards), `footer`, `common` (placeholderLabel, disabledTooltip, nlEnSwitch). Phase 4 shape contract: `en.ts` adds alongside with the same keys.

**src/components/ui/Button.astro** — CTA variants (primary/secondary/ghost/ghost-on-dark) with honest disabled state: when `disabled=true`, renders `<span role="button" aria-disabled="true" tabindex="-1">` — never `href="#"`. Primary = yellow (#FFDD11) fill, hover = accent-dark + scale(1.02). All variants 48px height, 44px min touch target. Token-styled scoped CSS.

**src/components/ui/Card.astro** — Rounded card shell: `default` (--color-surface bg, border, --radius-lg, --space-lg padding) and `dark` (--color-dark-surface, no border) variants. Slot-based.

**src/components/ui/SectionWrapper.astro** — `<section>` landmark with `aria-labelledby`, max-width 1280px inner container, `--section-padding-y` token. Variants: `default` (--color-bg), `dark` (full-bleed dark band), `surface` (--color-surface tint).

**src/components/ui/PlaceholderBadge.astro** — Small italic pill rendering `[Placeholder]` from `nl.common.placeholderLabel`. Secondary text colour, 1px border, non-interactive.

### Task 2: Site header (Nav) with mobile toggle island

**src/components/layout/Nav.astro** — `<header>` implementing UI-SPEC `<SiteHeader>` (HOME-01):
- Wordmark left: "Milan van der Meulen" in `var(--font-display)` 18px/600
- 5 nav items (Coaching, Spreker, Nieuwsbrief, Mijn verhaal, Boek): all `aria-disabled="true"`, `tabindex="-1"`, `title="Binnenkort beschikbaar"`, `cursor: not-allowed; opacity: 0.5`
- Contact CTA: primary button disabled (references TODO_CONTACT_URL, Phase 2)
- NL|EN switch: disabled affordance, opacity 0.4 (D-16 — non-functional)
- LinkedIn icon: inline SVG, `aria-disabled="true"`, references TODO_LINKEDIN_URL — colour: `--color-text-secondary` (NOT yellow per D-02)
- Scroll-aware: transparent at top, `--color-bg` + shadow after 60px via `requestAnimationFrame` island
- Mobile hamburger: 44×44 touch target, `aria-expanded`/`aria-controls="mobile-nav-panel"`
- Mobile panel: right-slide (`translateX(100% → 0)`, 240ms ease-out), focus trap, Escape closes, `prefers-reduced-motion` respected (instant show/hide), all disabled states preserved

### Task 3: Site footer + BaseLayout wiring

**src/components/layout/Footer.astro** — `<footer>` implementing UI-SPEC `<SiteFooter>` (HOME-09):
- Three-column desktop grid (2fr 1fr 1fr), stacked mobile
- Column 1: wordmark + "Founder, coach en spreker." tagline
- Column 2: nav links (same 5 items, same aria-disabled treatment)
- Column 3: LinkedIn icon (disabled), Privacy + Algemene voorwaarden (disabled placeholders), copyright "© 2026 Milan van der Meulen"
- Background: `--color-bg` + `--color-border` top divider (LIGHT — dark band reserved for story section per D-01)
- Typography: `--text-xs` (13px) for all footer text per UI-SPEC

**src/layouts/BaseLayout.astro** (modified) — Now imports and renders `Nav` immediately after skip-link (before `<main>`), and `Footer` after `<slot />`/main. Skip-link precedes Nav in source order (keyboard bypass works).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Non-null assertions added to Nav.astro script island**
- **Found during:** Task 2 build (`astro check`)
- **Issue:** TypeScript strict null checks in Astro's `<script>` block could not narrow the type of `header`, `toggle`, `panel`, `closeBtn`, `backdrop` inside closures, even though an early `if (!...) return` guard was present. 23 TypeScript errors.
- **Fix:** Captured post-guard refs with non-null assertions: `const h = header!`, `const t = toggle!`, etc. All usages in closures use these narrowed refs. The early return guard still protects runtime — the `!` only satisfies the type checker.
- **Files modified:** `src/components/layout/Nav.astro`
- **Commit:** `feb2811`

## Verification Results

| Check | Result |
|-------|--------|
| `npm run build` exits 0 | PASS |
| `aria-label="Hoofdnavigatie"` in dist/index.html | PASS (count: 2 — desktop + mobile nav) |
| `aria-expanded` in dist/index.html | PASS (count: 2 — hamburger toggle button) |
| `aria-disabled="true"` count >= 6 | PASS (count: 23 — 5 nav items × 2 panels + Contact CTA × 2 + NL|EN + LinkedIn × 2 + footer nav × 5 + legal × 2) |
| `href="#"` in dist/index.html | PASS (count: 0 — CLEAN) |
| 5 nav labels (Coaching/Spreker/Nieuwsbrief/Mijn verhaal/Boek) in dist | PASS |
| `<header` in dist/index.html | PASS |
| `<footer` in dist/index.html | PASS |
| `© 2026` / copyright in dist | PASS |
| skip-link precedes header in source order | PASS |
| `TODO_SUBSTACK_URL` in src/config.ts | PASS |
| `TODO_CONTACT_URL` in src/config.ts | PASS |
| `TODO_LINKEDIN_URL` in src/config.ts | PASS |
| `export const nl` in src/i18n/nl.ts | PASS |
| nav + samenwerken + newsletter groups in nl.ts | PASS |
| `aria-disabled` in Button.astro | PASS |
| `href="#"` in Button.astro (source) | PASS (0 — comment only) |
| All 4 UI components exist under src/components/ui/ | PASS |
| Yellow used only for primary CTA / active underline (not nav bg or footer) | PASS |

## Known Stubs

| Stub | File | Note |
|------|------|-------|
| `TODO_SUBSTACK_URL` | `src/config.ts` | Substack URL not yet supplied. Used in Nieuwsbrief CTA + newsletter section. Wire when URL is known — Phase 3. |
| `TODO_CONTACT_URL` | `src/config.ts` | Contact destination not yet known. Used in header Contact CTA, Boek lezing, Plan kennismaking. Wire when contact page is built — Phase 2. |
| `TODO_LINKEDIN_URL` | `src/config.ts` | LinkedIn URL not yet supplied. Used in header + footer LinkedIn icon, JSON-LD sameAs. Wire when URL is known. |
| `TODO_PRIVACY_URL` | `src/config.ts` | Privacy policy page not yet built — Phase 2+. |
| `TODO_TERMS_URL` | `src/config.ts` | Terms page not yet built — Phase 2+. |
| All 5 nav items aria-disabled | `src/components/layout/Nav.astro` | Coaching/Spreker/Nieuwsbrief/Mijn verhaal/Boek pages arrive Phase 2. Each item has a `data-placeholder` naming the phase. |

## Threat Flags

No new security-relevant surface introduced beyond what the plan's threat model covers:
- T-01-04: All external destinations remain disabled placeholders. `rel="noopener noreferrer"` contract is documented in `config.ts` comments for when LinkedIn URL is wired.
- T-01-05: Disabled CTAs use `aria-disabled` + `pointer-events: none` — no click handlers, no fake success states.
- T-01-06: Inline SVG is authored static markup — no injection surface.

## Self-Check

Files created/modified:
- `src/config.ts` — FOUND
- `src/i18n/nl.ts` — FOUND
- `src/components/ui/Button.astro` — FOUND
- `src/components/ui/Card.astro` — FOUND
- `src/components/ui/SectionWrapper.astro` — FOUND
- `src/components/ui/PlaceholderBadge.astro` — FOUND
- `src/components/layout/Nav.astro` — FOUND
- `src/components/layout/Footer.astro` — FOUND
- `src/layouts/BaseLayout.astro` — FOUND (modified)

Commits:
- `f91305b` feat(01-02): single-source config + nl.ts strings + reusable UI kit — FOUND
- `feb2811` feat(01-02): site header Nav with mobile toggle island + honest disabled nav/CTAs — FOUND
- `07d67e1` feat(01-02): site footer + wire Nav/Footer into BaseLayout — FOUND

`npm run build` exits 0: PASS

## Self-Check: PASSED
