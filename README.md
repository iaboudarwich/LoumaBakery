# Louma Bakery website

The website of Louma Bakery, a sister-run neighborhood bakery at 3223 Wilshire Blvd in Santa Monica. It has six public pages, two more that are hidden for now (Catering and Careers), and a 404 page. The owner and staff edit the words, photos, menu, hours and shop links themselves through a web editor (the CMS); a developer is only needed for layout or code changes.

- Live site: https://loumabakeryy.netlify.app (note the double "y"; the real domain is not connected yet).
- Handoff checklist (accounts, licences, open items): [`docs/HANDOFF.md`](docs/HANDOFF.md)
- Guide for the people who edit the site: [`docs/EDITING.md`](docs/EDITING.md)
- Brand reference: [`docs/BRAND.md`](docs/BRAND.md)
- The owner's brief for this version of the site: [`docs/brief/2026-10-website-brief.pdf`](docs/brief/2026-10-website-brief.pdf)
- Rules for anyone (or any AI assistant) changing the code: [`CLAUDE.md`](CLAUDE.md)

## The stack

| Piece | What it does |
|---|---|
| **Astro 6**, static output | Builds every page to plain HTML at build time. No server, no database. |
| **TypeScript** (strict) | `npx astro check` is the type check; keep it at 0 errors. |
| **JSON files in `src/data/`** | Every word, photo choice, menu item and setting. Checked against schemas in `src/content.config.ts` on every build, so bad data fails the build instead of reaching the site. |
| **Decap CMS** in `public/admin/` | The web editor. Saving in it commits the changed JSON file to GitHub, which triggers a deploy. Login goes through **DecapBridge** (email and password, no GitHub account needed). |
| **Netlify** | Hosting, automatic deploys, and Netlify Forms for the three forms (newsletter, catering, careers). |
| **`motion`** | The small animation library behind the drawing reveals and section fade-ins (`src/scripts/motion.ts`). The home hero's pen baguette loop is plain CSS (`src/components/PenDraw.astro`). |
| **Owners** (Ohno Type Co) | The only typeface, three files in `public/fonts/` (Owners Regular, Owners Medium, Owners Narrow Bold). A webfont licence is still needed; see the handoff checklist. |

## Run it locally

You need Node.js 22.12 or newer.

```bash
npm install
npm run dev        # http://localhost:4321 (also serves /review, an internal page of the animations)
npm run build      # builds the site into dist/
npm run preview    # serves dist/ locally
npx astro check    # type check: should report 0 errors
```

## Pages

The top menu shows Home, Our Story, The Louma Initiative, Menu and Shop; the logo also goes home. The footer lists the same pages plus Contact (and Catering and Careers when they are switched on).

**Hidden for now.** `src/config/features.ts` has three one-line switches, all `false` today: `cateringPage`, `careersPage` and `newsletter`. A hidden page is not built, 301-redirects to `/` (`netlify.toml` and `astro.config.mjs`), is left out of the sitemap and loses its footer link; with `newsletter` off the footer signup renders nowhere. The files, forms, data and editor fields all stay. How to switch one back on: `docs/HANDOFF.md`, section 4.

| Address | File | What feeds it |
|---|---|---|
| `/` | `src/pages/index.astro` | `copy.json` → home, `images.json` (hero and the four gallery photos), `instagram.json`, `settings.json` (address, hours). Opens with a split hero: tagline left, photo right (photo first on phones). |
| `/story` | `src/pages/story.astro` | `copy.json` → story (title), `story.json` (the letter and five sections), `images.json` → story |
| `/initiative` | `src/pages/initiative.astro` | `copy.json` → initiative (title, intro and sections) |
| `/menu` | `src/pages/menu.astro` | `copy.json` → menu, `menu.json` |
| `/shop` | `src/pages/shop.astro` | `copy.json` → shop, `shop.json` (Louma Hat, Berry Tart, Pecan Tart, Basque Cheesecake, Gift Card) |
| `/visit` (shown as "Contact") | `src/pages/visit.astro` | `copy.json` → visit (title), `settings.json` (address, hours, emails, Instagram, TikTok), the hand-drawn map |
| `/catering` (hidden for now) | `src/pages/catering.astro` | `copy.json` → catering, plus the catering form. Redirects to `/` while `cateringPage` is off. |
| `/careers` (hidden for now) | `src/pages/careers.astro` | `copy.json` → careers, plus the job application form. Redirects to `/` while `careersPage` is off. |
| any unknown address | `src/pages/404.astro` | `copy.json` → notFound |
| `/mission` | (none) | Redirects permanently to `/initiative` (in `netlify.toml`, and in `astro.config.mjs` for local runs). |
| `/admin` | `public/admin/` | The editor. Not indexed by search engines. |
| `/admin-demo` | `public/admin-demo/` | A practice copy of the editor that saves nothing. Its settings are generated from `/admin/config.yml` on every build. |

## The data

Everything editable lives in `src/data/`, one CMS collection per file:

| File | What it controls | In the editor |
|---|---|---|
| `copy.json` | The words on every page, grouped by page (home, story, initiative, menu, shop, visit, catering, careers, notFound) | Page text |
| `story.json` | The founder's letter (paragraphs and signature) and the Our Story sections | Our Story |
| `menu.json` | The owner's menu: categories (name, order, column: food or drinks, items with a name and an optional note, optional category notes). On computers the Menu page shows food and drinks in two columns; on phones one list. Add-ons is a category like the others. No prices, photos or drawings. | Menu |
| `shop.json` | The line under the Shop title, and the products in the order shown (name, price, note, photo, photo description, link, photo fit, product or gift card). An empty price is hidden; an empty link shows "Coming soon". | Shop |
| `images.json` | Which photo goes in which slot (home hero, the four home gallery photos, the two Our Story photos), each with its description | Photos |
| `instagram.json` | The six photos in the home page Instagram strip (one row of six on computers, three across on tablets, two on phones) | Instagram strip |
| `settings.json` | The two email addresses, address, opening hours, Instagram and TikTok links and handles, and an Uber Eats link that is saved but not shown | Site settings |

The editor's setup, field by field, is `public/admin/config.yml`. If you add a field to a JSON file, add it to `config.yml` and to the schema in `src/content.config.ts` too, or editors won't see it (and the page-text schema is strict, so an unknown field fails the build).

The menu is edited in the CMS. The old Google Sheet sync (`scripts/sync-menu.mjs`, `.github/workflows/sync-menu.yml`) is switched off and guarded: the script refuses to run without `--force`, because the sheet is out of date and would overwrite the owner's menu; see `scripts/README.md`. `node scripts/check-menu.mjs` compares `menu.json` with the owner's fall 2026 list.

## Photos

- **`src/assets/img/`** holds the photos the site uses. The build turns each into AVIF and WebP at several sizes, so the source files can be large.
- **`src/assets/img/unplaced/`** is a library of extra photos from the shoots. Nothing in it is published; move a file up one folder and pick it in the editor to use it.
- **Size rule for new photos**: JPEG, longest side at most 2400px (the home hero up to 3000px), under 1.5 MB, colour converted to sRGB, and location and camera data removed. Straight, never tilted. The editor's hints say the orientation and minimum size for each slot.
- **Alt text rule**: every photo has a description, one plain sentence about what is actually in it ("Pain au chocolat cooling on a wire rack on a wooden counter"). It is read aloud to people who can't see the photo.
- Credits and the source of every file: `src/assets/img/CREDITS.md`.
- The drawings are in `src/assets/brand/`. They are the designer's master files; change them only from `docs/brand/`.

## Deploying

- The GitHub repository is linked to the Netlify site **loumabakeryy**. **Every push to the `main` branch builds and publishes the live site automatically**, usually within two minutes. Editor saves are pushes to `main` too.
- Other branches do not publish anything unless branch deploys are switched on in Netlify (Site configuration → Build & deploy → Branches and deploy contexts).
- Netlify runs `npm run build` and publishes `dist/`. `netlify.toml` also sets the security headers, caching for `/_astro/` files, and the `/mission` redirect.
- To undo a bad deploy, see "Rolling back" in `docs/HANDOFF.md`.
- The site's address is set in one place, `siteConfig.url` in `src/config/site.ts`. When the real domain is connected, change it there and in `public/robots.txt` and the top of `public/admin/config.yml`.

## Forms

The newsletter (in the footer of every page), the catering inquiry and the job application are Netlify Forms. All three are hidden for now (see "Pages"), so no form is on the live site until one is switched back on. Each form has a hidden `form-name` field and a hidden spam trap; `src/scripts/forms.ts` sends them without leaving the page and shows the thank-you message. Submissions appear in Netlify under Forms. Email alerts are not set up yet; see the handoff checklist.

## Brand rules, in short

Full reference: [`docs/BRAND.md`](docs/BRAND.md). The detailed rules for code are in `CLAUDE.md`.

- **Eight colours only**: Louma Red `#ED2739` (the main colour), Burgundy `#A10017`, Peach `#FF676C`, Tangerine `#FF8926`, Fairy `#DDEAC3`, Butter `#FBF5D4` (the page background), White and Ink `#1D1D1B`. Red text only at 24px and up, or bold at 19px and up (the header links); smaller text is ink or burgundy.
- **One typeface**, Owners: Owners 500 for titles and headings, Owners 400 for body, and Owners Narrow Bold only in the header nav.
- **The footer is burgundy** with every word in butter, in the site's normal type (butter on burgundy is 7.56:1), kept compact. The bottom row is the copyright line alone.
- **Square corners** everywhere. No shadows, gradients or blur.
- **Photos straight** and shown as taken: no filters, no text over them, no animation.
- **Only the designer's drawings** (plus the owner's traced signature and map). One derived file: `src/assets/brand/baguette-stroke.svg`, the baguette as a single pen line, which draws, erases and repeats in the home hero (`PenDraw.astro`, switch `penDraw` in `features.ts`). It is the only stroke drawing; how it was made is in `src/assets/brand/README.md`.
- **The owner's words appear exactly as written.** Don't rewrite them.
- No prices on the site except the products in the shop.
