import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useStock } from "../../hooks/useStock";
import { useProducto } from "../../hooks/useProducto";
import StockForm from "../../components/campesino/StockForm";
import StockTable from "../../components/campesino/StockTable";

const CampesinoStock = () => {
  const { user } = useAuth();
  if (!user || user.grupo !== "campesino") return <Navigate to="/login" replace />;

  const { stocks, loading, showModal, setShowModal, editData, setEditData, guardarStock } = useStock();
  const { productos } = useProducto();

  return (
    <div>
      {showModal && <StockForm initialData={editData} onSubmit={guardarStock} onClose={() => { setShowModal(false); setEditData(null); }} productos={productos} />}
      <h1 className="text-2xl text-green-700 mb-2">Gestión de Stock</h1>
      <p className="text-sm text-gray-600 mb-6">Controla el inventario de tus productos</p>
      <StockTable stocks={stocks} onEdit={(s) => { setEditData(s); setShowModal(true); }} onAdd={() => { setEditData(null); setShowModal(true); }} />
      {loading && <div className="fixed inset-0 bg-white/50 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" /></div>}
    </div>
  );
};

export default CampesinoStock;