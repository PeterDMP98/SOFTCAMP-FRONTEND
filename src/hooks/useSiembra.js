import { useState, useEffect, useCallback } from "react";
import siembraService from "../api/siembraService";

export const useSiembra = () => {
  const [siembras, setSiembras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchSiembra = useCallback(async () => {
    setLoading(true);
    try {
      const data = await siembraService.getAll();
      setSiembras(data);
      setError(null);
    } catch (err) {
      setError(err.message);
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
      if (data.id_siembra) {
        await siembraService.update(data.id_siembra, data);
      } else {
        await siembraService.create(data);
      }
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