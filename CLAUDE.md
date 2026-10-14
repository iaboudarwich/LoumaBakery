# Louma Bakery: Project Memory

You are building/maintaining the Louma Bakery website. Read this every session.

## What this is
A neighborhood bakery on Wilshire (Santa Monica), open and trading (as of September 2026), with an inclusive-employment mission (many teammates have intellectual or developmental differences; the bakery exists partly to show that done right). Founder: Milla Ghandour; named for her sister Louma. Tone: warm, plain-spoken, proud, never saccharine.

## Stack & rules
- Astro, static output, TypeScript strict. No heavy UI framework.
- All content lives in content collections / config (src/data/*.json), never hardcoded in markup. CMS-editable via Decap (self-hosted bundle in public/admin; /admin-demo is the zero-cred test-repo demo, config generated on prebuild).
- Nav and footer are single shared components used by every page.
- Every visual effect is flag-gated in src/config/features.ts, wired into /review, and respects prefers-reduced-motion + mobile.
- Production URL from one SITE_URL config value. Netlify hosting. Menu will sync from a Google Sheet (scripts/sync-menu.mjs, inactive until SHEET_CSV_URL is set).
- Forms are Netlify Forms: data-netlify + data-netlify-honeypot + hidden form-name, posted via fetch by src/scripts/forms.ts (newsletter in the footer, careers, catering). forms.ts finds forms by the hidden form-name input (Netlify rewrites <form> tags at deploy). Form detection is on; email notifications are not set up yet (docs/HANDOFF.md).
- No prices anywhere on the site except shop products. Menu items have no price field; catering tier prices stay in copy.json but are not rendered.
- Every page's meta description comes from its own copy via describe() in src/lib/seo.ts; the default title/description is the owner's tagline (copy.json home).

## Pages, routes and data
Main nav (wordmark = Home): Our Story, The Louma Initiative, Menu, Shop. Footer adds Catering, Careers, Contact.

| Route | File | Reads |
|---|---|---|
| / | src/pages/index.astro | copy.json `home`, images.json (hero, homeGallery), instagram.json, settings.json |
| /story | src/pages/story.astro | copy.json `story` (headline), story.json (letter + sections), images.json `story` |
| /initiative | src/pages/initiative.astro | copy.json `initiative` |
| /menu | src/pages/menu.astro | copy.json `menu`, menu.json (no prices, no photos); sticky category jump bar with a scroll spy |
| /shop | src/pages/shop.astro | copy.json `shop`, shop.json |
| /catering | src/pages/catering.astro | copy.json `catering` + catering form |
| /careers | src/pages/careers.astro | copy.json `careers` + careers form |
| /visit ("Contact") | src/pages/visit.astro | copy.json `visit`, settings.json, images.json `storefront`, map-hand-drawn.svg |
| 404 | src/pages/404.astro | copy.json `notFound` |

Redirect: /mission -> /initiative (301, force, in netlify.toml; also `redirects` in astro.config.mjs so dev/preview work).

| Data file | Holds | CMS collection |
|---|---|---|
| src/data/copy.json | words for every page, keyed by page | Page text |
| src/data/story.json | the founder's letter (paragraphs + signature) and the story sections | Our Story |
| src/data/shop.json | pre-order and gift card links, merch products | Shop |
| src/data/menu.json | menu categories (with a drawing, `icon`), items (name, description, tags; image/alt kept, not shown), add-ons | Menu |
| src/data/instagram.json | up to six home-page Instagram tiles (image + alt) | Instagram strip |
| src/data/settings.json | two emails, address, hours, Instagram link + handle, Uber Eats link (not rendered). No phone number is listed. | Site settings |
| src/data/images.json | photo slots with alt text: hero, homeGallery (6), story (2), storefront | Photos |

Every CMS field in public/admin/config.yml must match its JSON keys and the Zod schema in src/content.config.ts (copy is `.strict()`: an unknown key breaks the build).

## THE DESIGN SYSTEM ("editorial slab", the only layout)
Source of truth for the brand: docs/BRAND.md and docs/brand/ (the designer's board). Tokens: src/styles/tokens.css.
- PALETTE: exactly eight colours. --red #ED2739 (Louma Red, PRIMARY), --burgundy #A10017, --peach #FF676C, --tangerine #FF8926, --fairy #DDEAC3, --butter #FBF5D4 (page background), --white #FFFFFF, --ink #1D1D1B (text). Derived values (--body, --muted, --ink-80, --hairline-strong, focus) are color-mix() of these eight only. No other hex or rgb() anywhere in src/.
- RED IS THE PRIMARY COLOUR, with one constraint: red text on butter is 3.86:1, so red TEXT must be 24px or larger (or bold at 18.66px or larger). Small text sits in ink (or --body / --muted, both mixed from ink) or burgundy (7.56:1 on butter). Links are burgundy and hover burgundy. Red is free for large display type, the drawings, and fills behind large text.
- FLAT: no box-shadows, no gradients, no backdrop blur, anywhere. Depth = surface change + 1px hairlines (--hairline-strong, or ink at 12% for the bars). No text on photos.
- BANDS: every section is one committed block: butter (the page), or a full-width colour block in burgundy, white or fairy (classes .block--burgundy/.block--white/.block--fairy), or a full-bleed photo. The colour change is the divider. Ink is the footer only.
- TYPE: the Owners superfamily (Ohno Type Co), four faces only, woff2 subsets in public/fonts, declared in src/styles/fonts.css: Owners Narrow 700 for titles and headings; Owners Narrow 500 for the footer's column stamps; Owners 400 for body; Owners 500 for emphasis, labels, buttons, menu item and product names, and the data voice (hours, address, form fields). No italic ships and font-synthesis is off, so never ask for italics or other weights. Licence: the files are desktop-licensed; a webfont licence from Ohno Type Co is required before launch.
- TYPE SCALE (tokens.css, used by every page in the layout system): --fs-display clamp(40px,6.5vw,96px) Narrow 700 for page titles and the home tagline (.display, red); --fs-h2 clamp(28px,3.6vw,48px) Narrow 700 for section headings (.h2, red); --fs-lead clamp(20px,1.8vw,26px) Owners 400 for intros (.lead, burgundy); --fs-body clamp(16px,1.15vw,18px) Owners 400, line-height 1.6, max 62ch; --fs-small 14px Owners 500 for labels (.label); --fs-item clamp(19px,1.4vw,20px) Owners 500 for menu item and product names. Base h1/h2/h3 sizes come from the same scale. The footer keeps its own sizes (--t-eyebrow for its stamps); don't change the footer's look.
- SHAPES: square. No border-radius anywhere: buttons, chips, inputs, cards, images, nav.
- TYPE FLOOR: 13px minimum for all rendered text. The one exception is the footer's column stamp, which stays 12px.
- LAYOUT: --container 1440px, --gutter clamp(16px,4vw,48px); every section aligns to the same edges. Vertical rhythm --section-y clamp(64px,9vw,144px), --block-gap clamp(24px,3vw,48px). A 12-column grid (.grid-12, children place with --start/--span) that stacks below 48rem. Every layout works from 360px to 1920px with fluid units; no device-specific breakpoints or user-agent checks.
- BUTTONS (global.css, defined once): .button = primary, solid burgundy, butter text, 48px min height, Owners 500 16px, hover red, focus ring 2px red offset 3px. Disabled "Coming soon" = a <span class="button" aria-disabled="true"> (never a link, not focusable): transparent, 1px burgundy border, burgundy text at 70%. .btn.btn-primary (catering/careers submit, 404) shares the primary look in CSS so form markup stays untouched; the footer newsletter's .btn-coral keeps its own look.
- LABELS: .label = Owners 500 14px (--fs-small), burgundy on butter, butter on burgundy. The footer's column headings keep their 12px uppercase stamp in peach. No dash/rule prefixes.
- NAV: one sticky flat row on butter on every page, 72px (60px below 48rem), 1px ink hairline: the red drawn wordmark (28-32px tall) left, the four links right in Owners 500 15px ink, the active link with a 2px red rule. Below ~860px the toggle opens a full-screen butter sheet with the links in --fs-h2 red. No transparent or hide-on-scroll state. The brand link's accessible name comes from its aria-label.
- DRAWINGS: src/assets/brand/ holds the designer's master art (see its README): wordmark.svg, baguette.svg, face.svg, toast.svg (the bread slice), each with a fixed viewBox role, plus doodles/ with 26 single drawings cut from the board (ingredients, herb, palm, hearts, sun, bear, live-laugh-louma and more). Use only these drawings, through Doodle.astro (`box` = fixed-height, bottom-aligned, for rows that share a baseline). Two files there come from the owner's material, not the board: signature-milla.svg (the letter's signature) and map-hand-drawn.svg (the Contact map).
- PHOTOS: straight, never tilted or rotated, rendered exactly as shot: object-fit cover inside a fixed aspect ratio per slot (.ph--portrait 4/5, .ph--landscape 3/2, .ph--square 1/1; the home hero is full-bleed, min(88svh,960px), 72svh below 48rem, art-directed to a portrait crop there). No filter, blend, overlay, shadow or gradient on photos, and photos never animate. No text on photos.

## MOTION WHITELIST (complete; add nothing else)
- Doodle reveal (Doodle.astro, flag doodleDraw): one-shot 900ms cubic-bezier(0.22,1,0.36,1) when 30% of the drawing is in view. Every master is a filled outline, so it reveals left to right with a clip-path; stroked art would draw on via pathLength. Never left invisible (viewport watchdog). Drawings are accents, never background patterns; at most one per section (the letter's sun and moon, and the four pillars, are the specified exceptions).
- Sketch draw-on-scroll (flag scrollDraw; the footer face only): one-shot ~1.1s, 80ms subpath stagger; the outline traces in, then the fill settles back.
- Entrances: fade + settle 16px DOWNWARD (start 16px ABOVE) or fade in place; 500ms, same bezier, children staggered 80ms, once at ~30% in view. NEVER rise bottom-to-top.
- Photos never animate: no wipe, zoom, ken-burns, parallax or tilt. There is no marquee.
- Micro: sketchy link underline, button press scale, brand focus ring.
- Reduced motion: everything visible immediately in final state.

## COPY RULES (bans on sight)
- NO em dashes anywhere in rendered copy (verify dist HTML after building).
- No tricolons ("bread, pastry, and care"), no "not just X, it's Y", no empty superlatives (artisanal/finest/exceptional/premium), no jargon (elevate/journey/crafted/curated/nestled/indulge/savor/delight), no "we are passionate/committed/we believe", no throat-clearing openers.
- Text in story.json, copy.json and shop.json was written by the owner. Never rewrite, shorten or reword it, even when it uses words this guide otherwise avoids. Typos may be fixed only when asked.
- Caps: hero = one line (3-8 words) + one sentence. Menu item = ONE concrete line, 8-15 words, ingredient/technique first ("Laminated over three days, baked dark, shatters when you bite it."). Story <= 300 words. Careers = plain sentences; the inclusive mission stated ONCE as plain fact. Visit = scannable mono block + one human line.

## STANDING RULES (never violate)
- The Initiative page (/initiative) NEVER discloses statistics about team members' disabilities. No replacement stats of that nature.
- Entrance animations never move content upward.
- The drawings in src/assets/brand/ (the four marks and doodles/) are the designer's masters; never regenerate, redraw, trace or restyle them. Change them only from docs/brand/master.
- Palette and fonts exactly as tokenized: the eight brand colours in src/styles/tokens.css, the four Owners faces in src/styles/fonts.css.

## MOBILE / iOS RULES (locked)
- Viewport units: min-height 100vh fallback + 100svh pair. svh, never dvh. Hero-minus-header = calc(100svh - var(--nav-h)).
- Home hero below 48rem is 72svh ON PURPOSE: the tagline band below it is the scroll affordance. Do not "fix" it to 100svh.
- Never width:100vw; html,body { overflow-x: clip } stays.
- Safe areas: viewport-fit=cover; pad CONTENT with env(safe-area-inset-*) via max(gutter, inset); band backgrounds reach true edges; nav + body offset grow by the top inset.
- Hover behaviors ONLY behind @media (hover:hover) and (pointer:fine); touch gets tap alternatives wherever hover carries meaning.
- Inputs >=16px computed (iOS zoom); inputmode/autocomplete set; never suppress user zoom; html.kb-open hides the sticky bar while a field is focused.
- Tap targets >=44px; -webkit-tap-highlight-color transparent + touch-action manipulation on controls.
- NO live SVG filters anywhere. The footer face renders face-baked.svg (scripts/bake-sketches.mjs; equal to the master); max 2 simultaneous draws, will-change on animating strokes.
- Nav: always-visible sticky bar (60px + safe-area below 48rem, 72px above); no hide-on-scroll.
- Reveals: one shared IO, fail-safe (hidden states only under JS-set classes; JS off = everything visible).
- Hero image <=150KB on mobile (AVIF, eager, fetchpriority=high). Fonts: the four Owners woff2 subsets only (Latin, Latin-1, general punctuation, arrows), owners-400 and owners-narrow-700 preloaded.
- theme-color AND body background both butter #FBF5D4 (Safari tints from either).
- Map: no iframe (CSP frame-src 'none'). /visit shows the hand-drawn map (map-hand-drawn.svg, butter on burgundy) and a plain "Get directions" link built from settings.json (siteConfig.directionsUrl).
- No sticky bottom bar on phones: the newsletter lives in the footer.

## Definition of done (every phase)
Responsive to mobile · visible keyboard focus · reduced motion respected · no console errors · astro check clean · zero em dashes in dist · committed with a clear message · deploy verified.

## What remains before handoff (do not attempt without the owner)
See docs/HANDOFF.md: account and domain transfers, DecapBridge login, form notification emails, the Owners webfont licence, and the owner's open decisions. After any layout change, recheck: no horizontal scroll from 360px to 1920px, AA contrast on every text element, axe-core clean, reduced motion shows everything, Lighthouse 90+ on mobile and desktop, and the CMS fields still match the JSON and the Zod schemas.
