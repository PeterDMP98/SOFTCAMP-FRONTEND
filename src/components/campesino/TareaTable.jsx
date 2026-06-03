import { Pencil, Trash2 } from "lucide-react";
import Table from "../UI/Table";
import Badge from "../UI/Badge";

const TareaTable = ({ tareas, onEdit, onDelete, onAdd }) => {
  const columns = [
    { key: "titulo", label: "Tarea", render: (val) => <span className="font-medium">{val}</span> },
    { key: "descripcion", label: "Descripción", render: (val) => val?.substring(0, 40) || "-" },
    { key: "empleado_nombre", label: "Asignado", render: (val) => val || "Sin asignar" },
    { key: "fecha_limite", label: "Fecha Límite", render: (val) => val?.split("T")[0] || "-" },
    {
      key: "prioridad", label: "Prioridad",
      render: (val) => <Badge variant={val === "alta" ? "danger" : val === "media" ? "warning" : "default"}>{val}</Badge>
    },
    {
      key: "estado", label: "Estado",
      render: (val) => <Badge variant={val === "completada" ? "success" : val === "en_progreso" ? "info" : "default"}>{val.replace("_", " ")}</Badge>
    },
    {
      key: "acciones", label: "Acciones", render: (_, row) => (
        <div className="flex gap-2">
          <button onClick={() => onEdit(row)} className="p-1.5 text-green-600 hover:bg-green-50 rounded"><Pencil size={16} /></button>
          <button onClick={() => onDelete(row.id_tarea)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Tareas Registradas</h2>
        <button onClick={onAdd} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">+ Nueva Tarea</button>
      </div>
      <Table columns={columns} data={tareas} emptyMessage="No hay tareas registradas" />
    </div>
  );
};

export default TareaTable;