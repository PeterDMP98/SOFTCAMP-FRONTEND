import { useState, useEffect, useCallback } from "react";
import siembraService from "../api/siembraService";
import { isOnline } from "../offline/queueStore";
import {
  loadEntityList,
  saveEntityOffline,
  applyOptimisticToList,
} from "../offline/offlineCrud";

export const useSiembra = () => {
  const [siembras, setSiembras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchSiembra = useCallback(async () => {
    setLoading(true);
    try {
      const { list, message } = await loadEntityList("siembra", () => siembraService.getAll());
      setSiembras(list);
      setError(message || null);
    } catch (err) {
      setError(err.message || "Error cargando siembras");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSiembra();
  }, [fetchSiembra]);

  const guardarSiembra = async (data) => {
    setLoading(true);
    try {
      if (!isOnline()) {
        saveEntityOffline({
          entity: "siembra",
          idField: "id_siembra",
          data,
          editRecord: editData,
          onListUpdate: (item, isNew) => {
            setSiembras((prev) => applyOptimisticToList(prev, item, "id_siembra", isNew));
          },
        });
        setShowModal(false);
        setEditData(null);
        return;
      }
      if (data.id_siembra) await siembraService.update(data.id_siembra, data);
      else await siembraService.create(data);
      await fetchSiembra();
      setShowModal(false);
      setEditData(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const borrarSiembra = async (id) => {
    if (!confirm("¿Eliminar esta siembra?")) return;
    setLoading(true);
    try {
      if (!isOnline()) {
        setSiembras((prev) => prev.filter((s) => s.id_siembra !== id));
        return;
      }
      await siembraService.remove(id);
      await fetchSiembra();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    siembras,
    loading,
    error,
    showModal,
    setShowModal,
    editData,
    setEditData,
    fetchSiembra,
    guardarSiembra,
    borrarSiembra,
  };
};

export default useSiembra;
