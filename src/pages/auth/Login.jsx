import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password }),
      });

      const data = await response.json();
      console.log("RESPUESTA LOGIN:", data);

      if (!response.ok) {
        setErrorMsg(data.message || "Credenciales incorrectas");
        return;
      }
      
      if (!data.user || !data.token) {
        
        setErrorMsg("Respuesta inválida del servidor");
        return;
      }

      // Guardar usuario y token mediante AuthContext
      login(data.user, data.token);

      // Redirigir según grupo de rol
      const grupo = data.user.grupo.toLowerCase();

      if (grupo === "campesino") {
        navigate("/campesino");
      }
      else if (grupo === "comprador") {
        navigate("/comprador");
      }
      else {
        setErrorMsg("Grupo de usuario no válido");
      }



    } catch (error) {
      console.error("Error en login:", error);
      setErrorMsg("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f8f4] flex items-center justify-center">
      <div className="bg-[#f0f8f4] shadow-[9px_9px_16px_#b8b9be,_-9px_-9px_16px_#ffffff] rounded-2xl p-8 w-96">
        <h2 className="text-2xl text-green-700 font-semibold text-center mb-6">
          Iniciar sesión
        </h2>

        {errorMsg && (
          <p className="text-red-600 bg-red-100 p-2 rounded-lg text-sm mb-4 text-center">
            {errorMsg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="bg-[#e0e5ec] rounded-lg shadow-inner p-2 text-gray-700 focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#e0e5ec] rounded-lg shadow-inner p-2 text-gray-700 focus:ring-2 focus:ring-green-400"
            required
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
