import { useEffect, useState, useRef } from "react";
import { Loader, AlertCircle } from "lucide-react";
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

  // Cargar conversación existente
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

      // Agregar mensaje del usuario localmente
      const mensajeUsuario = {
        rol: "user",
        contenido,
        created_at: new Date(),
      };
      setMensajes((prev) => [...prev, mensajeUsuario]);

      // Enviar al servidor
      const respuesta = await iaService.enviarMensaje(currentChatId, contenido);

      if (!currentChatId) {
        setCurrentChatId(respuesta.id_chat);
        if (onChatCreated) {
          onChatCreated(respuesta.id_chat);
        }
      }

      // Agregar respuesta de la IA
      const mensajeIA = {
        rol: "assistant",
        contenido: respuesta.mensaje,
        created_at: new Date(),
      };
      setMensajes((prev) => [...prev, mensajeIA]);
    } catch (err) {
      setError(err.response?.data?.error || "Error al enviar el mensaje");
      // Remover el mensaje del usuario si hubo error
      setMensajes((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4">
        <h2 className="text-xl font-bold">🌱 Asistente Agrícola IA</h2>
        <p className="text-sm opacity-90">Pregunta sobre cultivos, ganado y más</p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {mensajes.length === 0 && !isLoading && (
          <div className="flex items-center justify-center h-full text-center text-gray-500">
            <div>
              <p className="text-lg font-semibold mb-2">Bienvenido al Asistente Agrícola</p>
              <p className="text-sm">Haz una pregunta sobre cultivos, ganadería o cualquier tema agrícola.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
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
          <div className="flex items-center justify-center gap-2 text-green-600 py-4">
            <Loader className="w-5 h-5 animate-spin" />
            <span>Pensando...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}
