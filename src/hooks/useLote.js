import { useState, useEffect, useCallback } from "react";
import loteService from "../api/loteService";

export const useLote = () => {
  const [lotes, setLotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchLotes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await loteService.getAll();
      setLotes(data);
      setError(null);
    } catch (err) {
      setError(err.message);
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
      if (data.id_lote) {
        await loteService.update(data.id_lote, data);
      } else {
        await loteService.create(data);
      }
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