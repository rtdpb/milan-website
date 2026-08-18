// astro.config.mjs
// Milan van der Meulen personal brand website — Astro 7 configuration
//
// ASSUMPTION [A6 / RESEARCH Open Q1]: Production domain is assumed to be
// 'https://milanvandermeulen.nl'. This affects canonical URLs and the
// generated sitemap. TODO: confirm the exact production domain before first deploy.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Deployed to a GitHub Pages PROJECT site under the rtdpb account:
  //   https://rtdpb.github.io/milan-website/
  // When the real domain (e.g. milanvandermeulen.nl) is ready:
  //   set `site` to it and REMOVE `base` (root deploys need no base path).
  site: 'https://rtdpb.github.io',
  base: '/milan-website/',
  output: 'static',
  trailingSlash: 'ignore',

  i18n: {
    defaultLocale: 'nl',
    locales: ['nl'],
    // Phase 4 — EN locale addition (one-time refactor):
    // locales: ['nl', 'en'],
    // prefixDefaultLocale: true,
    // When enabled: NL moves to /nl/*, EN lives at /en/*
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'nl',
        locales: { nl: 'nl-NL' },
      },
    }),
  ],

  image: {
    // Use sharp for AVIF/WebP generation at build time (FND-10)
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
