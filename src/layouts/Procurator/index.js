import React from 'react';
import { renderRoutes } from 'react-router-config';

import GeneralLayout from 'layouts/General';
import navigationConfig from './components/NavBar/navigationConfig';

const StudentLayout = ({ route }) => (
  <GeneralLayout roleLabel="Personero" navigationConfig={navigationConfig}>
    {renderRoutes(route.routes)}
  </GeneralLayout>
);

export default StudentLayout;
