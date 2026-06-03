import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useRegistroReproduccion } from "../../hooks/useRegistroReproduccion";
import { useGanado } from "../../hooks/useGanado";
import RegistroReproduccionForm from "../../components/campesino/RegistroReproduccionForm";
import RegistroReproduccionTable from "../../components/campesino/RegistroReproduccionTable";

const CampesinoRegistroReproduccion = () => {
  const { user } = useAuth();
  if (!user || user.grupo !== "campesino") return <Navigate to="/login" replace />;
  const { registros, loading, showModal, setShowModal, editData, setEditData, guardarRegistro } = useRegistroReproduccion();
  const { ganadoList: animales } = useGanado();
  return (<div>{showModal && <RegistroReproduccionForm initialData={editData} onSubmit={guardarRegistro} onClose={() => { setShowModal(false); setEditData(null); }} animales={animales} />}<h1 className="text-2xl text-green-700 mb-2">Registro de Reproducción</h1><p className="text-sm text-gray-600 mb-6">Control de reproducción del ganado</p><RegistroReproduccionTable registros={registros} onEdit={(r) => { setEditData(r); setShowModal(true); }} onDelete={() => {}} onAdd={() => { setEditData(null); setShowModal(true); }} />{loading && <div className="fixed inset-0 bg-white/50 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" /></div>}</div>);
};

export default CampesinoRegistroReproduccion;