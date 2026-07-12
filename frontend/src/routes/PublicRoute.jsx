import { Navigate, Outlet } from 'react-router-dom';
import { PATHS } from './paths';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

/**
 * PublicRoute
 * Redirects already-authenticated users away from /login and /signup.
 * Shows a full-page spinner while the initial session is being restored.
 */
const PublicRoute = () => {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner fullPage label="Loading…" />;
  }

  if (isAuth) {
    return <Navigate to={PATHS.DASHBOARD} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
