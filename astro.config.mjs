// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/config/site.ts';

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
  integrations: [sitemap(), devOnlyReview],
});
