import { Pencil, Trash2, RotateCcw } from "lucide-react";
import Table from "../UI/Table";
import Badge from "../UI/Badge";

const LoteTable = ({ lotes, onEdit, onDelete, onReactivate, onAdd }) => {
  const columns = [
    {
      key: "nombre",
      label: "Nombre",
      render: (val) => <span className="font-medium">{val}</span>,
    },
    { key: "ubicacion", label: "Ubicación" },
    {
      key: "area_hectareas",
      label: "Área (ha)",
      render: (val) => `${val || 0} ha`,
    },
    {
      key: "descripcion",
      label: "Descripción",
      render: (val) => val?.substring(0, 50) || "-",
    },
    {
      key: "estado",
      label: "Estado",
      render: (val) => (
        <Badge variant={val === "activo" ? "success" : "default"}>
          {val}
        </Badge>
      ),
    },
    {
      key: "acciones",
      label: "Acciones",
      render: (_, row) => (
        <div className="flex gap-2">
          {row.estado === "inactivo" ? (
            <button
              onClick={() => onReactivate(row.id_lote)}
              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
              title="Reactivar"
            >
              <RotateCcw size={16} />
            </button>
          ) : (
            <button
              onClick={() => onEdit(row)}
              className="p-1.5 text-green-600 hover:bg-green-50 rounded"
              title="Editar"
            >
              <Pencil size={16} />
            </button>
          )}
          <button
            onClick={() => onDelete(row.id_lote)}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
            title="Inactivar"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Lotes Registrados</h2>
        <button
          onClick={onAdd}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          + Nuevo Lote
        </button>
      </div>
      <Table columns={columns} data={lotes} emptyMessage="No hay lotes registrados" />
    </div>
  );
};

export default LoteTable;