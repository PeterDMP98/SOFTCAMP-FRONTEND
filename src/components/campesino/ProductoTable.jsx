import { Pencil, Trash2 } from "lucide-react";
import Table from "../UI/Table";
import Badge from "../UI/Badge";

const ProductoTable = ({ productos, onEdit, onDelete, onAdd }) => {
  const columns = [
    { key: "nombre", label: "Producto", render: (val) => <span className="font-medium">{val}</span> },
    { key: "categoria", label: "Categoría" },
    { key: "unidad_medida", label: "Unidad" },
    { key: "precio_unitario", label: "Precio", render: (val) => `$${val?.toFixed(2) || "0.00"}` },
    {
      key: "estado", label: "Estado",
      render: (val) => <Badge variant={val === "activo" ? "success" : "default"}>{val}</Badge>,
    },
    {
      key: "acciones", label: "Acciones",
      render: (_, row) => (
        <div className="flex gap-2">
          <button onClick={() => onEdit(row)} className="p-1.5 text-green-600 hover:bg-green-50 rounded"><Pencil size={16} /></button>
          <button onClick={() => onDelete(row.id_producto)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Productos Registrados</h2>
        <button onClick={onAdd} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">+ Nuevo Producto</button>
      </div>
      <Table columns={columns} data={productos} emptyMessage="No hay productos registrados" />
    </div>
  );
};

export default ProductoTable;