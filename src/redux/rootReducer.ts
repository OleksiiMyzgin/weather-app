import { combineReducers } from 'redux';

import currentLocationReducer from './currentLocation/reducer';
import locationReducer from './locations/reducer';

export const rootReducer = combineReducers({
  currentLocation: currentLocationReducer,
  locations: locationReducer,
});
