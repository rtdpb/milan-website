/**
 * src/i18n/nl.ts
 * Dutch UI strings — single source of truth for all copy on the site.
 *
 * Shape contract: Phase 4 adds en.ts alongside this file with the same
 * top-level keys. No i18n library is required — just import `nl` in each
 * component. (RESEARCH §i18n-Ready Structure, D-16, PLAN 01-02 Task 1)
 *
 * CONTENT RULES (HOME-11, D-17):
 * - Factual claims, names, attributions → preserved verbatim from docx.
 * - Obvious spelling/encoding fixes → permitted.
 * - Dutch informal "je" tone throughout.
 *
 * Phase 4: add src/i18n/en.ts with the same exported shape:
 *   export const en = { nav: { ... }, hero: { ... }, ... } as const;
 */

export const nl = {
  // ── Navigation ──────────────────────────────────────────────────────────
  nav: {
    coaching:    'Coaching',
    spreker:     'Spreker',
    nieuwsbrief: 'Nieuwsbrief',
    mijnVerhaal: 'Mijn verhaal',
    boek:        'Boek',
    contact:     'Contact',
    /** Visually rendered as "NL | EN"; non-functional in Phase 1 (D-16) */
    nlEnSwitch:  'NL | EN',
    /** aria-label for LinkedIn icon */
    linkedin:    'LinkedIn van Milan van der Meulen',
    /** aria-label for mobile hamburger open */
    openMenu:    'Menu openen',
    /** aria-label for mobile close button */
    closeMenu:   'Menu sluiten',
    /** aria-label for the nav landmark */
    navLabel:    'Hoofdnavigatie',
  },

  // ── Hero Section (HOME-02) ───────────────────────────────────────────────
  hero: {
    eyebrow:   'Founder · Coach · Spreker',
    h1:        'Je bedrijf schalen, zonder jezelf te verliezen',
    subtext:   'Ik help ondernemers met lef hun bedrijf schalen. Niet vanuit abstracte theorie, maar vanuit doorleefde ervaring.',
    ctaPrimary:   'Contact',
    ctaSecondary: 'Mijn verhaal',
    usp1: '12+ jaar',
    usp2: '180 medewerkers',
    usp3: '9 markten',
  },

  // ── Press Strip (HOME-03) ────────────────────────────────────────────────
  pressStrip: {
    eyebrow: 'Bekend van',
    logos: [
      'MT Sprout',
      'Quote',
      'NOS',
      'EenVandaag',
      'Telegraaf',
      'De Ondernemer',
    ],
  },

  // ── Samenwerken / Services Section (HOME-04) ─────────────────────────────
  samenwerken: {
    heading: 'Samenwerken',
    /** Commitment ladder eyebrow labels (D-07, UI-SPEC §SamenwerkSection) */
    ladderEyebrow1: '01 — Begin hier gratis',
    ladderEyebrow2: '02 — Ga dieper',
    ladderEyebrow3: '03 — Werk met mij',
    cards: [
      {
        title:       'Nieuwsbrief',
        description: 'Elke maand eerlijke lessen uit mijn journey als founder. Geen theorie, geen hypes — alleen wat echt werkt voor ondernemers die willen groeien zonder zichzelf te verliezen.',
        cta:         'Schrijf je gratis in',
      },
      {
        title:       'Presentatie / Lezing',
        description: 'Milan spreekt voor teams, events en conferences over ondernemerschap, schalen en het bouwen van een bedrijf dat bij je past. Scherp, eerlijk en direct uit de praktijk.',
        cta:         'Boek lezing',
      },
      {
        title:       '1:1 Coaching',
        description: 'Intensief traject voor founders die klaar zijn voor de volgende stap. Sparringpartner die zelf heeft gebouwd wat jij wilt bereiken.',
        cta:         'Plan kennismaking',
      },
    ],
  },

  // ── Testimonials Section (HOME-05) ──────────────────────────────────────
  testimonials: {
    heading: 'Wat anderen zeggen',
    items: [
      {
        quote:       'Milan heeft een bijzondere gave om complexe vraagstukken simpel te maken en tegelijk de menselijke kant van het ondernemen centraal te stellen. Zijn coaching heeft mij geholpen beter te delegeren en meer te vertrouwen op mijn team.',
        name:        'Yang Soo Kloosterhof',
        role:        'Ondernemer',
      },
      {
        quote:       'Milan weet als geen ander hoe je een bedrijf bouwt dat echt bij je past. Zijn directe en eerlijke aanpak heeft mij enorm geholpen in mijn groeifase.',
        name:        'Ruud Koornstra',
        role:        'Founder & Ondernemer',
      },
      {
        quote:       'De lezing van Milan was een eyeopener voor onze leden. Zijn verhaal over internationaal schalen en de lessons learned sprak iedereen aan. Echt een aanrader voor elke ondernemersorganisatie.',
        name:        'Oranjewoud Export Academy',
        role:        'Ondernemersorganisatie',
      },
    ],
  },

  // ── Personal Story Section (HOME-06) ────────────────────────────────────
  story: {
    eyebrow:  'Mijn verhaal',
    heading:  'Waarom ik nu mijn lessen deel',
    body: [
      'Ik begon Soly met de overtuiging dat schone energie voor iedereen bereikbaar moest zijn. Wat volgde waren tien jaar van keihard werken, internationale expansie naar 9 landen, 180 medewerkers en uiteindelijk het faillissement van het bedrijf waar ik alles in had gestoken.',
      'Die periode leerde mij meer dan welke MBA ook had kunnen doen. Over leiderschap, over delegeren, over de momenten waarop je jezelf verliest in je bedrijf — en hoe je dat voorkomt. Lessen die ik heb geleerd op de harde manier, en die ik nu deel zodat anderen dat niet hoeven.',
      'Vandaag help ik founders die op een kruispunt staan. Die weten dat ze groter kunnen worden, maar ook voelen dat de manier waarop ze nu werken niet duurzaam is. Ik ben geen consultant met een framework — ik ben iemand die zelf heeft gebouwd, verloren en weer opgestaan.',
    ],
    signature: 'Milan van der Meulen',
    imageAlt:  'Milan van der Meulen op het podium.',
  },

  // ── Newsletter Section (HOME-07) ─────────────────────────────────────────
  newsletter: {
    heading:     'Blijf op de hoogte',
    subtext:     'Elke maand een eerlijke update over ondernemen, schalen en de lessen die ik onderweg leer. Geen spam, geen tips die je al kent — alleen wat echt het verschil maakt.',
    labelNaam:   'Naam',
    labelEmail:  'Mailadres',
    cta:         'Schrijf je in',
    disclaimer:  'Geen spam. Afmelden wanneer je wilt.',
  },

  // ── Articles Section (HOME-08) ───────────────────────────────────────────
  articles: {
    heading: 'Recente artikelen',
    seeAll:  'Alle artikelen',
    /** Placeholder article cards — clearly fictional, no real facts (D-10) */
    items: [
      {
        category:    'Leiderschap',
        title:       'Hoe ik leerde delegeren zonder controle te verliezen',
        excerpt:     'Het moment waarop je als founder beseft dat jij het grootste obstakel voor je eigen groei bent.',
        date:        'januari 2026',
        readTime:    '5 min leestijd',
      },
      {
        category:    'Schalen',
        title:       'Schalen in 9 markten: wat ik anders zou doen',
        excerpt:     'Terugkijken op internationale expansie zonder de romantiek die er achteraf omheen wordt geweven.',
        date:        'december 2025',
        readTime:    '7 min leestijd',
      },
      {
        category:    'Ondernemerschap',
        title:       'De vraag die ik mezelf elke maand stel als ondernemer',
        excerpt:     'Eén vraag die mij eerlijk houdt over de richting van mijn werk en de keuzes die ik maak.',
        date:        'november 2025',
        readTime:    '4 min leestijd',
      },
    ],
  },

  // ── Footer (HOME-09) ─────────────────────────────────────────────────────
  footer: {
    tagline:    'Founder, coach en spreker.',
    navHeading: 'Navigatie',
    /** Same 5 nav items as header — reuse nav.* for labels */
    legalHeading: 'Juridisch',
    privacy:    'Privacybeleid',
    terms:      'Algemene voorwaarden',
    copyright:  '© 2026 Milan van der Meulen. Alle rechten voorbehouden.',
  },

  // ── Common / Shared ──────────────────────────────────────────────────────
  common: {
    /** Visible marker pill on placeholder cards (UI-SPEC §Copywriting Contract) */
    placeholderLabel: '[Placeholder]',
    /** Tooltip on all aria-disabled placeholder elements (HOME-10) */
    disabledTooltip:  'Binnenkort beschikbaar',
    /** NL|EN language switch label (non-functional, Phase 4) */
    nlEnSwitch: 'NL | EN',
    /** "Read more" link text */
    readMore: 'Lees verder →',
    /** Skip to content (a11y) */
    skipToContent: 'Ga naar inhoud',
  },
} as const;

export type NlStrings = typeof nl;
