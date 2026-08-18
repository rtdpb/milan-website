---
phase: 03-newsletter-substack-integration
reviewed: 2026-08-19T10:00:00Z
depth: standard
files_reviewed: 11
files_reviewed_list:
  - src/lib/rss.ts
  - src/config.ts
  - src/components/sections/Articles.astro
  - src/components/sections/Newsletter.astro
  - src/components/sections/Samenwerken.astro
  - src/components/layout/Nav.astro
  - src/components/layout/Footer.astro
  - src/pages/nieuwsbrief.astro
  - src/i18n/nl.ts
  - .github/workflows/deploy.yml
  - package.json
findings:
  critical: 3
  warning: 4
  info: 2
  total: 9
status: issues_found
---

# Phase 3: Code Review Report

**Reviewed:** 2026-08-19T10:00:00Z
**Depth:** standard
**Files Reviewed:** 11
**Status:** issues_found

## Summary

Phase 3 introduces build-time RSS fetch via `fast-xml-parser`, a sentinel-guard pattern across three components, and a new `/nieuwsbrief` landing page. The security-critical decisions (no `set:html` on RSS content, `rel="noopener noreferrer"` on external links, honest disabled affordances) are correctly implemented throughout.

Three correctness bugs were found: a silent `"undefined NaN"` date rendering when `pubDate` is absent, HTML entities rendering literally in article excerpts, and a hard-coded "coming soon" note that displays even after the live Substack URL is wired in. These would be immediately visible to visitors once the real feed is connected.

---

## Critical Issues

### CR-01: `formatPubDate` produces `"undefined NaN"` when `pubDate` is missing or invalid

**File:** `src/lib/rss.ts:73-80`

**Issue:** `item.pubDate ?? ''` passes an empty string to `new Date('')`. `new Date('')` is an invalid Date — `d.getMonth()` returns `NaN`, `d.getFullYear()` returns `NaN`, and `months[NaN]` is `undefined`. The returned string is `"undefined NaN"`, which is rendered directly into the `<span class="articles__date">` element on both the homepage and the `/nieuwsbrief` archive grid. This will appear on-screen as soon as any Substack post omits a `<pubDate>` field (which Substack occasionally does on draft/preview items in the feed).

**Fix:**

```typescript
function formatPubDate(pubDate: string): string {
  if (!pubDate) return '';          // guard: no pubDate in item
  const d = new Date(pubDate);
  if (isNaN(d.getTime())) return ''; // guard: unparseable date string
  const months = [
    'januari', 'februari', 'maart', 'april', 'mei', 'juni',
    'juli', 'augustus', 'september', 'oktober', 'november', 'december',
  ];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}
```

Callers already pass `item.pubDate ?? ''`, so the empty-string guard is the right layer.

---

### CR-02: HTML entities render literally in article excerpts

**File:** `src/lib/rss.ts:128`

**Issue:** The excerpt is derived by stripping HTML tags with `replace(/<[^>]+>/g, ' ')`, then slicing. This correctly removes tags but leaves HTML entities intact — `&amp;`, `&nbsp;`, `&#8217;` (right single quotation mark), `&ldquo;`, etc. These entities are then stored in `ArticleCard.excerpt` and rendered as plain text (correctly, without `set:html`). The result is visible literal entity strings in article cards: e.g. an excerpt might read "Milan&#8217;s nieuwsbrief" instead of "Milan's nieuwsbrief". Substack descriptions routinely contain smart quotes and ampersands encoded as entities.

Additionally, `.slice(0, 160)` operates after tag removal but before any entity normalization, so it can cut mid-entity (e.g. `&amp` without the closing `;`), producing an additional malformed fragment.

**Fix:**

```typescript
// After stripping tags, decode HTML entities before slicing
function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    // Numeric decimal entities (e.g. &#8217; → ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    // Numeric hex entities
    .replace(/&#x([\da-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

// In the map():
excerpt: decodeEntities(
  (item.description ?? '').replace(/<[^>]+>/g, ' ')
).replace(/\s+/g, ' ').trim().slice(0, 160),
```

---

### CR-03: "Coming soon" note always shown — breaks UX when live Substack URL is wired

**File:** `src/components/sections/Newsletter.astro:116-119`

**Issue:** The screen-reader note `<p id="newsletter-submit-note">Aanmelden is binnenkort beschikbaar via Substack.</p>` is rendered unconditionally in both the sentinel and live branches. When `IS_SENTINEL` is false and the real Substack URL is active, the submit button is a functional `<a>` redirect — but the note below it still tells the user (and screen readers via `aria-live="polite"`) that signup is "coming soon". This is actively misleading. The `aria-describedby="newsletter-submit-note"` on the live `<a>` element means screen readers will announce "coming soon" text when focusing the live signup link.

**Fix:**

```astro
<!-- Screen-reader note — conditional on sentinel state -->
{IS_SENTINEL ? (
  <p id="newsletter-submit-note" class="newsletter__submit-note" aria-live="polite">
    Aanmelden is binnenkort beschikbaar via Substack.
  </p>
) : (
  <p id="newsletter-submit-note" class="newsletter__submit-note">
    Je wordt doorgestuurd naar Substack om je in te schrijven.
  </p>
)}
```

---

## Warnings

### WR-01: No fetch timeout — build can hang several minutes on Substack network slowness

**File:** `src/lib/rss.ts:105`

**Issue:** `fetch(feedUrl)` has no `AbortController` / `signal` timeout. If Substack's feed endpoint is slow or returns headers but stalls the body, the `await res.text()` at L110 can block indefinitely. The `catch` block only fires on a thrown error (connection refused, DNS failure) — a stalled response body never throws. In practice this can cause `astro build` to hang for the OS TCP keepalive timeout (several minutes) during the daily cron rebuild, delaying GitHub Pages deploys.

**Fix:**

```typescript
export async function fetchSubstackFeed(
  feedUrl: string,
  maxItems = 3,
  timeoutMs = 8000,       // 8 s is generous for a feed fetch
): Promise<ArticleCard[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(feedUrl, { signal: controller.signal });
    clearTimeout(timer);
    // ... rest unchanged
  } catch (err) {
    clearTimeout(timer);
    console.warn('[Phase 3] Substack RSS fetch threw:', err);
    return [];
  }
}
```

---

### WR-02: `item.link` may be an object when `<atom:link>` siblings exist in the feed

**File:** `src/lib/rss.ts:131`

**Issue:** Substack feeds include an `<atom:link rel="self">` element alongside the standard `<link>` element at the channel level. Inside `<item>`, fast-xml-parser collapses multiple `<link>` child nodes into an array or object when `removeNSPrefix: false` and no special array-force config is set. If Substack ever adds a second link-shaped element inside an item (e.g. an `<enclosure>` or `<atom:link>`), `item.link` would become `[object Object]` as the `href` stored on `ArticleCard`. The "Lees verder" anchor would navigate to `[object Object]`.

**Fix:** Add a type guard before using `item.link`:

```typescript
href: (typeof item.link === 'string' ? item.link : item.link?.['#text'] ?? ''),
```

The `#text` key is how fast-xml-parser exposes text content when an element also has attributes.

---

### WR-03: Sentinel string value leaked into production HTML via `data-placeholder`

**File:** `src/components/sections/Newsletter.astro:97`

**Issue:** `data-placeholder={TODO_SUBSTACK_URL}` renders as `data-placeholder="TODO_SUBSTACK_URL"` in the production DOM on every page load while the sentinel is active. Similarly `data-placeholder={item.reason}` in `Nav.astro:69` and `data-placeholder={...}` attributes in `Footer.astro:95,122,133` expose internal planning notes ("Boek pagina volgt in fase 5", "LinkedIn URL: TODO_LINKEDIN_URL — wire when available", etc.) in the rendered HTML. These are visible to anyone opening DevTools and create unnecessary information leakage about the internal project structure.

**Fix:** Remove `data-placeholder` attributes before production deploy, or gate them behind a development-only check:

```astro
{import.meta.env.DEV && (
  <span data-placeholder={TODO_SUBSTACK_URL} />
)}
```

Alternatively, strip them in a build post-process step. At minimum, omit the internal "fase 5" commentary from the `reason` field values that end up in the DOM.

---

### WR-04: Active nav detection uses `startsWith` — incorrectly highlights parent routes

**File:** `src/components/layout/Nav.astro:58-59` and `src/components/layout/Footer.astro` (same navItems array)

**Issue:** `currentPath.startsWith(item.href)` with `item.href = '/milan-website/nieuwsbrief'` will match correctly for `/milan-website/nieuwsbrief` but would also match any hypothetical deeper path `/milan-website/nieuwsbrief/archief/2026` etc. More practically, if BASE_URL is `/` in a future deploy config, `item.href` for Coaching would be `/coaching` — and `currentPath.startsWith('/coaching')` would also match `/coaching-tips` if such a path existed. The intent is exact-path active detection for these top-level pages.

**Fix:** Use exact match with a trailing-slash normalisation:

```astro
const isActive = (href: string) =>
  currentPath === href || currentPath === href.replace(/\/$/, '') + '/';

// Usage:
class={`nav-link${isActive(item.href) ? ' nav-link--active' : ''}`}
aria-current={isActive(item.href) ? 'page' : undefined}
```

---

## Info

### IN-01: `fast-xml-parser` version range allows silent breaking changes

**File:** `package.json:17`

**Issue:** `"fast-xml-parser": "^5.11.0"` allows automatic upgrades to any `5.x` release during CI. The parsing options used (`ignoreAttributes`, `removeNSPrefix`, `attributeNamePrefix`) have historically changed defaults between minor versions. A semver-minor upgrade could silently change how `content:encoded` or `item.link` is keyed, causing the feed to return empty results or malformed data with no build error.

**Fix:** Pin the exact version in production:

```json
"fast-xml-parser": "5.11.0"
```

Run `npm update fast-xml-parser` deliberately when upgrading.

---

### IN-02: `deploy.yml` — no Node.js version constraint passed to `withastro/action@v3`

**File:** `.github/workflows/deploy.yml:46`

**Issue:** `withastro/action@v3` auto-detects the Node version from `.nvmrc` or `package.json#engines` if present, otherwise uses its bundled default. Neither is present in this project. If the action ships a Node version incompatible with Astro 7.x or if `sharp` (which has native bindings) requires a specific version, builds may fail with cryptic errors after an action update. This is low risk currently but eliminates the ability to reproduce build failures locally without guessing the Node version.

**Fix:** Add a `node-version` input to the action, or add `engines` to `package.json`:

```yaml
- name: Build site
  uses: withastro/action@v3
  with:
    node-version: 20
```

---

_Reviewed: 2026-08-19T10:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
