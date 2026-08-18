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
 * Substack newsletter URL.
 * TODO Phase 3: replace with the real Substack publication URL.
 * Used in: Nieuwsbrief CTA (nav), newsletter signup section, "Schrijf je gratis in" button.
 */
export const TODO_SUBSTACK_URL = 'TODO_SUBSTACK_URL';

/**
 * Contact / lead form destination.
 * TODO Phase 2: replace with the real contact page URL or Calendly link.
 * Used in: Header "Contact" CTA, "Boek lezing" button, "Plan kennismaking" button.
 */
export const TODO_CONTACT_URL = 'TODO_CONTACT_URL';

/**
 * LinkedIn profile URL.
 * TODO: supply LinkedIn profile URL (Phase 1 / any phase — waiting on user).
 * Used in: header LinkedIn icon, footer LinkedIn icon, JSON-LD sameAs.
 * When wired: add rel="noopener noreferrer" to any target="_blank" anchor (T-01-04).
 */
export const TODO_LINKEDIN_URL = 'TODO_LINKEDIN_URL';

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

// ── Disabled CTA Tooltip ────────────────────────────────────────────────────

/**
 * Tooltip / title text shown on all aria-disabled placeholder elements.
 * Sourced from nl.ts common.disabledTooltip — kept here too for
 * use in non-i18n contexts (e.g. config-driven placeholders).
 */
export const DISABLED_TOOLTIP = 'Binnenkort beschikbaar';

// ── Copyright ────────────────────────────────────────────────────────────────

export const COPYRIGHT_YEAR = 2026;
