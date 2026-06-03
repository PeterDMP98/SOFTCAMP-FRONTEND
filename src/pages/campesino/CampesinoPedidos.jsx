import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { usePedido } from "../../hooks/usePedido";
import PedidoTable from "../../components/campesino/PedidoTable";

const CampesinoPedidos = () => {
  const { user } = useAuth();
  if (!user || user.grupo !== "campesino") return <Navigate to="/login" replace />;
  const { pedidos, loading, actualizarEstado } = usePedido();
  return (<div><h1 className="text-2xl text-green-700 mb-2">Pedidos</h1><p className="text-sm text-gray-600 mb-6">Pedidos recibidos de compradores</p><PedidoTable pedidos={pedidos} onUpdateStatus={actualizarEstado} viewOnly={false} />{loading && <div className="fixed inset-0 bg-white/50 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" /></div>}</div>);
};

export default CampesinoPedidos;