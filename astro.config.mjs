// astro.config.mjs
// Milan van der Meulen personal brand website — Astro 7 configuration
//
// ASSUMPTION [A6 / RESEARCH Open Q1]: Production domain is assumed to be
// 'https://milanvandermeulen.nl'. This affects canonical URLs and the
// generated sitemap. TODO: confirm the exact production domain before first deploy.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // TODO: Confirm production domain before deploying — see ASSUMPTION A6
  site: 'https://milanvandermeulen.nl',
  output: 'static',
  trailingSlash: 'never',

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
