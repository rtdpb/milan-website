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

## Nagekomen fix — Substack 403 in CI → gecommitte snapshot-fallback

Eerste deploy toonde het artikel NIET live: de GitHub Actions-build kreeg
`Substack RSS fetch failed: 403 Forbidden`. Een browser-`User-Agent` meesturen
hielp NIET (ook 403), dus het is geen UA- maar een **IP-blokkade**: Substack zit
achter Cloudflare, dat het datacenter-IP van de GitHub-runner tegenhoudt. Lokaal
werkt de fetch wél (residentieel IP).

Betrouwbare oplossing zonder flaky proxy — een **gecommitte snapshot van de feed**
als fallback:
- **`src/lib/rss.ts`** — parse-logica losgetrokken in een pure `parseFeed(xml)`
  (gedeeld door de live fetch én de fallback); browser-UA blijft meegestuurd voor
  waar het wél mag.
- **`scripts/pull-articles.mjs`** + `npm run articles:pull` — haalt de feed op
  (werkt lokaal) en schrijft **`src/data/substack-feed.xml`**.
- **`src/data/substack-feed.xml`** — de gecommitte snapshot (nu 1 item).
- Consumers (`Articles.astro`, `nieuwsbrief.astro`, `en/newsletter.astro`) doen
  eerst de live fetch; bij 0 resultaten (CI) vallen ze terug op
  `parseFeed(snapshot)` via een Vite `?raw`-import. Lokaal = live/vers, CI = snapshot.
- **`src/env.d.ts`** — type-declaratie voor de `*.xml?raw`-import (astro check).

Onderhoud: als Milan een nieuw artikel plaatst → `npm run articles:pull` draaien
en `src/data/substack-feed.xml` committen.

### Meegenomen consistentie-fix (EN)
`src/pages/en/newsletter.astro` toonde bij een lege feed nog **placeholder
"Example"-kaarten** (oude Phase-4-pad) — in strijd met de client-feedback "geen
voorbeeldkaarten". Nu gelijkgetrokken met NL: snapshot-fallback + de archief-sectie
wordt volledig verborgen als er geen echte posts zijn.

## Verificatie

- `npm run build` / `npm run snap` — 16 pagina's, 0 errors.
- Screenshot `screenshots/home-desktop.png`: de sectie toont één nette featured
  kaart met blauwe cover, titel, "augustus 2026 · 2 min leestijd" en "Lees
  verder" → naar de Substack-post. Geen lege kolom meer.
