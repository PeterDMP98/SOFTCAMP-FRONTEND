import { Pencil, Trash2 } from "lucide-react";
import Table from "../UI/Table";
import Badge from "../UI/Badge";

const ConvenioTable = ({ convenios, onEdit, onDelete, onAdd }) => {
  const columns = [
    { key: "comprador_nombre", label: "Comprador", render: (val) => <span className="font-medium">{val || "-"}</span> },
    { key: "descuento", label: "Descuento", render: (val) => `${((val || 0) * 100).toFixed(0)}%` },
    { key: "detalle_de_contrato", label: "Contrato", render: (val) => val?.substring(0, 40) || "-" },
    { key: "fecha_fin", label: "Fecha Fin", render: (val) => val?.split("T")[0] || "Sin límite" },
    { key: "estado", label: "Estado", render: (val) => <Badge variant={val === "activo" ? "success" : val === "pausado" ? "warning" : "default"}>{val}</Badge> },
    { key: "acciones", label: "Acciones", render: (_, row) => (<div className="flex gap-2"><button onClick={() => onEdit(row)} className="p-1.5 text-green-600 hover:bg-green-50 rounded"><Pencil size={16} /></button><button onClick={() => onDelete(row.id_convenio)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button></div>) },
  ];

  return (<div><div className="flex justify-between items-center mb-4"><h2 className="text-lg font-semibold text-gray-800">Convenios Comerciales</h2><button onClick={onAdd} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">+ Nuevo Convenio</button></div><Table columns={columns} data={convenios} emptyMessage="No hay convenios registrados" /></div>);
};

export default ConvenioTable;