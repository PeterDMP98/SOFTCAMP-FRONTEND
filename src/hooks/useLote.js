import { useState, useEffect, useCallback } from "react";
import loteService from "../api/loteService";
import { isOnline } from "../offline/queueStore";
import {
  loadEntityList,
  saveEntityOffline,
  applyOptimisticToList,
} from "../offline/offlineCrud";

export const useLote = () => {
  const [lotes, setLotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchLotes = useCallback(async () => {
    setLoading(true);
    try {
      const { list, message } = await loadEntityList("lotes", () => loteService.getAll());
      setLotes(list);
      setError(message || null);
    } catch (err) {
      setError(err.message || "Error cargando lotes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLotes();
  }, [fetchLotes]);

  const guardarLote = async (data) => {
    setLoading(true);
    try {
      if (!isOnline()) {
        saveEntityOffline({
          entity: "lote",
          idField: "id_lote",
          data,
          editRecord: editData,
          onListUpdate: (item, isNew) => {
            setLotes((prev) => {
              const next = applyOptimisticToList(prev, item, "id_lote", isNew);
              return next;
            });
          },
        });
        setShowModal(false);
        setEditData(null);
        return;
      }
      if (data.id_lote) await loteService.update(data.id_lote, data);
      else await loteService.create(data);
      await fetchLotes();
      setShowModal(false);
      setEditData(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const borrarLote = async (id) => {
    if (!confirm("¿Inactivar este lote?")) return;
    if (!isOnline()) {
      setError("Inactivar lote requiere conexión");
      return;
    }
    setLoading(true);
    try {
      await loteService.deactivate(id);
      await fetchLotes();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const ReactivateLote = async (id) => {
    if (!isOnline()) {
      setError("Reactivar lote requiere conexión");
      return;
    }
    setLoading(true);
    try {
      await loteService.reactivate(id);
      await fetchLotes();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    lotes,
    loading,
    error,
    showModal,
    setShowModal,
    editData,
    setEditData,
    fetchLotes,
    guardarLote,
    borrarLote,
    ReactivateLote,
  };
};

export default useLote;
