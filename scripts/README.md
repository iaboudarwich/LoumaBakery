# Scripts

## sync-menu.mjs — menu from a Google Sheet (GUARDED, OFF)

Since October 2026 the menu is maintained in the CMS (`src/data/menu.json`,
Menu → Menu items), in the owner's fall 2026 shape: categories with a `column` (`food` or
`drinks`), `items` (`name`, optional `note`) and optional `notes`. The Google Sheet this script
reads is the old costing sheet: out of date, and in the old shape (prices,
descriptions, tags, the old eight categories). A run would overwrite the
owner's menu, so the script **refuses to run** and prints:

    Menu is maintained in the CMS since Oct 2026; the sheet is out of date. See docs/EDITING.md.

unless it is given `--force`. The code is kept. Before ever using it again,
bring the sheet up to date and change the script to write the new shape and
categories. The GitHub workflow (`.github/workflows/sync-menu.yml`) still only
runs the script when the `SHEET_CSV_URL` repo variable is set, which it is not;
if it were set, the run would fail loudly on the guard instead of writing.

Old usage, for reference (only after the changes above):
```bash
SHEET_CSV_URL="https://docs.google.com/.../pub?output=csv" node scripts/sync-menu.mjs --force
git diff src/data/menu.json   # review, then commit or discard
```

## check-menu.mjs — menu against the owner's list

`node scripts/check-menu.mjs` compares `src/data/menu.json` item by item with a
verbatim copy of the owner's fall 2026 menu (brief
`docs/brief/2026-10-15-round3.md`, E.14) and prints every difference. Once the
owner edits the menu in the CMS, differences are expected: it is a check of the
round 3 import, not a rule.

## Other scripts
- `gen-icons.mjs` — favicons/app icons from the face mark.
- `gen-og.mjs`: GUARDED, refuses to run. og-default.jpg is now a crop of the hero frame (croissant-grid.jpg, formerly hero.jpg); `--force-brand-card` restores the old generated card.
- `gen-admin-demo.mjs` — builds /admin-demo's config from /admin's (runs on prebuild).
