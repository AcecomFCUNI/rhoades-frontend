import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import Login from './components/Login';
import Register from './components/Register';
import { Error401 } from 'views';
import {
  getCookie,
  getObjectFromString,
  USER_SUCCESSFULLY_LOADED,
  USER_KEY,
} from 'tools';
import { showAlertSnackbar, storeUserFoundOnCookies } from 'ducks';

const ValidateCredentials = () => {
  // const [status] = useState('register');
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.user);

  useEffect(() => {
    const dataFromCookies = getObjectFromString(getCookie(USER_KEY));

    // if data is null set the info from cookies
    if (!data) {
      if (!dataFromCookies) {
        const noValues = {
          searchParams: null,
          data: null,
        };

        dispatch(storeUserFoundOnCookies(noValues));
      } else {
        dispatch(storeUserFoundOnCookies(dataFromCookies));
        dispatch(showAlertSnackbar(USER_SUCCESSFULLY_LOADED));
      }
    }
  }, [data, dispatch]);

  // if data is null return error401, if not just return register
  return !data ? <Error401 /> : <Register />;

  // TODO: check if the credentials are valid and if
  // will register or login
};

export default ValidateCredentials;
