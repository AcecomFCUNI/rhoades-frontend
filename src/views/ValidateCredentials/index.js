import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Login from './components/Login';
import Register from './components/Register';
// import Unauthorized from './components/Unauthorized';
import { Error401 } from 'views';

const ValidateCredentials = () => {
  const [status] = useState('register');
  const { data } = useSelector((state) => state.user);

  // TODO: check if the credentials are valid and if
  // will register or login

  // TODO: discutir si tiene sentido la vista de que no figura
  // en el padron, ya que no tiene sentido porque de eso depende
  // la base de datos y si no esta en el padron ni si quiera aparecera
  // un resultado al hacer una request a la api

  // TODO: discutir el tema de la contrasena y si seria mejor que
  // me envie un status (booleano) de registrado o no para evitar tener que
  // recibir en el body el password hasheado

  if (!data) return <Error401 />;

  if (status === 'login') return <Login />;
  // if (status === 'register') return <Register />;

  return <Register />;
};

export default ValidateCredentials;
