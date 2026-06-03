import { useState, useEffect, useCallback } from "react";
import empleadoService from "../api/empleadoService";

export const useEmpleado = () => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchEmpleados = useCallback(async () => {
    setLoading(true);
    try { const data = await empleadoService.getAll(); setEmpleados(data); setError(null); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchEmpleados(); }, [fetchEmpleados]);

  const guardarEmpleado = async (data) => {
    setLoading(true);
    try {
      if (data.id_empleado) await empleadoService.update(data.id_empleado, data);
      else await empleadoService.create(data);
      await fetchEmpleados();
      setShowModal(false);
      setEditData(null);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const borrarEmpleado = async (id) => {
    if (!confirm("¿Inactivar este empleado?")) return;
    setLoading(true);
    try { await empleadoService.deactivate(id); await fetchEmpleados(); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return { empleados, loading, error, showModal, setShowModal, editData, setEditData, fetchEmpleados, guardarEmpleado, borrarEmpleado };
};

export default useEmpleado;