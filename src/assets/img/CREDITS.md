# Image credits

Photos from Louma Bakery's own commissioned shoots (photographed by Kayla on
2026-08-30 and 2026-09-04), phone photos from the owner's Dropbox (`IMG_` files
and two undated exports), and two photos extracted from the owner's website
brief (`website (1).pdf`). Originals are kept outside the repo.

Processing (October 2026, Phase 4): EXIF orientation applied, converted to sRGB
from the embedded profile (Adobe RGB or Display P3), long edge capped at 2400px
(the hero at 3000px; never upscaled), JPEG quality 82,
all metadata stripped (GPS included). Every file is 1.5 MB or less. Camera roll
was corrected only where a wall, window, shelf or door frame was off by more
than 0.5 degrees (rotation noted below); subjects placed at an angle on purpose
were left alone. The build makes the web sizes from these.

Photos in `unplaced/` are the library for later. They are NOT bundled: the glob
in src/lib/images.ts only matches files directly in this folder. To use one,
move it up a level and reference it.

## Placed (src/assets/img/)

| File | Used for | Source | Shoot |
|------|----------|--------|-------|
| croissant-grid.jpg | Home hero (`images.json` hero); source frame of public/og-default.jpg. Renamed from hero.jpg | 20260830_LoumaBakery_0578 | 2026-08-30 |
| pain-au-chocolat.jpg | Home gallery 1 | 20260830_LoumaBakery_0093 | 2026-08-30 |
| counter-shelves.jpg | Home gallery 2 | brief PDF, page 5 (counter, tile wall, bread shelves; 2048x1366, the only copy) | brief PDF |
| baker-raspberries.jpg | Home gallery 3 | 20260904_LoumaBakery_0034 | 2026-09-04 |
| interior-table.jpg | Home gallery 4 | IMG_1703 | phone |
| story-collage.jpg | Our Story photo. Owner round 3: the cream margin baked into the export was trimmed off (crop x209 y283, 1473x1869 from 1878x2400) | eefec98f-5b8b-45f4-98dd-e80de5f5b7b0 (also on brief PDF page 8) | undated Dropbox export |
| ig-1.jpg | Instagram strip tile 1 | IMG_0008 | phone |
| ig-2.jpg | Instagram strip tile 2: the apple tart with two apples. 1200x1600 as sent, not re-encoded, no metadata in the file; the tile crops it square around the middle | apple-tart-with-apples.jpg | owner, WhatsApp, 2026-10-16 |
| ig-3.jpg | Instagram strip tile 3 | IMG_9795 3 | phone |
| ig-4.jpg | Instagram strip tile 4 | IMG_9855 2 | phone |
| ig-5.jpg | Instagram strip tile 5 | 20260830_LoumaBakery_0258 | 2026-08-30 |
| ig-6.jpg | Instagram strip tile 6 | IMG_0255 2 | phone |
| shop-hat.png | Shop: Louma Hat. Cutout (rembg u2net, cast shadow dropped, edge eroded 3px and feathered 1px at source size), trimmed to the hat plus 4% padding, 1200x983 | 20260830_LoumaBakery_0340 | 2026-08-30 |
| shop-berry-tart.jpg | Shop: Berry Tart. Square crop centred on the tart (x0 y196, 1200x1200 of 1200x1600), straight, colour untouched, q82, metadata stripped | berry-tart-overhead.jpg | owner, WhatsApp, 2026-10-15 |
| shop-pecan-tart.jpg | Shop: Pecan Tart (placeholder until the whole-tart photo). Square crop of the plate, stack and broken pieces with wood around them (x87 y537, 900x900 of 1200x1600, not resized), straight, colour untouched, q82, metadata stripped | pecan-tartlets-stack.jpg | owner, WhatsApp, 2026-10-16 |
| shop-basque-cheesecake.jpg | Shop: Basque Cheesecake (placeholder until the whole-cake photo). Square crop of the slice and the whole plate (x24 y507, 1040x1040 of 1200x1600, scaled to 900x900), straight, colour untouched, q82, metadata stripped | basque-cheesecake-slice.jpg | owner, WhatsApp, 2026-10-16 |

## Library (src/assets/img/unplaced/, not bundled)

| File | Source | Shoot |
|------|--------|-------|
| unplaced/staff-at-case.jpg | 20260830_LoumaBakery_0375 | 2026-08-30 |
| unplaced/bread-wall.jpg | 20260904_LoumaBakery_0041 (full frame, 2166x2400) | 2026-09-04 |
| unplaced/croissants-cooling-racks.jpg | 6c8d1115-83e0-403e-b612-73627819e133 2 | undated Dropbox export |
| unplaced/almond-croissants-tray.jpg | IMG_0018 | phone |
| unplaced/croissants-yellow-paper.jpg | IMG_0061 2 | phone |
| unplaced/sandwich-pink-paper.jpg | IMG_0125 | phone |
| unplaced/swirl-buns-yellow-paper.jpg | IMG_0184 2 | phone |
| unplaced/swirl-bun-torn.jpg | IMG_0235 2 | phone |
| unplaced/sugar-bun-plate.jpg | IMG_0261 2 | phone |
| unplaced/kaak-shelf.jpg | IMG_0278 2 | phone |
| unplaced/pastry-tray-table.jpg | IMG_0292 2 | phone |
| unplaced/bread-shelf-bagged.jpg | IMG_1207 3 | phone |
| unplaced/swirl-buns-rack.jpg | IMG_2368 3 | phone |
| unplaced/pastry-tray-overhead.jpg | IMG_2546 2 | phone |
| unplaced/shop-hat.webp | 20260830_LoumaBakery_0340 (WebP copy of the hat cutout; the site renders shop-hat.png) | 2026-08-30 |
| unplaced/bakery-rack.jpg | 20260904_LoumaBakery_0068 | 2026-09-04 |
| unplaced/lamination.jpg | 20260830_LoumaBakery_0198 | 2026-08-30 |
| unplaced/croissant-cut.jpg | 20260904_LoumaBakery_0307 | 2026-09-04 |
| unplaced/out-of-oven.jpg | 20260904_LoumaBakery_0255 | 2026-09-04 |
| unplaced/storefront.jpg | 20260904_LoumaBakery_0084 | 2026-09-04 |
| unplaced/map-hand-drawn-source.png | brief PDF, page 14 (589x716, the only copy; reference for src/assets/brand/map-hand-drawn.svg) | brief PDF |
| unplaced/seeded-knot-tissue.jpg | 20260830_LoumaBakery_0278 (not reprocessed) | 2026-08-30 |
| unplaced/seeded-knot-detail.jpg | 20260830_LoumaBakery_0083 (not reprocessed) | 2026-08-30 |
| unplaced/kitchen-team.jpg | 20260830_LoumaBakery_0139. Rotated 1.0° clockwise (window mullions). Was home gallery 5 until owner round 1 | 2026-08-30 |
| unplaced/storefront-window.jpg | 20260904_LoumaBakery_0092. Rotated 5.05° counter-clockwise (window frame). Was the Contact page photo until owner round 1 | 2026-09-04 |
| unplaced/coffee-unidentified.jpg | 20260830_LoumaBakery_0190 (crop x2250 y6740, 1500x1000; drink type unconfirmed) (not reprocessed) | 2026-08-30 |
| unplaced/story-flowers.jpg | brief PDF, page 8 (flowers on the counter; 1536x2048, the only copy). Rotated 0.67° counter-clockwise (door frame, shelving). Was Our Story photo 2 until owner round 3 | brief PDF |
| unplaced/viennoiserie-spread.jpg | 20260830_LoumaBakery_0079 (not reprocessed) | 2026-08-30 |
| unplaced/madeleine-production.jpg | 20260830_LoumaBakery_0300 (not reprocessed) | 2026-08-30 |
| unplaced/louma-cap.jpg | 20260830_LoumaBakery_0340 (the full hat photo; not reprocessed) | 2026-08-30 |
| unplaced/madeleines.jpg | 20260904_LoumaBakery_0049 (not reprocessed) | 2026-09-04 |
| unplaced/interior-long.jpg | 20260904_LoumaBakery_0437 (not reprocessed) | 2026-09-04 |
| unplaced/interior-dining.jpg | 20260904_LoumaBakery_0023 (not reprocessed) | 2026-09-04 |
| unplaced/counter.jpg | 20260904_LoumaBakery_0126 (not reprocessed) | 2026-09-04 |
| unplaced/back-of-house.jpg | 20260904_LoumaBakery_0169 (not reprocessed) | 2026-09-04 |
| unplaced/dough-dividing.jpg | 20260904_LoumaBakery_0198 (not reprocessed) | 2026-09-04 |
| unplaced/counter-florals.jpg | 20260904_LoumaBakery_0150 (not reprocessed) | 2026-09-04 |
| unplaced/coffee-bar.jpg | 20260904_LoumaBakery_0438 (Display P3 export, full resolution; not reprocessed) | 2026-09-04 |
| unplaced/knot-pink-paper.jpg | 20260830_LoumaBakery_0281. Was home gallery 6 until owner round 1. Was menu data (Za'atar Croissant) until owner round 3 (the menu no longer keeps photos) | 2026-08-30 |
| unplaced/latte.jpg | 20260830_LoumaBakery_0190. Was menu data (Latte) until owner round 3 (the menu no longer keeps photos) | 2026-08-30 |
| unplaced/ham-cheese-croissant.jpg | 20260830_LoumaBakery_0070 (crop x150 y0, 3150x3150). Square crop of the seeded tray, 1200x1200 (not reprocessed). Was menu data (Ham & Cheese Croissant) until owner round 3 (the menu no longer keeps photos) | 2026-08-30 |
| unplaced/kaak-bread.jpg | 20260904_LoumaBakery_0126 (crop x2722 y1905). One loaf, 210x210 (not reprocessed). Was menu data (Kaak Bread) until owner round 3 (the menu no longer keeps photos) | 2026-09-04 |
| unplaced/sourdough.jpg | 20260904_LoumaBakery_0041. 1012x1262 crop of one boule (not reprocessed). Was menu data (Sourdough Bread) until owner round 3 (the menu no longer keeps photos) | 2026-09-04 |
| unplaced/madeleine-vanilla.jpg | 20260904_LoumaBakery_0049. Crop (not reprocessed). Was menu data (Madeleine Vanilla) until owner round 3 (the menu no longer keeps photos) | 2026-09-04 |
| unplaced/madeleine-chocolate.jpg | 20260904_LoumaBakery_0049. Crop, 1486x1800 (not reprocessed). Was menu data (Madeleine Chocolate) until owner round 3 (the menu no longer keeps photos) | 2026-09-04 |
| unplaced/madeleine-raspberry.jpg | 20260904_LoumaBakery_0049. Crop, 1380x1800 (not reprocessed). Was menu data (Madeleine Raspberry) until owner round 3 (the menu no longer keeps photos) | 2026-09-04 |
| unplaced/almond-croissant.jpg | 20260904_LoumaBakery_0146 (not reprocessed). Was menu data (Nutty Croissant) until owner round 3 (the menu no longer keeps photos) | 2026-09-04 |
| unplaced/berry-tart-angle.jpg | berry-tart-angle.jpg (the berry tart at an angle, mini tarts behind; 1200x1600 as sent, metadata stripped, not re-encoded) | owner, WhatsApp, 2026-10-15 |

## Drawings made from owner material (src/assets/brand/)

| File | Source |
|------|--------|
| signature-milla.svg | The handwritten "Milla" from `LOUMA FINAL FINAL (3) 2.PNG` (the letter), cropped at x1897 y3299 593x325, thresholded and traced with potrace |
| map-hand-drawn.svg | The hand-drawn map, brief PDF page 14 (589x716), traced with potrace. Only a 589x716 copy exists; a higher-resolution scan should be requested from the owner |
