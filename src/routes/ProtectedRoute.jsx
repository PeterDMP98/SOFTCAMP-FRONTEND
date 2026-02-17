import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children, allowedGroups }) => {
  const { user, token } = useAuth();

  // ⛔ No autenticado
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  const userGroup = user.grupo?.toLowerCase();

  // ⛔ Rol no permitido
  if (allowedGroups && !allowedGroups.includes(userGroup)) {
    if (userGroup === "campesino") {
      return <Navigate to="/campesino" replace />;
    }
    if (userGroup === "comprador") {
      return <Navigate to="/comprador" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
