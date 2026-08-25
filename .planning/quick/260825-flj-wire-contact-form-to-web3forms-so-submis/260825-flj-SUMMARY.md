---
quick_id: 260825-flj
slug: wire-contact-form-to-web3forms-so-submis
date: 2026-08-25
status: complete
---

# Quick Task 260825-flj — Wire contact form to Web3Forms (SUMMARY)

## What changed

The contact form now emails submissions **directly to Milan@oio-impact.com** via
Web3Forms. The old `mailto:` behaviour (which opened the visitor's own mail app)
is gone. Only Milan is notified — no autoresponder to the visitor.

### Files

- **src/config.ts** — `TODO_WEB3FORMS_ACCESS_KEY` set to the real key
  `eab3a773-c5de-44d1-9c3c-c2112dd75088` (created at web3forms.com against
  Milan@oio-impact.com, form "Contactformulier website"). Typed as `string` so
  the `=== 'TODO_WEB3FORMS_ACCESS_KEY'` placeholder sentinel still compiles.
  This key also powers `BookInterestForm.astro`, which was already wired.

- **src/components/forms/ContactForm.astro** — replaced the `mailto:` composer
  with the Web3Forms fetch flow, mirroring `BookInterestForm.astro`:
  - `action="https://api.web3forms.com/submit"`, `method="POST"`, `novalidate`
  - hidden inputs: `access_key`, `subject` (locale `emailSubject`),
    `redirect` (no-JS fallback), `type=contact` (inbox tagging), honeypot
    `botcheck` checkbox
  - kept all fields (name, email, company, phone, message, privacy consent) and
    accessibility (visible labels, aria-required, aria-live result region)
  - JS island: fetch JSON → static success/error copy inline (never echoes the
    API response or user input); fires Plausible `Contact: Submit` on success;
    restores the submit button's arrow icon on error
  - added a `.form-error` style (destructive colour) alongside `.form-success`

Shared component → applies to both NL `/contact` and EN `/en/contact`.

## Verification

- `npm run build` — success, 16 pages, 0 errors.
- Built `dist/contact/index.html` and `dist/en/contact/index.html` both contain
  the real access key and the `api.web3forms.com/submit` action.

## Notes

- Access key is a public client-side identifier — safe to commit, not a secret.
- No autoresponder is configured (Milan asked for "the mail to Milan, nothing
  more"). If a visitor confirmation is wanted later, add Web3Forms autoresponder
  fields — out of scope here.
