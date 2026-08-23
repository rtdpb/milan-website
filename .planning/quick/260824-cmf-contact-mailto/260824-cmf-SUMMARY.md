---
quick_id: 260824-cmf
slug: contact-mailto
status: complete
date: 2026-08-24
---

# Summary — Contactformulier via mailto + echt contactadres

Milan leverde het echte contactadres (**Milan@oio-impact.com**) en de officiële
Substack-embed aan. Klantkeuze: nieuwsbrief houdt het strakke inline mailveld
(werkte al, geen wijziging), en het contactformulier gaat van Web3Forms →
**mailto**.

## Gewijzigd

- **src/config.ts** — `CONTACT_EMAIL = 'Milan@oio-impact.com'` toegevoegd. De
  Web3Forms-constanten blijven (ongebruikt) staan.
- **src/components/forms/ContactForm.astro** — herschreven van Web3Forms-POST
  naar een mailto-composer:
  - JS-pad: bij submit `checkValidity` → een `mailto:CONTACT_EMAIL` opbouwen met
    gelokaliseerd onderwerp (`emailSubject` + gekozen type) en gelabelde body
    (naam, mailadres, onderwerp, bericht) → mailapp openen + polite note tonen.
  - No-JS-pad: native `<form method="post" enctype="text/plain"
    action="mailto:…">` opent alsnog de mailapp met de velden in de body.
  - Altijd-werkt fallback: zichtbare directe mailto-link onder de knop.
  - Web3Forms hidden inputs (access_key/subject/redirect) + honeypot + de
    fake success/network-states verwijderd. `?type=` pre-selectie behouden
    (allowlist), Plausible-goal `Contact: Submit` behouden.
- **src/i18n/nl.ts + en.ts** — twee nieuwe `contact`-strings: `mailtoNote` +
  `mailtoFallbackPre` (shape gelijk in beide locales).

Gedeelde component → geldt automatisch voor `/contact` én `/en/contact`.

## Nieuwsbrief

Geen wijziging: het inline mailveld submit al naar
`https://milanvandermeulen.substack.com/subscribe`. Klant koos dit boven de
officiële iframe-embed (past beter bij de huisstijl).

## Verificatie

- `npx astro check` → 0 errors. `npm run build` → 16 pagina's, geslaagd.
- `dist/contact/index.html` en `dist/en/contact/index.html` bevatten
  `mailto:Milan@oio-impact.com`; geen web3forms-resten meer in de output.

## Nog open (buiten scope)

- Contactformulier levert nu via de mailapp van de bezoeker. Wil Milan later
  tóch directe serverloze verzending, dan volstaat een gratis Web3Forms-sleutel
  (tegen Milan@oio-impact.com) in `TODO_WEB3FORMS_ACCESS_KEY` + terugdraaien
  naar de POST-variant.
