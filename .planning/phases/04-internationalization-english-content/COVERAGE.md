# Phase 4 — API Coverage Declaration

No external API integration is added in this phase. Phase 4 localizes existing
pages (NL → NL/EN); the Substack RSS feed (`src/lib/rss.ts`, integrated in
Phase 3) and the Web3Forms contact endpoint (`ContactForm.astro`, integrated in
Phase 2) are reused **unchanged** — only their surrounding copy/labels are
translated. The API-coverage detector fires on these pre-existing terms; there
is no new integration to build a coverage matrix for.
