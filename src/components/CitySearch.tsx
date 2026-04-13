import { useState, useRef, useEffect } from 'react';
import type { City } from '../types';
import cities from '../data/cities.json';

interface CitySearchProps {
  onSelect: (city: City) => void;
  placeholder?: string;
  initialValue?: string;
}

export default function CitySearch({
  onSelect,
  placeholder = 'Search for a city…',
  initialValue = '',
}: CitySearchProps) {
  const [query, setQuery] = useState(initialValue);
  const [results, setResults] = useState<City[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  function search(q: string) {
    setQuery(q);
    if (q.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    const lower = q.toLowerCase();
    const matches = (cities as City[])
      .filter(
        (c) =>
          c.name.toLowerCase().includes(lower) ||
          c.country.toLowerCase().includes(lower),
      )
      .slice(0, 10);
    setResults(matches);
    setIsOpen(matches.length > 0);
    setActiveIndex(-1);
  }

  function select(city: City) {
    setQuery(`${city.name}, ${city.country}`);
    setIsOpen(false);
    onSelect(city);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      select(results[activeIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => search(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => results.length > 0 && setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        placeholder={placeholder}
        aria-label="Search for a city"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        aria-controls="city-results"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900
                   placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2
                   focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100
                   dark:placeholder:text-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-800"
      />

      {isOpen && (
        <ul
          ref={listRef}
          id="city-results"
          role="listbox"
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border
                     border-gray-200 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800"
        >
          {results.map((city, i) => (
            <li
              key={`${city.name}-${city.country}`}
              role="option"
              aria-selected={i === activeIndex}
              onMouseDown={() => select(city)}
              className={`cursor-pointer px-4 py-2 text-left text-sm
                ${i === activeIndex ? 'bg-blue-100 dark:bg-blue-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                text-gray-900 dark:text-gray-100`}
            >
              <span className="font-medium">{city.name}</span>
              <span className="ml-1 text-gray-500 dark:text-gray-400">
                {city.country}
              </span>
              <span className="float-right text-xs text-gray-400 dark:text-gray-500">
                {city.timezone}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
