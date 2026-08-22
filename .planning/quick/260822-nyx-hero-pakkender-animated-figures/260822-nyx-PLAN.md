---
quick_id: 260822-nyx
slug: hero-pakkender-animated-figures
status: in-progress
date: 2026-08-22
---

# Quick Task — Hero pakkender + meer zelfgemaakte geanimeerde figuren

**Client wens:** homepage voelt te statisch; hero-foto mag pakkender, en er mogen
meer zelfgemaakte, mooi geanimeerde figuren op de pagina. (Zie memory:
`homepage-liveliness-direction`, en `hero-fragile-avoid-absolute-overlap` — GEEN
fragiele absolute-overlap die de layout breekt.)

## Ontwerpprincipes (guardrails)

- Robuuste hero-grid blijft ongewijzigd. Decoratie leeft binnen een `position:
  relative` media-wrapper, `pointer-events:none`, `aria-hidden`, sectie clipt
  overflow → kan de layout niet breken.
- Geel spaarzaam (merkregel): line-art in ink/navy hairlines, geel alleen als
  kleine accent-punt/detail.
- Alle beweging reduced-motion-safe: continue animaties + scroll-draw uit onder
  `prefers-reduced-motion: reduce`; content zonder JS volledig zichtbaar.
- Scroll-getekende figuren hergebruiken het bestaande `[data-anim].is-in` +
  `stroke-dashoffset` mechanisme (zoals GrowthCurve).

## Taken

1. **global.css** — generieke `.draw-path` scroll-draw utility toevoegen (parallel
   aan `.growth-curve__path`) + reduced-motion pin. Herbruikbaar voor nieuwe
   zelfgetekende line-art.

2. **Hero.astro** — pakkender-behandeling: `.hero__media` wrapper met contained
   geanimeerde decoraties (offset hairline-frame achter de foto, langzaam
   roterende dashed ring die achter een hoek piept, zwevende accent-dots, subtiele
   continue float op de foto). Grid ongewijzigd, reduced-motion-safe.

3. **Newsletter.astro** — zelfgetekend line-art papieren vliegtuigje + gestippeld
   vluchtspoor, contained rechtsboven, tekent zich op scroll, verborgen op smalle
   schermen.

4. **Samenwerken.astro** — kleine zelfgetekende accent-flourish (underline-swoosh)
   onder de sectiekop, tekent zich op scroll.

## Verificatie

- `npm run build` slaagt.
- Geen layout-regressie in hero op <900px (geen full-width blow-out / clipping).
- Decoraties `aria-hidden` + `pointer-events:none`; geen a11y-impact.
- Reduced-motion: alle figuren volledig zichtbaar, geen beweging.
