import { useState, useEffect, useCallback } from "react";
import tareaService from "../api/tareaService";

export const useTarea = () => {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchTareas = useCallback(async () => {
    setLoading(true);
    try { const data = await tareaService.getAll(); setTareas(data); setError(null); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchTareas(); }, [fetchTareas]);

  const guardarTarea = async (data) => {
    setLoading(true);
    try {
      if (data.id_tarea) await tareaService.update(data.id_tarea, data);
      else await tareaService.create(data);
      await fetchTareas();
      setShowModal(false);
      setEditData(null);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const borrarTarea = async (id) => {
    if (!confirm("¿Eliminar esta tarea?")) return;
    setLoading(true);
    try { await tareaService.remove(id); await fetchTareas(); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return { tareas, loading, error, showModal, setShowModal, editData, setEditData, fetchTareas, guardarTarea, borrarTarea };
};

export default useTarea;