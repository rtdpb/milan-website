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

// ── All checks passed ─────────────────────────────────────────────────────
console.log('I18N_SMOKE_OK');
