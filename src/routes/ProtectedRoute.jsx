import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedGroups }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) return <Navigate to="/login" replace />;

  const userGroup = user.grupo?.toLowerCase();

  if (allowedGroups && !allowedGroups.includes(userGroup)) {
    if (userGroup === "campesino") return <Navigate to="/campesino/dashboard" replace />;
    if (userGroup === "comprador") return <Navigate to="/comprador/dashboard" replace />;
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
