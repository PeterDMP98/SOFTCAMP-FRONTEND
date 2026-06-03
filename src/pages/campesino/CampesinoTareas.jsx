import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useTarea } from "../../hooks/useTarea";
import { useEmpleado } from "../../hooks/useEmpleado";
import TareaForm from "../../components/campesino/TareaForm";
import TareaTable from "../../components/campesino/TareaTable";

const CampesinoTareas = () => {
  const { user } = useAuth();
  if (!user || user.grupo !== "campesino") return <Navigate to="/login" replace />;

  const { tareas, loading, showModal, setShowModal, editData, setEditData, guardarTarea, borrarTarea } = useTarea();
  const { empleados } = useEmpleado();

  return (
    <div>
      {showModal && <TareaForm initialData={editData} onSubmit={guardarTarea} onClose={() => { setShowModal(false); setEditData(null); }} empleados={empleados} />}
      <h1 className="text-2xl text-green-700 mb-2">Gestión de Tareas</h1>
      <p className="text-sm text-gray-600 mb-6">Administra las tareas de tu fundo</p>
      <TareaTable tareas={tareas} onEdit={(t) => { setEditData(t); setShowModal(true); }} onDelete={borrarTarea} onAdd={() => { setEditData(null); setShowModal(true); }} />
      {loading && <div className="fixed inset-0 bg-white/50 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" /></div>}
    </div>
  );
};

export default CampesinoTareas;