---
quick_id: 260825-l6v
slug: toon-milans-eerste-substack-artikel-op-d
date: 2026-08-25
status: complete
---

# Quick Task 260825-l6v — Toon Milans eerste Substack-artikel

## Aanleiding

Milan publiceerde zijn eerste Substack-post: **"De 'aftermath' van een
faillissement"** (24 aug 2026). De "Recente artikelen"-sectie stond bewust
verborgen tot er echte posts waren (commit `bb1df61`). Nu de feed inhoud heeft,
verschijnt de sectie automatisch bij een herbouw — `TODO_SUBSTACK_URL` staat al
op de echte publicatie-URL en `Articles.astro` rendert alleen bij posts.

## Probleem + fix

Met precies **één** artikel liet de homepage-grid de grote "lead"-kaart links
staan met een **lege rechterkolom** (de `art__col`) — oogde onaf.

**`src/components/sections/Articles.astro`:**
- De lege supporting-kolom wordt niet meer gerenderd wanneer er geen extra posts
  zijn (`rest.length > 0` guard).
- Nieuwe modifier `art__grid--single`: bij één post één begrensde kolom
  (`max-width: 640px`), ook op desktop — een nette, links uitgelijnde "featured"
  kaart i.p.v. een halflege grid. De 2-koloms layout keert automatisch terug
  zodra Milan een tweede post publiceert.

Geen wijziging nodig aan de feed-logica (`rss.ts`) of aan `config.ts`.

## Nevenwerk

- **`scripts/screenshot.js`**: `BASE` stond nog op `/milan-website/` (van vóór de
  root-deploy naar milanvandermeulen.com) → gecorrigeerd naar `/`, zodat de
  snap-tool weer werkt.
- **`src/components/forms/ContactForm.astro`**: ongebruikte `copySubmit`-variabele
  verwijderd (build-warning uit de vorige quick-task 260825-flj opgeruimd).

## Verificatie

- `npm run build` / `npm run snap` — 16 pagina's, 0 errors.
- Screenshot `screenshots/home-desktop.png`: de sectie toont één nette featured
  kaart met blauwe cover, titel, "augustus 2026 · 2 min leestijd" en "Lees
  verder" → naar de Substack-post. Geen lege kolom meer.
