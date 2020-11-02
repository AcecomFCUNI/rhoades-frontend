import React from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';

const withAuthentication = (type, Component) => () => {
  const { auth, profile } = useSelector((state) => state.firebase);

  if (isEmpty(auth) || (!isEmpty(profile) && profile.type.trim() !== type))
    return <Redirect to="/error/401" />;

  return <Component />;
};

export default withAuthentication;
