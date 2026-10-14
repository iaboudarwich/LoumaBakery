# Louma brand assets

**These are the masters.** Every file here is the designer's own art, taken from the brand
board (`docs/brand/master/`, from `LB-Brand-Assets-2026_01-v001.ai`). The earlier traced
placeholders are gone. Never redraw, retrace or restyle these; to change one, go back to
the board.

All art is filled outline (each pen line is a closed shape), coloured with `currentColor`.

## The four marks

| File | From | viewBox (role) | Used by |
|---|---|---|---|
| `wordmark.svg` | `01-wordmark.svg` | `0 0 374 240` | Nav brand link (cropped to the art), footer, 404 |
| `baguette.svg` | `02-baguette-mark.svg` | `0 0 280 100` | `Doodle name="baguette"` (home, above the tagline) |
| `face.svg` | `06-illustrations.svg`, the face | `0 0 286 265` | `FaceDraw` (footer, 404) |
| `toast.svg` | `06-illustrations.svg`, the bread slice | `0 0 200 232` | not used at the moment (the `bread-slice` doodle is) |

Each viewBox is the mark's long-standing role box, so every `width`/`height` in the markup
stays valid. The art is fitted inside it (2% padding, centred, aspect kept) by a uniform
scale and offset of the master coordinates; the drawing itself is unchanged. Where the
art's proportions differ from the role box (the wordmark is wider, the face wider, the
slice narrower) it sits centred with space around it. The nav brand link passes a tight
viewBox (`7.5 53.8 359 132.4`) so the wordmark fills the bar's height.

## The `-baked` siblings

`face-baked.svg` is what `FaceDraw` renders (`baguette-baked.svg` is used by the dev-only
/review page; `toast-baked.svg` by nothing at the moment). `scripts/bake-sketches.mjs` used to bake a pencil "roughen" filter into the traced
placeholders. The masters are already hand-drawn and carry no filter, so the script copies
them through unchanged: the baked files equal the masters. Re-run it after replacing a mark.

How the face draws: `FaceDraw` renders the filled shape at rest, plus one thin outline
stroke per subpath. When the scroll-draw effect runs, the fill hides, the outlines trace
in, and the fill settles back. Every other drawing (the doodles and the baguette mark) is
inlined by `Doodle.astro` and revealed left to right once, with a clip-path. With reduced motion, or motion off, the mark is simply
filled. No live SVG filter runs anywhere.

## Doodles

`doodles/` holds every other drawing from the board, one SVG per drawing, tight viewBox
with 2% padding, `fill="currentColor"`:

- From page 6 (primary illustrations): `ingredients`, `face`, `bread-slice`, `herb`, `palm`.
- From page 7 (doodles): `flower`, `kite`, `baguette-small`, `baguette-small-2`,
  `bubble-oui-oui`, `cup-ooo-la-la`, `waves-birds`, `bird`, `hearts`, `louma-smiley`,
  `cherries`, `flower-cluster`, `sun` (the spiral sun), `sun-small`, `bear`, `bouquet`,
  `watermelon`, `live-laugh-louma`, `moon-stars`, `star-kite`, `star-kite-2`.

They were split from the page SVGs by a script that groups subpaths by distance and by
region; path data was never edited. The site uses them through `Doodle.astro` as small
red accents: on the home page, Our Story, the Initiative pillars, the menu category
headings and the shop.

## Traced from the owner's material (not from the board)

Two files are not the designer's: they were traced with potrace from material the owner
supplied (see `src/assets/img/CREDITS.md`). Same conventions: tight viewBox,
`fill="currentColor"`, no default colour.

- `signature-milla.svg`: the handwritten "Milla" from the founder's letter.
- `map-hand-drawn.svg`: the hand-drawn map of the bakery at Wilshire and Centinela, with
  the "welcome to LOUMA BAKERY" lettering. Rendered in red on the Contact page. Traced
  from the only copy (589x716, in the website brief); retrace from a higher-resolution
  scan when the owner sends one (reference raster: `src/assets/img/unplaced/map-hand-drawn-source.png`).

## Recolouring

Every file uses `currentColor`. The four marks default to Louma Red through
`color="#ED2739"` on the root; the doodles have no default and take the surrounding text
colour.
- Inlined (Astro SVG component or `?raw`): set CSS `color` on the svg or a parent, e.g.
  `color: var(--butter)` on dark, `color: var(--burgundy)`.
- As `<img>`: only the default applies; inline the SVG for any other colour.
