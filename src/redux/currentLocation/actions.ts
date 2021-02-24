import { LocationDto } from '../../types';
import { LocationActionTypes } from './actionTypes';

export type AddLocation = {
  type: LocationActionTypes.ADD_CURRENT_LOCATION;
  payload: LocationDto;
};

export const addCurrentLocation = (location: LocationDto): AddLocation => ({
  type: LocationActionTypes.ADD_CURRENT_LOCATION,
  payload: location,
});

export type Action = AddLocation;
