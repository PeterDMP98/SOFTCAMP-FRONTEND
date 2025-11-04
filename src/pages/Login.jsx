// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ setIsAuthenticated }) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsAuthenticated(true);

        // Redirigir según el rol
        if (data.user.rol === 1) {
          navigate("/campesino");
        } else if (data.user.rol === 2) {
          navigate("/comprador");
        } else {
          navigate("/dashboard");
        }
      } else {
        alert(data.error || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f8f4] flex items-center justify-center">
      <div className="bg-[#f0f8f4] shadow-[9px_9px_16px_#b8b9be,_-9px_-9px_16px_#ffffff] rounded-2xl p-8 w-96">
        <h2 className="text-2xl text-green-700 font-semibold text-center mb-6">
          Iniciar sesión
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="bg-[#e0e5ec] rounded-lg shadow-inner p-2 text-gray-700 focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#e0e5ec] rounded-lg shadow-inner p-2 text-gray-700 focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl py-2 transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-700">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-green-600 font-medium hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
