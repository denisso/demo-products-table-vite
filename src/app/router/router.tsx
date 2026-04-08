import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './protected-route';
import { LoginPage } from '@/pages/login';
import { ProductsPage } from '@/pages/products';

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [{ path: '/login', element: <LoginPage /> }],
  },
  {
    element: <ProtectedRoute />,
    children: [{ path: '/', element: <ProductsPage /> }],
  },
]);
