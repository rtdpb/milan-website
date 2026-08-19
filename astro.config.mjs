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
    locales: ['nl', 'en'],
    // D-05: routing.prefixDefaultLocale defaults to false — NL stays at root,
    // EN lives under /en/*. No routing block needed (false is the Astro default).
    // The old commented plan (prefixDefaultLocale: true) would have moved NL to
    // /nl/* — deliberately NOT done here; NL URLs stay at root (D-05).
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'nl',
        locales: {
          nl: 'nl-NL',
          en: 'en',    // D-04: hreflang code 'en' (not 'en-US' — international English)
        },
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
