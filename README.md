# Louma Bakery website

Marketing site for Louma Bakery, a neighborhood bakery on Wilshire in Santa Monica. Seven public pages (home, menu, story, mission, careers, catering, visit) plus a 404. Content is edited by a non-developer through a git-backed CMS. Three Netlify Forms collect newsletter signups, job applications and catering inquiries.

Live: https://loumabakeryy.netlify.app (note the double "y"; see Accounts below).

If you only read one other file, read `CLAUDE.md`. It is the design system and the house rules (copy bans, motion whitelist, mobile rules), written for whoever edits this next, human or AI. `docs/EDITING.md` is the guide for the person who edits content.

---

## Stack, and why

| Piece | Why |
|---|---|
| **Astro 6, static output** | It's a brochure site: no server, no database, nothing to patch at runtime. Pages are HTML at build time; the little JS there is (nav, forms, motion) is plain TypeScript bundled by Astro. |
| **TypeScript, strict** | `astro check` is the type gate. No UI framework (no React/Vue); components are `.astro` files. |
| **Content collections + JSON** (`src/data/*.json`) | Every word and photo choice lives in data, not markup, so the CMS can edit it and the build validates it with zod schemas. |
| **Decap CMS, self-hosted** (`public/admin/`) | Git-backed: an edit is a commit to `main`, which triggers a deploy. The vendored bundle means no third-party CDN on the admin page. Login goes through **DecapBridge** (email + password, so the editor needs no GitHub account). |
| **Netlify** | Static hosting, deploy on push, and Netlify Forms (no backend needed for the three forms). |
| **`astro:assets`** | Build-time AVIF/WebP at several widths from the source photos in the repo. |
| **`motion`** | Small animation library behind the flag-gated effects in `src/scripts/motion.ts`. |
| **Owners (Ohno Type Co)** | The brand typeface, self-hosted as four woff2 subsets in `public/fonts/` (Owners Narrow 700 and 500, Owners 400 and 500), declared in `src/styles/fonts.css`; nothing loads from a font CDN. Desktop-licensed: a webfont licence from Ohno Type Co is required before launch. |

## Run it locally

Requires Node **22.12 or newer** (`engines` in `package.json`; there is no `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:4321, plus the internal /review page (dev only)
npm run build      # production build into dist/ (runs scripts/gen-admin-demo.mjs first)
npm run preview    # serve dist/ locally
npx astro check    # type and template check; keep this at 0 errors, 0 warnings
```

There is no automated test suite and no CI beyond Netlify's build. See "How changes were verified" below.

## How deploys work

* The GitHub repo `iaboudarwich/LoumaBakery` is linked to the Netlify site **loumabakeryy**. **Every push to `main` builds and publishes to production.** There is no staging branch.
* Netlify runs `npm run build` and publishes `dist/` (`netlify.toml`). The same file sets the security headers (a strict CSP for the public site, a looser one scoped to `/admin/*` for Decap) and one-year immutable caching on `/_astro/*` (fingerprinted assets).
* CMS edits are commits to `main` too, so an editor publishing a change triggers a production deploy. Expect a couple of minutes from Publish to live.
* A manual deploy is possible with the Netlify CLI (it's a devDependency): `npx netlify deploy --dir=dist` for a draft URL, add `--prod` for production. The folder must be linked first (`npx netlify link`; `.netlify/` is gitignored).
* The production URL comes from one value: `siteConfig.url` in `src/config/site.ts` (exported as `SITE_URL`, used by `astro.config.mjs` for canonical URLs and the sitemap). Change it there when a real domain lands. `public/robots.txt` (sitemap line) and `public/admin/config.yml` (`site_url`, `display_url`, `logo_url`) hard-code the Netlify URL as well; update them at the same time.

## Where things live

```
src/
  pages/           one .astro file per route (index, menu, story, mission, careers, catering, visit, 404)
  layouts/         BaseLayout.astro: <head>, meta, JSON-LD, fonts, nav, footer, mobile CTA bar
  components/      Nav, MobilePanel (the phone slide-in menu), Footer, NewsletterForm, Img, Sketch, FaceDraw
  data/            ALL editable content as JSON (what the CMS edits)
  content.config.ts  zod schemas that load src/data/*.json into content collections
  config/site.ts   site-wide values (URL, name, contact via settings.json, form messages)
  config/features.ts  feature flags for every visual effect
  lib/images.ts    the photo resolver (see Images)
  scripts/         client JS: forms.ts (Netlify Forms over fetch), motion.ts (all effects)
  styles/          tokens.css (palette, type scale, spacing), fonts.css, global.css
  assets/img/      source photos (build-optimized); unplaced/ = not used, see Images
  assets/brand/    the wordmark and pencil sketches; these ARE the brand, never regenerate them
  dev/review.astro internal effects-review page, mounted only by `astro dev`
public/
  admin/           Decap CMS (index.html, config.yml, vendored decap-cms bundle)
  admin-demo/      the same editor on an in-memory backend (config.yml generated at prebuild)
scripts/           build/maintenance scripts (see scripts/README.md)
docs/EDITING.md    the non-developer editing guide
docs/BRAND.md      the brand reference: colours, typeface, marks, and how the site diverges
docs/brand/        the designer's master assets (.ai, page SVGs, previews, palette)
```

## Content: where it lives and how it reaches the page

1. **The data** is JSON in `src/data/`: `menu.json`, `copy.json` (every page's words, keyed by page), `settings.json` (phone, email, address, hours, Uber Eats and Instagram links), `images.json` (which photo goes in which slot), `story-chapters.json`, `ingredients.json`, `marquee.json`.
2. **`src/content.config.ts`** loads those files as content collections and validates them. Lists are wrapped in an object in the JSON (`{ "categories": [...] }`, `{ "items": [...] }`) because Decap cannot edit a top-level array; each loader unwraps them. A schema failure breaks the build, which is the point: bad content never ships.
3. **Pages read collections** with `getEntry('copy', 'menu')`, `getCollection('menu')` and so on. `settings.json` and `images.json` are imported directly (`src/config/site.ts`, `src/lib/images.ts`).
4. **The CMS** (`public/admin/config.yml`) maps one Decap collection onto each JSON file, field by field. If you add a key to a JSON file, add the matching field to `config.yml`, or editors can't see it. As of this README, every key in every data file has a CMS field.
5. **Saving in the CMS** commits the JSON file to `main`, which deploys. On the first save of a file, Decap re-serializes the whole file (one-line objects get expanded), so that first commit shows a large but harmless diff.

Not everything is content. Some copy is still hardcoded in templates and config: form labels and buttons, the form success/error messages (`siteConfig.forms`), nav and footer labels, about a dozen section headings, and page `<title>`s. `docs/EDITING.md` lists them under "Things that still need a developer". Moving any of them into `copy.json` and `config.yml` is straightforward.

### The Google Sheet menu sync (built, not switched on)

`scripts/sync-menu.mjs` plus `.github/workflows/sync-menu.yml` can rebuild `menu.json` daily from a published Google Sheet CSV. It does nothing until the repo variable `SHEET_CSV_URL` is set. Setup is in `scripts/README.md`. Before you switch it on, know that:

* The sheet then **owns the menu**: CMS edits to menu items get overwritten by the next sync.
* The sheet has **no column for photo descriptions**, so every menu item's `alt` text is dropped on sync (images fall back to the item name as alt). `addOns` survives (the script spreads the existing file).

## Images

* Source photos live in `src/assets/img/`. Astro (`astro:assets`, via `src/components/Img.astro`) emits AVIF and WebP at up to four widths (400/800/1200/1600, never wider than the source), with width/height baked in so nothing shifts on load. The hero is eager with high fetch priority; everything else is lazy.
* `src/lib/images.ts` has **one eager `import.meta.glob`** over `../assets/img/*.{jpg,jpeg,png,webp}`. Data files store a filename (or a CMS path like `/src/assets/img/x.jpg`); `resolveImage()` strips it to the filename and looks it up. A missing file returns `undefined` and the slot renders no image. There are no placeholder fallbacks, on purpose.
* **The glob is non-recursive on purpose.** `*` does not match subfolders, so anything in `src/assets/img/unplaced/` is never bundled. `unplaced/` holds photos from the September 2026 shoots that are not used yet (17 files, about 9 MB). They are kept in the repo so they're on hand, without each one costing a dozen generated variants in every build. CMS uploads land in `src/assets/img/` directly (Decap `media_folder`), so they're always picked up. To use an unplaced photo, move it up one folder and reference its filename in the data.
* `Img.astro` reads dimensions from the metadata `clone` deliberately. Touching `src.width` makes Astro copy the full-size original into `dist/`.
* `dist/` is about 24 MB: about 17 MB of generated image variants and 5 MB of the vendored Decap bundle.
* Photo credits and which shoot each file came from: `src/assets/img/CREDITS.md`.

## Forms (Netlify Forms)

Three forms: `newsletter` (home page and footer; one component, `NewsletterForm.astro`), `careers`, `catering`.

* **Markup:** each `<form>` has `name`, `method="POST"`, `data-netlify="true"`, `data-netlify-honeypot="bot-field"`, a hidden `<input name="form-name">`, and a visually hidden `bot-field` honeypot.
* **Detection:** Netlify registers forms by scanning the built HTML at deploy time. This only happens when **Form detection** is enabled in the Netlify dashboard (Site configuration, Forms). It is on now; the flag can't be changed through the API.
* **Submit:** `src/scripts/forms.ts` intercepts submit, POSTs the url-encoded fields to `/` with `fetch`, then shows an inline message plus a toast, or an inline error and restores the button. Without JS the form falls back to a native POST and Netlify's generic "Thank you!" page.
* **The deploy-time rewrite (important).** When Netlify registers the forms it **rewrites each `<form>` opening tag** in the deployed HTML. It strips `data-netlify` and `data-netlify-honeypot`, sorts the attributes, single-quotes them, and escapes apostrophes as `\'`. That escape is not valid HTML, so any attribute value containing an apostrophe gets shredded into junk attributes. Everything inside the form is left byte-for-byte alone. So:
  * Client JS must **not** select on `form[data-netlify]`. `forms.ts` finds forms through their hidden `input[name="form-name"]`.
  * **Never put copy in `<form>` attributes.** Success and error text sits in hidden `<span hidden data-form-msg="success|error">` elements inside each form.
  * You **cannot see this locally**. `dist/` is the pre-rewrite HTML. Test against the deployed site, or a local copy with the rewrite applied.
* **Spam:** honeypot only (registered server-side; `honeypot: true` on all three forms). No reCAPTCHA.
* **Notifications: none are configured.** Submissions sit in the Netlify dashboard (Forms tab) until someone looks. Add an email notification per form there.
* **Test submissions:** seven test entries exist from launch checks: three named "TEST - ignore" (the newsletter one has an email only) and four named "TEST 2 - ignore". Delete them in the dashboard.

## The CMS

* `/admin/` is the real editor. **The login is not working yet:** `public/admin/config.yml` has `identity_url: .../sites/PLACEHOLDER_DECAPBRIDGE_SITE_ID`. Create the site in DecapBridge, then replace the whole `backend:` block with the one DecapBridge generates (the comment above the block says so). The `repo:` value there still reads `issamlife21-hue/LoumaBakery`, the GitHub account's old name; GitHub redirects it, but use `iaboudarwich/LoumaBakery` when you replace the block.
* `/admin-demo/` is the same editor on Decap's in-memory `test-repo` backend, with a "nothing is saved" banner. Its `config.yml` is generated from `/admin/config.yml` by `scripts/gen-admin-demo.mjs` on `prebuild` (gitignored), so the two can't drift. **It opens with empty forms:** `test-repo` is never seeded with the real JSON, so it teaches the layout, not the content. Seeding `window.repoFiles` from the data files at build time would fix it.
* Collections: Menu, Images, Site settings, Page text, Story chapters, Ingredients, Marquee words. Each is a single file with `delete: false`, so editors can't remove a whole file.
* `publish_mode: simple`: Publish commits straight to `main`. No drafts, no review.

## Design system, motion, flags

All in `CLAUDE.md` (the authoritative spec), in brief:

* **Flat "editorial slab"**: no shadows, gradients or blur anywhere. A global `*, *::before, *::after { box-shadow/text-shadow/backdrop-filter: none !important }` rule in `global.css` enforces it over any component that still declares one.
* Tokens in `src/styles/tokens.css`: exactly the eight brand colours (red is primary; red text only at 24px+ because red on butter is 3.86:1). Square corners everywhere (all radii 0). One filled CTA per page. 13px type floor (the 12px stamp label is the one exception).
* **`html.sys-slab`**: `BaseLayout` always puts this class on `<html>`; there is no other layout system any more. Where a selector in `global.css` (or a component's `:global(html.sys-slab)`) still carries the prefix, it's there for its **specificity**, which decides real conflicts with page-scoped styles. Removing a prefix can silently change rendering. Check computed styles before and after if you touch one.
* Every effect is behind a flag in `src/config/features.ts`, respects `prefers-reduced-motion`, and is reviewable on `/review` in dev.

## How changes were verified

There are no unit or visual tests in the repo. Recent refactors were checked by hand-rolled harnesses (kept outside the repo), not anything you can re-run from here:

* Sequential full-page screenshots of every route at 320/390/430/1440 before and after, compared pixel by pixel, plus a computed-style dump of every element and its pseudo-elements, with forced `:hover` / `:focus-visible` states. Chromium has to run with GPU rasterization off or anti-aliasing noise causes false diffs.
* A behavior probe for the mobile menu (open, focus trap, Esc, overlay tap, link tap, no-JS fallback) at portrait and landscape phone sizes.

A Playwright visual-regression setup in the repo would be the single most useful thing to add.

## Known rough edges

None of these are hidden. They're listed so you don't rediscover them.

**Mobile menu (`MobilePanel.astro`), all pre-existing:**
1. **The X (close) button can't be tapped.** When the panel is open it covers the toggle, so a tap on the X lands on the panel. The nav's `z-index: 1300` while open doesn't help because the panel is a descendant of the nav. Esc, an overlay tap and a link tap all close it.
2. **Between 769 and 860px wide, tapping outside doesn't close it.** At those widths the nav bar has `will-change: transform`, which makes it the containing block for the panel's `position: fixed` overlay, so the overlay only covers the 56px bar.
3. **On short landscape phones the lower links are unreachable.** The panel doesn't scroll and the page is scroll-locked while it's open. At 568×320, Careers, Visit and Ordering soon are off-screen; at 844×390, Visit and Ordering soon.

**Mobile newsletter bar:** the bar is 75px tall but `body.has-cta-bar` reserves 64px. The link's own `min-height: 44px` and `padding: 10px 24px` in `global.css` lose to the slab `.btn` rule, so they're dead declarations. Making them win would bring the bar to about 64px.

**Content gaps (owner decisions, not bugs):**
* 56 of the 60 menu items have no description line. Food items have no prices ("Ask at the counter for food prices"); drinks do.
* No founder portrait exists. The Story page names Milla Ghandour in text only, and must never use a stand-in photo of someone else.
* The phone number is a placeholder (`+1 (310) 000-0000`). `site.ts` suppresses it everywhere, including the JSON-LD, until a real one is entered.
* The Uber Eats link is a placeholder, so the nav shows a dashed "Ordering soon" chip instead of an Order button.
* The hero is a still photo; `siteConfig.links.heroVideo` is empty.

**Other:**
* `/admin-demo` shows empty forms (see The CMS).
* The CMS login (DecapBridge) isn't set up, so nobody can use `/admin` yet.
* Form submissions notify nobody.
* No Node version pin (`.nvmrc`); Netlify uses its default Node.
* The repo carries about 9 MB of unused photos in `src/assets/img/unplaced/`, by design (see Images).

## Open TODOs in the code

| Where | What |
|---|---|
| `public/admin/config.yml:18` | `PLACEHOLDER_DECAPBRIDGE_SITE_ID`: replace the `backend:` block with DecapBridge's generated one (and the current repo name). |
| `src/config/site.ts:11` | `TODO(owner)`: real phone number and real Uber Eats URL go in `src/data/settings.json` (CMS: Site settings). |
| `src/config/site.ts:35` | `heroVideo` placeholder: empty until hero footage exists. |
| `src/pages/index.astro:50` | Same hero video placeholder, at the point of use. |
| `src/pages/story.astro:12` | `TODO(founder-portrait)`: text-only until a real portrait of Milla is set as `founder` in `src/data/images.json`. |
| `src/lib/images.ts:6` | `TODO(founder-portrait)`: same item, from the image side. |
| `src/lib/images.ts:3` | `TODO(photo-ids)`: `unplaced/seeded-knot-tissue.jpg` and `unplaced/seeded-knot-detail.jpg` look like the za'atar croissant but are not confirmed. |

Outside the code, still waiting on the owner: DecapBridge site and login test, publishing the Google Sheet tab and setting `SHEET_CSV_URL`, real photos for the remaining gaps, a real phone number and Uber Eats link, a domain, form notifications, and transferring the Netlify and GitHub accounts.

## Accounts

* **GitHub:** `iaboudarwich/LoumaBakery` (the account was previously `issamlife21-hue`; old URLs redirect).
* **Netlify:** site **`loumabakeryy`** (id `db42ec37-d865-46fc-9abc-967a5d61f886`). The same Netlify account also has a site called **`loumabakery`** (single "y"): that is the old v1 site from an earlier repo, not this one. Don't deploy to it by mistake.
* **DecapBridge:** not set up yet.
