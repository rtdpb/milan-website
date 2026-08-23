---
quick_id: 260824-liv
slug: homepage-liveliness-scroll
status: complete
date: 2026-08-24
---

# Quick Task — Levendigheid: scroll-gekoppelde beweging (iteratie 1)

Klant vindt de site te statisch en verwijst naar sevora.framer.website
(zie [[homepage-liveliness-direction]]). De site heeft al een degelijk motion-
fundament (one-shot `[data-anim]` reveals, count-up, JS-parallax, tekenende
SVG's, scroll-progressbar) — maar reveals vuren **één keer** en daarna staat
alles stil. Het mist het gevoel dat beweging **aan het scrollen gekoppeld** is.

## Aanpak (iteratie 1 — hoogste impact, laag risico)

Nieuwe **CSS-only scroll-gekoppelde ("scrubbed") motion-laag** via
`animation-timeline: view()/scroll()`. Dubbel afgeschermd:
`@media (prefers-reduced-motion: no-preference)` + `@supports (animation-timeline: view())`.
Op oudere browsers / reduced-motion verandert er niets — de bestaande
JS-reveal (of volledig-zichtbaar fallback) blijft de baas. Geen JS, geen libs,
geen layout-wijzigingen (alleen transform/opacity) → hero blijft robuust
([[hero-fragile-avoid-absolute-overlap]]).

1. **`src/styles/motion.css`** (nieuw, geïmporteerd onderaan global.css):
   - Reveals worden **scrubbed** i.p.v. one-shot: `[data-anim]` + `[data-reveal]`
     komen gekoppeld aan hun viewport-entry binnen (rise + subtiele scale).
     Elk element heeft zijn eigen `view()`-timeline → natuurlijke ripple.
   - Richtingsvarianten (left/right/scale) krijgen scrubbed equivalenten.
   - `.anim-kenburns` — headerbeelden schalen/driften langzaam terwijl ze door
     beeld bewegen (Ken Burns, gekoppeld aan scroll).
   - `.anim-drift` — subtiele parallax-drift voor decoratieve elementen.
2. **Toepassen** van `.anim-kenburns` op de fullbleed-headers (Mijn verhaal,
   Spreker) en het coaching-portret.

## Verificatie

- `npx astro check` → 0 errors; `npm run build` → alle pagina's.
- Layout intact op desktop/mobiel (screenshots via [[screenshot-tooling]]).
- Reduced-motion: alles direct zichtbaar, geen beweging.
- Scroll-motion is alleen live/echt te voelen → daarna deployen zodat klant
  het kan ervaren; iteratie 2 (sticky/pinned beats, kinetische koppen) volgt
  op basis van reactie.
