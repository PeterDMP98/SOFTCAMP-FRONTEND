import { Pencil, Trash2 } from "lucide-react";
import Table from "../UI/Table";
import Badge from "../UI/Badge";

const EmpleadoTable = ({ empleados, onEdit, onDelete, onAdd }) => {
  const columns = [
    { key: "nombre", label: "Nombre", render: (val) => <span className="font-medium">{val}</span> },
    { key: "cedula", label: "Cédula" },
    { key: "telefono", label: "Teléfono" },
    { key: "rol", label: "Rol", render: (val) => <Badge variant="info">{val}</Badge> },
    { key: "estado", label: "Estado", render: (val) => <Badge variant={val === "activo" ? "success" : "default"}>{val}</Badge> },
    { key: "acciones", label: "Acciones", render: (_, row) => (
      <div className="flex gap-2">
        <button onClick={() => onEdit(row)} className="p-1.5 text-green-600 hover:bg-green-50 rounded"><Pencil size={16} /></button>
        <button onClick={() => onDelete(row.id_empleado)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
      </div>
    )},
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Empleados Registrados</h2>
        <button onClick={onAdd} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">+ Nuevo Empleado</button>
      </div>
      <Table columns={columns} data={empleados} emptyMessage="No hay empleados registrados" />
    </div>
  );
};

export default EmpleadoTable;