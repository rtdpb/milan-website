/**
 * src/i18n/en.ts
 * English UI strings — mirrors src/i18n/nl.ts shape exactly.
 *
 * DRAFT — flagged for Milan's review before final sign-off (D-03).
 * Copy is idiomatic International English (D-04), translated in Milan's
 * confident, honest, direct founder voice. NOT a word-for-word literal
 * translation of the Dutch.
 *
 * CONTENT RULES (D-01, D-02, D-03, HOME-11):
 * - Factual claims, numbers (12+, 180, 9), and names preserved VERBATIM.
 * - Testimonial names/roles byte-identical to nl.ts (D-01).
 * - newsletter.subtext, nieuwsbrief.subtext and articles contain explicit
 *   "written in Dutch" statements (D-02).
 * - All arrays have the same length as their nl.ts counterparts.
 *
 * Shape compatibility is enforced at build time by:
 *   const strings = { nl, en } satisfies Record<Locale, Strings>
 * in src/i18n/utils.ts. A missing/mistyped key fails `npm run build`.
 *
 * Phase 4: I18N-01, I18N-02
 */

export const en = {
  // ── Navigation ──────────────────────────────────────────────────────────
  nav: {
    coaching:    'Coaching',
    spreker:     'Speaking',
    nieuwsbrief: 'Newsletter',
    mijnVerhaal: 'My Story',
    boek:        'Book',
    contact:     'Contact',
    /** Kept for structural parity; not used in the Phase 4 switch element */
    nlEnSwitch:  'NL | EN',
    /** aria-label for LinkedIn icon */
    linkedin:    "Milan van der Meulen's LinkedIn",
    /** aria-label for mobile hamburger open */
    openMenu:    'Open menu',
    /** aria-label for mobile close button */
    closeMenu:   'Close menu',
    /** aria-label for the nav landmark */
    navLabel:    'Main navigation',
    /** aria-label for the wordmark home link */
    homeAria:    'to homepage',
  },

  // ── Hero Section ─────────────────────────────────────────────────────────
  hero: {
    eyebrow:      'Founder · Coach · Speaker',
    h1:           'Scale your business, without losing yourself',
    /** Word in h1 to highlight with the yellow underline (feedback: 'scale', not 'losing'). */
    hlWord:       'Scale',
    subtext:      'I help bold entrepreneurs scale their business — not from abstract theory, but from lived experience.',
    ctaPrimary:   'Contact',
    ctaSecondary: 'My story',
    usp1: '12+ years',       // D-03: verbatim number, only unit translated
    usp2: '180 employees',   // D-03: verbatim number
    usp3: '9 markets',       // D-03: verbatim number
    /** Proof points, integrated into the hero panel (numbers verbatim, D-03). */
    stats: [
      { value: '12+',   label: 'years experience' },
      { value: '€200M', label: 'revenue generated' },
      { value: '180',   label: 'employees' },
      { value: '9',     label: 'markets' },
    ],
    /** Small supporting proof line for the hero proof-card (derived from the docx story). */
    proofLine: 'From kitchen table to international scale-up',
    /** Overlapping hero card — truthful CTA drawn from the existing coaching offer. */
    card: {
      eyebrow: '1:1 Coaching',
      title:   'Book an intro call',
      sub:     'A sparring partner who built what you want to reach.',
    },
  },

  // ── Press Strip ──────────────────────────────────────────────────────────
  pressStrip: {
    eyebrow: 'Featured in',
    /** title attribute on individual logo placeholder chips */
    logoPlaceholderTitle: 'Logo coming soon',
    /** aria-label suffix on individual logo placeholder chips ("{outlet} — {suffix}") */
    logoPlaceholderSuffix: 'logo coming soon',
    /** label for the PlaceholderBadge below the chip row */
    badgeLabel: 'Logos coming soon',
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

  // ── Samenwerken / Services Section ───────────────────────────────────────
  // Faithful translation of Input homepage Milan.docx §Sectie 2 (source-locked).
  // Card 1 keeps the approved "Written in Dutch." note (D-02).
  samenwerken: {
    heading: 'Work with me',
    subtext: 'Get inspired through my newsletter or a personal talk. Or take the next step in growing your business with exclusive coaching.',
    ariaLabel: 'Collaboration options',
    exclusiveLabel: 'Only 4 spots left',
    cards: [
      {
        label:       'Newsletter',
        tag:         'Free',
        title:       'A dose of inspiration',
        tagline:     'An honest lesson from real experience every month, straight to your inbox.',
        features:    ['Personal lessons on building & scaling', 'On leadership, funding, stress and burnout', 'Free — monthly, no spam'],
        cta:         'Subscribe for free',
      },
      {
        label:       'Talk',
        tag:         '',
        title:       'A unique entrepreneurial story',
        tagline:     'An honest, incisive story tailored to your event.',
        features:    ['A personal story with concrete lessons', 'Honest about the wins and the pitfalls', 'Tailored to your audience and setting'],
        cta:         'Book a talk',
      },
      {
        label:       'Exclusive support',
        tag:         '',
        title:       '1:1 Coaching',
        tagline:     'Intensive one-on-one guidance for a small number of founders.',
        features:    ['Sparring on the decisions that truly matter', 'Unlimited contact between sessions', 'Cancellable monthly — no lengthy programme'],
        cta:         'Schedule intro call',
      },
    ],
  },

  // ── Testimonials Section ─────────────────────────────────────────────────
  // Faithful translation of the VERBATIM docx testimonials; names + roles verbatim.
  testimonials: {
    eyebrow: 'Testimonials',
    heading: 'Feedback from the people who matter most',
    items: [
      {
        quote: 'Milan gave our company the commercial direction it needs to grow in a scalable way',
        name:  'Yang Soo Kloosterhof',
        role:  'CEO Powerchainger',
      },
      {
        quote: 'Milan has unique insights for entrepreneurs, investors and directors',
        name:  'Ruud Koornstra',
        role:  'Entrepreneur',
      },
      {
        quote: "It wasn't only the successes that were shared, but above all the pitfalls and getting back up. An impressive entrepreneurial story of dreams and perseverance into international success.",
        name:  'Oranjewoud Export Academy',
        role:  '',
      },
    ],
  },

  // ── Personal Story Section ───────────────────────────────────────────────
  story: {
    eyebrow:  'My story',
    heading:  'Why I now share what I have learned',
    // Faithful translation of the VERBATIM 4-paragraph docx story (§Sectie 4).
    body: [
      "My entrepreneurship didn't begin with a business plan, but with a conviction: that entrepreneurship plays an essential role in solving big challenges. At nineteen I decided to put my energy into the energy transition and, together with my brother, founded Soly. What began as an idealistic initiative grew, over more than ten years, into an internationally operating company in nine countries, with nearly one million solar panels installed and more than 50 million in investment. We built our own technology, developed scalable commercial structures, and created a culture where people, impact and performance came together.",
      'But my story is not a smooth success story. Alongside growth, recognition and impact, I also came to know the hard sides of entrepreneurship. We made choices under pressure, worked with international investors, grew faster than was sometimes comfortable, and ultimately saw how a construct focused above all on speed and returns can break even strong impact-driven companies.',
      'I lost myself in a burnout. And not long after, the company. The bankruptcy of Soly became a turning point: painful, confronting, and at the same time formative. That experience sharpened my vision. I have experienced first-hand what works — and what does not — when scaling a company with a strong mission. I know how important strategy, culture, focus and the right kind of capital are. And I know how damaging the wrong incentives can be.',
      'Now I bring together everything I have learned. Not as a consultant, not as a traditional investor, but as a hands-on partner. With my experience I stand beside you as a founder. I help you scale your business without losing yourself.',
    ],
    signature: 'Milan van der Meulen',
    imageAlt:  'Milan van der Meulen on stage.',
  },

  // ── Timeline (v4.0) — Milan's journey as visual credibility ──────────────
  timeline: {
    eyebrow: 'The story in numbers',
    heading: 'From idea to 9 countries — and starting over',
    intro:   'Twelve years of building, growing, losing, and rising again. The route in short.',
    marketsLabel: '9 markets across Europe',
    /** Third headline stat — verbatim number from CLAUDE.md + en.story.body ("nearly one million solar panels") */
    solarPanelsValue: '~1M',
    solarPanelsLabel: 'solar panels',
    /** aria-label for the GrowthCurve SVG */
    growthCurveAriaLabel: "Soly's growth curve",
    /** JourneyRoute figure — 6 short node labels (mapped by index to the route) + aria-label */
    journeyNodes: ['Kitchen table', '9 countries', '180 people', 'Burnout', 'Bankruptcy', 'Now'],
    journeyAriaLabel: "Milan's route: from the kitchen table to 9 countries and nearly a million solar panels, through burnout and bankruptcy, to now as a founder coach.",
    items: [
      { kicker: 'The start',  stat: '',    statLabel: '',          title: 'Founding Soly',                              text: 'Started from the conviction that clean energy had to be accessible to everyone.' },
      { kicker: 'Expansion',  stat: '9',   statLabel: 'markets',   title: 'Scaling internationally',                    text: 'From one market to nine countries — each with its own team, pace and culture.' },
      { kicker: 'Growth',     stat: '180', statLabel: 'employees', title: 'A company that no longer fits in your head', text: 'Leadership at scale: delegating, trusting, and learning to let go.' },
      { kicker: 'The limit',  stat: '',    statLabel: '',          title: 'Burnout',                                    text: 'The point where the way I was working was no longer sustainable.' },
      { kicker: 'The end',    stat: '',    statLabel: '',          title: 'The bankruptcy',                             text: 'The company I had given everything to fell apart. No romance — but clarity.' },
      { kicker: 'Today',      stat: '',    statLabel: '',          title: 'Coach & speaker',                            text: 'I pass on what those years taught me to founders who want to learn it sooner than I did.' },
    ],
  },

  // ── Newsletter Section ────────────────────────────────────────────────────
  // Faithful translation of docx §Sectie 5. Honest Substack redirect (see nl note).
  newsletter: {
    heading:     'Stay informed',
    statement:   '5-minute read that can save you 5 years',
    subtext:     'Subscribe to my monthly newsletter and receive personal lessons on how to build a company — from the kitchen table to nine countries. Written in Dutch.',
    labelEmail:  'Email address',
    cta:         'Subscribe',
    disclaimer:  'No spam. Unsubscribe whenever you want.',
  },

  // ── Articles Section ──────────────────────────────────────────────────────
  articles: {
    // D-02: explicit "written in Dutch" statement in heading
    heading: 'Recent articles (written in Dutch)',
    seeAll:  'All articles',
    /** Placeholder article cards — clearly fictional, no real facts (D-10) */
    items: [
      {
        category:  'Leadership',
        title:     'How I learned to delegate without losing control',
        excerpt:   'The moment a founder realises they are the biggest obstacle to their own growth.',
        date:      'January 2026',
        readTime:  '5 min read',
      },
      {
        category:  'Scaling',
        title:     'Scaling in 9 markets: what I would do differently',
        excerpt:   'Looking back at international expansion — without the romanticism that tends to get woven around it later.',
        date:      'December 2025',
        readTime:  '7 min read',
      },
      {
        category:  'Entrepreneurship',
        title:     'The question I ask myself every month as an entrepreneur',
        excerpt:   'One question that keeps me honest about the direction of my work and the choices I make.',
        date:      'November 2025',
        readTime:  '4 min read',
      },
    ],
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    tagline:      'Founder, coach and speaker.',
    navHeading:   'Navigation',
    legalHeading: 'Legal',
    privacy:      'Privacy policy',
    terms:        'Terms and conditions',
    copyright:    '© 2026 Milan van der Meulen. All rights reserved.',
    /** Legal entity line (feedback). */
    legalEntity:  'Milan van der Meulen is a trade name of YM Holding B.V. · CoC 63057298',
  },

  // ── Privacy Policy Page ─────────────────────────────────────────────────────
  privacy: {
    pageTitle: 'Privacy policy — Milan van der Meulen',
    pageDesc:  'How Milan van der Meulen (YM Holding B.V.) handles your personal data.',
    eyebrow:   'Legal',
    heading:   'Privacy policy',
    intro:     'We attach great importance to protecting your personal data. In this privacy policy we explain which data we collect, why we do so, and how we handle your data with care.',
    sections: [
      {
        heading: 'Which personal data do we process?',
        body: [
          'We only process personal data that you actively provide to us or that is collected automatically when you use our website.',
          'This may include:',
        ],
        items: ['Name', 'Email address', 'Phone number', 'Company name', 'Contents of contact or intake forms', 'IP address', 'Data about your visit to the website (e.g. pages, time, browser)'],
        note: '',
      },
      {
        heading: 'How we use your data',
        body: ['We use your personal data solely for the following purposes:'],
        items: ['To contact you in response to a request or message', 'To deliver our services (such as coaching or talks)', 'To schedule introductory or intake calls', 'To improve our website and services', 'For administrative and legal obligations'],
        note: 'We do not use your data for unsolicited marketing and never sell it to third parties.',
      },
      {
        heading: 'Legal bases for processing',
        body: ['We process personal data on the basis of:'],
        items: ['your consent', 'the performance of an agreement or preparation thereof', 'a legitimate interest (such as business operations and website analytics)', 'a legal obligation (where applicable)'],
        note: '',
      },
      {
        heading: 'Sharing data',
        body: ['We only share your personal data with third parties where necessary for:'],
        items: ['delivering our services', 'the use of IT services (such as email, hosting, analytics)', 'complying with legal obligations'],
        note: '',
      },
      {
        heading: 'Cookies',
        body: ['We use functional and analytical cookies to make the website work properly and to analyse usage. For analytical cookies (such as Google Analytics), IP addresses are anonymised where possible.'],
        items: [],
        note: '',
      },
      {
        heading: 'Retention period',
        body: ['We do not retain personal data longer than necessary for the purpose for which it was collected, unless we are legally required to keep it longer.'],
        items: [],
        note: '',
      },
      {
        heading: 'Changes to this policy',
        body: ['We reserve the right to amend this privacy policy. The most current version is always available on our website.'],
        items: [],
        note: '',
      },
    ],
    entity: 'Milan van der Meulen is a trade name of YM Holding B.V. · CoC 63057298',
  },

  // ── Contact Page ─────────────────────────────────────────────────────────
  contact: {
    pageTitle:      'Contact — Milan van der Meulen',
    pageDesc:       'Get in touch about coaching, a keynote, or a general question. Milan responds personally.',
    heading:        "Let's get acquainted",
    subtext:        'Fill in the form and I will get back to you as soon as possible.',
    labelOnderwerp: 'Subject',
    optionAlgemeen: 'General',
    optionLezing:   'Book a talk',
    optionCoaching: 'Schedule intro call',
    labelNaam:      'Name',
    labelEmail:     'Email address',
    labelBericht:   'Message',
    ctaSubmit:      'Send message',
    ctaSubmitting:  'Sending…',
    successMsg:     "Thank you! I'll be in touch soon.",
    errorMsg:       'Something went wrong. Please try again or email me directly.',
    errorNetwork:   'No connection. Check your internet and try again.',
    emailSubject:   'New message via milanvandermeulen.nl',
  },

  // ── Coaching Page ─────────────────────────────────────────────────────────
  coaching: {
    pageTitle:  'Coaching for founders — Milan van der Meulen',
    pageDesc:   '1:1 coaching for founders who are scaling. From someone who built, lost, and rose again — not a theoretical framework, but lived experience.',
    eyebrow:    '1:1 Coaching',
    heroTitle:  'The right choices are priceless',
    heroImageAlt: 'Portrait of Milan van der Meulen.',
    intro: [
      'You have market fit. Your team is running. And still this phase feels heavier than the last. More pressure, more people depending on you, more decisions you have to make alone because no one around you knows exactly what it is like to be in it.',
      'I know that phase. Together with my brother I built a company from the kitchen table to nine countries with 180 employees, raised more than 50 million in capital from parties like Shell and ABP, and experienced first-hand what growth does to a company and to a person. I have seen the good decisions work, and watched the wrong ones take their toll. That lived experience — including the bankruptcy and my own burnout — is exactly why entrepreneurs ask for me: not for a consultant with a theoretical framework, but for someone who has stood in the middle of it.',
      'In a coaching trajectory I work intensively with a small number of founders at a time. No general tips, but sparring on the decisions that truly matter now: scaling smartly, making the right hire, building a team that grows with you instead of breaking, funding strategy, and how to stay standing yourself as the pressure rises. I am directly reachable between sessions, so you never have to wait weeks with a question that cannot wait. After all, that is what we are entrepreneurs for.',
    ],
    packagesHeading: 'Packages',
    priceOnRequest:  'Price on request',
    packages: [
      {
        name:     'Single session',
        price:    '€200 one-off',
        desc:     'Need quick advice? Book a single 45-minute session. You can send your topic in advance so we can go deep quickly. You leave the session with an honest insight and a concrete next step.',
        features: ['45-minute session', 'Includes short preparation', '10% off a 2nd session'],
        cta:      'Book a session',
      },
      {
        name:     'Coaching programme',
        price:    '€1,495 per month',
        desc:     'Ongoing coaching from someone who knows what it is like to build a company. Subject to a good mutual introduction, of course.',
        features: ['2× 60-minute coaching per month', '1× deep-dive day per quarter', 'Access to a relevant network', 'Unlimited contact via WhatsApp', 'Cancellable monthly'],
        cta:      'Schedule intro call',
      },
    ],
    reviewsHeading: 'What others say',
    reviews: [
      {
        quote: 'It was incredible speaking with Milan. He was exceptionally generous with his thoughts, and I gained immense value from our conversation. As a true industry expert, his ‘headline’ advice has already given me a clear path to transforming our outreach strategy. I’m very much looking forward to our future conversations. Thank you, Milan, for your time and insight!',
        name:  'Amber',
        role:  '',
      },
      {
        quote: 'Milan gave our company the commercial direction it needs to grow in a scalable way',
        name:  'Yang Soo Kloosterhof',
        role:  'CEO Powerchainger',
      },
    ],
    trajectHeading: 'Example of a coaching trajectory',
    trajectSteps: [
      { label: 'Week 1',   title: 'Getting to know you and your company', text: 'Understanding your challenges and what is holding you back from growing further. The first insights already surface.' },
      { label: 'Week 2–4', title: 'Building momentum',                     text: 'Deep dives on the core challenges. Formulating and implementing actions. Getting maximum insight into your business processes.' },
      { label: 'Beyond',   title: 'Continuous guidance',                   text: 'Alongside the sessions we stay in ongoing contact. Every quarter a strategy day where we look together at future growth. In this phase I also connect you to relevant contacts in my network.' },
    ],
    faqHeading: 'Frequently asked questions',
    faq: [
      { q: 'How do we start?', a: 'After you fill in the contact form I get in touch for an introduction. If there is a mutual match, we can start.' },
      { q: 'How long does a trajectory last?', a: 'My goal is to add as much value as possible. As soon as you or I feel that has run its course, the trajectory can stop at any time (with a one-month notice period).' },
      { q: 'Do I need to prepare anything for a session?', a: 'In principle we work through the question during the session. You may share information in confidence beforehand to prepare.' },
      { q: 'What is this not for?', a: 'It is important to be transparent about your question and not make it look better than it is. I use an honest, clear style to help you make the right choice — so you are open to feedback and other perspectives.' },
    ],
    ctaHeading:    'Ready for the next step?',
    ctaPrimary:    'Schedule intro call',
    ctaSecondary:  'More about me',
    networkingAlt: 'Milan in conversation with entrepreneurs at an event.',
  },

  // ── Mijn Verhaal / About Page ─────────────────────────────────────────────
  mijnVerhaal: {
    pageTitle:  'My Story — Milan van der Meulen',
    pageDesc:   "The honest story of Soly: international expansion into 9 countries, 180 employees, and the bankruptcy that changed everything.",
    eyebrow:    'My story',

    // ── Header ────────────────────────────────────────────────────────────
    heroEyebrow:  'The story behind Soly',
    heroTitle:    'Lived lessons',
    heroImageAlt: 'Milan van der Meulen on stage.',

    // ── In the media ──────────────────────────────────────────────────────
    mediaHeading: 'In the media',
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

    // ── Arc 1: The beginning ──────────────────────────────────────────────
    arc1Eyebrow: 'The beginning',
    arc1Heading: 'From conviction to company',
    arc1Body: [
      'I founded Soly with the conviction that clean energy had to be accessible to everyone. Not from a business plan or an investor deck, but from a genuine belief that this could — and should — happen.',
      "In the early years, everything was manual, everything was improvised, everything was done by a small team working harder than was wise. But it worked. We grew, we learned, and we built something that genuinely mattered to people.",
    ],

    // ── Arc 2: International expansion ───────────────────────────────────
    arc2Eyebrow: 'The expansion',
    arc2Heading: 'Growing to 9 countries and 180 people',
    arc2Body: [
      'At a certain point, Soly was operating in 9 countries. We had nearly 180 employees. Solar panels on the roofs of families across Europe. That sounds like success — and in many ways it was.',
      'But scaling internationally is different from scaling in your home market. Every market demands its own approach, its own people, its own pace. I learned that the hard way: through mistakes I could not have anticipated.',
      'I learned what it means to build a company that no longer fits inside your head. To make decisions with incomplete information. To trust a team larger than you ever thought possible.',
    ],

    // ── Arc 3: The bankruptcy ─────────────────────────────────────────────
    arc3Eyebrow: 'The bankruptcy',
    arc3Heading: 'The company I had given everything to fell apart',
    arc3Body: [
      "And then it fell apart. Soly went bankrupt. The company I had poured ten years of my life into — my energy, my time, my identity — was suddenly gone.",
      "I won't give you the romanticised version. It was hard. There were creditors, people who lost jobs, partners who were dragged down with it. There were nights when I did not know how to move forward.",
      'But there was also something else. A clarity I had never had before. About what truly matters. About what I had genuinely learned. About who I was when you strip away the success.',
    ],

    // ── Arc 4: Today ──────────────────────────────────────────────────────
    arc4Eyebrow: 'Today',
    arc4Heading: 'Why I now share what I have learned',
    arc4Body: [
      "Today I help founders at a crossroads. Those who know they can grow bigger, but also sense that the way they are working now is not sustainable.",
      "I am not a consultant with a framework. I am not a coach who has been successful without ever having fallen. I am someone who has built, lost, and risen again — and who now passes on the lessons that produced to others who want to learn them sooner than I did.",
      "Not because I have all the answers. But because I know the questions — the real ones, the ones you ask yourself at night when the company is quiet and you are alone with your doubts.",
    ],

    // ── Terminal CTA ──────────────────────────────────────────────────────
    ctaEyebrow:   'Ready for the next step?',
    ctaHeading:   "Let's get acquainted",
    ctaPrimary:   'Schedule intro call',
    ctaSecondary: 'Read about speaking',
    /** Story teaser link on the homepage Story section */
    teaserLink:   'Read my full story →',
  },

  // ── Spreker / Speaking Page ───────────────────────────────────────────────
  spreker: {
    pageTitle:  'Speaker — Milan van der Meulen',
    pageDesc:   'Milan tells the honest story behind Soly: building, breaking, and starting over. Book him as a speaker via Athenas.',
    eyebrow:    'Speaker',
    heroTitle:  'A story that stays with you',
    heroImageAlt: 'Milan van der Meulen speaking on stage.',
    intro: [
      'At nineteen I started, with my brother at the kitchen table, on what would become Soly: a company that grew to nine countries, with capital from Shell and pension fund ABP, and nearly a million solar panels installed. On 25 November 2025 that same company, after 12.5 years of building, went bankrupt.',
      'I share that story not for sympathy, but because it holds the lessons most success stories skip. About successful growth and entrepreneurial adventures. About how the wrong incentives can break a strong company from within. About leadership under pressure, and what happens when your own limits gave out long before your company did.',
      'This is not a polished success story with a neat ending. It is an honest, incisive reconstruction of building, breaking, and starting over. With concrete lessons for anyone who carries responsibility for growth, capital, or people.',
    ],
    infoBlocks: [
      { title: 'Who it is for', text: 'Entrepreneurs, directors, and investors dealing with growth, scale, capital, or leadership under pressure. Suited to corporate events, investor gatherings, industry associations, and leadership programmes.' },
      { title: 'What you get', text: 'A personal story, backed by concrete lessons. No abstract theory, but what really happens inside an international scale-up. Tailored to your audience and the setting of your event.' },
    ],
    bookingHeading: 'Booking',
    bookingText: 'I work exclusively with Athenas. Use the button below to get in touch about availability and fee.',
    testimonialsHeading: 'What others say',
    testimonials: [
      { quote: 'Inspiring and confronting story from this young entrepreneur.', name: 'S. Koot', role: 'Jonge Ondernemers Club Plus' },
      { quote: 'A uniquely personal entrepreneurial story.', name: 'P. de Boer', role: 'NHL Stenden' },
      { quote: 'Not only the successes were shared, but above all the pitfalls and getting back up. An impressive entrepreneurial story of dreams and perseverance into international success.', name: 'Oranjewoud Export Academy', role: '' },
      { quote: 'Milan and Patrick van der Meulen gave a great presentation about the necessity of entrepreneurship. Nice young men who connected well with our audience of entrepreneurs and students!', name: 'Hogeschool InHolland', role: '' },
    ],
    spokenAtHeading: 'Previously spoke at',
    spokenAt: ['ABN AMRO MeesPierson', 'World Youth Forum', 'Sziget Festival', 'University College London', 'Energy Tech Summit', 'Ennatuurlijk', 'Van Hall Larenstein', 'NHL Stenden', 'Plus Supermarkt', 'Rabobank', 'Hanze University of Applied Sciences', 'Van Dorp Installaties', 'University of Groningen', 'Mazda', 'Climate Reality Project'],
    awardsHeading: 'Awards and milestones',
    awards: [
      { title: 'Best For The World™ 2022: Environment', by: 'B Corp', date: 'Jan 2022' },
      { title: 'FD Gazelle (mid-sized)', by: 'FD', date: 'Mar 2022' },
      { title: 'Technology Fast 50 2021', by: 'Deloitte', date: 'Jan 2021' },
      { title: 'Best For The World™ 2021: Environment', by: 'B Corp', date: 'Jan 2021' },
      { title: 'Duurzame Jonge 100', by: 'DJ100', date: 'Jun 2017' },
      { title: "Sprout Top 3 'Best young entrepreneurs of 2016'", by: 'Sprout', date: 'Jun 2016' },
    ],
    ctaHeading:   'Book Milan for your event',
    ctaPrimary:   'Book via Athenas',
  },

  // ── Nieuwsbrief / Newsletter Page ────────────────────────────────────────
  nieuwsbrief: {
    pageTitle:      'Newsletter — Milan van der Meulen',
    // D-02: explicit "written in Dutch" statement
    pageDesc:       "A monthly honest update on entrepreneurship, scaling, and leadership. Subscribe to Milan's Substack newsletter. Written in Dutch.",
    eyebrow:        'Newsletter',
    heading:        'Honest lessons for entrepreneurs who want to grow',
    // D-02: explicit "written in Dutch" statement
    subtext:        'A monthly honest update on entrepreneurship, scaling, and the lessons I learn along the way. No spam, no tips you already know. Written in Dutch.',
    cta:            'Subscribe on Substack',
    archiveHeading: 'Previously published',
    valueProps: [
      { label: 'Honest',    description: 'No glossy success stories — only what actually works.' },
      { label: 'Practical', description: 'Actionable lessons, straight from the founder field.' },
      { label: 'Monthly',   description: 'One update per month, never more.' },
    ],
  },

  // ── Book / Pre-order Page (BOOK-01, Phase 5) ──────────────────────────────
  boek: {
    pageTitle:     'Book — Milan van der Meulen',
    pageDesc:      'The book Milan is writing about scaling without losing yourself. Sign up for updates.',
    eyebrow:       'Coming Soon',
    heading:       'A book about scaling without losing yourself',
    body:          [
      "I'm writing a book. About what I learned in ten years of building, growing, and ultimately failing.",
      'Not a success story — an honest account of what really happens when you scale a company.',
    ] as const,
    subtext:       'Sign up for updates and be the first to hear the news.',
    ctaSubstack:   'Subscribe for updates',
    ctaNotify:     'Notify me',
    formHeading:   'Keep me posted',
    labelNaam:     'Name',
    labelEmail:    'Email address',
    ctaSubmit:     'Notify me',
    ctaSubmitting: 'Sending…',
    successMsg:    "Thanks! You'll hear from us when the book is ready.",
    errorMsg:      'Something went wrong. Please try again.',
    errorNetwork:  'No connection. Check your internet connection.',
    emailSubject:  'Book interest via milanvandermeulen.nl',
    checkoutCta:   'Pre-order',
    stickyCta:     'Book a call',
    orSeparator:   'or',
  },

  // ── Common / Shared ──────────────────────────────────────────────────────
  common: {
    /** Visible marker pill on placeholder cards */
    placeholderLabel: '[Placeholder]',
    /** aria-label for PlaceholderBadge elements */
    placeholderAriaLabel: 'Placeholder content — will be replaced with real content',
    /** Tooltip on all aria-disabled placeholder elements */
    disabledTooltip:  'Coming soon',
    /** NL|EN language switch label */
    nlEnSwitch: 'NL | EN',
    /** "Read more" link text */
    readMore: 'Read more →',
    /** Skip to content (a11y) */
    skipToContent: 'Skip to content',
  },
} as const;

export type EnStrings = typeof en;
