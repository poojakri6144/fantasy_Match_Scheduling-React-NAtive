import {createStore, combineReducers} from 'redux';
import rootReducer from './matchReducer';

// const rootReducer = combineReducers({
//   match: matchReducer,
// });

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
