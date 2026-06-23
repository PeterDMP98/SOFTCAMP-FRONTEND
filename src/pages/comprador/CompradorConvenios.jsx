import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useConvenioComprador } from "../../hooks/useConvenioComprador";
import ConvenioCompradorForm from "../../components/comprador/ConvenioCompradorForm";
import ConvenioCompradorTable from "../../components/comprador/ConvenioCompradorTable";

const CompradorConvenios = () => {
  const { user } = useAuth();
  const {
    convenios,
    loading,
    error,
    showModal,
    setShowModal,
    editData,
    setEditData,
    guardarConvenio,
    cancelarConvenio,
  } = useConvenioComprador();

  if (!user || user.grupo !== "comprador") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      {showModal && (
        <ConvenioCompradorForm
          initialData={editData}
          onSubmit={guardarConvenio}
          onClose={() => {
            setShowModal(false);
            setEditData(null);
          }}
        />
      )}

      <h1 className="text-2xl text-blue-700 mb-2">Convenios Comerciales</h1>
      <p className="text-sm text-gray-600 mb-6">
        Acuerdos con campesinos: descuentos y condiciones especiales
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <ConvenioCompradorTable
        convenios={convenios}
        onEdit={(c) => {
          setEditData(c);
          setShowModal(true);
        }}
        onCancel={cancelarConvenio}
        onAdd={() => {
          setEditData(null);
          setShowModal(true);
        }}
      />

      {loading && (
        <div className="fixed inset-0 bg-white/50 flex items-center justify-center z-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      )}
    </div>
  );
};

export default CompradorConvenios;
