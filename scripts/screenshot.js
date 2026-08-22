/**
 * screenshot.js — capture screenshots with Playwright + Chromium.
 *
 * Astro 7's `preview` runs as a background daemon, so this script starts it,
 * waits until it answers, captures desktop + mobile PNGs (full page), then stops
 * the daemon. It prepends the config `base` so routes resolve, and waits/scrolls
 * so scroll-triggered [data-anim] figures have drawn. Reduced-motion is NOT
 * forced, so animations render.
 *
 * Usage:
 *   node scripts/screenshot.js                 # homepage → screenshots/
 *   node scripts/screenshot.js nieuwsbrief     # a specific route (NO leading slash)
 *   node scripts/screenshot.js nieuwsbrief out # custom output dir
 *
 * NOTE: pass routes WITHOUT a leading slash — Git Bash (MSYS) rewrites a lone
 * "/" argument into a Windows path. The script strips a leading slash anyway,
 * but a mangled absolute path is detected and treated as the homepage.
 *
 * Requires a prior `npm run build` (preview serves dist/).
 */
import { chromium } from 'playwright';
import { execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';

const BASE = '/milan-website/'; // keep in sync with astro.config.mjs `base`
const PORT = 4331;
const HOST = '127.0.0.1'; // bind IPv4 explicitly — Node fetch resolves localhost to IPv4
const origin = `http://${HOST}:${PORT}`;

let route = process.argv[2] || '/';
// Guard against MSYS mangling a "/" arg into an absolute Windows path.
if (/^[A-Za-z]:[\\/]/.test(route) || route.includes(':/')) route = '/';
const outDir = process.argv[3] || 'screenshots';
// Join BASE + route without doubling slashes.
const path = (BASE.replace(/\/$/, '') + '/' + route.replace(/^\//, '')).replace(/\/{2,}/g, '/');
const url = origin + path;
const healthUrl = origin + BASE; // stable readiness probe, independent of route

mkdirSync(outDir, { recursive: true });

const sh = (cmd) => execSync(cmd, { stdio: 'ignore', shell: true });

async function waitForServer(u, tries = 60) {
  let lastErr = 'none';
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(u);
      if (res.ok) return;
      lastErr = 'status ' + res.status;
    } catch (e) {
      lastErr = e.cause?.code || e.message;
    }
    await sleep(500);
  }
  throw new Error('preview server did not answer in time — last: ' + lastErr + ' — url: ' + u);
}

const slug = route.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'home';

try {
  try { sh(`npx astro preview stop`); } catch { /* none running */ }
  sh(`npx astro preview --host ${HOST} --port ${PORT}`); // starts daemon, returns immediately
  await waitForServer(healthUrl);

  const browser = await chromium.launch();
  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'mobile', width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    await page.goto(url, { waitUntil: 'networkidle' });
    await sleep(1200); // hero entrance settle

    // Scroll gradually top→bottom so EVERY section's IntersectionObserver fires
    // (a direct jump to the bottom skips the middle, leaving reveals at opacity:0).
    await page.evaluate(async () => {
      const step = Math.round(window.innerHeight * 0.6);
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 220));
      }
    });
    await sleep(600); // let the last section's draw-on-scroll finish
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(500);

    const file = `${outDir}/${slug}-${vp.name}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log('wrote', file);

    // Desktop-only hero close-up for detail review of the animated figures.
    if (vp.name === 'desktop') {
      const hero = `${outDir}/${slug}-${vp.name}-hero.png`;
      await page.screenshot({ path: hero, clip: { x: 0, y: 0, width: vp.width, height: 820 } });
      console.log('wrote', hero);
    }
    await page.close();
  }

  await browser.close();
} finally {
  try { sh(`npx astro preview stop`); } catch { /* already stopped */ }
}
