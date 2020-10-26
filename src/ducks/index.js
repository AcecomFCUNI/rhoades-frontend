import { combineReducers } from 'redux';

// my ducks
import alertSnackbarReducer from './alertSnackbar';
import userReducer from './user';

const rootReducer = combineReducers({
  user: userReducer,
  alertSnackbar: alertSnackbarReducer,
});

export default rootReducer;

export * from './alertSnackbar';
export * from './user';
