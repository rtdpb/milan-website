# Roadmap: Milan van der Meulen — Personal Brand Website

**Created:** 2026-08-18
**Core Value:** Make Milan feel like a credible, experienced, and honest founder so the right entrepreneurs reach out for coaching/speaking and subscribe to the newsletter.

**Current milestone:** Phase 1 (the focused Dutch homepage MVP). Phases 2–5 are the planned growth path and are intentionally *not* built in the first milestone.

| # | Phase | Goal | Requirements | Success Criteria |
|---|-------|------|--------------|------------------|
| 1 | Foundation, Design System & Dutch Homepage | Ship a polished, responsive Dutch homepage on an extensible foundation | FND-01–10, HOME-01–11 | 5 |
| 2 | Supporting Pages & Lead-Gen Forms | Add the key subpages and make lead-capture work | PAGE-01–05 | 4 |
| 3 | Newsletter & Substack Integration | Wire real newsletter signup and live recent articles | NEWS-01–03 | 3 |
| 4 | Internationalization & English Content | Ship a working NL/EN switch with English content | I18N-01–02 | 3 |
| 5 | Book / Pre-order & Future Growth | Add the book pre-order path and growth/analytics (optional CMS) | BOOK-01, GROW-01–02 | 3 |

---

## Phase Details

### Phase 1: Foundation, Design System & Dutch Homepage

**Goal:** Deliver a premium, editorial, fully responsive Dutch homepage matching the docx, built on an Astro foundation with a reusable design system and an optimized image pipeline — the credible first impression that drives coaching/speaking leads and newsletter signups.
**Mode:** mvp
**Requirements:** FND-01, FND-02, FND-03, FND-04, FND-05, FND-06, FND-07, FND-08, FND-09, FND-10, HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, HOME-07, HOME-08, HOME-09, HOME-10, HOME-11
**Plans:** 6/6 plans complete
Plans:
**Wave 1**

- [x] 01-01-PLAN.md — Astro foundation + walking-skeleton tracer (config, tokens, fonts, SEO head, BaseLayout, image pipeline, Hero, `/`)

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 01-02-PLAN.md — Reusable UI kit + global header/footer + honest-CTA system + single-source content/config (nl.ts, config.ts)

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 01-03-PLAN.md — Credibility press strip + Samenwerken 3-card commitment ladder
- [x] 01-04-PLAN.md — Testimonials mosaic + dark-band personal Story + scroll-reveal island
- [x] 01-05-PLAN.md — Newsletter signup (disabled placeholder) + Recente artikelen placeholder cards

**Wave 4** *(blocked on Wave 3 completion)*

- [x] 01-06-PLAN.md — Full homepage assembly + a11y/SEO/perf/content-integrity audit + human-verify checkpoint

**Success Criteria:**

1. The Dutch homepage renders all docx sections (header, hero, credibility, samenwerken, testimonials, story, newsletter signup, recent articles, footer) with the supplied copy intact — obvious spelling/language errors may be corrected, but factual claims and names are not changed without consulting the user.
2. Layout is high-quality and responsive across desktop, tablet, and mobile; animations are subtle and respect reduced-motion.
3. Only optimized, responsive AVIF/WebP derivatives are used in production (hero = `10 Jaar Soly-77`); the ~86 MB full-res originals are never committed or served; each section's source photo is recorded in `ASSETS.md`.
4. Every supplied CTA with a known destination works; CTAs with unknown destinations are clearly documented and temporarily disabled (not clickable) — never fake "working" buttons that go nowhere. Missing logos/assets appear as clearly-marked placeholders.
5. Baseline SEO/metadata, accessibility, and performance pass (semantic HTML, alt text, focus states, strong Lighthouse/CWV); brand font is a swappable variable (Naste-ready).

### Phase 2: Supporting Pages & Lead-Gen Forms

**Goal:** Add the primary conversion subpages (Coaching, Spreker, Mijn verhaal, Contact) and make lead capture functional so "Boek lezing" / "Plan kennismaking" / Contact produce real inquiries.
**Mode:** mvp
**Requirements:** PAGE-01, PAGE-02, PAGE-03, PAGE-04, PAGE-05
**Plans:** 3/3 plans complete
Plans:

**Wave 1**

- [x] 02-01-PLAN.md — Tracer: end-to-end lead-capture slice (config constants + nl.contact, ContactForm.astro Web3Forms progressive-enhancement, /contact page, enable Nav Contact CTA)

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 02-02-PLAN.md — Coaching + Spreker editorial landing pages (photo extraction, nl copy, single-testimonial redistribution, Nav/Footer enablement)

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 02-03-PLAN.md — Mijn verhaal expanded story page + homepage CTA wiring (Hero/Samenwerken → contact flow, Story teaser link, Nav/Footer mijn-verhaal enablement)

**Success Criteria:**

1. Coaching, Spreker, and Mijn verhaal pages exist, styled with the Phase 1 design system.
2. A Contact page with a working form submits successfully to a real endpoint.
3. "Boek lezing" and "Plan kennismaking" CTAs route into the contact/lead flow.
4. New pages are SEO-, a11y-, and responsive-consistent with the homepage.

### Phase 3: Newsletter & Substack Integration

**Goal:** Replace newsletter/article placeholders with the real Substack: functional signup and an automatically updated recent-articles feed.
**Mode:** mvp
**Requirements:** NEWS-01, NEWS-02, NEWS-03
**Plans:** 3/3 plans executed

Plans:

**Wave 1**

- [x] 03-01-PLAN.md — Tracer: end-to-end RSS slice (fast-xml-parser, src/lib/rss.ts, sentinel-guarded homepage Articles feed, GitHub Actions deploy + daily cron) [NEWS-03]

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 03-02-PLAN.md — /nieuwsbrief editorial landing page + email-only honest Substack redirect signup (Newsletter.astro rewire, nl.nieuwsbrief copy) [NEWS-01, NEWS-02]

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 03-03-PLAN.md — Enable Nieuwsbrief in Nav (desktop+mobile), Footer, and the Samenwerken card + phase human-verify checkpoint [NEWS-01]

**Success Criteria:**

1. Newsletter signup connects to Substack and successfully subscribes a reader.
2. A dedicated newsletter page exists and converts.
3. The "Recente artikelen" section shows the latest real Substack posts automatically (placeholders removed).

### Phase 4: Internationalization & English Content

**Goal:** Turn the i18n-ready structure into a working bilingual site with a real NL/EN switch and English content.
**Mode:** mvp
**Requirements:** I18N-01, I18N-02
**Plans:** 2/2 plans executed

Plans:

**Wave 1**

- [x] 04-01-PLAN.md — Tracer: Wave-0 infra (`en.ts`, `utils.ts`, `scripts/smoke-i18n.js`) + config activation + locale-wired layout/BaseHead/Nav switch + homepage end-to-end bilingual (`/` NL + `/en/` EN) [I18N-01, I18N-02]

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 04-02-PLAN.md — Expansion: remaining component refactor + five EN pages at translated slugs (`/en/coaching`, `/en/speaking`, `/en/about`, `/en/newsletter`, `/en/contact`) + hreflang slug overrides + D-02 honest labels [I18N-01, I18N-02]

**Success Criteria:**

1. The NL/EN switch changes language and persists across navigation.
2. Homepage and existing pages have complete, quality English translations.
3. SEO handles both locales correctly (hreflang, localized metadata).

### Phase 5: Book / Pre-order & Future Growth

**Goal:** Add the book pre-order path and layer in conversion/analytics — and, if warranted, an editable content system.
**Mode:** mvp
**Requirements:** BOOK-01, GROW-01, GROW-02
**Success Criteria:**

1. A book / pre-order page exists with a working pre-order/interest capture.
2. Analytics and at least one conversion optimization are in place.
3. A CMS/editable-content approach is evaluated and, if adopted, integrated without destabilizing existing pages.

**Plans:** 3/3 plans executed
Plans:
**Wave 1**

- [x] 05-01-PLAN.md — Book/pre-order page tracer (BOOK-01): bilingual /boek + /en/book, dual interest capture, nav/footer enablement, checkout seam [Wave 1]
- [x] 05-03-PLAN.md — CMS evaluation (GROW-02): reasoned DEFER doc, content-collections migration named as prerequisite [Wave 1]

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 05-02-PLAN.md — Analytics + conversion optimization (GROW-01): production-gated Plausible, 4 conversion goals, sticky CTA [Wave 2]

---
*Last updated: 2026-08-19 after Phase 5 planning*
