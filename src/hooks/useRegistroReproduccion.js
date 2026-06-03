import { useState, useEffect, useCallback } from "react";
import registroReproduccionService from "../api/registroReproduccionService";

export const useRegistroReproduccion = () => {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchRegistros = useCallback(async () => {
    setLoading(true);
    try {
      const data = await registroReproduccionService.getAll();
      setRegistros(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchRegistros(); }, [fetchRegistros]);

  const guardarRegistro = async (data) => {
    setLoading(true);
    try {
      if (data.id_reproduccion) {
        await registroReproduccionService.update(data.id_reproduccion, data);
      } else {
        await registroReproduccionService.create(data);
      }
      await fetchRegistros();
      setShowModal(false);
      setEditData(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { registros, loading, error, showModal, setShowModal, editData, setEditData, fetchRegistros, guardarRegistro };
};

export default useRegistroReproduccion;