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
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-gray-100 rounded-b-lg">
      <input
        type="text"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        disabled={isLoading}
        placeholder="Escribe tu pregunta agrícola..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={isLoading || !mensaje.trim()}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 transition"
      >
        {isLoading ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Cargando...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Enviar
          </>
        )}
      </button>
    </form>
  );
}
