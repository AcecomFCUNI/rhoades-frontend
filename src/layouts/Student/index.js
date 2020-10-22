import React from 'react';

import GeneralLayout from 'layouts/General';
import navigationConfig from './components/NavBar/navigationConfig';

const StudentLayout = ({ children }) => (
  <GeneralLayout roleLabel="Alumno" navigationConfig={navigationConfig}>
    {children}
  </GeneralLayout>
);

export default StudentLayout;
