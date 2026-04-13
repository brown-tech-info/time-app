import { describe, it, expect, beforeEach } from 'vitest';
import type { City, LocationEntry } from '../types';
import { encodeShareUrl } from '../hooks/useShareUrl';

// Mock window.location for tests
beforeEach(() => {
  Object.defineProperty(window, 'location', {
    value: {
      origin: 'http://localhost:5173',
      pathname: '/',
      search: '',
    },
    writable: true,
  });
});

const tokyo: City = { name: 'Tokyo', country: 'JP', timezone: 'Asia/Tokyo', lat: 35.68, lng: 139.69 };
const london: City = { name: 'London', country: 'GB', timezone: 'Europe/London', lat: 51.51, lng: -0.13 };
const nyc: City = { name: 'New York', country: 'US', timezone: 'America/New_York', lat: 40.71, lng: -74.01 };

describe('encodeShareUrl', () => {
  it('encodes home, time, and comparisons into URL params (AC10)', () => {
    const meetingTime = new Date('2026-06-15T14:00:00Z');
    const comparisons: LocationEntry[] = [
      { id: '1', city: london },
      { id: '2', city: tokyo },
    ];

    const url = encodeShareUrl({ home: nyc, meetingTime, comparisons });

    expect(url).toContain('home=New+York');
    expect(url).toContain('time=');
    expect(url).toContain('c0=London');
    expect(url).toContain('c1=Tokyo');
  });

  it('handles no home location', () => {
    const url = encodeShareUrl({
      home: null,
      meetingTime: new Date(),
      comparisons: [],
    });
    expect(url).not.toContain('home=');
    expect(url).toContain('time=');
  });

  it('encodes up to 10 comparisons', () => {
    const comparisons: LocationEntry[] = Array.from({ length: 10 }, (_, i) => ({
      id: String(i),
      city: { ...london, name: `City${i}` },
    }));

    const url = encodeShareUrl({
      home: nyc,
      meetingTime: new Date(),
      comparisons,
    });

    for (let i = 0; i < 10; i++) {
      expect(url).toContain(`c${i}=City${i}`);
    }
  });

  it('produces a parseable URL', () => {
    const meetingTime = new Date('2026-06-15T14:00:00Z');
    const url = encodeShareUrl({
      home: nyc,
      meetingTime,
      comparisons: [{ id: '1', city: tokyo }],
    });

    const parsed = new URL(url);
    expect(parsed.searchParams.get('home')).toBe('New York|US|America/New_York');
    expect(parsed.searchParams.get('c0')).toBe('Tokyo|JP|Asia/Tokyo');
    expect(new Date(parsed.searchParams.get('time')!).toISOString()).toBe(meetingTime.toISOString());
  });
});
