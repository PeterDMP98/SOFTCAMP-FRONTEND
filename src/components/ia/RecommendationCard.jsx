import { CheckCircle, XCircle, Lightbulb, TrendingUp, Bot } from "lucide-react";
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
      cultivo: "bg-yellow-500/15 text-yellow-300 border-yellow-500/20",
      ganado: "bg-blue-500/15 text-blue-300 border-blue-500/20",
      tarea: "bg-purple-500/15 text-purple-300 border-purple-500/20",
      tratamiento: "bg-red-500/15 text-red-300 border-red-500/20",
      siembra: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
    };
    return tipos[recomendacion.tipo] || "bg-white/5 text-slate-300 border-white/10";
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#13111a] p-5 text-white shadow-[0_18px_45px_rgba(0,0,0,0.22)] transition hover:border-emerald-500/20">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15">
              <Lightbulb size={16} className="text-emerald-300" />
            </div>
            <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getTipoBadge()}`}>
              {recomendacion.tipo}
            </span>
            {recomendacion.confianza && (
              <div className="flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-slate-400">
                <TrendingUp size={12} className="text-emerald-400" />
                {Math.round(recomendacion.confianza * 100)}%
              </div>
            )}
          </div>

          <h3 className="mb-1 text-base font-semibold text-white">{recomendacion.titulo}</h3>
          <p className="text-sm leading-relaxed text-slate-300">{recomendacion.descripcion}</p>

          {isAccepted && (
            <div className="mt-3 flex items-center gap-1.5 text-sm text-emerald-300">
              <CheckCircle size={16} />
              <span>Recomendación aceptada</span>
            </div>
          )}
        </div>
      </div>

      {!isAccepted && (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-white/5 pt-4">
          <button
            onClick={handleAceptar}
            disabled={isLoading}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-500/20 px-4 py-2.5 text-sm text-emerald-300 transition hover:bg-emerald-500/30 disabled:opacity-40"
          >
            <CheckCircle size={16} />
            Aceptar
          </button>
          <button
            onClick={handleGenerarTarea}
            disabled={isLoading}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-blue-500/20 px-4 py-2.5 text-sm text-blue-300 transition hover:bg-blue-500/30 disabled:opacity-40"
          >
            <Bot size={16} />
            Crear Tarea
          </button>
          <button
            onClick={handleRechazar}
            disabled={isLoading}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-red-500/20 px-4 py-2.5 text-sm text-red-300 transition hover:bg-red-500/30 disabled:opacity-40"
          >
            <XCircle size={16} />
            Rechazar
          </button>
        </div>
      )}
    </div>
  );
}
