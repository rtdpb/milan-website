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
    /** aria-label for the wordmark home link */
    homeAria:    'naar startpagina',
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
    /** Proof points, integrated into the hero panel (numbers verbatim, D-03). */
    stats: [
      { value: '12+', label: 'jaar' },
      { value: '180', label: 'medewerkers' },
      { value: '9',   label: 'markten' },
    ],
    /** Overlapping hero card — truthful CTA drawn from the existing coaching offer. */
    card: {
      eyebrow: '1:1 Coaching',
      title:   'Plan een kennismaking',
      sub:     'Sparringpartner die zelf bouwde wat jij wilt bereiken.',
    },
  },

  // ── Press Strip (HOME-03) ────────────────────────────────────────────────
  pressStrip: {
    eyebrow: 'Bekend van',
    /** title attribute on individual logo placeholder chips */
    logoPlaceholderTitle: 'Logo volgt',
    /** aria-label suffix on individual logo placeholder chips ("{outlet} — {suffix}") */
    logoPlaceholderSuffix: 'logo volgt',
    /** label for the PlaceholderBadge below the chip row */
    badgeLabel: "Logo's volgen",
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
    /** Small section eyebrow (v3.0 redesign) */
    eyebrow: 'Drie routes',
    /** One-line section intro (v3.0 redesign) */
    intro: 'Van laagdrempelig tot intensief. Kies de route die past bij waar jij nu staat.',
    /** Scarcity / exclusivity line on the coaching route (v3.0 — user-authored) */
    exclusiveLabel: 'Max. 8 founders tegelijk',
    /** aria-label for the collaboration options grid */
    ariaLabel: 'Samenwerkingsopties',
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
    /** Closing pull-statement for the redesigned story spread (v3.0 — user-authored) */
    closing:   'Ik help je bedrijf te schalen zonder jezelf te verliezen.',
    /** Accent phrase highlighted within the closing statement */
    closingAccent: 'zonder jezelf te verliezen',
  },

  // ── Timeline (v4.0) — Milan's journey as visual credibility ──────────────
  // Narrative beats; numeric markers kept to verified facts (9 markten, 180 medewerkers).
  timeline: {
    eyebrow: 'Het verhaal in cijfers',
    heading: 'Van idee tot 9 landen — en opnieuw beginnen',
    intro:   'Twaalf jaar bouwen, groeien, verliezen en weer opstaan. De route in het kort.',
    marketsLabel: '9 markten in Europa',
    items: [
      { kicker: 'De start',  stat: '',    statLabel: '',            title: 'De oprichting van Soly',                    text: 'Begonnen vanuit de overtuiging dat schone energie voor iedereen bereikbaar moest zijn.' },
      { kicker: 'Expansie',  stat: '9',   statLabel: 'markten',     title: 'Internationaal opschalen',                  text: 'Van één markt naar negen landen — elk met een eigen team, tempo en cultuur.' },
      { kicker: 'Groei',     stat: '180', statLabel: 'medewerkers', title: 'Een bedrijf dat niet meer in je hoofd past', text: 'Leiderschap op schaal: delegeren, vertrouwen, en leren loslaten.' },
      { kicker: 'De grens',  stat: '',    statLabel: '',            title: 'Burn-out',                                  text: 'Het punt waarop de manier waarop ik werkte niet langer houdbaar was.' },
      { kicker: 'Het einde', stat: '',    statLabel: '',            title: 'Het faillissement',                         text: 'Het bedrijf waar ik alles in had gestoken, viel om. Geen romantiek — wel helderheid.' },
      { kicker: 'Vandaag',   stat: '',    statLabel: '',            title: 'Coach & spreker',                           text: 'Ik geef door wat die jaren me leerden, aan founders die het eerder willen weten dan ik.' },
    ],
  },

  // ── Newsletter Section (HOME-07) ─────────────────────────────────────────
  newsletter: {
    heading:     'Blijf op de hoogte',
    /** Bold statement headline for the redesigned dark newsletter section (v3.0 — user-authored) */
    statement:   '5 minuten leestijd die je 5 jaar kan besparen',
    subtext:     'Elke maand een eerlijke update over ondernemen, schalen en de lessen die ik onderweg leer. Geen spam, geen tips die je al kent — alleen wat echt het verschil maakt.',
    // labelNaam removed (D-05): the Substack redirect cannot honestly carry a name field — Phase 3
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

  // ── Contact Page (PAGE-04) ──────────────────────────────────────────────
  contact: {
    pageTitle:      'Contact — Milan van der Meulen',
    pageDesc:       'Neem contact op voor coaching, een lezing of een algemene vraag. Milan reageert persoonlijk.',
    heading:        'Laten we kennismaken',
    subtext:        'Vul het formulier in en ik neem zo snel mogelijk contact met je op.',
    labelOnderwerp: 'Onderwerp',
    optionAlgemeen: 'Algemeen',
    optionLezing:   'Boek lezing',
    optionCoaching: 'Plan kennismaking',
    labelNaam:      'Naam',
    labelEmail:     'Mailadres',
    labelBericht:   'Bericht',
    ctaSubmit:      'Verstuur bericht',
    ctaSubmitting:  'Versturen…',
    successMsg:     'Bedankt! Ik neem snel contact met je op.',
    errorMsg:       'Er is iets misgegaan. Probeer het opnieuw of mail me direct.',
    errorNetwork:   'Geen verbinding. Controleer je internetverbinding en probeer opnieuw.',
    emailSubject:   'Nieuw bericht via milanvandermeulen.nl',
  },

  // ── Coaching Page (PAGE-01) ──────────────────────────────────────────────
  coaching: {
    pageTitle:  'Coaching voor Founders — Milan van der Meulen',
    pageDesc:   '1:1 coaching voor founders die klaar zijn voor de volgende stap. Sparringpartner die zelf heeft gebouwd, verloren en weer opgestaan.',
    eyebrow:    '1:1 Coaching',
    heading:    'Schalen zonder jezelf te verliezen',
    body: [
      'Na tien jaar bouwen, internationaal uitbreiden naar 9 landen, 180 medewerkers aansturen — en uiteindelijk het faillissement doormaken — weet ik wat er op het spel staat als founder. Niet vanuit theorie, maar van dichtbij.',
      'Ik coach founders die klaar zijn voor de volgende stap, maar voelen dat de huidige manier van werken niet duurzaam is. Samen kijken we wat er werkelijk nodig is: betere delegatie, scherpere keuzes, of juist ruimte om te stoppen met wat niet werkt.',
      'Dit is geen gestandaardiseerd coachingprogramma. Het is een intensief 1:1 traject waarbij ik als sparringpartner meeden vanuit doorleefde ervaring.',
    ],
    offerHeading:  'Wat we samen doen',
    offerEyebrow:  'Aanpak',
    offerCards: [
      {
        title:       'Scherpe diagnose',
        description: 'We starten met een eerlijk gesprek over waar je nu staat en wat je tegenhoudt. Geen standaard intake — gewoon een direct gesprek tussen twee ondernemers.',
      },
      {
        title:       'Intensieve begeleiding',
        description: 'Regelmatige 1:1 sessies, gericht op de keuzes die ertoe doen. Delegeren, groeien, loslaten — wat je nodig hebt, niet wat het programma voorschrijft.',
      },
      {
        title:       'Directe sparring',
        description: 'Je kunt me bereiken als je een klankbord nodig hebt buiten de sessies om. Ik denk mee op het moment dat het er echt toe doet.',
      },
    ],
    testimonialEyebrow: 'Wat anderen zeggen',
    ctaHeading:    'Klaar voor de volgende stap?',
    ctaPrimary:    'Plan kennismaking',
    ctaSecondary:  'Meer over mij',
    networkingAlt: 'Milan in gesprek met ondernemers tijdens een evenement.',
  },

  // ── Mijn Verhaal Page (PAGE-03) ─────────────────────────────────────────
  mijnVerhaal: {
    pageTitle:  'Mijn verhaal — Milan van der Meulen',
    pageDesc:   'Het eerlijke verhaal van Soly: internationale expansie naar 9 landen, 180 medewerkers, en het faillissement dat alles veranderde.',
    eyebrow:    'Mijn verhaal',

    // ── Arc 1: De start van Soly ─────────────────────────────────────────
    arc1Eyebrow: 'De start',
    arc1Heading: 'Van overtuiging naar onderneming',
    arc1Body: [
      'Ik begon Soly met de overtuiging dat schone energie voor iedereen bereikbaar moest zijn. Niet vanuit een businessplan of een investeerdersdeck, maar vanuit een oprecht geloof dat dit kon — en moest.',
      'In de beginjaren was alles handmatig, alles improviserend, alles met een klein team dat harder werkte dan slim was. Maar het werkte. We groeiden, we leerden, en we bouwden iets dat echt waarde had voor mensen.',
    ],

    // ── Arc 2: Internationale expansie ──────────────────────────────────
    arc2Eyebrow: 'De expansie',
    arc2Heading: 'Groeien naar 9 landen en 180 mensen',
    arc2Body: [
      'Op een gegeven moment stond Soly in 9 landen. We hadden bijna 180 medewerkers. Zonnepanelen op daken van gezinnen in heel Europa. Dat klinkt als succes — en op veel manieren was het dat ook.',
      'Maar internationaal schalen is iets anders dan schalen in je eigen markt. Elke markt vraagt om zijn eigen aanpak, zijn eigen mensen, zijn eigen tempo. Ik leerde dat de harde manier: door fouten die ik niet van tevoren had kunnen bedenken.',
      'Ik leerde wat het betekent om een bedrijf te bouwen dat niet meer past in je hoofd. Om beslissingen te nemen met onvolledige informatie. Om te vertrouwen op een team dat groter is dan je ooit voor mogelijk hield.',
    ],

    // ── Arc 3: Het faillissement ─────────────────────────────────────────
    arc3Eyebrow: 'Het faillissement',
    arc3Heading: 'Het bedrijf dat ik alles in had gestoken, viel om',
    arc3Body: [
      'En toen viel het om. Soly ging failliet. Het bedrijf waar ik tien jaar lang alles in had gestoken — mijn energie, mijn tijd, mijn identiteit — was er opeens niet meer.',
      'Ik ga je de romantische versie niet geven. Het was zwaar. Er waren schuldeisers, mensen die werk verloren, partners die werden meegesleurd. Er waren nachten waarop ik niet wist hoe ik verder moest.',
      'Maar er was ook iets anders. Een helderheid die ik daarvoor nooit had. Over wat echt telt. Over wat ik werkelijk had geleerd. Over wie ik was als je het succes weghaalt.',
    ],

    // ── Arc 4: Vandaag ──────────────────────────────────────────────────
    arc4Eyebrow: 'Vandaag',
    arc4Heading: 'Waarom ik nu mijn lessen deel',
    arc4Body: [
      'Vandaag help ik founders die op een kruispunt staan. Die weten dat ze groter kunnen worden, maar ook voelen dat de manier waarop ze nu werken niet duurzaam is.',
      'Ik ben geen consultant met een framework. Ik ben geen coach die succes heeft gehad zonder ooit te zijn gevallen. Ik ben iemand die zelf heeft gebouwd, verloren, en weer is opgestaan — en die de lessen die dat opleverde nu doorgeeft aan anderen die het eerder willen leren dan ik deed.',
      "Niet omdat ik alle antwoorden heb. Maar omdat ik de vragen ken — de echte vragen, die je jezelf 's avonds stelt als het bedrijf stil is en je alleen bent met je twijfels.",
    ],

    // ── Terminal CTA ─────────────────────────────────────────────────────
    ctaEyebrow:   'Klaar voor de volgende stap?',
    ctaHeading:   'Laten we kennismaken',
    ctaPrimary:   'Plan kennismaking',
    ctaSecondary: 'Lees over spreken',
    /** Story teaser link on the homepage Story section */
    teaserLink:   'Lees mijn hele verhaal →',
  },

  // ── Spreker Page (PAGE-02) ────────────────────────────────────────────────
  spreker: {
    pageTitle:  'Spreker — Milan van der Meulen',
    pageDesc:   'Milan spreekt voor teams, events en conferences over ondernemerschap, schalen en eerlijk leiderschap. Boek hem voor jouw event.',
    eyebrow:    'Spreker',
    heading:    'Een eerlijk verhaal over bouwen, falen en weer opstaan',
    body: [
      'Ik heb Soly gebouwd van een startup naar een bedrijf met 180 medewerkers in 9 landen. En ik heb het zien omvallen. Dat verhaal vertel ik niet met de romantiek die er achteraf omheen geweven wordt, maar zoals het was.',
      'Ik spreek voor ondernemersorganisaties, corporates en events over schalen, leiderschap en de momenten waarop je als founder echt wordt getest. Eerlijk, direct en vanuit de praktijk.',
    ],
    aanbodHeading:  'Presentaties en lezingen',
    aanbodEyebrow:  'Aanbod',
    aanbodCards: [
      {
        title:       'Schalen zonder te breken',
        description: 'Over de keuzes, vergissingen en lessen uit de internationale expansie van Soly. Wat werkt bij het bouwen van een team over meerdere markten — en wat echt niet.',
      },
      {
        title:       'Eerlijk leiderschap',
        description: 'Leiderschap gaat niet over het hebben van alle antwoorden. Het gaat over het stellen van de juiste vragen — en het lef om te doen wat nodig is, ook als het pijn doet.',
      },
      {
        title:       'De ondernemer achter het bedrijf',
        description: 'Hoe blijf je jezelf als founder onder druk? Over identiteit, keuzes en het verschil tussen groeien als bedrijf en groeien als persoon.',
      },
    ],
    testimonialEyebrow: 'Wat anderen zeggen',
    ctaHeading:   'Boek Milan voor jouw event',
    ctaPrimary:   'Boek lezing',
    speakingAlt:  'Milan legt een grafiek uit tijdens een presentatie.',
  },


  // ── Nieuwsbrief Page (NEWS-01) ──────────────────────────────────────────
  nieuwsbrief: {
    pageTitle:      'Nieuwsbrief — Milan van der Meulen',
    // Double-quoted to avoid TypeScript parse error on Dutch apostrophe (Rule 1 auto-fix pattern)
    pageDesc:       "Elke maand eerlijke lessen over ondernemen, schalen en leiderschap. Schrijf je in op Milan's Substack nieuwsbrief.",
    eyebrow:        'Nieuwsbrief',
    heading:        'Eerlijke lessen voor ondernemers die willen groeien',
    subtext:        'Elke maand een eerlijke update over ondernemen, schalen en de lessen die ik onderweg leer. Geen spam, geen tips die je al kent.',
    cta:            'Schrijf je in op Substack',
    archiveHeading: 'Eerder verschenen',
    valueProps: [
      { label: 'Eerlijk',      description: 'Geen glansrijke succesverhalen — alleen wat echt werkt.' },
      { label: 'Praktisch',    description: 'Bruikbare lessen, direct uit de founder-praktijk.' },
      { label: 'Maandelijks',  description: 'Één update per maand, nooit meer.' },
    ],
  },

  // ── Book / Pre-order Page (BOOK-01, Phase 5) ──────────────────────────────
  boek: {
    pageTitle:     'Boek — Milan van der Meulen',
    pageDesc:      'Het boek dat Milan schrijft over schalen zonder jezelf te verliezen. Schrijf je in voor updates.',
    eyebrow:       'Binnenkort',
    heading:       'Een boek over schalen zonder jezelf te verliezen',
    body:          [
      'Ik schrijf een boek. Over wat ik heb geleerd in tien jaar bouwen, groeien en uiteindelijk failliet gaan.',
      'Geen succesverhaal — een eerlijk verslag van wat er werkelijk gebeurt als je een bedrijf opschaalt.',
    ] as const,
    subtext:       'Schrijf je in voor updates en ontvang het nieuws als eerste.',
    ctaSubstack:   'Schrijf je in voor updates',
    ctaNotify:     'Stuur mij een seintje',
    formHeading:   'Houd me op de hoogte',
    labelNaam:     'Naam',
    labelEmail:    'Mailadres',
    ctaSubmit:     'Stuur mij een seintje',
    ctaSubmitting: 'Versturen…',
    successMsg:    'Bedankt! Je hoort het als het boek er is.',
    errorMsg:      'Er is iets misgegaan. Probeer het opnieuw.',
    errorNetwork:  'Geen verbinding. Controleer je internetverbinding.',
    emailSubject:  'Boek interesse via milanvandermeulen.nl',
    checkoutCta:   'Pre-order',
    stickyCta:     'Plan kennismaking',
    orSeparator:   'of',
  },

  // ── Common / Shared ──────────────────────────────────────────────────────
  common: {
    /** Visible marker pill on placeholder cards (UI-SPEC §Copywriting Contract) */
    placeholderLabel: '[Placeholder]',
    /** aria-label for PlaceholderBadge elements */
    placeholderAriaLabel: 'Placeholder inhoud — wordt vervangen door echte content',
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
