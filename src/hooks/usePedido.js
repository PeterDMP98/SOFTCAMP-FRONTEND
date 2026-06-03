import { useState, useEffect, useCallback } from "react";
import pedidoService from "../api/pedidoService";

export const usePedido = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPedidos = useCallback(async () => { setLoading(true); try { const data = await pedidoService.getAll(); setPedidos(data); setError(null); } catch (err) { setError(err.message); } finally { setLoading(false); } }, []);
  useEffect(() => { fetchPedidos(); }, [fetchPedidos]);

  const actualizarEstado = async (id, estado) => { setLoading(true); try { await pedidoService.update(id, { estado }); await fetchPedidos(); } catch (err) { setError(err.message); } finally { setLoading(false); } };

  return { pedidos, loading, error, fetchPedidos, actualizarEstado };
};

export default usePedido;