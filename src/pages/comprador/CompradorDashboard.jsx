import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function CompradorDashboard() {
  const { user } = useAuth();

  if (!user || user.grupo !== "comprador") {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to="/comprador/catalogo" replace />;
}

export default CompradorDashboard;
