/**
 * pull-articles.mjs — refresh the committed Substack feed snapshot.
 *
 * WHY: Substack (behind Cloudflare) returns 403 Forbidden to the GitHub Actions
 * build's datacenter IP, so the live RSS fetch in src/lib/rss.ts is unavailable
 * in CI. To guarantee the "Recente artikelen" section renders, we commit a raw
 * snapshot of the feed XML that the page components parse as a fallback.
 *
 * Run this from a normal (residential) network whenever Milan publishes a new
 * post, then commit the updated src/data/substack-feed.xml:
 *
 *   npm run articles:pull
 *   git add src/data/substack-feed.xml && git commit -m "content: refresh articles snapshot"
 *
 * Local dev still uses the LIVE feed first (fetchSubstackFeed); this snapshot is
 * only the fallback the deployed build relies on.
 */
import { writeFileSync, mkdirSync } from 'node:fs';

const FEED_URL = 'https://milanvandermeulen.substack.com/feed';
const OUT = new URL('../src/data/substack-feed.xml', import.meta.url);

const res = await fetch(FEED_URL, {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
      '(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    'Accept': 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
  },
});

if (!res.ok) {
  console.error(`[pull-articles] fetch failed: ${res.status} ${res.statusText}`);
  process.exit(1);
}

const xml = await res.text();
mkdirSync(new URL('../src/data/', import.meta.url), { recursive: true });
writeFileSync(OUT, xml, 'utf8');

const count = (xml.match(/<item>/g) || []).length;
console.log(`[pull-articles] wrote ${count} item(s) to src/data/substack-feed.xml`);
