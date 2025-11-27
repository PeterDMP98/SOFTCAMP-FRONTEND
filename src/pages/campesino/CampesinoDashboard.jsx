import React, { useEffect, useState } from "react";
import { Sun } from "lucide-react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import CampesinoLayout from "../../layouts/CampesinoLayout";
import { Beef, Sprout, Package, ClipboardList } from "lucide-react";

function CampesinoDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Seguridad: solo campesino puede entrar
  if (!user || user.grupo !== "campesino") {
    return <Navigate to="/login" replace />;
  }

  const [horaActual, setHoraActual] = useState("");
  const [clima, setClima] = useState({
    temp: 22,
    estado: "Soleado",
    icon: <Sun className="w-10 h-10 text-yellow-400" />,
  });

  useEffect(() => {
    const actualizarHora = () => {
      const ahora = new Date();
      setHoraActual(ahora.toLocaleTimeString("es-CO"));
    };

    actualizarHora();
    const intervalo = setInterval(actualizarHora, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const goToGanado = () => {
    navigate("/campesino/ganado");
  };

  return (
    <CampesinoLayout>
      <div className="space-y-6">

        {/* SALUDO */}
        <div className="p-6 bg-white rounded-3xl shadow-[4px_4px_15px_rgba(0,0,0,0.1)]">
          <h1 className="text-2xl font-semibold text-gray-800">
            Hola {user.nombre} 👋
          </h1>
          <p className="text-gray-500">Aquí está tu resumen de hoy</p>
        </div>

        {/* TARJETA DE HORA Y CLIMA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* HORA */}
          <div className="p-6 rounded-3xl bg-[#f7fdfb] shadow-[6px_6px_12px_#d4d7da,_-6px_-6px_12px_#ffffff] flex flex-col justify-center">
            <span className="text-lg text-gray-500">Hora actual</span>
            <span className="text-4xl font-bold text-green-700">{horaActual}</span>
          </div>

          {/* CLIMA */}
          <div className="p-6 rounded-3xl bg-[#f7fdfb] shadow-[6px_6px_12px_#d4d7da,_-6px_-6px_12px_#ffffff] flex items-center justify-between">
            <div>
              <span className="text-lg text-gray-500">Clima</span>
              <p className="text-3xl font-semibold text-green-700">{clima.temp}°C</p>
              <p className="text-gray-500 text-sm">{clima.estado}</p>
            </div>
            {clima.icon}
          </div>

        </div>

        {/* ACCESOS RÁPIDOS */}
        <div>
          <h3 className="text-gray-700 font-medium mb-3">Accesos rápidos</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {/* GANADO */}
            <button
              onClick={goToGanado}
              className="p-5 bg-white rounded-3xl shadow-[4px_4px_15px_rgba(0,0,0,0.1)] hover:scale-105 transition flex flex-col items-center"
            >
              <Beef className="w-10 h-10 text-green-700" />
              <p className="mt-2 text-gray-700 font-medium">Ganado</p>
            </button>

            {/* SIEMBRAS */}
            <button
              className="p-5 bg-white rounded-3xl shadow-[4px_4px_15px_rgba(0,0,0,0.1)] hover:scale-105 transition flex flex-col items-center"
            >
              <Sprout className="w-10 h-10 text-green-700" />
              <p className="mt-2 text-gray-700 font-medium">Siembras</p>
            </button>

            {/* INVENTARIO */}
            <button
              className="p-5 bg-white rounded-3xl shadow-[4px_4px_15px_rgba(0,0,0,0.1)] hover:scale-105 transition flex flex-col items-center"
            >
              <Package className="w-10 h-10 text-green-700" />
              <p className="mt-2 text-gray-700 font-medium">Inventario</p>
            </button>

            {/* TAREAS */}
            <button
              className="p-5 bg-white rounded-3xl shadow-[4px_4px_15px_rgba(0,0,0,0.1)] hover:scale-105 transition flex flex-col items-center"
            >
              <ClipboardList className="w-10 h-10 text-green-700" />
              <p className="mt-2 text-gray-700 font-medium">Tareas</p>
            </button>

          </div>
        </div>


      </div>
    </CampesinoLayout>
  );
}

export default CampesinoDashboard;
