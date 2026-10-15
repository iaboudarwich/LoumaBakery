# Editing the Louma Bakery website

This guide is for the owner and the staff who keep the website up to date. You don't need to know any code.

## The basics

The editor is at **https://loumabakeryy.netlify.app/admin/** (this will move to the real web address once the domain is connected).

1. Open the editor and log in with your email and password.
2. In the list on the left, pick the part of the site you want to change (the sections below say which).
3. Make your change.
4. Click **Publish**.
5. Wait about two minutes, then refresh the website. Your change is live.

Every change is saved with its full history, so nothing is ever lost for good. If something goes wrong, the person who looks after the website can put the old version back.

**Your words appear exactly as you type them.** The website never rewrites, shortens or corrects them. Read your text once more before you click Publish.

**Want to practise first?** There is a practice editor at **https://loumabakeryy.netlify.app/admin-demo/**. Click **Login**; no password is needed. It has the same boxes as the real editor, but they start empty and nothing you do there is saved.

## Page by page

### Home page

| To change | Go to |
|---|---|
| The big line beside the top photo ("A sister-run neighborhood bakery in Santa Monica") | Page text → All pages → Home page → **Tagline** |
| The small address and hours line under it | Site settings (see "Hours, address and emails"). It updates by itself. |
| The two introduction paragraphs | Page text → All pages → Home page → **Paragraphs** |
| The heading above the Instagram photos | Page text → All pages → Home page → **Instagram heading** |
| The photo at the top, beside the tagline | Photos → Site photos → **Home: top photo** (see "Swapping a photo") |
| The four photos further down the page | Photos → Site photos → **Home: photo gallery** |
| The Instagram photos | Instagram strip (see "The Instagram strip") |
| The address and hours in the dark red band | Site settings (see "Hours, address and emails") |

### Our Story

| To change | Go to |
|---|---|
| The page title | Page text → All pages → Our Story page → **Headline** |
| The letter | Our Story → **The letter** → **Paragraphs**. Each box is one paragraph. **Signed** is the name read out to screen readers for the handwritten signature. |
| The five sections (title and paragraphs) | Our Story → **Sections**. Open a section to change its title or paragraphs; drag the two short lines at the top of a section to reorder it. |
| The two photos | Photos → Site photos → **Our Story: photos**. The first shows after the first section, the second after the fourth. |

### The Louma Initiative

| To change | Go to |
|---|---|
| The title and the opening paragraphs | Page text → All pages → The Louma Initiative page → **Headline** and **Introduction** |
| "Opening doors" and "Built to last" | Page text → All pages → The Louma Initiative page → **Sections** |
| The four pillars and their drawings | Page text → All pages → The Louma Initiative page → **The four pillars**. Each pillar has a **Pillar** name and a **Drawing** picked from the list of brand drawings. |

This page has no photos, by the owner's choice. Never add numbers about team members' disabilities to this page. This is a firm rule for the bakery.

### Menu

| To change | Go to |
|---|---|
| The title, the four introduction paragraphs and the allergen note | Page text → All pages → Menu page |
| Menu items, categories and add-ons | Menu → Menu items (see "Editing the menu") |

### Shop

| To change | Go to |
|---|---|
| The title and the "Coming soon" words | Page text → All pages → Shop page → **Headline** and **"Not open yet" text** |
| The Pre-orders and Gift cards headings and text | Page text → All pages → Shop page → **Pre-orders** and **Gift cards** |
| The Merch heading | Page text → All pages → Shop page → **Merch** |
| The buttons' links and the products | Shop (see "Shop links and products") |

### Contact

| To change | Go to |
|---|---|
| The title ("Come say hi") | Page text → All pages → Contact page → **Headline** |
| Address, hours, emails, Instagram, TikTok | Site settings (see "Hours, address and emails") |

The hand-drawn map and the "Get directions" link update themselves from the address. A new map drawing needs the person who looks after the website.

### Catering and Careers (hidden on site for now)

These two pages are switched off for now (see "Hidden for now" below). Their words stay in the editor, marked "(hidden on site for now)", and can be edited ahead of time; nothing shows until the pages are switched back on.

| To change | Go to |
|---|---|
| The small label, title, intro line and paragraphs | Page text → All pages → Catering page (or Careers page) |
| The three catering steps | Page text → All pages → Catering page → **Process steps** |
| The catering options | Page text → All pages → Catering page → **Options / tiers** (name, bullet points, small badge) |
| The open jobs | Page text → All pages → Careers page → **Open roles**. The job list in the application form updates by itself. |

### The "page not found" page

Page text → All pages → "Page not found" page: the label, headline, line and button.

## Editing the menu

Go to **Menu → Menu items**. The menu is a list of categories, and each category has a list of items.

- **Change an item**: open the category, open the item, change its **Name** or **Description**. Descriptions work best as one short line.
- **Dietary tags**: open the item and pick from **Dietary tags** (vegan, vegetarian, gf, nut-free). They show after the item's name as small labels (VG, V, GF, NF).
- **Add an item**: open the category and click **Add item** at the top of its Items list.
- **Remove an item**: click the **X** on that item.
- **Reorder items**: drag an item by the two short lines at its top.
- **A category's drawing**: open the category and pick a **Drawing**. It shows beside the category heading.
- **Category order**: change **Show order** (1 shows first, then 2, 3 and so on).
- **Add-ons** (extra shot, oat milk and so on): **Add-ons** at the bottom. **Show after category** is the Internal ID of the category the list follows (for example `fridge`).
- Leave **Internal ID** as it is; the website uses it behind the scenes.
- Items keep a **Photo** and **Photo description**, but the Menu page doesn't show photos at the moment.

**The menu and the Google Sheet.** The menu can be set up to update itself every morning from a Google Sheet. This is not switched on. If it is switched on later, the sheet becomes the source of the menu items, and item changes made in the editor are replaced by the sheet the next morning (category drawings and photo descriptions are kept).

## Shop links and products

Go to **Shop**.

**When Square (or another shop) is ready:**

1. Copy the page address of your pre-order page from Square.
2. Paste it into **Pre-order link**.
3. Do the same for gift cards in **Gift card link**.
4. Click **Publish**.

While a link box is empty, its button says "Coming soon" and can't be clicked. Once a link is there, the button opens your shop page in a new tab.

**Adding a product:**

1. Under **Merch**, click **Add product**.
2. Fill in **Name**, **Price** (for example `$32`), **Description** and **Size**.
3. Add a **Photo**: a cutout of the product on a transparent background (a PNG) works best, at least 800 pixels wide. The whole product is always shown, never cropped.
4. Write a **Photo description**, one plain sentence about what the photo shows.
5. Paste the product's **Buy link** when it can be bought online. Without one, its button says "Coming soon".

## Swapping a photo

Go to **Photos → Site photos**, click the photo you want to replace, and upload the new one. Then update its **description**.

| Slot | Shape | Minimum size |
|---|---|---|
| Home: top photo | Any shape: it is cropped to a tall frame (4:5 on phones), so keep the subject near the middle | 2400 pixels on the long side |
| Home: photo gallery, 1st, 3rd and 4th | Portrait (taller than wide) | 1600 pixels on the long side |
| Home: photo gallery, 2nd | Landscape (wider than tall) | 1600 pixels on the long side |
| Our Story: photos | Portrait | 1200 pixels wide |
| Instagram strip | Square works best | 600 pixels wide |

- Keep each photo under 3 MB. The website makes the small, fast versions itself.
- Use photos that are straight and not tilted. The website shows them exactly as taken, cropped to fit the slot's shape.
- **Every photo needs a description**: one plain sentence about what is actually in the photo, like "Pain au chocolat cooling on a wire rack on a wooden counter". People who can't see the photo hear this sentence.

## The Instagram strip

Go to **Instagram strip**. There are up to six photos. Click a photo to replace it, and update its **Photo description**. Every tile links to the bakery's Instagram page. A tile without a photo is skipped.

## Hours, address and emails

Go to **Site settings → Settings**.

- **Opening hours**: one row for each group of days, for example "Tuesday – Sunday", "7:30 AM", "2:30 PM". For a closed day, type `Closed` in **Opens** and leave **Closes** empty. Hours show on the home page (in short form under the tagline, for example "Tue–Sun 7:30–2:30", and in the dark red band), the Contact page, the footer and in search results. Write the days as full day names so the short form comes out right.
- **Address**: street, city, state and ZIP. The map link updates by itself.
- **Email address**: the main contact email.
- **Email for larger orders**: shown with "for larger orders".
- **Instagram link** and **Instagram handle** (for example `@loumabakery`).
- **TikTok link** and **TikTok handle**: the link is in the footer, the handle on the Contact page. Empty the link to hide TikTok everywhere.
- **Uber Eats order link**: saved for later; it isn't shown anywhere yet.

## Hidden for now

Three parts of the site are switched off by the owner's choice. Nothing was deleted: the pages, the forms and their words in the editor all stay, and each comes back with a one-line change by the person who looks after the website.

| Part | While hidden | Switch |
|---|---|---|
| The Catering page and its inquiry form | `/catering` goes to the home page; no footer link; not in search engines | `cateringPage` |
| The Careers page and its job application form | `/careers` goes to the home page; no footer link; not in search engines | `careersPage` |
| The newsletter signup in the footer ("Hear from the bakery") | Not shown on any page | `newsletter` |

The newsletter's heading and line stay editable under Page text → All pages → Home page → **Newsletter title** and **Newsletter line** (both marked "hidden on site for now").

**To turn one back on** (the person who looks after the website): in `src/config/features.ts`, change the switch from `false` to `true`. For Catering or Careers, also delete that page's `[[redirects]]` block under "Hidden for now" at the bottom of `netlify.toml`. Push to `main`; the page, its footer link, its form and its sitemap entry come back with the next deploy. Then set up the form's email alert (see `docs/HANDOFF.md`).

## Things that need the person who looks after the website

These can't be changed in the editor:

- The page names in the top menu and the footer, and the footer's own text.
- The words on the forms (field names, buttons, the thank-you messages).
- A few small headings, for example "Pick a starting point", "Catering inquiry", "Where you'd fit", "Tell us about you", and Address, Hours and Contact on the Contact page.
- The drawings, the hand-drawn map, colours, fonts and layout.
- Adding a new page, and the web address (domain).
- Email alerts for form replies, and inviting another editor (see `docs/HANDOFF.md`).
- Switching the hidden pages and the newsletter back on (see "Hidden for now").
