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
    /** Word in h1 to highlight with the yellow underline (feedback: 'schalen', niet 'verliezen'). */
    hlWord:    'schalen',
    subtext:   'Ik help ondernemers met lef hun bedrijf schalen. Niet vanuit abstracte theorie, maar vanuit doorleefde ervaring.',
    ctaPrimary:   'Contact',
    ctaSecondary: 'Mijn verhaal',
    usp1: '12+ jaar',
    usp2: '180 medewerkers',
    usp3: '9 markten',
    /** Proof points, integrated into the hero panel (numbers verbatim, D-03). */
    stats: [
      { value: '12+',   label: 'jaar ervaring' },
      { value: '€200M', label: 'gerealiseerde omzet' },
      { value: '180',   label: 'medewerkers' },
      { value: '9',     label: 'markten' },
    ],
    /** Small supporting proof line for the hero proof-card (derived from the docx story). */
    proofLine: 'Van de keukentafel naar internationale scale-up',
    /** Overlapping hero card — truthful CTA drawn from the existing coaching offer. */
    card: {
      eyebrow: '1:1 Coaching',
      title:   'Plan een kennismaking',
      sub:     'Sparringpartner die zelf bouwde wat jij wilt bereiken.',
    },
  },

  // ── Press Strip (HOME-03) ────────────────────────────────────────────────
  pressStrip: {
    eyebrow: 'Benoemd in',
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
      'RTL Nieuws',
      'EenVandaag',
      'Telegraaf',
      'De Ondernemer',
    ],
  },

  // ── Samenwerken / Services Section (HOME-04) ─────────────────────────────
  // Copy restored verbatim from Input homepage Milan.docx §Sectie 2 (source-locked).
  // Obvious punctuation/case fixes only: leading capital + trailing period on subtext.
  samenwerken: {
    heading: 'Samenwerken',
    subtext: 'Laat je inspireren via mijn nieuwsbrief of persoonlijke lezing. Of zet de volgende stap in de groei van je bedrijf met exclusieve coaching.',
    /** aria-label for the collaboration options grid */
    ariaLabel: 'Samenwerkingsopties',
    /** Scarcity line — feedback: 'nog 4 plekken'. */
    exclusiveLabel: 'Nog 4 plekken',
    /** aria-label for the newsletter inline email form */
    labelEmail: 'Mailadres',
    cards: [
      {
        // label/title swapped per feedback: label = eyebrow, title = big word
        label:       'Een dosis inspiratie',
        tag:         'Gratis',
        title:       'Nieuwsbrief',
        tagline:     'Elke maand een eerlijke les uit de praktijk, direct in je inbox.',
        features:    ['Persoonlijke lessen over bouwen & schalen', 'Over leiderschap, funding, stress en burnout', 'Gratis — maandelijks, geen spam'],
        /** Replaces the checkmark list on card 0 (Newsletter). Empty on cards 1 & 2. */
        subtext:     'Elke maand een eerlijke les uit de praktijk, direct in je inbox. Persoonlijke ervaringen over leiderschap, funding, stress, identiteit en groei.',
        cta:         'Schrijf je gratis in',
      },
      {
        // label/title swapped per feedback
        label:       'Een uniek ondernemersverhaal',
        tag:         '',
        title:       'Presentatie',
        tagline:     'Een eerlijk, indringend verhaal op maat voor jouw event.',
        features:    ['Persoonlijk verhaal met concrete lessen', 'Eerlijk over de successen én de valkuilen', 'Afgestemd op jouw publiek en setting'],
        subtext:     '',
        cta:         'Boek lezing',
      },
      {
        label:       'Exclusieve ondersteuning',
        tag:         '',
        title:       '1:1 Coaching',
        tagline:     'Intensieve 1-op-1 begeleiding voor een klein aantal founders.',
        features:    ['Sparring op de beslissingen die er echt toe doen', 'Onbeperkt contact tussen de sessies door', 'Direct opzegbaar — geen langdurig traject'],
        subtext:     '',
        cta:         'Plan kennismaking',
      },
    ],
  },

  // ── Testimonials Section (HOME-05) ──────────────────────────────────────
  // Testimonials restored VERBATIM from Input homepage Milan.docx §Sectie 3 (source-locked).
  // Quotes, names and roles are exactly as supplied — no paraphrasing.
  testimonials: {
    eyebrow: 'Testimonials',
    heading: 'Feedback van de mensen waar het om draait',
    items: [
      {
        quote:       'Milan heeft ons bedrijf de commerciële richting gegeven die nodig is om schaalbaar te kunnen groeien',
        name:        'Yang Soo Kloosterhof',
        role:        'CEO Powerchainger',
      },
      {
        quote:       'Milan heeft unieke inzichten voor ondernemers, investeerders en bestuurders',
        name:        'Ruud Koornstra',
        role:        'Ondernemer',
      },
      {
        quote:       'Niet alleen de successen werden gedeeld, maar vooral ook de valkuilen en weer opstaan. Een indrukwekkend ondernemersverhaal van dromen en doorzetten naar internationaal succes.',
        name:        'Oranjewoud Export Academy',
        role:        '',
      },
    ],
  },

  // ── Personal Story Section (HOME-06) ────────────────────────────────────
  // Story restored VERBATIM from Input homepage Milan.docx §Sectie 4 (source-locked).
  // Only fix: docx typo "ondernemershap" → "ondernemerschap" (obvious spelling error).
  story: {
    eyebrow:  'Mijn verhaal',
    heading:  'Waarom ik nu mijn lessen deel',
    body: [
      'Mijn ondernemerschap begon niet met een businessplan, maar met een overtuiging: dat ondernemerschap een wezenlijke rol speelt in het oplossen van grote vraagstukken. Op mijn negentiende besloot ik om mijn energie te steken in de energietransitie en richtte samen met mijn broer Soly op. Wat begon als een idealistisch initiatief groeide in ruim tien jaar uit tot een internationaal opererend bedrijf in negen landen, met bijna één miljoen geplaatste zonnepanelen en meer dan 50 miljoen aan investeringen. We bouwden eigen technologie, ontwikkelden schaalbare commerciële structuren en creëerden een cultuur waarin mensen, impact en prestaties samenkwamen.',
      'Maar mijn verhaal is geen glad succesverhaal. Naast groei, erkenning en impact leerde ik ook de harde kanten van ondernemerschap kennen. We maakten keuzes onder druk, werkten met internationale investeerders, groeiden sneller dan soms comfortabel was, en zagen uiteindelijk hoe een construct dat vooral gericht is op snelheid en rendement zelfs sterke impactbedrijven kan breken.',
      'Ik verloor mijzelf in een burnout. En niet veel later het bedrijf. Het faillissement van Soly werd een kantelpunt: pijnlijk, confronterend en tegelijkertijd vormend. Juist die ervaring heeft mijn visie aangescherpt. Ik heb aan den lijve ondervonden wat werkt — en wat niet — bij het opschalen van een onderneming met een sterke missie. Ik weet hoe belangrijk strategie, cultuur, focus en de juiste vorm van kapitaal zijn. En ik weet hoe funest verkeerde prikkels kunnen zijn.',
      'Nu breng ik alles wat ik heb geleerd samen. Niet als consultant, niet als traditionele investeerder, maar als meewerkende partner. Met mijn ervaring sta ik naast jou als founder. Ik help je bedrijf te schalen zonder jezelf te verliezen.',
    ],
    signature: 'Milan van der Meulen',
    imageAlt:  'Milan van der Meulen op het podium.',
  },

  // ── Timeline (v4.0) — Milan's journey as visual credibility ──────────────
  // Narrative beats; numeric markers kept to verified facts (9 markten, 180 medewerkers, ~1M zonnepanelen).
  timeline: {
    eyebrow: 'Het verhaal in cijfers',
    heading: 'Van idee tot 9 landen — en opnieuw beginnen',
    intro:   'Twaalf jaar bouwen, groeien, verliezen en weer opstaan. De route in het kort.',
    marketsLabel: '9 markten in Europa',
    /** Third headline stat — verbatim from CLAUDE.md + story.body ("bijna één miljoen geplaatste zonnepanelen") */
    solarPanelsValue: '~1M',
    solarPanelsLabel: 'zonnepanelen',
    /** aria-label for the GrowthCurve SVG */
    growthCurveAriaLabel: 'Groeicurve van Soly',
    /** JourneyRoute figure — 6 short node labels (mapped by index to the route) + aria-label */
    journeyNodes: ['Keukentafel', '9 landen', '180 mensen', 'Burn-out', 'Faillissement', 'Nu'],
    journeyAriaLabel: 'De route van Milan: van de keukentafel naar 9 landen en bijna één miljoen zonnepanelen, via burn-out en faillissement, tot nu als founder-coach.',
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
  // Statement + subtext restored VERBATIM from Input homepage Milan.docx §Sectie 5.
  // NOTE / SPEC DEVIATION (documented): the docx specifies a "naam" + "Mailadres"
  // form. The site uses an honest Substack redirect (no backend on static hosting;
  // Substack subscribe cannot reliably carry a name). Approved: keep the redirect
  // CTA, never a fake form. See .planning §Newsletter-conflict.
  newsletter: {
    heading:     'Blijf op de hoogte',
    statement:   '5-minuten leestijd, die jou 5 jaar tijd kan besparen',
    subtext:     'Schrijf je in voor mijn maandelijkse nieuwsbrief en ontvang persoonlijke lessen over hoe je een bedrijf bouwt van de keukentafel tot in 9 landen.',
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
    /** Legal entity line (feedback). */
    legalEntity: 'Milan van der Meulen is een handelsnaam van YM Holding B.V. · KvK 63057298',
  },

  // ── Privacybeleid Page ────────────────────────────────────────────────────
  // Full text verbatim from feedbackronde/Feedback homepage.docx.
  privacy: {
    pageTitle: 'Privacybeleid — Milan van der Meulen',
    pageDesc:  'Hoe Milan van der Meulen (YM Holding B.V.) omgaat met jouw persoonsgegevens.',
    eyebrow:   'Juridisch',
    heading:   'Privacybeleid',
    intro:     'Wij hechten veel waarde aan de bescherming van jouw persoonsgegevens. In deze privacy policy leggen wij uit welke gegevens wij verzamelen, waarom we dat doen en hoe wij zorgvuldig met jouw gegevens omgaan.',
    sections: [
      {
        heading: 'Welke persoonsgegevens verwerken wij?',
        body: [
          'Wij verwerken uitsluitend persoonsgegevens die jij actief aan ons verstrekt of die automatisch worden verzameld bij het gebruik van onze website.',
          'Dit kan onder andere zijn:',
        ],
        items: ['Naam', 'E-mailadres', 'Telefoonnummer', 'Bedrijfsnaam', 'Inhoud van contact- of intakeformulieren', 'IP-adres', 'Gegevens over jouw bezoek aan de website (bijv. pagina’s, tijdstip, browser)'],
        note: '',
      },
      {
        heading: 'Hoe we je data gebruiken',
        body: ['Wij gebruiken jouw persoonsgegevens uitsluitend voor de volgende doeleinden:'],
        items: ['Om contact met je op te nemen naar aanleiding van een aanvraag of bericht', 'Om onze diensten (zoals coaching of lezingen) te kunnen leveren', 'Voor het plannen van kennismakingsgesprekken of intakegesprekken', 'Om onze website en dienstverlening te verbeteren', 'Voor administratieve en wettelijke verplichtingen'],
        note: 'Wij gebruiken jouw gegevens niet voor ongevraagde marketing en verkopen deze nooit aan derden.',
      },
      {
        heading: 'Grondslagen voor verwerking',
        body: ['Wij verwerken persoonsgegevens op basis van:'],
        items: ['jouw toestemming', 'de uitvoering van een overeenkomst of voorbereiding daarop', 'een gerechtvaardigd belang (zoals bedrijfsvoering en website-analyse)', 'een wettelijke verplichting (indien van toepassing)'],
        note: '',
      },
      {
        heading: 'Delen van gegevens',
        body: ['Wij delen jouw persoonsgegevens alleen met derden als dat noodzakelijk is voor:'],
        items: ['het uitvoeren van onze dienstverlening', 'het gebruik van IT-diensten (zoals e-mail, hosting, analytics)', 'het voldoen aan wettelijke verplichtingen'],
        note: '',
      },
      {
        heading: 'Cookies',
        body: ['Wij gebruiken functionele en analytische cookies om de website goed te laten werken en het gebruik te analyseren. Bij analytische cookies (zoals Google Analytics) worden IP-adressen waar mogelijk geanonimiseerd.'],
        items: [],
        note: '',
      },
      {
        heading: 'Bewaartermijn',
        body: ['Wij bewaren persoonsgegevens niet langer dan noodzakelijk is voor het doel waarvoor ze zijn verzameld, tenzij wij wettelijk verplicht zijn gegevens langer te bewaren.'],
        items: [],
        note: '',
      },
      {
        heading: 'Veranderingen aan dit beleid',
        body: ['Wij behouden ons het recht voor deze privacy policy te wijzigen. De meest actuele versie is altijd beschikbaar op onze website.'],
        items: [],
        note: '',
      },
    ],
    entity: 'Milan van der Meulen is een handelsnaam van YM Holding B.V. · KvK 63057298',
  },

  // ── Contact Page (PAGE-04) ──────────────────────────────────────────────
  contact: {
    pageTitle:      'Contact — Milan van der Meulen',
    pageDesc:       'Neem contact op voor coaching, een lezing of een algemene vraag. Milan reageert persoonlijk.',
    heading:        'Laten we kennismaken',
    subtext:        'Vul het formulier in en ik neem zo snel mogelijk contact met je op.',
    labelNaam:      'Naam',
    labelEmail:     'Mailadres',
    labelBericht:   'Bericht',
    labelBedrijf:   'Naam bedrijf',
    labelTelefoon:  'Telefoonnummer',
    privacyConsentPre:  'Ik ga akkoord met het ',
    privacyConsentLink: 'privacybeleid',
    ctaSubmit:      'Verstuur bericht',
    ctaSubmitting:  'Versturen…',
    successMsg:     'Bedankt! Ik neem snel contact met je op.',
    errorMsg:       'Er is iets misgegaan. Probeer het opnieuw of mail me direct.',
    errorNetwork:   'Geen verbinding. Controleer je internetverbinding en probeer opnieuw.',
    emailSubject:   'Nieuw bericht via milanvandermeulen.nl',
    /** Shown after the mailto opens the visitor's mail app. */
    mailtoNote:     'Je mailprogramma opent met je bericht erin — controleer en verstuur.',
  },

  // ── Coaching Page (PAGE-01) ──────────────────────────────────────────────
  coaching: {
    pageTitle:  'Coaching voor founders — Milan van der Meulen',
    pageDesc:   '1:1 coaching voor founders die schalen. Van iemand die zelf bouwde, verloor en weer opstond — geen theoretisch raamwerk, maar doorleefde ervaring.',
    eyebrow:    '1:1 Coaching',
    heroTitle:  'De juiste keuzes zijn onbetaalbaar',
    heroImageAlt: 'Portret van Milan van der Meulen.',
    intro: [
      'Je hebt marktfit. Je team draait. En toch voelt deze fase zwaarder dan de vorige. Meer druk, meer mensen die van je afhankelijk zijn, meer beslissingen die je in je eentje moet nemen omdat niemand om je heen precies weet hoe het is om hierin te zitten.',
      'Ik ken die fase. Ik heb samen met mijn broer een bedrijf opgebouwd van keukentafel tot in negen landen met 180 medewerkers, meer dan 50 miljoen kapitaal opgehaald bij partijen als Shell en ABP, en heb aan den lijve ondervonden wat groei met een bedrijf en met een mens doet. Ik heb de goede beslissingen zien werken, maar de verkeerde besluiten ook hun tol zien eisen. Die doorleefde ervaring, inclusief het faillissement en mijn eigen burn-out, is precies waarom ondernemers mij vragen: niet om een consultant met een theoretisch raamwerk, maar om iemand die er middenin heeft gestaan.',
      'In een coachingtraject werk ik intensief met een klein aantal founders tegelijk. Geen algemene tips, maar sparring op de beslissingen die er nu echt toe doen: slim schalen, de juiste hire maken, zorgen dat je een team bouwt dat meegroeit in plaats van breekt, fundingstrategie, en hoe je zelf overeind blijft terwijl de druk toeneemt. Ik ben rechtstreeks bereikbaar tussen de sessies door, zodat je nooit weken hoeft te wachten met een vraag die niet kan wachten. Daar zijn we ten slotte ondernemers voor.',
    ],
    packagesHeading: 'Pakketten',
    priceOnRequest:  'Prijs op aanvraag',
    packages: [
      {
        name:     'Losse sessie',
        price:    '€ 200 eenmalig',
        desc:     'Snel advies nodig? Boek een losse sessie van 45 minuten. Je kunt je onderwerp van tevoren sturen zodat we snel de diepte in kunnen. Je verlaat de sessie met een eerlijk inzicht en een concrete next step.',
        features: ['45 minuten sessie', 'Inclusief korte voorbereiding', '10% korting op een 2e sessie'],
        cta:      'Boek sessie',
      },
      {
        name:     'Coaching programma',
        price:    '€ 1.495 per maand',
        desc:     'Doorlopende coaching van iemand die weet hoe het is om een bedrijf te bouwen. Uiteraard onder voorbehoud van een goede kennismaking.',
        features: ['2× 60 minuten coaching per maand', '1× deep-dive dag per kwartaal', 'Toegang tot relevant netwerk', 'Onbeperkt contact via WhatsApp', 'Maandelijks opzegbaar'],
        cta:      'Plan kennismaking',
      },
    ],
    reviewsHeading: 'Wat anderen zeggen',
    reviews: [
      {
        quote: 'It was incredible speaking with Milan. He was exceptionally generous with his thoughts, and I gained immense value from our conversation. As a true industry expert, his ‘headline’ advice has already given me a clear path to transforming our outreach strategy. I’m very much looking forward to our future conversations. Thank you, Milan, for your time and insight!',
        name:  'Amber',
        role:  '',
      },
      {
        quote: 'Milan heeft ons bedrijf de commerciële richting gegeven die nodig is om schaalbaar te kunnen groeien',
        name:  'Yang Soo Kloosterhof',
        role:  'CEO Powerchainger',
      },
    ],
    trajectHeading: 'Voorbeeld van een coachingtraject',
    trajectSteps: [
      { label: 'Week 1',   title: 'Jou en je bedrijf leren kennen', text: 'Je uitdagingen begrijpen en wat je weerhoudt om verder te groeien. De eerste inzichten komen al boven tafel.' },
      { label: 'Week 2–4', title: 'Momentum bouwen',                text: 'Deep dives op de kernuitdagingen. Acties formuleren en doorvoeren. Maximaal inzicht krijgen in je bedrijfsprocessen.' },
      { label: 'Verder',   title: 'Constante begeleiding',           text: 'Naast de sessies hebben we doorlopend contact. Elk kwartaal een strategiedag waarop we samen naar de toekomstige groei kijken. In deze fase koppel ik je ook aan relevante contacten in mijn netwerk.' },
    ],
    faqHeading: 'Veelgestelde vragen',
    faq: [
      { q: 'Hoe starten we?', a: 'Nadat je het contactformulier hebt ingevuld neem ik contact met je op voor een kennismaking. Bij een wederzijdse match kunnen we starten.' },
      { q: 'Hoelang duurt een traject?', a: 'Mijn doel is om zoveel mogelijk waarde toe te voegen. Zodra jij of ik voelen dat dit verzadigd is, kan het traject op elk moment stoppen (met een opzegtermijn van 1 maand).' },
      { q: 'Moet ik iets voorbereiden voor een sessie?', a: 'In principe lopen we tijdens de sessie door het vraagstuk heen. Je mag in vertrouwelijkheid van tevoren informatie delen ter voorbereiding.' },
      { q: 'Waar is dit niet voor?', a: 'Het is belangrijk om transparant te zijn over je vraagstuk en het niet mooier te maken dan het is. Ik hanteer een eerlijke, duidelijke stijl om je maximaal te helpen de juiste keuze te maken. Je staat dus open voor feedback en andere inzichten.' },
    ],
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

    // ── Header ────────────────────────────────────────────────────────────
    heroEyebrow:  'Het verhaal achter Soly',
    heroTitle:    'Doorleefde lessen',
    heroImageAlt: 'Milan van der Meulen op het podium.',

    // ── In de media ───────────────────────────────────────────────────────
    mediaHeading: 'In de media',
    media: [
      { outlet: 'De Telegraaf',            title: 'Passie voor duurzaamheid',                              url: 'https://www.telegraaf.nl/financieel/passie-voor-duurzaamheid/64785275.html' },
      { outlet: 'RTL Nieuws',              title: 'Coöperatief ondernemen met zonne-energie',              url: 'https://www.rtl.nl/nieuws/economie/artikel/5428413/cooperatief-ondernemen-zonneenergie-zonnepanelen-soly-rabobank' },
      { outlet: 'BNR',                     title: 'De Top van Nederland — over Soly en zonnepanelen',      url: 'https://www.bnr.nl/podcast/de-top-van-nederland/10506690/milan-van-der-meulen-soly-97-procent-van-de-zonnepanelen-komen-uit-china-die-van-ons-dus-ook' },
      { outlet: 'NOS',                     title: 'Er is ook hoop, zegt Al Gore met nieuwe klimaatfilm',   url: 'https://nos.nl/artikel/2186295-er-is-ook-hoop-zegt-al-gore-met-nieuwe-klimaatfilm' },
      { outlet: 'Dagblad van het Noorden', title: 'Patrick en Milan veroveren Europa met Soly',            url: 'https://www.dvhn.nl/economie/patrick-en-milan-veroveren-europa-met-zonne-energiebedrijf-soly-uit-groningen/156787544.html' },
      { outlet: 'Leeuwarder Courant',      title: 'Mega-investering voor zonnepanelenbedrijf Soly',        url: 'https://www.lc.nl/economie/mega-investering-voor-zonnepanelenbedrijf-soly-van-broers-milan-en-patrick-van-der-meulen-uit-leeuwarden/157134939.html' },
      { outlet: 'MT/Sprout',               title: 'De groeilessen van Milan van der Meulen',               url: 'https://mtsprout.nl/groei/milan-van-der-meulen-enienl-groeilessen' },
      { outlet: 'De Ondernemer',           title: 'Soly haalt 30 miljoen groeikapitaal op',                url: 'https://www.deondernemer.nl/innovatie/zonne-energiebedrijf-soly-haalt-30-miljoen-groeikapitaal-op-voor-verdere-expansie~1671f0b' },
    ],

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
    pageDesc:   'Milan vertelt het eerlijke verhaal achter Soly: bouwen, breken en opnieuw beginnen. Boek hem als spreker via Athenas.',
    eyebrow:    'Spreker',
    heroTitle:  'Een verhaal dat blijft hangen',
    heroImageAlt: 'Milan van der Meulen spreekt op het podium.',
    intro: [
      'Op mijn negentiende begon ik met mijn broer aan de keukentafel aan wat Soly zou worden: een bedrijf dat uitgroeide tot negen landen, met kapitaal van Shell en pensioenfonds ABP, en bijna een miljoen geplaatste zonnepanelen. Op 25 november 2025 ging datzelfde bedrijf, na 12,5 jaar bouwen, failliet.',
      'Ik deel dat verhaal niet om medelijden, maar omdat het de lessen bevat die de meeste succesverhalen overslaan. Over succesvolle groei en ondernemersavonturen. Over hoe de verkeerde prikkels een sterk bedrijf van binnenuit kunnen breken. Over leiderschap onder druk, en over wat er gebeurt als je eigen grenzen het al lang hebben opgegeven voordat je bedrijf dat doet.',
      'Dit is geen opgepoetst succesverhaal met een mooie afsluiter. Het is een eerlijke, indringende reconstructie van bouwen, breken en opnieuw beginnen. Met concrete lessen voor iedereen die zelf verantwoordelijkheid draagt over groei, kapitaal of mensen.',
    ],
    infoBlocks: [
      { title: 'Voor wie', text: 'Ondernemers, bestuurders en investeerders die te maken hebben met groei, schaal, kapitaal of leiderschap onder druk. Geschikt voor bedrijfsevents, investeerdersbijeenkomsten, brancheverenigingen en leiderschapsprogramma’s.' },
      { title: 'Wat je krijgt', text: 'Een persoonlijk verhaal, onderbouwd met concrete lessen. Geen abstracte theorie, maar wat er echt gebeurt in een internationale scale-up. Op maat af te stemmen op je publiek en de setting van je event.' },
    ],
    bookingHeading: 'Boeken',
    bookingText: 'Ik werk exclusief samen met Athenas. Neem via onderstaande button contact op voor beschikbaarheid en tarief.',
    testimonialsHeading: 'Wat anderen zeggen',
    testimonials: [
      { quote: 'Inspirerend en confronterend verhaal van deze jonge ondernemer.', name: 'S. Koot', role: 'Jonge Ondernemers Club Plus' },
      { quote: 'Een uniek persoonlijk ondernemersverhaal.', name: 'P. de Boer', role: 'NHL Stenden' },
      { quote: 'Niet alleen de successen werden gedeeld maar vooral ook de valkuilen en weer opstaan. Een indrukwekkend ondernemersverhaal van dromen en doorzetten naar internationaal succes.', name: 'Oranjewoud Export Academy', role: '' },
      { quote: 'Milan en Patrick van der Meulen hebben een mooie presentatie gegeven over de noodzaak van ondernemerschap. Leuke jonge mannen, die goed aansloten bij onze doelgroep ondernemers en studenten!', name: 'Hogeschool InHolland', role: '' },
    ],
    spokenAtHeading: 'Eerder gesproken bij',
    spokenAtEyebrow: 'SPREKER OP',
    spokenAtSubtext: 'Van internationale podia tot lokale initiatieven. Een greep uit de organisaties waar ik mijn verhaal mocht delen.',
    spokenAtMore:    'EN VELE ANDEREN',
    spokenAtCta:     'Boek lezing',
    spokenAt: ['ABN AMRO MeesPierson', 'World Youth Forum', 'Sziget Festival', 'University College London', 'Energy Tech Summit', 'Ennatuurlijk', 'Van Hall Larenstein', 'NHL Stenden', 'Plus Supermarkt', 'Rabobank', 'Hanze University of Applied Sciences', 'Van Dorp Installaties', 'University of Groningen', 'Mazda', 'Climate Reality Project'],
    awardsHeading: 'Awards en mijlpalen',
    awards: [
      { title: 'Best For The World™ 2022: Environment', by: 'B Corp', date: 'jan. 2022' },
      { title: 'FD Gazelle (middelgroot)', by: 'FD', date: 'mrt. 2022' },
      { title: 'Technology Fast 50 2021', by: 'Deloitte', date: 'jan. 2021' },
      { title: 'Best For The World™ 2021: Environment', by: 'B Corp', date: 'jan. 2021' },
      { title: 'Duurzame Jonge 100', by: 'DJ100', date: 'jun. 2017' },
      { title: "Sprout Top 3 'Beste jonge ondernemers van 2016'", by: 'Sprout', date: 'jun. 2016' },
    ],
    ctaHeading:   'Boek Milan voor jouw event',
    ctaPrimary:   'Boek via Athenas',
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
