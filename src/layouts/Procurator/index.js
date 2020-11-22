import React, { useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import { useDispatch, useSelector } from 'react-redux';

import GeneralLayout from 'layouts/General';
import navigationConfig from './components/NavBar/navigationConfig';
import { findListsByUserIdRequest } from 'ducks'
import { Spinner } from 'components';

const ProcuratorLayout = ({ route }) => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.firebase.auth)
  const lists = useSelector(state => state.lists)

  useEffect(() => {
    dispatch(findListsByUserIdRequest(auth.uid))
  }, [auth.uid, dispatch])
  
  return lists.findLoading ? <Spinner /> :
    <GeneralLayout roleLabel="Personero" navigationConfig={navigationConfig}>
      {renderRoutes(route.routes)}
    </GeneralLayout>
}

export default ProcuratorLayout;
