import { useState, useEffect, useCallback } from "react";
import carritoService from "../api/carritoService";

export const useCarrito = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCarrito = useCallback(async () => {
    setLoading(true);
    try {
      const data = await carritoService.getAll();
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCarrito(); }, [fetchCarrito]);

  const agregarItem = async (id_producto, cantidad) => {
    setLoading(true);
    try {
      await carritoService.addItem({ id_producto, cantidad });
      await fetchCarrito();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const actualizarCantidad = async (id_item, cantidad) => {
    setLoading(true);
    try {
      await carritoService.updateItem(id_item, { cantidad });
      await fetchCarrito();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const eliminarItem = async (id) => {
    setLoading(true);
    try {
      await carritoService.removeItem(id);
      await fetchCarrito();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const limpiarCarrito = async () => {
    setLoading(true);
    try {
      await carritoService.clear();
      await fetchCarrito();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const total = items.reduce((sum, item) => sum + (item.precio_unitario * item.cantidad), 0);

  return { items, loading, error, fetchCarrito, agregarItem, actualizarCantidad, eliminarItem, limpiarCarrito, total };
};

export default useCarrito;