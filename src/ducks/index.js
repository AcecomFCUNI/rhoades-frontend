import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

// my ducks
import alertSnackbarReducer from './alertSnackbar';
import userReducer from './user';
import listsReducer from './lists';

const rootReducer = combineReducers({
  user: userReducer,
  lists: listsReducer,
  alertSnackbar: alertSnackbarReducer,
  firebase: firebaseReducer
});

export default rootReducer;

export * from './alertSnackbar';
export * from './user';
export * from './lists';
