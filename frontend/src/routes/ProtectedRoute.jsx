import { Navigate, Outlet } from 'react-router-dom';
import { PATHS } from './paths';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

/**
 * ProtectedRoute
 * Blocks unauthenticated users and redirects to /login.
 * Shows a full-page spinner while the initial session is being restored.
 */
const ProtectedRoute = () => {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner fullPage label="Loading session…" />;
  }

  if (!isAuth) {
    return <Navigate to={PATHS.LOGIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
