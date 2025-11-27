import axios from "axios";
import { AuthContext } from "../context/AuthContext";

// ✅ Configuración base del cliente HTTP axios para la API

const httpClient = axios.create({
  baseURL: "http://localhost:3000/api",
});

// ✅ Inserta token automáticamente si existe
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Manejo global de errores y expiración de sesión
httpClient.interceptors.response.use(
  (response) => response.data, // ✅ devuelve solo data
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido o expirado
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    // Retorna mensaje claro
    return Promise.reject(
      error.response?.data?.message || "Error en la solicitud"
    );
  }
);

export default httpClient;
