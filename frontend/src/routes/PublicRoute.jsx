import { Navigate, Outlet } from 'react-router-dom';
import { PATHS } from './paths';

/**
 * PublicRoute
 * Redirects already-authenticated users away from /login and /signup.
 * Auth logic will be wired in Phase 4 via AuthContext.
 * For now: always allows access (placeholder session = false).
 */
const PublicRoute = () => {
  // TODO: replace with real auth check from AuthContext
  const isAuthenticated = false; // placeholder

  if (isAuthenticated) {
    return <Navigate to={PATHS.DASHBOARD} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
