// astro.config.mjs
// Milan van der Meulen personal brand website — Astro 7 configuration
//
// ASSUMPTION [A6 / RESEARCH Open Q1]: Production domain is assumed to be
// 'https://milanvandermeulen.nl'. This affects canonical URLs and the
// generated sitemap. TODO: confirm the exact production domain before first deploy.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Deployed to GitHub Pages on the custom apex domain milanvandermeulen.com
  // (public/CNAME pins the domain so it survives every workflow deploy).
  // Root deploy — no `base` path. If the domain ever changes, update `site`
  // and public/CNAME together.
  site: 'https://milanvandermeulen.com',
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
