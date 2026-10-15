// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/config/site.ts';
import { hiddenRoutes } from './src/config/features.ts';

// https://astro.build/config
/**
 * /review is an internal effects-review page. It lives outside src/pages so it
 * never builds into production; this integration mounts it only under
 * `astro dev`.
 */
/** @type {import('astro').AstroIntegration} */
const devOnlyReview = {
  name: 'louma-dev-only-review',
  hooks: {
    'astro:config:setup': ({ command, injectRoute }) => {
      if (command === 'dev') injectRoute({ pattern: '/review', entrypoint: './src/dev/review.astro' });
    },
  },
};

export default defineConfig({
  site: SITE_URL,
  // /mission became /initiative, and pages switched off in
  // src/config/features.ts go home. Netlify serves the real 301s
  // (netlify.toml); these make the old URLs work in `astro dev` and preview
  // too. A redirect takes the route, so a hidden page is never built.
  redirects: {
    '/mission': '/initiative',
    ...Object.fromEntries(hiddenRoutes.map((r) => [r, '/'])),
  },
  integrations: [
    // Hidden pages stay out of the sitemap.
    sitemap({ filter: (page) => !hiddenRoutes.some((r) => new URL(page).pathname.replace(/\/$/, '') === r) }),
    devOnlyReview,
  ],
});
