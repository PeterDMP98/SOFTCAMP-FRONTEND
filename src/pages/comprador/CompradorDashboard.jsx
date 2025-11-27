import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function CompradorDashboard() {
  const { user } = useAuth();

  // Seguridad: solo compradores pueden entrar
  if (!user || user.grupo !== "comprador") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#f0f8f4] p-10">
      <div className="max-w-3xl mx-auto space-y-6">


        <div className="p-6 bg-white rounded-3xl shadow-md">
          <h1 className="text-2xl font-semibold text-gray-800">
            Bienvenido {user.nombre} 🛍️
          </h1>
          <p className="text-gray-600">
            Aquí podrás explorar ganado disponible y gestionar tus compras.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="p-6 bg-white rounded-3xl shadow-md hover:scale-105 transition">
            <p className="text-xl font-semibold text-green-700">Explorar Ganado</p>
            <p className="text-gray-600 text-sm mt-2">
              Próximamente podrás ver animales disponibles y hacer ofertas.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl shadow-md hover:scale-105 transition">
            <p className="text-xl font-semibold text-green-700">Historial de Compras</p>
            <p className="text-gray-600 text-sm mt-2">
              Lleva registro de tus transacciones en la plataforma.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CompradorDashboard;
