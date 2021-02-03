import React from 'react';
import { Redirect } from 'react-router-dom';
import { Home, ValidateCredentials, Error401, Error404, SignInAdmin } from 'views';
import { PublicLayout, AdminLayout, ProcuratorLayout, ErrorLayout } from 'layouts';
import { TeacherList, StudentList, UploadDocuments } from 'modules/Procurator'
import { GeneralElections, FacultyElections } from 'modules/Admin'
import withAuthentication from 'hocs/withAuthentication';

const routes = [
 
  {
    path: "/error",
    component: ErrorLayout,
    routes: [
      {
        path: '/error/401',
        exact: true,
        component: Error401,
      },
      
      {
        path: '/error/404',
        exact: true,
        component: Error404,
      },
      {
        component: () => <Redirect to="/error/404" />
      }
    ]
  },
  // the next routes are private, so we need to wrap them using withAuthentication()
  {
    path: '/admin',
    component: AdminLayout,
    routes: [
      {
        path: '/admin',
        exact: true,
        component: () => (
          <Redirect to="/admin/elections/general" />
        ),
      },
      {
        path: '/admin/elections/general',
        exact: true,
        component: withAuthentication(GeneralElections, 'admin'),
      },
      {
        path: '/admin/elections/faculty',
        exact: true,
        component: withAuthentication(FacultyElections, 'admin'),
      },
      {
        component: () => <Redirect to="/error/404" />
      }
    ]
  },
  {
    path: "/procurator",
    component: ProcuratorLayout,
    routes: [
      {
        path: '/procurator',
        exact: true,
        component: () => (
          <Redirect to="/procurator/enroll/teacher-list" />
        ),
      },
      {
        path: '/procurator/enroll/teacher-list',
        exact: true,
        component: withAuthentication(TeacherList, 'procurator'),
      },
      {
        path: '/procurator/enroll/student-list',
        exact: true,
        component: withAuthentication(StudentList, 'procurator'),
      },
      {
        path: '/procurator/upload-files',
        exact: true,
        component: withAuthentication(UploadDocuments, 'procurator'),
      },
      {
        component: () => <Redirect to="/error/404" />
      }
    ]
  },
  {
    path: '/',
    component: PublicLayout,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/validate-credentials',
        exact: true,
        component: ValidateCredentials,
      },
      {
        path: '/committee-member',
        exact: true,
        component: SignInAdmin
      },
      {
        component: () => <Redirect to="/error/404" />
      }
    ]
  },
  {
    component: () => <Redirect to="/error/404" />
  },
]

export default routes