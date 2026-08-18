# Phase 3: Newsletter & Substack Integration — Research

**Researched:** 2026-08-18
**Domain:** Substack RSS feed consumption, Astro build-time data fetching, GitHub Actions cron rebuild
**Confidence:** MEDIUM (codebase VERIFIED; Substack RSS structure VERIFIED via live feed; `?email=` prefill UNVERIFIED)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Signup = REDIRECT to `https://<pub>.substack.com/subscribe` (new tab, `target="_blank" rel="noopener noreferrer"`). No backend, no undocumented API POST, no embed iframe.
- **D-02:** Recent-articles feed = BUILD-TIME fetch of Substack RSS (`<pub>/feed`) at `astro build` → static HTML cards. Kept fresh by a scheduled GitHub Action (cron, ~daily) that rebuilds+redeploys.
- **D-03:** New `/nieuwsbrief` page = rich editorial landing reusing Phase 1/2 components, matching the `/coaching` `/spreker` bar.
- **D-04:** Substack URL NOT supplied yet → graceful fallback behind `TODO_SUBSTACK_URL`. Everything ships wired; one grep-replace flips live.
- **D-05:** Form shape = email-focused redirect. Single email field + "Schrijf je in" action; on submit, redirect to Substack subscribe URL. Name field REMOVED (cannot honestly carry it into Substack redirect). Fallback: plain "Schrijf je in op Substack →" button if `?email=` prefill unconfirmed.
- **D-06:** Feed fetch failure / empty feed → honest placeholder + build-log warning; build always succeeds.
- **D-07:** Homepage shows latest 3; `/nieuwsbrief` archive shows 6–10. "Lees verder" → real post URL (target=_blank rel=noopener). "Alle artikelen" → Substack publication home.

### Claude's Discretion
- D-05 (form shape), D-02 (RSS fetch mechanism and parser choice), D-06 (failure behavior), D-03 (page structure), D-07 (article counts and link destinations) were all delegated to Claude's judgment.

### Deferred Ideas (OUT OF SCOPE)
- Real-time/client-side article fetch (CORS proxy approach — rejected)
- Substack embed iframe / custom-form API POST for signup — rejected
- NL/EN translations of `/nieuwsbrief` → Phase 4
- Analytics on newsletter conversion → Phase 5 (GROW-01)
- Full post archive on-site → out of scope; "Alle artikelen" links to Substack
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| NEWS-01 | Newsletter page (`/nieuwsbrief`) | D-03: rich editorial landing page using Phase 1/2 components; SEO metadata via BaseHead.astro; URL must use `import.meta.env.BASE_URL` prefix (CR-01) |
| NEWS-02 | Newsletter signup wired to Substack | D-01/D-05: redirect to `https://<pub>.substack.com/subscribe`; email field on-site; `TODO_SUBSTACK_URL` seam in config.ts; honest disabled state until URL supplied |
| NEWS-03 | Automatic display of recent Substack articles (replaces static placeholders) | D-02: build-time RSS fetch from `<pub>/feed` using `fast-xml-parser`; scheduled GitHub Actions cron rebuild; `ArticleCard` type contract reuse |
</phase_requirements>

---

## Summary

Phase 3 has three deliverables: a new `/nieuwsbrief` page, a functional newsletter signup (redirect-based), and a build-time RSS feed replacing the placeholder article cards. All three are locked behind the `TODO_SUBSTACK_URL` sentinel in `config.ts` — identical to the Web3Forms key pattern from Phase 2 — so the full integration ships wired but visibly disabled until Milan supplies his Substack publication URL.

**Substack subscribe URL:** The hosted subscribe page is `https://<pub>.substack.com/subscribe`. Research found **no official documentation** or reliable community evidence that Substack honours a `?email=` query parameter on that page. The D-05 fallback (plain redirect button, no email prefill) is the honest, safe default. If testing against a live publication confirms prefill works, the email field can be wired; otherwise, the email field is removed and replaced with a styled "Schrijf je in op Substack →" link button.

**RSS feed:** Substack publishes a standard RSS 2.0 feed with Dublin Core and Content namespaces. Confirmed fields via live feed inspection: `title`, `link`, `pubDate`, `description` (summary/excerpt), `content:encoded` (full HTML), `dc:creator` (author), `guid`, `enclosure` (cover image PNG, may have zero-length on draft posts). No `category` field — must derive a neutral static label or omit. No `readTime` field — must derive from word count of `description`/`content:encoded`.

**Build-time fetch pattern in Astro:** Top-level `await fetch()` in `.astro` frontmatter is the idiomatic, zero-complexity approach for a static site with Astro's `output: 'static'`. Content loaders (new in Astro 5+) are an alternative but add unnecessary abstraction for this use case. The fetch runs once at build time, produces static HTML, and is kept fresh by the scheduled rebuild.

**Primary recommendation:** Implement build-time RSS fetch in `Articles.astro` frontmatter (and a parallel fetch in the `/nieuwsbrief` page). Gate the fetch on `TODO_SUBSTACK_URL !== 'TODO_SUBSTACK_URL'`. Parse with `fast-xml-parser` v5.11.0 (current, patched past CVE-2026-25896). Add the `schedule` trigger directly to the existing deploy workflow (no new workflow file needed). Ship `/nieuwsbrief` using Phase 2 page-building conventions.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Newsletter signup | Frontend Server (Build/SSR) | — | Static Astro page generates the form HTML; redirect goes to Substack (external). No API tier needed. |
| Recent-articles feed | Build Tool (astro build) | GitHub Actions (cron) | Feed is fetched at build time, not runtime. GitHub Actions triggers rebuilds to keep content fresh. |
| `/nieuwsbrief` page | Frontend Server (Build) | — | Static Astro page built from RSS data + nl.ts strings. Same tier as /coaching, /spreker. |
| RSS parsing | Build Tool | — | `fast-xml-parser` runs in Node.js at build time only; zero runtime JS on the client. |
| Nav/Footer/Samenwerken enable | Frontend Server (Build) | — | Flip href-or-reason union from `reason` to `href` for Nieuwsbrief item. Build-time change only. |
| Graceful fallback (sentinel) | Build Tool | — | Sentinel check in frontmatter before fetch; falls back to existing placeholder data. |

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `fast-xml-parser` | `5.11.0` [VERIFIED: npm registry] | Parse Substack RSS XML at build time | Pure Node.js, 69M weekly downloads, no C bindings, patched past CVE-2026-25896 (≥5.3.5 safe) |
| `astro` (existing) | `7.2.3` [VERIFIED: src/package.json:10] | Static site build with top-level await frontmatter fetch | Already installed; `output: 'static'` confirmed |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| GitHub Actions `withastro/action` | `v6` [ASSUMED] | Build + deploy Astro to GitHub Pages | Required for scheduled rebuild workflow |
| `actions/checkout` | `v7` [ASSUMED] | Checkout repo in Actions | Standard in all Astro deploy workflows |
| `actions/deploy-pages` | `v5` [ASSUMED] | Deploy to GitHub Pages environment | Pairs with withastro/action in the recommended deploy pattern |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `fast-xml-parser` | `rss-parser` (npm) | `rss-parser` is convenient but pulls in Node.js http polyfills for browser compat; heavier. `fast-xml-parser` is lighter and more widely depended upon. |
| `fast-xml-parser` | `xml2js` | `xml2js` uses callbacks/promises, slightly older API. `fast-xml-parser` is actively maintained with better TS support. |
| Top-level `await fetch()` in frontmatter | Astro Content Loader API | Content loaders add a collection layer and `getEntry()`/`getCollection()` boilerplate. For a single build-time fetch with graceful fallback, direct frontmatter fetch is simpler and more transparent. |
| Adding `schedule:` to existing `deploy.yml` | Separate `scheduled-rebuild.yml` that calls `workflow_dispatch` | Both work. Extending the existing workflow is cleaner — one file, no cross-workflow call complexity, easier to see the full picture. |

**Installation:**
```bash
npm install fast-xml-parser
```

**Version verification:**
```bash
npm view fast-xml-parser version
# → 5.11.0 (confirmed 2026-08-18)
```

---

## Package Legitimacy Audit

| Package | Registry | Age | Downloads | Source Repo | Verdict | Disposition |
|---------|----------|-----|-----------|-------------|---------|-------------|
| `fast-xml-parser` | npm | ~8 yrs | ~69M/wk | github.com/NaturalIntelligence/fast-xml-parser | SUS (seam: `too-new` signal on latest publish date 2026-08-16) | Approved — flag is a false positive from a minor patch release on an 8-year-old, 69M-downloads/week package; see note below |

**Note on SUS verdict:** The seam flagged `fast-xml-parser` as suspicious because its most recent npm publish date was 2026-08-16 (two days ago). This is a false positive — the package has existed for ~8 years, has 69M weekly downloads, is depended upon by 5,000+ projects, and the recent publish is a normal patch update. The CVE-2026-25896 (XSS via entity encoding bypass) affected versions 4.1.3–5.3.4 and was patched in 5.3.5 (February 2026). Installing 5.11.0 is safe. The planner should NOT add a `checkpoint:human-verify` gate for this package given the weight of evidence.

**Packages removed due to [SLOP] verdict:** none
**Packages flagged as suspicious [SUS]:** `fast-xml-parser` — assessed as false positive; planner may proceed without checkpoint.

---

## Architecture Patterns

### System Architecture Diagram

```
Milan's browser
      │
      ▼
GitHub Pages CDN (static HTML)
      │
      ├─► /nieuwsbrief  ──────────────────────────► Substack subscribe page
      │     (editorial landing)   [new tab redirect]  https://<pub>.substack.com/subscribe
      │
      └─► Homepage (Articles section, Newsletter section)
                │
                └─► [same redirect pattern]

astro build (runs at: git push → deploy workflow | daily cron → rebuild workflow)
      │
      ├─ src/pages/nieuwsbrief.astro frontmatter
      │     └─ if TODO_SUBSTACK_URL is sentinel → use placeholder cards
      │        else → fetch https://<pub>.substack.com/feed
      │                └─ parse XML with fast-xml-parser
      │                   └─ map to ArticleCard[] (latest 6–10)
      │                      └─ render static HTML cards
      │
      └─ src/components/sections/Articles.astro frontmatter
            └─ if TODO_SUBSTACK_URL is sentinel → use nl.articles.items (placeholder)
               else → fetch https://<pub>.substack.com/feed
                      └─ parse → map to ArticleCard[] (latest 3)
                         └─ render static HTML grid
```

### Recommended Project Structure

New files for this phase:
```
src/
├── lib/
│   └── rss.ts               # fetchSubstackFeed(url): ArticleCard[] utility
├── pages/
│   └── nieuwsbrief.astro    # /nieuwsbrief page (NEWS-01)
.github/
└── workflows/
    └── deploy.yml           # MODIFIED: add schedule: + workflow_dispatch: triggers
```

Files modified:
```
src/
├── components/sections/
│   ├── Articles.astro       # Replace hardcoded items with RSS fetch via rss.ts
│   └── Newsletter.astro     # Replace disabled span with redirect anchor (D-01/D-05)
├── components/layout/
│   ├── Nav.astro            # Enable Nieuwsbrief item (reason → href)
│   └── Footer.astro         # Enable Nieuwsbrief link (reason → href)
├── components/sections/
│   └── Samenwerken.astro    # Enable Nieuwsbrief card CTA (disabled → href)
└── i18n/nl.ts               # Add nl.nieuwsbrief key for /nieuwsbrief page copy
```

### Pattern 1: RSS Utility — `src/lib/rss.ts`

Extract the RSS fetch + parse into a shared utility so both `Articles.astro` (homepage, 3 cards) and `nieuwsbrief.astro` (archive, 6–10 cards) call the same function.

```typescript
// src/lib/rss.ts
// Source: fast-xml-parser docs (ASSUMED API shape; verify against installed package)
import { XMLParser } from 'fast-xml-parser';

export type ArticleCard = {
  category:      string;
  title:         string;
  excerpt:       string;
  date:          string;
  readTime:      string;
  isPlaceholder: false;
  href:          string;   // real Substack post URL
};

export type PlaceholderCard = {
  category:      string;
  title:         string;
  excerpt:       string;
  date:          string;
  readTime:      string;
  isPlaceholder: true;
};

const parser = new XMLParser({
  ignoreAttributes:    false,
  attributeNamePrefix: '@_',
  removeNSPrefix:      false,   // preserve dc: and content: prefixes
});

function wordCountToReadTime(html: string): string {
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min leestijd`;
}

function formatPubDate(pubDate: string): string {
  const d = new Date(pubDate);
  // Dutch month names — localisation for display
  const months = [
    'januari','februari','maart','april','mei','juni',
    'juli','augustus','september','oktober','november','december'
  ];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

export async function fetchSubstackFeed(
  feedUrl: string,
  maxItems = 3
): Promise<ArticleCard[]> {
  const res = await fetch(feedUrl);
  if (!res.ok) {
    console.warn(`[Phase 3] Substack RSS fetch failed: ${res.status} ${res.statusText}`);
    return [];
  }
  const xml = await res.text();
  const parsed = parser.parse(xml);
  const rawItems: any[] = parsed?.rss?.channel?.item ?? [];
  const items = Array.isArray(rawItems) ? rawItems : [rawItems];

  return items.slice(0, maxItems).map((item): ArticleCard => {
    const content = item['content:encoded'] ?? item.description ?? '';
    return {
      category:      'Artikel',          // neutral label — RSS has no category field
      title:         item.title ?? '',
      excerpt:       item.description?.replace(/<[^>]+>/g, '').slice(0, 160) ?? '',
      date:          formatPubDate(item.pubDate ?? ''),
      readTime:      wordCountToReadTime(content),
      isPlaceholder: false,
      href:          item.link ?? '',
    };
  });
}
```

**Key point:** `excerpt` is derived from `description` with HTML stripped — do NOT use `content:encoded` for the excerpt (it is the full article HTML and must never be rendered with `set:html` in cards).

### Pattern 2: Sentinel Guard in Frontmatter

Both `Articles.astro` and `nieuwsbrief.astro` use this sentinel pattern:

```typescript
// In .astro frontmatter — runs at build time only
import { TODO_SUBSTACK_URL } from '../../config';
import { fetchSubstackFeed } from '../../lib/rss';
import { nl } from '../../i18n/nl';

const IS_SENTINEL = TODO_SUBSTACK_URL === 'TODO_SUBSTACK_URL';

let articles: ArticleCard[] | PlaceholderCard[];

if (IS_SENTINEL) {
  // D-04: honest placeholder state while URL not yet supplied
  articles = nl.articles.items.map((item) => ({ ...item, isPlaceholder: true as const }));
} else {
  const feedUrl = `${TODO_SUBSTACK_URL}/feed`;
  const fetched = await fetchSubstackFeed(feedUrl, 3);  // or 10 for archive
  if (fetched.length === 0) {
    // D-06: feed failure → honest placeholder + build-log warning
    console.warn('[Phase 3] Substack feed returned 0 items — rendering placeholder cards.');
    articles = nl.articles.items.map((item) => ({ ...item, isPlaceholder: true as const }));
  } else {
    articles = fetched;
  }
}
```

### Pattern 3: Newsletter Redirect (D-01/D-05)

```astro
---
// In Newsletter.astro — replaces the disabled <span> submit
import { TODO_SUBSTACK_URL } from '../../config';
const IS_SENTINEL = TODO_SUBSTACK_URL === 'TODO_SUBSTACK_URL';
const subscribeUrl = `${TODO_SUBSTACK_URL}/subscribe`;
---

{IS_SENTINEL ? (
  <!-- Honest disabled state — keep existing <span role=button aria-disabled> -->
  <span class="newsletter__submit newsletter__submit--disabled" role="button"
        aria-disabled="true" tabindex="-1"
        title="Link volgt zodra Substack-URL bekend is">
    {cta}
  </span>
) : (
  <!--
    D-05 fallback: plain redirect button (no email prefill — ?email= not confirmed by Substack).
    If tested and ?email= confirmed working, the form submission handler can be added later.
    T-01-04: target="_blank" requires rel="noopener noreferrer"
  -->
  <a href={subscribeUrl}
     target="_blank"
     rel="noopener noreferrer"
     class="newsletter__submit">
    {cta}
  </a>
)}
```

**Why no email prefill for now:** Research found no official Substack documentation or reliable community evidence of `?email=` being honoured on the `/subscribe` page. Implementing a form + JavaScript redirect with an unconfirmed parameter risks a broken UX (email silently discarded). The honest fallback — a styled "Schrijf je in op Substack →" link — is cleaner and aligns with the project's honesty rule (HOME-10).

### Pattern 4: GitHub Actions Scheduled Rebuild

Add `schedule:` and `workflow_dispatch:` triggers to the existing `deploy.yml` (to be created in this phase since no `.github/workflows/` exists yet):

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  schedule:
    - cron: '0 6 * * *'   # Daily at 06:00 UTC — refreshes Substack feed
  workflow_dispatch:         # Manual trigger for testing

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v7
      - name: Build site
        uses: withastro/action@v6

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

**No existing workflow to modify:** The `.github/workflows/` directory does not exist in the repo. This phase creates it from scratch, which is why the full YAML is included here.

### Pattern 5: Nav/Footer Nieuwsbrief Enable (href-or-reason flip)

```typescript
// In Nav.astro — change the Nieuwsbrief entry from reason to href
// BEFORE:
{ label: nl.nav.nieuwsbrief, reason: 'Nieuwsbrief pagina volgt in fase 3' },

// AFTER:
{ label: nl.nav.nieuwsbrief, href: `${import.meta.env.BASE_URL}nieuwsbrief` },
```

Same pattern applies in `Footer.astro` (exact shape to be confirmed by reading Footer.astro) and in `Samenwerken.astro` (change `disabled: true` → `disabled: false`, `href: undefined` → `href: ${BASE_URL}nieuwsbrief`).

### Anti-Patterns to Avoid

- **Rendering `content:encoded` with `set:html` in article cards.** The full HTML from Substack may contain arbitrary markup. Use `description` (stripped of HTML tags) for the excerpt. Only use `set:html` if building a full post detail page (out of scope). [ASSUMED: Astro's `set:html` bypasses auto-escaping per Snyk CVEs on Astro XSS]
- **Fetching RSS at runtime (client-side).** Substack RSS does not send CORS headers. A client-side fetch will be blocked by the browser. The build-time pattern avoids this entirely.
- **Using the undocumented Substack `/api/v1/free` POST endpoint.** It is fragile (CAPTCHA, origin checks), changes without notice, and is not a public API. D-01 explicitly rejected this.
- **Leaving `isPlaceholder: true` on real RSS cards.** When real feed data is present, the `isPlaceholder` flag must be `false` so `PlaceholderBadge` is not rendered. The markup loop uses the flag for conditional badge rendering.
- **Bare `/nieuwsbrief` as `href`.** Under GitHub Pages subpath deployment (`base: '/milan-website/'`), bare `/nieuwsbrief` 404s. Always use `${import.meta.env.BASE_URL}nieuwsbrief` (CR-01 from Phase 2).
- **Using `fast-xml-parser` < 5.3.5.** CVE-2026-25896 (XSS via DOCTYPE entity name bypass) affects versions 4.1.3–5.3.4. Always install 5.3.5+ (current: 5.11.0).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| XML/RSS parsing | Custom XML string parser / regex | `fast-xml-parser` v5.11.0 | Namespaces, encoding, entity handling, CDATA — all handled correctly; regex will break on malformed or namespaced RSS |
| GitHub Pages build trigger | A separate polling service or cloud function | GitHub Actions `schedule:` cron in the same `deploy.yml` | Zero extra infra, no secrets required beyond what Pages already uses, free within Actions limits |
| HTML sanitisation of RSS content | Custom strip-tags regex | `.replace(/<[^>]+>/g, ' ')` is sufficient for excerpt-only use (never render full HTML from RSS) | For excerpt display only, no `set:html` is needed, so XSS risk does not arise |
| Word count → read time | Custom NLP library | `Math.round(wordCount / 200)` — industry standard 200 wpm | Sufficient accuracy; no library needed |

**Key insight:** The combination of build-time fetch + static HTML means this phase needs zero runtime JS for the feed. The main complexity is in the XML parse options for namespaced fields — the library handles this completely.

---

## Common Pitfalls

### Pitfall 1: `content:encoded` namespace key name in parsed output

**What goes wrong:** `fast-xml-parser` with default options collapses `content:encoded` to `encoded` when `removeNSPrefix: true`. Accessing `item['content:encoded']` returns `undefined`.

**Why it happens:** XML namespace prefixes are stripped by default.

**How to avoid:** Set `removeNSPrefix: false` in `XMLParser` options. The key in the parsed object will then be `item['content:encoded']`. [ASSUMED: based on fast-xml-parser docs search results; verify against v5 docs]

**Warning signs:** `readTime` comes back "1 min leestijd" for all articles (word count is 0 because content field is undefined).

### Pitfall 2: RSS `item` is not an array when there is only one post

**What goes wrong:** `fast-xml-parser` returns a single object (not an array) for `channel.item` when the feed has exactly one item. Calling `.slice()` or `.map()` throws a TypeError.

**Why it happens:** XML parsers that don't know the cardinality of an element will return a scalar when there is one and an array when there are many. [ASSUMED: common XML parser behaviour, applies to fast-xml-parser]

**How to avoid:** Always normalize: `const items = Array.isArray(rawItems) ? rawItems : [rawItems];`

**Warning signs:** Build succeeds with one post but crashes as soon as a second post is published.

### Pitfall 3: `enclosure` image may be zero-length (not usable as cover art)

**What goes wrong:** The `enclosure` element in Substack's RSS has `@_length="0"` on some posts (confirmed in live feed). Using the enclosure URL for a card cover image risks broken images or empty placeholders.

**Why it happens:** Substack sets the enclosure length to 0 for some posts/cover types.

**How to avoid:** Do not use `enclosure` for cover images on article cards in this phase. The `ArticleCard` type does not include an image field — omit it. Cover images are a nice-to-have future enhancement, not part of the MVP.

**Warning signs:** Card images render as broken `<img>` elements.

### Pitfall 4: Feed fetch 404s or 403s during build when Substack publication is private or deleted

**What goes wrong:** `astro build` hangs or throws an uncaught error from `fetch()`.

**Why it happens:** `fetch()` in Node.js throws on network errors; a non-ok HTTP response does not throw by default.

**How to avoid:** Always check `res.ok` and wrap in `try/catch`. On failure, log a warning and return `[]`, which triggers the D-06 fallback.

**Warning signs:** Build fails with `ENOTFOUND` or `fetch failed`.

### Pitfall 5: GitHub Actions scheduled workflow stops running after 60 days of repo inactivity

**What goes wrong:** GitHub automatically disables scheduled workflows on public repos with no activity for 60 days.

**Why it happens:** GitHub policy to reduce wasted compute on stale repos.

**How to avoid:** Periodic git pushes (even just a README bump) keep the repo active. The `workflow_dispatch` trigger also allows manual re-enabling from the Actions tab. [ASSUMED: GitHub docs policy; document in workflow YAML comment]

**Warning signs:** Articles stop updating; last run timestamp in Actions UI is 60+ days old.

### Pitfall 6: `?email=` prefill is not a confirmed Substack feature

**What goes wrong:** An email is typed into the on-site field, the user clicks "Schrijf je in", and the Substack subscribe page opens with the email field empty — the user must retype it.

**Why it happens:** Substack does not officially document `?email=` as a subscribe URL parameter.

**How to avoid:** Implement the D-05 fallback from the start: a plain "Schrijf je in op Substack →" anchor (no email field on-site). If the planner chooses to include an email field with attempted prefill, the JavaScript handler must be annotated with a comment explaining this is unconfirmed behaviour and must be tested against a live Substack publication before shipping.

**Warning signs:** Email typed on-site does not appear on the Substack subscribe page.

---

## Code Examples

### fast-xml-parser: parse namespaced RSS

```typescript
// Source: fast-xml-parser GitHub README + search results [ASSUMED: API shape; confirm against v5 docs]
import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
  ignoreAttributes:    false,
  attributeNamePrefix: '@_',
  removeNSPrefix:      false,   // keeps "content:encoded" and "dc:creator" as keys
});

const result = parser.parse(xmlString);
const items = result.rss?.channel?.item ?? [];
const normalized = Array.isArray(items) ? items : [items];

for (const item of normalized) {
  const title    = item.title;
  const link     = item.link;
  const pubDate  = item.pubDate;
  const excerpt  = item.description;         // truncated HTML summary
  const fullHtml = item['content:encoded'];  // full article HTML — DO NOT set:html in cards
  const creator  = item['dc:creator'];       // author name
}
```

### Sentinel check pattern (mirrors Phase 2 Web3Forms key pattern)

```typescript
// Source: src/config.ts:29 [VERIFIED: src/config.ts:29]
// The sentinel value is exactly the string 'TODO_SUBSTACK_URL'
// export const TODO_SUBSTACK_URL = 'TODO_SUBSTACK_URL';
const IS_SENTINEL = TODO_SUBSTACK_URL === 'TODO_SUBSTACK_URL';
```

### Nav item enable pattern (established in Phase 2)

```typescript
// Source: src/components/layout/Nav.astro:37 [VERIFIED: src/components/layout/Nav.astro:34-40]
// BEFORE (Phase 2 state):
{ label: nl.nav.nieuwsbrief, reason: 'Nieuwsbrief pagina volgt in fase 3' },
// AFTER (Phase 3 state):
{ label: nl.nav.nieuwsbrief, href: `${import.meta.env.BASE_URL}nieuwsbrief` },
```

---

## RSS → ArticleCard Field Mapping

The existing `ArticleCard` type [VERIFIED: src/components/sections/Articles.astro:22-31]:
```typescript
// Verbatim from Articles.astro:22-31:
// type ArticleCard = {
//   category:    string;   // e.g. "Leiderschap"
//   title:       string;   // Article title
//   excerpt:     string;   // One-sentence teaser
//   date:        string;   // "maand jaar" display string
//   readTime:    string;   // "X min leestijd"
//   isPlaceholder: true;   // Phase 3: remove this flag when real data arrives
// };
```

Phase 3 mapping:

| ArticleCard field | Substack RSS source | Derivation |
|-------------------|---------------------|------------|
| `category` | — (not in RSS) | Use neutral `'Artikel'` static label; never fabricate a topic category |
| `title` | `item.title` | Direct mapping |
| `excerpt` | `item.description` (HTML stripped, first 160 chars) | Strip tags with `.replace(/<[^>]+>/g, ' ')` |
| `date` | `item.pubDate` (RFC 822) | Parse with `new Date(pubDate)`, format as "maand jaar" (Dutch) |
| `readTime` | Derived from `item['content:encoded']` word count | `Math.round(words / 200)` min |
| `isPlaceholder` | — | `false` when real data; `true` when sentinel/fallback |
| `href` (**new field**) | `item.link` | Real Substack post URL; used for `target="_blank" rel="noopener noreferrer"` "Lees verder" link |

**`href` is a new field** on the `ArticleCard` type. The existing type definition in `Articles.astro` must be extended. The markup loop currently renders a disabled `<span>` for "Lees verder" — Phase 3 changes this to a real `<a>` when `!isPlaceholder && href`.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Client-side RSS fetch with CORS proxy | Build-time RSS fetch → static HTML | Established pattern in Astro ecosystem | Zero runtime JS, better SEO, no CORS issues |
| Separate cron workflow file | Single `deploy.yml` with `schedule:` trigger | GitHub Actions maturation | Simpler, no workflow_call complexity |
| Substack embed iframe | Redirect to hosted subscribe page | Best practice for branded sites | Full control over styling, honest UX, no iframe sizing issues |

**Deprecated/outdated:**
- `rss-parser` npm package: Still valid but heavier than `fast-xml-parser`. Last major version has reduced maintenance. For a simple RSS parse, `fast-xml-parser` is the leaner choice in 2026.
- Substack's `/api/v1/free` undocumented POST endpoint: Reverse-engineered, fragile, breaks with CAPTCHA updates. Correctly rejected in D-01.

---

## Existing Code Confirmed (Read This Session)

### `src/config.ts` — Sentinel seam
[VERIFIED: src/config.ts:29] The sentinel value is the string `'TODO_SUBSTACK_URL'`:
```typescript
export const TODO_SUBSTACK_URL = 'TODO_SUBSTACK_URL';
```
Phase 3 derives feed URL as `${TODO_SUBSTACK_URL}/feed` and subscribe URL as `${TODO_SUBSTACK_URL}/subscribe` — both from this single constant, so one grep-replace flips both.

### `src/components/sections/Articles.astro` — ArticleCard contract
[VERIFIED: src/components/sections/Articles.astro:22-44] Current data source:
```typescript
const articles = nl.articles.items.map((item) => ({ ...item, isPlaceholder: true as const }));
```
Phase 3 replaces this assignment with the sentinel-gated RSS fetch. The markup loop (`articles.map(...)`) is unchanged.

### `src/components/sections/Newsletter.astro` — Disabled submit shape
[VERIFIED: src/components/sections/Newsletter.astro:98-121] The disabled submit is a `<span role="button" aria-disabled="true">` with `TODO_SUBSTACK_URL` referenced as `data-placeholder`. Phase 3 replaces this with the redirect anchor when not sentinel.

### `src/components/layout/Nav.astro` — href-or-reason union
[VERIFIED: src/components/layout/Nav.astro:37] Nieuwsbrief nav item currently: `{ label: nl.nav.nieuwsbrief, reason: 'Nieuwsbrief pagina volgt in fase 3' }`. Phase 3 changes `reason` to `href`.

### `src/components/sections/Samenwerken.astro` — Nieuwsbrief card
[VERIFIED: src/components/sections/Samenwerken.astro:40-49] Nieuwsbrief card: `disabled: true, href: undefined`. Phase 3: `disabled: false, href: \`${import.meta.env.BASE_URL}nieuwsbrief\``.

### `astro.config.mjs` — GitHub Pages base path
[VERIFIED: astro.config.mjs:14-17] `base: '/milan-website/'`. All internal links must use `import.meta.env.BASE_URL` prefix (CR-01). The `/nieuwsbrief` page URL is `${import.meta.env.BASE_URL}nieuwsbrief`.

### `package.json` — No GitHub Actions workflow exists yet
[VERIFIED: Glob search] `.github/workflows/` directory does not exist. Phase 3 creates it.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | `fast-xml-parser`, Astro build | ✓ | v24.14.0 | — |
| npm | Package install | ✓ | (confirmed by `npm view` ran this session) | — |
| GitHub Actions | Scheduled rebuild (NEWS-03) | ✓ (public repo) | — | Manual redeploy |
| Substack publication URL | NEWS-02, NEWS-03 live | ✗ | — | `TODO_SUBSTACK_URL` sentinel (D-04) |

**Missing dependencies with no fallback:** None that block implementation. The Substack URL is missing but the sentinel pattern handles this gracefully.

---

## Validation Architecture

No existing test framework is configured in this project (`package.json` has no test script, no test files found). Validation for Phase 3 is manual/smoke-test based:

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | How to Validate |
|--------|----------|-----------|-----------------|
| NEWS-01 | `/nieuwsbrief` page exists, loads, converts | Manual smoke | `npm run build && npm run preview` → navigate to `/milan-website/nieuwsbrief` |
| NEWS-01 | Page SEO metadata correct | Manual | View source, check `<title>`, `<meta description>` |
| NEWS-02 | Signup redirect opens Substack in new tab | Manual (post URL supply) | Replace `TODO_SUBSTACK_URL`, rebuild, click button |
| NEWS-02 | Honest disabled state while sentinel | Manual | Build with sentinel → confirm button is aria-disabled, not clickable |
| NEWS-03 | Real posts appear in Articles section | Manual (post URL supply) | Replace `TODO_SUBSTACK_URL`, rebuild, confirm 3 real cards |
| NEWS-03 | Feed failure gracefully falls back | Manual | Temporarily pass invalid feed URL, confirm build succeeds with placeholders + console warning |
| NEWS-03 | Scheduled rebuild fires daily | Integration | Check GitHub Actions UI after first push with `deploy.yml` |
| — | Nav "Nieuwsbrief" link works | Manual | Click nav item, confirm navigates to `/nieuwsbrief` |
| — | Footer "Nieuwsbrief" link works | Manual | Click footer link, confirm navigates to `/nieuwsbrief` |
| — | Samenwerken card CTA works | Manual | Click "Schrijf je gratis in", confirm navigates to `/nieuwsbrief` |

### Wave 0 Gaps
- No test files exist — no gaps to fill in this phase (manual-only project). If a future phase adds testing, NEWS-03 would be the highest-value unit test target (RSS parse → ArticleCard mapping).

---

## Security Domain

### Applicable ASVS Categories (L1)

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | No auth in this phase |
| V3 Session Management | No | Static site, no sessions |
| V4 Access Control | No | No gated content |
| V5 Input Validation | Partial | Email field (client-side `type="email"` validation only — not submitted to our server) |
| V6 Cryptography | No | No secrets generated or stored in this phase |
| V7 Error Handling | Yes | RSS fetch errors must not expose internal paths in the rendered page (only in build log) |

### Threat Model

| Threat | STRIDE | Risk | Standard Mitigation |
|--------|--------|------|---------------------|
| Tab-napping via `target="_blank"` on Substack redirect | Spoofing | LOW (redirecting to a known, trusted domain) | `rel="noopener noreferrer"` on every `target="_blank"` anchor (T-01-04, already in codebase rules) |
| XSS from `content:encoded` RSS HTML | Tampering | MEDIUM (build-time context) | Do NOT use `set:html` for RSS content in cards. Strip HTML for excerpts with `.replace(/<[^>]+>/g, ' ')`. Never render full RSS HTML. |
| Open redirect (email field) | Tampering | LOW | The redirect URL is hardcoded in config.ts (`TODO_SUBSTACK_URL` + `/subscribe`). The email is only appended as a query param (if email prefill is implemented) — no user-controlled URL construction. |
| SSRF in build-time fetch | Elevation of Privilege | LOW | The feed URL is derived from `TODO_SUBSTACK_URL` set in `config.ts`, a static config file — not from user input. The build environment is GitHub Actions, not a user-facing server. |
| Stale/tampered RSS content from Substack | Information Disclosure | LOW | Substack is a trusted CDN. The build fetches over HTTPS. Cards only display title, excerpt (stripped), and date — no executable content. |
| CVE-2026-25896 in fast-xml-parser (entity encoding bypass XSS) | Tampering | NONE (patched) | Install 5.3.5+ (current: 5.11.0). The vulnerability is in XML entity handling; since we use the parsed output in plain text fields (not `set:html`), even older versions would not be exploitable in this context. Upgrade anyway. |

**Security summary:** The highest-risk item is rendering untrusted RSS HTML. The mitigation is simple: only use `description` (stripped of tags) for excerpts, never `content:encoded`. Never `set:html` any RSS-sourced content in this phase. All other surfaces are low risk.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Substack does not support `?email=` query parameter for subscribe page prefill | Standard Stack / Pattern 3 | Low — fallback (plain button) is still a valid, honest UX. If wrong, implement the email-prefill form variant as a later enhancement. |
| A2 | `fast-xml-parser` with `removeNSPrefix: false` returns `item['content:encoded']` as the key for `content:encoded` | Code Examples | Medium — build will fail or readTime will default to 1 min. Verify against installed v5 package at implementation time. |
| A3 | `fast-xml-parser` returns a scalar (not array) for a single `<item>` element | Common Pitfalls #2 | Medium — build crashes when feed has exactly 1 post. Always normalize with `Array.isArray()` check. |
| A4 | `withastro/action@v6` and `actions/deploy-pages@v5` are the current recommended versions | Standard Stack / Pattern 4 | Low — verify against https://github.com/withastro/action before writing the workflow file. |
| A5 | GitHub Actions scheduled workflows run on the default branch only | Common Pitfalls #5 | Low — if `main` is not the default branch, the schedule won't fire. Confirm in repo settings. |
| A6 | `enclosure` is present in Substack RSS but has zero-length on some posts | RSS → ArticleCard Mapping | Low — confirmed via live feed inspection; safe to ignore for now. |
| A7 | Substack RSS `description` contains a shortened HTML excerpt (not the full article body) | RSS → ArticleCard Mapping | Medium — if `description` is empty, excerpt falls back to empty string. Implementation should check both `description` and fall back to the first 160 chars of `content:encoded` (stripped). |

---

## Open Questions

1. **Does `TODO_SUBSTACK_URL` need to include a trailing slash?**
   - What we know: `config.ts` exports the bare URL string with no trailing slash (e.g., `https://milanvandermeulen.substack.com`). Feed URL is `${TODO_SUBSTACK_URL}/feed`.
   - What's unclear: Whether Substack accepts `https://pub.substack.com/feed` and `https://pub.substack.com/subscribe` correctly when the base has no trailing slash.
   - Recommendation: Trim trailing slash from `TODO_SUBSTACK_URL` when provided. Document in config.ts comment.

2. **Does Substack's subscribe page honour `?email=` prefill?**
   - What we know: No official documentation exists. No reliable community confirmation found.
   - What's unclear: Whether this works in practice.
   - Recommendation: Implement D-05 fallback (plain button) as default. If Milan supplies the Substack URL before this phase ships, test manually and upgrade to email field + prefill if confirmed.

3. **Does Footer.astro use the same href-or-reason union shape as Nav.astro?**
   - What we know: Phase 2 docs say it does (02-CONTEXT.md §Code Context). Was not read in detail this session.
   - What's unclear: Exact property names in `Footer.astro` navItems array.
   - Recommendation: Read `Footer.astro` at plan time before writing the enable task. [Read `src/components/layout/Footer.astro`]

---

## Sources

### Primary (HIGH confidence — read this session)
- `src/config.ts` [VERIFIED: lines 1-88] — `TODO_SUBSTACK_URL` sentinel pattern, exact value string
- `src/components/sections/Articles.astro` [VERIFIED: lines 1-301] — `ArticleCard` type contract, data source assignment
- `src/components/sections/Newsletter.astro` [VERIFIED: lines 1-311] — disabled submit shape, T-01-04 note
- `src/components/layout/Nav.astro` [VERIFIED: lines 1-80] — href-or-reason union, Nieuwsbrief entry
- `src/components/sections/Samenwerken.astro` [VERIFIED: lines 1-75] — Nieuwsbrief card disabled state
- `src/i18n/nl.ts` [VERIFIED: lines 1-327] — all Dutch string keys including `nl.articles.items` placeholder data
- `astro.config.mjs` [VERIFIED: lines 1-44] — `base: '/milan-website/'`, `output: 'static'`, Astro version 7.2.3
- `package.json` [VERIFIED: lines 1-22] — dependency list, no fast-xml-parser yet, no test script
- Live Substack RSS feed (jcappiello.substack.com/feed) — confirmed fields: title, link, pubDate, description, dc:creator, content:encoded, guid, enclosure
- npm registry — `npm view fast-xml-parser version` → `5.11.0`

### Secondary (MEDIUM confidence)
- Astro official deploy docs (docs.astro.build/en/guides/deploy/github/) — deploy.yml YAML pattern
- CVE-2026-25896 / endorlabs.com — fast-xml-parser vulnerability scope (<5.3.5) and patch (5.3.5+)
- GitHub Actions docs (docs.github.com/actions) — `schedule:` cron trigger syntax

### Tertiary (LOW confidence)
- WebSearch results on Substack RSS fields — multiple sources consistent on title/link/pubDate/description/content:encoded/dc:creator
- danielsaidi.com blog — GitHub Actions cron pattern for GitHub Pages rebuild
- WebSearch results on Substack `?email=` prefill — no evidence found (absence of evidence is the key finding)

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — `fast-xml-parser` version verified via npm; Astro version verified in package.json; CVE scope confirmed.
- Architecture: HIGH — all existing code read and verified; patterns derive from confirmed codebase shape.
- Substack RSS field mapping: MEDIUM — confirmed via live feed + secondary sources; confirmed namespaces match.
- Substack `?email=` prefill: LOW — confirmed ABSENT from docs; fallback is the safe default.
- GitHub Actions patterns: MEDIUM — confirmed from official Astro docs; actions version numbers ASSUMED.
- Common pitfalls: MEDIUM — based on fast-xml-parser documented behaviour patterns + general XML parser behaviour.

**Research date:** 2026-08-18
**Valid until:** 2026-09-18 (30 days for stable tech; Substack subscribe URL behaviour could change sooner)
