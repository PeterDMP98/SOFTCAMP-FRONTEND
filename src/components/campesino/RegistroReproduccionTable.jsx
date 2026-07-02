import { Pencil, Trash2 } from "lucide-react";
import Table from "../UI/Table";
import Badge from "../UI/Badge";

const RegistroReproduccionTable = ({ registros, onEdit, onDelete, onAdd }) => {
  const columns = [
    { key: "madre_nombre", label: "Madre", render: (val) => <span className="font-medium">{val || "-"}</span> },
    { key: "padre_nombre", label: "Padre", render: (val) => val || "-" },
    { key: "tipo", label: "Tipo", render: (val) => <Badge variant="info">{val}</Badge> },
    { key: "fecha", label: "Fecha", render: (val) => val?.split("T")[0] || "-" },
    { key: "resultado", label: "Resultado", render: (val) => <Badge variant={val?.includes("EXITOSO") ? "success" : val?.includes("FALLIDO") ? "danger" : "warning"}>{val || "-"}</Badge> },
    { key: "acciones", label: "Acciones", render: (_, row) => (<div className="flex gap-2"><button onClick={() => onEdit(row)} className="p-1.5 text-green-600 hover:bg-green-50 rounded"><Pencil size={16} /></button><button onClick={() => onDelete(row.id_reproduccion)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button></div>) },
  ];

  return (<div><div className="flex justify-between items-center mb-4"><h2 className="text-lg font-semibold text-gray-800">Registro de Reproducción</h2><button onClick={onAdd} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">+ Nuevo Registro</button></div><Table columns={columns} data={registros} emptyMessage="No hay registros de reproducción" /></div>);
};

export default RegistroReproduccionTable;