---
quick_id: 260822-tss
slug: feedback-round
status: complete
date: 2026-08-22
---

# Summary — Feedbackronde (Milan)

Alle feedback uit `feedbackronde/*.docx` + sessie-input verwerkt, tweetalig,
gebouwd, visueel gecontroleerd en gedeployed (25 commits deze sessie,
`bc34998..HEAD`). Live op https://rtdpb.github.io/milan-website/.

## Gedaan

**Homepage**
- Wordmark in kapitalen + vet (header, footer, mobiel menu).
- "Boek"-tab verwijderd (nav + footer); nav-spacing Contact·EN·LinkedIn.
- Hero: gele onderstreep onder "schalen"; foto full-bleed/breder; secundaire CTA → /mijn-verhaal.
- Proofline "Van de keukentafel naar internationale scale-up"; USP "€200M gerealiseerde omzet" (count-up met currency-prefix).
- PressStrip: "Bekend van" → "Benoemd in", RTL Nieuws toegevoegd, label links + namen rechts (rij-layout).
- Samenwerken: pricing-style feature-cards, 3 naast elkaar in de donkere 1:1-coaching-stijl (label/tag/scarcity, tagline, checkmark-lijst, gele CTA).
- Story van homepage verwijderd; Timeline compacter; footer legal (YM Holding B.V. · KvK 63057298).

**Subpagina's (NL + EN)**
- Coaching: header + intro + 2 pakketten (features, prijs op aanvraag) + reviews + voorbeeldtraject + FAQ; split-header met scherp portret.
- Spreker: full-bleed podium-header + intro + Voor wie/Wat je krijgt + Athenas-boeking + testimonials + "Eerder gesproken bij" + awards.
- Mijn verhaal: "Doorleefde lessen" + verhaal + "In de media"-links + tijdlijn + awards.
- Privacybeleid: nieuwe pagina (7 secties) + footer-link geactiveerd + slug-map.

**Integraties**
- Substack gekoppeld (`milanvandermeulen.substack.com`): nieuwsbrief-CTA live + Articles-feed.
- Nieuwe config-constants: INTRO_CALL_URL, ATHENAS_URL.

## Open (input/assets nodig)

- **Media-logo's** in "Benoemd in" — geen logo-bestanden in de repo; wacht op SVG/PNG van client (worden greyscale gerenderd; rij is er klaar voor).
- **Inline mailveld nieuwsbrief** — nu mogelijk via Substack-embed; wacht op go van client.
- **Algemene voorwaarden**-pagina — nog geen tekst aangeleverd.

## Verificatie

- `npm run build` → 0 errors, 16 pagina's.
- Elke pagina visueel gecontroleerd (Playwright / `npm run snap`).
- Deploy geslaagd; homepage + subpagina's → HTTP 200.
