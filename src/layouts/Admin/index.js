import React from 'react';
import { renderRoutes } from 'react-router-config';

import GeneralLayout from 'layouts/General';
import navigationConfig from './components/NavBar/navigationConfig';

const AdminLayout = ({ route }) => (
  <GeneralLayout roleLabel="Admin" navigationConfig={navigationConfig}>
    {renderRoutes(route.routes)}
  </GeneralLayout>
);

export default AdminLayout;
