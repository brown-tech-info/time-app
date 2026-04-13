import type { City, LocationEntry } from '../types';
import TimeCard from './TimeCard';
import CitySearch from './CitySearch';

interface TimeCardGridProps {
  homeLocation: LocationEntry | null;
  comparisons: LocationEntry[];
  meetingTime: Date;
  onAddComparison: (city: City) => void;
  onRemoveComparison: (id: string) => void;
}

const MAX_COMPARISONS = 10;

export default function TimeCardGrid({
  homeLocation,
  comparisons,
  meetingTime,
  onAddComparison,
  onRemoveComparison,
}: TimeCardGridProps) {
  const canAdd = comparisons.length < MAX_COMPARISONS;

  return (
    <div>
      {/* Home card */}
      {homeLocation && (
        <div className="mb-6">
          <TimeCard city={homeLocation.city} meetingTime={meetingTime} isHome />
        </div>
      )}

      {/* Comparison cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {comparisons.map((loc) => (
          <TimeCard
            key={loc.id}
            city={loc.city}
            meetingTime={meetingTime}
            onRemove={() => onRemoveComparison(loc.id)}
          />
        ))}
      </div>

      {/* Add location */}
      {canAdd ? (
        <div className="mt-6 mx-auto max-w-md">
          <CitySearch
            onSelect={onAddComparison}
            placeholder={`Add a city (${comparisons.length}/${MAX_COMPARISONS})…`}
          />
        </div>
      ) : (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Maximum of {MAX_COMPARISONS} comparison locations reached.
        </p>
      )}
    </div>
  );
}
