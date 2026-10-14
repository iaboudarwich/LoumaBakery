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
| `baguette.svg` | `02-baguette-mark.svg` | `0 0 280 100` | `Sketch name="baguette"` (home, menu) |
| `face.svg` | `06-illustrations.svg`, the face | `0 0 286 265` | `FaceDraw` (footer, 404), `Face` |
| `toast.svg` | `06-illustrations.svg`, the bread slice | `0 0 200 232` | `Sketch name="toast"` (story) |

Each viewBox is the mark's long-standing role box, so every `width`/`height` in the markup
stays valid. The art is fitted inside it (2% padding, centred, aspect kept) by a uniform
scale and offset of the master coordinates; the drawing itself is unchanged. Where the
art's proportions differ from the role box (the wordmark is wider, the face wider, the
slice narrower) it sits centred with space around it. The nav brand link passes a tight
viewBox (`7.5 53.8 359 132.4`) so the wordmark fills the bar's height.

## The `-baked` siblings

`baguette-baked.svg`, `toast-baked.svg` and `face-baked.svg` are what the components
render. `scripts/bake-sketches.mjs` used to bake a pencil "roughen" filter into the traced
placeholders. The masters are already hand-drawn and carry no filter, so the script copies
them through unchanged: the baked files equal the masters. Re-run it after replacing a mark.

How they draw: `Sketch` and `FaceDraw` render the filled shape at rest, plus one thin
outline stroke per subpath. When the scroll-draw effect runs, the fill hides, the outlines
trace in, and the fill settles back. With reduced motion, or motion off, the mark is simply
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
region; path data was never edited. None is used on the site yet.

## Recolouring

Every file uses `currentColor`. The four marks default to Louma Red through
`color="#ED2739"` on the root; the doodles have no default and take the surrounding text
colour.
- Inlined (Astro SVG component or `?raw`): set CSS `color` on the svg or a parent, e.g.
  `color: var(--butter)` on dark, `color: var(--burgundy)`.
- As `<img>`: only the default applies; inline the SVG for any other colour.
