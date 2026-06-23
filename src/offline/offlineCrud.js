import { isOnline, enqueueOperation, getCache, setCache } from "./queueStore.js";

export const isPendingId = (id) =>
  id == null || String(id).startsWith("pending-") || String(id).startsWith("local-");

/**
 * Carga lista: API si hay red, si no caché local.
 */
export const loadEntityList = async (entity, fetchFn) => {
  if (!isOnline()) {
    const cached = getCache(entity);
    return {
      list: Array.isArray(cached?.data) ? cached.data : [],
      offline: true,
      message: "Sin conexión — mostrando datos guardados",
    };
  }

  try {
    const raw = await fetchFn();
    const list = Array.isArray(raw) ? raw : raw?.data ?? [];
    setCache(entity, list);
    return { list, offline: false };
  } catch (err) {
    const cached = getCache(entity);
    if (cached?.data) {
      return {
        list: cached.data,
        offline: true,
        message: "Sin conexión — mostrando datos guardados",
      };
    }
    throw err;
  }
};

/**
 * Guarda create/update en cola offline o delega al caller online.
 * @returns {{ offline: boolean }}
 */
export const saveEntityOffline = ({ entity, idField, data, editRecord, onListUpdate }) => {
  const existingId = editRecord?.[idField] ?? data[idField];
  const isEdit = Boolean(existingId) && !isPendingId(existingId);
  const action = isEdit ? "update" : "create";
  let payload = isEdit ? { ...data, [idField]: existingId } : { ...data };

  if (!isEdit || isPendingId(existingId)) {
    const { [idField]: _removed, ...rest } = payload;
    payload = rest;
    enqueueOperation(entity, "create", payload);
    const temp = {
      ...data,
      [idField]: existingId || `pending-${Date.now()}`,
      _offlinePending: true,
    };
    onListUpdate(temp, true);
    return { offline: true };
  }

  enqueueOperation(entity, action, payload);
  const temp = { ...data, [idField]: existingId, _offlinePending: true };
  onListUpdate(temp, false);
  return { offline: true };
};

export const applyOptimisticToList = (prev, item, idField, isNew) => {
  if (isNew) return [item, ...prev];
  return prev.map((row) => (row[idField] === item[idField] ? { ...row, ...item } : row));
};
