import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

/* PAGINAS PUBLICAS */
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

/* RUTA PROTEGIDA CENTRAL */
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

/* CAMPESINO */
import CampesinoDashboard from "../pages/campesino/CampesinoDashboard";
import CampesinoGanado from "../pages/campesino/CampesinoGanado";
import CampesinoLotes from "../pages/campesino/CampesinoLotes";
import CampesinoSiembra from "../pages/campesino/CampesinoSiembra";
import CampesinoProductos from "../pages/campesino/CampesinoProductos";
import CampesinoStock from "../pages/campesino/CampesinoStock";
import CampesinoHistorialClinico from "../pages/campesino/CampesinoHistorialClinico";
import CampesinoRegistroPesaje from "../pages/campesino/CampesinoRegistroPesaje";
import CampesinoRegistroReproduccion from "../pages/campesino/CampesinoRegistroReproduccion";
import CampesinoEmpleados from "../pages/campesino/CampesinoEmpleados";
import CampesinoTareas from "../pages/campesino/CampesinoTareas";
import CampesinoConvenios from "../pages/campesino/CampesinoConvenios";
import CampesinoPedidos from "../pages/campesino/CampesinoPedidos";

/* COMPRADOR */
import CompradorDashboard from "../pages/comprador/CompradorDashboard";
import CompradorCatalogo from "../pages/comprador/CompradorCatalogo";
import CompradorCarrito from "../pages/comprador/CompradorCarrito";
import CompradorPedidos from "../pages/comprador/CompradorPedidos";

function AppRoutes() {
  return (
    <Routes>
      {/* Publicas */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protegidas Campesino */}
      <Route
        element={
          <ProtectedRoute allowedGroups={["campesino"]}>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/campesino" element={<CampesinoDashboard />} />
        <Route path="/campesino/ganado" element={<CampesinoGanado />} />
        <Route path="/campesino/lotes" element={<CampesinoLotes />} />
        <Route path="/campesino/siembra" element={<CampesinoSiembra />} />
        <Route path="/campesino/productos" element={<CampesinoProductos />} />
        <Route path="/campesino/stock" element={<CampesinoStock />} />
        <Route path="/campesino/historial-clinico" element={<CampesinoHistorialClinico />} />
        <Route path="/campesino/registro-pesaje" element={<CampesinoRegistroPesaje />} />
        <Route path="/campesino/registro-reproduccion" element={<CampesinoRegistroReproduccion />} />
        <Route path="/campesino/empleados" element={<CampesinoEmpleados />} />
        <Route path="/campesino/tareas" element={<CampesinoTareas />} />
        <Route path="/campesino/convenios" element={<CampesinoConvenios />} />
        <Route path="/campesino/pedidos" element={<CampesinoPedidos />} />
      </Route>

      {/* Protegidas Comprador */}
      <Route
        element={
          <ProtectedRoute allowedGroups={["comprador"]}>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/comprador" element={<CompradorDashboard />} />
        <Route path="/comprador/catalogo" element={<CompradorCatalogo />} />
        <Route path="/comprador/carrito" element={<CompradorCarrito />} />
        <Route path="/comprador/pedidos" element={<CompradorPedidos />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;