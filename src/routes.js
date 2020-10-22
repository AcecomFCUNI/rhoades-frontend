import React from 'react';
import { Home, ValidateCredentials, Error401, Error404 } from 'views';
import {
  ErrorLayout,
  PublicLayout,
  StudentLayout,
  TeacherLayout,
  AdminLayout,
} from './layouts';

export default [
  {
    path: '/',
    layout: PublicLayout,
    views: [
      {
        path: '/',
        component: Home,
      },
      {
        path: '/validate-credentials',
        component: ValidateCredentials,
      },
    ],
  },
  {
    path: '/student',
    layout: StudentLayout,
    views: [
      {
        path: '/student/enroll-list/faculty-third',
        // component: EnrollListFacultyThird,
        component: () => <div>Tercio de faculdad</div>,
      },
      {
        path: '/student/enroll-list/university-third/council',
        // component: EnrollListUniversityThirdCouncil,
        component: () => <div>Consejo universitario</div>,
      },
      {
        path: '/student/enroll-list/university-third/assembly',
        // component: EnrollListUniversityThirdAssembly,
        component: () => <div>Asamblea universitaria</div>,
      },
      {
        path: '/student/upload-files',
        // component: UploadFileNid,
        component: () => <div>Subir documentos</div>,
      },
    ],
  },
  {
    path: '/teacher',
    layout: TeacherLayout,
    views: [
      {
        path: '/teacher/enroll-list-or-candidate/decan',
        // component: EnrollListFacultyThird,
        component: () => <div>Decanato</div>,
      },
      {
        path: '/teacher/enroll-list-or-candidate/rectorate',
        // component: EnrollListUniversityThirdCouncil,
        component: () => <div>Rectorado</div>,
      },
      {
        path: '/teacher/upload-files',
        // component: UploadFileNid,
        component: () => <div>Subir documentos</div>,
      },
    ],
  },
  {
    path: '/admin',
    layout: AdminLayout,
    views: [
      {
        path: '/admin/lists/faculty-third',
        // component: EnrollListUniversityThirdCouncil,
        component: () => <div>Tercio de facultad</div>,
      },
      {
        path: '/admin/lists/university-third/council',
        // component: UploadFileNid,
        component: () => <div>Consejo universitario</div>,
      },
      {
        path: '/admin/lists/university-third/assembly',
        // component: UploadFileNid,
        component: () => <div>Asamblea universitaria</div>,
      },
      {
        path: '/admin/lists/decan',
        // component: UploadFileNid,
        component: () => <div>Decanato</div>,
      },
      {
        path: '/admin/lists/rectorate',
        // component: UploadFileNid,
        component: () => <div>Rectorado</div>,
      },
    ],
  },
  {
    path: '/error',
    layout: ErrorLayout,
    views: [
      {
        path: '/error/401',
        component: Error401,
      },

      {
        path: '/error/404',
        component: Error404,
      },
    ],
  },
];
