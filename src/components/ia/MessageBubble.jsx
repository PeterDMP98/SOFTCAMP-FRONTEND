import { Bot, User } from "lucide-react";

export default function MessageBubble({ mensaje, esUsuario }) {
  return (
    <div className={`flex gap-3 ${esUsuario ? "justify-end" : "justify-start"}`}>
      {!esUsuario && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
          <Bot size={16} className="text-emerald-300" />
        </div>
      )}

      <div
        className={`max-w-xs rounded-2xl px-4 py-3 text-sm leading-relaxed lg:max-w-md ${
          esUsuario
            ? "rounded-br-sm bg-emerald-500/20 text-emerald-50"
            : "rounded-bl-sm border border-white/5 bg-white/[0.04] text-slate-200"
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{mensaje.contenido || mensaje}</p>
        {mensaje.created_at && (
          <span className="mt-1 block text-[10px] opacity-50">
            {new Date(mensaje.created_at).toLocaleTimeString("es-CO", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        )}
      </div>

      {esUsuario && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/20">
          <User size={16} className="text-blue-300" />
        </div>
      )}
    </div>
  );
}
