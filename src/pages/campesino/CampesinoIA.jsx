import { useState, useEffect } from "react";
import { AlertCircle, RefreshCw, Sparkles } from "lucide-react";
import ChatContainer from "../../components/ia/ChatContainer.jsx";
import RecommendationCard from "../../components/ia/RecommendationCard.jsx";
import { iaService } from "../../api/iaService.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function CampesinoIA() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("chat"); // 'chat' | 'recomendaciones'
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Cargar recomendaciones
  const cargarRecomendaciones = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const datos = await iaService.obtenerMisRecomendaciones(true);
      setRecomendaciones(datos);
    } catch (err) {
      setError(err.response?.data?.error || "Error al cargar recomendaciones");
    } finally {
      setIsLoading(false);
    }
  };

  // Generar nuevas recomendaciones
  const generarNuevasRecomendaciones = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Aquí se podría pasar contexto del usuario (ganado, siembras, etc)
      const contextoUsuario = {
        tipo_usuario: "campesino",
      };

      const nuevasRecs = await iaService.generarRecomendaciones(contextoUsuario);
      setRecomendaciones(nuevasRecs);
      setSuccess("Recomendaciones generadas exitosamente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Error al generar recomendaciones");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "recomendaciones") {
      cargarRecomendaciones();
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl font-bold text-gray-800">Asistente Agrícola con IA</h1>
          </div>
          <p className="text-gray-600">
            Haz preguntas sobre cultivos, ganado, plagas y recibe recomendaciones personalizadas.
          </p>
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            ✓ {success}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mb-6 flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-4 py-2 font-semibold transition ${
              activeTab === "chat"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            💬 Chat
          </button>
          <button
            onClick={() => setActiveTab("recomendaciones")}
            className={`px-4 py-2 font-semibold transition ${
              activeTab === "recomendaciones"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            ✨ Recomendaciones
          </button>
        </div>

        {/* Content */}
        {activeTab === "chat" && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ChatContainer id_chat={null} />
          </div>
        )}

        {activeTab === "recomendaciones" && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Mis Recomendaciones</h2>
                <button
                  onClick={generarNuevasRecomendaciones}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition"
                >
                  <RefreshCw className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`} />
                  {isLoading ? "Generando..." : "Generar Nuevas"}
                </button>
              </div>

              {recomendaciones.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No hay recomendaciones aún.</p>
                  <p className="text-sm mt-2">Genera recomendaciones personalizadas basadas en tu perfil.</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    Tienes {recomendaciones.length} recomendación(es) pendiente(s)
                  </p>
                  {recomendaciones.map((rec) => (
                    <RecommendationCard
                      key={rec.id_recomendacion}
                      recomendacion={rec}
                      onActionComplete={() => cargarRecomendaciones()}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
