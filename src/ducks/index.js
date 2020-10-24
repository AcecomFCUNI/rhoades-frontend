import { combineReducers } from 'redux';
// import { firebaseReducer } from 'react-redux-firebase';
// import { firestoreReducer } from 'redux-firestore';
import alertSnackbarReducer from './alertSnackbar';
import userReducer from './user';

// my ducks

const rootReducer = combineReducers({
  // firebase: firebaseReducer,
  // firestore: firestoreReducer,
  user: userReducer,
  alertSnackbar: alertSnackbarReducer,
});

export default rootReducer;

export * from './alertSnackbar';
export * from './user';
