---
quick_id: 260822-lgo
slug: milan-bold-media-logos
status: complete
date: 2026-08-22
---

# Quick Task — Milan vet + media-logo's ("Benoemd in")

Twee openstaande feedbackpunten die nog niet verwerkt waren:

1. **Wordmark** — alléén "Milan" dikgedrukt; "van der Meulen" in normaal
   gewicht. Geldt voor header, mobiel menu en footer. Kapitalen blijven.
2. **"Benoemd in" logo's** — de platte tekstnamen vervangen door echte
   media-logo's, gerenderd in hetzelfde subtiele grijs (monochroom). Outlets:
   MT/Sprout, Quote, NOS, RTL Nieuws, EenVandaag, De Telegraaf, De Ondernemer.
   PressStrip is gedeeld → geldt voor homepage én coaching, NL + EN.

## Aanpak

- Nav.astro / Footer.astro: wordmark splitsen in `Milan` (vet) + rest (normaal).
- Nieuwe `src/components/sections/pressLogos.ts` met inline monochrome SVG-
  wordmarks per outlet (fill/stroke = currentColor → erft het grijs).
- PressStrip.astro rendert de SVG i.p.v. platte tekst; tekstnaam blijft als
  aria-label/sr-only voor toegankelijkheid. i18n `logos`-lijst blijft de
  canonieke outlet-volgorde (NL+EN).

## Verificatie

- `npm run build` slaagt (0 errors).
- Wordmark: "Milan" duidelijk zwaarder dan "van der meulen".
- PressStrip toont logo's in grijs, marquee loopt, reduced-motion wrapt.
