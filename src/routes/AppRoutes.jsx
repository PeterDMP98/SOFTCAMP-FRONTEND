import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

/* PAGINAS PUBLICAS */
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

/* RUTA PROTEGIDA CENTRAL */
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";


/* PROTEGIDAS POR ROL*/

// ✅ Dashboards por rol

// Campesino
import CampesinoDashboard from "../pages/campesino/CampesinoDashboard";
import CampesinoGanado from "../pages/campesino/CampesinoGanado";

// Comprador
import CompradorDashboard from "../pages/comprador/CompradorDashboard";

/* - CONFIGURACION - */

function AppRoutes() {
  return (
    <Routes>

      {/* Públicas */}

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>


      {/* Protegidas */}
      <Route
        element={
          <ProtectedRoute allowedGroups={["campesino", "comprador"]}>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/campesino" element={<CampesinoDashboard />} />
        <Route path="/campesino/ganado" element={<CampesinoGanado />} />

        <Route path="/comprador" element={<CompradorDashboard />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}

export default AppRoutes;
