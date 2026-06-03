import { Pencil, Trash2 } from "lucide-react";
import Table from "../UI/Table";

const RegistroPesajeTable = ({ registros, onEdit, onDelete, onAdd }) => {
  const columns = [
    { key: "ganado_nombre", label: "Animal", render: (val) => <span className="font-medium">{val || "-"}</span> },
    { key: "peso_kg", label: "Peso (kg)", render: (val) => `${val?.toFixed(2) || "0.00"} kg` },
    { key: "fecha_pesaje", label: "Fecha", render: (val) => val?.split("T")[0] || "-" },
    { key: "notas", label: "Notas", render: (val) => val?.substring(0, 40) || "-" },
    { key: "acciones", label: "Acciones", render: (_, row) => (<div className="flex gap-2"><button onClick={() => onEdit(row)} className="p-1.5 text-green-600 hover:bg-green-50 rounded"><Pencil size={16} /></button><button onClick={() => onDelete(row.id_pesaje)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button></div>) },
  ];

  return (<div><div className="flex justify-between items-center mb-4"><h2 className="text-lg font-semibold text-gray-800">Registros de Pesaje</h2><button onClick={onAdd} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">+ Nuevo Pesaje</button></div><Table columns={columns} data={registros} emptyMessage="No hay registros de pesaje" /></div>);
};

export default RegistroPesajeTable;