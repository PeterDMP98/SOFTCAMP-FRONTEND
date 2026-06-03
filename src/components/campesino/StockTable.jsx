import { Pencil } from "lucide-react";
import Table from "../UI/Table";
import Badge from "../UI/Badge";

const StockTable = ({ stocks, onEdit, onAdd }) => {
  const columns = [
    { key: "producto_nombre", label: "Producto", render: (val) => <span className="font-medium">{val || "-"}</span> },
    { key: "cantidad", label: "Cantidad" },
    { key: "stock_minimo", label: "Stock Mín" },
    { key: "ubicacion", label: "Ubicación" },
    { key: "estado", label: "Estado", render: (val) => <Badge variant={val === "activo" ? "success" : "default"}>{val}</Badge> },
    { key: "acciones", label: "Acciones", render: (_, row) => <button onClick={() => onEdit(row)} className="p-1.5 text-green-600 hover:bg-green-50 rounded"><Pencil size={16} /></button> },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Inventario Actual</h2>
        <button onClick={onAdd} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">+ Agregar Stock</button>
      </div>
      <Table columns={columns} data={stocks} emptyMessage="No hay stock registrado" />
    </div>
  );
};

export default StockTable;