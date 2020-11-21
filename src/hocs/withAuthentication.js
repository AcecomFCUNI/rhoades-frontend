import React from 'react';
import { useSelector } from 'react-redux';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';

const withAuthentication = (Component, condition) => () => {
  const { auth, profile } = useSelector((state) => state.firebase);

  if (isLoaded(auth) && isEmpty(auth) && isLoaded(profile) && !isEmpty(profile))
    return <Redirect to="/error/401" />;
  
  if (condition === 'procurator') {
    if (profile.condition !== 'student' && profile.condition !== 'teacher') 
      return <Redirect to="/error/401" />;
  }
  
  else if(profile.condition !== condition)
    return <Redirect to="/error/401" />;
  
  return <Component />

};

export default withAuthentication;
