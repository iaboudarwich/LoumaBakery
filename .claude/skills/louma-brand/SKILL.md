---
name: louma-brand
description: Louma Bakery brand system. The eight-colour palette with red as primary, band surfaces, Owners type, square shapes, voice, and how to use the designer's master drawings. Use for any visual, brand, copy, or asset decision on the Louma site.
---

# Louma Brand

Source of truth: the designer's brand board, docs/BRAND.md and docs/brand/. Tokens live in src/styles/tokens.css.

## Palette (CSS tokens): exactly eight colours
--red #ED2739 (Louma Red, PRIMARY) · --burgundy #A10017 · --peach #FF676C · --tangerine #FF8926 · --fairy #DDEAC3 · --butter #FBF5D4 (page background) · --white #FFFFFF · --ink #1D1D1B (text)
Derived, built only from those eight with color-mix(): --body (ink 85% / butter, 9.9:1 on butter), --muted (ink 70% / butter, 5.9:1), --hairline / --hairline-strong (ink at 8% / 16%), shadows. Never introduce another hex.

## Red is the primary colour
On the board red is everywhere: the logo, every drawing, the type specimen. Use it boldly, with one constraint: red text on butter is 3.86:1, so red TEXT must be 24px or larger, or bold at 18.66px or larger. Small text sits in ink (--body, --muted) or burgundy (7.56:1 on butter). Body paragraphs on the pages are burgundy at the lead size, never ink (owner round 3): one shared rule (.lead, .page-intro .lede, .text-row-body p). Links are burgundy, and hover burgundy. Butter text on red is also 3.86:1 and white on red 4.24:1, so anything on a red fill is large too. The footer is burgundy with butter text (7.56:1), set in normal type. Underlines are plain solid lines everywhere; in the footer the two emails are always underlined and the other links underline on hover and focus only. The header nav links are red Owners Narrow Bold 19px, large bold text.
Approved lockups from the board: butter on red, butter on burgundy, red on butter, burgundy on butter, butter on peach, burgundy on peach, tangerine on butter, peach on butter, red on burgundy, butter on tangerine, burgundy on fairy, peach on fairy. Check text-size contrast before using any of them for small type.

## Surfaces
Butter is the page. Burgundy, fairy and white are full-width colour blocks (.block--burgundy/--fairy/--white); The footer is burgundy too; Louma Red is never a band. The colour change IS the divider (hard cut, no seams, no gradients). Photos are straight, full-bleed or in fixed-ratio slots, shown exactly as shot: no text, overlay or filter on them. No card behind the Our Story letter: it sits straight on the butter page.

## Type: Owners, three faces in use
Owners superfamily by Ohno Type Co (src/styles/fonts.css, public/fonts):
- Owners 500 (regular width): page titles and section headings (--fs-display clamp(36px,4.6vw,64px), --fs-h2 clamp(24px,2.6vw,36px); letter-spacing -0.015em, line-height 1.05), plus emphasis, labels (.label, 14px), buttons, menu item and product names, and the data voice (hours, address, form fields), tabular numerals.
- Owners 400: body copy.
- Owners Narrow 700: the header nav (and its mobile sheet), nowhere else.
No italic face and no other weight ships; font-synthesis is off. Labels: Owners 500, 14px, burgundy on butter (butter on burgundy); the footer's "Visit" heading is Owners 500 14px uppercase in butter. No dash or rule prefix. A label earns its place or is deleted. No prices anywhere except shop products.
Licence: the files are desktop TTFs; a webfont licence from Ohno Type Co is required before launch.

## Shapes
Square everywhere. Every radius is 0: buttons, chips, inputs, cards, photos, the nav. Don't add rounding.

## The drawings
All art in src/assets/brand/ is the designer's master, filled outline in currentColor (see the README there). Never redraw, trace, restyle or regenerate it; change it only from docs/brand/master.
- wordmark.svg: hand-lettered LOUMA with BAKERY beneath. The nav brand link and the footer lockup.
- face.svg: the scribble-hair face with closed eyes, the emotional centre. Footer ornament (static, butter) and the 404 page, where it draws its outline on scroll, then settles filled.
- baguette.svg: one loaf with three heart scores, the icon (filled). baguette-stroke.svg: its centreline as one stroke, made for the home hero's pen loop (PenDraw) and used nowhere else. The bread slice with a heart is the `bread-slice` doodle (the separate toast mark was removed, unused).
- doodles/: 26 single drawings from the board: ingredients, face, bread-slice, herb, palm, flower, kite, baguette-small, baguette-small-2, bubble-oui-oui, cup-ooo-la-la, waves-birds, bird, hearts, louma-smiley, cherries, flower-cluster, sun, sun-small, bear, bouquet, watermelon, live-laugh-louma, moon-stars, star-kite, star-kite-2.
Use only these drawings. Hearts are the recurring motif across the set. Keep drawings small accents (<=160px desktop, <=120px mobile), never oversized set pieces. Red or burgundy line art on butter; butter on dark.

## Hybrid principle
Keep the typography clean and the palette committed; let the hand-drawn marks supply the warmth and personality. Don't go full cartoon. Spend boldness on the face, the wordmark and the drawing animation; keep everything around them quiet.

## Voice
Warm, concrete, unfussy; like talking to a regular at the counter. Active voice. Buttons say what happens. Errors explain and offer a fix, in the brand's voice. Bans: em dashes, tricolons, "not just X, it's Y", empty superlatives (artisanal/finest/exceptional), jargon (crafted/curated/elevate/journey/savor), "we are passionate/committed". Menu lines: one concrete sentence, 8-15 words, ingredient or technique first. The inclusive mission is stated as plain fact, once per page, never with statistics about team members' disabilities.

Owner's words: text in story.json, copy.json and shop.json was written by the owner. Never rewrite, shorten or reword it, even when it uses words this guide otherwise avoids. Typos may be fixed only when asked.
