# Editing the Louma Bakery website

This guide is for the person who keeps the website up to date. You do not need to know any code.

## Before you start

The website has an editor at **https://loumabakeryy.netlify.app/admin/**.

**The login is not switched on yet.** Your developer still has to finish one setup step (see "Things that still need a developer" below). Until then, the editor will not let you in.

Once the login works:

1. Open the editor and log in with your email and password.
2. Pick what you want to change from the list on the left.
3. Make your change.
4. Click **Publish**.
5. Wait about two minutes, then refresh the website. Your change is live.

Every change is saved with a full history. Nothing is lost for good. If something goes wrong, your developer can put it back.

## What to change, and where

| To change this | Go here in the editor |
|---|---|
| A menu item's name or description | Menu → Menu items → open the category → open the item |
| A price | Menu → Menu items → the category → the item → Price |
| Add a menu item | Menu → Menu items → the category → **Add item** at the top of the list |
| Remove a menu item | Menu → Menu items → the category → the **X** on that item |
| The order of menu items | Menu → Menu items → the category → drag the item by the two short lines at its top |
| A menu item's photo | Menu → Menu items → the category → the item → Photo |
| The add-ons list (like extra shots) | Menu → Menu items → Add-ons |
| The big photo at the top of the home page | Images → Site photos → Home: hero photo |
| The photos on the Our Story page | Images → Site photos → Story: photo 1 or photo 2 |
| The small extra photo on the home page | Images → Site photos → Home: accent photo |
| Opening hours | Site settings → Settings → Opening hours |
| The address | Site settings → Settings → Address |
| The phone number | Site settings → Settings → Phone number |
| The email address | Site settings → Settings → Email address |
| The Uber Eats or Instagram link | Site settings → Settings → Links |
| A page's headline, intro, or paragraphs | Page text → All pages → open that page |
| The open jobs on the Careers page | Page text → All pages → Careers page → Open roles |
| The catering steps or options | Page text → All pages → Catering page |
| The values on the Mission page | Page text → All pages → Mission page → Values |
| The "page not found" page and its button | Page text → All pages → "Page not found" page |
| The scrolling words on the home page | Marquee words → Marquee |
| The numbered chapters on the Our Story page | Story chapters → Chapters |
| The "what goes in" list on the Our Story page | Ingredients → Ingredients |

## Good habits

**Photos.** Use a photo at least 1200 pixels wide and under 3MB. The website shrinks and sharpens it for you. Every photo has a **Photo description** box. Write one plain sentence about what the photo shows, like "Croissants cooling on a wire rack." People who cannot see the photo hear this sentence.

**Prices.** Type them the way they should look, like `$4.50`. Leave the box empty if an item has no price yet. It will still show, just without a price.

**Hours.** Use one row for each group of days. For a closed day, type `Closed` in Opens and leave Closes empty.

**Phone number.** The site hides the phone number until a real one is entered. Type it like `+1 (310) 555-1234` and it will appear in the footer, on the home page, and on the Visit page.

**Internal ID.** Some items have a box called Internal ID. Leave it as it is. The website uses it behind the scenes.

**The Mission page.** Never add numbers about team members' disabilities. This is a firm rule for the bakery.

**Short is better.** Menu descriptions work best as one line. The rest of the site is written in plain, warm sentences. Try to keep that voice.

## Practicing first

There is a practice editor at **https://loumabakeryy.netlify.app/admin-demo/**. Click **Login**. No password is needed.

It shows the same menus and boxes as the real editor, but **the boxes start empty**. It does not load the website's real words or photos. Nothing you do there is saved. Use it to learn where things are, not to check how a change will look.

## The menu and the Google Sheet

The menu can be set up to update itself from a Google Sheet every morning. **This is not switched on yet.** For now, edit the menu in the editor as usual.

If it is switched on later, the sheet becomes the source of the menu. Menu changes made in the editor will be replaced by the sheet the next morning. Photo descriptions for menu items will also be lost, because the sheet has no column for them.

## Things that still need a developer

These cannot be changed in the editor. Ask your developer.

* **Switching on the editor login.** The login service (DecapBridge) needs its site code added to the website.
* **The Google Sheet menu sync.** Someone has to publish the sheet and connect it.
* **Getting form messages by email.** The newsletter, careers, and catering forms collect replies in the Netlify dashboard. No one is emailed yet when a new one arrives. Your developer or Netlify account owner can turn on email alerts.
* **The words on forms.** Field names like "Name" and "Event date", the buttons like "Send inquiry" and "Notify me", and the messages people see after sending.
* **The menu bar and footer.** The page names at the top ("Menu", "Our Story", and so on), "Ordering soon", and the footer headings and tagline.
* **Some section headings.** For example "Where you'd fit", "Pick a starting point", "Catering inquiry", "A short list, done well", "Find us", "See the full menu", and the Hours, Address, and Getting here headings on the Visit page.
* **The page name in the browser tab.**
* **The map on the Visit page.** It is set up for the current address.
* **Colors, fonts, spacing, layout, and the hand-drawn sketches.**
* **Adding a new page.**
* **The web address (domain).**

## Inviting another editor

An admin does this in the DecapBridge dashboard, not in the editor. Go to DecapBridge, open the site, choose Collaborators, and invite the person by email.
