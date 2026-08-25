/**
 * src/lib/rss.ts
 * Substack RSS feed fetch + parse utility.
 *
 * Source: Phase 3 PLAN 03-01, RESEARCH §Pattern 1, PATTERNS §src/lib/rss.ts
 * Security: D-06, T-3-01, T-3-02, T-3-04
 *
 * Design decisions:
 * - Build-time only — no client-side fetch (Substack RSS has no CORS headers, D-02)
 * - removeNSPrefix: false — required to access item['content:encoded'] (RESEARCH Pitfall 1)
 * - Array.isArray normalization — required for 1-item feeds (RESEARCH Pitfall 2)
 * - excerpt derived from description (stripped) — NEVER content:encoded for display (T-3-02)
 * - Pure + deterministic — no Date.now(), no Math.random(), no side effects beyond fetch + console.warn
 */

import { XMLParser } from 'fast-xml-parser';

// ── Types ─────────────────────────────────────────────────────────────────────

export type ArticleCard = {
  category:      string;
  title:         string;
  excerpt:       string;
  date:          string;
  readTime:      string;
  isPlaceholder: false;
  href:          string;   // real Substack post URL
  image:         string;   // Substack cover image URL (from <enclosure>); '' if none
};

export type PlaceholderCard = {
  category:      string;
  title:         string;
  excerpt:       string;
  date:          string;
  readTime:      string;
  isPlaceholder: true;
  // No href — placeholder cards have no real URL
};

// ── XML Parser ────────────────────────────────────────────────────────────────

/**
 * Module-level parser instance — reused across calls.
 * removeNSPrefix: false is MANDATORY so item['content:encoded'] is accessible
 * (default removeNSPrefix: true would collapse it to item['encoded']).
 * See RESEARCH Pitfall 1.
 */
const parser = new XMLParser({
  ignoreAttributes:    false,
  attributeNamePrefix: '@_',
  removeNSPrefix:      false,   // keeps 'content:encoded' and 'dc:creator' as keys
});

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Decodes common HTML entities to their plain-text equivalents.
 * Applied after tag-stripping and before slicing to prevent literal entity
 * strings (e.g. &#8217; → ') in article excerpts, and to avoid mid-entity cuts.
 */
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

/**
 * Derives a Dutch read-time estimate from raw HTML string.
 * Strips tags, splits on whitespace, calculates at 200 wpm (industry standard).
 * Returns minimum "1 min leestijd".
 * Deterministic — same input always produces the same output.
 */
function wordCountToReadTime(html: string): string {
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min leestijd`;
}

/**
 * Formats an RFC 822 pubDate string as a Dutch "maand jaar" display string.
 * Example: "Mon, 04 Aug 2026 10:00:00 GMT" → "augustus 2026"
 * Uses a hard-coded Dutch month-name array — no runtime locale dependency.
 */
/**
 * Right-sizes a Substack CDN image URL by injecting a width into its transform.
 * Substack "fetch" URLs look like:
 *   https://substackcdn.com/image/fetch/$s_!sig!,f_auto,q_auto:good,.../<encoded original>
 * The `$s_!…!` signature is width-independent (Substack's own srcset reuses one
 * signature across many widths), so injecting `w_<n>,c_limit,` yields a smaller,
 * valid image instead of shipping the full-res original (asset discipline).
 * Non-Substack or already-sized URLs are returned unchanged.
 */
export function substackImage(url: string, width: number): string {
  if (!url) return '';
  if (/,w_\d+/.test(url)) return url; // already carries a width
  return url.replace(/(\/image\/fetch\/\$s_![^,]*,)/, `$1w_${width},c_limit,`);
}

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

// ── Parse (pure) ────────────────────────────────────────────────────────────────

/**
 * Parses a Substack RSS XML string into ArticleCard objects (newest-first).
 * Pure + deterministic — no network. Shared by the live fetch below AND by the
 * committed-snapshot fallback in the page components (Substack 403s the GitHub
 * Actions build IP, so the live fetch is unavailable in CI — see fetchSubstackFeed).
 * Returns [] on empty/malformed input.
 */
export function parseFeed(xml: string, maxItems = 3): ArticleCard[] {
  if (!xml) return [];
  let parsed: any;
  try {
    parsed = parser.parse(xml);
  } catch {
    return [];
  }
  const rawItems = parsed?.rss?.channel?.item ?? [];

  // Pitfall 2: fast-xml-parser returns a scalar object (not array) when the
  // feed has exactly one <item>. Normalize to array before .map() to prevent
  // a TypeError that would crash the build as soon as a second post is published.
  const items: any[] = Array.isArray(rawItems) ? rawItems : [rawItems];

  return items.filter(Boolean).slice(0, maxItems).map((item): ArticleCard => {
    // content:encoded is the full article HTML — used ONLY for word count,
    // never for display (no set:html). See T-3-02 / RESEARCH anti-patterns.
    const content = item['content:encoded'] ?? item.description ?? '';

    // <enclosure url="…" type="image/…"> is the post's cover image. May be an
    // array if the feed carries multiple enclosures — take the first image one.
    const enc = Array.isArray(item.enclosure) ? item.enclosure[0] : item.enclosure;
    const image =
      enc && typeof enc === 'object' && String(enc['@_type'] ?? '').startsWith('image')
        ? String(enc['@_url'] ?? '')
        : '';

    return {
      category:      'Artikel',   // neutral static label — RSS has no category field (D-07)
      title:         item.title ?? '',
      // Strip HTML tags then decode entities before slicing — avoids literal
      // entity strings (e.g. &#8217;) and mid-entity cuts in the 160-char excerpt.
      // NEVER render RSS HTML directly (T-3-02).
      excerpt:       decodeEntities(
        (item.description ?? '').replace(/<[^>]+>/g, ' ')
      ).replace(/\s+/g, ' ').trim().slice(0, 160),
      date:          formatPubDate(item.pubDate ?? ''),
      readTime:      wordCountToReadTime(content),
      isPlaceholder: false,
      // WR-02: item.link may be an object when atom:link siblings exist in the feed.
      // fast-xml-parser exposes text content as '#text' when an element also has attributes.
      href:          (typeof item.link === 'string' ? item.link : item.link?.['#text'] ?? ''),
      image,
    };
  });
}

// ── Main Export ───────────────────────────────────────────────────────────────

/**
 * Fetches and parses a Substack RSS feed at build time.
 * Returns an array of ArticleCard objects (newest-first, as delivered by Substack).
 *
 * On any failure (network error, !res.ok, parse error):
 *   - logs a console.warn (visible in build log only, not rendered on page — T-3-04)
 *   - returns [] (caller falls back to placeholder cards per D-06)
 *
 * Security notes:
 *   - Never renders content:encoded with set:html — used only for word count (T-3-02)
 *   - excerpt derives from description stripped to plain text (T-3-02)
 *   - External anchors in the caller must carry rel="noopener noreferrer" (T-3-01)
 *
 * @param feedUrl   Full feed URL, e.g. "https://pub.substack.com/feed"
 * @param maxItems  Maximum number of cards to return (default 3 for homepage)
 * @param timeoutMs Abort timeout in ms — prevents stalled body from hanging the build (WR-01)
 */
export async function fetchSubstackFeed(
  feedUrl: string,
  maxItems = 3,
  timeoutMs = 8000,
): Promise<ArticleCard[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    // Substack returns 403 Forbidden to requests with an empty/library User-Agent
    // (e.g. Node/undici's default) — which is what the GitHub Actions build sends,
    // so the feed silently came back empty in CI while working locally. Send a
    // real browser UA + RSS Accept header so the feed loads at build time too.
    const res = await fetch(feedUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
          '(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
      },
    });
    clearTimeout(timer);
    if (!res.ok) {
      console.warn(`[Phase 3] Substack RSS fetch failed: ${res.status} ${res.statusText}`);
      return [];
    }
    const xml = await res.text();
    return parseFeed(xml, maxItems);
  } catch (err) {
    // Catch all: network errors (ENOTFOUND), XML parse errors, AbortError (timeout), etc.
    // Build must never fail on feed errors — D-06 / T-3-04.
    clearTimeout(timer);
    console.warn('[Phase 3] Substack RSS fetch threw:', err);
    return [];
  }
}
