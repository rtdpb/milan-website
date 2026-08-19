#!/usr/bin/env node
/**
 * scripts/smoke-i18n.js
 * Post-build i18n smoke check — zero dependencies, Node 18+ (ES module).
 *
 * Run after `npm run build`:
 *   node scripts/smoke-i18n.js
 *
 * Asserts:
 *   (a) dist/en/index.html exists
 *   (b) dist/en/index.html contains lang="en"
 *       dist/index.html contains lang="nl"
 *   (c) dist/index.html contains hreflang="nl", hreflang="en", hreflang="x-default"
 *   (d) The generated sitemap under dist/ contains an /en/ URL
 *
 * Exits 0 with "I18N_SMOKE_OK" on full pass.
 * Exits 1 with a descriptive message on any failure.
 *
 * Phase 4: I18N-01, I18N-02
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Locate dist/ relative to the repo root ────────────────────────────────
const repoRoot = path.resolve(__dirname, '..');
const distDir  = path.join(repoRoot, 'dist');

// Guard: dist/ must exist (user must run npm run build first)
if (!fs.existsSync(distDir)) {
  console.error(
    '[smoke-i18n] FAIL: dist/ directory not found.\n' +
    '  Run `npm run build` first, then re-run this script.'
  );
  process.exit(1);
}

// ── Helper: read a file, exit non-zero if missing ─────────────────────────
function readFile(filePath, label) {
  if (!fs.existsSync(filePath)) {
    console.error(`[smoke-i18n] FAIL: ${label} not found.\n  Expected: ${filePath}`);
    process.exit(1);
  }
  return fs.readFileSync(filePath, 'utf-8');
}

// ── Helper: assert a string contains a substring ──────────────────────────
function assertContains(content, substring, description) {
  if (!content.includes(substring)) {
    console.error(
      `[smoke-i18n] FAIL: ${description}\n` +
      `  Expected to find: ${JSON.stringify(substring)}`
    );
    process.exit(1);
  }
}

// ── (a) dist/en/index.html must exist ────────────────────────────────────
const enIndexPath = path.join(distDir, 'en', 'index.html');
const enIndex     = readFile(enIndexPath, 'dist/en/index.html');

// ── (b) Language attributes ───────────────────────────────────────────────
assertContains(enIndex, 'lang="en"', 'dist/en/index.html must contain lang="en"');

const nlIndexPath = path.join(distDir, 'index.html');
const nlIndex     = readFile(nlIndexPath, 'dist/index.html');
assertContains(nlIndex, 'lang="nl"', 'dist/index.html must contain lang="nl"');

// ── (c) hreflang alternates on NL root page ───────────────────────────────
assertContains(nlIndex, 'hreflang="nl"',        'dist/index.html must contain hreflang="nl"');
assertContains(nlIndex, 'hreflang="en"',        'dist/index.html must contain hreflang="en"');
assertContains(nlIndex, 'hreflang="x-default"', 'dist/index.html must contain hreflang="x-default"');

// Also verify hreflang on the EN page
assertContains(enIndex, 'hreflang="nl"',        'dist/en/index.html must contain hreflang="nl"');
assertContains(enIndex, 'hreflang="en"',        'dist/en/index.html must contain hreflang="en"');
assertContains(enIndex, 'hreflang="x-default"', 'dist/en/index.html must contain hreflang="x-default"');

// ── (d) Sitemap contains an /en/ URL ──────────────────────────────────────
// @astrojs/sitemap may output sitemap-index.xml + sitemap-0.xml, or sitemap.xml
const sitemapCandidates = [
  path.join(distDir, 'sitemap.xml'),
  path.join(distDir, 'sitemap-0.xml'),
];

let sitemapContent = '';
for (const candidate of sitemapCandidates) {
  if (fs.existsSync(candidate)) {
    sitemapContent += fs.readFileSync(candidate, 'utf-8');
  }
}

if (!sitemapContent) {
  // Try a glob-like search for any sitemap file in dist/
  const distFiles = fs.readdirSync(distDir);
  const sitemapFiles = distFiles.filter(f => f.startsWith('sitemap') && f.endsWith('.xml'));
  for (const sf of sitemapFiles) {
    sitemapContent += fs.readFileSync(path.join(distDir, sf), 'utf-8');
  }
}

if (!sitemapContent) {
  console.error(
    '[smoke-i18n] FAIL: No sitemap XML file found in dist/.\n' +
    '  Run `npm run build` and ensure @astrojs/sitemap is configured.'
  );
  process.exit(1);
}

if (!sitemapContent.includes('/en/')) {
  console.error(
    '[smoke-i18n] FAIL: Sitemap does not contain any /en/ URL.\n' +
    '  Ensure astro.config.mjs i18n locales includes "en" and the sitemap i18n block has en: "en".'
  );
  process.exit(1);
}

// ── (e) Phase 5 BOOK-01: /boek and /en/book pages exist + content assertions ─
// CR-04 + IN-03: assert existence AND content properties of both book pages.
// Existence-only checks silently pass even if both pages render in the wrong locale.
const nlBoekPath = path.join(distDir, 'boek', 'index.html');
const enBookPath = path.join(distDir, 'en', 'book', 'index.html');

const nlBoekContent = readFile(nlBoekPath, 'dist/boek/index.html');
const enBookContent = readFile(enBookPath, 'dist/en/book/index.html');

// Assert lang attributes (guards locale misconfiguration)
assertContains(nlBoekContent, 'lang="nl"', 'dist/boek/index.html must contain lang="nl"');
assertContains(enBookContent, 'lang="en"', 'dist/en/book/index.html must contain lang="en"');

// Assert NL page uses NL copy (eyebrow "Binnenkort" — guards locale fallback regression)
assertContains(nlBoekContent, 'Binnenkort', 'dist/boek/index.html must contain NL eyebrow "Binnenkort"');

// Assert EN page uses EN copy — no Dutch leak on EN book page (D-04)
assertContains(enBookContent, 'Coming Soon', 'dist/en/book/index.html must contain EN eyebrow "Coming Soon"');

// Assert hreflang alternates on NL book page (IN-03: guards BaseLayout nlSlug/enSlug)
assertContains(nlBoekContent, 'hreflang="nl"', 'dist/boek/index.html must have hreflang="nl"');
assertContains(nlBoekContent, 'hreflang="en"', 'dist/boek/index.html must have hreflang="en"');
assertContains(nlBoekContent, '/en/book',       'dist/boek/index.html hreflang must reference /en/book');

// Assert hreflang alternates on EN book page (IN-03)
assertContains(enBookContent, 'hreflang="nl"', 'dist/en/book/index.html must have hreflang="nl"');
assertContains(enBookContent, 'hreflang="en"', 'dist/en/book/index.html must have hreflang="en"');
assertContains(enBookContent, '/boek',          'dist/en/book/index.html hreflang must reference /boek');

console.log('[smoke-i18n] /boek + /en/book page content assertions: OK');

// ── All checks passed ─────────────────────────────────────────────────────
console.log('I18N_SMOKE_OK');
