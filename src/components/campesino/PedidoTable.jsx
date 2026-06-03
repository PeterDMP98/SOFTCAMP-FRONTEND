import { Package, Truck, CheckCircle, XCircle } from "lucide-react";
import Table from "../UI/Table";
import Badge from "../UI/Badge";

const PedidoTable = ({ pedidos, onUpdateStatus, viewOnly = false }) => {
  const getStatusIcon = (estado) => {
    switch(estado) { case "pendiente": return <Package size={16} className="text-yellow-600" />; case "confirmado": return <CheckCircle size={16} className="text-blue-600" />; case "enviado": return <Truck size={16} className="text-purple-600" />; case "entregado": return <CheckCircle size={16} className="text-green-600" />; case "cancelado": return <XCircle size={16} className="text-red-600" />; default: return null; }
  };

  const getStatusVariant = (estado) => {
    switch(estado) { case "pendiente": return "warning"; case "confirmado": return "info"; case "enviado": return "purple"; case "entregado": return "success"; case "cancelado": return "danger"; default: return "default"; }
  };

  const columns = [
    { key: "id_pedido", label: "ID" },
    { key: "comprador_nombre", label: "Comprador", render: (val) => <span className="font-medium">{val || "-"}</span> },
    { key: "total", label: "Total", render: (val) => `$${val?.toFixed(2) || "0.00"}` },
    { key: "fecha_pedido", label: "Fecha", render: (val) => val?.split("T")[0] || "-" },
    { key: "estado", label: "Estado", render: (val) => <div className="flex items-center gap-2"><span>{getStatusIcon(val)}</span><Badge variant={getStatusVariant(val)}>{val}</Badge></div> },
    { key: "acciones", label: "Acciones", render: (_, row) => !viewOnly && row.estado === "pendiente" ? (<button onClick={() => onUpdateStatus(row.id_pedido, "confirmado")} className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200">Confirmar</button>) : null },
  ];

  return (<div><div className="flex justify-between items-center mb-4"><h2 className="text-lg font-semibold text-gray-800">Pedidos</h2></div><Table columns={columns} data={pedidos} emptyMessage="No hay pedidos" /></div>);
};

export default PedidoTable;