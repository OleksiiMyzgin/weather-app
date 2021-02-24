import { LocationActionTypes } from './actionTypes';
import { Action } from './actions';

const INITIAL_STATE = {
  location: null,
};

const currentLocationReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case LocationActionTypes.ADD_CURRENT_LOCATION: {
      return {
        ...state,
        location: action.payload,
      };
    }
    default:
      return state;
  }
};

export default currentLocationReducer;
