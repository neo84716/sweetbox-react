import { Navigate } from "react-router-dom";
import { getToken } from "../../src/utils/auth";
import useAuth from "../../hooks/useAuth"

function ProtectedRoute({ children, requireAdmin = false }) {
  const token = getToken();
  const { user } = useAuth();

  // if (!token) {
  //   return <Navigate to="/login" replace />;
  // }

  if (!user) {
    return <Navigate to="/login" replace />
  }
  if (requireAdmin && !user.isAdmin) {
    return <Navigate to="/" replace />
  }
  return children;
}

export default ProtectedRoute;