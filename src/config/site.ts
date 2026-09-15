/**
 * Single source of truth for site-wide metadata, contact details, hours,
 * and external links. Never hardcode any of this in markup — read from here.
 *
 * The editor-facing fields (phone, email, address, hours, and the
 * Order/Instagram links) live in src/data/settings.json so the CMS
 * ("Site settings") can edit them. Technical/derived values stay here.
 */
import settings from '../data/settings.json';

// TODO(owner): settings.json still holds placeholders. Real phone number
// (currently "+1 (310) 000-0000") and a real Uber Eats URL are needed before
// handoff.

export const siteConfig = {
  /** Production URL. Currently the Netlify subdomain; swap when the real domain lands. */
  url: 'https://loumabakeryy.netlify.app',

  name: 'Louma Bakery',
  /** Short brand line for <title> suffix and meta description fallback. */
  tagline: 'A neighborhood bakery on Wilshire',

  // --- Editor-managed (from settings.json via the CMS) ---
  /** Empty while settings.json holds the placeholder, so nothing renders or
      dials it. A real number there shows up in the footer, home, visit and
      the JSON-LD with no other edits. */
  phone: /000-0000/.test(settings.phone) ? '' : settings.phone,
  email: settings.email,
  address: settings.address,
  hours: settings.hours,
  links: {
    uberEats: settings.links.uberEats,
    instagram: settings.links.instagram,
    /** Order/contact form endpoint. Netlify Forms by default; swap to a Formspree URL if used. */
    formspreeOrNetlify: '', // PLACEHOLDER — swap before launch (empty = use Netlify Forms)
    /** Hero background video URL. Empty = the hero photo only; wire when footage lands. */
    heroVideo: '', // PLACEHOLDER — swap before launch (hero background video MP4/WebM)
  },

  /** Form confirmation / error copy, in the brand voice. Single source. */
  forms: {
    newsletterSuccess: "You're on the list. We'll write when there's something new from the oven.",
    cateringSuccess: "Got it. We'll be in touch within two business days.",
    careersSuccess: "Thanks for reaching out. We'll be in touch soon.",
    error: "That didn't send. Try again, or email hello@loumabakery.com.",
  },
} as const;

/** Convenience: the production URL. */
export const SITE_URL = siteConfig.url;

