/**
 * Feature flags. Every visual effect is gated here; each ALSO respects
 * prefers-reduced-motion at the CSS/JS level. Flip a flag to false to remove
 * that effect everywhere. Photos never animate.
 */
export const features = {
  // --- Motion (the complete whitelist; see src/scripts/motion.ts) ---
  /** The footer face traces its outline once when seen. */
  scrollDraw: true,
  /** Doodles reveal left to right (filled outlines) or draw their stroke, once at 30% in view. */
  doodleDraw: true,
  /** Sections fade in and settle 16px downward, once on entry. */
  reveal: true,

  // --- Micro / functional ---
  /** Hand-drawn wavy underline on body-copy links. */
  sketchyLinks: true,
  /** Transient corner notices (form confirmations). */
  toast: true,
} as const;
