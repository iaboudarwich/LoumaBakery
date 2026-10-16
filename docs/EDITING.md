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
| The baguette drawing above it, which draws itself, rubs itself out and starts again | Not in the editor (see "Things that need the person who looks after the website") |
| The two introduction paragraphs | Page text → All pages → Home page → **Paragraphs** |
| The heading above the Instagram photos | Page text → All pages → Home page → **Instagram heading** |
| The photo at the top, beside the tagline | Photos → Site photos → **Home: top photo** (see "Swapping a photo") |
| The four photos further down the page | Photos → Site photos → **Home: photo gallery**. The first two sit side by side as wide photos; the other two as tall photos. |
| The Instagram photos | Instagram strip (see "The Instagram strip") |
| The address and hours in the dark red band | Site settings (see "Hours, address and emails") |

### Our Story

| To change | Go to |
|---|---|
| The page title | Page text → All pages → Our Story page → **Headline** |
| The letter | Our Story → **The letter** → **Paragraphs**. Each box is one paragraph. **Signed** is the name read out to screen readers for the handwritten signature. |
| The five sections (title and paragraphs) | Our Story → **Sections**. Open a section to change its title or paragraphs; drag the two short lines at the top of a section to reorder it. |
| The photo (the family collage) | Photos → Site photos → **Our Story: photos**. One photo, shown after the first section. |

### The Louma Initiative

| To change | Go to |
|---|---|
| The title and the opening paragraphs | Page text → All pages → The Louma Initiative page → **Headline** and **Introduction** |
| "Opening doors" and "Built to last" | Page text → All pages → The Louma Initiative page → **Sections** |

This page has no photos, by the owner's choice. Never add numbers about team members' disabilities to this page. This is a firm rule for the bakery.

### Menu

| To change | Go to |
|---|---|
| The title, the four introduction paragraphs and the allergen note | Page text → All pages → Menu page |
| Menu items, their notes, categories and category notes (Add-ons is a category like the others) | Menu → Menu items (see "Editing the menu") |

### Shop

| To change | Go to |
|---|---|
| The title and the "Coming soon" words | Page text → All pages → Shop page → **Headline** and **"Not open yet" text** |
| The line under the title (pre-orders, 48 hours notice) | Shop → **Intro line** |
| The products, their order, prices, notes, photos and links, and the gift card | Shop → **Products** (see "Shop products") |

### Contact

| To change | Go to |
|---|---|
| The title ("Come say hi") | Page text → All pages → Contact page → **Headline** |
| Address, hours, the parking note, emails, Instagram, TikTok | Site settings (see "Hours, address and emails") |

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

Go to **Menu → Menu items**. The menu is a list of categories (Pastries, Bread Selection, Sweets and so on, ending with Add-ons), and each category has a list of items. The Menu page shows them as plain text: the category name, the items one per line, then the category's notes. No prices, photos or drawings. On computers and tablets there are two columns, food on the left and drinks on the right; on phones it is one list, all the food first, then the drinks.

- **Change an item**: open the category, open the item, change its **Name**.
- **An item's note**: the optional **Note** under an item's name shows in smaller text right below it, for example "Gluten free" or "Almond and pecan". Leave it empty for none.
- **Category notes**: the optional **Category notes** list at the bottom of a category shows short lines after its items, for example "Decaf available for any drink". Add one with **Add note**; remove one with its **X**.
- **Add an item**: open the category and click **Add item** at the top of its Items list.
- **Remove an item**: click the **X** on that item.
- **Reorder items**: drag an item by the two short lines at its top.
- **Category order**: change **Show order** (1 shows first, then 2, 3 and so on). The order counts within each column.
- **Column**: every category says which column it sits in on wider screens, **Food** (left) or **Drinks** (right). Today Pastries, Bread Selection, Sweets, All Day Lunch and From the Shelf are Food; Coffee, Matcha, Tea, Specialty Drinks and Add-ons are Drinks. A new category must have one; pick the side it belongs to. On phones the column only decides the order: all Food categories, then all Drinks.
- **A new category**: click **Add category**, give it a **Category name**, a **Show order**, a **Column** and an **Internal ID** (one plain word, for example `soups`; it is used for the link to that category at the top of the page). Leave the Internal ID of existing categories as it is.

**The menu and the Google Sheet.** The menu used to be planned to update itself from a Google Sheet (the bakery's costing sheet). Since October 2026 the menu is kept in the editor, and that sheet is out of date, so the sync is switched off on purpose: the script refuses to run and would otherwise replace the menu with the old one. Edit the menu here. (For the person who looks after the website: see `scripts/README.md`.)

## Shop products

Go to **Shop → Products**. The Shop page shows them as a plain grid of square pictures, in the order of this list (the hat first today), each with its name, price, note and, until it can be bought online, "Coming soon".

- **Reorder**: drag a product by the two short lines at its top.
- **Price**: for example `$32`. Leave price empty to hide it (the tart and the cheesecake have none yet). Prices only ever show on the Shop page.
- **Note**: one short line under the name, for example "Gluten free. Pre-order, 48 hours notice".
- **Photo** and **Photo fit**: photos are shown square. **Fill the square** suits ordinary photos (the tart, the cheesecake): they are cropped to a square around the middle, so keep the product centred. **Whole object on the page colour** suits a cutout on a transparent background (a PNG), like the hat: the whole object shows, never cropped. At least 800 pixels wide.
- **Photo description**: one plain sentence about what the photo shows.
- **Type**: **Product** for everything except the gift card. **Gift card** shows a dark red square with the Louma wordmark and "Gift card" instead of a photo, so it needs no photo.

**When Square (or another shop) is ready for a product:**

1. In Square, open the product's page (or the gift card page) and copy its address.
2. In **Shop → Products**, open that product and paste the address into **Link**.
3. Click **Publish**.

While **Link** is empty, the product shows "Coming soon" and can't be clicked. Once a link is there, the whole product (picture and name) becomes a link that opens your shop page in a new tab, and "Coming soon" disappears.

**Adding a product:** click **Add product**, fill in **Name**, then whichever of **Price**, **Note**, **Photo**, **Photo description**, **Photo fit** and **Link** apply, drag it into place, and Publish.

## Swapping a photo

Go to **Photos → Site photos**, click the photo you want to replace, and upload the new one. Then update its **description**.

| Slot | Shape | Minimum size |
|---|---|---|
| Home: top photo | Any shape: it is cropped to a tall frame (4:5 on phones), so keep the subject near the middle | 2400 pixels on the long side |
| Home: photo gallery, 1st and 2nd | Cropped to a wide frame (3:2), side by side; 4:5 on phones | 1600 pixels on the long side |
| Home: photo gallery, 3rd and 4th | Portrait (taller than wide) | 1600 pixels on the long side |
| Our Story: photo | Portrait, with no border or margin around it (the page is the background) | 1200 pixels wide |
| Instagram strip | Square works best | 600 pixels wide |
| Shop products | Square (cropped around the middle), or a cutout PNG shown whole | 800 pixels wide |

- **Crop focus** (home gallery and Our Story photos): when a slot crops a photo, this picks which part stays in view. **Centre** suits most photos; pick **Top**, **Upper middle**, **Just above centre**, **Just below centre**, **Lower middle**, **Bottom**, **Left** or **Right** when the subject sits off-centre. Then check the page after publishing. (The first home gallery photo, the pain au chocolat, uses **Just below centre** so the front pastry shows whole, chocolate end and all. If you swap that photo, check the front pastry is not cut off at the bottom; move the focus down if it is.)
- Keep each photo under 3 MB. The website makes the small, fast versions itself.
- Use photos that are straight and not tilted. The website shows them exactly as taken, cropped to fit the slot's shape.
- **Every photo needs a description**: one plain sentence about what is actually in the photo, like "Pain au chocolat cooling on a wire rack on a wooden counter". People who can't see the photo hear this sentence.

## The Instagram strip

Go to **Instagram strip**. There are up to six photos, shown as big squares (three across on computers, two across on phones). Click a photo to replace it, and update its **Photo description**. Every tile links to the bakery's Instagram page. A tile without a photo is skipped.

## Hours, address and emails

Go to **Site settings → Settings**.

- **Opening hours**: one row for each group of days, for example "Tuesday – Sunday", "7:30 AM", "2:30 PM". For a closed day, type `Closed` in **Opens** and leave **Closes** empty. Hours show on the home page (in the dark red band), the Contact page, the footer and in search results.
- **Address**: street, city, state and ZIP. The map link updates by itself.
- **Parking note**: one line shown on the Contact page under the hours (today: "Parking available in the underground lot on Centinela."). Leave it empty to hide it.
- **Email address**: the main contact email.
- **Email for larger orders**: shown with "for larger orders".
- **Instagram link** and **Instagram handle** (for example `@loumabakery`). The Contact page shows the handle as "@loumabakery on Instagram".
- **TikTok link** and **TikTok handle**: the Contact page shows the handle as "@loumabakery on TikTok". Empty the link to hide TikTok everywhere.

The footer at the bottom of every page shows the address, hours and both emails from here, then "Instagram" and "TikTok" as plain links (the handles are on the Contact page).
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

- The page names in the top menu and the footer, and the footer's own text and layout (a dark red band: the face and wordmark, then Visit with the address, hours, emails, Instagram and TikTok, then the page links).
- The words on the forms (field names, buttons, the thank-you messages).
- A few small headings, for example "Pick a starting point", "Catering inquiry", "Where you'd fit", "Tell us about you", and Address, Hours and Contact on the Contact page.
- The drawings, the hand-drawn map, colours, fonts and layout.
- Adding a new page, and the web address (domain).
- Email alerts for form replies, and inviting another editor (see `docs/HANDOFF.md`).
- Switching the hidden pages and the newsletter back on (see "Hidden for now").
