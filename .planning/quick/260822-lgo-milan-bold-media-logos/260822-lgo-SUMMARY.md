---
quick_id: 260822-lgo
slug: milan-bold-media-logos
status: complete
date: 2026-08-22
---

# Summary — Milan vet + media-logo's ("Benoemd in")

Twee feedbackpunten die nog openstonden, alsnog verwerkt (`f6ff48e`, `4974d3b`).
Gebouwd (0 errors, 16 pagina's) en visueel gecontroleerd via Playwright.

## Gedaan

**1. Wordmark — alleen "Milan" vet** (`f6ff48e`)
- Nav.astro (header + mobiel menu) en Footer.astro: naam gesplitst in
  `Milan` (font-weight 800) + `van der Meulen` (font-weight 400). Kapitalen
  behouden. Basisgewicht van de wordmark → 500.
- Visueel bevestigd: header toont "**MILAN** van der meulen".

**2. "Benoemd in" — echte logo's i.p.v. platte tekst** (`4974d3b`)
- Nieuwe `src/components/sections/pressLogos.ts`: inline monochrome SVG-
  wordmark-logo's per outlet, getekend met `currentColor` zodat ze het
  bestaande grijs (`.press__name` kleur + opacity 0.42) erven.
- Outlets: MT/Sprout, Quote, NOS (drie tegels), RTL Nieuws, EenVandaag,
  De Telegraaf, de Ondernemer.
- PressStrip.astro rendert de SVG + `sr-only` outletnaam (toegankelijkheid);
  valt terug op platte tekst als er geen logo gedefinieerd is.
- Gedeelde component → geldt voor homepage én coaching, NL + EN.
- Visueel bevestigd (reduced-motion crop): alle 7 logo's renderen in grijs.

**3. Samenwerken #12 — nieuwsbrief licht, spreker/coaching donker**
- Gratis Nieuwsbrief-kaart nu in lichte stijl, links (spant beide rijen);
  Presentatie + 1:1 Coaching donker, verticaal gestapeld rechts → nadruk op
  de betaalde diensten. Verving de eerdere "3 donkere kaarten naast elkaar".

**4. Nieuwsbrief inline mailveld**
- Newsletter.astro: inline `Mailadres`-invoerveld + knop. Native GET-submit
  stuurt het adres naar Substack `/subscribe?email=…` (werkt zonder JS, geen
  nep-succes). JS vuurt alleen de Plausible-goal. Doorstuur-notitie behouden.

## Let op / vervolg

- De logo's zijn **typografische reproducties** (geen officiële merkbestanden
  aangeleverd). Officiële SVG's kunnen 1-op-1 in `pressLogos.ts` per outlet
  vervangen worden (houd `fill/stroke="currentColor"` aan voor het grijs).
- Samenwerken-layout (#12) is een interpretatie van "verticaal + nieuwsbrief
  licht"; exacte ordening/verhouding makkelijk bij te stellen.

## Verificatie

- `npm run build` → 0 errors, 16 pagina's.
- `npm run snap` + gerichte `.press`-crops (desktop, reduced-motion).
