import { Pencil, Ban } from "lucide-react";
import Table from "../UI/Table";
import Badge from "../UI/Badge";

const ConvenioCompradorTable = ({ convenios, onEdit, onCancel, onAdd }) => {
  const columns = [
    {
      key: "campesino_nombre",
      label: "Campesino",
      render: (val) => <span className="font-medium">{val || "-"}</span>,
    },
    {
      key: "descuento",
      label: "Descuento",
      render: (val) => `${((val || 0) * 100).toFixed(0)}%`,
    },
    {
      key: "detalle_de_contrato",
      label: "Contrato",
      render: (val) => val?.substring(0, 40) || "-",
    },
    {
      key: "fecha_fin",
      label: "Fecha fin",
      render: (val) => val?.split("T")[0] || "Sin límite",
    },
    {
      key: "estado",
      label: "Estado",
      render: (val) => (
        <Badge
          variant={
            val === "activo" ? "success" : val === "pausado" ? "warning" : "default"
          }
        >
          {val}
        </Badge>
      ),
    },
    {
      key: "acciones",
      label: "Acciones",
      render: (_, row) => (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(row)}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
            title="Editar"
          >
            <Pencil size={16} />
          </button>
          {row.estado !== "cancelado" && row.estado !== "finalizado" && (
            <button
              type="button"
              onClick={() => onCancel(row.id_convenio)}
              className="p-1.5 text-red-600 hover:bg-red-50 rounded"
              title="Cancelar convenio"
            >
              <Ban size={16} />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Mis convenios</h2>
        <button
          type="button"
          onClick={onAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Nuevo convenio
        </button>
      </div>
      <Table columns={columns} data={convenios} emptyMessage="No tienes convenios registrados" />
    </div>
  );
};

export default ConvenioCompradorTable;
