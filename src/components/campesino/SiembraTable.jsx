import { Pencil, Trash2 } from "lucide-react";
import Table from "../UI/Table";
import Badge from "../UI/Badge";

const SiembraTable = ({ siembras, onEdit, onDelete, onAdd }) => {
  const columns = [
    { key: "tipo_cultivo", label: "Cultivo", render: (val) => <span className="font-medium">{val}</span> },
    { key: "lote_nombre", label: "Lote" },
    { key: "fecha_siembra", label: "Fecha Siembra", render: (val) => val?.split("T")[0] || "-" },
    { key: "fecha_cosecha_estimada", label: "Cosecha Est.", render: (val) => val?.split("T")[0] || "-" },
    { key: "area_sembrada", label: "Área", render: (val) => `${val || 0} ha` },
    { key: "rendimiento_esperado", label: "Rendimiento", render: (val) => `${val || 0} kg/ha` },
    {
      key: "estado",
      label: "Estado",
      render: (val) => <Badge variant={val === "activo" ? "success" : "default"}>{val}</Badge>,
    },
    {
      key: "acciones",
      label: "Acciones",
      render: (_, row) => (
        <div className="flex gap-2">
          <button onClick={() => onEdit(row)} className="p-1.5 text-green-600 hover:bg-green-50 rounded" title="Editar">
            <Pencil size={16} />
          </button>
          <button onClick={() => onDelete(row.id_siembra)} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Eliminar">
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Siembras Registradas</h2>
        <button onClick={onAdd} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          + Nueva Siembra
        </button>
      </div>
      <Table columns={columns} data={siembras} emptyMessage="No hay siembras registradas" />
    </div>
  );
};

export default SiembraTable;