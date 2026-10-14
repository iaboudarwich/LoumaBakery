/**
 * Single source of truth for site-wide metadata, contact details, hours,
 * and external links. Never hardcode any of this in markup — read from here.
 *
 * The editor-facing fields (the two emails, address, hours, and the
 * Instagram / Uber Eats links) live in src/data/settings.json so the CMS
 * ("Site settings") can edit them. Technical/derived values stay here.
 * The bakery lists no phone number on purpose.
 */
import settings from '../data/settings.json';

export const siteConfig = {
  /** Production URL. Currently the Netlify subdomain; swap when the real domain lands. */
  url: 'https://loumabakeryy.netlify.app',

  name: 'Louma Bakery',
  /** Short brand line for <title> suffix and meta description fallback. */
  tagline: 'A neighborhood bakery on Wilshire',

  // --- Editor-managed (from settings.json via the CMS) ---
  email: settings.email,
  /** For larger orders. */
  ordersEmail: settings.ordersEmail,
  address: settings.address,
  hours: settings.hours,
  links: {
    /** Kept for later; rendered nowhere for now. */
    uberEats: settings.links.uberEats,
    instagram: settings.links.instagram,
    instagramHandle: settings.links.instagramHandle,
    /** Hero background video URL. Empty = the hero photo only; wire when footage lands. */
    heroVideo: '', // PLACEHOLDER — swap before launch (hero background video MP4/WebM)
  },

  /** Form confirmation / error copy, in the brand voice. Single source. */
  forms: {
    newsletterSuccess: "You're on the list. We'll write when there's something new from the oven.",
    cateringSuccess: "Got it. We'll be in touch within two business days.",
    careersSuccess: "Thanks for reaching out. We'll be in touch soon.",
    error: `That didn't send. Try again, or email ${settings.email}.`,
  },
} as const;

/** Convenience: the production URL. */
export const SITE_URL = siteConfig.url;

