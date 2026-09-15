/**
 * Feature flags. Every visual effect is gated here; each ALSO respects
 * prefers-reduced-motion and mobile at the CSS/JS level. Flip a flag to false
 * to remove that effect everywhere.
 */
export const features = {
  // --- Motion (the complete whitelist; see src/scripts/motion.ts) ---
  /** Slow drift on the hero media (desktop only). */
  kenBurns: true,
  /** Sketches draw themselves once when seen; never left invisible. */
  scrollDraw: true,
  /** Sections fade in and settle downward; children staggered. */
  reveal: true,
  /** Feature images unveil with a soft clip wipe + 1.04->1 settle. */
  imageWipe: true,
  /** One slow ghost ticker on the burgundy band; pauses on hover. */
  marquee: true,

  // --- Micro / functional ---
  /** Hand-drawn wavy underline on body-copy links. */
  sketchyLinks: true,
  /** One warm tone treatment on all photography. */
  imageTone: true,
  /** Menu rows lean the dish name in on hover. */
  menuHover: true,
  /** Hero CTA becomes the newsletter while ordering is inert. */
  heroNewsletterCta: true,
  /** Drag-to-scroll on the ingredient row. */
  ingredientSlider: true,
  /** Transient corner notices (form confirmations). */
  toast: true,
  /** Slim sticky bottom CTA bar on phones (thumb-reach newsletter jump). */
  mobileCtaBar: true,
} as const;

