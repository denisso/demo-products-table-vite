import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useTokenStore } from '@/shared/lib/token';

export function ProtectedRoute() {
  const location = useLocation();
  const token = useTokenStore((s) => s.token);

  if (location.pathname == '/login') {
    if (token) return <Navigate to='/' replace />;
  }
  else{
    if (!token) return <Navigate to='/login' replace />;
  }
  return <Outlet />;
}
