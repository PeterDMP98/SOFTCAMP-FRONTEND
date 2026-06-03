import { useState } from "react";
import { Sparkles } from "lucide-react";
import ChatContainer from "../../components/ia/ChatContainer.jsx";

export default function CompradorIA() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl font-bold text-gray-800">Asistente Comercial con IA</h1>
          </div>
          <p className="text-gray-600">
            Obtén recomendaciones sobre productos, precios y estrategias comerciales.
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <ChatContainer id_chat={null} />
        </div>

        {/* Help Section */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl mb-2">💰</div>
            <h3 className="font-semibold mb-2">Precios</h3>
            <p className="text-sm text-gray-600">
              Pregunta sobre estrategias de precios y márgenes de ganancia
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-semibold mb-2">Productos</h3>
            <p className="text-sm text-gray-600">
              Obtén recomendaciones sobre qué productos vender
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl mb-2">🤝</div>
            <h3 className="font-semibold mb-2">Convenios</h3>
            <p className="text-sm text-gray-600">
              Consejos sobre cómo establecer acuerdos comerciales
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
