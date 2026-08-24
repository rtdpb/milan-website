/**
 * speakerLogos.ts — real organisation logo files for the spreker page's
 * "Eerder gesproken bij" grid.
 *
 * Maps an organisation name (EXACTLY as used in the i18n `spreker.spokenAt`
 * array) to a logo file in /public/speaker-logos. Only organisations with a
 * real, publicly-sourced logo file are listed; every other organisation falls
 * back to its plain name centred in the card (see spreker.astro). The grid
 * forces the logos to pure white via a CSS filter so the section stays
 * monochrome on the dark band (matches Milan's own design).
 *
 * To add another organisation: drop its file (SVG or transparent PNG) in
 * /public/speaker-logos and add the mapping here, keyed by the exact spokenAt
 * string. Prefer SVG / transparent PNG — a solid-background image would render
 * as a white block under the `brightness(0) invert(1)` filter.
 */
export const speakerLogoFiles: Record<string, string> = {
  'ABN AMRO MeesPierson': 'speaker-logos/abnamro.svg',
  'Sziget Festival': 'speaker-logos/sziget.svg',
  'University College London': 'speaker-logos/ucl.svg',
  'Energy Tech Summit': 'speaker-logos/energy-tech-summit.png',
  'Van Hall Larenstein': 'speaker-logos/van-hall-larenstein.png',
  'Plus Supermarkt': 'speaker-logos/plus.svg',
  Rabobank: 'speaker-logos/rabobank.svg',
  'Hanze University of Applied Sciences': 'speaker-logos/hanze.png',
  'Van Dorp Installaties': 'speaker-logos/van-dorp.svg',
  'University of Groningen': 'speaker-logos/rug.svg',
  Mazda: 'speaker-logos/mazda.svg',
  // No clean, monochrome-friendly asset sourced yet (fall back to the org name):
  // 'World Youth Forum', 'NHL Stenden', 'Climate Reality Project', 'Ennatuurlijk'
  // (Ennatuurlijk's only asset is a filled shape that flattens to a white blob
  // under the brightness(0) invert(1) filter — needs a proper wordmark).
};

/**
 * Icon-only marks (crest / symbol, no wordmark asset). These are roughly square,
 * so the grid gives them a touch more height than the horizontal wordmarks.
 */
export const speakerLogoSquare: Record<string, true> = {
  'University College London': true,
  Mazda: true,
  'Energy Tech Summit': true,
};
