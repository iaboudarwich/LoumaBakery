/**
 * Feature flags. Every visual effect is gated here; each ALSO respects
 * prefers-reduced-motion at the CSS/JS level. Flip a flag to false to remove
 * that effect everywhere. Photos never animate.
 */
export const features = {
  // --- Motion (the complete whitelist; see src/scripts/motion.ts) ---
  /** The 404 page's face traces its outline once when seen (the footer face is static). */
  scrollDraw: true,
  /** Doodles reveal left to right (filled outlines) or draw their stroke, once at 30% in view. */
  doodleDraw: true,
  /** Sections fade in and settle 16px downward, once on entry. */
  reveal: true,
  /** The home hero baguette draws itself like a pen, erases along the same
      line and repeats (PenDraw.astro). Off: the filled baguette mark. */
  penDraw: true,

  // --- Micro / functional ---
  /** Transient corner notices (form confirmations). */
  toast: true,

  // --- Hidden for now (owner's choice). Each is a one-line switch: set it to
  // true and push to show it again. While false, the page is not built, its
  // address 301-redirects to / and it is left out of the sitemap and footer.
  // The page files, forms, data and CMS fields all stay. ---
  /** The Catering page (/catering) and its inquiry form. */
  cateringPage: false,
  /** The Careers page (/careers) and its application form. */
  careersPage: false,
  /** The footer newsletter signup ("Hear from the bakery") on every page. */
  newsletter: false,
} as const;

/** Routes switched off by the page flags above. One list, read by
    astro.config.mjs (redirects, sitemap) and the footer. Keep netlify.toml's
    [[redirects]] for these routes in step with it. */
export const hiddenRoutes: string[] = [
  !features.cateringPage && '/catering',
  !features.careersPage && '/careers',
].filter((r): r is string => Boolean(r));
