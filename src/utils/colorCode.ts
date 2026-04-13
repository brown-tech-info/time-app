import type { TimeCategory } from '../types';

/**
 * Classify a local hour into a business-hours category.
 *
 * Green  (business):   08:00–17:59
 * Yellow (early-late): 06:00–07:59  or  18:00–21:59
 * Red    (overnight):  22:00–05:59
 */
export function classifyHour(hour: number): TimeCategory {
  if (hour >= 8 && hour < 18) return 'business';
  if ((hour >= 6 && hour < 8) || (hour >= 18 && hour < 22)) return 'early-late';
  return 'overnight';
}

/** Tailwind background classes for each category. */
export const categoryStyles: Record<
  TimeCategory,
  { bg: string; text: string; label: string }
> = {
  business: {
    bg: 'bg-green-100 dark:bg-green-900/40',
    text: 'text-green-800 dark:text-green-200',
    label: 'Business hours',
  },
  'early-late': {
    bg: 'bg-yellow-100 dark:bg-yellow-900/40',
    text: 'text-yellow-800 dark:text-yellow-200',
    label: 'Early / Late',
  },
  overnight: {
    bg: 'bg-red-100 dark:bg-red-900/40',
    text: 'text-red-800 dark:text-red-200',
    label: 'Overnight',
  },
};
