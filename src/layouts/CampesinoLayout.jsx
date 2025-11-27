import React, { useState } from "react";
import { Menu, X, Beef, ListTodo, Sprout, Home, LogOut } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function CampesinoLayout({ children }) {
  const [open, setOpen] = useState(true);
  const { user, logout } = useAuth();

  // Seguridad: solo campesino puede usar este layout
  if (!user || user.grupo !== "campesino") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[#f0f8f4]">

      {/* Menú lateral */}
      <aside
        className={`
          ${open ? "w-64" : "w-20"}
          bg-[#f0f8f4] shadow-[9px_9px_16px_#b8b9be,_-9px_-9px_16px_#ffffff]
          transition-all duration-300 p-4 flex flex-col
        `}
      >

        {/* Botón para abrir/cerrar */}
        <button
          onClick={() => setOpen(!open)}
          className="mb-8 flex items-center gap-2 text-green-600"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Ítems del menú */}
        <nav className="flex flex-col gap-4">

          <Link
            to="/campesino"
            className="flex items-center gap-3 p-3 rounded-xl 
            hover:bg-green-100 transition"
          >
            <Home size={22} className="text-green-700" />
            {open && <span className="text-gray-700">Inicio</span>}
          </Link>

          <Link
            to="/campesino/ganado"
            className="flex items-center gap-3 p-3 rounded-xl 
            hover:bg-green-100 transition"
          >
            <Beef size={22} className="text-green-700" />
            {open && <span className="text-gray-700">Ganado</span>}
          </Link>

          <Link
            to="/campesino/tareas"
            className="flex items-center gap-3 p-3 rounded-xl 
            hover:bg-green-100 transition"
          >
            <ListTodo size={22} className="text-green-700" />
            {open && <span className="text-gray-700">Tareas</span>}
          </Link>

          <Link
            to="/campesino/siembras"
            className="flex items-center gap-3 p-3 rounded-xl 
            hover:bg-green-100 transition"
          >
            <Sprout size={22} className="text-green-700" />
            {open && <span className="text-gray-700">Siembras</span>}
          </Link>

        </nav>

        {/* Logout */}
        <button
          onClick={logout}
          className="mt-auto flex items-center gap-3 p-3 text-red-600 hover:bg-red-100 rounded-xl"
        >
          <LogOut size={22} />
          {open && <span>Cerrar sesión</span>}
        </button>

      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-xl font-semibold text-green-700 mb-4">
          Bienvenido, {user.nombre}
        </h2>

        {children}
      </main>
    </div>
  );
}

export default CampesinoLayout;
