// src/pages/CampesinoDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function CampesinoDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f0f8f4] flex flex-col items-center justify-center text-center p-6">
      <div className="bg-[#f0f8f4] shadow-[9px_9px_16px_#b8b9be,_-9px_-9px_16px_#ffffff] rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-green-700 mb-4">
          🌾 Bienvenido, Campesino
        </h1>
        <p className="text-gray-700 mb-6">
          Este es tu panel principal. Pronto verás tus tareas, siembras y reportes aquí.
        </p>
        <button
          onClick={handleLogout}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl shadow-md transition"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default CampesinoDashboard;
