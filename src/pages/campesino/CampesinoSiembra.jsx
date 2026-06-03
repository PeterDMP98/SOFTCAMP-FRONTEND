import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useSiembra } from "../../hooks/useSiembra";
import { useLote } from "../../hooks/useLote";
import SiembraForm from "../../components/campesino/SiembraForm";
import SiembraTable from "../../components/campesino/SiembraTable";

const CampesinoSiembra = () => {
  const { user } = useAuth();
  if (!user || user.grupo !== "campesino") return <Navigate to="/login" replace />;

  const { siembras, loading, showModal, setShowModal, editData, setEditData, guardarSiembra, borrarSiembra } = useSiembra();
  const { lotes } = useLote();

  return (
    <div>
      {showModal && (
        <SiembraForm
          initialData={editData}
          onSubmit={guardarSiembra}
          onClose={() => { setShowModal(false); setEditData(null); }}
          lotes={lotes}
        />
      )}

      <h1 className="text-2xl text-green-700 mb-2">Gestión de Siembra</h1>
      <p className="text-sm text-gray-600 mb-6">Controla tus cultivos y cosechas</p>

      <SiembraTable
        siembras={siembras}
        onEdit={(s) => { setEditData(s); setShowModal(true); }}
        onDelete={borrarSiembra}
        onAdd={() => { setEditData(null); setShowModal(true); }}
      />

      {loading && <div className="fixed inset-0 bg-white/50 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" /></div>}
    </div>
  );
};

export default CampesinoSiembra;