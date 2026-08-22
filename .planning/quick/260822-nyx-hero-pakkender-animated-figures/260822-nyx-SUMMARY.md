---
quick_id: 260822-nyx
slug: hero-pakkender-animated-figures
status: complete
date: 2026-08-22
---

# Summary — Hero pakkender + meer zelfgemaakte geanimeerde figuren

Client vond de homepage te statisch en wilde de hero-foto pakkender + meer
zelfgemaakte, mooi geanimeerde figuren. Geleverd zonder de robuuste hero-grid
aan te tasten (memory: `hero-fragile-avoid-absolute-overlap`).

## Wijzigingen (4 atomic commits)

1. **`src/styles/global.css`** — herbruikbare `.draw-path` scroll-draw utility
   (parallel aan `.growth-curve__path`): elke `<path>` met `.draw-path` binnen een
   `[data-anim]` wrapper tekent zichzelf op scroll. `--draw-len` / `--draw-delay`
   voor lengte/stagger. Reduced-motion pint volledig getekend.

2. **`src/components/sections/Hero.astro`** — foto in een `position:relative`
   `.hero__media` box met drie contained figuren: offset hairline-frame (settelt
   bij load), langzaam roterende dashed ring achter de hoek, zwevende accent-cluster
   met de enige gele stip. Alles `pointer-events:none` + `aria-hidden`, leeft alleen
   in de media-box → grid onaangetast. Foto zelf drijft niet (editorial, niet SaaS).

3. **`src/components/sections/Newsletter.astro`** — zelfgetekend papieren
   vliegtuigje + gebogen vluchtspoor, tekent op scroll, gele neus-stip, contained
   rechtsboven, verborgen < 900px.

4. **`src/components/sections/Samenwerken.astro`** — zelfgetekende underline-swoosh
   (ink-lijn + gele eind-stip) onder de sectiekop, tekent op scroll.

## Verificatie

- `npm run build` slaagt (14 pagina's) — twee keer gedraaid, groen.
- Decoraties contained + `pointer-events:none` + `aria-hidden` → geen layout-/a11y-impact.
- Alle beweging reduced-motion-safe (continue animaties + scroll-draw uitgezet,
  eindstaat zichtbaar); content zonder JS volledig zichtbaar.
- Geel spaarzaam gehouden: line-art in ink/navy hairlines, geel enkel als kleine
  accent-stip.

## Niet gedaan / vervolg

- Geen visuele browser-screenshot: playwright/puppeteer niet geïnstalleerd (niet
  toegevoegd zonder verzoek). Live te checken via `npm run dev`.
- Mogelijke vervolgstappen als client meer wil: scroll-draw figuur in de Story
  (dark band) en een geanimeerde sectie-divider.
