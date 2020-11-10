import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'react-redux-firebase';

import Login from './components/Login';
import Register from './components/Register';
import NoEmail from './components/NoEmail';
import UserNotFound from './components/UserNotFound';
import { getCookie, USER_KEY } from 'tools';
import { storeUserFoundOnCookies } from 'ducks';
import { Redirect } from 'react-router-dom';

const dataFromCookies = getCookie(USER_KEY);

const ValidateCredentials = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.user);
  const profile = useSelector((state) => state.firebase.profile);

  useEffect(() => {
    if (!data && !!dataFromCookies)
      dispatch(storeUserFoundOnCookies(dataFromCookies));
    }, [dispatch, data]);

  return !isEmpty(profile) ? (
    <Redirect to={`/${profile.type.trim()}`} />
  ) : !data ? (
    <UserNotFound />
  ) : !!data.registered ? (
    <Login />
  ) : data.mail.length !== 0 ? (
    <Register />
  ) : (
    <NoEmail />
  );
};

export default ValidateCredentials;
