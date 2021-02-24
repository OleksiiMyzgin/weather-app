import { LocationDto } from '../../types';
import { LocationActionTypes } from './actionTypes';

export type AddLocation = {
  type: LocationActionTypes.ADD_LOCATION;
  payload: LocationDto;
};

export type RemoveLocation = {
  type: LocationActionTypes.REMOVE_LOCATION;
  payload: string;
};

export type UpdateLocation = {
  type: LocationActionTypes.UPDATE_LOCATION;
  payload: LocationDto;
};

export type LoadLocation = {
  type: LocationActionTypes.LOAD_LOCATIONS;
  payload: LocationDto[];
};

export const addLocation = (location: LocationDto): AddLocation => ({
  type: LocationActionTypes.ADD_LOCATION,
  payload: location,
});

export const removeLocation = (id: string): RemoveLocation => ({
  type: LocationActionTypes.REMOVE_LOCATION,
  payload: id,
});

export const updateLocation = (location: LocationDto): UpdateLocation => ({
  type: LocationActionTypes.UPDATE_LOCATION,
  payload: location,
});

export const loadLocations = (locations: LocationDto[]): LoadLocation => ({
  type: LocationActionTypes.LOAD_LOCATIONS,
  payload: locations,
});

export type Action = AddLocation | RemoveLocation | UpdateLocation;
