import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { file } from 'astro/loaders';

/**
 * Content collections. All copy/data lives here (or in the seed JSON under
 * src/data/), never hardcoded in markup. Image fields are string paths
 * resolved by src/lib/images.ts (no placeholder fallbacks).
 *
 * Decap can't edit a root-level array, so list files are wrapped in an object
 * ({ "categories": [...] }, { "items": [...] }) and unwrapped here. Single-object
 * files (story, shop) load as one entry.
 */

const menu = defineCollection({
  loader: file('src/data/menu.json', { parser: (text) => JSON.parse(text).categories }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(0),
    column: z.enum(['food', 'drinks']), // which /menu column it sits in on wide screens
    items: z.array(
      z.object({
        name: z.string(),
        note: z.string().nullish().transform((v) => v ?? ''), // one short line under the name; empty = none
      }),
    ),
    notes: z.array(z.string()).nullish().transform((v) => v ?? []), // short lines after the items (the editor may save null)
  }),
});

const paragraphs = z.array(z.string()).default([]);
const titledSection = z.object({ title: z.string(), paragraphs });

const copy = defineCollection({
  loader: file('src/data/copy.json'),
  // One entry per page (keyed by page slug). Fields are optional so each page
  // reads what it needs.
  schema: z
    .object({
      title: z.string().optional(),
      // Home
      tagline: z.string().optional(),
      instagramTitle: z.string().optional(),
      newsletterTitle: z.string().optional(),
      newsletterBody: z.string().optional(),
      // Initiative, Menu
      intro: paragraphs,
      sections: z.array(titledSection).optional(),
      allergenNote: z.string().optional(),
      // Shop: the "Coming soon" words for a product with no link, and the
      // button words for a product with one
      status: z.string().optional(),
      cart: z.string().optional(),
      // Catering, Careers, 404 (unchanged pages)
      eyebrow: z.string().optional(),
      lede: z.string().optional(),
      body: paragraphs,
      cta: z.object({ label: z.string(), href: z.string() }).optional(),
      steps: z.array(z.object({ n: z.string().optional(), title: z.string(), body: z.string() })).optional(),
      tiers: z
        .array(z.object({ name: z.string(), price: z.string(), items: z.array(z.string()).default([]), note: z.string().optional() }))
        .optional(),
      roles: z.array(z.object({ title: z.string(), type: z.string().optional(), body: z.string() })).optional(),
    })
    .strict(),
});

const story = defineCollection({
  loader: file('src/data/story.json', { parser: (text) => [{ id: 'story', ...JSON.parse(text) }] }),
  schema: z.object({
    letter: z.object({ paragraphs, signature: z.string() }),
    sections: z.array(titledSection),
  }),
});

// Shop: the intro line, then the products in the order shown (the hat first).
// The editor may save an empty optional field as null; each one falls back to
// its empty default.
const text = z.string().nullish().transform((v) => v ?? '');
const shop = defineCollection({
  loader: file('src/data/shop.json', { parser: (text) => [{ id: 'shop', ...JSON.parse(text) }] }),
  schema: z.object({
    intro: text,
    products: z.array(
      z.object({
        name: z.string(),
        price: text, // empty = no price shown
        note: text,
        image: text, // filename in src/assets/img; empty = no photo
        alt: text,
        link: text, // empty = not a link, "Coming soon"
        fit: z.enum(['cover', 'contain']).nullish().transform((v) => v ?? 'cover'), // cover fills the square; contain = a cutout on butter
        kind: z.enum(['product', 'giftcard']).nullish().transform((v) => v ?? 'product'), // giftcard: the burgundy wordmark tile
      }),
    ),
  }),
});

// Site photos (CMS: "Photos"). Filenames in src/assets/img; every photo has
// its alt text beside it. hero: the full-bleed home hero; homeKitchen: the
// full-bleed kitchen photo on the home page; menu: the photo in the Menu
// page band; story: the Our Story photo (one). `focus` is the part of the
// photo kept when its slot crops it (CSS object-position): a keyword, or
// "x% y%". Empty or missing = center.
const focus = z
  .string()
  .regex(/^(|center|top|bottom|left|right|\d{1,3}% \d{1,3}%)$/, 'center, top, bottom, left, right, or "x% y%"')
  .optional();
const photo = z.object({ image: z.string(), alt: z.string(), focus });
const images = defineCollection({
  loader: file('src/data/images.json', { parser: (text) => [{ id: 'images', ...JSON.parse(text) }] }),
  schema: z.object({
    hero: z.string(),
    heroAlt: z.string(),
    homeKitchen: photo,
    menu: photo,
    story: z.array(photo),
  }),
});

const instagram = defineCollection({
  loader: file('src/data/instagram.json', {
    parser: (text) => JSON.parse(text).items.map((it: object, i: number) => ({ id: `tile-${i + 1}`, ...it })),
  }),
  schema: z.object({
    image: z.string().default(''), // filename in src/assets/img; empty tiles are skipped
    alt: z.string().default(''),
  }),
});

export const collections = {
  menu,
  copy,
  story,
  shop,
  instagram,
  images,
};
