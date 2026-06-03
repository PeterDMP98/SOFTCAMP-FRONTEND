import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useRegistroPesaje } from "../../hooks/useRegistroPesaje";
import { useGanado } from "../../hooks/useGanado";
import RegistroPesajeForm from "../../components/campesino/RegistroPesajeForm";
import RegistroPesajeTable from "../../components/campesino/RegistroPesajeTable";

const CampesinoRegistroPesaje = () => {
  const { user } = useAuth();
  if (!user || user.grupo !== "campesino") return <Navigate to="/login" replace />;
  const { registros, loading, showModal, setShowModal, editData, setEditData, guardarRegistro } = useRegistroPesaje();
  const { ganadoList: animales } = useGanado();
  return (<div>{showModal && <RegistroPesajeForm initialData={editData} onSubmit={guardarRegistro} onClose={() => { setShowModal(false); setEditData(null); }} animales={animales} />}<h1 className="text-2xl text-green-700 mb-2">Registro de Pesaje</h1><p className="text-sm text-gray-600 mb-6">Control de peso del ganado</p><RegistroPesajeTable registros={registros} onEdit={(r) => { setEditData(r); setShowModal(true); }} onDelete={() => {}} onAdd={() => { setEditData(null); setShowModal(true); }} />{loading && <div className="fixed inset-0 bg-white/50 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" /></div>}</div>);
};

export default CampesinoRegistroPesaje;