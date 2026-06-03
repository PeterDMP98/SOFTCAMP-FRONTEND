import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useConvenio } from "../../hooks/useConvenio";
import ConvenioForm from "../../components/campesino/ConvenioForm";
import ConvenioTable from "../../components/campesino/ConvenioTable";

const CampesinoConvenios = () => {
  const { user } = useAuth();
  if (!user || user.grupo !== "campesino") return <Navigate to="/login" replace />;
  const { convenios, loading, showModal, setShowModal, editData, setEditData, guardarConvenio, borrarConvenio } = useConvenio();
  return (<div>{showModal && <ConvenioForm initialData={editData} onSubmit={guardarConvenio} onClose={() => { setShowModal(false); setEditData(null); }} />}<h1 className="text-2xl text-green-700 mb-2">Convenios Comerciales</h1><p className="text-sm text-gray-600 mb-6">Acuerdos con compradores</p><ConvenioTable convenios={convenios} onEdit={(c) => { setEditData(c); setShowModal(true); }} onDelete={borrarConvenio} onAdd={() => { setEditData(null); setShowModal(true); }} />{loading && <div className="fixed inset-0 bg-white/50 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" /></div>}</div>);
};

export default CampesinoConvenios;