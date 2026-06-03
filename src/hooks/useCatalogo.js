import { useState, useEffect, useCallback } from "react";
import productoService from "../api/productoService";

export const useCatalogo = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProductos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await productoService.getAll();
      setProductos(data.filter(p => p.estado === "activo"));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProductos(); }, [fetchProductos]);

  return { productos, loading, error, fetchProductos };
};

export default useCatalogo;