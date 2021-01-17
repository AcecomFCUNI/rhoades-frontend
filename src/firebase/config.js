// PROD
let firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY_PROD,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN_PROD,
  databaseURL: process.env.REACT_APP_DB_URL_PROD,
  projectId: process.env.REACT_APP_PROJECT_ID_PROD,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET_PROD,
  messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID_PROD,
  appId: process.env.REACT_APP_FIREBASE_APP_ID_PROD,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID_PROD
};

// DEV
if (process.env.REACT_APP_MODE !== 'production') {
  firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY_DEV,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN_DEV,
    databaseURL: process.env.REACT_APP_DB_URL_DEV,
    projectId: process.env.REACT_APP_PROJECT_ID_DEV,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET_DEV,
    messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID_DEV,
    appId: process.env.REACT_APP_FIREBASE_APP_ID_DEV,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID_DEV
  }
}

export default firebaseConfig;
