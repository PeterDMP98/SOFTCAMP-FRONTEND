import { useState, useEffect, useCallback } from "react";
import productoService from "../api/productoService";

export const useProducto = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchProductos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await productoService.getAll();
      setProductos(data);
      setError(null);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchProductos(); }, [fetchProductos]);

  const guardarProducto = async (data) => {
    setLoading(true);
    try {
      if (data.id_producto) await productoService.update(data.id_producto, data);
      else await productoService.create(data);
      await fetchProductos();
      setShowModal(false);
      setEditData(null);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const borrarProducto = async (id) => {
    if (!confirm("¿Eliminar este producto?")) return;
    setLoading(true);
    try { await productoService.remove(id); await fetchProductos(); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return { productos, loading, error, showModal, setShowModal, editData, setEditData, fetchProductos, guardarProducto, borrarProducto };
};

export default useProducto;