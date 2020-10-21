import { Home, Error401, Error404 } from 'views';
import { ErrorLayout } from './layouts';

export default [
  {
    path: '/',
    views: [
      {
        path: '/',
        component: Home,
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
