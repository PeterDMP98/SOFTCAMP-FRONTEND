import { useState, useEffect, useCallback } from "react";
import convenioService from "../api/convenioService";

export const useConvenioComprador = () => {
  const [convenios, setConvenios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchConvenios = useCallback(async () => {
    setLoading(true);
    try {
      const data = await convenioService.getAll();
      setConvenios(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConvenios();
  }, [fetchConvenios]);

  const guardarConvenio = async (data) => {
    setLoading(true);
    try {
      if (data.id_convenio) {
        const { id_convenio, descuento, detalle_de_contrato, fecha_fin, estado } = data;
        await convenioService.update(id_convenio, {
          descuento,
          detalle_de_contrato,
          fecha_fin: fecha_fin || null,
          estado,
        });
      } else {
        await convenioService.create(data);
      }
      await fetchConvenios();
      setShowModal(false);
      setEditData(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelarConvenio = async (id) => {
    if (!confirm("¿Cancelar este convenio?")) return;
    setLoading(true);
    try {
      await convenioService.update(id, { estado: "cancelado" });
      await fetchConvenios();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    convenios,
    loading,
    error,
    showModal,
    setShowModal,
    editData,
    setEditData,
    fetchConvenios,
    guardarConvenio,
    cancelarConvenio,
  };
};

export default useConvenioComprador;
