import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { LoginPage } from '@/pages/Login';
import { ProductsPage } from '@/pages';

export const router = createBrowserRouter(
  [
    {
      element: <ProtectedRoute />,
      children: [{ path: '/login', element: <LoginPage /> }],
    },
    {
      element: <ProtectedRoute />,
      children: [{ path: '/', element: <ProductsPage /> }],
    },
  ],
  { basename: '/demo-products-table-vite' },
);
