import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [password, setPassword] = useState("");
  const [grupo, setGrupo] = useState(1); // 1 = Campesino, 2 = Comprador
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          correo,
          telefono,
          direccion,
          password,
          id_grupo: grupo
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Error al registrar usuario");
        return;
      }

      alert("Usuario registrado con éxito");
      navigate("/login");

    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Error de conexión con el servidor");
    }
  };


  return (
    <div className="min-h-screen bg-[#f0f8f4] flex items-center justify-center">
      <div className="bg-[#f0f8f4] shadow-[9px_9px_16px_#b8b9be,_-9px_-9px_16px_#ffffff] rounded-2xl p-8 w-96">
        <h2 className="text-2xl text-green-700 font-semibold text-center mb-6">
          Registro de usuario
        </h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input type="text" placeholder="Nombre" value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="bg-[#e0e5ec] rounded-lg shadow-inner p-2 text-gray-700" />

          <input type="email" placeholder="Correo" value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="bg-[#e0e5ec] rounded-lg shadow-inner p-2 text-gray-700" />

          <input type="password" placeholder="Contraseña" value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#e0e5ec] rounded-lg shadow-inner p-2 text-gray-700" />
          
          <input type="text" placeholder="Teléfono" value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="bg-[#e0e5ec] rounded-lg shadow-inner p-2 text-gray-700" />

          <input type="text" placeholder="Dirección" value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="bg-[#e0e5ec] rounded-lg shadow-inner p-2 text-gray-700" />


          <select value={grupo} onChange={(e) => setGrupo(Number(e.target.value))}>
            <option value={1}>Campesino</option>
            <option value={2}>Comprador</option>
          </select>


          <button type="submit"
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl py-2 transition">
            Registrarse
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-700">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-green-600 font-medium hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
