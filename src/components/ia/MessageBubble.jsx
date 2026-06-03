import { MessageCircle, Leaf } from "lucide-react";

export default function MessageBubble({ mensaje, esUsuario }) {
  return (
    <div className={`flex gap-3 mb-4 ${esUsuario ? "justify-end" : "justify-start"}`}>
      {!esUsuario && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
        </div>
      )}

      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
          esUsuario
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        <p className="text-sm whitespace-wrap">{mensaje.contenido || mensaje}</p>
        <span className="text-xs mt-1 block opacity-70">
          {mensaje.created_at ? new Date(mensaje.created_at).toLocaleTimeString() : ""}
        </span>
      </div>

      {esUsuario && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
        </div>
      )}
    </div>
  );
}
