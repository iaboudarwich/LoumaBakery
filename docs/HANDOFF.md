# Handoff checklist

Everything the bakery's IT person needs to take over the website. Tick each item as it is done. For how the site is built, see the [README](../README.md); for day-to-day editing, see [EDITING.md](EDITING.md).

The owner's brief for this version of the site: [docs/brief/2026-10-website-brief.pdf](brief/2026-10-website-brief.pdf).

## 1. Accounts and ownership

- [ ] **GitHub repository.** The code is at `github.com/iaboudarwich/LoumaBakery` (an individual account). Transfer it to a GitHub account or organization the bakery owns: Repository → Settings → General → Danger Zone → Transfer ownership. After the transfer, in Netlify, check Site configuration → Build & deploy → Repository still points at the moved repository (relink it if not).
- [ ] **Netlify site.** The site is `loumabakeryy` (double "y"). Transfer it to a Netlify team the bakery owns: Site configuration → General → Transfer site. (The same Netlify account also has an older site called `loumabakery`, single "y", from a previous version. It is not this site; don't deploy to it, and delete it when the new domain is live.)
- [ ] **Domain `loumabakery.com`.** Confirm who registered it and where (the registrar), and make sure the bakery controls that account. To point it at Netlify: in Netlify, Domain management → Add a domain → `loumabakery.com`; then at the registrar either switch the nameservers to the ones Netlify shows, or add the DNS records Netlify lists (an A record or ALIAS for the bare domain and a CNAME for `www`). Netlify issues the HTTPS certificate on its own. Then change the site address in `src/config/site.ts` (`siteConfig.url`), `public/robots.txt`, and `site_url` / `display_url` / `logo_url` at the top of `public/admin/config.yml`, and push to `main`.
- [ ] **Email inboxes.** The site shows `contact@loumabakery.com` and `orders@loumabakery.com` (for larger orders). Both inboxes must exist and be read.
- [ ] **Form notifications.** Newsletter signups, catering inquiries and job applications arrive in Netlify (Forms tab) but nobody is emailed yet. All three forms are hidden for now (section 4); set this up when one comes back. In Netlify: Site configuration → Notifications → Emails and webhooks → Form submission notifications → Add notification → Email notification. Add one per form: catering → `orders@loumabakery.com`, careers and newsletter → `contact@loumabakery.com` (or whoever should get them). Form detection is already on.
- [ ] **Editor login (DecapBridge).** The editor at `/admin` logs in through DecapBridge, which is not set up yet, so nobody can log in today.
  1. Create an account at https://decapbridge.com and add a site for the GitHub repository (after the transfer above, use the new repository name).
  2. DecapBridge gives you a `backend:` block. In `public/admin/config.yml`, replace the whole existing `backend:` block with it (the comment above the block marks it). Keep `branch: main`.
  3. Push to `main` and wait for the deploy.
  4. In DecapBridge, open the site → Collaborators → invite the owner and each staff member by email.
  5. Test: log in at `/admin`, change one word, Publish, and check it appears on the site about two minutes later. Then change it back.

## 2. Licensing

- [ ] **The Owners typeface.** Owners is a commercial font by Ohno Type Co (ohnotype.co). The site currently uses the bakery's desktop font files, converted for the web. Desktop licences don't cover websites, so **buy a webfont licence before the public launch**. The site uses three styles: Owners Regular (400), Owners Medium (500) and Owners Narrow Bold (700). If Ohno supplies new webfont files, replace the three files in `public/fonts/` with the same names.
- [ ] **Photos.** All photos come from the bakery's own shoots and the owner's files (see `src/assets/img/CREDITS.md`). Confirm the photographer's agreement covers web use.

## 3. Waiting on the owner

- [ ] **The menu stays in the editor.** Since October 2026 the menu is edited in the CMS (Menu → Menu items). The old Google Sheet sync (`scripts/sync-menu.mjs`, GitHub workflow "Sync menu from Google Sheet") reads the out-of-date costing sheet, so the script now refuses to run unless it is given `--force`, and the workflow only runs if the `SHEET_CSV_URL` variable is set (it is not). Do not set that variable or use `--force` unless the sheet is first brought up to date and the script is changed to write the new menu shape (item `note`, category `notes`); otherwise it would replace the owner's menu.

- [ ] **Uber Eats**: if online ordering goes ahead, send the link. It goes in Site settings → Uber Eats order link, and the developer adds a button for it.
- [ ] **A phone number**: no phone number is shown anywhere today, on purpose. Decide whether to show one.
- [ ] **Shop prices and Square links.** The Shop shows the Louma Hat ($32), Maple Pecan Tarte, Burnt Basque Cheesecake, Berry Tart and a Gift Card, all "Coming soon". Waiting on the owner:
  - [ ] Prices for the pre-order items: the Maple Pecan Tarte, the Burnt Basque Cheesecake and the Berry Tart (she confirmed prices go on pre-order items only, never on the menu; hidden until set).
  - [ ] A Square link for each product (hat, Maple Pecan Tarte, Burnt Basque Cheesecake, Berry Tart) and for the gift card (she confirmed the gift card will be a Square link). Paste each into Shop → Products → that product → **Link** (see EDITING.md, "Shop products"). With a link, the product becomes a link and "Coming soon" goes.
  - [ ] Confirm the "48 hours notice" line stays. (The product list is hers, 16 Oct 2026: Maple Pecan Tarte, Burnt Basque Cheesecake, Berry Tart, plus the hat and the gift card.)
- [ ] **Two shop photos (owner round 4, due the week of 19 Oct 2026).** The Maple Pecan Tarte and the Burnt Basque Cheesecake show placeholders (a stack of small pecan tarts, a cheesecake slice). Milla is sending the whole pecan tart and the whole cheesecake. Replace `src/assets/img/shop-pecan-tart.jpg` and `src/assets/img/shop-basque-cheesecake.jpg` with square crops of the new photos (same names, about 900 to 1200 pixels, metadata stripped), update both **Photo description**s in Shop → Products, and note the new sources in `src/assets/img/CREDITS.md`. The owner can also do it in the editor (EDITING.md, "Shop products").
- [ ] **Design pass on Our Story and the colours.** Milla's designer will review the Our Story page and the site's overall colours. That comes as its own round; nothing is changed until then. Every colour is a token in `src/styles/tokens.css` (the eight brand colours, everything else mixed from them), so a palette change happens there.
- [ ] **The hand-drawn map**: the only copy is a small image from the brief. A higher-resolution scan or photo of the original drawing would let the map on the Contact page be traced again more cleanly.
- [ ] **Photo names in the library**: confirm what is in three photos in `src/assets/img/unplaced/`: `swirl-buns-rack.jpg` and `swirl-buns-yellow-paper.jpg` (cardamom buns?), `sugar-bun-plate.jpg`, and `almond-croissants-tray.jpg` (almond croissants?).

## 4. Hidden for now

The owner switched these off in owner feedback round 1 (October 2026). Nothing is deleted: page files, forms, form scripts, data and editor fields all stay. Each has a one-line switch in `src/config/features.ts`.

| Part | Switch | While `false` |
|---|---|---|
| Catering page (`/catering`) and its inquiry form | `cateringPage` | Not built; 301 to `/` (`netlify.toml` and `astro.config.mjs`); not in the sitemap; no footer link |
| Careers page (`/careers`) and its application form | `careersPage` | Same as Catering |
| Footer newsletter signup ("Hear from the bakery") | `newsletter` | The row and its form render on no page |

**To turn one back on:**

1. In `src/config/features.ts`, set the switch to `true`. `astro.config.mjs` (redirects, sitemap) and the footer read the same flags, so they follow by themselves.
2. For Catering or Careers, also delete that page's `[[redirects]]` block under "Hidden for now" at the bottom of `netlify.toml`. Netlify reads that file, not the flags, and would keep sending visitors home.
3. Run `npx astro check` and `npm run build`, then push to `main`.
4. In Netlify, check the form shows under Forms after the deploy (form detection only sees forms that are on a built page), and add its email notification (section 1).
5. Remove "(hidden on site for now)" from the matching labels in `public/admin/config.yml`.

Questions for the owner while they are hidden:

- [ ] **Catering and Careers pages**: bring them back as they are, change them, or remove them for good?
- [ ] **The newsletter**: bring the signup back? If yes, decide where signups go (Netlify keeps them; export or connect a mailing service).
- [ ] **Catering tier prices** ("from $40", "from $120", "Let's talk") are saved in the editor but not shown, because the site shows no prices except in the shop. If the Catering page comes back, decide whether to show them; that is a small code change.

## 5. Rolling back a bad deploy

If a change breaks the live site:

1. In Netlify, open the site → **Deploys**.
2. Click the last deploy that was fine (each has a date and the change's description).
3. Click **Publish deploy**. That older version goes live within seconds.
4. Note that this pauses auto-publishing: the next push to `main` won't go live until you click **Start auto publishing** on the Deploys page. Fix the problem in the code or the editor first, then turn auto publishing back on.

An editor change can also be undone in the editor by setting the field back and publishing again.

## 6. Useful places

| What | Where |
|---|---|
| The code | GitHub, repository `LoumaBakery` |
| Hosting, deploys, forms, domain | Netlify, site `loumabakeryy` |
| The editor | `/admin` on the live site; practice copy at `/admin-demo` |
| Editor login and collaborators | DecapBridge (once set up) |
| Photo credits | `src/assets/img/CREDITS.md` |
| Brand reference and the designer's master files | `docs/BRAND.md`, `docs/brand/` |
| The home hero's pen-drawn baguette: its stroke file, how it was made, and its on/off switch | `src/assets/brand/README.md`, `src/components/PenDraw.astro`, `penDraw` in `src/config/features.ts` |
| Menu from a Google Sheet (switched off and guarded: the script refuses to run without `--force`) | `scripts/README.md` |
