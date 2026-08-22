/**
 * pressLogos.ts — real media logo files for the "Benoemd in" strip.
 *
 * Maps an outlet name (EXACTLY as used in the i18n `pressStrip.logos` arrays)
 * to a logo file in /public/press-logos. Only outlets with a real, publicly
 * sourced logo file are listed; every other outlet falls back to its plain name
 * rendered in the strip's grey (see PressStrip.astro). The strip forces the
 * logos to greyscale via CSS so they stay quiet and monochrome ("in dat grijs").
 *
 * Sourced from Wikimedia Commons (official outlet logos, editorial "featured in"
 * use). To add another outlet: drop its SVG in /public/press-logos and add the
 * mapping here.
 */
export const pressLogoFiles: Record<string, string> = {
  NOS: 'press-logos/nos.svg',
  'RTL Nieuws': 'press-logos/rtl-nieuws.svg',
  Telegraaf: 'press-logos/telegraaf.svg',
};
