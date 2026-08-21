# Documented spec deviation — Newsletter signup (Sectie 5)

**Date:** 2026-08-21
**Status:** Approved deviation (pending client confirmation)

## Source spec (Input homepage Milan.docx §Sectie 5)

> Titel: 5-minuten leestijd, die jou 5 jaar tijd kan besparen
> Schrijf je in voor mijn maandelijkse nieuwsbrief …
> **Invulveld 1: naam**
> **Invulveld 2: Mailadres**

The docx specifies an on-page signup **form with two fields (naam + Mailadres)**.

## Current implementation

The newsletter uses an **honest Substack redirect CTA** ("Schrijf je in") — a single
button that opens the Substack subscribe page in a new tab. There are **no on-page
input fields**.

## Why it deviates

1. The site is **statically hosted** (GitHub Pages) — there is no backend to receive a
   name + email POST.
2. Substack's subscribe flow **cannot reliably carry a `name` field** via a redirect or
   embed, and its public subscribe endpoint is unofficial. Collecting a name here that is
   then silently dropped would be a **fake-working form** — explicitly disallowed.
3. Project honesty rule (HOME-10 / WR-06): never show inputs that discard what the visitor
   types.

## Resolution (the two options the brief allows)

- **Option A — styled fields wired to a real destination:** requires either (a) a form
  backend such as Web3Forms (already used for the contact form) writing to a real inbox /
  ESP, or (b) Substack's official embed. Only then may the naam + Mailadres fields be shown.
- **Option B — keep the honest Substack redirect + update the approved spec.** ← **CHOSEN**

**Chosen:** Option B. The redirect CTA stays; this file records the approved deviation from
the docx. To switch to Option A later, supply a real destination (Web3Forms key or Substack
embed) and reinstate the naam + Mailadres fields in `Newsletter.astro`.

The verbatim docx **statement and subtext** are used as written.
