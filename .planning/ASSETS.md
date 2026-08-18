# Assets Manifest

## Photography

Source archive: `fotos/wetransfer_10-jaar-soly-77-jpg_2026-08-18_1205.zip` (~86 MB, 6 photos).

**Rules**
- Original full-res files are **not** production assets — keep them out of the served bundle and out of git (add to `.gitignore`). Store originals under `assets/originals/` (or leave in the archive) separate from optimized web assets under `public/…` / `src/assets/…`.
- Generate responsive **AVIF + WebP** derivatives at multiple widths, with sensible focal-point crops per breakpoint.
- Use `srcset`/`sizes` + lazy loading (except the hero/LCP image, which loads eagerly).
- Do **not** generate replacement portraits or alter Milan's appearance.

### Source inventory

| Source file | Dimensions | Orientation | Description | Quality |
|---|---|---|---|---|
| `10 Jaar Soly-77.jpg` | 6588×4392 | landscape | Milan mid-talk, cream blazer, bold **yellow+blue** backdrop, confident expression, faces into frame | High |
| `10 Jaar Soly-78.jpg` | 6720×4480 | landscape | Milan speaking, clicker, bell-curve graph behind, clean space on left | High |
| `10 Jaar Soly-70.jpg` | 6616×4411 | landscape | Milan speaking, blue projector backdrop, calmer | High |
| `10 Jaar Soly-76 kopie.jpg` | 4311×6467 | **portrait** | Milan speaking, purple/blue light — only vertical shot | High |
| `Foto.jpeg` | 1440×960 | landscape | Milan + 2 others on stage, "ENERGY REVOLUTION / THINK GLOBAL ACT LOCAL" signs, huge crowd (Sziget) | Medium (1440w) |
| `_AVM2348.jpg` | 1920×1282 | landscape | Milan in navy blazer networking with people (STERK! event) | Medium (1920w) |

### Section → source mapping (proposed, adjustable)

| Homepage section | Source photo | Production name (example) | Notes |
|---|---|---|---|
| Hero | `10 Jaar Soly-77.jpg` | `milan-hero-stage.avif/webp` | On-brand yellow; LCP image, eager-load; wide crops for desktop, tighter portrait crop for mobile |
| Personal story ("Waarom ik nu…") | `10 Jaar Soly-76 kopie.jpg` | `milan-story-portrait.avif/webp` | Vertical fits editorial story column / signature block |
| Story — mission/origin beat | `Foto.jpeg` | `milan-energy-mission.avif/webp` | Supports "energietransitie" origin; use at mid size only (1440w source) |
| Collaboration / "Samenwerken" — Presentatie card | `10 Jaar Soly-78.jpg` | `milan-speaking-graph.avif/webp` | Speaking/lezing context |
| Collaboration — coaching / human touch | `_AVM2348.jpg` | `milan-networking.avif/webp` | "Meewerkende partner" vibe; mid size only (1920w source) |
| Testimonials | none | — | Text cards; no Milan photo needed |
| (Reserve / possibly unused) | `10 Jaar Soly-70.jpg` | — | Kept in reserve; do not force onto the page |

### Caveats

- No clean studio headshot exists. Where a tight founder portrait is needed, crop the vertical `-76`. If a proper headshot is wanted later, mark that slot with a labelled placeholder.
- `Foto.jpeg` (1440w) and `_AVM2348` (1920w) are lower-res → supporting/mid-size use only, never full-bleed hero.
- Record any change to this mapping here when the build finalizes crops.

## Fonts

- **Naste** (preferred, commercial): files not yet supplied. When received, drop web fonts (woff2) into `public/fonts/` and point the `--font-display`/`--font-brand` variable at them.
- **Fallback (MVP)**: a properly-licensed editorial lookalike, isolated behind one CSS variable so Naste swaps in with a single change.

## Placeholders to wire later

- Substack newsletter URL (Nieuwsbrief CTAs + Sectie 5 signup)
- Contact destination (header "Contact" CTA, "Boek lezing", "Plan kennismaking")
- LinkedIn profile URL (header icon)
- "Bekend van" press logos: MT Sprout, Quote, NOS, EenVandaag, Telegraaf, De Ondernemer
- Recent articles (Sectie 6) — static placeholder cards in v1

---
*Last updated: 2026-08-18*
