import { useState, useEffect } from 'react';
import type { City } from '../types';
import cities from '../data/cities.json';

/**
 * Detect the user's timezone via the browser and map it to the closest city
 * in the bundled dataset.
 */
export function useGeolocation() {
  const [detectedCity, setDetectedCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // Find exact timezone match in our dataset
      const match = (cities as City[]).find((c) => c.timezone === tz);
      if (match) {
        setDetectedCity(match);
      }
    } catch {
      // Silently fail — user will pick manually
    } finally {
      setLoading(false);
    }
  }, []);

  return { detectedCity, loading };
}
