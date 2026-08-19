---
status: testing
phase: 05-book-pre-order-future-growth
source: [05-VERIFICATION.md]
started: 2026-08-19T17:05:00Z
updated: 2026-08-19T17:05:00Z
---

## Current Test

number: 1
name: Sticky CTA scroll behaviour
expected: |
  On the homepage and /boek, scrolling past the hero CTA reveals the fixed-bottom sticky CTA bar
  (IntersectionObserver toggle), and scrolling back up hides it. The bar is subtle/premium (no
  yellow, z-index above content, not a pop-up).
awaiting: user response

## Tests

### 1. Sticky CTA scroll behaviour
expected: Fixed-bottom sticky CTA appears when the hero CTA scrolls out of view and hides when it returns; subtle and non-intrusive on `/` and `/boek` (and their EN equivalents).
result: [pending]

### 2. Sticky CTA — prefers-reduced-motion
expected: With the OS "reduce motion" accessibility setting enabled, the sticky CTA appears/disappears instantly (no slide/transition), per D-07.
result: [pending]

### 3. BookInterestForm live state machine
expected: After `TODO_WEB3FORMS_ACCESS_KEY` is replaced with a real key, submitting the book "notify me" form walks through submitting → success (or validation/network error) states correctly, and lands in Milan's inbox with `type=boek-interesse`. The honeypot blocks bots.
result: [pending]

### 4. English book-page copy sign-off (D-03 draft)
expected: The `/en/book` copy reads like natural International English in Milan's founder voice, is factually accurate against the NL original, and the "coming / in the making" framing is honest (no implication the book is purchasable now).
result: [pending]

## Summary

total: 4
passed: 0
issues: 0
pending: 4
skipped: 0
blocked: 0

## Gaps

Resolved during execution (no longer pending):
- Code-review findings CR-01..CR-04 + WR-01..WR-06 were fixed (commits `bb1dc47`…`1732259`) before this UAT — including the trailing-slash Substack URL guard, base-safe NL sticky-CTA link, content-level smoke assertions, and removal of the false-affordance newsletter email field. Build + smoke green, 0 Dutch leaks in dist/en, Plausible inert on the placeholder domain.
- The 16 automated must-haves (book pages, hreflang, honest omitted checkout, dual capture, Plausible gating + 4 guarded goals, no consent banner, sticky-CTA presence, CMS-evaluation doc, no regressions) are VERIFIED in 05-VERIFICATION.md — the 4 items above are the runtime/human-judgment remainder.
