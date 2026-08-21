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
    subtext:      'I help bold entrepreneurs scale their business — not from abstract theory, but from lived experience.',
    ctaPrimary:   'Contact',
    ctaSecondary: 'My story',
    usp1: '12+ years',       // D-03: verbatim number, only unit translated
    usp2: '180 employees',   // D-03: verbatim number
    usp3: '9 markets',       // D-03: verbatim number
    /** Proof points, integrated into the hero panel (numbers verbatim, D-03). */
    stats: [
      { value: '12+', label: 'years experience' },
      { value: '180', label: 'employees' },
      { value: '9',   label: 'markets' },
    ],
    /** Small supporting proof line for the hero proof-card (derived from the docx story). */
    proofLine: 'From kitchen table to 9 markets',
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
    exclusiveLabel: 'Maximum of 8 founders',
    cards: [
      {
        label:       'Newsletter',
        tag:         'Free',
        title:       'A dose of inspiration',
        description: 'Every month I share a lesson about building a company — from the kitchen table to nine countries. Personal experiences on leadership, funding, stress, identity, burnout, and life after the entrepreneurial journey. Written in Dutch.',
        cta:         'Subscribe for free',
      },
      {
        label:       'Talk',
        tag:         '',
        title:       'A unique entrepreneurial story',
        description: 'Book a talk in which I give full insight into the unique entrepreneurial story of Soly. Honest and intense. About the raw startup phase, a failed acquisition over conflicting interests, about pride, guilt, and the lessons I learned.',
        cta:         'Book a talk',
      },
      {
        label:       '1:1 Coaching',
        tag:         '',
        title:       'Exclusive support',
        description: 'I guide a maximum of 8 founders one-on-one. With personal coaching you grow smarter, attract the right investors, and avoid mistakes that slow your growth. No lengthy programmes — cancellable the moment you feel my value ends.',
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
      "My entrepreneurship didn't begin with a business plan, but with a conviction: that entrepreneurship plays an essential role in solving big challenges. At nineteen I decided to put my energy into the energy transition and, together with my brother, founded Soly. What began as an idealistic initiative grew, over more than ten years, into an internationally operating company in nine countries, with nearly one million solar panels installed. We built our own technology, developed scalable commercial structures, and created a culture where people, impact and performance came together.",
      'But my story is not a smooth success story. Alongside growth, recognition and impact, I also came to know the hard sides of entrepreneurship. We made choices under pressure, worked with investors, grew faster than was sometimes comfortable, and ultimately saw how a construct focused above all on speed and returns can break even strong impact-driven companies.',
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
    pageTitle:  'Coaching for Founders — Milan van der Meulen',
    pageDesc:   '1:1 coaching for founders ready for the next step. A sparring partner who has built, lost, and risen again.',
    eyebrow:    '1:1 Coaching',
    heading:    'Scale without losing yourself',
    body: [
      'After ten years of building, expanding internationally into 9 countries, managing 180 employees — and ultimately going through bankruptcy — I know what is at stake as a founder. Not from theory, but from up close.',
      'I coach founders who are ready for the next step, but feel that their current way of working is not sustainable. Together we look at what is truly needed: better delegation, sharper choices, or simply the space to stop what is not working.',
      'This is not a standardised coaching programme. It is an intensive 1:1 trajectory where I think alongside you from lived experience.',
    ],
    offerHeading:  'What we work on together',
    offerEyebrow:  'Approach',
    offerCards: [
      {
        title:       'Sharp diagnosis',
        description: 'We start with an honest conversation about where you are now and what is holding you back. No standard intake — just a direct conversation between two entrepreneurs.',
      },
      {
        title:       'Intensive guidance',
        description: 'Regular 1:1 sessions focused on the decisions that matter. Delegating, growing, letting go — what you need, not what the programme prescribes.',
      },
      {
        title:       'Direct sparring',
        description: 'You can reach me when you need a sounding board between sessions. I think alongside you at the moment it truly counts.',
      },
    ],
    testimonialEyebrow: 'What others say',
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
    pageDesc:   'Milan speaks for teams, events and conferences on entrepreneurship, scaling, and honest leadership. Book him for your event.',
    eyebrow:    'Speaker',
    heading:    'An honest story about building, failing, and rising again',
    body: [
      'I built Soly from a startup into a company with 180 employees in 9 countries. And I watched it fall. I tell that story not with the romanticism that tends to get woven around it later, but as it was.',
      'I speak for entrepreneurship organisations, corporates, and events about scaling, leadership, and the moments when you are truly tested as a founder. Honest, direct, and straight from real experience.',
    ],
    aanbodHeading:  'Talks and keynotes',
    aanbodEyebrow:  'Offer',
    aanbodCards: [
      {
        title:       'Scale without breaking',
        description: "On the choices, mistakes, and lessons from Soly's international expansion. What works when building a team across multiple markets — and what really doesn't.",
      },
      {
        title:       'Honest leadership',
        description: 'Leadership is not about having all the answers. It is about asking the right questions — and the courage to do what is necessary, even when it hurts.',
      },
      {
        title:       'The entrepreneur behind the company',
        description: 'How do you stay yourself as a founder under pressure? On identity, choices, and the difference between growing as a business and growing as a person.',
      },
    ],
    testimonialEyebrow: 'What others say',
    ctaHeading:   'Book Milan for your event',
    ctaPrimary:   'Book a talk',
    speakingAlt:  'Milan explaining a chart during a presentation.',
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
