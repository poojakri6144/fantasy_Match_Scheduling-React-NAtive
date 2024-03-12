import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deleteMatches, scheduledMatchesList} from '../utils/db';

const initialState = {
  matches: [],
  viewMatch: [],
};

const matchReducer = async (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MATCH':
      await AsyncStorage.setItem(
        'scheduledMatches',
        JSON.stringify(action.payload),
      );

      break;
    case 'UPDATE_MATCH':
      return {
        ...state,
        matches: state.matches.map(match =>
          match.id === action.payload.id ? action.payload : match,
        ),
      };
    case 'VIEW_MATCH':
      const updatedMatches = scheduledMatchesList(); // Assuming scheduledMatchesList() returns data
      return {
        // ...state,
        viewMatch: updatedMatches,
      };
    case 'DELETE_MATCH':
      deleteMatches(action.payload);
      break;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  matches: matchReducer,
});

export default rootReducer;
