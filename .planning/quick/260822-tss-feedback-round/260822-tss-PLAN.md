---
quick_id: 260822-tss
slug: feedback-round
status: complete
date: 2026-08-22
---

# Quick Task — Feedbackronde (Milan)

Verwerk de feedback uit `feedbackronde/*.docx` (4 documenten: Feedback homepage,
Coaching pagina, Mijn verhaal pagina, Spreker) + losse client-input tijdens de
sessie. Alles tweetalig (NL + EN), gebouwd op het bestaande Astro-patroon, en
gedeployed naar GitHub Pages.

## Scope

1. **Homepage** — alle punten uit Feedback homepage.docx.
2. **Coaching-pagina** — rebuild (header, intro, pakketten, reviews, traject, FAQ).
3. **Spreker-pagina** — rebuild (podium-header, intro, Athenas-boeking, testimonials, awards).
4. **Mijn verhaal-pagina** — rebuild (header, verhaal, media-links, tijdlijn, awards).
5. **Privacybeleid** — nieuwe pagina + footer-link.
6. **Integraties/details** — Substack koppelen; Samenwerken pricing-cards; wordmark vet; "Benoemd in" rij-layout.

## Verificatie

- `npm run build` slaagt (0 errors, 16 pagina's).
- Elke pagina visueel gecontroleerd via `npm run snap` / Playwright.
- Auto-deploy naar GitHub Pages geslaagd; live pagina's → 200.
