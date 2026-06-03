import { useState, useEffect, useCallback } from "react";
import stockService from "../api/stockService";

export const useStock = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchStock = useCallback(async () => {
    setLoading(true);
    try { const data = await stockService.getAll(); setStocks(data); setError(null); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchStock(); }, [fetchStock]);

  const guardarStock = async (data) => {
    setLoading(true);
    try {
      if (data.id_stock) await stockService.update(data.id_stock, data);
      else await stockService.create(data);
      await fetchStock();
      setShowModal(false);
      setEditData(null);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return { stocks, loading, error, showModal, setShowModal, editData, setEditData, fetchStock, guardarStock };
};

export default useStock;