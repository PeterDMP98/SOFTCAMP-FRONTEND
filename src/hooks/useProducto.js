import { useState, useEffect, useCallback } from "react";
import productoService from "../api/productoService";
import { isOnline } from "../offline/queueStore";
import {
  loadEntityList,
  saveEntityOffline,
  applyOptimisticToList,
} from "../offline/offlineCrud";

export const useProducto = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchProductos = useCallback(async () => {
    setLoading(true);
    try {
      const { list, message } = await loadEntityList("productos", () => productoService.getAll());
      setProductos(list);
      setError(message || null);
    } catch (err) {
      setError(err.message || "Error cargando productos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  const guardarProducto = async (data) => {
    setLoading(true);
    try {
      if (!isOnline()) {
        saveEntityOffline({
          entity: "producto",
          idField: "id_producto",
          data,
          editRecord: editData,
          onListUpdate: (item, isNew) => {
            setProductos((prev) => applyOptimisticToList(prev, item, "id_producto", isNew));
          },
        });
        setShowModal(false);
        setEditData(null);
        return;
      }
      if (data.id_producto) await productoService.update(data.id_producto, data);
      else await productoService.create(data);
      await fetchProductos();
      setShowModal(false);
      setEditData(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const borrarProducto = async (id) => {
    if (!confirm("¿Eliminar este producto?")) return;
    setLoading(true);
    try {
      if (!isOnline()) {
        setProductos((prev) => prev.filter((p) => p.id_producto !== id));
        return;
      }
      await productoService.remove(id);
      await fetchProductos();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    productos,
    loading,
    error,
    showModal,
    setShowModal,
    editData,
    setEditData,
    fetchProductos,
    guardarProducto,
    borrarProducto,
  };
};

export default useProducto;
