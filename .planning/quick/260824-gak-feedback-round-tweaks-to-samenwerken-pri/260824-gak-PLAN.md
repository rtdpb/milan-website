---
phase: quick-260824-gak
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/Samenwerken.astro
  - src/components/sections/Testimonials.astro
  - src/pages/spreker.astro
  - src/i18n/nl.ts
  - src/i18n/en.ts
autonomous: true
requirements: [FEEDBACK-SAMENWERKEN, FEEDBACK-TESTIMONIALS, FEEDBACK-SPOKENAT]
estimate:
  tokens: 55000
  raw_tokens: 45000
  tasks: 3
  confidence: med

must_haves:
  truths:
    - "Samenwerken Newsletter card shows eyebrow 'Een dosis inspiratie' + big title 'Nieuwsbrief' + 'Gratis' tag, a single subtext paragraph (no checkmark list), and a working inline email form that submits to the live Substack subscribe URL in a new tab"
    - "Samenwerken Presentatie card shows eyebrow 'Een uniek ondernemersverhaal' + big title 'Presentatie'"
    - "Samenwerken Coaching scarcity dot is green and pulses (pulse disabled under prefers-reduced-motion)"
    - "Testimonials section renders a 3-up row of dark cards each with an initials-monogram avatar, yellow quote-mark, quote, and name/role under a divider, plus a prev/dot/next carousel control that drives a scroll-snap track on mobile"
    - "spreker 'Eerder gesproken bij' renders as a 4-col grid of dark logo cards (org name as styled text + placeholder logo slot), a yellow 'Boek lezing' CTA card linking to ATHENAS_URL as the final cell, an eyebrow + 2-line subtext above, and an 'EN VELE ANDEREN' divider below"
    - "NL and EN i18n stay in parity (matching shape); EN Samenwerken and spreker strings render without type errors"
    - "npm run build succeeds"
  artifacts:
    - src/components/sections/Samenwerken.astro
    - src/components/sections/Testimonials.astro
    - src/pages/spreker.astro
    - src/i18n/nl.ts
    - src/i18n/en.ts
  key_links:
    - "Samenwerken Newsletter card ↔ TODO_SUBSTACK_URL from ../../config (subscribe URL computed inline, mirroring Newsletter.astro)"
    - "spreker 'Boek lezing' CTA card ↔ ATHENAS_URL (already imported in spreker.astro)"
    - "Testimonials/spokenAt markup ↔ existing t.testimonials.items / s.spokenAt i18n arrays (verbatim, unchanged)"
---

<objective>
Apply the client's feedback-round tweaks to the "Samenwerken" pricing cards and redesign the Testimonials section and the spreker "Eerder gesproken bij" section to match Milan's own mockups.

Purpose: Address the feedback backlog; make the Newsletter card actually let people subscribe inline, and replace two self-designed sections with polished, on-brand implementations.
Output: Updated Samenwerken.astro, Testimonials.astro, spreker.astro, and both i18n files (NL/EN parity preserved).
</objective>

<execution_context>
@$HOME/.claude/gsd-core/workflows/execute-plan.md
@$HOME/.claude/gsd-core/templates/summary.md
</execution_context>

<context>
@.claude/CLAUDE.md
@src/config.ts

# Email-form pattern to mirror EXACTLY (native GET form → Substack subscribe, Plausible goal on submit)
@src/components/sections/Newsletter.astro
# Graceful logo/text-fallback pattern to mirror for placeholder logo slots
@src/components/sections/PressStrip.astro
@src/components/sections/pressLogos.ts

# Files being edited
@src/components/sections/Samenwerken.astro
@src/components/sections/Testimonials.astro
@src/pages/spreker.astro
</context>

<tasks>

<task type="tracer">
  <name>Task 1: Samenwerken card tweaks + i18n (Newsletter inline form, label/title swaps, green pulsing dot)</name>
  <files>src/components/sections/Samenwerken.astro, src/i18n/nl.ts, src/i18n/en.ts, src/config.ts</files>
  <action>
This task proves the end-to-end pattern (component markup change + i18n shape change + config import + build) that Tasks 2 and 3 expand on. Do it first and confirm the build before touching the other sections.

i18n (BOTH src/i18n/nl.ts and src/i18n/en.ts, matching shape — the file is typed `as const`, so keep every card object shape identical between the two locales):

- Card 1 (Newsletter): SWAP `label` and `title` so `label` reads the short eyebrow and `title` reads the big word. NL: label 'Een dosis inspiratie', title 'Nieuwsbrief'. EN: label 'A dose of inspiration', title 'Newsletter'. Keep `tag: 'Gratis'` (EN 'Free').
- Card 1 (Newsletter): the checkmark `features` array is no longer rendered for this card. Do NOT delete the `features` key (all three card objects must keep the same shape so the `.map` typing over `s.cards` stays uniform) — leave `features` in place but add a NEW field `subtext` to the Newsletter card object AND to the other two card objects so all three cards share one shape. Set Card 1 `subtext` to the required paragraph. NL: 'Elke maand een eerlijke les uit de praktijk, direct in je inbox. Persoonlijke ervaringen over leiderschap, funding, stress, identiteit en groei'. EN: 'An honest lesson from real experience every month, straight to your inbox. Personal experiences on leadership, funding, stress, identity and growth'. For Cards 2 and 3 set `subtext: ''` (empty) so only Card 1 renders it. Add the same `subtext` key to both locales.
- Card 2 (Presentatie): SWAP `label` and `title`. NL: label 'Een uniek ondernemersverhaal', title 'Presentatie'. EN: label 'A unique founder story', title 'Talk'.

Samenwerken.astro markup:
- Import `TODO_SUBSTACK_URL` from `../../config`. Compute `const subscribeUrl = ` + backtick + `${TODO_SUBSTACK_URL.replace(/\/$/, '')}/subscribe` + backtick, and `const isSubstackSentinel = TODO_SUBSTACK_URL === 'TODO_SUBSTACK_URL'`, mirroring Newsletter.astro. (The config value is currently live, not the sentinel.)
- The three cards are currently whole-card `<a>` anchors. A form/input CANNOT be nested inside an anchor, so restructure the `.map` so that card index 0 (Newsletter) renders as a NON-anchor container (a `<div>` or `<article>` carrying the same `sw__card sw__card--light` classes, `role="listitem"`, `data-anim`, `data-anim-variant`, `style={` + backtick + `--i: ${i}` + backtick + `}`) while cards index 1 and 2 stay `<a href={hrefs[i]}>` exactly as today. Cleanest approach: pull the shared inner markup, or branch on `i === 0`.
- Newsletter card body: render the single `subtext` paragraph (class e.g. `sw__subtext-para`) INSTEAD of the `<ul class="sw__features">` checkmark list. Do NOT render `features` for card 0. Cards 1 and 2 keep rendering their `features` checkmark list as today.
- Newsletter card CTA: REPLACE the `<span class="sw__cta">` link affordance with an inline email form mirroring Newsletter.astro's live branch: a native `<form>` with `action={subscribeUrl}` `method="get"` `target="_blank"`, an `sr-only` `<label>` bound to a `type="email" name="email" required` `<input>` (reuse the existing i18n mail label — e.g. import/read a `labelEmail` string; the samenwerken section has none, so add `labelEmail: 'Mailadres'` (EN 'Email address') to the `samenwerken` object in both locales), and a `<button type="submit">` styled like the yellow CTA. Follow the honesty rule: this is a real working form; do NOT add a fake success state. If `isSubstackSentinel` is true, fall back to a disabled affordance exactly like Newsletter.astro's sentinel branch (aria-disabled span) rather than a form that discards input.
- Add a `<script>` island (mirror Newsletter.astro) that on the Newsletter card form `submit` fires the Plausible goal `'Newsletter: Subscribe'` (guarded `typeof (window as any).plausible === 'function'`), then lets the native GET submit proceed. Scope the selector so it only binds this section's form (e.g. a distinct class like `sw__nl-form`).
- Card 3 (Coaching) scarcity dot (`.sw__scarcity-dot`): change from static yellow to GREEN and PULSING. Add a green color — check src/styles for an existing green token first; if none exists, introduce a single token (e.g. `--color-success: #1F9D55` or similar, added to the global token file where the other `--color-*` tokens live) and use `var(--color-success)`; otherwise inline a green hex. Add a CSS `@keyframes` pulse (scale + opacity, or box-shadow ring) applied to `.sw__scarcity-dot`, and disable it under the existing `@media (prefers-reduced-motion: reduce)` block. Keep the yellow accent sparing — only this one dot turns green.

Match the existing file's comment style and CSS-token usage throughout. Keep the existing `.sw__cta` button styling reusable for the form submit button (or add a form-specific rule consistent with tokens).
  </action>
  <verify>
    <automated>cd "C:/Users/PC/Desktop/claude/andere milan website" && npm run build</automated>
  </verify>
  <done>Build succeeds. Newsletter card is a non-anchor container with eyebrow 'Een dosis inspiratie', big title 'Nieuwsbrief', 'Gratis' tag, one subtext paragraph (no checkmarks), and a working email form posting to the live Substack subscribe URL in a new tab (Plausible goal fires on submit). Presentatie card shows eyebrow 'Een uniek ondernemersverhaal' + title 'Presentatie'. Coaching scarcity dot is green and pulses, static under reduced-motion. NL and EN samenwerken objects share identical shape.</done>
</task>

<task type="auto">
  <name>Task 2: Testimonials redesign (3-up dark cards + monogram avatars + carousel control)</name>
  <files>src/components/sections/Testimonials.astro</files>
  <action>
Rebuild Testimonials.astro to match Milan's mockup while keeping the SectionWrapper `variant="ink"` dark band, `labelledBy`, and the semantic figure/blockquote/figcaption/cite structure and existing accessibility. Do NOT touch the i18n — keep the 3 verbatim quotes/names/roles from `t.testimonials.items` exactly; keep eyebrow 'Testimonials' and heading 'Feedback van de mensen waar het om draait'.

Layout:
- Header: eyebrow + heading (unchanged strings).
- A 3-up row of dark cards (`t.testimonials.items` mapped 1:1 — all three now use the same card format; drop the old feature/support/rule split). Each card: circular profile avatar top-left, a yellow quote-mark, the quote text, then name + role below a thin divider rule (reuse the existing `.tst__attr` divider pattern / tokens).
- Avatar: NO photo assets exist. Render an initials-monogram circular avatar as a graceful fallback — derive initials from `name` in the frontmatter (e.g. take the first letter of the first two whitespace-separated words, uppercased; single-word names → first letter). Structure it so a real `<img>` can drop in later: e.g. a `.tst__avatar` circle `<span>` containing the initials, with a comment noting where an `<img>` would replace the monogram (mirror the graceful-fallback intent used in PressStrip.astro/pressLogos.ts). Give the avatar `aria-hidden="true"` since the name is already in the figcaption.
- Carousel control below the row: a left-arrow `<button>`, dot indicators (one per card/slide, active dot yellow via `var(--color-accent)`), and a right-arrow `<button>`. Use inline SVG arrows consistent with the repo's arrow style.

Behaviour (vanilla JS island in `<script>`, no new deps):
- Desktop (>= 768px): show all 3 cards as a static row OR a scroll-snap track (a scroll-snap track that simply shows all 3 is fine).
- Mobile: single-card scroll-snap carousel; prev/next arrows scroll the track by one card; dots reflect and set the active card. Use `scroll-snap-type: x mandatory` on the track and `scroll-snap-align: start` on cards; drive movement with `element.scrollTo`/`scrollBy` using `behavior` set to `'auto'` when `prefers-reduced-motion` is reduced, else `'smooth'`.
- Keyboard-accessible: arrows are real `<button>`s with `aria-label`s (NL, e.g. 'Vorige'/'Volgende'); dots are buttons with `aria-label` per slide; update `aria-current`/active class on the current dot as the track scrolls (listen to the track `scroll` event, or IntersectionObserver on cards).
- Respect `prefers-reduced-motion` for any transition and for scroll behavior.
- Follow existing motion/`data-anim` conventions already in the file (keep `data-anim` / `data-anim-variant` on the header and cards).

Keep all CSS on design tokens (`var(--color-*)`, `var(--space-*)`, `var(--text-*)`, `var(--radius-*)`, `var(--duration-*)`, `var(--ease-*)`). Match the file's existing comment style. The section is used on the homepage AND spreker page component — keep it self-contained (no external assumptions).
  </action>
  <verify>
    <automated>cd "C:/Users/PC/Desktop/claude/andere milan website" && npm run build</automated>
  </verify>
  <done>Build succeeds. Testimonials renders a 3-up row of dark cards, each with a circular initials-monogram avatar, yellow quote-mark, verbatim quote, and name/role beneath a divider. A prev/dots/next control sits below; on mobile the track is a swipeable/scroll-snap single-card carousel driven by the arrows and dots (active dot yellow), keyboard-accessible, honoring prefers-reduced-motion. The ink band, labelledBy, and figure/blockquote/figcaption/cite semantics are preserved. i18n unchanged.</done>
</task>

<task type="auto">
  <name>Task 3: spreker "Eerder gesproken bij" redesign (dark logo-card grid + CTA card + divider) + i18n</name>
  <files>src/pages/spreker.astro, src/i18n/nl.ts, src/i18n/en.ts</files>
  <action>
Replace section 7 of spreker.astro (currently `<ul class="chips">` at the "Eerder gesproken bij" SectionWrapper) with the mockup design. Keep the existing `s.spokenAt` org list from i18n unchanged; keep `s.spokenAtHeading` ('Eerder gesproken bij' / 'Previously spoke at').

i18n (add to the `spreker` object in BOTH src/i18n/nl.ts and src/i18n/en.ts, matching shape):
- `spokenAtEyebrow`: NL 'SPREKER OP', EN 'SPEAKER AT'.
- `spokenAtSubtext`: NL 'Van internationale podia tot lokale initiatieven. Een greep uit de organisaties waar ik mijn verhaal mocht delen.', EN a faithful 2-line equivalent, e.g. 'From international stages to local initiatives. A selection of the organisations where I got to share my story.'
- `spokenAtMore`: NL 'EN VELE ANDEREN', EN 'AND MANY OTHERS'.
- CTA label: reuse the existing samenwerken/spreker 'Boek lezing' string if present, else add `spokenAtCta`: NL 'Boek lezing', EN 'Book a talk'. (Check what already exists before adding a duplicate string.)

spreker.astro markup (section 7):
- Keep the `SectionWrapper id="spreker-spokenat" variant="surface" labelledBy="spreker-spokenat-heading"`.
- Above the grid: eyebrow (`s.spokenAtEyebrow`), the existing `s.spokenAtHeading` as the `<h2 id="spreker-spokenat-heading">`, then the 2-line `s.spokenAtSubtext` paragraph.
- A 4-column grid of dark logo cards. Map `s.spokenAt`: each cell is a dark card containing a placeholder logo slot + the org name as styled text (NO image assets exist → render the org name as styled text inside each card, with a placeholder logo slot element commented for later drop-in, mirroring the graceful-fallback approach in PressStrip.astro / pressLogos.ts). ATHENAS_URL is already imported.
- The FINAL grid cell is a yellow "Boek lezing" CTA card: an `<a href={ATHENAS_URL} target="_blank" rel="noopener noreferrer">` styled as a yellow accent card (using `var(--color-accent)` / `var(--color-accent-ink)`), with the CTA label + the existing inline arrow SVG. Keep the yellow accent sparing — only this one card is yellow.
- Below the grid: a centered "EN VELE ANDEREN" (`s.spokenAtMore`) divider line — a horizontal rule with the centered label (thin line + centered uppercase text, using tokens).
- Remove the now-unused `.chips`/`.chip` CSS rules for this section (or leave them if referenced elsewhere — grep first; they appear only here, so remove them and add the new grid/card/divider CSS).

Responsive: grid is 4 cols on desktop, 2 cols on tablet, 1-2 cols on mobile (media queries mirroring the file's existing breakpoints, e.g. 760px). All CSS on design tokens; match the file's `── N. Section ──` comment style. Keep the yellow accent sparing.
  </action>
  <verify>
    <automated>cd "C:/Users/PC/Desktop/claude/andere milan website" && npm run build</automated>
  </verify>
  <done>Build succeeds. The spreker "Eerder gesproken bij" section renders eyebrow 'SPREKER OP', the existing heading, a 2-line subtext, a 4→2→1-2 responsive grid of dark logo cards (org name as styled text with a placeholder logo slot), a yellow 'Boek lezing' CTA card as the final cell linking to ATHENAS_URL in a new tab, and a centered 'EN VELE ANDEREN' divider below. NL and EN spreker objects share identical shape; org list unchanged.</done>
</task>

</tasks>

<verification>
- `npm run build` succeeds (Astro + TS type-check over the `as const` i18n objects catches any NL/EN shape mismatch).
- Manual/visual (run `npm run dev` or `npm run snap`): Samenwerken Newsletter card submits to Substack in a new tab; Presentatie label/title swapped; Coaching dot green + pulsing (static under reduced-motion). Testimonials shows 3 dark cards with monogram avatars + working prev/dots/next carousel on mobile. spreker "Eerder gesproken bij" shows the dark logo-card grid + yellow CTA card + "EN VELE ANDEREN" divider.
- Honesty rule intact: the only form (Newsletter card) is real and posts to the live Substack URL; no fake success states anywhere.
- Yellow accent stays sparing: only the CTA/tag/quote-mark/active-dot/CTA-card + the single green→ correction (the scarcity dot is green, not yellow).
</verification>

<success_criteria>
All three tasks' `<done>` criteria met, `npm run build` green, NL/EN i18n in parity, honesty rules and sparing-accent conventions preserved.
</success_criteria>

<output>
Create `.planning/quick/260824-gak-feedback-round-tweaks-to-samenwerken-pri/260824-gak-SUMMARY.md` when done.
</output>
