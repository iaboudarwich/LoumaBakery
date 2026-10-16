// Compare src/data/menu.json item by item against a verbatim copy of the
// owner's menu (docs/brief/2026-10-15-round3.md, section E.14). Prints every
// difference; prints "menu.json matches brief E.14" and exits 0 when there is
// none. Usage: node scripts/check-menu.mjs
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Verbatim copy of brief E.14 (category lines only; the two spelling fixes
// the brief lists are already applied in it: Focaccia, Lorraine).
const E14 = `
PASTRIES: Croissant; Pain au Chocolat; Ham and Cheese Croissant; Za'atar Croissant; Nutty Croissant (note: Almond and pecan); Maritozzo; Orange Blossom Brioche Bun; Cinnamon Bun.
BREAD SELECTION: Sourdough; Danish Rye; Baguette; Focaccia; Kaak Bread; Specialty Loaf (note: Ask about today's inclusions). Section note: Made with USDA Certified Organic Flour.
SWEETS: Madeleines (note: Dark chocolate, vanilla white chocolate, monthly flavor); Chocolate Chip Cookie; Berry Financier (note: Gluten free); Lemon and Yuzu Cake; Banana Bread with Chocolate; Basque Cheesecake (note: Gluten free); Tiramisu. Removed per her message: Pecan Tart, Whole Pecan Tart.
ALL DAY LUNCH: Quiche Lorraine or Veggie; Kaak Labneh Sandwich; Turkey Pesto Focaccia Sandwich; Egg Salad Sandwich; Baguette Jambon Beurre; Carrot Farro Avocado Salad; Niçoise Salad.
FROM THE SHELF: Granola (note: House-made and naturally sweetened); Labneh Dip.
COFFEE: Drip Coffee; Cold Brew; Espresso; Cortado; Flat White; Cappuccino; Latte; Americano; Vanilla Latte; Mocha; Hot Chocolate. Section note: Decaf available for any drink.
MATCHA: Matcha Latte; Matcha with Water; Matcha Coconut Water; Hojicha Latte.
TEA: Chamomile; Peppermint Tea; Green Tea; Black Tea; Chai Latte; Arnold Palmer.
SPECIALTY DRINKS: Rose Matcha Latte; Rose Latte; Louma-nade (note: House-made lemonade with orange blossom water).
ADD-ONS: Extra Shot; Cold Foam; House-made Vanilla Syrup; Honey; Oat Milk; Almond Milk; Pistachio Milk. Section notes: Milk alternatives available for all drinks. Ask us about our seasonal drinks!
`;

// Parse "CATEGORY: Item; Item (note: x); Item. Section note(s): A. B!"
// ("Removed per her message: ..." lists what is gone, not what is on the menu).
const strip = (s) => s.trim().replace(/\.$/, '');
const expected = E14.trim().split('\n').map((line) => {
  const [, title, rest] = line.match(/^([A-Z][A-Z -]+):\s*(.*)$/);
  const [itemsPart, ...tail] = rest.split(/\.\s+(?=Section notes?:|Removed per her message:)/);
  const items = strip(itemsPart).split(/;\s*/).map((raw) => {
    const m = raw.match(/^(.*?)\s*\(note:\s*(.*)\)$/);
    return m ? { name: m[1], note: m[2] } : { name: raw };
  });
  const noteTail = tail.find((t) => /^Section notes?:/.test(t));
  const notes = noteTail ? noteTail.replace(/^Section notes?:\s*/, '').split(/(?<=[.!])\s+/).map(strip) : [];
  return { title, items, notes };
});

const menu = JSON.parse(readFileSync(join(root, 'src/data/menu.json'), 'utf8'));
const actual = [...menu.categories].sort((a, b) => a.order - b.order);
const diffs = [];
const say = (s) => diffs.push(s);

if (Object.keys(menu).join() !== 'categories') say(`top-level keys: ${Object.keys(menu).join(', ')} (expected only "categories")`);
if (actual.length !== expected.length) say(`category count: ${actual.length}, brief has ${expected.length}`);
expected.forEach((e, ci) => {
  const a = actual[ci];
  if (!a) return say(`missing category ${e.title}`);
  if (a.title.toUpperCase() !== e.title) say(`category ${ci + 1}: "${a.title}", brief "${e.title}"`);
  const extra = Object.keys(a).filter((k) => !['id', 'title', 'order', 'column', 'items', 'notes'].includes(k));
  // The first five categories (Pastries to From the Shelf) are food, the rest drinks.
  const column = ci < 5 ? 'food' : 'drinks';
  if (a.column !== column) say(`${a.title}: column "${a.column ?? ''}", expected "${column}"`);
  if (extra.length) say(`${a.title}: unexpected fields ${extra.join(', ')}`);
  const n = Math.max(a.items.length, e.items.length);
  for (let i = 0; i < n; i++) {
    const ai = a.items[i], ei = e.items[i];
    if (!ai) { say(`${e.title} #${i + 1}: missing "${ei.name}"`); continue; }
    if (!ei) { say(`${e.title} #${i + 1}: extra "${ai.name}"`); continue; }
    if (ai.name !== ei.name) say(`${e.title} #${i + 1}: name "${ai.name}", brief "${ei.name}"`);
    if ((ai.note ?? '') !== (ei.note ?? '')) say(`${e.title} "${ei.name}": note "${ai.note ?? ''}", brief "${ei.note ?? ''}"`);
    const xf = Object.keys(ai).filter((k) => !['name', 'note'].includes(k));
    if (xf.length) say(`${e.title} "${ai.name}": unexpected fields ${xf.join(', ')}`);
  }
  if (JSON.stringify(a.notes ?? []) !== JSON.stringify(e.notes)) say(`${e.title} notes: ${JSON.stringify(a.notes ?? [])}, brief ${JSON.stringify(e.notes)}`);
});

const total = expected.reduce((s, c) => s + c.items.length, 0);
if (diffs.length) {
  console.log(diffs.join('\n'));
  process.exit(1);
}
console.log(`menu.json matches brief E.14: ${expected.length} categories, ${total} items, ${expected.reduce((s, c) => s + c.notes.length, 0)} category notes.`);
