# Handoff checklist

Everything the bakery's IT person needs to take over the website. Tick each item as it is done. For how the site is built, see the [README](../README.md); for day-to-day editing, see [EDITING.md](EDITING.md).

The owner's brief for this version of the site: [docs/brief/2026-10-website-brief.pdf](brief/2026-10-website-brief.pdf).

## 1. Accounts and ownership

- [ ] **GitHub repository.** The code is at `github.com/iaboudarwich/LoumaBakery` (an individual account). Transfer it to a GitHub account or organization the bakery owns: Repository → Settings → General → Danger Zone → Transfer ownership. After the transfer, in Netlify, check Site configuration → Build & deploy → Repository still points at the moved repository (relink it if not).
- [ ] **Netlify site.** The site is `loumabakeryy` (double "y"). Transfer it to a Netlify team the bakery owns: Site configuration → General → Transfer site. (The same Netlify account also has an older site called `loumabakery`, single "y", from a previous version. It is not this site; don't deploy to it, and delete it when the new domain is live.)
- [ ] **Domain `loumabakery.com`.** Confirm who registered it and where (the registrar), and make sure the bakery controls that account. To point it at Netlify: in Netlify, Domain management → Add a domain → `loumabakery.com`; then at the registrar either switch the nameservers to the ones Netlify shows, or add the DNS records Netlify lists (an A record or ALIAS for the bare domain and a CNAME for `www`). Netlify issues the HTTPS certificate on its own. Then change the site address in `src/config/site.ts` (`siteConfig.url`), `public/robots.txt`, and `site_url` / `display_url` / `logo_url` at the top of `public/admin/config.yml`, and push to `main`.
- [ ] **Email inboxes.** The site shows `contact@loumabakery.com` and `orders@loumabakery.com` (for larger orders). Both inboxes must exist and be read.
- [ ] **Form notifications.** Newsletter signups, catering inquiries and job applications arrive in Netlify (Forms tab) but nobody is emailed yet. In Netlify: Site configuration → Notifications → Emails and webhooks → Form submission notifications → Add notification → Email notification. Add one per form: catering → `orders@loumabakery.com`, careers and newsletter → `contact@loumabakery.com` (or whoever should get them). Form detection is already on.
- [ ] **Editor login (DecapBridge).** The editor at `/admin` logs in through DecapBridge, which is not set up yet, so nobody can log in today.
  1. Create an account at https://decapbridge.com and add a site for the GitHub repository (after the transfer above, use the new repository name).
  2. DecapBridge gives you a `backend:` block. In `public/admin/config.yml`, replace the whole existing `backend:` block with it (the comment above the block marks it). Keep `branch: main`.
  3. Push to `main` and wait for the deploy.
  4. In DecapBridge, open the site → Collaborators → invite the owner and each staff member by email.
  5. Test: log in at `/admin`, change one word, Publish, and check it appears on the site about two minutes later. Then change it back.

## 2. Licensing

- [ ] **The Owners typeface.** Owners is a commercial font by Ohno Type Co (ohnotype.co). The site currently uses the bakery's desktop font files, converted for the web. Desktop licences don't cover websites, so **buy a webfont licence before the public launch**. The site uses four styles: Owners Regular (400), Owners Medium (500), Owners Narrow Medium (500) and Owners Narrow Bold (700). If Ohno supplies new webfont files, replace the four files in `public/fonts/` with the same names.
- [ ] **Photos.** All photos come from the bakery's own shoots and the owner's files (see `src/assets/img/CREDITS.md`). Confirm the photographer's agreement covers web use.

## 3. Waiting on the owner

- [ ] **Catering and Careers pages**: keep them, change them, or remove them?
- [ ] **The newsletter**: keep the signup in the footer? If yes, decide where signups go (Netlify keeps them; export or connect a mailing service).
- [ ] **Uber Eats**: if online ordering goes ahead, send the link. It goes in Site settings → Uber Eats order link, and the developer adds a button for it.
- [ ] **A phone number**: no phone number is shown anywhere today, on purpose. Decide whether to show one.
- [ ] **Square links** for pre-orders and gift cards: paste them into Shop in the editor when ready (see EDITING.md). The hat's buy link goes in the same place.
- [ ] **The hand-drawn map**: the only copy is a small image from the brief. A higher-resolution scan or photo of the original drawing would let the map on the Contact page be traced again more cleanly.
- [ ] **Photo names in the library**: confirm what is in three photos in `src/assets/img/unplaced/`: `swirl-buns-rack.jpg` and `swirl-buns-yellow-paper.jpg` (cardamom buns?), `sugar-bun-plate.jpg`, and `almond-croissants-tray.jpg` (almond croissants?).
- [ ] **Menu descriptions**: only 4 of the 60 menu items have a one-line description. Add more in the editor if wanted.
- [ ] **Catering tier prices** ("from $40", "from $120", "Let's talk") are saved in the editor but hidden, because the site shows no prices except in the shop. Decide whether to show them; showing them again is a small code change.

## 4. Rolling back a bad deploy

If a change breaks the live site:

1. In Netlify, open the site → **Deploys**.
2. Click the last deploy that was fine (each has a date and the change's description).
3. Click **Publish deploy**. That older version goes live within seconds.
4. Note that this pauses auto-publishing: the next push to `main` won't go live until you click **Start auto publishing** on the Deploys page. Fix the problem in the code or the editor first, then turn auto publishing back on.

An editor change can also be undone in the editor by setting the field back and publishing again.

## 5. Useful places

| What | Where |
|---|---|
| The code | GitHub, repository `LoumaBakery` |
| Hosting, deploys, forms, domain | Netlify, site `loumabakeryy` |
| The editor | `/admin` on the live site; practice copy at `/admin-demo` |
| Editor login and collaborators | DecapBridge (once set up) |
| Photo credits | `src/assets/img/CREDITS.md` |
| Brand reference and the designer's master files | `docs/BRAND.md`, `docs/brand/` |
| Menu from a Google Sheet (not switched on) | `scripts/README.md` |
