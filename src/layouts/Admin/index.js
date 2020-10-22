import React from 'react';

import GeneralLayout from 'layouts/General';
import navigationConfig from './components/NavBar/navigationConfig';

const AdminLayout = ({ children }) => (
  <GeneralLayout roleLabel="Admin" navigationConfig={navigationConfig}>
    {children}
  </GeneralLayout>
);

export default AdminLayout;
