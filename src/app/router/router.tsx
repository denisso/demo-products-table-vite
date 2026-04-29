import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { LazyLoginPage, LazyProductsPage } from '@/app/router/LazyPages';

export const router = createBrowserRouter(
  [
    {
      element: <ProtectedRoute />,
      children: [{ path: '/login', Component: LazyLoginPage }],
    },
    {
      element: <ProtectedRoute />,
      children: [{ path: '/', Component: LazyProductsPage }],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
