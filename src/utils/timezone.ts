/**
 * Convert a date/time from one IANA timezone to another.
 * Uses the native Intl API — no external library needed.
 */

/** Build a Date representing the given wall-clock values in the given timezone. */
export function buildDateInTimezone(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timezone: string,
): Date {
  // Create a rough UTC guess, then adjust by the real offset
  const rough = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const offsetMs = getTimezoneOffsetMs(rough, timezone);
  const adjusted = new Date(rough.getTime() - offsetMs);
  // Re-check because DST boundary may have shifted the offset
  const offsetMs2 = getTimezoneOffsetMs(adjusted, timezone);
  if (offsetMs !== offsetMs2) {
    return new Date(rough.getTime() - offsetMs2);
  }
  return adjusted;
}

/** Get the UTC offset in milliseconds for a timezone at a given instant. */
export function getTimezoneOffsetMs(date: Date, timezone: string): number {
  const utcStr = date.toLocaleString('en-US', { timeZone: 'UTC' });
  const tzStr = date.toLocaleString('en-US', { timeZone: timezone });
  return new Date(tzStr).getTime() - new Date(utcStr).getTime();
}

/** Convert an instant to wall-clock parts in the target timezone. */
export function getTimeInTimezone(
  date: Date,
  timezone: string,
): { year: number; month: number; day: number; hour: number; minute: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parseInt(parts.find((p) => p.type === type)?.value ?? '0', 10);

  return {
    year: get('year'),
    month: get('month'),
    day: get('day'),
    hour: get('hour') === 24 ? 0 : get('hour'), // midnight edge case
    minute: get('minute'),
  };
}

/** Format a UTC offset string like "+05:30" or "−08:00" for a timezone at a given instant. */
export function formatUtcOffset(date: Date, timezone: string): string {
  const offsetMs = getTimezoneOffsetMs(date, timezone);
  const totalMinutes = Math.round(offsetMs / 60_000);
  const sign = totalMinutes >= 0 ? '+' : '−';
  const absMinutes = Math.abs(totalMinutes);
  const h = String(Math.floor(absMinutes / 60)).padStart(2, '0');
  const m = String(absMinutes % 60).padStart(2, '0');
  return `UTC${sign}${h}:${m}`;
}

/** Format a Date as a human-readable time string in the given timezone. */
export function formatTimeInTimezone(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

/** Format a Date as a human-readable date string in the given timezone. */
export function formatDateInTimezone(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

/** Get the next nearest half-hour from now. */
export function nextHalfHour(): Date {
  const now = new Date();
  const ms = 30 * 60 * 1000;
  return new Date(Math.ceil(now.getTime() / ms) * ms);
}
