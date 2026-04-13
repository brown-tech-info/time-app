import { useMemo } from 'react';
import type { City, LocationEntry } from '../types';

/**
 * Encode the current app state into a shareable URL.
 * Decode share parameters from the current URL on load.
 */

interface ShareState {
  home: City | null;
  meetingTime: Date;
  comparisons: LocationEntry[];
}

export function encodeShareUrl(state: ShareState): string {
  const params = new URLSearchParams();

  if (state.home) {
    params.set('home', `${state.home.name}|${state.home.country}|${state.home.timezone}`);
  }
  params.set('time', state.meetingTime.toISOString());

  state.comparisons.forEach((loc, i) => {
    params.set(
      `c${i}`,
      `${loc.city.name}|${loc.city.country}|${loc.city.timezone}`,
    );
  });

  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

export function useShareUrlDecoder(allCities: City[]): ShareState | null {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.size === 0) return null;

    const findCity = (encoded: string): City | null => {
      const [name, country, timezone] = encoded.split('|');
      return (
        allCities.find(
          (c) => c.name === name && c.country === country && c.timezone === timezone,
        ) ?? null
      );
    };

    const homeStr = params.get('home');
    const home = homeStr ? findCity(homeStr) : null;

    const timeStr = params.get('time');
    const parsed = timeStr ? new Date(timeStr) : new Date();
    const meetingTime = isNaN(parsed.getTime()) ? new Date() : parsed;

    const comparisons: LocationEntry[] = [];
    for (let i = 0; i < 10; i++) {
      const val = params.get(`c${i}`);
      if (!val) break;
      const city = findCity(val);
      if (city) {
        comparisons.push({ id: `share-${i}`, city });
      }
    }

    return { home, meetingTime, comparisons };
  }, [allCities]);
}
