import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { file } from 'astro/loaders';

/**
 * Content collections. All copy/data lives here (or in the seed JSON under
 * src/data/) — never hardcoded in markup. Image fields are string paths
 * resolved by src/lib/images.ts (no placeholder fallbacks).
 */

const menu = defineCollection({
  // menu.json is wrapped as { "categories": [...] } so the CMS can edit it
  // (Decap can't edit a root-level array). Unwrap to the category list here.
  loader: file('src/data/menu.json', { parser: (text) => JSON.parse(text).categories }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(0),
    items: z.array(
      z.object({
        name: z.string(),
        price: z.string().optional(), // string so "$4.50" / "MP" render verbatim; absent = not yet priced
        description: z.string().default(''),
        tags: z.array(z.string()).default([]),
        image: z.string().optional(), // filename in src/assets/img
        alt: z.string().optional(), // describes the photo; falls back to the item name
      }),
    ),
  }),
});

const copy = defineCollection({
  loader: file('src/data/copy.json'),
  // One entry per page (keyed by page slug). Fields are optional so each
  // page uses what it needs; extra keys pass through.
  schema: z
    .object({
      eyebrow: z.string().optional(),
      title: z.string().optional(),
      lede: z.string().optional(),
      body: z.array(z.string()).default([]),
      cta: z.object({ label: z.string(), href: z.string() }).optional(),
      // Home-specific section copy (optional; other pages ignore).
      craftLine: z.string().optional(),
      missionLine: z.string().optional(),
      menuTitle: z.string().optional(),
      ovenTitle: z.string().optional(),
      findTitle: z.string().optional(),
      newsletterTitle: z.string().optional(),
      newsletterBody: z.string().optional(),
      newsletterCta: z.string().optional(),
      // Inner-page structured copy (optional; each page reads what it needs).
      allergenNote: z.string().optional(),
      mapEmbed: z.string().optional(),
      founder: z
        .object({ name: z.string(), role: z.string(), body: z.array(z.string()).default([]) })
        .optional(),
      values: z.array(z.object({ title: z.string(), body: z.string() })).optional(),
      stats: z
        .array(z.object({ value: z.number(), label: z.string(), prefix: z.string().optional(), suffix: z.string().optional() }))
        .optional(),
      steps: z.array(z.object({ n: z.string().optional(), title: z.string(), body: z.string() })).optional(),
      tiers: z
        .array(z.object({ name: z.string(), price: z.string(), items: z.array(z.string()).default([]), note: z.string().optional() }))
        .optional(),
      roles: z.array(z.object({ title: z.string(), type: z.string().optional(), body: z.string() })).optional(),
    })
    .loose(),
});


const marquee = defineCollection({
  // wrapped as { items: [...] } for the CMS; unwrap here.
  loader: file('src/data/marquee.json', { parser: (text) => JSON.parse(text).items }),
  schema: z.object({
    text: z.string(),
    order: z.number().default(0),
  }),
});

const storyChapters = defineCollection({
  // wrapped as { chapters: [...] } for the CMS; unwrap here.
  loader: file('src/data/story-chapters.json', { parser: (text) => JSON.parse(text).chapters }),
  schema: z.object({
    order: z.number().default(0),
    eyebrow: z.string().optional(),
    title: z.string(),
    body: z.string(),
    image: z.string().optional(), // filename in src/assets/img
    alt: z.string().optional(), // describes the photo; falls back to the title
  }),
});

const ingredients = defineCollection({
  // wrapped as { ingredients: [...] } for the CMS; unwrap here.
  loader: file('src/data/ingredients.json', { parser: (text) => JSON.parse(text).ingredients }),
  schema: z.object({
    name: z.string(),
    note: z.string().optional(),
  }),
});

export const collections = {
  menu,
  copy,
  marquee,
  storyChapters,
  ingredients,
};
