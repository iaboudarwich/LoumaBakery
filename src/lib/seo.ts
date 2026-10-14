/**
 * Meta descriptions, written from a page's own copy: whole sentences from the
 * given texts, in order, while they fit in `max` characters. A first sentence
 * longer than that is cut at a word boundary. Nothing is invented.
 */
export const describe = (texts: (string | undefined)[], max = 160): string => {
  const sentences = texts
    .filter((t): t is string => !!t && !!t.trim())
    .flatMap((t) => {
      const s = t.trim();
      return (s.match(/[^.!?]+[.!?]+["'”’)]*|[^.!?]+$/g) ?? [s]).map((x) => x.trim()).map((x) => (/[.!?]["'”’)]*$/.test(x) ? x : x + '.'));
    });
  let out = '';
  for (const s of sentences) {
    const next = out ? out + ' ' + s : s;
    if (next.length > max) break;
    out = next;
  }
  if (!out && sentences[0]) out = sentences[0].slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
  return out;
};
