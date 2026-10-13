# Brand assets

Everything the designer supplied, organised. Full analysis and the gap against the
live site: [`../BRAND.md`](../BRAND.md).

## What is here

| Path | What it is |
|---|---|
| `LB-Brand-Assets-2026_01-v001.ai` | The master file. Adobe Illustrator, PDF-compatible, 7 pages |
| `master/` | Each board page as a true vector SVG, extracted from the master |
| `preview/` | The same 7 pages as PNGs, for looking at quickly |
| `palette.css` | The six brand colours as CSS variables. Reference only, not imported |

## The 7 pages

| # | File | Contents |
|---|---|---|
| 1 | `01-wordmark` | Primary wordmark: hand-lettered LOUMA, BAKERY beneath in Owners Narrow Bold |
| 2 | `02-baguette-mark` | The icon: one unbroken stroke, oval loaf with three heart scores |
| 3 | `03-palette` | Six swatches, each with name, RGB and hex |
| 4 | `04-lockups` | Twelve approved logo colourways |
| 5 | `05-typography` | Owners specimen, plus the brand lines set in it |
| 6 | `06-illustrations` | Five primary hand-drawn groups, including the face |
| 7 | `07-doodles` | The sticker set, looser and more playful |

## Using the master SVGs

`01-wordmark.svg` and `02-baguette-mark.svg` are single-path and clean, so they are
ready to use as they are. These are the real art, and they supersede the traced
placeholders in `src/assets/brand/`.

Pages 5 to 7 are large because every illustration on the page is in one file. To use
one illustration on its own, open the page SVG in Illustrator or Figma and cut out
the piece you want. Do not use these whole-page files on the site.

## Fonts

The typeface is **Owners**, by Ohno Type Co. The complete superfamily lives in a
separate Drive folder, 98 TTFs:
https://drive.google.com/drive/folders/1Wo_uDHeSXBRJ1q72TOEVMOFJLNI85Wpq

Those are desktop TTFs. Web use needs a separate webfont licence from Ohno Type Co,
and the site does not use Owners today.

## A note on the file you may have been sent

If you receive this `.ai` through a chat app, check it before trusting it. One copy
arrived with every compressed stream beginning `EF BF BD`, the UTF-8 replacement
character, which meant all the artwork was destroyed. The copy here is intact.
Send it zipped to avoid that.
