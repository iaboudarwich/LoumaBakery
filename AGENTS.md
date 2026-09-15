# Louma Bakery: agent notes

CLAUDE.md is the single source of truth for this repo (stack, design system,
motion whitelist, copy rules, mobile/iOS rules, definition of done). Read it
first; where anything here disagrees, CLAUDE.md wins.

Reality check for tools that read this file instead:
- CMS is Decap (self-hosted bundle in public/admin; /admin-demo is the test
  backend). Not Sveltia.
- Definition of done ends with the deploy verified (Netlify), not just a
  preview link handed over.
- Skills live in `.claude/skills/<name>/SKILL.md` (the only copy):
  `louma-brand` for visual/brand/voice, `louma-frontend` for layout, type,
  motion and the accessibility floor.
