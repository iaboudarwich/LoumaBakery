# Louma Bakery — brand reference

What the designer supplied, what each piece is, and how it compares to what the site
ships today.

Assets live in [`docs/brand/`](./brand/). Nothing here has been applied to the site.

## Source material

| Item | Where |
|---|---|
| Brand board, 7 pages | `docs/brand/LB-Brand-Assets-2026_01-v001.ai` |
| Page vectors | `docs/brand/master/*.svg` |
| Page previews | `docs/brand/preview/*.png` |
| Palette as CSS | `docs/brand/palette.css` |
| Typeface, 98 TTFs | [Drive folder](https://drive.google.com/drive/folders/1Wo_uDHeSXBRJ1q72TOEVMOFJLNI85Wpq) |

Authored in Adobe Illustrator 28.4 on macOS, 2026-01-21 15:14 CET. The Illustrator
install was Polish-localised, so two swatches carry Polish names ("Biały", "Czarny").
The font folder is owned by michau.pac@gmail.com.

Everything below was read directly from the master file and cross-checked two ways:
the PDF text layer, and the Illustrator XMP swatch group. They agree exactly.

---

## Colours

Six working colours. No gradients anywhere on the board.

| Swatch | Hex | RGB | Role |
|---|---|---|---|
| Louma Red | `#ED2739` | 237, 39, 57 | Primary. Logo, illustrations, display type |
| Butter | `#FBF5D4` | 251, 245, 212 | The background cream. Every board page sits on it |
| Burgundy | `#A10017` | 161, 0, 23 | Deep red. Dark tiles, contrast lockups |
| Peach | `#FF676C` | 255, 103, 108 | Soft warm pink |
| Tangerine | `#FF8926` | 255, 137, 38 | Orange accent |
| Fairy | `#DDEAC3` | 221, 234, 195 | Pale sage. The only cool colour in the system |

Plus White `#FFFFFF`, Black `#000000`, and registration black `#1D1D1B` for print.

### The 12 approved lockups

| | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| **Row 1** | Butter on Louma Red | Butter on Burgundy | Louma Red on Butter | Burgundy on Butter |
| **Row 2** | Butter on Peach | Burgundy on Peach | Tangerine on Butter | Peach on Butter |
| **Row 3** | Louma Red on Burgundy | Butter on Tangerine | Burgundy on Fairy | Peach on Fairy |

Tiles sitting on Butter carry a thin keyline, dashed or solid. All tiles use the same
rounded-square shape.

---

## Typography

The brand face is **Owners**, by Ohno Type Co. The Drive folder holds the complete
superfamily as **98 TTFs**:

- 7 widths: XXNarrow, XNarrow, Narrow, Regular, Wide, XWide, XXWide
- 7 weights: XLight, Light, Regular, Medium, Bold, Black, XBlack
- Roman and italic for each

The board embeds real subsets of it, so this is the working face, not a mock-up.

### How the board sets the brand lines

| Line | Treatment |
|---|---|
| `LOUMA BAKERY` | Owners Narrow Bold, all caps, tight |
| `Flour-dusted dreams, baked fresh daily.` | Owners Regular, medium weight, sentence case |
| `B3223 Wilshire Blvd, Los Angeles, CA` | Owners Narrow Bold, small |
| `WHAT SHOULD I PICK? EVERYTHING HERE LOOKS SOOOO YUMMY!` | Owners, heavy, all caps |
| `What should I pick? Everything here looks soooo yummy!` | Owners, medium, sentence case |

The last pair is a voice sample, shown twice to contrast a loud register against a
quiet one. All type on the page is Louma Red on Butter.

---

## Marks and illustrations

**Wordmark** (page 1). Hand-lettered "LOUMA" in a chunky marker style, with "BAKERY"
set beneath in Owners Narrow Bold, sitting under the right of the word rather than
centred. Outlined, so it exports as a single clean path.

**Baguette mark** (page 2). One unbroken stroke: an oval loaf with three scored ears
that read as hearts. This is the icon, and it is what the site's scroll-draw
animation traces.

**Primary illustrations** (page 6). Five groups in Louma Red line art:
1. Ingredient cluster: garlic bulb, droplets, honey dipper and pot, a bean, a
   scribbled mass, a striped seed pod, a heart, coffee beans, sesame seeds
2. **The face**: curly scribble hair, closed eyes, a serene smile. The character mark
3. A slice of bread with a small heart
4. A herb sprig with heart-shaped leaves, reading as wild thyme or za'atar
5. A palm tree whose fronds are made of little hearts

**Doodles** (page 7). A looser sticker set: potted flower, kite, baguette, bread roll,
pastry swirls, watermelon slice, cherry, a bear, flowers, birds, waves, sun, crescent
moon, stars, scattered hearts, a smiling coffee mug, speech bubbles reading "oui oui!"
and "Ooo la la", "LOUMA" in handwriting, and **"LIVE LAUGH LOUMA"**.

### The recurring motif

Hearts appear throughout and are clearly deliberate: the baguette scores, the herb
leaves, the palm fronds, the bread slice, the ingredient cluster, and loose in the
doodle set. If one thing ties the illustration system together, it is that.

---

## How the site compares

### Colours: two of six are right

| Brand | Brand hex | Site token | Site hex | |
|---|---|---|---|---|
| Louma Red | `#ED2739` | `--red` | `#ED2739` | correct |
| Butter | `#FBF5D4` | `--butter` | `#FBF5D4` | correct |
| Burgundy | `#A10017` | `--burgundy` | `#6E1F2A` | wrong, far browner |
| Peach | `#FF676C` | `--coral` | `#EF6E78` | close, not exact |
| Tangerine | `#FF8926` | `--amber-warm` | `#C8853A` | wrong, muddy |
| Fairy | `#DDEAC3` | none | none | missing |
| Black | `#1D1D1B` | `--ink` | `#2A1F18` | brown-black, not neutral |

Tokens with no basis in the brand book: `--clay #B8533F`, `--navy-stitch #2B3A55`,
and the four-step cream ramp `--surface-0` through `--surface-3`.

The brand has exactly one cream, Butter. The site has four, and none of them is it.

### Red is used backwards

`tokens.css` says Louma Red is "accent only, max ~3 uses per page". On the board, red
is the dominant colour: the logo, every illustration and the whole type specimen are
red on Butter. The site treats the brand's primary as a garnish.

### Fonts share nothing

| | Site | Brand |
|---|---|---|
| Display | Cormorant Garamond | Owners |
| Small caps | Cormorant SC | Owners |
| Body | DM Sans | Owners |
| Mono | DM Mono | Owners |

Owners is a superfamily. Its width axis is built to do the work the site currently
splits across four unrelated families.

### The SVGs in src/ are provisional

`src/assets/brand/` holds `wordmark.svg`, `baguette.svg`, `toast.svg` and `face.svg`,
plus baked draw-animation variants. They match the board in subject, and they came
from the June package in `~/Downloads/louma-brand-assets_1/`.

That folder's own README says: *"These are placeholders-quality vectors of the real
art; if a designer later supplies master SVGs, swap the files."*

The master art is now in `docs/brand/master/`. The wordmark and baguette are single
clean paths and are ready to swap in. The face and the bread slice need cutting out
of the page-6 file first.

---

## Open questions

1. **The address.** The board reads "B3223 Wilshire Blvd, Los Angeles, CA". The site
   says "3223 Wilshire Blvd, Santa Monica, CA 90403". Two separate problems: a stray
   leading "B" that looks like a typo, and Los Angeles against Santa Monica. This
   feeds the JSON-LD and has to match the Google Business Profile exactly.
2. **Owners licensing.** It is a commercial face and the Drive folder holds desktop
   TTFs only. Web use needs a webfont licence from Ohno Type Co. 98 files is also far
   more than a site needs; three or four cuts would cover it.
3. **How far to correct the palette.** Fixing Burgundy and collapsing the cream ramp
   touches nearly every page.
4. **Whether to adopt Owners at all**, given the site's current look was built and
   signed off around Cormorant and DM Sans.

## Watch out for file corruption

One copy of this `.ai` arrived through a chat app with every compressed stream
beginning `EF BF BD`, the UTF-8 replacement character. A text encoding conversion in
transit had replaced every non-UTF-8 byte, destroying all artwork and leaving only
ASCII metadata. The copy committed here is intact and verified. Send it zipped.
