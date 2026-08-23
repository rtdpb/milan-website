---
quick_id: 260824-lv2
slug: liveliness-iteration-2
status: complete
date: 2026-08-24
---

# Summary — Levendigheid iteratie 2

Meer uitgesproken sevora-scroll-accenten, voortbouwend op [[260824-liv]]. Alles
CSS-only via `animation-timeline`, dubbel afgeschermd (reduced-motion + @supports),
alleen transform/opacity → geen JS, geen layout-risico.

## Gewijzigd

- **src/styles/motion.css** — iteratie-2 blok toegevoegd:
  - `.kin` kinetische kop-accentstreep (zelftekenend, scaleX op entry).
  - `.hero__parallax` hero-foto parallax (scale/drift op scroll(root)).
  - `.tl__rail-fill` timeline-rail die zich vult (scaleY op view()).
- **src/components/sections/Hero.astro** — Picture in `.hero__parallax`-wrapper
  (absolute inset:0) zodat scroll-scale de load-reveal niet raakt.
- **src/components/sections/Timeline.astro** — `.kin` op de kop; `.tl__rail-fill`
  element in de lijst (default collapsed → fallback = grijze rail); `.tl__list`
  position:relative; **pinned header** op ≥1000px (sticky, navy bg, hairline).
- **src/components/sections/Samenwerken.astro** — `.kin` op de sectiekop.

## Verificatie

- `npx astro check` → 0 errors. `npm run build` → 16 pagina's.
- Homepage desktop+mobiel screenshot: layout intact, geen overflow/regressie.
- Gepusht + gedeployed (verzoek klant).

## Robuustheid / fallback

- Geen `animation-timeline`-support of reduced-motion → motion.css doet niets;
  rail-fill blijft collapsed (grijze rail), kop-streep bestaat niet, hero staat
  stil, timeline-header valt terug op normale flow. Content nooit verborgen.

## Iteratie 3 (mogelijk, na feedback)

- `.kin` uitrollen naar subpagina-koppen (`.sec-heading`) NL+EN.
- Woord-voor-woord hero-headline reveal.
- Sticky-kolom variant van de timeline (echte 2-koloms pin) als de klant een
  sterker pinned-effect wil.
