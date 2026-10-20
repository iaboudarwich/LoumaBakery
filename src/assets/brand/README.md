# Louma brand assets

**These are the masters.** Every file here is the designer's own art, taken from the brand
board (`docs/brand/master/`, from `LB-Brand-Assets-2026_01-v001.ai`). The earlier traced
placeholders are gone. Never redraw, retrace or restyle these; to change one, go back to
the board.

All art is filled outline (each pen line is a closed shape), coloured with `currentColor`.

## The marks

| File | From | viewBox (role) | Used by |
|---|---|---|---|
| `wordmark.svg` | `01-wordmark.svg` | `0 0 374 240` | The header brand link, the menu and the footer (all cropped to the art), the shop gift card, 404 |
| `baguette.svg` | `02-baguette-mark.svg` | `0 0 280 100` | `Doodle name="baguette"`: the centre of the full-screen menu (SiteMenu.astro), butter, 250px |
| `face.svg` | `06-illustrations.svg`, the face | `0 0 286 265` | Footer (static, under the wordmark); `FaceDraw` on the 404 page |

Each viewBox is the mark's long-standing role box, so every `width`/`height` in the markup
stays valid. The art is fitted inside it (2% padding, centred, aspect kept) by a uniform
scale and offset of the master coordinates; the drawing itself is unchanged. Where the
art's proportions differ from the role box (the wordmark and the face are wider)
it sits centred with space around it. The nav brand link and the footer pass a tight
viewBox (`7.5 53.8 359 132.4`) so the wordmark fills the bar's height.

## The `-baked` siblings

`face-baked.svg` is what `FaceDraw` renders (`baguette-baked.svg` is used by the dev-only
/review page). `scripts/bake-sketches.mjs` used to bake a pencil "roughen" filter into the traced
placeholders. The masters are already hand-drawn and carry no filter, so the script copies
them through unchanged: the baked files equal the masters. Re-run it after replacing a mark.

How the face draws: `FaceDraw` renders the filled shape at rest, plus one thin outline
stroke per subpath. When the scroll-draw effect runs, the fill hides, the outlines trace
in, and the fill settles back. Every other drawing (the doodles and the baguette mark) is
inlined by `Doodle.astro` and revealed left to right once, with a clip-path. With reduced motion, or motion off, the mark is simply
filled. No live SVG filter runs anywhere.

## The single-stroke baguette (`baguette-stroke.svg`)

One difference from the master, at the owner's request (round 5D, 20 Oct 2026): the
third heart. In the master, the arc into the third heart rises well above the roll's
outline and its right lobe comes down outside it. In the stroke file that heart is a
copy of the second heart's segment (segments 7 to 15 of the path), moved right by that
segment's own span (98.40 units, up 3.97) so it joins the line without a break; the
first handle of the next segment is moved by the same amount to keep the line smooth.
The path is still one continuous stroke drawn left to right, and the viewBox is
unchanged (so the drawing keeps its size and place). `baguette.svg` and `doodles/` are
untouched.

The one stroke asset, made at the owner's request (owner feedback round 1, October 2026)
so the home hero baguette can draw itself like a pen. The master stays the filled
`baguette.svg`; this file is its centreline, derived from `docs/brand/master/02-baguette-mark.svg`:

1. Rasterized at 2000px across the art, thresholded, skeletonized (scikit-image) to a 1px
   centreline. Line width measured from the distance transform: 54px at that scale,
   12.66 master units, which is the `stroke-width`.
2. Ordered as one closed cursive line, taking the smoothest continuation at each of the
   three crossings (every turn under 23 degrees): from the left tip of the loaf along
   the top, through heart 1, the arc, heart 2, the high arch, heart 3, round the right
   end, along the bottom and back to the left tip. The skeleton splits each crossing
   into two Y-junctions; those were merged and bridged straight through (68-92px at
   2000px). Each heart's notch is a sharp V that the skeleton shows as a short spur
   (17, 25 and 47px); the line goes out to the tip and back there, kept as a corner.
3. Smoothed (Gaussian, 8px) and fitted with cubic Béziers (Schneider, 3px tolerance):
   34 segments, one closed `<path>`, `fill="none"`, `stroke="currentColor"`, round caps
   and joins, the stroke scales with the mark, tight viewBox `0 0 465.81 164.94`.
4. Checked against the master: rendered at the same width the two shapes overlap with
   IoU 0.96 and the same median line width (54px at 2000px). The centreline stays
   within 0.75 master units (3.2px at 2000px) of the master's medial axis along the
   line, within 1.05 units (4.5px) at the heart notches, and within 3.1 units (13px)
   inside the three crossings, where the skeleton itself bends into two Y-junctions
   and the medial axis is not a true centreline. Every sample lies inside the master's
   ink.

`SiteMenu.astro` inlines it with `pathLength="1"` and draws it in once (stroke-dashoffset,
1.6s) each time the full-screen menu opens. Do not use it anywhere else. If the master
baguette ever changes, this file has to be made again the same way.

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
red accents: on the home page, Our Story, the menu category
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

Every file uses `currentColor`. The three marks default to Louma Red through
`color="#ED2739"` on the root; the doodles have no default and take the surrounding text
colour.
- Inlined (Astro SVG component or `?raw`): set CSS `color` on the svg or a parent, e.g.
  `color: var(--butter)` on dark, `color: var(--burgundy)`.
- As `<img>`: only the default applies; inline the SVG for any other colour.
