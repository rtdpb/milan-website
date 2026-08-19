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
  samenwerken: {
    heading: 'Work with me',
    /** aria-label for the collaboration options grid */
    ariaLabel: 'Collaboration options',
    ladderEyebrow1: '01 — Start here for free',
    ladderEyebrow2: '02 — Go deeper',
    ladderEyebrow3: '03 — Work with me directly',
    cards: [
      {
        title:       'Newsletter',
        description: "Every month, honest lessons from my journey as a founder. No theory, no hype — only what actually works for entrepreneurs who want to grow without losing themselves. Written in Dutch.",
        cta:         'Subscribe for free',
      },
      {
        title:       'Talk / Keynote',
        description: 'Milan speaks for teams, events and conferences on entrepreneurship, scaling, and building a business that fits who you are. Sharp, honest, and straight from the field.',
        cta:         'Book a talk',
      },
      {
        title:       '1:1 Coaching',
        description: 'An intensive trajectory for founders ready for the next step. A sparring partner who has built what you are aiming for.',
        cta:         'Schedule intro call',
      },
    ],
  },

  // ── Testimonials Section ─────────────────────────────────────────────────
  testimonials: {
    heading: 'What others say',
    items: [
      {
        // D-01: name and role verbatim; quote faithfully translated
        quote: 'Milan has a rare ability to simplify complex challenges while keeping the human side of entrepreneurship at the centre. His coaching helped me delegate better and trust my team more.',
        name:  'Yang Soo Kloosterhof',
        role:  'Entrepreneur',
      },
      {
        // D-01: name and role verbatim; quote faithfully translated
        quote: 'Milan understands better than anyone how to build a business that truly fits you. His direct, honest approach helped me enormously during my growth phase.',
        name:  'Ruud Koornstra',
        role:  'Founder & Entrepreneur',
      },
      {
        // D-01: name and role verbatim; quote faithfully translated
        quote: "Milan's talk was an eye-opener for our members. His story of international scaling and the lessons learned resonated with everyone. A real recommendation for any entrepreneurship organisation.",
        name:  'Oranjewoud Export Academy',
        role:  'Entrepreneurship organisation',
      },
    ],
  },

  // ── Personal Story Section ───────────────────────────────────────────────
  story: {
    eyebrow:  'My story',
    heading:  'Why I now share what I have learned',
    body: [
      'I founded Soly with the conviction that clean energy had to be accessible to everyone. What followed were ten years of hard work, international expansion into 9 countries, 180 employees, and ultimately the bankruptcy of the company I had given everything to.',
      'That period taught me more than any MBA could have. About leadership, about delegation, about the moments when you lose yourself in your own company — and how to prevent that. Lessons learned the hard way, which I now share so others do not have to.',
      'Today I help founders at a crossroads. Those who know they can grow bigger, but also sense that the way they are working now is not sustainable. I am not a consultant with a framework — I am someone who has built, lost, and risen again.',
    ],
    signature: 'Milan van der Meulen',  // D-03: name verbatim
    imageAlt:  'Milan van der Meulen on stage.',
  },

  // ── Newsletter Section ────────────────────────────────────────────────────
  newsletter: {
    heading:     'Stay informed',
    // D-02: explicit "written in Dutch" statement
    subtext:     'A monthly honest update on entrepreneurship, scaling, and the lessons I learn along the way. The newsletter is written in Dutch.',
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
