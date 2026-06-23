import { useState, useEffect, useCallback } from "react";
import tareaService from "../api/tareaService";
import { isOnline } from "../offline/queueStore";
import {
  loadEntityList,
  saveEntityOffline,
  applyOptimisticToList,
} from "../offline/offlineCrud";

export const useTarea = () => {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchTareas = useCallback(async () => {
    setLoading(true);
    try {
      const { list, message } = await loadEntityList("tareas", () => tareaService.getAll());
      setTareas(list);
      setError(message || null);
    } catch (err) {
      setError(err.message || "Error cargando tareas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTareas();
  }, [fetchTareas]);

  const guardarTarea = async (data) => {
    setLoading(true);
    try {
      if (!isOnline()) {
        saveEntityOffline({
          entity: "tarea",
          idField: "id_tarea",
          data,
          editRecord: editData,
          onListUpdate: (item, isNew) => {
            setTareas((prev) => applyOptimisticToList(prev, item, "id_tarea", isNew));
          },
        });
        setShowModal(false);
        setEditData(null);
        return;
      }
      if (data.id_tarea) await tareaService.update(data.id_tarea, data);
      else await tareaService.create(data);
      await fetchTareas();
      setShowModal(false);
      setEditData(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const borrarTarea = async (id) => {
    if (!confirm("¿Eliminar esta tarea?")) return;
    setLoading(true);
    try {
      if (!isOnline()) {
        setTareas((prev) => prev.filter((t) => t.id_tarea !== id));
        return;
      }
      await tareaService.remove(id);
      await fetchTareas();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    tareas,
    loading,
    error,
    showModal,
    setShowModal,
    editData,
    setEditData,
    fetchTareas,
    guardarTarea,
    borrarTarea,
  };
};

export default useTarea;
