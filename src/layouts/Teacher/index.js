import React from 'react';

import GeneralLayout from 'layouts/General';
import navigationConfig from './components/NavBar/navigationConfig';

const TeacherLayout = ({ children }) => (
  <GeneralLayout roleLabel="Docente" navigationConfig={navigationConfig}>
    {children}
  </GeneralLayout>
);

export default TeacherLayout;
