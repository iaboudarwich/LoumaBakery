/**
 * Brand asset barrel. Import the marks from here, not by deep path.
 *
 *   import { Face, Wordmark, Baguette, Toast } from "../lib/brand";
 *   <Face class="mark" width={80} height={74} />
 *
 * Each is an Astro SVG component: attributes (class, width, height,
 * aria-label, style…) are spread onto the root <svg>. The art uses
 * `currentColor`, so set CSS `color` on the element (or any parent) to
 * recolor — e.g. `color: var(--butter)` for cream-on-dark.
 *
 * The art is the designer's master (see src/assets/brand/README.md); the
 * viewBox roles are stable, so markup sizes against them:
 *  - Wordmark 374×240  filled outline · header, menu and footer (cropped), gift card, 404
 *  - Baguette 280×100  filled outline · the scroll-draw demo on /review
 * The face is rendered by FaceDraw.astro; every other drawing by Doodle.astro.
 * More drawings, one per file: src/assets/brand/doodles/.
 */
export { default as Wordmark } from "../assets/brand/wordmark.svg";
export { default as Baguette } from "../assets/brand/baguette-baked.svg";


/** viewBox cropping the wordmark to its art (the file keeps its 374×240 role
 *  box). Use where the drawing should fill its box: the header, the menu, the
 *  footer, the gift card. */
export const WORDMARK_ART = '7.5 53.8 359 132.4';
