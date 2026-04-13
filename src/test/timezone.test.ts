import { describe, it, expect } from 'vitest';
import {
  buildDateInTimezone,
  getTimeInTimezone,
  formatUtcOffset,
  formatTimeInTimezone,
  formatDateInTimezone,
  nextHalfHour,
} from '../utils/timezone';

describe('getTimeInTimezone', () => {
  it('converts UTC noon to New York (EST = UTC-5)', () => {
    // Jan 15 is standard time (EST)
    const utcNoon = new Date('2026-01-15T17:00:00Z'); // 5pm UTC = noon EST
    const parts = getTimeInTimezone(utcNoon, 'America/New_York');
    expect(parts.hour).toBe(12);
    expect(parts.minute).toBe(0);
  });

  it('converts New York 2pm to London (AC4: NY 14:00 → London 19:00 in winter)', () => {
    // 2026-01-15 14:00 NY = 19:00 UTC = 19:00 London (GMT)
    const nyTime = buildDateInTimezone(2026, 1, 15, 14, 0, 'America/New_York');
    const londonParts = getTimeInTimezone(nyTime, 'Europe/London');
    expect(londonParts.hour).toBe(19);
  });

  it('converts New York 2pm to Tokyo (AC5: shows next day)', () => {
    // 2026-03-15 14:00 NY (EDT not yet, still EST in March before spring forward)
    // Actually March 15 2026 — US springs forward March 8, so this IS EDT
    // NY 14:00 EDT = 18:00 UTC = 03:00+1 JST (next day)
    const nyTime = buildDateInTimezone(2026, 3, 15, 14, 0, 'America/New_York');
    const tokyoParts = getTimeInTimezone(nyTime, 'Asia/Tokyo');
    expect(tokyoParts.hour).toBe(3);
    expect(tokyoParts.day).toBe(16); // next day
  });

  it('handles DST transition correctly (AC13: March 8 spring forward)', () => {
    // 2026-03-08 is US spring forward. London has NOT changed yet (March 29).
    // Before spring forward: NY is EST (UTC-5), London is GMT (UTC+0) → 5 hours diff
    // After spring forward: NY is EDT (UTC-4), London is GMT (UTC+0) → 4 hours diff
    // At 14:00 NY on March 8 (after spring forward), NY is EDT
    const nyTime = buildDateInTimezone(2026, 3, 8, 14, 0, 'America/New_York');
    const londonParts = getTimeInTimezone(nyTime, 'Europe/London');
    // NY 14:00 EDT = 18:00 UTC = 18:00 GMT
    expect(londonParts.hour).toBe(18);
    // Difference is 4 hours (EDT to GMT), not 5
  });
});

describe('buildDateInTimezone', () => {
  it('creates a date in the specified timezone', () => {
    const date = buildDateInTimezone(2026, 6, 15, 10, 30, 'America/Chicago');
    const parts = getTimeInTimezone(date, 'America/Chicago');
    expect(parts.year).toBe(2026);
    expect(parts.month).toBe(6);
    expect(parts.day).toBe(15);
    expect(parts.hour).toBe(10);
    expect(parts.minute).toBe(30);
  });

  it('handles timezone with non-standard offset (India +5:30)', () => {
    const date = buildDateInTimezone(2026, 4, 10, 9, 0, 'Asia/Kolkata');
    const parts = getTimeInTimezone(date, 'Asia/Kolkata');
    expect(parts.hour).toBe(9);
    expect(parts.minute).toBe(0);
  });
});

describe('formatUtcOffset', () => {
  it('formats positive offset', () => {
    const date = new Date('2026-01-15T12:00:00Z');
    const offset = formatUtcOffset(date, 'Asia/Tokyo'); // UTC+9
    expect(offset).toBe('UTC+09:00');
  });

  it('formats negative offset', () => {
    const date = new Date('2026-01-15T12:00:00Z');
    const offset = formatUtcOffset(date, 'America/New_York'); // UTC-5 in winter
    expect(offset).toBe('UTC−05:00');
  });

  it('formats half-hour offset (India)', () => {
    const date = new Date('2026-01-15T12:00:00Z');
    const offset = formatUtcOffset(date, 'Asia/Kolkata');
    expect(offset).toBe('UTC+05:30');
  });
});

describe('formatTimeInTimezone', () => {
  it('formats time in 12-hour format', () => {
    const date = new Date('2026-01-15T17:00:00Z'); // noon in NY
    const time = formatTimeInTimezone(date, 'America/New_York');
    expect(time).toMatch(/12:00\s*PM/i);
  });
});

describe('formatDateInTimezone', () => {
  it('formats date with weekday and month', () => {
    const date = new Date('2026-01-15T17:00:00Z');
    const formatted = formatDateInTimezone(date, 'America/New_York');
    expect(formatted).toContain('Jan');
    expect(formatted).toContain('15');
    expect(formatted).toContain('2026');
  });
});

describe('nextHalfHour', () => {
  it('returns a date in the future', () => {
    const result = nextHalfHour();
    expect(result.getTime()).toBeGreaterThanOrEqual(Date.now());
  });

  it('returns a date on a 30-minute boundary', () => {
    const result = nextHalfHour();
    expect(result.getMinutes() % 30).toBe(0);
    expect(result.getSeconds()).toBe(0);
  });
});
