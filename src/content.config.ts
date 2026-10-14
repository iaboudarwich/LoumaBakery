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
    items: z.array(
      z.object({
        name: z.string(),
        description: z.string().default(''),
        tags: z.array(z.string()).default([]),
        image: z.string().optional(), // filename in src/assets/img (not shown on /menu)
        alt: z.string().optional(), // describes the photo; falls back to the item name
      }),
    ),
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
      newsletterCta: z.string().optional(),
      // Initiative, Menu
      intro: paragraphs,
      sections: z.array(titledSection).optional(),
      pillars: z.array(z.string()).optional(),
      allergenNote: z.string().optional(),
      // Shop
      status: z.string().optional(),
      preorder: z.object({ title: z.string(), body: z.string().default('') }).optional(),
      giftCards: z.object({ title: z.string(), body: z.string().default('') }).optional(),
      merch: z.object({ title: z.string() }).optional(),
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

const shop = defineCollection({
  loader: file('src/data/shop.json', { parser: (text) => [{ id: 'shop', ...JSON.parse(text) }] }),
  schema: z.object({
    preorderLink: z.string().default(''),
    giftCardLink: z.string().default(''),
    products: z.array(
      z.object({
        name: z.string(),
        price: z.string().default(''),
        description: z.string().default(''),
        size: z.string().default(''),
        image: z.string().default(''), // filename in src/assets/img; empty = no image slot
        alt: z.string().default(''),
        link: z.string().default(''), // empty = disabled "Coming soon"
      }),
    ),
  }),
});

// Site photos (CMS: "Images"). Filenames in src/assets/img; every photo has
// its alt text beside it. homeGallery and story are registered for the next
// layout phase; hero and storefront render today.
const photo = z.object({ image: z.string(), alt: z.string() });
const images = defineCollection({
  loader: file('src/data/images.json', { parser: (text) => [{ id: 'images', ...JSON.parse(text) }] }),
  schema: z.object({
    hero: z.string(),
    heroAlt: z.string(),
    homeGallery: z.array(photo),
    story: z.array(photo),
    storefront: z.string(),
    storefrontAlt: z.string(),
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
