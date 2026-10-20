---
name: louma-brand
description: Louma Bakery brand system. The eight-colour palette with red as primary, band surfaces, Owners type, square shapes, voice, and how to use the designer's master drawings. Use for any visual, brand, copy, or asset decision on the Louma site.
---

# Louma Brand

Source of truth: the designer's brand board, docs/BRAND.md and docs/brand/. Tokens live in src/styles/tokens.css.

## Palette (CSS tokens): exactly eight colours
--red #ED2739 (Louma Red, PRIMARY) · --burgundy #A10017 · --peach #FF676C · --tangerine #FF8926 · --fairy #DDEAC3 · --butter #FBF5D4 (page background) · --white #FFFFFF · --ink #1D1D1B (text)
Derived, built only from those eight with color-mix(): --body (ink 85% / butter, 9.9:1 on butter), --muted (ink 70% / butter, 5.9:1), --hairline / --hairline-strong (ink at 8% / 16%), shadows. Never introduce another hex.

## Colour roles (designer round 5B)
Burgundy and butter carry the site: the home page is burgundy with butter text and a butter footer; every other page is butter with burgundy text and a burgundy footer; the Menu and Shop open with a full-bleed burgundy band (7.56:1 either way). Red is for page titles and section headings on the butter pages (Our Story, the Initiative, Contact, 404), at 24px or larger (red on butter is 3.86:1). Peach is the hover and focus accent, as the designer asked, and never resting text (2.58:1 on butter, 2.93:1 on burgundy): link underlines turn peach and 2px, icons show a 2px peach line under them, the button fills peach with ink text (5.96:1). Small text sits in burgundy (or ink in forms). Body paragraphs are burgundy at the body size, never ink: one shared rule (.lead, .page-intro .lede, .text-row-body p).
Approved lockups from the board: butter on red, butter on burgundy, red on butter, burgundy on butter, butter on peach, burgundy on peach, tangerine on butter, peach on butter, red on burgundy, butter on tangerine, burgundy on fairy, peach on fairy. Check text-size contrast before using any of them for small type.

## Surfaces
Butter or burgundy is the page (BaseLayout tone). Burgundy, fairy and white are full-width colour blocks (.block--*, .surface-*); Louma Red is never a band. The colour change IS the divider (hard cut, no seams). No gradients, except the soft ink scrim behind the home tagline on the hero photo. Photos are straight, full-bleed or in fixed slots, shown exactly as shot: no overlay or filter; the home tagline is the only text on a photo. No card behind the Our Story letter: it sits straight on the butter page.

## Type: Owners, three faces
Owners superfamily by Ohno Type Co (src/styles/fonts.css, public/fonts):
- Owners Narrow 700, uppercase (the display face): every title and heading (--fs-display 50px at 1440, --fs-h2 35px), the labels (VISIT, SAY HI, MORE, .label), the home tagline, product names, the menu's category links and the links in the menu. Letter-spacing 0.01em, line-height 1.05.
- Owners 400: body copy, intros, menu items and notes, links, the footer, buttons; "Follow along" on the home page too (not uppercase). Tracked 0.01em (--track-body).
- Owners 500: data and form fields only.
Sizes are the designer's at 1440 (50 / 35 / 30 / 25 / 25 / 20 / 15px), each scaling down to phones. No italic face and no other weight ships; font-synthesis is off. No dash or rule prefix on labels. A label earns its place or is deleted. No prices anywhere except shop products.
Licence: the files are desktop TTFs; a webfont licence from Ohno Type Co is required before launch.

## Shapes
Square everywhere. Every radius is 0: buttons, chips, inputs, cards, photos, the nav. Don't add rounding.

## The drawings
All art in src/assets/brand/ is the designer's master, filled outline in currentColor (see the README there). Never redraw, trace, restyle or regenerate it; change it only from docs/brand/master.
- wordmark.svg: hand-lettered LOUMA with BAKERY beneath. The header brand link (centred), the menu, and the footer (over the face).
- face.svg: the scribble-hair face with closed eyes, the emotional centre. Footer ornament (static, in the footer's text colour, up to 192px wide, under the wordmark) and the 404 page, where it draws its outline on scroll, then settles filled.
- baguette.svg: one loaf with three heart scores, the icon (filled). baguette-stroke.svg: its centreline as one stroke, made for the old home hero pen loop; kept, not used since round 5B. baguette-small (doodles) sits at the centre of the menu. The bread slice with a heart is the `bread-slice` doodle (the separate toast mark was removed, unused).
- doodles/: 26 single drawings from the board: ingredients, face, bread-slice, herb, palm, flower, kite, baguette-small, baguette-small-2, bubble-oui-oui, cup-ooo-la-la, waves-birds, bird, hearts, louma-smiley, cherries, flower-cluster, sun, sun-small, bear, bouquet, watermelon, live-laugh-louma, moon-stars, star-kite, star-kite-2.
Use only these drawings. Hearts are the recurring motif across the set. Keep drawings small accents (<=160px desktop, <=120px mobile), never oversized set pieces. Red or burgundy line art on butter; butter on dark.

## Hybrid principle
Keep the typography clean and the palette committed; let the hand-drawn marks supply the warmth and personality. Don't go full cartoon. Spend boldness on the face, the wordmark and the drawing animation; keep everything around them quiet.

## Voice
Warm, concrete, unfussy; like talking to a regular at the counter. Active voice. Buttons say what happens. Errors explain and offer a fix, in the brand's voice. Bans: em dashes, tricolons, "not just X, it's Y", empty superlatives (artisanal/finest/exceptional), jargon (crafted/curated/elevate/journey/savor), "we are passionate/committed". Menu items are the owner's own names, each with at most one short note in her words. The inclusive mission is stated as plain fact, once per page, never with statistics about team members' disabilities.

Owner's words: text in story.json, copy.json and shop.json was written by the owner. Never rewrite, shorten or reword it, even when it uses words this guide otherwise avoids. Typos may be fixed only when asked.
