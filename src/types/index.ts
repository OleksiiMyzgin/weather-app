import { Location, LocationDto } from './location';

export * from './location';

export interface RootState {
  locations: Location;
  currentLocation: { location: LocationDto | null };
}
