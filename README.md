# Louma Bakery website

The website of Louma Bakery, a sister-run neighborhood bakery at 3223 Wilshire Blvd in Santa Monica. It has eight public pages and a 404 page. The owner and staff edit the words, photos, menu, hours and shop links themselves through a web editor (the CMS); a developer is only needed for layout or code changes.

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
| **`motion`** | The small animation library behind the drawing reveals and section fade-ins (`src/scripts/motion.ts`). |
| **Owners** (Ohno Type Co) | The only typeface, four files in `public/fonts/`. A webfont licence is still needed; see the handoff checklist. |

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

The top menu shows Our Story, The Louma Initiative, Menu and Shop; the logo goes home. Catering, Careers and Contact are linked from the footer.

| Address | File | What feeds it |
|---|---|---|
| `/` | `src/pages/index.astro` | `copy.json` → home, `images.json` (hero and gallery), `instagram.json`, `settings.json` (address, hours) |
| `/story` | `src/pages/story.astro` | `copy.json` → story (title), `story.json` (the letter and five sections), `images.json` → story |
| `/initiative` | `src/pages/initiative.astro` | `copy.json` → initiative (text and the four pillars) |
| `/menu` | `src/pages/menu.astro` | `copy.json` → menu, `menu.json` |
| `/shop` | `src/pages/shop.astro` | `copy.json` → shop, `shop.json` |
| `/visit` (shown as "Contact") | `src/pages/visit.astro` | `copy.json` → visit (title), `settings.json`, `images.json` → storefront, the hand-drawn map |
| `/catering` | `src/pages/catering.astro` | `copy.json` → catering, plus the catering form |
| `/careers` | `src/pages/careers.astro` | `copy.json` → careers, plus the job application form |
| any unknown address | `src/pages/404.astro` | `copy.json` → notFound |
| `/mission` | (none) | Redirects permanently to `/initiative` (in `netlify.toml`, and in `astro.config.mjs` for local runs). |
| `/admin` | `public/admin/` | The editor. Not indexed by search engines. |
| `/admin-demo` | `public/admin-demo/` | A practice copy of the editor that saves nothing. Its settings are generated from `/admin/config.yml` on every build. |

## The data

Everything editable lives in `src/data/`, one CMS collection per file:

| File | What it controls | In the editor |
|---|---|---|
| `copy.json` | The words on every page, grouped by page (home, story, initiative, menu, shop, visit, catering, careers, notFound), including each Initiative pillar's drawing | Page text |
| `story.json` | The founder's letter (paragraphs and signature) and the Our Story sections | Our Story |
| `menu.json` | Menu categories (name, order, drawing), items (name, description, dietary tags) and the add-ons list. No prices. | Menu |
| `shop.json` | The pre-order and gift card links, and the products (name, price, description, size, photo, buy link). An empty link shows "Coming soon". | Shop |
| `images.json` | Which photo goes in which slot (home hero, home gallery, Our Story photos, Contact storefront), each with its description | Photos |
| `instagram.json` | The six photos in the home page Instagram strip | Instagram strip |
| `settings.json` | The two email addresses, address, opening hours, Instagram link and handle, and an Uber Eats link that is saved but not shown | Site settings |

The editor's setup, field by field, is `public/admin/config.yml`. If you add a field to a JSON file, add it to `config.yml` and to the schema in `src/content.config.ts` too, or editors won't see it (and the page-text schema is strict, so an unknown field fails the build).

The menu can also be filled from a Google Sheet once one is published: `scripts/sync-menu.mjs` and the GitHub Action in `.github/workflows/sync-menu.yml`. It is off until the repository variable `SHEET_CSV_URL` is set; see `scripts/README.md`. When it is on, the sheet owns the menu items; the category drawings and photo descriptions are kept, and prices are never written.

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

The newsletter (in the footer of every page), the catering inquiry and the job application are Netlify Forms. Each form has a hidden `form-name` field and a hidden spam trap; `src/scripts/forms.ts` sends them without leaving the page and shows the thank-you message. Submissions appear in Netlify under Forms. Email alerts are not set up yet; see the handoff checklist.

## Brand rules, in short

Full reference: [`docs/BRAND.md`](docs/BRAND.md). The detailed rules for code are in `CLAUDE.md`.

- **Eight colours only**: Louma Red `#ED2739` (the main colour), Burgundy `#A10017`, Peach `#FF676C`, Tangerine `#FF8926`, Fairy `#DDEAC3`, Butter `#FBF5D4` (the page background), White and Ink `#1D1D1B`. Red text only at 24px and up; smaller text is ink or burgundy.
- **One typeface**, Owners, in four styles.
- **Square corners** everywhere. No shadows, gradients or blur.
- **Photos straight** and shown as taken: no filters, no text over them, no animation.
- **Only the designer's drawings** (plus the owner's traced signature and map).
- **The owner's words appear exactly as written.** Don't rewrite them.
- No prices on the site except the products in the shop.
