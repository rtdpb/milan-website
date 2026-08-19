---
phase: 04-internationalization-english-content
fixed_at: 2026-08-19T13:04:00Z
review_path: .planning/phases/04-internationalization-english-content/04-REVIEW.md
iteration: 1
findings_in_scope: 10
fixed: 10
skipped: 0
status: all_fixed
---

# Phase 4: Code Review Fix Report

**Fixed at:** 2026-08-19T13:04:00Z
**Source review:** `.planning/phases/04-internationalization-english-content/04-REVIEW.md`
**Iteration:** 1

**Summary:**
- Findings in scope: 10 (CR-01..CR-04, WR-01..WR-06)
- Fixed: 10
- Skipped: 0

**Verification environment:** Fixes applied in isolated git worktree `.claude/worktrees/rf-04-368-1787137097` (branch `gsd-reviewfix/04-368`), fast-forwarded to `master` on completion. Build and smoke test ran inside the worktree (no `node_modules` — Astro build uses the shared `node_modules` via the repo root symlink). Both `npm run build` and `node scripts/smoke-i18n.js` passed after all fixes were committed.

---

## Fixed Issues

### CR-01: ContactForm hardcodes Dutch email subject on all pages including EN contact

**Files modified:** `src/i18n/nl.ts`, `src/i18n/en.ts`, `src/components/forms/ContactForm.astro`
**Commit:** a81378e
**Applied fix:** Added `emailSubject` key to both locale files (`'Nieuw bericht via milanvandermeulen.nl'` in nl.ts, `'New message via milanvandermeulen.nl'` in en.ts). Updated ContactForm.astro to destructure `emailSubject` from `t.contact` and use it as the hidden input's `value` prop, replacing the hardcoded Dutch string.

---

### CR-02: EN homepage uses `t.hero.subtext` as meta description — wrong semantic field

**Files modified:** `src/pages/en/index.astro`
**Commit:** eefbc11
**Applied fix:** Replaced `description={t.hero.subtext}` with a proper purpose-written EN meta description string directly in the `BaseLayout` call: `"Milan van der Meulen is an experienced entrepreneur, founder coach and speaker. He scaled Soly to 9 countries and 180 employees. Now he helps other founders scale without losing themselves."` The now-unused `getStrings` import and `t` variable were also removed per the IN-03 note in the review.

---

### CR-03: BaseLayout Dutch-only default title/description — silently mis-labels future EN pages

**Files modified:** `src/layouts/BaseLayout.astro`
**Commit:** e19d235
**Applied fix:** Derived locale-correct `defaultTitle` and `defaultDescription` variables from `lang` before destructuring `Astro.props`. When `lang === 'en'`, defaults are English. When `lang === 'nl'` (or any other value), defaults are Dutch. The NL homepage behavior is unchanged. Any future EN page that omits explicit title/description props will now get English SEO metadata instead of Dutch.

---

### CR-04: Nav.astro JS island hardcodes Dutch aria-labels for hamburger, overwriting EN locale strings

**Files modified:** `src/components/layout/Nav.astro`
**Commit:** a810a98
**Applied fix:** Added `data-label-open={t.nav.openMenu}` and `data-label-close={t.nav.closeMenu}` to the hamburger `<button>` element in the Astro template. In the JS island, read these values from `(t as HTMLButtonElement).dataset.labelOpen` / `.labelClose` (with Dutch fallbacks for NL backward compatibility). Replaced the hardcoded `'Menu sluiten'` in `openNav()` with `labelClose` and `'Menu openen'` in `closeNav()` with `labelOpen`.

---

### WR-01: `enToNl` slug-map produced by inversion has no collision guard

**Files modified:** `src/i18n/utils.ts`
**Commit:** 4f1dba9
**Applied fix:** Added a runtime assertion before building `enToNl`: checks that all EN slug values in `nlToEn` are unique. If any two NL slugs map to the same EN slug, throws a descriptive error at module evaluation time (build + SSR). Current routes have no duplicates so the assertion passes. Dutch pages and EN pages unaffected.

---

### WR-02: Story.astro teaser-link guard uses substring `.includes()` — fragile against future slug additions

**Files modified:** `src/components/sections/Story.astro`
**Commit:** 613df7d
**Applied fix:** Replaced `currentPath.includes('mijn-verhaal') || currentPath.includes('/about')` with exact-match logic using a trailing-slash normalizer: `norm(currentPath) === norm(`${base}mijn-verhaal`) || norm(currentPath) === norm(`${base}en/about`)`. This mirrors the `isActive()` pattern already used in Nav.astro. Existing behavior on current pages is unchanged.

---

### WR-03: PressStrip.astro `aria-label` on logos container is hardcoded Dutch on EN pages

**Files modified:** `src/components/sections/PressStrip.astro`
**Commit:** 96fc673
**Applied fix:** Added `const isEn = (Astro.currentLocale ?? 'nl') === 'en'` to the frontmatter. Changed the hardcoded `aria-label="Media-uitingen van Milan van der Meulen"` to a locale-resolved expression: `aria-label={isEn ? 'Media coverage of Milan van der Meulen' : 'Media-uitingen van Milan van der Meulen'}`. NL behavior unchanged.

---

### WR-04: ContactForm.astro field name `name="naam"` / `name="bericht"` — Dutch field names sent to Web3Forms

**Files modified:** `src/components/forms/ContactForm.astro`
**Commit:** 747f6d9
**Applied fix:** Changed field `name` attributes from Dutch identifiers to English: `naam` → `name`, `bericht` → `message`, `onderwerp` → `topic`. The select uses `topic` rather than `subject` to avoid conflicting with the existing hidden `name="subject"` input that sets the Web3Forms email subject line. Option *values* (`algemeen`, `lezing`, `coaching`) were preserved unchanged because they drive the `?type=` pre-selection allowlist logic. Web3Forms emails will now show `name:`, `message:`, and `topic:` field labels for both NL and EN submissions — locale-neutral and self-explanatory.

---

### WR-05: Footer.astro `aria-label` on nav landmark is hardcoded Dutch on EN pages

**Files modified:** `src/components/layout/Footer.astro`
**Commit:** cce045d
**Applied fix:** Changed the hardcoded `aria-label="Footer navigatie"` to locale-resolved: `aria-label={isEn ? 'Footer navigation' : 'Footer navigatie'}`. `isEn` was already computed in Footer.astro's frontmatter. NL behavior unchanged.

---

### WR-06: Samenwerken.astro contact CTAs pass `?type=lezing` (Dutch) — semantically inconsistent for EN

**Files modified:** `src/components/sections/Samenwerken.astro`
**Commit:** a7ddecd
**Applied fix:** Added a clarifying comment above the `contactLezingHref` / `contactCoachingHref` constants documenting that `?type=` values (`lezing`, `coaching`, `algemeen`) are intentional implementation constants — not user-visible strings — and explaining why EN CTAs keep Dutch values. The comment notes where to add EN aliases if needed in future. Functional behavior is unchanged (as the review explicitly marked this lowest-priority with "a code comment is acceptable").

---

## Skipped Issues

None — all 10 in-scope findings were fixed.

---

_Fixed: 2026-08-19T13:04:00Z_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
