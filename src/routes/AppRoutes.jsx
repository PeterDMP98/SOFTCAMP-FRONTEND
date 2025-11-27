import { Routes, Route, Navigate } from "react-router-dom";

// ✅ Páginas públicas
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// ✅ Dashboards por rol
import CampesinoDashboard from "../pages/campesino/CampesinoDashboard";
import CompradorDashboard from "../pages/comprador/CompradorDashboard";

// ✅ Módulo de ganado (solo campesino)
import CampesinoGanado from "../pages/campesino/CampesinoGanado";

// ✅ Ruta protegida centralizada
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>

      {/* RUTAS PUBLICAS */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* RUTAS CAMPESINO */}
      <Route path="/campesino" element={
        <ProtectedRoute allowedGroups={["campesino"]}>
          <CampesinoDashboard />
        </ProtectedRoute>
      } />

      <Route path="/campesino/ganado" element={
        <ProtectedRoute allowedGroups={["campesino"]}>
          <CampesinoGanado />
        </ProtectedRoute>
      } />

      <Route path="/comprador/dashboard" element={
        <ProtectedRoute allowedGroups={["comprador"]}>
          <CompradorDashboard />
        </ProtectedRoute>
      } />


      {/* REDIRECCIÓN ROOT */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* CUALQUIER OTRA RUTA */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}

export default AppRoutes;
