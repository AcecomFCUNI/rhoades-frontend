import React, { useState } from 'react';

import Login from './components/Login';
import Register from './components/Register';
import Unauthorized from './components/Unauthorized';

const ValidateCredentials = () => {
  const [status] = useState('login');

  // TODO: check if the credentials are valid and if
  // will register or login

  if (status === 'login') return <Login />;
  if (status === 'register') return <Register />;
  return <Unauthorized />;
};

export default ValidateCredentials;
