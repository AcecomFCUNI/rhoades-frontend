import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Error401 } from 'views';
import Login from './components/Login';
import Register from './components/Register';

import { showAlertSnackbar } from 'ducks/alertSnackbar';
import { storeUserFoundOnCookies } from 'ducks/user';
import {
  getCookie,
  decryptJsonFromString,
  getObjectFromString,
  USER_KEY,
  USER_SUCCESSFULLY_LOADED,
} from 'tools';
import { KEY_JSON } from 'keys';

const ValidateCredentials = () => {
  // const [status] = useState('register');
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.user);

  useEffect(() => {
    const currentUser = getCookie(USER_KEY);

    // if data is null set the info from cookies
    if (!data) {
      if (!currentUser) {
        const noValues = {
          searchParams: null,
          data: null,
        };
        dispatch(storeUserFoundOnCookies(noValues));
      } else {
        const currentUserJson = getObjectFromString(currentUser);
        dispatch(
          storeUserFoundOnCookies({
            searchParams: currentUserJson.searchParams,
            data: decryptJsonFromString(currentUserJson.data, KEY_JSON),
          })
        );
        dispatch(showAlertSnackbar(USER_SUCCESSFULLY_LOADED));
      }
    }
  }, [data, dispatch]);

  // if data is null return error401, if not check
  // if data.password exists -> Login | if not -> Register
  return !data ? <Error401 /> : !!data.password ? <Login /> : <Register />;
};

export default ValidateCredentials;
