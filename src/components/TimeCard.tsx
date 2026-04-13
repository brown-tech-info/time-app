import type { City } from '../types';
import { classifyHour, categoryStyles } from '../utils/colorCode';
import {
  getTimeInTimezone,
  formatTimeInTimezone,
  formatDateInTimezone,
  formatUtcOffset,
} from '../utils/timezone';

interface TimeCardProps {
  city: City;
  meetingTime: Date;
  isHome?: boolean;
  onRemove?: () => void;
}

export default function TimeCard({ city, meetingTime, isHome, onRemove }: TimeCardProps) {
  const parts = getTimeInTimezone(meetingTime, city.timezone);
  const category = classifyHour(parts.hour);
  const style = categoryStyles[category];

  return (
    <div
      className={`relative rounded-xl border p-4 shadow-sm transition-colors
        ${style.bg} border-gray-200 dark:border-gray-700`}
      role="region"
      aria-label={`Time in ${city.name}, ${city.country}`}
    >
      {/* Remove button */}
      {!isHome && onRemove && (
        <button
          onClick={onRemove}
          aria-label={`Remove ${city.name}`}
          className="absolute right-2 top-2 rounded-full p-1 text-gray-400 hover:bg-gray-200
                     hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
        >
          ✕
        </button>
      )}

      {/* City info */}
      <div className="mb-1 flex items-center gap-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {city.name}
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {city.country}
        </span>
        {isHome && (
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700
                          dark:bg-blue-900/50 dark:text-blue-300">
            Home
          </span>
        )}
      </div>

      {/* Time display */}
      <div className="mb-1 text-3xl font-bold text-gray-900 dark:text-gray-50">
        {formatTimeInTimezone(meetingTime, city.timezone)}
      </div>

      {/* Date and offset */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <span>{formatDateInTimezone(meetingTime, city.timezone)}</span>
        <span>•</span>
        <span>{formatUtcOffset(meetingTime, city.timezone)}</span>
      </div>

      {/* Category label (accessibility — supplements color) */}
      <div className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${style.text}`}>
        {style.label}
      </div>
    </div>
  );
}
