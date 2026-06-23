import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useTarea } from "../../hooks/useTarea";
import { usePedido } from "../../hooks/usePedido";
import {
  Clock3, CloudSun, ListChecks, Bell, Bot, Package,
  AlertCircle, Send, Loader, ChevronRight, Sun, Cloud,
  CloudRain, CloudLightning, Timer, ShoppingCart, MessageCircle,
  CloudDrizzle, CloudFog, Sparkles, CheckCircle2
} from "lucide-react";
import ModulePageShell from "../../components/campesino/ModulePageShell";
import { iaService } from "../../api/iaService";

// ─── Weather helpers ──────────────────────────────────────────────

const WMO = {
  0:  { label: "Despejado", icon: "sun" },
  1:  { label: "Mayormente despejado", icon: "sun" },
  2:  { label: "Parcialmente nublado", icon: "cloud-sun" },
  3:  { label: "Nublado", icon: "cloud" },
  45: { label: "Niebla", icon: "fog" },
  48: { label: "Niebla c/escarcha", icon: "fog" },
  51: { label: "Llovizna ligera", icon: "drizzle" },
  53: { label: "Llovizna moderada", icon: "drizzle" },
  55: { label: "Llovizna densa", icon: "drizzle" },
  61: { label: "Lluvia ligera", icon: "rain" },
  63: { label: "Lluvia moderada", icon: "rain" },
  65: { label: "Lluvia fuerte", icon: "rain" },
  80: { label: "Chubascos ligeros", icon: "rain" },
  81: { label: "Chubascos moderados", icon: "rain" },
  82: { label: "Chubascos fuertes", icon: "rain" },
  95: { label: "Tormenta", icon: "lightning" },
  96: { label: "Tormenta c/granizo", icon: "lightning" },
  99: { label: "Tormenta fuerte", icon: "lightning" },
};

function weatherIcon(code, size = 24) {
  const info = WMO[code] || WMO[0];
  const cls = "shrink-0";
  switch (info.icon) {
    case "sun": return <Sun key="s" size={size} className={`${cls} text-amber-300`} />;
    case "cloud-sun": return <CloudSun key="cs" size={size} className={`${cls} text-amber-300`} />;
    case "cloud": return <Cloud key="c" size={size} className={`${cls} text-slate-300`} />;
    case "fog": return <CloudFog key="f" size={size} className={`${cls} text-slate-300`} />;
    case "drizzle": return <CloudDrizzle key="d" size={size} className={`${cls} text-sky-300`} />;
    case "rain": return <CloudRain key="r" size={size} className={`${cls} text-blue-300`} />;
    case "lightning": return <CloudLightning key="l" size={size} className={`${cls} text-purple-300`} />;
    default: return <Sun key="s" size={size} className={`${cls} text-amber-300`} />;
  }
}

function recomendacionClima(code, temp) {
  if (code >= 95) return "Tormenta eléctrica. Evita trabajos al aire libre.";
  if (code >= 80) return "Lluvias esperadas. Revisa drenajes y protege cultivos.";
  if (code >= 61) return "Día lluvioso. Ideal para tareas de planificación.";
  if (code >= 51) return "Llovizna. Buen momento para fertilizar cultivos.";
  if (code >= 45) return "Niebla. Conduce con cuidado en la finca.";
  if (code <= 3 && temp > 25) return "Clima cálido. Aprovecha para cosechar.";
  if (code <= 3 && temp > 15) return "Temperatura agradable. Buen día para siembra.";
  if (code <= 3) return "Clima fresco. Ideal para jornada de campo.";
  return "Revisa el pronóstico para planificar tus actividades.";
}

// ─── Widgets ─────────────────────────────────────────────────────

function ClockWidget() {
  const [hora, setHora] = useState("");
  useEffect(() => {
    const fn = () => setHora(new Date().toLocaleTimeString("es-CO"));
    fn();
    const id = setInterval(fn, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
        <Clock3 size={14} />
        Hora actual
      </div>
      <p className="mt-2 text-lg font-semibold">{hora || "--:--"}</p>
    </div>
  );
}

function WeatherWidget() {
  const [w, setW] = useState(null);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=4.711&longitude=-74.072&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto"
    )
      .then((r) => r.json())
      .then((d) => { if (d?.current) { setW(d.current); setOk(true); } })
      .catch(() => {});
  }, []);

  const h = new Date().getHours();
  const isNight = h > 18 || h < 6;
  const code = ok ? w.weather_code : (isNight ? 2 : 0);
  const temp = ok ? w.temperature_2m : (isNight ? 18 : 26);
  const hum = ok ? w.relative_humidity_2m : 60;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left min-w-[180px]">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
        <CloudSun size={14} />
        Clima{!ok && <Loader size={10} className="animate-spin" />}
      </div>
      <div className="mt-2 flex items-center gap-3">
        {weatherIcon(code, 28)}
        <div>
          <p className="text-lg font-semibold">{Math.round(temp)}°C</p>
          <p className="text-xs text-slate-400">{Math.round(hum)}% HR</p>
        </div>
      </div>
      <p className="mt-2 text-xs leading-4 text-emerald-300">
        {recomendacionClima(code, temp)}
      </p>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────

function CampesinoDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tareas, loading: loadT } = useTarea();
  const { pedidos, loading: loadP } = usePedido();

  // IA Chat mini
  const [chatMsgs, setChatMsgs] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatId, setChatId] = useState(null);
  const chatEnd = useRef(null);
  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMsgs]);

  const enviarMensaje = useCallback(async () => {
    const texto = chatInput.trim();
    if (!texto || chatLoading) return;
    setChatInput("");
    setChatMsgs((p) => [...p, { rol: "user", contenido: texto }]);
    setChatLoading(true);
    try {
      const r = await iaService.enviarMensaje(chatId, texto);
      if (!chatId && r.id_chat) setChatId(r.id_chat);
      setChatMsgs((p) => [...p, { rol: "assistant", contenido: r.mensaje }]);
    } catch {
      setChatMsgs((p) => [...p, { rol: "assistant", contenido: "⚠️ No pude conectar con la IA." }]);
    } finally {
      setChatLoading(false);
    }
  }, [chatInput, chatLoading, chatId]);

  // Computed data
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const tareasHoy = useMemo(
    () => tareas.filter((t) => t.fecha_limite?.split("T")[0] === today && t.estado !== "completada"),
    [tareas, today]
  );

  const tareasAtrasadas = useMemo(
    () => tareas.filter((t) => t.fecha_limite?.split("T")[0] < today && t.estado !== "completada"),
    [tareas, today]
  );

  const pedidosRecientes = useMemo(
    () => [...pedidos].sort((a, b) => new Date(b.fecha_pedido) - new Date(a.fecha_pedido)).slice(0, 4),
    [pedidos]
  );

  const pedidosPendientes = useMemo(
    () => pedidos.filter((p) => p.estado === "pendiente" || p.estado === "confirmado"),
    [pedidos]
  );

  const notificaciones = useMemo(() => {
    const items = [];
    tareasHoy.slice(0, 2).forEach((t) =>
      items.push({ icon: Timer, color: "text-amber-300", bg: "bg-amber-500/15", title: "Tarea hoy", desc: t.titulo, meta: "Hoy" })
    );
    tareasAtrasadas.slice(0, 2).forEach((t) =>
      items.push({ icon: AlertCircle, color: "text-red-300", bg: "bg-red-500/15", title: "Atrasada", desc: t.titulo, meta: t.fecha_limite?.split("T")[0] || "" })
    );
    pedidosPendientes.slice(0, 2).forEach((p) =>
      items.push({ icon: ShoppingCart, color: "text-blue-300", bg: "bg-blue-500/15", title: "Pedido pendiente", desc: p.comprador_nombre || "Comprador", meta: `$${p.total?.toFixed(2)}` })
    );
    if (!items.length)
      items.push({ icon: Bell, color: "text-slate-400", bg: "bg-white/5", title: "Todo al día", desc: "No hay notificaciones nuevas.", meta: "" });
    return items;
  }, [tareasHoy, tareasAtrasadas, pedidosPendientes]);

  if (!user || user.grupo !== "campesino") {
    return <Navigate to="/login" replace />;
  }

  const card =
    "rounded-[1.5rem] border border-white/10 bg-[#13111a] p-5 text-white shadow-[0_18px_45px_rgba(0,0,0,0.22)]";
  const iconBox = "rounded-2xl bg-emerald-500/15 p-3 text-emerald-200";
  const label = "text-xs uppercase tracking-[0.18em] text-slate-400";

  return (
    <ModulePageShell
      eyebrow="Tablero campesino"
      title={`Hola, ${user.nombre || "campesino"}`}
      description="Tu resumen operativo del día: tareas, clima y actividad reciente."
      accent="green"
      actions={
        <div className="flex flex-wrap gap-3">
          <ClockWidget />
          <WeatherWidget />
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* ─── LEFT COLUMN ─────────────────────────── */}
        <div className="space-y-6 ">
          {/* Tareas del día */}
          <div className={card} style={{height: '340px'}}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={iconBox}><ListChecks size={20} /></div>
                <div>
                  <p className={label}>Tareas del día</p>
                  <h2 className="text-lg font-semibold">
                    {loadT ? "..." : `${tareasHoy.length + tareasAtrasadas.length} pendientes`}
                  </h2>
                </div>
              </div>
              <button
                onClick={() => navigate("/campesino/tareas")}
                className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300"
              >
                Ver todas <ChevronRight size={14} />
              </button>
            </div>

            {loadT ? (
              <div className="flex items-center justify-center py-8 text-slate-400">
                <Loader size={20} className="animate-spin" />
              </div>
            ) : tareasHoy.length === 0 && tareasAtrasadas.length === 0 ? (
              <div className="py-8 text-center text-sm text-slate-400">
                <CheckCircle2 className="mx-auto mb-2 text-emerald-400" size={32} />
                <p>No hay tareas pendientes para hoy.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {tareasHoy.map((t) => (
                  <div
                    key={t.id_tarea}
                    className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
                      <Timer size={14} className="text-emerald-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{t.titulo}</p>
                      <p className="text-xs text-slate-400">{t.empleado_nombre || "Sin asignar"}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-emerald-300">
                      Hoy
                    </span>
                  </div>
                ))}
                {tareasAtrasadas.map((t) => (
                  <div
                    key={t.id_tarea}
                    className="flex items-center gap-3 rounded-xl border border-red-500/10 bg-red-500/[0.04] px-4 py-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20">
                      <AlertCircle size={14} className="text-red-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{t.titulo}</p>
                      <p className="text-xs text-slate-400">Vencía: {t.fecha_limite?.split("T")[0]}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-red-500/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-red-300">
                      Atrasada
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* IA Chat */}
          <div className={card} style={{height: '340px'}} >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={iconBox}><Bot size={20} /></div>
                <div>
                  <p className={label}>Asistente IA</p>
                  <h2 className="text-lg font-semibold">Consulta rápida</h2>
                </div>
              </div>
              <button
                onClick={() => navigate("/campesino/ia")}
                className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300"
              >
                Chat completo <ChevronRight size={14} />
              </button>
            </div>

            <div className="mb-3 max-h-[200px] space-y-2 overflow-y-auto rounded-xl border border-white/5 bg-black/20 p-3">
              {chatMsgs.length === 0 ? (
                <p className="py-6 text-center text-sm text-slate-400">
                  <Sparkles size={24} className="mx-auto mb-2 text-emerald-400" />
                  Pregunta sobre cultivos, ganado, plagas o recomendaciones.
                </p>
              ) : (
                chatMsgs.map((m, i) => (
                  <div
                    key={i}
                    className={`flex gap-2 ${m.rol === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {m.rol === "assistant" && (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/30">
                        <Bot size={12} className="text-emerald-200" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                        m.rol === "user"
                          ? "bg-emerald-500/20 text-emerald-100"
                          : "bg-white/5 text-slate-200"
                      }`}
                    >
                      {m.contenido}
                    </div>
                    {m.rol === "user" && (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/30">
                        <MessageCircle size={12} className="text-blue-200" />
                      </div>
                    )}
                  </div>
                ))
              )}
              {chatLoading && (
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Loader size={12} className="animate-spin" />
                  Pensando...
                </div>
              )}
              <div ref={chatEnd} />
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); enviarMensaje(); }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={chatLoading}
                placeholder="Escribe tu pregunta..."
                className="flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/40"
              />
              <button
                type="submit"
                disabled={chatLoading || !chatInput.trim()}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-500/20 px-4 py-2.5 text-sm text-emerald-300 hover:bg-emerald-500/30 disabled:opacity-40"
              >
                {chatLoading ? <Loader size={14} className="animate-spin" /> : <Send size={14} />}
              </button>
            </form>
          </div>
        </div>

        {/* ─── RIGHT COLUMN ────────────────────────── */}
        <div className="space-y-6">
          {/* Notificaciones */}
          <div className={`${card} flex h-[340px] flex-col`}>
            <div className="mb-4 flex items-center gap-3 shrink-0">
              <div className={iconBox}><Bell size={20} /></div>
              <div>
                <p className={label}>Notificaciones</p>
                <h2 className="text-lg font-semibold">Vista rápida</h2>
              </div>
            </div>
            <div className="flex-1 space-y-2 overflow-y-auto pr-1">
              {notificaciones.map((n, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${n.bg}`}>
                    <n.icon size={14} className={n.color} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="truncate text-xs text-slate-400">{n.desc}</p>
                  </div>
                  {n.meta && (
                    <span className="shrink-0 text-[10px] text-slate-500">{n.meta}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pedidos recientes */}
          <div className={`${card} flex h-[340px] flex-col`}>
            <div className="mb-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className={iconBox}><Package size={20} /></div>
                <div>
                  <p className={label}>Pedidos recientes</p>
                  <h2 className="text-lg font-semibold">
                    {loadP ? "..." : `${pedidosPendientes.length} pendientes`}
                  </h2>
                </div>
              </div>
              <button
                onClick={() => navigate("/campesino/pedidos")}
                className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300"
              >
                Ver todos <ChevronRight size={14} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1">
              {loadP ? (
                <div className="flex h-full items-center justify-center text-slate-400">
                  <Loader size={20} className="animate-spin" />
                </div>
              ) : pedidosRecientes.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-sm text-slate-400">
                  <ShoppingCart className="mx-auto mb-2 text-slate-500" size={32} />
                  <p>No hay pedidos aún.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {pedidosRecientes.map((p) => (
                    <div
                      key={p.id_pedido}
                      className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20">
                        <Package size={14} className="text-blue-300" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">
                          {p.comprador_nombre || `Pedido #${p.id_pedido}`}
                        </p>
                        <p className="text-xs text-slate-400">
                          {p.fecha_pedido?.split("T")[0] || "—"} · ${p.total?.toFixed(2)}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${
                          p.estado === "pendiente"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : p.estado === "confirmado"
                            ? "bg-blue-500/20 text-blue-300"
                            : p.estado === "enviado"
                            ? "bg-purple-500/20 text-purple-300"
                            : p.estado === "entregado"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {p.estado}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ModulePageShell>
  );
}

export default CampesinoDashboard;
