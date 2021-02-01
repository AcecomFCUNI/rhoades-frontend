import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@material-ui/core';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

import firebase from 'firebase/app';
import firebaseConfig from 'firebase/config';
import 'firebase/auth';
import 'firebase/firestore';
import WebFont from 'webfontloader';

import configureStore from 'store';
import theme from 'theme';
import App from './App';
import './index.css';
import { USERS_NAME_COLLECTION } from 'keys';

const rrfConfig = {
  userProfile: USERS_NAME_COLLECTION,
  useFirestoreForProfile: true,
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const store = configureStore();

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
};

// adding fonts from GoogleFonts
WebFont.load({
  google: {
    families: ['Raleway:100,200,300,400,500,600', 'Nunito:200,300,400,600,700,800,900', 'Passion One:400', 'Quicksand:100,200,300,400'],
  },
});

ReactDOM.render(
  <StoreProvider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <ThemeProvider theme={theme}>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </ReactReduxFirebaseProvider>
  </StoreProvider>,
  document.getElementById('root')
);
