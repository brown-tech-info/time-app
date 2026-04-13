import { useState, useCallback, useEffect } from 'react';
import type { City, LocationEntry } from './types';
import cities from './data/cities.json';
import { nextHalfHour } from './utils/timezone';
import { useGeolocation } from './hooks/useGeolocation';
import { encodeShareUrl, useShareUrlDecoder } from './hooks/useShareUrl';
import Header from './components/Header';
import CitySearch from './components/CitySearch';
import DateTimePicker from './components/DateTimePicker';
import TimeCardGrid from './components/TimeCardGrid';
import ShareButton from './components/ShareButton';

let nextId = 0;
function genId() {
  return `loc-${++nextId}`;
}

export default function App() {
  const { detectedCity, loading } = useGeolocation();
  const shareState = useShareUrlDecoder(cities as City[]);

  const [homeLocation, setHomeLocation] = useState<LocationEntry | null>(null);
  const [meetingTime, setMeetingTime] = useState<Date>(nextHalfHour());
  const [comparisons, setComparisons] = useState<LocationEntry[]>([]);

  // Restore from share URL or geolocation
  useEffect(() => {
    if (shareState) {
      if (shareState.home) {
        setHomeLocation({ id: 'home', city: shareState.home });
      }
      setMeetingTime(shareState.meetingTime);
      setComparisons(shareState.comparisons);
    } else if (!loading && detectedCity && !homeLocation) {
      setHomeLocation({ id: 'home', city: detectedCity });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, detectedCity, shareState]);

  const handleSetHome = useCallback((city: City) => {
    setHomeLocation({ id: 'home', city });
  }, []);

  const handleAddComparison = useCallback((city: City) => {
    setComparisons((prev) => {
      if (prev.length >= 10) return prev;
      if (prev.some((l) => l.city.timezone === city.timezone && l.city.name === city.name)) {
        return prev;
      }
      return [...prev, { id: genId(), city }];
    });
  }, []);

  const handleRemoveComparison = useCallback((id: string) => {
    setComparisons((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const handleReset = useCallback(() => {
    setHomeLocation(null);
    setMeetingTime(nextHalfHour());
    setComparisons([]);
    // Clear share params from URL
    window.history.replaceState(null, '', window.location.pathname);
  }, []);

  const hasData = homeLocation !== null || comparisons.length > 0;

  const shareUrl = encodeShareUrl({
    home: homeLocation?.city ?? null,
    meetingTime,
    comparisons,
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header onNewMeeting={hasData ? handleReset : undefined} />

      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* Home location picker */}
        <section className="mb-8">
          <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
            Your Location
          </h2>
          <div className="max-w-md">
            <CitySearch
              onSelect={handleSetHome}
              placeholder="Where are you?"
              initialValue={
                homeLocation ? `${homeLocation.city.name}, ${homeLocation.city.country}` : ''
              }
            />
          </div>
        </section>

        {/* Meeting time picker */}
        <section className="mb-8">
          <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
            Meeting Time
          </h2>
          <DateTimePicker value={meetingTime} onChange={setMeetingTime} />
        </section>

        {/* Time comparison grid */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Time Comparison
            </h2>
            {homeLocation && comparisons.length > 0 && (
              <ShareButton shareUrl={shareUrl} />
            )}
          </div>

          <TimeCardGrid
            homeLocation={homeLocation}
            comparisons={comparisons}
            meetingTime={meetingTime}
            onAddComparison={handleAddComparison}
            onRemoveComparison={handleRemoveComparison}
          />
        </section>
      </main>
    </div>
  );
}
