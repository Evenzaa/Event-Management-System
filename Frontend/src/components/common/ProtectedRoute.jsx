import { Navigate, useLocation } from 'react-router-dom';

/**
 * ProtectedRoute
 * ---------------------------------------------------------------
 * requiredRole="admin"  → only admins can access
 * requiredRole="user"   → any logged-in user
 * no requiredRole       → just needs to be logged in
 *
 * Not logged in  → /login?from=<current path>
 * Wrong role     → / (home, no error shown)
 * Correct        → renders children
 * ---------------------------------------------------------------
 */
export default function ProtectedRoute({ children, requiredRole = null }) {
  const location = useLocation();

  const token = localStorage.getItem('authToken');
  const user  = (() => {
    try { return JSON.parse(localStorage.getItem('user')); }
    catch { return null; }
  })();

  if (!token || !user) {
    return <Navigate to={`/login?from=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
