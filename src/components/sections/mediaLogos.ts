/**
 * mediaLogos.ts — outlet logo files for the "In de media" list on the
 * Mijn verhaal / About page.
 *
 * Keyed EXACTLY by the outlet string used in i18n `mijnVerhaal.media[].outlet`.
 * Files live in /public/press-logos (shared with the homepage "Benoemd in"
 * strip). The list renders them greyscale so it stays quiet and monochrome;
 * any outlet without a file here falls back to its name in text.
 */
export const mediaLogoFiles: Record<string, string> = {
  'De Telegraaf': 'press-logos/telegraaf.svg',
  'RTL Nieuws': 'press-logos/rtl-nieuws.svg',
  BNR: 'press-logos/bnr.png',
  NOS: 'press-logos/nos.svg',
  'Dagblad van het Noorden': 'press-logos/dagblad-van-het-noorden.svg',
  'Leeuwarder Courant': 'press-logos/leeuwarder-courant.png',
  'MT/Sprout': 'press-logos/mtsprout.png',
  'De Ondernemer': 'press-logos/deondernemer.svg',
};
