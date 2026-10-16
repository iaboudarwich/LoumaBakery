// Sync the menu from a Google Sheet tab published as CSV.
// NOT ACTIVE: guarded (refuses without --force, see below) and needs the
// SHEET_CSV_URL env/repo variable (see scripts/README.md).
//
// Contract: validate EVERYTHING before writing ANYTHING. Any bad row aborts the
// whole run (non-zero exit, clear per-row reasons, menu.json untouched).
//
// Expected sheet columns (header row, case-insensitive):
//   Name | Price | Description | Category | Tags | Image | Active
import { parse } from 'csv-parse/sync';
import { z } from 'zod';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const MENU_PATH = join(root, 'src/data/menu.json');

/** The site's category set. A sheet row outside this list is a hard error so a
 *  typo can never invent a new section. Keep in sync with src/data/menu.json. */
export const ALLOWED_CATEGORIES = [
  'Viennoiserie',
  'Bread',
  'Pastry',
  'Savory',
  'Coffee',
  'Matcha',
  'Tea',
  'Fridge & Bottled',
];

const PRICE_RE = /^\$?\d+(\.\d{2})?$/;

const Row = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  price: z.string().trim().refine((v) => v === '' || PRICE_RE.test(v), 'Price must look like $4.50 or 4.50 (or be empty)'),
  description: z.string().trim().default(''),
  category: z.string().trim().refine((v) => ALLOWED_CATEGORIES.includes(v), `Category must be one of: ${ALLOWED_CATEGORIES.join(', ')}`),
  tags: z.string().trim().default(''),
  image: z.string().trim().default(''),
  active: z.string().trim().refine((v) => v === 'Active' || v === 'Inactive', 'Active must be exactly "Active" or "Inactive"'),
});

// Guard (October 2026): the menu is now edited in the CMS, and the costing
// sheet this reads is out of date, with a different shape (no notes, old
// categories). A run would overwrite the owner's menu, so the script refuses
// unless --force is passed. The code below is kept for if the sheet is ever
// brought up to date (it would then need the new menu.json shape).
if (!process.argv.includes('--force')) {
  console.error("Menu is maintained in the CMS since Oct 2026; the sheet is out of date. See docs/EDITING.md.");
  process.exit(1);
}

const url = process.env.SHEET_CSV_URL;
if (!url) {
  console.error('SHEET_CSV_URL is not set. Nothing to do (see scripts/README.md to activate).');
  process.exit(1);
}

const res = await fetch(url);
if (!res.ok) {
  console.error(`Fetch failed: ${res.status} ${res.statusText}`);
  process.exit(1);
}
const csv = await res.text();

let records;
try {
  records = parse(csv, { columns: (h) => h.map((c) => String(c).trim().toLowerCase()), skip_empty_lines: true, trim: true });
} catch (e) {
  console.error('CSV parse failed:', e.message);
  process.exit(1);
}

if (records.length < 5 || records.length > 200) {
  console.error(`Row count ${records.length} outside the sane range (5-200). Refusing to write.`);
  process.exit(1);
}

const errors = [];
const rows = [];
records.forEach((r, i) => {
  const parsed = Row.safeParse(r);
  if (!parsed.success) {
    const reasons = parsed.error.issues.map((iss) => `${iss.path.join('.')}: ${iss.message}`).join('; ');
    errors.push(`  row ${i + 2} (${r.name || 'unnamed'}): ${reasons}`); // +2 = header + 1-index
  } else {
    rows.push(parsed.data);
  }
});

if (errors.length) {
  console.error(`Validation failed for ${errors.length} row(s). NOTHING was written.\n${errors.join('\n')}`);
  process.exit(1);
}

// Transform: only Active rows make the site. The site shows no prices, so the
// sheet's Price column is validated but never written. The sheet has no column
// for photo descriptions or drawings, so an item keeps the `alt` it already
// has (matched by name) and a category keeps its `icon`.
// Category order follows ALLOWED_CATEGORIES; the CMS/current file shape is kept
// ({ categories: [{ id, title, order, icon, items: [...] }] }).
const current = JSON.parse(readFileSync(MENU_PATH, 'utf8'));
const idFor = (title) => {
  const existing = current.categories.find((c) => c.title === title);
  return existing ? existing.id : title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
};

const altFor = (name) => current.categories.flatMap((c) => c.items).find((it) => it.name === name)?.alt;

const categories = ALLOWED_CATEGORIES.map((title, i) => ({
  id: idFor(title),
  title,
  order: i + 1,
  // The sheet has no drawing column: keep the one chosen in the CMS.
  icon: current.categories.find((c) => c.title === title)?.icon ?? '',
  items: rows
    .filter((r) => r.category === title && r.active === 'Active')
    .map((r) => ({
      name: r.name,
      description: r.description,
      tags: r.tags ? r.tags.split(/[;,]/).map((t) => t.trim().toLowerCase()).filter(Boolean) : [],
      ...(r.image ? { image: r.image } : {}),
      ...(altFor(r.name) ? { alt: altFor(r.name) } : {}),
    })),
})).filter((c) => c.items.length > 0);

// Spread `current` so non-sheet keys (e.g. addOns) survive a sync.
writeFileSync(MENU_PATH, JSON.stringify({ ...current, categories }, null, 2) + '\n');
console.log(`Wrote ${MENU_PATH}: ${categories.length} categories, ${categories.reduce((n, c) => n + c.items.length, 0)} items.`);
