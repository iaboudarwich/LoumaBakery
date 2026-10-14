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
- Forms are Netlify Forms: data-netlify + data-netlify-honeypot + hidden form-name, posted via fetch by src/scripts/forms.ts (newsletter, careers, catering). Submissions only arrive once the dashboard Form detection toggle is on and the site is redeployed.

## Pages, routes and data
Main nav (wordmark = Home): Our Story, The Louma Initiative, Menu, Shop. Footer adds Catering, Careers, Contact.

| Route | File | Reads |
|---|---|---|
| / | src/pages/index.astro | copy.json `home`, images.json (hero), instagram.json |
| /story | src/pages/story.astro | copy.json `story` (headline), story.json (letter + sections) |
| /initiative | src/pages/initiative.astro | copy.json `initiative` |
| /menu | src/pages/menu.astro | copy.json `menu`, menu.json (no prices, no photos) |
| /shop | src/pages/shop.astro | copy.json `shop`, shop.json |
| /catering | src/pages/catering.astro | copy.json `catering` + catering form |
| /careers | src/pages/careers.astro | copy.json `careers` + careers form |
| /visit ("Contact") | src/pages/visit.astro | copy.json `visit`, settings.json |
| 404 | src/pages/404.astro | copy.json `notFound` |

Redirect: /mission -> /initiative (301, force, in netlify.toml; also `redirects` in astro.config.mjs so dev/preview work).

| Data file | Holds | CMS collection |
|---|---|---|
| src/data/copy.json | words for every page, keyed by page | Page text |
| src/data/story.json | the founder's letter (paragraphs + signature) and the story sections | Our Story |
| src/data/shop.json | pre-order and gift card links, merch products | Shop |
| src/data/menu.json | menu categories, items (name, description, tags; image/alt kept, not shown), add-ons | Menu |
| src/data/instagram.json | up to six home-page Instagram tiles (image + alt) | Instagram strip |
| src/data/settings.json | two emails, address, hours, Instagram link + handle, Uber Eats link (not rendered). No phone number is listed. | Site settings |
| src/data/images.json | which photo fills which slot (only `hero` renders today) | Images |

Every CMS field in public/admin/config.yml must match its JSON keys and the Zod schema in src/content.config.ts (copy is `.strict()`: an unknown key breaks the build).

## THE DESIGN SYSTEM ("editorial slab", the only layout)
Source of truth for the brand: docs/BRAND.md and docs/brand/ (the designer's board). Tokens: src/styles/tokens.css.
- PALETTE: exactly eight colours. --red #ED2739 (Louma Red, PRIMARY), --burgundy #A10017, --peach #FF676C, --tangerine #FF8926, --fairy #DDEAC3, --butter #FBF5D4 (page background), --white #FFFFFF, --ink #1D1D1B (text). Derived values (--body, --muted, --hairline, --hairline-strong, shadows, focus) are color-mix() of these eight only. No other hex or rgb() anywhere in src/.
- RED IS THE PRIMARY COLOUR, with one constraint: red text on butter is 3.86:1, so red TEXT must be 24px or larger (or bold at 18.66px or larger). Small text sits in ink (or --body / --muted, both mixed from ink) or burgundy (7.56:1 on butter). Links are burgundy and hover burgundy. Red is free for large display type, the drawings, and fills behind large text.
- FLAT: no box-shadows, no gradients, no backdrop blur, anywhere. Depth = surface change + 1px hairlines (--hairline tokens). Text on photos sits on flat solid ink/burgundy panels.
- BANDS: every section is one committed slab: butter, burgundy, ink, or full-bleed photo. The band change is the divider. Fairy and white are small component fills only (chips, inputs, cards), never a section background.
- TYPE: the Owners superfamily (Ohno Type Co), four faces only, woff2 subsets in public/fonts, declared in src/styles/fonts.css: Owners Narrow 700 for h1-h3 and the .statement; Owners Narrow 500 for h4-h6, eyebrows and labels; Owners 400 for body; Owners 500 for emphasis, buttons and the data voice (hours, prices, address, phone, form fields). No italic ships and font-synthesis is off, so never ask for italics or other weights. Licence: the files are desktop-licensed; a webfont licence from Ohno Type Co is required before launch.
- TYPE SPLIT: one .statement per band (clamp(2.75rem,8vw,7rem), Owners Narrow 700, leading ~1.05). Everything else is body type at 14-16px.
- SHAPES: square. Every radius is 0 (the --radius-* tokens are 0). No rounded buttons, pills, chips, inputs, cards, images or nav. Do not add a border-radius.
- TYPE FLOOR: 13px minimum for all rendered text (form labels and catering tier notes sit at 13px). The one exception is the stamp (LABELS), which stays 12px.
- LARGE SCREENS: sizes are fixed up to a 1920px viewport, then grow: type uses clamp(base, calc(base + (100vw - 1920px) * k), max) and --container is clamp(1200px, 62.5vw, 1680px). No viewport scaling below 1920.
- BUTTONS: ghost rectangle default (1.5px burgundy border, transparent, Owners 500). MAX ONE filled CTA per page (.btn-primary/.btn-coral render filled burgundy; on a burgundy card the CTA inverts to butter with burgundy text). "Ordering soon" = dashed ghost, intentional.
- LABELS: one stamp treatment: Owners Narrow 500, uppercase, 12px, 0.1em tracking, burgundy (peach on ink). No dash/rule prefixes. Filler eyebrows deleted.
- NAV: persistent flat bar, always legible: solid ink strip over the hero, solid butter + hairline elsewhere. The brand link is the drawn wordmark (accessible name from the link's aria-label).
- DRAWINGS: src/assets/brand/ holds the designer's master art (see its README): wordmark.svg, baguette.svg, face.svg, toast.svg (the bread slice), each with a fixed viewBox role, plus doodles/ with 26 single drawings cut from the board (ingredients, herb, palm, hearts, sun, bear, live-laugh-louma and more). Use only these drawings.
- ASYMMETRY: 55/45 or 60/40 splits, one collage moment (2-3 tiles, 1-3deg rotation), no orphan grid rows.

## MOTION WHITELIST (complete; add nothing else)
- Sketch draw-on-scroll: one-shot ~1.1s cubic-bezier(0.22,1,0.36,1), 80ms subpath stagger, sketches <=160px desktop / <=120px mobile, never left invisible (viewport watchdog). The masters are filled outlines: the outline traces in, then the fill settles back.
- Entrances: fade + settle DOWNWARD (start ~20px ABOVE, translate down) or fade in place; 500-700ms, same bezier, children staggered 60-100ms, once at ~30% in view. NEVER rise bottom-to-top.
- Image wipes: soft clip inset + 1.04->1 settle. IO must watch the UNCLIPPED parent (Chromium clips intersection geometry).
- Hero only: ken-burns 1->1.05, ~28s alternate, desktop.
- ONE marquee: ghost outline Owners Narrow on the burgundy band, slow, pause on hover.
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
- Home hero on portrait phones (<=430px) is min-height 78svh ON PURPOSE: the sliver of the next section below it is the scroll affordance. Do not "fix" it to 100svh.
- Never width:100vw; html,body { overflow-x: clip } stays.
- Safe areas: viewport-fit=cover; pad CONTENT with env(safe-area-inset-*) via max(gutter, inset); band backgrounds reach true edges; nav + body offset grow by the top inset.
- Hover behaviors ONLY behind @media (hover:hover) and (pointer:fine); touch gets tap alternatives wherever hover carries meaning (menu photos are permanent row thumbnails: no hover or tap state).
- Inputs >=16px computed (iOS zoom); inputmode/autocomplete set; never suppress user zoom; html.kb-open hides fixed bars while a field is focused.
- Tap targets >=44px; -webkit-tap-highlight-color transparent + touch-action manipulation on controls.
- NO live SVG filters anywhere: sketches render the *-baked.svg files (scripts/bake-sketches.mjs; the masters carry no roughen, so the baked files equal them); max 2 simultaneous draws, will-change on animating strokes.
- Nav: always-visible slim bar on <=768px (56px + safe-area); hide-on-scroll desktop-only, 8px delta.
- Reveals: one shared IO, fail-safe (hidden states only under JS-set classes; JS off = everything visible).
- Hero image <=150KB on mobile (AVIF, eager, fetchpriority=high). Fonts: the four Owners woff2 subsets only (Latin, Latin-1, general punctuation, arrows), owners-400 and owners-narrow-700 preloaded.
- theme-color AND body background both butter #FBF5D4 (Safari tints from either).
- Map: no iframe (CSP frame-src 'none'). /visit links out to Google Maps; a hand-drawn map image fills the slot later.
- mobileCtaBar flag: sticky bottom newsletter bar on phones (parks at footer, hides with keyboard).

## Definition of done (every phase)
Responsive to mobile · visible keyboard focus · reduced motion respected · no console errors · astro check clean · zero em dashes in dist · committed with a clear message · deploy verified.

## What remains before handoff (do not attempt without the owner)
DecapBridge site-id + login test; publish the Google Sheet tab + set SHEET_CSV_URL; Netlify Forms detection toggle; real photos/Uber Eats link/domain; account transfer.
