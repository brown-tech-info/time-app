export interface City {
  name: string;
  country: string;
  timezone: string;
  /** approximate latitude for geo-distance sorting */
  lat: number;
  /** approximate longitude for geo-distance sorting */
  lng: number;
}

export interface LocationEntry {
  id: string;
  city: City;
}

export type TimeCategory = 'business' | 'early-late' | 'overnight';

export interface TimeComparisonResult {
  location: LocationEntry;
  localTime: Date;
  utcOffset: string;
  category: TimeCategory;
}
