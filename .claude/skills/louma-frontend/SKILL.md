---
name: louma-frontend
description: Frontend design discipline for the Louma site. Flatness, square shapes, structure, the motion whitelist, and the non-negotiable accessibility and performance floor. Use when building or restyling any UI.
---

# Louma Frontend Discipline

## Principles
- FLAT: no box-shadows, no backdrop blur, no CSS gradients, with one exception: the radial ink scrim behind the home hero tagline (contrast). Depth = surface color change + 1px hairline borders.
- Shape language: square. Every radius is 0 (the --radius-* tokens are 0): buttons, tags, chips, inputs, cards, photos, the nav. Never add a border-radius.
- Buttons: .btn.btn-primary (the shop's "Add to Cart", catering/careers submit, 404 CTA: solid burgundy, butter text, Owners 400 --fs-small, 44px, square; hover and focus a peach fill with ink text) and .btn-box, the same box outlined, not a control (the shop's "Coming soon"); the hidden newsletter keeps its .btn-coral. A submit disabled while sending is a dashed ghost.
- Menu page: a full-bleed burgundy band (the counter photo in the left half, "MENU" centred over the butter intro in the right half; phones: photo on top), the category links in two centred rows (Owners Narrow 700 uppercase, underlined, peach underline on hover/focus, not sticky), then the food and drinks columns from 48rem inside --wrap-menu (1035px), one list food-first below; category headings Owners Narrow 700 uppercase --fs-h2 burgundy; items --fs-item line-height 1.15; notes --fs-small uppercase (item notes burgundy 80%); no Food/Drinks headings.
- Header and menu: no links in the bar; the menu button left, the wordmark centred; burgundy on the home page, butter elsewhere; tall at the top (--head-h), the compact fixed bar once scrolled (--nav-h 72px, 60px on phones; one height transition). The menu (SiteMenu.astro, every width) is a full-screen burgundy dialog: the X where the button was, the wordmark centred, the five links (siteConfig.nav) in a ring around the baguette mark (the heart-scored roll); a vertical list on phones; focus trapped, Esc and X close and return focus, no page scroll behind, a short fade.
- Shop: a full-bleed burgundy band (the palm beside the title and intro, centred), then a grid of square tiles in --wrap-shop (1085px; 3/2/1 columns, 343px at 1440) in the shop.json order (Louma Hat, Maple Pecan Tarte, Burnt Basque Cheesecake, Berry Tart, Gift Card); cover photos, contain cutouts on butter, a burgundy gift card tile with the butter wordmark; the name (Owners Narrow 700 uppercase) and price on one line, the note at --fs-small, then "Add to Cart" (with a link) or the "Coming soon" box.
- Colour: only the eight brand tokens (tokens.css). Burgundy and butter carry the site (.surface-burgundy / .surface-butter set text, link and focus colours): the home page burgundy with a butter footer, every other page butter with a burgundy footer. Red only for titles and headings on butter pages, 24px+. Peach is the hover and focus accent, never resting text (2.58:1 on butter, 2.93:1 on burgundy): link underlines turn peach and 2px; icon controls (.icon-btn) show a 2px peach line under the icon; the button fills peach with ink text.
- Type: Owners only, three faces: Owners Narrow 700 uppercase for every title, heading and label, the hero tagline, product names, the menu's category links and the menu links; Owners 400 for body, intros, items, notes, links, footer text and buttons ("Follow along" too, not uppercase); Owners 500 for data and form fields. Sizes from the designer at 1440 (50/35/30/25/25/20/15) scaling linearly to phones. Body tracking --track-body 0.01em on every text element via a :where() rule; headings keep --display-track.
- Body text: no ink body copy. Page body paragraphs are burgundy at --fs-body (line-height 1.4): one shared rule in global.css (`.lead`, `.page-intro .lede`, `.text-row-body p`). The home intro sets --fs-lead in butter; the bands set butter.
- Our Story: the whole page is butter. The letter sits on the page (no card, no white band), max 680px centred, one --block-gap under the title; sun top right, signature right, moon bottom left. One photo (the collage), 6 columns centred.
- Layout system (tokens.css): --container 1440px, --gutter, --section-y, --block-gap, --wrap-menu, --wrap-shop, --head-h / --nav-h, the --fs-* type scale, and a 12-column grid (.grid-12 with --start/--span). Full-bleed: the home hero, kitchen photo and Instagram strip, the Menu and Shop bands (.page-band). Photos straight, object-fit cover in a fixed box per slot, never filtered or animated; the one text on a photo is the home tagline over its scrim. See CLAUDE.md.
- Long body text max-width ~640px. Statements may slightly bleed their container.
- Astro gotcha: page-scoped styles neither reach child components nor beat their specificity; use :global(html.sys-slab) prefixes for slab overrides.
- Hero is a thesis: lead with the most characteristic thing (the morning bake, the face), not a generic big-number template.
- Precision over accessories: spacing, type and detail matter more than more effects. Remove one accessory before shipping.

## Motion (the COMPLETE whitelist; timings locked)
- Doodle reveal (Doodle.astro): one-shot 900ms, same bezier, at 30% in view; filled outlines (every master) reveal left to right via clip-path, stroked art draws via pathLength; observe the UNCLIPPED wrapper; watchdog so nothing on screen stays hidden.
- Sketch draw-on-scroll (the 404 page's face; the footer face is static): one-shot ~1.1s, 80ms subpath stagger; the outline traces in, then the fill settles back.
- Entrances: fade + settle 16px DOWNWARD or fade in place; 500ms; children staggered 80ms; once, at ~30% in view. NEVER rise bottom-to-top.
- Photos never animate (no wipe, zoom, ken-burns, parallax, tilt). No marquee.
- Micro: button press scale ~0.98, brand-color focus ring. Underlines are plain solid lines everywhere; on hover and keyboard focus they turn peach and 2px. The header's tall-to-compact height transition and the menu's fade are the only other transitions (functional, not flagged; instant with reduced motion).
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
- Header: the tall header, then the compact bar fixed to the top once scrolled (60px + safe-area below 48rem, 72px above; --nav-h for anchor jumps), no hairline; never hidden on scroll.
- Reveals: one shared IO, fail-safe (hidden states only under JS-set classes; JS off = everything visible).
- Hero image <=150KB on mobile (AVIF, eager, fetchpriority=high; art-directed 2:3 phone and 9:5 wide crops). Fonts: the three Owners woff2 subsets only (owners-400, owners-500, owners-narrow-700); owners-400 and owners-narrow-700 preloaded.
- theme-color AND body background both butter #FBF5D4 (Safari tints from either).
- Map: no iframe; the hand-drawn map SVG plus a plain "Get directions" link.
- No sticky bottom bar on phones.

## CSS hygiene
Watch selector specificity so section/element rules don't cancel paddings/margins. Prefer tokens over literal values. Keep the skip link's CSS inlined in the base head (BaseLayout).
