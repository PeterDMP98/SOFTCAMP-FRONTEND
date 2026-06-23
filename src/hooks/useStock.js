import { useState, useEffect, useCallback } from "react";
import stockService from "../api/stockService";
import { isOnline } from "../offline/queueStore";
import {
  loadEntityList,
  saveEntityOffline,
  applyOptimisticToList,
} from "../offline/offlineCrud";

export const useStock = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchStock = useCallback(async () => {
    setLoading(true);
    try {
      const { list, message } = await loadEntityList("stock", () => stockService.getAll());
      setStocks(list);
      setError(message || null);
    } catch (err) {
      setError(err.message || "Error cargando stock");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStock();
  }, [fetchStock]);

  const guardarStock = async (data) => {
    setLoading(true);
    try {
      if (!isOnline()) {
        saveEntityOffline({
          entity: "stock",
          idField: "id_stock",
          data,
          editRecord: editData,
          onListUpdate: (item, isNew) => {
            setStocks((prev) => applyOptimisticToList(prev, item, "id_stock", isNew));
          },
        });
        setShowModal(false);
        setEditData(null);
        return;
      }
      if (data.id_stock) await stockService.update(data.id_stock, data);
      else await stockService.create(data);
      await fetchStock();
      setShowModal(false);
      setEditData(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    stocks,
    loading,
    error,
    showModal,
    setShowModal,
    editData,
    setEditData,
    fetchStock,
    guardarStock,
  };
};

export default useStock;
