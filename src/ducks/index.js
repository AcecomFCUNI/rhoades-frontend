import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import alertSnackbarReducer from './alertSnackbar';

// my ducks

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  alertSnackbar: alertSnackbarReducer,
});

export default rootReducer;

export * from './alertSnackbar';
