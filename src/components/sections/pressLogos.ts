/**
 * pressLogos.ts — real media logo files for the "Benoemd in" strip.
 *
 * Maps an outlet name (EXACTLY as used in the i18n `pressStrip.logos` arrays)
 * to a logo file in /public/press-logos. Only outlets with a real, publicly
 * sourced logo file are listed; every other outlet falls back to its plain name
 * rendered in the strip's grey (see PressStrip.astro). The strip forces the
 * logos to greyscale via CSS so they stay quiet and monochrome ("in dat grijs").
 *
 * Sources: NOS / RTL Nieuws / De Telegraaf from Wikimedia Commons; MT/Sprout,
 * Quote and EenVandaag from each outlet's own site (official logo assets,
 * editorial "featured in" use). To add another outlet: drop its file in
 * /public/press-logos and add the mapping here.
 */
export const pressLogoFiles: Record<string, string> = {
  NOS: 'press-logos/nos.svg',
  'RTL Nieuws': 'press-logos/rtl-nieuws.svg',
  Telegraaf: 'press-logos/telegraaf.svg',
  'MT Sprout': 'press-logos/mtsprout.png',
  Quote: 'press-logos/quote.svg',
  EenVandaag: 'press-logos/eenvandaag.png',
  'De Ondernemer': 'press-logos/deondernemer.svg',
};

/**
 * Outlets whose only available asset is a square icon-mark (not a horizontal
 * wordmark). The strip gives these a bit more height so they read at a similar
 * visual weight to the wordmarks.
 */
export const pressLogoSquare: Record<string, true> = {
  EenVandaag: true,
  'De Ondernemer': true,
};
