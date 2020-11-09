# Changelog

## 1.3.3

### Added

- A production mode has been created on Netlify.

## 1.3.2

### Added

- A production mode has been created on Netlify.

## 1.3.1a

### Hotfix

- The cookie belongs to `/validate-credentials` path.

## 1.3.1

### Updated

- Validate credentials page redirects you if you has logged in before.

## 1.3.0

### Added

- [`universal-cookie`](https://www.npmjs.com/package/universal-cookie) was added for storing and getting cookies from the browser.
- New view was added in case if the user doesn't have an email associated to their info in the database.

### Updated

- [`firebase`](https://www.npmjs.com/package/firebase), [`react-redux-firebase`](https://www.npmjs.com/package/react-redux-firebase) and [`redux-firestore`](https://www.npmjs.com/package/redux-firestore) deps were added into the project.
- We use [Firebase Authentication](https://firebase.google.com/docs/auth) in order to auth the user into the system.

## 1.2.1a

### Hotfix

- The `API_URL` in production mode was fixed.

## 1.2.1

### Updated

- Now the requests depends of `NODE_ENV` in order to use `development` or `production` API.
- When you click on generate password, the view changes to the login page (while is loading a backdrop is displayed).

## 1.2.0a

### Hotfix

- Store set in mode prod.

## 1.2.0

### Added

- The generate password button from validate credentials (register) page now works and send an email to the user with their password.

### Updated

- The user data that we get from API now is encrypted and decrypted from frontend.
- The routes from backend was updated.
- The encrypted user dada is saved in cookies.

### Reminder

- Redirect or change the view when the user clicks on generate password button.

## 1.1.3

### Updated

- The font sizes from the home and validate credentials page were updated.

## 1.1.2

### Updated

- Now the validate credentials page redirects if you don't have a password created in the database.

## 1.1.1

### Updated

- [`firebase`](https://www.npmjs.com/package/firebase), [`react-redux-firebase`](https://www.npmjs.com/package/react-redux-firebase) and [`redux-firestore`](https://www.npmjs.com/package/redux-firestore) deps were removed from the project.
- Now the user data found by UNI code, DNI or CE is persistant using cookies.

## 1.1.0

### Added

- Now we are connected to the [`backend`](https://acecom-rhoades.herokuapp.com/)
- Find user by code and condition duck and saga were created.
- Request tools with [`axios`] were created.
- Now the home page input field validates the `code`, `documentType` and `condition` that you enter with the database.

### Updated

- The unauthorized (401) page was stylized and is responsive now.

## 1.0.8

### Added

- Alert snackbar component has been created in order to display a message in case of `success` or `error`.

### Updated

- Now when the home page validates the input then displays the alert snackbar.

## 1.0.7

### Updated

- Now the input field from home page validate DNI, CE and UNI code in order to search it then in the database.

## 1.0.6a

### Updated

### Hotfix

- Overflow in home and notFound page were fixed.

## 1.0.6

### Added

- New switch to change the condition of the user between `teacher` and `student`.
- Illustrations were added from [`unDraw`](https://undraw.co/illustrations).
- The not found (404) page was stylized and is responsive now.

### Updated

- The register and not authorized on list pages now are responsive

## 1.0.5

### Updated

- The validate credentials page now is responsive.

## 1.0.4

### Updated

- The home page now is responsive.

## 1.0.3c

### Hotfix

- Names of the dashboard menu was corrected.

## 1.0.3b

### Hotfix

- Title was corrected.
- Favicon was added.

## 1.0.3a

### Hotfix

- Store set in mode prod.
- Added the file for redirects (netlify).

## 1.0.3

### Added

- Basic boilerplate for each type of user.

### Reminder

- Add logic for login to each type of user.
- Complete the views.

## 1.0.2

### Added

- Validate credentials page was created

### Reminder

- Add logic in order to validate the credentials (DNI/codeUNI with password) and register or login to the system.
- Add images to respective sites.

## 1.0.1

### Added

- Home page was created.

### Reminder

- Add logic to the input field.

## 1.0.0

- This project was bootstrapped with [`Create React App`](https://create-react-app.dev/docs/getting-started/).
- And will use the next libraries/frameworks:
  - [`@material-ui/core`](https://www.npmjs.com/package/@material-ui/core) in order to create the stylized components.
  - [`@material-ui/icons`](https://www.npmjs.com/package/@material-ui/icons) in order to use Material icons.
  - [`@material-ui/lab`](https://www.npmjs.com/package/@material-ui/lab) in order to create the stylized components from `material-lab`.
  - [`axios`](https://www.npmjs.com/package/axios) in order to make http requests to the backend.
  - [`firebase`](https://www.npmjs.com/package/firebase) in order to use [`Firebase`](https://firebase.google.com/?hl=en).
  - [`react-redux`](https://www.npmjs.com/package/react-redux) in order to integrate redux with react.
  - [`react-redux-firebase`](https://www.npmjs.com/package/react-redux-firebase) in order to integrate firebase with react and redux.
  - [`redux`](https://www.npmjs.com/package/redux) in order to manage the state of the application.
  - [`redux-firestore`](https://www.npmjs.com/package/redux-firestore) in order to integrate firestore with redux.
  - [`redux-saga`](https://www.npmjs.com/package/redux-saga) in order to make asynchronous things like data fetching, etc.
  - [`validate.js`](https://www.npmjs.com/package/validate.js) in order to validate form fields.
  - [`webfontloader`](https://www.npmjs.com/package/webfontloader) in order to customize the font family.
