# Phase 3: Newsletter & Substack Integration — Pattern Map

**Mapped:** 2026-08-18
**Files analyzed:** 10 new/modified files
**Analogs found:** 10 / 10

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/lib/rss.ts` | utility | transform (RSS XML → ArticleCard[]) | `src/config.ts` (sentinel pattern) | partial-match (same sentinel pattern; no prior fetch utility) |
| `src/pages/nieuwsbrief.astro` | page | request-response (static build) | `src/pages/coaching.astro` | exact |
| `src/components/sections/Newsletter.astro` | component | request-response (redirect) | `src/components/sections/Newsletter.astro` (self — modify) | self |
| `src/components/sections/Articles.astro` | component | transform (RSS data → card grid) | `src/components/sections/Articles.astro` (self — modify) | self |
| `src/i18n/nl.ts` | config | transform (string store) | `src/i18n/nl.ts` (self — extend) | self |
| `src/config.ts` | config | — | `src/config.ts` (self — extend) | self |
| `src/components/layout/Nav.astro` | layout | request-response | `src/components/layout/Nav.astro` (self — 1-line change) | self |
| `src/components/layout/Footer.astro` | layout | request-response | `src/components/layout/Footer.astro` (self — 1-line change) | self |
| `src/components/sections/Samenwerken.astro` | component | request-response | `src/components/sections/Samenwerken.astro` (self — 3-field change) | self |
| `.github/workflows/deploy.yml` | config | event-driven (CI cron) | none (new file; full YAML in RESEARCH.md Pattern 4) | no-analog |

---

## Pattern Assignments

### `src/lib/rss.ts` (utility, transform)

**Analog:** `src/config.ts` — for the sentinel-guard concept; no prior fetch utility exists.

**Sentinel constant pattern** (`src/config.ts` lines 29):
```typescript
export const TODO_SUBSTACK_URL = 'TODO_SUBSTACK_URL';
```

**Core pattern to implement** (from RESEARCH.md §Pattern 1 — no existing analog; implement as written):
```typescript
// src/lib/rss.ts
import { XMLParser } from 'fast-xml-parser';

export type ArticleCard = {
  category:      string;
  title:         string;
  excerpt:       string;
  date:          string;
  readTime:      string;
  isPlaceholder: false;
  href:          string;   // real Substack post URL — NEW field vs Phase 1 type
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
  removeNSPrefix:      false,   // keeps 'content:encoded' and 'dc:creator' as keys
});

function wordCountToReadTime(html: string): string {
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min leestijd`;
}

function formatPubDate(pubDate: string): string {
  const d = new Date(pubDate);
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
  try {
    const res = await fetch(feedUrl);
    if (!res.ok) {
      console.warn(`[Phase 3] Substack RSS fetch failed: ${res.status} ${res.statusText}`);
      return [];
    }
    const xml = await res.text();
    const parsed = parser.parse(xml);
    const rawItems: any[] = parsed?.rss?.channel?.item ?? [];
    // Pitfall 2: fast-xml-parser returns scalar when feed has exactly 1 item
    const items = Array.isArray(rawItems) ? rawItems : [rawItems];

    return items.slice(0, maxItems).map((item): ArticleCard => {
      const content = item['content:encoded'] ?? item.description ?? '';
      return {
        category:      'Artikel',   // neutral static label — RSS has no category field
        title:         item.title ?? '',
        excerpt:       (item.description ?? '').replace(/<[^>]+>/g, ' ').slice(0, 160),
        date:          formatPubDate(item.pubDate ?? ''),
        readTime:      wordCountToReadTime(content),
        isPlaceholder: false,
        href:          item.link ?? '',
      };
    });
  } catch (err) {
    console.warn('[Phase 3] Substack RSS fetch threw:', err);
    return [];
  }
}
```

**Key constraints:**
- NEVER use `set:html` on `content:encoded` — strip to plain text for excerpts only
- `removeNSPrefix: false` is mandatory to access `item['content:encoded']`
- Always normalize item to array before `.map()` (Pitfall 2)

---

### `src/pages/nieuwsbrief.astro` (page, request-response)

**Analog:** `src/pages/coaching.astro`

**Imports pattern** (`coaching.astro` lines 21-33):
```typescript
import BaseLayout from '../layouts/BaseLayout.astro';
import SectionWrapper from '../components/ui/SectionWrapper.astro';
import Card from '../components/ui/Card.astro';
import Button from '../components/ui/Button.astro';
import RevealOnScroll from '../components/ui/RevealOnScroll.astro';
import Newsletter from '../components/sections/Newsletter.astro';
import { nl } from '../i18n/nl';
```
For nieuwsbrief.astro, also add:
```typescript
import { TODO_SUBSTACK_URL } from '../config';
import { fetchSubstackFeed, type ArticleCard, type PlaceholderCard } from '../lib/rss';
import Articles from '../components/sections/Articles.astro';
```

**Sentinel guard pattern** (RESEARCH.md §Pattern 2 — copy exactly):
```typescript
// In .astro frontmatter — runs at build time only
const IS_SENTINEL = TODO_SUBSTACK_URL === 'TODO_SUBSTACK_URL';
const subscribeUrl = `${TODO_SUBSTACK_URL}/subscribe`;
const substackPublicationUrl = TODO_SUBSTACK_URL;

let archiveArticles: ArticleCard[] | PlaceholderCard[];

if (IS_SENTINEL) {
  archiveArticles = nl.articles.items.map((item) => ({ ...item, isPlaceholder: true as const }));
} else {
  const feedUrl = `${TODO_SUBSTACK_URL}/feed`;
  const fetched = await fetchSubstackFeed(feedUrl, 10);
  if (fetched.length === 0) {
    console.warn('[Phase 3] Substack feed returned 0 items — rendering placeholder cards.');
    archiveArticles = nl.articles.items.map((item) => ({ ...item, isPlaceholder: true as const }));
  } else {
    archiveArticles = fetched;
  }
}
```

**BaseLayout usage** (`coaching.astro` line 35):
```astro
<BaseLayout title={pageTitle} description={pageDesc}>
```
For nieuwsbrief: `title={nl.nieuwsbrief.pageTitle}` and `description={nl.nieuwsbrief.pageDesc}`.
SEO values: `"Nieuwsbrief — Milan van der Meulen"` and `"Elke maand eerlijke lessen over ondernemen, schalen en leiderschap. Schrijf je in op Milan's Substack nieuwsbrief."` (UI-SPEC §Copywriting Contract).

**Hero pattern** (`coaching.astro` lines 38-58 + styles lines 141-196):
```astro
<SectionWrapper id="nieuwsbrief-hero" labelledBy="nieuwsbrief-hero-heading" variant="default">
  <div class="nieuwsbrief-hero">
    <p class="nieuwsbrief-hero__eyebrow">{nl.nieuwsbrief.eyebrow}</p>
    <h1 id="nieuwsbrief-hero-heading" class="nieuwsbrief-hero__heading">
      {nl.nieuwsbrief.heading}
    </h1>
    <p class="nieuwsbrief-hero__subtext">{nl.nieuwsbrief.subtext}</p>
    <div class="nieuwsbrief-hero__ctas">
      <Button href={IS_SENTINEL ? undefined : subscribeUrl}
              variant="primary"
              disabled={IS_SENTINEL}
              {...(!IS_SENTINEL && { external: true })}>
        {nl.nieuwsbrief.cta}
      </Button>
    </div>
  </div>
</SectionWrapper>
```

**Hero CSS** (copy from `coaching.astro` lines 141-196 — same layout contract):
```css
.nieuwsbrief-hero {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  max-width: 720px;
  padding-block: var(--space-2xl);
}
@media (min-width: 768px) {
  .nieuwsbrief-hero { padding-block: var(--space-4xl); }
}
/* Eyebrow: --text-xs, weight 600, letter-spacing 0.08em, uppercase, --color-text-secondary */
/* H1: --text-5xl, weight 600, line-height 1.1, --font-display, text-wrap: balance */
/* Subtext: --text-base, weight 400, line-height 1.6, --color-text-secondary, max-width: 640px */
```

**Section composition** (mirrors coaching.astro structure; D-03):
```
1. Hero (variant="default") — eyebrow, H1, subtext, primary CTA
2. Value-prop / "Wat je krijgt" (variant="surface") — 2–3 bullet tiles from nl.nieuwsbrief.valueProps
3. Newsletter.astro reuse (variant="default") — rewired Phase 3 signup
4. Archive grid (variant="default") — archiveArticles (6–10 items)
5. Optional testimonial (variant="surface") — OMIT in Phase 3 (no newsletter-specific testimonial)
```
One dark band rule: nieuwsbrief page uses `variant="dark"` for the value-prop section if strong contrast is desired — but coaching.astro shows the pattern for how to apply the single dark band.

**Internal href rule** (`coaching.astro` lines 50-53 — CR-01):
```astro
<Button href={`${import.meta.env.BASE_URL}contact?type=coaching`} variant="primary">
```
For nieuwsbrief, all internal links use `${import.meta.env.BASE_URL}nieuwsbrief` pattern. External Substack links use the subscribeUrl variable (not BASE_URL-prefixed).

---

### `src/components/sections/Newsletter.astro` (component, redirect — modify)

**Analog:** self (existing file — replace disabled submit with conditional redirect)

**Current disabled submit shape** (lines 110-121):
```astro
<span
  class="newsletter__submit newsletter__submit--disabled"
  role="button"
  aria-disabled="true"
  tabindex="-1"
  data-placeholder={TODO_SUBSTACK_URL}
  title="Link volgt zodra Substack-URL bekend is"
  aria-describedby="newsletter-submit-note"
>
  {cta}
</span>
```

**Phase 3 replacement — add sentinel import and derive subscribeUrl** (add to frontmatter after existing imports):
```typescript
const IS_SENTINEL = TODO_SUBSTACK_URL === 'TODO_SUBSTACK_URL';
const subscribeUrl = `${TODO_SUBSTACK_URL}/subscribe`;
```

**Replace the `<span>` submit with conditional** (RESEARCH.md §Pattern 3):
```astro
{IS_SENTINEL ? (
  <span
    class="newsletter__submit newsletter__submit--disabled"
    role="button"
    aria-disabled="true"
    tabindex="-1"
    data-placeholder={TODO_SUBSTACK_URL}
    title="Link volgt zodra Substack-URL bekend is"
    aria-describedby="newsletter-submit-note"
  >
    {cta}
  </span>
) : (
  <a
    href={subscribeUrl}
    target="_blank"
    rel="noopener noreferrer"
    class="newsletter__submit"
    aria-describedby="newsletter-submit-note"
  >
    {cta}
  </a>
)}
```

**Remove naam field** (lines 63-78) — D-05 removes it entirely; keep only the email field (lines 79-95). Update `newsletter__fields` to single-field layout (no side-by-side needed on desktop when only one field). Update `nl.newsletter.labelNaam` reference removal in destructure line 29.

**CSS unchanged** — `.newsletter__submit` class applies to both `<span>` and `<a>`. `.newsletter__submit--disabled` modifier stays for the sentinel state. The enabled `<a>` does NOT get `--disabled` class.

**Hover/focus on enabled anchor** — add to existing `.newsletter__submit` style block:
```css
.newsletter__submit:not(.newsletter__submit--disabled):hover {
  background-color: var(--color-accent-dark);
  transform: scale(1.02);
}
.newsletter__submit:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```
Transition already present on `.newsletter__submit` — no change needed.

---

### `src/components/sections/Articles.astro` (component, transform — modify)

**Analog:** self (existing file — swap data source, extend ArticleCard type, enable links)

**Current data source** (lines 40-43 — REPLACE this block):
```typescript
const articles = nl.articles.items.map((item) => ({
  ...item,
  isPlaceholder: true as const,
}));
```

**Phase 3 replacement — add imports and sentinel guard** (add after existing imports):
```typescript
import { TODO_SUBSTACK_URL } from '../../config';
import { fetchSubstackFeed, type ArticleCard, type PlaceholderCard } from '../../lib/rss';

const IS_SENTINEL = TODO_SUBSTACK_URL === 'TODO_SUBSTACK_URL';
const substackPublicationUrl = TODO_SUBSTACK_URL;

let articles: ArticleCard[] | PlaceholderCard[];
if (IS_SENTINEL) {
  articles = nl.articles.items.map((item) => ({ ...item, isPlaceholder: true as const }));
} else {
  const feedUrl = `${TODO_SUBSTACK_URL}/feed`;
  const fetched = await fetchSubstackFeed(feedUrl, 3);
  if (fetched.length === 0) {
    console.warn('[Phase 3] Substack feed returned 0 items — rendering placeholder cards.');
    articles = nl.articles.items.map((item) => ({ ...item, isPlaceholder: true as const }));
  } else {
    articles = fetched;
  }
}
```

**Remove old ArticleCard type comment block** (lines 22-31) — the type is now imported from `src/lib/rss.ts`.

**Markup loop changes:**

1. Remove PlaceholderBadge row when not placeholder (lines 65-67):
```astro
{article.isPlaceholder && (
  <div class="articles__badge-row">
    <PlaceholderBadge />
  </div>
)}
```

2. Replace disabled `<span>` "Lees verder" (lines 96-106) with conditional:
```astro
{article.isPlaceholder ? (
  <span
    class="articles__read-more"
    role="link"
    aria-disabled="true"
    tabindex="-1"
    title="Binnenkort beschikbaar"
    aria-label={`Lees "${article.title}" — binnenkort beschikbaar`}
  >
    {nl.common.readMore}
  </span>
) : (
  <a
    href={(article as ArticleCard).href}
    target="_blank"
    rel="noopener noreferrer"
    class="articles__read-more articles__read-more--enabled"
    aria-label={`Lees "${article.title}" op Substack`}
  >
    {nl.common.readMore}
  </a>
)}
```

3. Replace disabled `<span>` "Alle artikelen" (lines 120-130) with conditional:
```astro
{IS_SENTINEL ? (
  <span class="articles__see-all" role="link" aria-disabled="true" tabindex="-1" title="Binnenkort beschikbaar">
    {seeAll}
    <span class="articles__see-all-arrow" aria-hidden="true">→</span>
  </span>
) : (
  <a
    href={substackPublicationUrl}
    target="_blank"
    rel="noopener noreferrer"
    class="articles__see-all articles__see-all--enabled"
  >
    {seeAll}
    <span class="articles__see-all-arrow" aria-hidden="true">→</span>
  </a>
)}
```

**CSS additions** (add to existing `<style>` block — remove `opacity: 0.5; cursor: not-allowed` from enabled states):
```css
/* Enabled "Lees verder" link */
.articles__read-more--enabled {
  opacity: 1;
  cursor: pointer;
}
.articles__read-more--enabled:hover {
  text-decoration: underline;
}
.articles__read-more--enabled:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* Enabled "Alle artikelen" link */
.articles__see-all--enabled {
  opacity: 1;
  cursor: pointer;
}
.articles__see-all--enabled:hover .articles__see-all-arrow {
  transform: translateX(4px);
}
.articles__see-all--enabled:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

---

### `src/i18n/nl.ts` (config, extend)

**Analog:** self (existing file — add `nl.nieuwsbrief` key block)

**Existing structure pattern** (lines 18-36 — copy key/value shape):
```typescript
export const nl = {
  nav: { ... },
  hero: { ... },
  // ... existing keys
  newsletter: { heading, subtext, labelNaam, labelEmail, cta, disclaimer },
  articles:   { heading, seeAll, items: [...] },
};
```

**Add new `nieuwsbrief` key** (append before closing `} as const` or after `articles` key):
```typescript
nieuwsbrief: {
  pageTitle:      'Nieuwsbrief — Milan van der Meulen',
  pageDesc:       'Elke maand eerlijke lessen over ondernemen, schalen en leiderschap. Schrijf je in op Milan\'s Substack nieuwsbrief.',
  eyebrow:        'Nieuwsbrief',
  heading:        'Eerlijke lessen voor ondernemers die willen groeien',
  subtext:        'Elke maand een eerlijke update over ondernemen, schalen en de lessen die ik onderweg leer. Geen spam, geen tips die je al kent.',
  cta:            'Schrijf je in op Substack',
  archiveHeading: 'Eerder verschenen',
  valueProps: [
    { label: 'Eerlijk',      description: 'Geen glansrijke succesverhalen — alleen wat echt werkt.' },
    { label: 'Praktisch',   description: 'Bruikbare lessen, direct uit de founder-praktijk.' },
    { label: 'Maandelijks', description: 'Één update per maand, nooit meer.' },
  ],
},
```

**Remove `labelNaam`** from `nl.newsletter` (the naam field is removed per D-05). Keep `labelEmail`, `cta`, `disclaimer`, `heading`, `subtext`.

---

### `src/config.ts` (config, extend)

**Analog:** self — add derived URL helpers as comments/documentation

**Current sentinel** (line 29):
```typescript
export const TODO_SUBSTACK_URL = 'TODO_SUBSTACK_URL';
```

**No new exports needed** — derived URLs (`/feed`, `/subscribe`) are computed inline in components using template literals. Add a doc comment to the existing constant to document derivation:
```typescript
/**
 * Substack newsletter publication URL.
 * TODO Phase 3: replace with the real Substack publication URL.
 * Derived URLs (computed inline, not exported):
 *   Feed:      `${TODO_SUBSTACK_URL}/feed`       — used by Articles.astro + nieuwsbrief.astro
 *   Subscribe: `${TODO_SUBSTACK_URL}/subscribe`  — used by Newsletter.astro
 * Sentinel check: `TODO_SUBSTACK_URL === 'TODO_SUBSTACK_URL'`
 * Note: strip any trailing slash from the supplied URL before replacing.
 */
export const TODO_SUBSTACK_URL = 'TODO_SUBSTACK_URL';
```

---

### `src/components/layout/Nav.astro` (layout, 1-line change)

**Analog:** self (existing file — line 37 only)

**Current** (`Nav.astro` line 37):
```typescript
{ label: nl.nav.nieuwsbrief, reason: 'Nieuwsbrief pagina volgt in fase 3' },
```

**Phase 3 replacement** (RESEARCH.md §Pattern 5):
```typescript
{ label: nl.nav.nieuwsbrief, href: `${import.meta.env.BASE_URL}nieuwsbrief` },
```

**Active-state pattern** (already handles it — `Nav.astro` lines 57-63):
```astro
{item.href ? (
  <a
    href={item.href}
    class={`nav-link${currentPath.startsWith(item.href) ? ' nav-link--active' : ''}`}
    aria-current={currentPath.startsWith(item.href) ? 'page' : undefined}
  >
    {item.label}
  </a>
) : (
  <span class="nav-link nav-link--disabled" ...>
```
No markup change needed — the existing conditional already handles the `href` case with active state.

Same 1-line change applies to the mobile nav panel (lines 179-202) — the same `navItems` array drives both desktop and mobile nav, so the single array entry change covers both.

---

### `src/components/layout/Footer.astro` (layout, 1-line change)

**Analog:** self (existing file — line 38 only)

**Current** (`Footer.astro` line 38):
```typescript
{ label: nl.nav.nieuwsbrief, reason: 'Nieuwsbrief pagina volgt in fase 3' },
```

**Phase 3 replacement** (same href-or-reason union pattern as Nav.astro):
```typescript
{ label: nl.nav.nieuwsbrief, href: `${import.meta.env.BASE_URL}nieuwsbrief` },
```

**Enabled render pattern** (`Footer.astro` lines 62-64 — already handles it):
```astro
{item.href ? (
  <a href={item.href} class="site-footer__nav-link">
    {item.label}
  </a>
```
No markup change — the existing conditional already renders an `<a>` when `href` is set.

---

### `src/components/sections/Samenwerken.astro` (component, 3-field change)

**Analog:** self (existing file — `ladderCards[0]` object only)

**Current Nieuwsbrief card** (`Samenwerken.astro` lines 41-49):
```typescript
{
  eyebrow:           nl.samenwerken.ladderEyebrow1,
  title:             nl.samenwerken.cards[0].title,
  description:       nl.samenwerken.cards[0].description,
  cta:               nl.samenwerken.cards[0].cta,
  disabled:          true,
  placeholderReason: `Substack-URL nog niet bekend — wordt ingevuld in fase 3 (${TODO_SUBSTACK_URL})`,
  href:              undefined,
  ariaId:            'samenwerken-card-1',
},
```

**Phase 3 replacement** (change 3 fields):
```typescript
{
  eyebrow:           nl.samenwerken.ladderEyebrow1,
  title:             nl.samenwerken.cards[0].title,
  description:       nl.samenwerken.cards[0].description,
  cta:               nl.samenwerken.cards[0].cta,
  disabled:          false,                                              // WAS: true
  placeholderReason: undefined,                                          // WAS: reason string
  href:              `${import.meta.env.BASE_URL}nieuwsbrief`,           // WAS: undefined
  ariaId:            'samenwerken-card-1',
},
```

**Button variant** — the existing card uses `variant="secondary"` (`Samenwerken.astro` line 115). The Nieuwsbrief card CTA uses `Button variant="primary"` per UI-SPEC §Surface 4. Change this card's variant from `secondary` to `primary`, or conditionally apply based on card index. If changing only card 1: update the `ladderCards` data object to include `variant: 'primary'` and pass it to `<Button variant={card.variant ?? 'secondary'}>`.

**No markup or CSS change** — `Button.astro`'s `disabled` prop + `href` prop already drive the enabled/disabled rendering.

---

### `.github/workflows/deploy.yml` (config, event-driven — new file)

**Analog:** none (no existing `.github/workflows/` directory)

**Full YAML to create** (RESEARCH.md §Pattern 4 — verified against Astro deploy docs):
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  schedule:
    - cron: '0 6 * * *'   # Daily at 06:00 UTC — refreshes Substack RSS feed
    # Note: GitHub disables scheduled workflows on repos with no activity for 60+ days.
    # Keep the repo active with periodic pushes. Use workflow_dispatch for manual re-enabling.
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

**Verify before writing:** Confirm `withastro/action@v6` and `actions/deploy-pages@v5` are current at https://github.com/withastro/action before implementation (RESEARCH.md assumption A4).

---

## Shared Patterns

### Sentinel Guard (honest-placeholder-behind-config-constant)
**Source:** `src/config.ts` line 29 + Phase 2 Web3Forms pattern precedent
**Apply to:** `src/lib/rss.ts`, `src/components/sections/Articles.astro`, `src/components/sections/Newsletter.astro`, `src/pages/nieuwsbrief.astro`

```typescript
// The sentinel value is exactly the string 'TODO_SUBSTACK_URL'
const IS_SENTINEL = TODO_SUBSTACK_URL === 'TODO_SUBSTACK_URL';
// Sentinel → placeholder state; non-sentinel → live integration
```

### href-or-reason Union (Nav/Footer item enable)
**Source:** `src/components/layout/Nav.astro` lines 34-40 + `src/components/layout/Footer.astro` lines 35-41
**Apply to:** `Nav.astro`, `Footer.astro`

```typescript
// Pattern: item has either `href` (enabled) or `reason` (disabled)
const navItems = [
  { label: nl.nav.coaching, href: `${import.meta.env.BASE_URL}coaching` },      // enabled
  { label: nl.nav.boek,     reason: 'Boek pagina volgt in fase 5' },             // disabled
];
// Conditional render: item.href → <a>; else → <span aria-disabled>
```

### Honest Disabled CTA
**Source:** `src/components/sections/Articles.astro` lines 96-106 + `src/components/layout/Nav.astro` lines 65-76
**Apply to:** all conditional enabled/disabled elements in Phase 3

```astro
<!-- DISABLED: -->
<span role="link" aria-disabled="true" tabindex="-1" title="Binnenkort beschikbaar">
  label
</span>

<!-- ENABLED (external): -->
<a href={realUrl} target="_blank" rel="noopener noreferrer">
  label
</a>

<!-- ENABLED (internal): -->
<a href={`${import.meta.env.BASE_URL}nieuwsbrief`}>
  label
</a>
```

### BASE_URL Internal Links (CR-01)
**Source:** `src/pages/coaching.astro` lines 50, 53 + `src/components/layout/Nav.astro` lines 35-36
**Apply to:** `src/pages/nieuwsbrief.astro`, `Nav.astro`, `Footer.astro`, `Samenwerken.astro`

```typescript
// ALWAYS prefix internal hrefs with BASE_URL (GitHub Pages subpath)
href={`${import.meta.env.BASE_URL}nieuwsbrief`}   // correct
href="/nieuwsbrief"                                 // WRONG — 404 under /milan-website/
```

### target="_blank" Safety (T-01-04)
**Source:** referenced throughout Phase 1/2 codebase; documented in `Newsletter.astro` header comment
**Apply to:** all external links (`subscribeUrl`, Substack post URLs, Substack publication URL)

```astro
<a href={externalUrl} target="_blank" rel="noopener noreferrer">
  label
</a>
```

### RevealOnScroll Stagger
**Source:** `src/pages/coaching.astro` lines 69, 81
**Apply to:** article card grid in `src/pages/nieuwsbrief.astro`

```astro
{archiveArticles.map((article, i) => (
  <RevealOnScroll delay={i * 80}>
    <Card ...>...</Card>
  </RevealOnScroll>
))}
```

### SectionWrapper + Section Composition
**Source:** `src/pages/coaching.astro` lines 38-137
**Apply to:** `src/pages/nieuwsbrief.astro`

```astro
<SectionWrapper id="section-id" labelledBy="heading-id" variant="default|dark|surface">
  <div class="section-name">
    <h2 id="heading-id" class="section-name__heading">...</h2>
    <!-- section content -->
  </div>
</SectionWrapper>
```
One dark band per page maximum. Yellow only on primary CTA button per section.

---

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `.github/workflows/deploy.yml` | config | event-driven (CI cron) | No `.github/workflows/` directory exists in the repo. Use full YAML from RESEARCH.md §Pattern 4. |

---

## Metadata

**Analog search scope:** `src/pages/`, `src/components/sections/`, `src/components/layout/`, `src/components/ui/`, `src/i18n/`, `src/config.ts`
**Files read:** Articles.astro, Newsletter.astro, Nav.astro, Footer.astro, Samenwerken.astro, coaching.astro, config.ts, nl.ts (lines 1-80)
**Pattern extraction date:** 2026-08-18
