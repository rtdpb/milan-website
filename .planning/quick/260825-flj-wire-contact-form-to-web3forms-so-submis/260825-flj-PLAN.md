---
quick_id: 260825-flj
slug: wire-contact-form-to-web3forms-so-submis
date: 2026-08-25
status: planned
---

# Quick Task 260825-flj — Wire contact form to Web3Forms

## Goal

When a visitor submits the contact form, an email is sent **directly** to
Milan@oio-impact.com via Web3Forms — no more `mailto:` that opens the visitor's
own mail app. Only the mail to Milan; no autoresponder to the visitor.

The visitor's real access key was supplied by Milan:
`eab3a773-c5de-44d1-9c3c-c2112dd75088`
(created at web3forms.com against Milan@oio-impact.com, form "Contactformulier website").

## Approach

Mirror the already-proven Web3Forms pattern in `BookInterestForm.astro`
(fetch POST JSON → api.web3forms.com/submit, static i18n success/error copy,
honeypot botcheck, no user input echoed into the DOM). The contact i18n strings
(`ctaSubmitting`, `successMsg`, `errorMsg`, `errorNetwork`) already exist in
both nl.ts and en.ts — they were provisioned for exactly this.

## Tasks

1. **config.ts** — set `TODO_WEB3FORMS_ACCESS_KEY` to the real key
   `eab3a773-c5de-44d1-9c3c-c2112dd75088`, type as `string` (so the
   `=== 'TODO_WEB3FORMS_ACCESS_KEY'` placeholder sentinel in the forms still
   compiles), update the doc comment. Follows the `TODO_SUBSTACK_URL` /
   `TODO_LINKEDIN_URL` precedent (kept the name, set a real value).

2. **ContactForm.astro** — replace the `mailto:` composer with a Web3Forms
   fetch submit:
   - `action="https://api.web3forms.com/submit"`, `method="POST"`, `novalidate`
   - hidden inputs: `access_key`, `subject` (locale `emailSubject`),
     `redirect` (no-JS fallback → web3forms.com/success),
     `type` = `contact` (distinguishes from book-interest in the inbox),
     honeypot `botcheck` checkbox (display:none, tabindex=-1, aria-hidden)
   - keep all existing fields: name, email, company, phone, message, privacy
     consent — and all a11y (visible labels, aria-required, aria-live region)
   - JS island: fetch JSON, static success/error message inline (never echo API
     response or user input), fire Plausible `Contact: Submit` on success
   - keep the yellow pill submit CTA styling

Applies to NL `/contact` and EN `/en/contact` — both render the same shared
`ContactForm.astro` component.

## Verify

- `npm run build` succeeds.
- Contact form posts to Web3Forms; success shows the static "Bedankt!" message,
  form hides, no mail app opens.
- No autoresponder configured (only Milan receives the mail).
