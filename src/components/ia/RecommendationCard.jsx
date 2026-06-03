import { CheckCircle, XCircle, Lightbulb, TrendingUp } from "lucide-react";
import { useState } from "react";
import { iaService } from "../../api/iaService.js";

export default function RecommendationCard({ recomendacion, onActionComplete }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAccepted, setIsAccepted] = useState(recomendacion.aceptada);

  const handleAceptar = async () => {
    try {
      setIsLoading(true);
      await iaService.aceptarRecomendacion(recomendacion.id_recomendacion);
      setIsAccepted(true);
      if (onActionComplete) onActionComplete();
    } catch (error) {
      console.error("Error al aceptar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRechazar = async () => {
    try {
      setIsLoading(true);
      await iaService.rechazarRecomendacion(recomendacion.id_recomendacion);
      if (onActionComplete) onActionComplete();
    } catch (error) {
      console.error("Error al rechazar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerarTarea = async () => {
    try {
      setIsLoading(true);
      await iaService.generarTarea(recomendacion.id_recomendacion);
      if (onActionComplete) onActionComplete();
    } catch (error) {
      console.error("Error al generar tarea:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTipoBadge = () => {
    const tipos = {
      cultivo: "bg-yellow-100 text-yellow-800",
      ganado: "bg-blue-100 text-blue-800",
      tarea: "bg-purple-100 text-purple-800",
      tratamiento: "bg-red-100 text-red-800",
      siembra: "bg-green-100 text-green-800",
    };
    return tipos[recomendacion.tipo] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white border-l-4 border-green-500 p-4 rounded-lg shadow-sm mb-3 hover:shadow-md transition">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0" />
            <span className={`px-2 py-1 rounded text-xs font-semibold ${getTipoBadge()}`}>
              {recomendacion.tipo}
            </span>
            {recomendacion.confianza && (
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-xs text-gray-600">{Math.round(recomendacion.confianza * 100)}%</span>
              </div>
            )}
          </div>

          <h3 className="font-semibold text-gray-800 mb-1">{recomendacion.titulo}</h3>
          <p className="text-sm text-gray-600 mb-3">{recomendacion.descripcion}</p>

          {isAccepted && (
            <div className="flex items-center gap-1 text-green-600 text-sm mb-3">
              <CheckCircle className="w-4 h-4" />
              <span>Recomendación aceptada</span>
            </div>
          )}
        </div>
      </div>

      {!isAccepted && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
          <button
            onClick={handleAceptar}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600 disabled:bg-gray-400 transition"
          >
            <CheckCircle className="w-4 h-4" />
            Aceptar
          </button>
          <button
            onClick={handleGenerarTarea}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:bg-gray-400 transition"
          >
            📋 Crear Tarea
          </button>
          <button
            onClick={handleRechazar}
            disabled={isLoading}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 disabled:bg-gray-400 transition"
          >
            <XCircle className="w-4 h-4" />
            Rechazar
          </button>
        </div>
      )}
    </div>
  );
}
