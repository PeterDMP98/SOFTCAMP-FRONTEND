// src/App.jsx
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CampesinoDashboard from "./pages/CampesinoDashboard";
import CompradorDashboard from "./pages/CompradorDashboard";

function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Comprobamos si hay usuario logueado en localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user);
  }, []);

  // Determinar si estamos en páginas públicas
  const publicRoutes = ["/", "/login", "/register"];
  const isPublic = publicRoutes.includes(location.pathname);

  return (
    <div>
      {/* Navbar solo si el usuario está autenticado */}
      {!isPublic && isAuthenticated && (
        <nav className="p-4 bg-[#e3ffe9] flex justify-center gap-6 shadow-md">
          <Link to="/campesino" className="text-green-700 font-medium hover:text-green-800">
            Campesino
          </Link>
          <Link to="/comprador" className="text-green-700 font-medium hover:text-green-800">
            Comprador
          </Link>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/campesino" element={<CampesinoDashboard />} />
        <Route path="/comprador" element={<CompradorDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
