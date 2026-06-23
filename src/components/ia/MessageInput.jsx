import { Send, Loader } from "lucide-react";
import { useState } from "react";

export default function MessageInput({ onSendMessage, isLoading }) {
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mensaje.trim()) {
      onSendMessage(mensaje);
      setMensaje("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 rounded-b-2xl border-t border-white/5 bg-black/20 p-4">
      <input
        type="text"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        disabled={isLoading}
        placeholder="Escribe tu pregunta agrícola..."
        className="flex-1 rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/40 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isLoading || !mensaje.trim()}
        className="flex items-center gap-2 rounded-xl bg-emerald-500/20 px-4 py-2.5 text-sm text-emerald-300 transition hover:bg-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isLoading ? (
          <>
            <Loader size={16} className="animate-spin" />
            <span className="hidden sm:inline">Enviando</span>
          </>
        ) : (
          <>
            <Send size={16} />
            <span className="hidden sm:inline">Enviar</span>
          </>
        )}
      </button>
    </form>
  );
}
