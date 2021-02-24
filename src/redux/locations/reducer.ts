import { Location } from '../../types';
import { LocationActionTypes } from './actionTypes';
import { Action } from './actions';

const INITIAL_STATE: Location = {
  byId: {},
  allIds: [],
};

const locationReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case LocationActionTypes.ADD_LOCATION: {
      const allIds = [...state.allIds, action.payload.id];
      const byId = { ...state.byId, [action.payload.id]: action.payload };
      return {
        ...state,
        allIds,
        byId,
      };
    }
    case LocationActionTypes.REMOVE_LOCATION: {
      const allIds = state.allIds.filter((id) => id !== action.payload);
      const byId = { ...state.byId };
      delete byId[action.payload];

      return {
        ...state,
        allIds,
        byId,
      };
    }
    case LocationActionTypes.UPDATE_LOCATION: {
      const allItems = { ...state.byId, [action.payload.id]: action.payload };
      return {
        ...state,
        byId: allItems,
      };
    }
    default:
      return state;
  }
};

export default locationReducer;
