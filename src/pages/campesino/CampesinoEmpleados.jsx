import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEmpleado } from "../../hooks/useEmpleado";
import EmpleadoForm from "../../components/campesino/EmpleadoForm";
import EmpleadoTable from "../../components/campesino/EmpleadoTable";

const CampesinoEmpleados = () => {
  const { user } = useAuth();
  if (!user || user.grupo !== "campesino") return <Navigate to="/login" replace />;

  const { empleados, loading, showModal, setShowModal, editData, setEditData, guardarEmpleado, borrarEmpleado } = useEmpleado();

  return (
    <div>
      {showModal && <EmpleadoForm initialData={editData} onSubmit={guardarEmpleado} onClose={() => { setShowModal(false); setEditData(null); }} />}
      <h1 className="text-2xl text-green-700 mb-2">Gestión de Empleados</h1>
      <p className="text-sm text-gray-600 mb-6">Administra tu personal de trabajo</p>
      <EmpleadoTable empleados={empleados} onEdit={(e) => { setEditData(e); setShowModal(true); }} onDelete={borrarEmpleado} onAdd={() => { setEditData(null); setShowModal(true); }} />
      {loading && <div className="fixed inset-0 bg-white/50 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" /></div>}
    </div>
  );
};

export default CampesinoEmpleados;