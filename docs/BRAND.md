# Louma Bakery — brand reference

What the designer supplied, what each piece is, and how the website uses it.

Assets live in [`docs/brand/`](./brand/).

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
that read as hearts. This is the icon; on the home page it sits above
the tagline and reveals once as you scroll.

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

## How the site uses the brand

The website follows the brand book.

- **Colours**: exactly eight, as tokens in `src/styles/tokens.css`: Louma Red
  `#ED2739`, Burgundy `#A10017`, Peach `#FF676C`, Tangerine `#FF8926`, Fairy `#DDEAC3`,
  Butter `#FBF5D4`, White `#FFFFFF`, and Ink `#1D1D1B` (the board's registration
  black) for text. Red is the primary colour, as on the board: the logo, the drawings,
  the page titles and section headings. Red text is only used at 24px and up, because
  red on Butter is 3.86:1; smaller text is Ink or Burgundy. Butter is the page;
  Burgundy, Fairy and White are full-width colour blocks.
- **Type**: Owners only, four styles served as web fonts: Owners Narrow Bold (titles
  and headings), Owners Narrow Medium (small labels), Owners Regular (body) and Owners
  Medium (emphasis, buttons, names, hours). A webfont licence is still needed; see
  `docs/HANDOFF.md`.
- **Shapes**: square corners everywhere, no shadows, gradients or blur. (The board's
  colour tiles are rounded squares; the site keeps every corner square by the owner's
  choice.)
- **Drawings**: only the designer's master art, in `src/assets/brand/`: the wordmark,
  the baguette mark, the face, the bread slice, and the 26 doodles cut from the board.
  They are used as small red accents and reveal once as you scroll.
- **Two drawings come from the owner, not the board.** Both were traced from the
  owner's own material and are kept beside the masters in `src/assets/brand/`:
  - `signature-milla.svg`: Milla's handwritten signature, from the printed founder's
    letter. It signs the letter on the Our Story page.
  - `map-hand-drawn.svg`: the hand-drawn map of the bakery at Wilshire and Centinela,
    with "welcome to LOUMA BAKERY", from the website brief. It is on the Contact page.
    A higher-resolution scan of the original would give a cleaner trace.
- **The address** on the board reads "B3223 Wilshire Blvd, Los Angeles, CA". The site
  uses the bakery's real address, 3223 Wilshire Blvd, Santa Monica, CA 90403.

## Watch out for file corruption

One copy of this `.ai` arrived through a chat app with every compressed stream
beginning `EF BF BD`, the UTF-8 replacement character. A text encoding conversion in
transit had replaced every non-UTF-8 byte, destroying all artwork and leaving only
ASCII metadata. The copy committed here is intact and verified. Send it zipped.
