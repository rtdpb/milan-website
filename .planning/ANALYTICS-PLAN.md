# Analytics & rapportage — plan (UITGESTELD)

**Status:** DEFERRED — besloten 2026-08-24. Milan wil analytics + een periodiek
rapportje (bezoekers e.d.) mét verbetersuggesties op basis van gedrag. We zetten
het nu NIET aan; dit document legt vast wat er klaarstaat en hoe we het later
oppakken. Provider-keuze en rapport-vorm bespreken we later.

## Wat Milan wil
- Basis-analytics: bezoekers, waar ze vandaan komen, welke pagina's, apparaat, enz.
- Een terugkerend **rapportje** met die cijfers.
- **Verbetersuggesties op basis van gedrag** (niet alleen cijfers, maar "wat kun je verbeteren").

## Wat er al in de code klaarstaat
- `src/components/analytics/PlausibleScript.astro` — Plausible-integratie, dubbel
  gated (alleen in productie + alleen als er een echt domein is ingevuld),
  **cookieloos → geen cookiebanner nodig** (AVG-vriendelijk).
- Config-seam: `TODO_PLAUSIBLE_DOMAIN` in `src/config.ts` (nu nog de sentinel →
  analytics inert). Aanzetten = deze waarde vervangen door het echte domein.
- **Doelen (goals) al ingebouwd** en vurend in de code:
  - `Contact: Submit` (contactformulier) — src/components/forms/ContactForm.astro
  - `Newsletter: Subscribe` (nieuwsbrief-mailveld) — Newsletter.astro + Samenwerken-kaart
  - `Sticky CTA: Click` — src/components/ui/StickyCTA.astro

## Provider-opties (nog te kiezen)
| Optie | Kosten | Voor / tegen |
|---|---|---|
| **Plausible** (aanbevolen) | ~€9/mnd (30 dagen gratis) | Al ingebouwd. Privacy-vriendelijk, geen cookiebanner. **Stats API** → automatische rapporten + suggesties mogelijk. |
| Cloudflare Web Analytics | Gratis | Privacy-vriendelijk, geen banner. Basale cijfers, **beperkte API** → rapport wordt handmatiger (exports/screenshots). |
| Google Analytics 4 | Gratis | Uitgebreid + goede API, **maar cookie-/consent-banner nodig** (AVG) en minder privacy-vriendelijk. Zwaarder. |

## Activatiestappen (wanneer we het doen)
1. Account bij gekozen provider; domein toevoegen — **bij voorkeur pas als de site
   op het echte domein `milanvandermeulen.nl` staat** (schonere Plausible-domeinnaam
   dan het tijdelijke `rtdpb.github.io/milan-website/`-subpad).
2. `TODO_PLAUSIBLE_DOMAIN` in `src/config.ts` op het echte domein zetten → committen → deploy.
   (Geen cookiebanner nodig bij Plausible/Cloudflare.)
3. Voor automatische rapporten (Plausible): een **API-key** aanmaken en veilig aanleveren.

## Rapport-plan (later)
- **Pas zinvol na ~2-4 weken data.** Zonder verkeer geen rapport.
- Inhoud (NL): bezoekers & unieke bezoekers + trend, top-pagina's, verkeersbronnen
  (LinkedIn/Google/direct), apparaat (mobiel/desktop), en conversies
  (coaching-aanvragen, nieuwsbrief-inschrijvingen, CTA-kliks).
- **Verbetersuggesties op basis van gedrag**, bijv.: veel mobiel verkeer maar lage
  coaching-conversie → mobiele hero/CTA aanscherpen; hoge bounce op een pagina →
  content/CTA herzien; grootste bron → daar meer op inzetten.
- **Uitvoering:** kan een geplande Claude-agent zijn die de Plausible Stats API
  uitleest en het rapport (markdown/PDF) schrijft. Cadans (maandelijks/wekelijks/
  op aanvraag) en aflevering (e-mail / bestand / op aanvraag) → **nog te bespreken**.

## Openstaande beslissingen
- [ ] Provider kiezen (neiging: Plausible).
- [ ] Rapport-cadans + aflevervorm.
- [ ] Timing: idealiter activeren zodra het echte domein live is.
