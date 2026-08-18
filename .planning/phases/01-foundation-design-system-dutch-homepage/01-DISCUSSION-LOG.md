# Phase 1: Foundation, Design System & Dutch Homepage - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-18
**Phase:** 1-Foundation, Design System & Dutch Homepage
**Areas offered:** Color & mood, Hero treatment, Services & testimonials, Forms & placeholders
**Areas discussed:** Color & mood, Hero treatment (user chose these two; the rest left to Claude's discretion)

---

## Color & Mood

### Base theme
| Option | Description | Selected |
|--------|-------------|----------|
| Light editorial | Off-white/cream, near-black text, Sevora-style | |
| Dark base | Dark charcoal/black throughout | |
| Light with dark feature bands | Mostly light + 1–2 full-width dark sections | ✓ |

### Yellow use
| Option | Description | Selected |
|--------|-------------|----------|
| Restrained accent | Yellow only on CTAs/highlights | |
| Signature moments | Restrained overall + a few deliberate bold yellow moments | ✓ |
| Minimal | Yellow almost only on primary buttons | |

### Secondary color
| Option | Description | Selected |
|--------|-------------|----------|
| Neutral only | Black/white/cream + yellow as sole accent | ✓ |
| Add deep navy/ink | Introduce docx-card navy as secondary | |

**User's choice:** Light base with dark feature bands · yellow as signature moments · neutral-only palette.
**Notes:** Reinforces "premium, not templated" and "don't cover the site in yellow."

---

## Hero Treatment

### Hero layout
| Option | Description | Selected |
|--------|-------------|----------|
| Split card | Text left / photo card right (Sevora-style) | ✓ |
| Full-bleed w/ overlay | Photo fills hero, text overlaid | |
| Split, image left | Mirror; points subject out of layout | |

### Hero photo treatment
| Option | Description | Selected |
|--------|-------------|----------|
| Embrace as signature | Keep the yellow backdrop as a signature moment | ✓ |
| Tone it down | Colour-grade/crop to neutralize yellow | |
| Use calmer alternate | Swap to -78 (graph backdrop) | |

### Press strip placement
| Option | Description | Selected |
|--------|-------------|----------|
| Directly under hero | Slim logo strip below hero (Sevora-style) | ✓ |
| Its own section lower | Separate credibility band further down | |

**User's choice:** Split card (text left / photo right) · embrace `10 Jaar Soly-77` yellow backdrop as a signature moment · press strip directly under hero.

---

## Claude's Discretion

- **Services & testimonials** — Dutch commitment-ladder 3-card "Samenwerken" + mixed-size testimonial mosaic with the 3 supplied quotes; no fabricated "trusted by N" stat.
- **Forms & placeholders** — newsletter → Substack redirect (inline form designed, submit is a clearly-marked placeholder until URL supplied); designed-but-clearly-flagged placeholder article cards; text/wordmark placeholder press chips; disabled+documented CTAs/nav for unknown destinations (no fake buttons).
- **Design system & build** — CSS-custom-property tokens; swappable brand-font variable (interim editorial serif display + grotesque body); Astro components + token/scoped CSS, minimal JS islands; subtle reduced-motion-aware animations; i18n-ready structure; Dutch informal "je" tone.

## Deferred Ideas

- Subpages (Coaching/Spreker/Mijn verhaal/Contact) → Phase 2 · contact/lead forms → Phase 2 · real Substack signup + live articles → Phase 3 · NL/EN switch + EN content → Phase 4 · book/pre-order + analytics + optional CMS → Phase 5 · LinkedIn feed → out of scope.
