import { Package, Truck, CheckCircle, XCircle } from "lucide-react";
import { usePedido } from "../../hooks/usePedido";
import Badge from "../../components/UI/Badge";

const CompradorPedidos = () => {
  const { pedidos, loading } = usePedido();

  const getStatusIcon = (estado) => {
    switch(estado) { case "pendiente": return <Package size={16} className="text-yellow-600" />; case "confirmado": return <CheckCircle size={16} className="text-blue-600" />; case "enviado": return <Truck size={16} className="text-purple-600" />; case "entregado": return <CheckCircle size={16} className="text-green-600" />; case "cancelado": return <XCircle size={16} className="text-red-600" />; default: return null; }
  };

  const getStatusVariant = (estado) => ({ pendiente: "warning", confirmado: "info", enviado: "purple", entregado: "success", cancelado: "danger" }[estado] || "default");

  return (
    <div>
      <h1 className="text-2xl text-blue-700 mb-2">Mis Pedidos</h1>
      <p className="text-sm text-gray-600 mb-6">Historial de tus pedidos</p>
      
      {loading ? (
        <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>
      ) : pedidos.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No tienes pedidos</div>
      ) : (
        <div className="space-y-4">
          {pedidos.map((pedido) => (
            <div key={pedido.id_pedido} className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <div><span className="text-sm text-gray-500">Pedido #</span><span className="font-semibold ml-2">{pedido.id_pedido}</span></div>
                <div className="flex items-center gap-2">{getStatusIcon(pedido.estado)}<Badge variant={getStatusVariant(pedido.estado)}>{pedido.estado}</Badge></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">{pedido.fecha_pedido?.split("T")[0]}</div>
                <div className="text-xl font-bold text-green-600">${pedido.total?.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompradorPedidos;