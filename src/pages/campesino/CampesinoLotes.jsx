import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLote } from "../../hooks/useLote";
import LoteForm from "../../components/campesino/LoteForm";
import LoteTable from "../../components/campesino/LoteTable";

const CampesinoLotes = () => {
  const { user } = useAuth();
  if (!user || user.grupo !== "campesino") return <Navigate to="/login" replace />;

  const { lotes, loading, showModal, setShowModal, editData, setEditData, guardarLote, borrarLote, ReactivateLote } = useLote();

  return (
    <div>
      {showModal && <LoteForm initialData={editData} onSubmit={guardarLote} onClose={() => { setShowModal(false); setEditData(null); }} />}
      <h1 className="text-2xl text-green-700 mb-2">Gestión de Lotes</h1>
      <p className="text-sm text-gray-600 mb-6">Administra los lotes de tu propiedad agrícola</p>
      <LoteTable lotes={lotes} onEdit={(l) => { setEditData(l); setShowModal(true); }} onDelete={borrarLote} onReactivate={ReactivateLote} onAdd={() => { setEditData(null); setShowModal(true); }} />
      {loading && <div className="fixed inset-0 bg-white/50 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" /></div>}
    </div>
  );
};

export default CampesinoLotes;