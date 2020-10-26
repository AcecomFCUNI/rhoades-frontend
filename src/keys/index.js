const SALT = process.env.REACT_APP_CRYPTO_SALT;
const IV = process.env.REACT_APP_CRYPTO_IV;
const KEY_PASSWORD = process.env.REACT_APP_CRYPTO_KEY_PASSWORD;
const KEY_JSON = process.env.REACT_APP_CRYPTO_KEY_JSON;

//  production
let API_URL = process.env.REACT_APP_PROD_API_URL;

// development
if (process.env.NODE_ENV !== 'production') {
  API_URL = process.env.REACT_APP_DEV_API_URL;
}

export { API_URL, SALT, IV, KEY_PASSWORD, KEY_JSON };
