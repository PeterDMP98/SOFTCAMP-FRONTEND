import { useState, useEffect, useCallback } from "react";
import conveniosService from "../api/convenioService";

export const useConvenio = () => {
  const [convenios, setConvenios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchConvenios = useCallback(async () => {
    setLoading(true);
    try {
      const data = await conveniosService.getAll();
      setConvenios(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchConvenios(); }, [fetchConvenios]);

  const guardarConvenio = async (data) => {
    setLoading(true);
    try {
      if (data.id_convenio) {
        await conveniosService.update(data.id_convenio, data);
      } else {
        await conveniosService.create(data);
      }
      await fetchConvenios();
      setShowModal(false);
      setEditData(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const borrarConvenio = async (id) => {
    if (!confirm("¿Cancelar este convenio?")) return;
    setLoading(true);
    try {
      await conveniosService.delete(id);
      await fetchConvenios();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { convenios, loading, error, showModal, setShowModal, editData, setEditData, fetchConvenios, guardarConvenio, borrarConvenio };
};

export default useConvenio;