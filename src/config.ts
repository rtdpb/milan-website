/**
 * src/config.ts
 * Single source of truth for site constants and placeholder destinations.
 *
 * PLACEHOLDER DESTINATIONS: Every TODO_* constant below is a deliberately
 * non-navigable sentinel. When the real URL is supplied, do a project-wide
 * grep-replace on the constant name — it is the ONLY place these values appear.
 *
 * Source: PLAN 01-02 Task 1, RESEARCH §Open Questions Q4, D-12 (CONTEXT.md)
 * Honesty rule (HOME-10): unknown destinations are NEVER href="#" — they are
 * disabled affordances that reference these constants and explain why.
 */

// ── Site Identity ───────────────────────────────────────────────────────────

/** Display name used in wordmark, copyright, and JSON-LD */
export const SITE_NAME = 'Milan van der Meulen';

/** Production domain — ASSUMPTION A6: confirm before first deploy */
export const SITE_URL = 'https://milanvandermeulen.nl'; // TODO: confirm domain before deploy

// ── Placeholder Destinations (grep-replaceable when supplied) ────────────────

/**
 * Substack newsletter publication URL.
 * TODO Phase 3: replace with the real Substack publication URL.
 * Derived URLs (computed inline in components, not exported):
 *   Feed:      `${TODO_SUBSTACK_URL}/feed`       — used by Articles.astro + nieuwsbrief.astro
 *   Subscribe: `${TODO_SUBSTACK_URL}/subscribe`  — used by Newsletter.astro
 * Sentinel check: `TODO_SUBSTACK_URL === 'TODO_SUBSTACK_URL'`
 * Note: strip any trailing slash from the supplied URL before replacing.
 * Used in: Nieuwsbrief CTA (nav), newsletter signup section, "Schrijf je gratis in" button.
 */
// Typed as `string` (not the literal) so the `=== 'TODO_SUBSTACK_URL'` sentinel
// checks across the app remain valid comparisons now that a real URL is set.
export const TODO_SUBSTACK_URL: string = 'https://milanvandermeulen.substack.com';

/**
 * Contact page — resolved in Phase 2 (D-11).
 * BASE_URL-prefixed so it is href-ready on GitHub Pages (served under /milan-website/).
 * Never a bare '/contact' — that 404s under the project subpath (CR-01).
 * Used in: Header "Contact" CTA, Nav.astro, Samenwerken.astro.
 */
export const CONTACT_URL = `${import.meta.env.BASE_URL}contact`;

/**
 * Real contact email address (supplied by Milan).
 * Used by the contact form's mailto submission + the direct-mail fallback link
 * (src/components/forms/ContactForm.astro), shared by NL + EN contact pages.
 */
export const CONTACT_EMAIL = 'Milan@oio-impact.com';

/**
 * Web3Forms access key — generated at web3forms.com against Milan@oio-impact.com
 * (form "Contactformulier website"). Public client-side identifier, not a secret —
 * safe to commit. Submissions email straight to Milan's inbox.
 * Used in: src/components/forms/ContactForm.astro + BookInterestForm.astro
 *   hidden input[name="access_key"].
 * Typed as `string` (not the literal) so the `=== 'TODO_WEB3FORMS_ACCESS_KEY'`
 * placeholder sentinel in the forms still compiles now that a real key is set.
 */
export const TODO_WEB3FORMS_ACCESS_KEY: string = 'eab3a773-c5de-44d1-9c3c-c2112dd75088';

/**
 * Calendly scheduling link for "Plan kennismaking".
 * TODO: supply when Milan creates a Calendly account.
 * Seam: when supplied, the "Plan kennismaking" CTA href changes from
 *   /contact?type=coaching  →  TODO_CALENDLY_URL
 * Used in: src/pages/coaching.astro CTA, src/components/sections/Samenwerken.astro
 */
export const TODO_CALENDLY_URL = 'TODO_CALENDLY_URL';

/**
 * Athenas speaker-booking page. Milan works exclusively with Athenas for talks.
 * External — open in a new tab. Used in: src/pages/spreker.astro (+ en/speaking).
 */
export const ATHENAS_URL = 'https://www.athenas.nl/sprekers/milan-van-der-meulen/';

/**
 * Intro.co booking link for a single paid coaching session ("Boek sessie").
 * Supplied by Milan (feedback round). External — open in a new tab.
 * Used in: src/pages/coaching.astro (+ en) package 1 CTA.
 */
export const INTRO_CALL_URL = 'https://intro.co/milanvandermeulen';

/**
 * LinkedIn profile URL.
 * TODO: supply LinkedIn profile URL (Phase 1 / any phase — waiting on user).
 * Used in: header LinkedIn icon, footer LinkedIn icon, JSON-LD sameAs.
 * When wired: add rel="noopener noreferrer" to any target="_blank" anchor (T-01-04).
 */
// Typed as `string` (not the literal) so the `=== 'TODO_LINKEDIN_URL'` sentinel
// checks across the app remain valid comparisons now that a real URL is set.
export const TODO_LINKEDIN_URL: string = 'https://www.linkedin.com/in/milan-van-der-meulen-04b92643/';

/**
 * Privacy policy page.
 * TODO Phase 2+: replace with real privacy page URL.
 */
export const TODO_PRIVACY_URL = 'TODO_PRIVACY_URL';

/**
 * Algemene voorwaarden (terms) page.
 * TODO Phase 2+: replace with real terms page URL.
 */
export const TODO_TERMS_URL = 'TODO_TERMS_URL';

/**
 * External pre-order / purchase URL for the book.
 * TODO Phase 5+: replace when a real pre-order link is chosen
 * (Gumroad / Bol.com / publisher / Stripe Payment Link).
 * Until supplied: NO purchase button is shown (honesty rule, D-03, HOME-10).
 * Sentinel check: TODO_BOOK_CHECKOUT_URL === 'TODO_BOOK_CHECKOUT_URL'
 * Used in: src/pages/boek.astro, src/pages/en/book.astro
 */
export const TODO_BOOK_CHECKOUT_URL = 'TODO_BOOK_CHECKOUT_URL';

/**
 * Plausible Analytics domain — must match the domain registered in Plausible dashboard.
 * TODO Phase 5: replace with real domain once Plausible account and domain are confirmed
 * (e.g. 'milanvandermeulen.nl' — NOT the GitHub Pages URL).
 * Sentinel check: TODO_PLAUSIBLE_DOMAIN === 'TODO_PLAUSIBLE_DOMAIN' → analytics inert.
 * Used in: src/components/analytics/PlausibleScript.astro
 */
export const TODO_PLAUSIBLE_DOMAIN = 'TODO_PLAUSIBLE_DOMAIN';

// ── Disabled CTA Tooltip ────────────────────────────────────────────────────

/**
 * Tooltip / title text shown on all aria-disabled placeholder elements.
 * Sourced from nl.ts common.disabledTooltip — kept here too for
 * use in non-i18n contexts (e.g. config-driven placeholders).
 */
export const DISABLED_TOOLTIP = 'Binnenkort beschikbaar';

// ── Copyright ────────────────────────────────────────────────────────────────

export const COPYRIGHT_YEAR = 2026;
