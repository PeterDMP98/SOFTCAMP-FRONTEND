import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [nombre, setNombre] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [telefonoError, setTelefonoError] = useState("");
  const [direccion, setDireccion] = useState("");
  const [direccionError, setDireccionError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [grupo, setGrupo] = useState(1); // 1 = Campesino, 2 = Comprador
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validarFormulario = () => {
    let nuevosErrores = {};

    if (!nombre.trim()) {
      nuevosErrores.nombre = "Debe ingresar su nombre";
    }

    if (!correo.trim()) {
      nuevosErrores.correo = "Debe ingresar su correo";
    } else if (!/\S+@\S+\.\S+/.test(correo)) {
      nuevosErrores.correo = "Correo no válido";
    }

    if (!password.trim()) {
      nuevosErrores.password = "Debe ingresar una contraseña";
    } else if (password.length < 7) {
      nuevosErrores.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!telefono) {
      nuevosErrores.telefono = "Debe ingresar su teléfono";
    } else if (!/^\d+$/.test(telefono)) {
      nuevosErrores.telefono = "Solo se permiten números";
    } else if (telefono.length !== 10) {
      nuevosErrores.telefono = `El teléfono debe tener 10 números (faltan ${10 - telefono.length})`;
    }

    if (!direccion.trim()) {
      nuevosErrores.direccion = "Debe ingresar su dirección";
    }

    setErrors(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

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
        alert(data.error || "El correo ya está registrado");
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
            className={`bg-[#e0e5ec] rounded-lg shadow-inner p-2 text-gray-700 
            ${errors.nombre ? "border border-red-500" : ""}`}
          />

          {errors.nombre && (
            <p className="text-red-500 text-sm">{errors.nombre}</p>
          )}

          <input type="email" placeholder="Correo" value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className={`bg-[#e0e5ec] rounded-lg shadow-inner p-2 text-gray-700 
            ${errors.correo ? "border border-red-500" : ""}`} />

          {errors.correo && (
            <p className="text-red-500 text-sm">{errors.correo}</p>
          )}

          <input type="password" placeholder="Contraseña" value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`bg-[#e0e5ec] rounded-lg shadow-inner p-2 text-gray-700 
            ${errors.password ? "border border-red-500" : ""}`} />

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <input type="text" placeholder="Teléfono"value={telefono} maxLength={10}
            onChange={(e) => {
              const valor = e.target.value.replace(/\D/g, "");
              setTelefono(valor);
            }}
            className={`bg-[#e0e5ec] rounded-lg shadow-inner p-2 text-gray-700 
            ${errors.telefono ? "border border-red-500" : ""}`}
          />

          {errors.telefono && (
            <p className="text-red-500 text-sm">{errors.telefono}</p>
          )}

          <input type="text" placeholder="Dirección" value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className={`bg-[#e0e5ec] rounded-lg shadow-inner p-2 text-gray-700 
            ${errors.direccion ? "border border-red-500" : ""}`} />

          {errors.direccion && (
            <p className="text-red-500 text-sm">{errors.direccion}</p>
          )}

          <select className="bg-[#e0e5ec] rounded-lg shadow-inner p-2 text-gray-700" value={grupo} onChange={(e) => setGrupo(Number(e.target.value))}>
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
