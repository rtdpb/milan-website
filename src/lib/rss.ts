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
function formatPubDate(pubDate: string): string {
  const d = new Date(pubDate);
  const months = [
    'januari', 'februari', 'maart', 'april', 'mei', 'juni',
    'juli', 'augustus', 'september', 'oktober', 'november', 'december',
  ];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
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
 * @param feedUrl  Full feed URL, e.g. "https://pub.substack.com/feed"
 * @param maxItems Maximum number of cards to return (default 3 for homepage)
 */
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
    const rawItems = parsed?.rss?.channel?.item ?? [];

    // Pitfall 2: fast-xml-parser returns a scalar object (not array) when the
    // feed has exactly one <item>. Normalize to array before .map() to prevent
    // a TypeError that would crash the build as soon as a second post is published.
    const items: any[] = Array.isArray(rawItems) ? rawItems : [rawItems];

    return items.slice(0, maxItems).map((item): ArticleCard => {
      // content:encoded is the full article HTML — used ONLY for word count,
      // never for display (no set:html). See T-3-02 / RESEARCH anti-patterns.
      const content = item['content:encoded'] ?? item.description ?? '';

      return {
        category:      'Artikel',   // neutral static label — RSS has no category field (D-07)
        title:         item.title ?? '',
        // Strip HTML tags from description for excerpt — NEVER render RSS HTML directly
        excerpt:       (item.description ?? '').replace(/<[^>]+>/g, ' ').slice(0, 160),
        date:          formatPubDate(item.pubDate ?? ''),
        readTime:      wordCountToReadTime(content),
        isPlaceholder: false,
        href:          item.link ?? '',
      };
    });
  } catch (err) {
    // Catch all: network errors (ENOTFOUND), XML parse errors, etc.
    // Build must never fail on feed errors — D-06 / T-3-04.
    console.warn('[Phase 3] Substack RSS fetch threw:', err);
    return [];
  }
}
