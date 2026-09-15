/**
 * Joins the last two words with a no-break space so a wrapped heading never
 * leaves a single word alone on its last line. Rendering only: the data
 * (CMS / Sheet) stays plain text.
 */
export const noOrphan = (text: string): string => text.replace(/\s+(\S+)\s*$/, '\u00a0$1');
