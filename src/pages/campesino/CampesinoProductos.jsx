import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useProducto } from "../../hooks/useProducto";
import ProductoForm from "../../components/campesino/ProductoForm";
import ProductoTable from "../../components/campesino/ProductoTable";

const CampesinoProductos = () => {
  const { user } = useAuth();
  if (!user || user.grupo !== "campesino") return <Navigate to="/login" replace />;

  const { productos, loading, showModal, setShowModal, editData, setEditData, guardarProducto, borrarProducto } = useProducto();

  return (
    <div>
      {showModal && <ProductoForm initialData={editData} onSubmit={guardarProducto} onClose={() => { setShowModal(false); setEditData(null); }} />}
      <h1 className="text-2xl text-green-700 mb-2">Gestión de Productos</h1>
      <p className="text-sm text-gray-600 mb-6">Administra tu catálogo de productos agrícolas</p>
      <ProductoTable productos={productos} onEdit={(p) => { setEditData(p); setShowModal(true); }} onDelete={borrarProducto} onAdd={() => { setEditData(null); setShowModal(true); }} />
      {loading && <div className="fixed inset-0 bg-white/50 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" /></div>}
    </div>
  );
};

export default CampesinoProductos;