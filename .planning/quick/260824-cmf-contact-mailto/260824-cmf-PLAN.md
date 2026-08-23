---
quick_id: 260824-cmf
slug: contact-mailto
status: complete
date: 2026-08-24
---

# Quick Task — Contactformulier via mailto + echt contactadres

Milan leverde het echte contactadres aan: **Milan@oio-impact.com**. Het
contactformulier draaide op Web3Forms met een placeholder access key
(`TODO_WEB3FORMS_ACCESS_KEY`), dus het verzond nog geen mail. Keuze van de
klant: formulier omzetten naar een **mailto-verzending** (geen backend/sleutel
nodig).

De nieuwsbrief (inline mailveld → Substack) blijft ongewijzigd; die werkt al.

## Aanpak

1. **config.ts** — `CONTACT_EMAIL = 'Milan@oio-impact.com'` toevoegen (single
   source of truth). Web3Forms-constanten blijven staan (ongebruikt) maar de
   sleutel is niet meer nodig.
2. **ContactForm.astro** (gedeeld door NL + EN):
   - Web3Forms POST + honeypot + hidden inputs vervangen door een mailto-flow.
   - JS: bij submit een `mailto:CONTACT_EMAIL` opbouwen met onderwerp
     (emailSubject + gekozen type) en body (naam, mailadres, onderwerp,
     bericht), dan de mailapp openen. Nette polite-note tonen.
   - No-JS fallback: zichtbare directe mailto-link onder de knop, werkt altijd.
   - Validatie (`checkValidity`) blijft; geen fake success/network-states meer.
3. **i18n (nl.ts + en.ts)** — twee nieuwe contact-strings: `mailtoNote` +
   `mailtoFallbackPre` (shape blijft gelijk in beide locales).

## Verificatie

- `npx astro check` → 0 errors.
- Contactpagina toont formulier + directe mailto-link; knop bouwt een
  `mailto:Milan@oio-impact.com` met ingevuld onderwerp/bericht.
- Geldt automatisch voor /contact én /en/contact (gedeelde component).
