/**
 * src/i18n/utils.ts
 * Locale helper — Phase 4 (I18N-01, I18N-02)
 *
 * Provides:
 *  - getStrings(locale) — returns the strings object for the given locale
 *  - Locale / Strings types
 *  - nlToEn / enToNl slug maps for the NL↔EN language switch (D-06, D-07)
 *
 * The DeepWritableString<T> utility type widens all leaf string literals to
 * `string` so that en.ts (with different string values than nl.ts) satisfies
 * the same structural shape contract without exact-literal mismatch.
 * This means `en satisfies DeepWritableString<typeof nl>` checks key presence
 * and nesting depth at build time — a missing or misnamed key fails the build.
 *
 * Source: RESEARCH §Pattern 2, §Pattern 4, §Code Examples
 */
import { nl } from './nl';
import { en } from './en';

export type Locale = 'nl' | 'en';

/**
 * Strings is the public return type of getStrings().
 * Consumers destructure from this type — using typeof nl means they get
 * the fully-typed NL shape; both NL and EN strings are structurally identical.
 */
export type Strings = typeof nl;

/**
 * Utility: recursively widen readonly string literals to `string` and
 * readonly arrays of records to their widened equivalent.
 * This is what allows `en` (which has different literal values like "Speaking"
 * instead of "Spreker") to satisfy the structural shape of nl without
 * TypeScript complaining about literal-type incompatibility.
 */
type DeepWiden<T> =
  T extends string ? string :
  T extends boolean ? boolean :
  T extends number ? number :
  T extends readonly (infer U)[] ? ReadonlyArray<DeepWiden<U>> :
  T extends object ? { readonly [K in keyof T]: DeepWiden<T[K]> } :
  T;

// Build-time structural shape check: ensures en.ts has every key at every
// nesting level that nl.ts has. A missing key or wrong nesting fails the build.
// We accept the widened type so both "Speaking" and "Spreker" satisfy "string".
const _shapeCheck = { nl, en } satisfies Record<Locale, DeepWiden<typeof nl>>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- shape check only
void _shapeCheck;

// The runtime strings map — used by getStrings().
const strings = { nl, en };

/**
 * Returns the full strings object for the given locale.
 * Falls back to 'nl' for any unrecognised locale value (including undefined on
 * 404 pages — RESEARCH Pitfall 2).
 */
export function getStrings(locale: string | undefined): Strings {
  if (locale === 'en') return strings.en as unknown as Strings;
  return strings.nl; // default + fallback
}

/**
 * NL slug → EN slug mapping (root-relative, no leading slash).
 * D-06: translated slugs for EN pages.
 * Used by Nav.astro to build the language switch href and by BaseHead.astro
 * for hreflang construction.
 */
export const nlToEn: Record<string, string> = {
  '':             '',           // homepage → /en/
  'coaching':     'coaching',
  'spreker':      'speaking',
  'mijn-verhaal': 'about',
  'nieuwsbrief':  'newsletter',
  'contact':      'contact',
  'boek':         'book',       // Phase 5 — BOOK-01
};

/**
 * EN slug → NL slug mapping (reverse of nlToEn).
 * Used by Nav.astro when on an EN page to find the equivalent NL page.
 *
 * WR-01: Guard against duplicate EN slugs. If two NL slugs ever map to the
 * same EN slug, the inversion silently drops one entry — the language switch
 * would break for one locale. This assertion catches the mistake at module
 * evaluation time (build + SSR) rather than silently at runtime.
 */
const _nlValues = Object.values(nlToEn);
const _uniqueNlValues = new Set(_nlValues);
if (_uniqueNlValues.size !== _nlValues.length) {
  throw new Error(
    '[i18n] nlToEn has duplicate EN slugs — enToNl inversion would be lossy. ' +
    'Check nlToEn in src/i18n/utils.ts.'
  );
}

export const enToNl: Record<string, string> = Object.fromEntries(
  Object.entries(nlToEn).map(([n, e]) => [e, n])
);
