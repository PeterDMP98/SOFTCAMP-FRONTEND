import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  MessageSquare, Sparkles, Plus, Trash2, History,
  Loader, RefreshCw, AlertCircle, Bot, ChevronRight,
  X
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { iaService } from "../../api/iaService";
import ChatContainer from "../../components/ia/ChatContainer";
import RecommendationCard from "../../components/ia/RecommendationCard";
import ModulePageShell from "../../components/campesino/ModulePageShell";

export default function CampesinoIA() {
  const { user } = useAuth();

  if (!user || user.grupo !== "campesino") return <Navigate to="/login" replace />;

  const [tab, setTab] = useState("chat");
  const [showHistory, setShowHistory] = useState(true);

  // Chats
  const [chats, setChats] = useState([]);
  const [loadingChats, setLoadingChats] = useState(false);
  const [activeChatId, setActiveChatId] = useState(null);

  // Recommendations
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const loadChats = async () => {
    setLoadingChats(true);
    try {
      const res = await iaService.obtenerMisChats(50, 0);
      setChats(res.chats || []);
    } catch {
      /* ignore */
    }
    setLoadingChats(false);
  };

  useEffect(() => {
    loadChats();
  }, []);

  const loadRecomendaciones = async () => {
    setLoadingRecs(true);
    setError(null);
    try {
      const datos = await iaService.obtenerMisRecomendaciones(true);
      setRecomendaciones(datos);
    } catch (err) {
      setError(err.response?.data?.error || "Error al cargar recomendaciones");
    }
    setLoadingRecs(false);
  };

  const generarRecomendaciones = async () => {
    setLoadingRecs(true);
    setError(null);
    setSuccess(null);
    try {
      const nuevas = await iaService.generarRecomendaciones({ tipo_usuario: "campesino" });
      setRecomendaciones(nuevas);
      setSuccess("Recomendaciones generadas exitosamente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Error al generar recomendaciones");
    }
    setLoadingRecs(false);
  };

  useEffect(() => {
    if (tab === "recomendaciones") loadRecomendaciones();
  }, [tab]);

  const handleNewChat = () => {
    setActiveChatId(null);
    setShowHistory(false);
  };

  const handleChatCreated = (id) => {
    setActiveChatId(id);
    loadChats();
  };

  const handleDeleteChat = async (e, id) => {
    e.stopPropagation();
    if (!confirm("¿Eliminar este chat?")) return;
    try {
      await iaService.eliminarChat(id);
      if (activeChatId === id) setActiveChatId(null);
      loadChats();
    } catch {
      /* ignore */
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (d.toDateString() === today.toDateString()) return "Hoy";
    if (d.toDateString() === yesterday.toDateString()) return "Ayer";
    return d.toLocaleDateString("es-CO", { day: "numeric", month: "short" });
  };

  const cardClass =
    "rounded-[1.5rem] border border-white/10 bg-[#13111a] p-5 text-white shadow-[0_18px_45px_rgba(0,0,0,0.22)]";

  return (
    <ModulePageShell
      eyebrow="Asistente IA"
      title="Inteligencia Artificial"
      description="Historial de conversaciones, chat en vivo y recomendaciones personalizadas para tu operación."
      accent="green"
    >
      {/* ─── Tabs ─── */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-1 rounded-2xl border border-white/10 bg-black/20 p-1">
          <button
            onClick={() => setTab("chat")}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition ${
              tab === "chat"
                ? "bg-emerald-500/20 text-emerald-200"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <MessageSquare size={16} />
            Chat
          </button>
          <button
            onClick={() => setTab("recomendaciones")}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition ${
              tab === "recomendaciones"
                ? "bg-emerald-500/20 text-emerald-200"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles size={16} />
            Recomendaciones
          </button>
        </div>

        {tab === "chat" && (
          <button
            onClick={() => setShowHistory((p) => !p)}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-400 transition hover:text-white lg:hidden"
          >
            {showHistory ? <X size={14} /> : <History size={14} />}
            {showHistory ? "Cerrar" : "Historial"}
          </button>
        )}
      </div>

      {/* ─── Error / Success ─── */}
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle size={16} />
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          ✓ {success}
        </div>
      )}

      {/* ─── Content ─── */}
      {tab === "chat" ? (
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* History sidebar */}
          <div
            className={`space-y-3 ${
              showHistory ? "block" : "hidden lg:block"
            }`}
          >
            <div className={cardClass}>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                  <History size={14} />
                  Historial
                </div>
                <button
                  onClick={handleNewChat}
                  className="flex items-center gap-1 rounded-lg bg-emerald-500/15 px-2.5 py-1.5 text-[11px] font-medium text-emerald-300 transition hover:bg-emerald-500/25"
                >
                  <Plus size={12} />
                  Nuevo
                </button>
              </div>

              <div className="space-y-1">
                {loadingChats ? (
                  <div className="flex justify-center py-6 text-slate-400">
                    <Loader size={16} className="animate-spin" />
                  </div>
                ) : chats.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-500">
                    <Bot size={24} className="mx-auto mb-2 opacity-40" />
                    <p>No hay conversaciones</p>
                    <p className="mt-1">Inicia un nuevo chat</p>
                  </div>
                ) : (
                  chats.map((chat) => (
                    <button
                      key={chat.id_chat}
                      onClick={() => {
                        setActiveChatId(chat.id_chat);
                        setShowHistory(false);
                      }}
                      className={`group flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                        activeChatId === chat.id_chat
                          ? "bg-emerald-500/15 text-emerald-200"
                          : "text-slate-300 hover:bg-white/[0.04]"
                      }`}
                    >
                      <MessageSquare size={14} className="shrink-0 opacity-60" />
                      <span className="flex-1 truncate">{chat.titulo || "Chat sin título"}</span>
                      <span className="shrink-0 text-[10px] text-slate-500">
                        {formatDate(chat.ultimo_mensaje || chat.created_at)}
                      </span>
                      <button
                        onClick={(e) => handleDeleteChat(e, chat.id_chat)}
                        className="shrink-0 rounded p-1 text-slate-500 opacity-0 transition hover:bg-red-500/15 hover:text-red-300 group-hover:opacity-100"
                      >
                        <Trash2 size={12} />
                      </button>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Chat container */}
          <div className={`flex flex-col ${cardClass} min-h-[500px]`}>
            <ChatContainer
              id_chat={activeChatId}
              onChatCreated={handleChatCreated}
            />
          </div>
        </div>
      ) : (
        /* ─── Recommendations ─── */
        <div className="space-y-4">
          <div className={cardClass}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Recomendaciones IA
                </p>
                <h2 className="mt-1 text-lg font-semibold">
                  {recomendaciones.length} pendiente{recomendaciones.length !== 1 ? "s" : ""}
                </h2>
              </div>
              <button
                onClick={generarRecomendaciones}
                disabled={loadingRecs}
                className="flex items-center gap-2 rounded-xl bg-emerald-500/20 px-4 py-2.5 text-sm text-emerald-300 transition hover:bg-emerald-500/30 disabled:opacity-40"
              >
                <RefreshCw size={16} className={loadingRecs ? "animate-spin" : ""} />
                {loadingRecs ? "Generando..." : "Generar nuevas"}
              </button>
            </div>

            {loadingRecs && recomendaciones.length === 0 ? (
              <div className="flex items-center justify-center py-12 text-slate-400">
                <Loader size={24} className="animate-spin" />
              </div>
            ) : recomendaciones.length === 0 ? (
              <div className="py-12 text-center text-sm text-slate-400">
                <Sparkles size={36} className="mx-auto mb-3 text-slate-500" />
                <p>No hay recomendaciones aún.</p>
                <p className="mt-1">
                  Genera recomendaciones personalizadas basadas en tu perfil y operación.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-slate-400">
                  Tienes {recomendaciones.length} recomendación(es) pendiente(s)
                </p>
                {recomendaciones.map((rec) => (
                  <RecommendationCard
                    key={rec.id_recomendacion}
                    recomendacion={rec}
                    onActionComplete={() => loadRecomendaciones()}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </ModulePageShell>
  );
}
