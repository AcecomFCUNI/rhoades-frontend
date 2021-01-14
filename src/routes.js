import React from 'react';
import { Redirect } from 'react-router-dom';
import { Home, ValidateCredentials, Error401, Error404, SignInAdmin } from 'views';
import { PublicLayout, AdminLayout, ProcuratorLayout, ErrorLayout } from 'layouts';
import { TeacherList, StudentList, UploadDocuments } from 'modules/Procurator'
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
          <Redirect to="/admin/lists/third-of-faculty" />
        ),
      },
      {
        path: '/admin/lists/third-of-faculty',
        exact: true,
        // component: EnrollListUniversityThirdCouncil,
        component: withAuthentication(() => <div>Tercio de facultad</div>, 'admin'),
      },
      {
        path: '/admin/lists/university-third-council',
        exact: true,
        // component: UploadFileNid,
        component: withAuthentication(() => <div>Consejo universitario</div>, 'admin'),
      },
      {
        path: '/admin/lists/university-third-assembly',
        exact: true,
        // component: UploadFileNid,
        component: withAuthentication(() => <div>Asamblea universitaria</div>, 'admin'),
      },
      {
        path: '/admin/lists/dean',
        exact: true,
        // component: UploadFileNid,
        component: withAuthentication(() => <div>Decanato</div>, 'admin'),
      },
      {
        path: '/admin/lists/rector',
        exact: true,
        // component: UploadFileNid,
        component: withAuthentication(() => <div>Rectorado</div>, 'admin'),
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
        path: '/admin-vote',
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