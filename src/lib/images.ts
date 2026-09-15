import type { ImageMetadata } from 'astro';

// TODO(photo-ids): unconfirmed item identities from the Kayla shoots.
//  - seeded-knot.jpg / seeded-knot-tissue.jpg / seeded-knot-detail.jpg: item
//    name unconfirmed, possibly a round Zaatar Croissant or the Cardamom Bun.
//  - zaatar-croissant.jpg: may actually be the Ham & Cheese Croissant.
// TODO(founder-portrait): no portrait of Milla yet; see src/pages/story.astro.

/**
 * Shared bakery-photo resolver. One eager glob of the image folder, reused by
 * every page (was duplicated in index/menu/story). Maps a filename OR a
 * CMS-stored path (e.g. "/src/assets/img/x.jpg") to optimizable metadata for
 * <Img> / getImage. Returns undefined when the file is missing; callers render
 * no image in that case (there are no placeholder fallbacks).
 *
 * The glob is deliberately non-recursive: `*` does not match subfolders, so
 * photos parked in src/assets/img/unplaced/ are never bundled. CMS uploads land
 * directly in src/assets/img/ and are picked up as before.
 */
const photos = import.meta.glob<ImageMetadata>('../assets/img/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

export const resolveImage = (name?: string): ImageMetadata | undefined => {
  if (!name) return undefined;
  return photos[`../assets/img/${name.split('/').pop()}`];
};
