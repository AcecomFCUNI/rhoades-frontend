import React from 'react';
import { useSelector } from 'react-redux';

import Login from './components/Login';
import Register from './components/Register';
import NoEmail from './components/NoEmail';
import UserNotFound from './components/UserNotFound';

const ValidateCredentials = () => {
  const { data } = useSelector((state) => state.user);
  return !data ? (
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
