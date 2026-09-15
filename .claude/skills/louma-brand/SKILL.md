---
name: louma-brand
description: Louma Bakery brand system — palette, band surfaces, typography, voice, and how to use the hand-drawn sketch assets. Use for any visual, brand, copy, or asset decision on the Louma site.
---

# Louma Brand

## Palette (CSS tokens)
--red #ED2739 (accent, max ~3 uses/page) · --burgundy #6E1F2A (workhorse: bands, buttons, links) · --clay #B8533F · --amber-warm #C8853A
--coral #EF6E78 · --ink #2A1F18 · --body #4A3D34 · --muted #665A4D (AA-safe)
--surface-0 #FAF5EA (cream canvas) · --surface-1 #F5EDD8 · --surface-2 #EFE2C4 · --surface-3 #E8D4AA · --butter #FBF5D4
--navy-stitch #2B3A55 (tokenized for dashed sticker borders; not used on the site today)

## Band surfaces (the slab system)
Sections are full-bleed slabs in exactly these surfaces: cream (--surface-0), burgundy, ink, or a full-bleed photo. The band change IS the divider (hard cut, no seams, no gradients). The intermediate tints (surface-1/2/3) never back a section; small component fills only. Text over photos sits on a flat solid ink/burgundy panel.

## Type
Cormorant Garamond = display voice ONLY, weights 300-400 (500 solely where 300/400 is illegible on cream; note the deviation). One `.statement` per band at clamp(2.75rem, 8vw, 7rem), leading ~0.95-1.0.
DM Sans = ALL functional UI/body, 14-16px.
DM Mono = the DATA VOICE: hours, prices, address, phone, meta labels, form inputs. Tabular numerals.
Label stamp (the only label treatment): DM Mono uppercase ~12px, 0.1em tracking, burgundy (coral on dark), no dash/rule prefix. A label earns its place or is deleted.

## The sketches
baguette.svg, toast.svg = single-stroke pencil line art with a baked roughen filter; they draw themselves once on scroll-in. face.svg = the scribble-hair smiling face, the emotional center: logo icon, favicon, footer/404 ornament; draws on scroll then settles filled. wordmark.svg = hand-lettered LOUMA BAKERY lockup. Sketches are small charming accents: <=160px desktop, <=120px mobile, never oversized set-pieces. Red/clay line art on cream; butter/cream stroke on dark. NEVER regenerate or restyle these files.

## Hybrid principle
Keep the refined editorial typography and warm palette; let the hand-drawn sketches and face supply the warmth and personality. Don't go full cartoon. Spend boldness on the face mark and the drawing animation; keep everything around them quiet.

## Voice
Warm, concrete, unfussy; like talking to a regular at the counter. Active voice. Buttons say what happens. Errors explain and offer a fix, in the brand's voice. Bans: em dashes, tricolons, "not just X, it's Y", empty superlatives (artisanal/finest/exceptional), jargon (crafted/curated/elevate/journey/savor), "we are passionate/committed". Menu lines: one concrete sentence, 8-15 words, ingredient or technique first. The inclusive mission is stated as plain fact, once per page, never with statistics about team members' disabilities.
