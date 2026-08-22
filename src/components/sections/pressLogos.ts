/**
 * pressLogos.ts — monochrome SVG wordmark "logos" for the "Benoemd in" strip.
 *
 * Each logo is a self-contained inline SVG that draws in a single colour via
 * `currentColor` (fill/stroke), so it inherits the strip's subtle grey (the
 * `.press__name` colour + opacity) automatically — matching the "nog steeds in
 * dat grijs" feedback. Keyed by the EXACT outlet name used in the i18n
 * `pressStrip.logos` arrays (nl.ts / en.ts).
 *
 * These are typographic reproductions of each outlet's wordmark (no official
 * brand files were supplied). To swap in an outlet's real logo, replace the
 * SVG string below for that key with the official single-colour SVG markup
 * (keep `fill="currentColor"` / `stroke="currentColor"` so it stays greyscale).
 */

const sans = `font-family="Arial, 'Helvetica Neue', Helvetica, sans-serif"`;
const serif = `font-family="Georgia, 'Times New Roman', serif"`;

export const pressLogos: Record<string, string> = {
  // NOS — three rounded tiles, the outlet's signature mark.
  NOS: `<svg viewBox="0 0 96 28" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <g fill="none" stroke="currentColor" stroke-width="2">
      <rect x="1" y="1" width="26" height="26" rx="6"/>
      <rect x="35" y="1" width="26" height="26" rx="6"/>
      <rect x="69" y="1" width="26" height="26" rx="6"/>
    </g>
    <g fill="currentColor" ${sans} font-weight="700" font-size="15" text-anchor="middle">
      <text x="14" y="19">N</text><text x="48" y="19">O</text><text x="82" y="19">S</text>
    </g>
  </svg>`,

  // RTL Nieuws — "RTL" in a rounded box + "Nieuws".
  'RTL Nieuws': `<svg viewBox="0 0 134 28" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <rect x="1" y="2" width="54" height="24" rx="4" fill="none" stroke="currentColor" stroke-width="2"/>
    <text x="28" y="19" text-anchor="middle" fill="currentColor" ${sans} font-weight="800" font-size="14" letter-spacing="0.5">RTL</text>
    <text x="63" y="20" fill="currentColor" ${sans} font-weight="600" font-size="15">Nieuws</text>
  </svg>`,

  // De Telegraaf — serif masthead.
  Telegraaf: `<svg viewBox="0 0 156 28" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <text x="0" y="21" fill="currentColor" ${serif} font-weight="700" font-size="20">De Telegraaf</text>
  </svg>`,

  // Quote — bold serif wordmark.
  Quote: `<svg viewBox="0 0 80 28" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <text x="0" y="22" fill="currentColor" ${serif} font-weight="700" font-size="22" letter-spacing="-0.5">Quote</text>
  </svg>`,

  // MT/Sprout — "MT/" bold + "Sprout" medium.
  'MT Sprout': `<svg viewBox="0 0 118 28" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <text x="0" y="20" fill="currentColor" ${sans} font-size="18"><tspan font-weight="800">MT/</tspan><tspan font-weight="600">Sprout</tspan></text>
  </svg>`,

  // EenVandaag — one word, "Een" bold + "Vandaag" medium.
  EenVandaag: `<svg viewBox="0 0 126 28" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <text x="0" y="20" fill="currentColor" ${sans} font-size="18"><tspan font-weight="800">Een</tspan><tspan font-weight="600">Vandaag</tspan></text>
  </svg>`,

  // De Ondernemer — "de" light + "Ondernemer" bold.
  'De Ondernemer': `<svg viewBox="0 0 150 28" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <text x="0" y="20" fill="currentColor" ${sans} font-size="18"><tspan font-weight="400">de </tspan><tspan font-weight="800">Ondernemer</tspan></text>
  </svg>`,
};
