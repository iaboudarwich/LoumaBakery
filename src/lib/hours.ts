/**
 * The opening hours from settings.json, grouped the way the footer and the
 * home visit row show them: each open row as its days and its times
 * ("Tuesday – Sunday" / "7:30 AM – 2:30 PM"), each closed row as one line
 * ("Closed Mondays").
 */
import { siteConfig } from '../config/site';

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export type HoursGroup = { lines: string[] };

export const hoursGroups = (): HoursGroup[] =>
  siteConfig.hours.map((h) =>
    h.close
      ? { lines: [h.days, `${h.open} – ${h.close}`] }
      : { lines: [`${h.open} ${WEEKDAYS.includes(h.days) ? `${h.days}s` : h.days}`] },
  );
