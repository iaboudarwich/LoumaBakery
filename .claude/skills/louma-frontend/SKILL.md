---
name: louma-frontend
description: Frontend design discipline for the Louma site. Flatness, square shapes, structure, the motion whitelist, and the non-negotiable accessibility and performance floor. Use when building or restyling any UI.
---

# Louma Frontend Discipline

## Principles
- FLAT: no box-shadows, no CSS gradients, no backdrop blur, anywhere. Depth = surface color change + 1px hairline borders (--hairline / --hairline-strong tokens).
- Shape language: square. Every radius is 0 (the --radius-* tokens are 0): buttons, tags, chips, inputs, cards, photos, the nav. Never add a border-radius.
- Buttons: only .btn.btn-primary (catering/careers submit, 404 CTA: solid burgundy, butter text, square) and the hidden newsletter's .btn-coral. The Shop has no buttons: a product with a link is one link card; without, a plain "Coming soon" label. A submit disabled while sending is a dashed ghost.
- Menu: plain text in two columns from 48rem, food left and drinks right (each category's `column` in menu.json), one list food-first below; red category headings clamp(24px,1.95vw,28px), items one per line in Owners 400 --fs-item burgundy, --space-2 apart, item notes --fs-small burgundy 80%, category notes after the items; a plain wrapping row of category links (not sticky); no Food/Drinks headings, drawings, prices, photos or item reveal.
- Shop: a plain grid of square tiles (3/2/1 columns) in the shop.json order (Louma Hat, Maple Pecan Tarte, Burnt Basque Cheesecake, Berry Tart, Gift Card), cover photos, contain cutouts on butter, a burgundy gift card tile with the butter wordmark; name, price, note under each; no boxes or borders.
- Colour: only the eight brand tokens (tokens.css). Red is primary, but red text must be 24px+ (or bold 18.66px+) because red on butter is 3.86:1; small text is ink or burgundy, links burgundy.
- Type: Owners only, three faces in use (Owners 500 for titles, headings, emphasis, buttons and data; 400 body; Narrow 700 only in the header nav). The footer is burgundy with butter text in normal type (400 body, 500 small uppercase heading). Never request italics or other weights; font-synthesis is off.
- Body text (owner round 3): no ink body copy. Every page body paragraph is burgundy at --fs-lead (line-height 1.45, paragraphs --block-gap apart), like the home intro. One shared rule in global.css: `.lead`, `.page-intro .lede` and `.text-row-body p` (the Our Story and Initiative sections). Applies to /, /story, /initiative, /visit and the 404. Not to the header, footer, menu items and notes, shop products, labels or form fields.
- Our Story: the whole page is butter. The letter sits on the page (no card, no white band), max 680px centred, one --block-gap under the title; sun top right, signature right, moon bottom left. One photo (the collage), 6 columns centred.
- Layout system (tokens.css): --container 1440px, --gutter, --section-y, --block-gap, the --fs-* type scale, and a 12-column grid (.grid-12 with --start/--span). Full-width colour blocks: burgundy, white, fairy. Photos straight, object-fit cover in a fixed aspect per slot, never filtered, overlaid or animated. See CLAUDE.md.
- Long body text max-width ~640px. Statements may slightly bleed their container.
- Astro gotcha: page-scoped styles neither reach child components nor beat their specificity; use :global(html.sys-slab) prefixes for slab overrides.
- Hero is a thesis: lead with the most characteristic thing (the morning bake, the face), not a generic big-number template.
- Precision over accessories: spacing, type and detail matter more than more effects. Remove one accessory before shipping.

## Motion (the COMPLETE whitelist; timings locked)
- Doodle reveal (Doodle.astro): one-shot 900ms, same bezier, at 30% in view; filled outlines (every master) reveal left to right via clip-path, stroked art draws via pathLength; observe the UNCLIPPED wrapper; watchdog so nothing on screen stays hidden.
- Sketch draw-on-scroll (the 404 page's face; the footer face is static): one-shot ~1.1s, 80ms subpath stagger; the outline traces in, then the fill settles back.
- Entrances: fade + settle 16px DOWNWARD or fade in place; 500ms; children staggered 80ms; once, at ~30% in view. NEVER rise bottom-to-top.
- Photos never animate (no wipe, zoom, ken-burns, parallax, tilt). No marquee.
- Micro: button press scale ~0.98, brand-color focus ring. Underlines are plain solid lines everywhere (no wavy or dotted). In the footer all links share one line, 1px, offset 0.2em: the two emails are always underlined; Instagram, TikTok and the page links underline on hover and keyboard focus only.
- Nothing else. New effects require removing one and updating this list.
- All effects: flag-gated in features.ts + listed on /review; reduced-motion shows composed final states immediately; heavy motion off on mobile.

## Quality floor (every component)
Responsive to ~360px. Visible :focus-visible outlines. Keyboard operable. Meaningful images have alt; decorative alt="". AA contrast. width/height on images (no CLS). IO/rAF-driven handlers, 60fps. Hero image eager + fetchpriority=high; everything below the fold lazy with correct sizes. Zero console errors, astro check clean, no em dashes in rendered output.

## MOBILE / iOS RULES (locked)
- Viewport units: min-height 100vh fallback + 100svh pair. svh, never dvh. Hero-minus-header = calc(100svh - var(--nav-h)).
- Never width:100vw; html,body { overflow-x: clip } stays.
- Safe areas: viewport-fit=cover; pad CONTENT with env(safe-area-inset-*) via max(gutter, inset); band backgrounds reach true edges; nav + body offset grow by the top inset.
- Hover behaviors ONLY behind @media (hover:hover) and (pointer:fine); touch gets tap alternatives wherever hover carries meaning.
- Inputs >=16px computed (iOS zoom); inputmode/autocomplete set; never suppress user zoom; html.kb-open hides fixed bars while a field is focused.
- Tap targets >=44px; -webkit-tap-highlight-color transparent + touch-action manipulation on controls.
- NO live SVG filters anywhere: sketches render the *-baked.svg files (equal to the masters; scripts/bake-sketches.mjs copies them through); max 2 simultaneous draws, will-change on animating strokes.
- Nav: always-visible sticky bar (60px + safe-area below 48rem, 72px above); no hide-on-scroll.
- Reveals: one shared IO, fail-safe (hidden states only under JS-set classes; JS off = everything visible).
- Hero image <=150KB on mobile (AVIF, eager, fetchpriority=high). Fonts: the three Owners woff2 subsets only (owners-400, owners-500, owners-narrow-700), all three preloaded.
- theme-color AND body background both butter #FBF5D4 (Safari tints from either).
- Map: no iframe; the hand-drawn map SVG plus a plain "Get directions" link.
- No sticky bottom bar on phones.

## CSS hygiene
Watch selector specificity so section/element rules don't cancel paddings/margins. Prefer tokens over literal values. Keep critical nav/hero CSS inlined in the base head (BaseLayout) to protect first paint.
