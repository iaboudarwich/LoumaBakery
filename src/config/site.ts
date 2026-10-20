/**
 * Single source of truth for site-wide metadata, contact details, hours,
 * and external links. Never hardcode any of this in markup — read from here.
 *
 * The editor-facing fields (the two emails, address, hours, the parking note and the
 * Instagram / TikTok / Uber Eats links) live in src/data/settings.json so the CMS
 * ("Site settings") can edit them. Technical/derived values stay here.
 * The bakery lists no phone number on purpose.
 */
import settings from '../data/settings.json';

// "Get directions": a plain Google Maps search link built from the address
// in settings.json (no embed). Spaces become "+", commas stay readable.
const mapsQuery = `${settings.address.street}, ${settings.address.city}, ${settings.address.state} ${settings.address.zip}`;
const directionsUrl = `https://maps.google.com/?q=${encodeURIComponent(mapsQuery).replace(/%20/g, '+').replace(/%2C/g, ',')}`;

export const siteConfig = {
  /** Production URL. Currently the Netlify subdomain; swap when the real domain lands. */
  url: 'https://loumabakeryy.netlify.app',

  name: 'Louma Bakery',

  // --- Editor-managed (from settings.json via the CMS) ---
  email: settings.email,
  /** For larger orders. */
  ordersEmail: settings.ordersEmail,
  address: settings.address,
  hours: settings.hours,
  /** One line on the Contact page under the hours. Empty = not shown. */
  parkingNote: settings.parkingNote ?? '',
  /** Plain Google Maps link to the address (built from settings.json). */
  directionsUrl,
  links: {
    /** Kept for later; rendered nowhere for now. */
    uberEats: settings.links.uberEats,
    instagram: settings.links.instagram,
    instagramHandle: settings.links.instagramHandle,
    tiktok: settings.links.tiktok,
    tiktokHandle: settings.links.tiktokHandle,
  },

  /** The menu's page links (the menu button opens them on every page).
      Contact is in the footer, not here. Each label is the one place to
      rename a page in the menu. */
  nav: {
    home: { label: 'Home', href: '/' },
    menu: { label: 'Menu', href: '/menu' },
    story: { label: 'Our Story', href: '/story' },
    shop: { label: 'Shop', href: '/shop' },
    initiative: { label: 'The Louma Initiative', href: '/initiative' },
  },

  /** Footer columns. "Say hi" lists its links above the Instagram and TikTok
      icons; Before you order, Careers, Donate and Accessibility go here as
      { label, href } once their pages exist. */
  footer: {
    sayHi: [] as { label: string; href: string }[],
    more: [
      { label: 'Contact Us', href: '/visit' },
      { label: 'Large Order Inquiries', href: `mailto:${settings.ordersEmail}` },
    ],
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

