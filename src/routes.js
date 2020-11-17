import { AdminLayout } from 'layouts';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Home, ValidateCredentials, Error401, Error404, SignInAdmin } from 'views';
import { PublicLayout, TeacherLayout, StudentLayout, ErrorLayout } from 'layouts';
import withAuthentication from 'hocs/withAuthentication';

export default [
 
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
          <Redirect to="/admin/lists/faculty-third" />
        ),
      },
      {
        path: '/admin/lists/faculty-third',
        exact: true,
        // component: EnrollListUniversityThirdCouncil,
        component: withAuthentication('admin', () => <div>Tercio de facultad</div>),
      },
      {
        path: '/admin/lists/university-third/council',
        exact: true,
        // component: UploadFileNid,
        component: withAuthentication('admin', () => <div>Consejo universitario</div>),
      },
      {
        path: '/admin/lists/university-third/assembly',
        exact: true,
        // component: UploadFileNid,
        component: withAuthentication('admin', () => <div>Asamblea universitaria</div>),
      },
      {
        path: '/admin/lists/decan',
        exact: true,
        // component: UploadFileNid,
        component: withAuthentication('admin', () => <div>Decanato</div>),
      },
      {
        path: '/admin/lists/rectorate',
        exact: true,
        // component: UploadFileNid,
        component: withAuthentication('admin', () => <div>Rectorado</div>),
      },
      {
        component: () => <Redirect to="/error/404" />
      }
    ]
  },
  {
    path: "/teacher",
    component: TeacherLayout,
    routes: [
      {
        path: '/teacher',
        exact: true,
        component: () => (
          <Redirect to="/teacher/enroll-list-or-candidate/decan" />
        ),
      },
      {
        path: '/teacher/enroll-list-or-candidate/decan',
        exact: true,
        // component: EnrollListFacultyThird,
        component: withAuthentication('teacher', () => <div>Decanato</div>),
      },
      {
        path: '/teacher/enroll-list-or-candidate/rectorate',
        exact: true,
        // component: EnrollListUniversityThirdCouncil,
        component: withAuthentication('teacher', () => <div>Rectorado</div>),
      },
      {
        path: '/teacher/upload-files',
        exact: true,
        // component: UploadFileNid,
        component: withAuthentication('teacher', () => <div>Subir documentos</div>),
      },
      {
        component: () => <Redirect to="/error/404" />
      }
    ]
  },
  {
    path: "/student",
    component: StudentLayout,
    routes: [
      {
        path: "/student",
        exact: true,
        component: () => <Redirect to="/student/enroll-list/faculty-third" />
      },
      {
        path: '/student/enroll-list/faculty-third',
        exact: true,
        // component: EnrollListFacultyThird,
        component: withAuthentication('student', () => <div>Tercio de facultad</div>)
      },
      {
        path: '/student/enroll-list/university-third/council',
        exact: true,
        // component: EnrollListUniversityThirdCouncil,
        component: withAuthentication('student', () => <div>Consejo universitario</div>),
      },
      {
        path: '/student/enroll-list/university-third/assembly',
        exact: true,
        // component: EnrollListUniversityThirdAssembly,
        component: withAuthentication('student', () => <div>Asamblea universitaria</div>),
      },
      {
        path: '/student/upload-files',
        exact: true,
        // component: UploadFileNid,
        component: withAuthentication('student', () => <div>Subir documentos</div>),
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

// export default {
//   public: [
//     {
//       path: '/',
//       component: Home,
//     },
//     {
//       path: '/validate-credentials',
//       component: ValidateCredentials,
//     },
//     {
//       path: '/admin-vote',
//       component: SignInAdmin
//     }
//   ],
//   student: [
//     {
//       path: '/student',
//       component: () => <Redirect to="/student/enroll-list/faculty-third" />,
//     },
    // {
    //   path: '/student/enroll-list/faculty-third',
    //   // component: EnrollListFacultyThird,
    //   component: () => <div>Tercio de faculdad</div>,
    // },
    // {
    //   path: '/student/enroll-list/university-third/council',
    //   // component: EnrollListUniversityThirdCouncil,
    //   component: () => <div>Consejo universitario</div>,
    // },
    // {
    //   path: '/student/enroll-list/university-third/assembly',
    //   // component: EnrollListUniversityThirdAssembly,
    //   component: () => <div>Asamblea universitaria</div>,
    // },
    // {
    //   path: '/student/upload-files',
    //   // component: UploadFileNid,
    //   component: () => <div>Subir documentos</div>,
    // },
//   ],
//   teacher: [
    // {
    //   path: '/teacher',
    //   component: () => (
    //     <Redirect to="/teacher/enroll-list-or-candidate/decan" />
    //   ),
    // },
    // {
    //   path: '/teacher/enroll-list-or-candidate/decan',
    //   // component: EnrollListFacultyThird,
    //   component: () => <div>Decanato</div>,
    // },
    // {
    //   path: '/teacher/enroll-list-or-candidate/rectorate',
    //   // component: EnrollListUniversityThirdCouncil,
    //   component: () => <div>Rectorado</div>,
    // },
    // {
    //   path: '/teacher/upload-files',
    //   // component: UploadFileNid,
    //   component: () => <div>Subir documentos</div>,
    // },
//   ],
//   admin: [
    // {
    //   path: '/admin',
    //   component: () => (
    //     <Redirect to="/admin/lists/faculty-third" />
    //   ),
    // },
    // {
    //   path: '/admin/lists/faculty-third',
    //   // component: EnrollListUniversityThirdCouncil,
    //   component: () => <div>Tercio de facultad</div>,
    // },
    // {
    //   path: '/admin/lists/university-third/council',
    //   // component: UploadFileNid,
    //   component: () => <div>Consejo universitario</div>,
    // },
    // {
    //   path: '/admin/lists/university-third/assembly',
    //   // component: UploadFileNid,
    //   component: () => <div>Asamblea universitaria</div>,
    // },
    // {
    //   path: '/admin/lists/decan',
    //   // component: UploadFileNid,
    //   component: () => <div>Decanato</div>,
    // },
    // {
    //   path: '/admin/lists/rectorate',
    //   // component: UploadFileNid,
    //   component: () => <div>Rectorado</div>,
    // },



//   ],
//   error: [
    // {
    //   path: '/error/401',
    //   component: Error401,
    // },

    // {
    //   path: '/error/404',
    //   component: Error404,
    // },
//   ],

  // {
  //   path: '/teacher',
  //   layout: TeacherLayout,
  //   isPrivate: true,
  //   views: [
  // {
  //   path: '/teacher',
  //   component: () => (
  //     <Redirect to="/teacher/enroll-list-or-candidate/decan" />
  //   ),
  // },
  // {
  //   path: '/teacher/enroll-list-or-candidate/decan',
  //   // component: EnrollListFacultyThird,
  //   component: () => <div>Decanato</div>,
  // },
      // {
      //   path: '/teacher/enroll-list-or-candidate/rectorate',
      //   // component: EnrollListUniversityThirdCouncil,
      //   component: () => <div>Rectorado</div>,
      // },
      // {
      //   path: '/teacher/upload-files',
      //   // component: UploadFileNid,
      //   component: () => <div>Subir documentos</div>,
      // },
  //   ],
  // },
  // {
  //   path: '/admin',
  //   layout: AdminLayout,
  //   isPrivate: true,
  //   views: [
      // {
      //   path: '/admin/lists/faculty-third',
      //   // component: EnrollListUniversityThirdCouncil,
      //   component: () => <div>Tercio de facultad</div>,
      // },
      // {
      //   path: '/admin/lists/university-third/aaaa',
      //   // component: UploadFileNid,
      //   component: () => <div>Consejo universitario</div>,
      // },
      // {
      //   path: '/admin/lists/university-third/assembly',
      //   // component: UploadFileNid,
      //   component: () => <div>Asamblea universitaria</div>,
      // },
      // {
      //   path: '/admin/lists/decan',
      //   // component: UploadFileNid,
      //   component: () => <div>Decanato</div>,
      // },
      // {
      //   path: '/admin/lists/rectorate',
      //   // component: UploadFileNid,
      //   component: () => <div>Rectorado</div>,
      // },
  //   ],
  // },
  // {
  //   path: '/error',
  //   layout: ErrorLayout,
  //   isPrivate: false,
  //   views: [
  // {
  //   path: '/error/401',
  //   component: Error401,
  // },

  // {
  //   path: '/error/404',
  //   component: Error404,
  // },
  //   ],
  // },
// };
