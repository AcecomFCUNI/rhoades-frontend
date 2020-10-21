import { Home, ValidateCredentials, Error401, Error404 } from 'views';
import { ErrorLayout, PublicLayout } from './layouts';

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
