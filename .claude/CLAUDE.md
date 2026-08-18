<!-- GSD:project-start source:PROJECT.md -->

## Project

**Milan van der Meulen — Personal Brand Website**

A premium personal-brand website for **Milan van der Meulen**, an experienced founder who scaled Soly internationally (9 countries, ~180 employees, ~1M solar panels) before its failure, and now offers 1:1 founder coaching, speaking engagements, and a monthly newsletter for entrepreneurs. The site tells his honest founder story and generates qualified leads for coaching and speaking while growing his Substack. The first milestone delivers a polished, Dutch-language homepage on a foundation built to grow into a multi-page, bilingual site.

**Core Value:** Make Milan feel like a **credible, experienced, and honest founder** — human and distinctive, not a generic consultant template — so the right entrepreneurs reach out for coaching/speaking and subscribe to the newsletter.

### Constraints

- **Tech stack**: Astro — static-first, best-in-class SEO/performance, content collections for articles, first-class i18n for future NL/EN, straightforward path to a later CMS; islands for subtle animations. Decided over Next.js (lighter for a content site).
- **Brand — color**: Accent `#FFDD11` used sparingly as an accent, never blanketing the page.
- **Brand — typography**: Preferred typeface "Naste" (commercial; files not yet supplied). MVP uses a properly-licensed editorial lookalike as a fallback, isolated behind a single font variable so Naste can be swapped in later.
- **Design**: Premium, editorial, personal, confident, modern; strong typography + generous spacing; subtle, purposeful animations; high-quality responsive layouts (desktop/tablet/mobile); must feel human, not like an AI-generated SaaS landing page.
- **Assets**: Do not commit/serve the ~86 MB full-res originals as production assets; originals kept separate from optimized AVIF/WebP derivatives; responsive sizes + lazy loading.
- **Infra minimalism**: No auth, accounts, payments, database, or CMS in this milestone. Don't build infrastructure future phases will need until those phases.

<!-- GSD:project-end -->

<!-- GSD:stack-start source:STACK.md -->

## Technology Stack

Technology stack not yet documented. Will populate after codebase mapping or first phase.
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:

- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
