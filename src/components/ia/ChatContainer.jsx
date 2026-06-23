import { useEffect, useState, useRef } from "react";
import { Loader, AlertCircle, Bot, Sparkles } from "lucide-react";
import MessageBubble from "./MessageBubble.jsx";
import MessageInput from "./MessageInput.jsx";
import { iaService } from "../../api/iaService.js";

export default function ChatContainer({ id_chat, onChatCreated }) {
  const [mensajes, setMensajes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentChatId, setCurrentChatId] = useState(id_chat);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [mensajes]);

  useEffect(() => {
    const cargarChat = async () => {
      if (!currentChatId) return;

      try {
        setIsLoading(true);
        const chat = await iaService.obtenerChat(currentChatId);
        setMensajes(chat.mensajes || []);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "Error al cargar la conversación");
      } finally {
        setIsLoading(false);
      }
    };

    cargarChat();
  }, [currentChatId]);

  const handleSendMessage = async (contenido) => {
    try {
      setIsLoading(true);
      setError(null);

      const mensajeUsuario = {
        rol: "user",
        contenido,
        created_at: new Date(),
      };
      setMensajes((prev) => [...prev, mensajeUsuario]);

      const respuesta = await iaService.enviarMensaje(currentChatId, contenido);

      if (!currentChatId) {
        setCurrentChatId(respuesta.id_chat);
        if (onChatCreated) {
          onChatCreated(respuesta.id_chat);
        }
      }

      const mensajeIA = {
        rol: "assistant",
        contenido: respuesta.mensaje,
        created_at: new Date(),
      };
      setMensajes((prev) => [...prev, mensajeIA]);
    } catch (err) {
      setError(err.response?.data?.error || "Error al enviar el mensaje");
      setMensajes((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Chat Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {mensajes.length === 0 && !isLoading && (
          <div className="flex h-full items-center justify-center text-center">
            <div>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15">
                <Bot size={28} className="text-emerald-300" />
              </div>
              <p className="mb-1 text-lg font-semibold text-white">Asistente Agrícola</p>
              <p className="max-w-sm text-sm text-slate-400">
                Pregunta sobre cultivos, ganado, plagas, fertilización, clima o cualquier tema del campo.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {mensajes.map((msg, idx) => (
          <MessageBubble
            key={idx}
            mensaje={msg}
            esUsuario={msg.rol === "user"}
          />
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-emerald-300">
            <div className="flex items-center gap-1.5 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-2.5">
              <Sparkles size={14} className="animate-pulse" />
              <span>Pensando...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}
