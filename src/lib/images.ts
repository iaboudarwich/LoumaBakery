import type { ImageMetadata } from 'astro';

// TODO(photo-ids): unplaced/seeded-knot-tissue.jpg and unplaced/seeded-knot-detail.jpg
//   look like the coiled Za'atar Croissant (zaatar-croissant.jpg, confirmed by
//   the case label in 20260904_LoumaBakery_0126) but are not confirmed themselves.
// TODO(founder-portrait): no portrait of Milla yet (the Story page has no portrait slot).

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
