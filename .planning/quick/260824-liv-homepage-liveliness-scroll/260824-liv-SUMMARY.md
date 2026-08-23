---
quick_id: 260824-liv
slug: homepage-liveliness-scroll
status: complete
date: 2026-08-24
---

# Summary — Levendigheid: scroll-gekoppelde beweging (iteratie 1)

Reactie op "te statisch / meer zoals sevora" ([[homepage-liveliness-direction]]).
De site had al reveals + parallax + count-up, maar reveals vuurden één keer.
Iteratie 1 maakt beweging **gekoppeld aan het scrollen** ("scrubbed"), site-breed.

## Gewijzigd

- **src/styles/motion.css** (nieuw) — CSS-only scroll-gekoppelde motion-laag via
  `animation-timeline: view()/scroll()`. Dubbel afgeschermd:
  `@media (prefers-reduced-motion: no-preference)` + `@supports (animation-timeline: view())`.
  - `[data-anim]` én `[data-reveal]` reveals worden gescrubd op viewport-entry
    (rise + subtiele scale), elk met eigen `view()`-timeline → natuurlijke ripple.
    Range in de `entry`-fase, dus de reveal voltooit altijd (ook onderaan de pagina).
  - Richtingsvarianten (left/right/scale) → scrubbed keyframes.
  - `.anim-kenburns` — headerbeelden schalen/driften langzaam terwijl ze door
    beeld bewegen (Ken Burns).
  - `.anim-drift` — subtiele decoratieve parallax-utility (nog niet toegepast).
- **src/styles/global.css** — `@import './motion.css'` toegevoegd.
- **.anim-kenburns** toegepast op de fullbleed-headers (Mijn verhaal + Spreker)
  en het coaching-portret — NL **en** EN (6 pagina's).

## Waarom robuust

- Geen JS, geen libs, alleen transform/opacity → geen layout-risico, hero blijft
  intact ([[hero-fragile-avoid-absolute-overlap]]).
- Op oudere browsers (geen `animation-timeline`) én onder reduced-motion doet
  motion.css **niets**; de bestaande JS-reveal (of volledig-zichtbaar fallback)
  blijft de baas. Content kan nooit verborgen blijven hangen.

## Verificatie

- `npx astro check` → 0 errors. `npm run build` → 16 pagina's.
- Screenshots (home + mijn-verhaal, desktop+mobiel): layout intact, geen
  overflow, Ken Burns-header rendert correct. Scroll-motion is alleen **live**
  echt te voelen.

## Iteratie 2 (voorstel, na feedback klant)

- Sticky/pinned editorial beats (bv. Timeline-kop blijft staan terwijl mijlpalen
  langsscrollen).
- Kinetische koppen (regel-/woord-reveal, gele underline-wipe op scroll).
- Hero-foto die subtiel op page-scroll reageert (parallax) — zorgvuldig i.v.m.
  fullbleed-rand.
