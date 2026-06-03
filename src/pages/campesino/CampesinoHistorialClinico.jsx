import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useHistorialClinico } from "../../hooks/useHistorialClinico";
import { useGanado } from "../../hooks/useGanado";
import HistorialClinicoForm from "../../components/campesino/HistorialClinicoForm";
import HistorialClinicoTable from "../../components/campesino/HistorialClinicoTable";

const CampesinoHistorialClinico = () => {
  const { user } = useAuth();
  if (!user || user.grupo !== "campesino") return <Navigate to="/login" replace />;

  const { registros, loading, showModal, setShowModal, editData, setEditData, guardarRegistro } = useHistorialClinico();
  const { ganadoList: animales } = useGanado();

  return (
    <div>
      {showModal && <HistorialClinicoForm initialData={editData} onSubmit={guardarRegistro} onClose={() => { setShowModal(false); setEditData(null); }} animales={animales} />}
      <h1 className="text-2xl text-green-700 mb-2">Historial Clínico</h1>
      <p className="text-sm text-gray-600 mb-6">Control médico de tu ganado</p>
      <HistorialClinicoTable registros={registros} onEdit={(r) => { setEditData(r); setShowModal(true); }} onDelete={() => {}} onAdd={() => { setEditData(null); setShowModal(true); }} />
      {loading && <div className="fixed inset-0 bg-white/50 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" /></div>}
    </div>
  );
};

export default CampesinoHistorialClinico;