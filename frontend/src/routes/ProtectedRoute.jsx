import { Navigate, Outlet } from 'react-router-dom';
import { PATHS } from './paths';

/**
 * ProtectedRoute
 * Blocks unauthenticated users and redirects to /login.
 * Auth logic will be wired in Phase 4 via AuthContext.
 * For now: always allows access (placeholder session = true).
 */
const ProtectedRoute = () => {
  // TODO: replace with real auth check from AuthContext
  const isAuthenticated = true; // placeholder

  if (!isAuthenticated) {
    return <Navigate to={PATHS.LOGIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
