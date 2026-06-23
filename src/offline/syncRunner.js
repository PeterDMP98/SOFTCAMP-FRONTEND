import syncApi from "../api/syncService.js";
import { getQueue, removeFromQueue, setCache } from "./queueStore.js";

const CACHE_KEYS = ["ganado", "lotes", "tareas", "siembra", "productos", "stock"];

export const syncPendingOperations = async () => {
  const queue = getQueue();
  if (queue.length === 0) {
    return { synced: [], failed: [], remaining: 0, strategy: "last-write-wins" };
  }

  const response = await syncApi.push(queue);
  const syncedIds = (response?.synced || []).map((s) => s.id);
  removeFromQueue(syncedIds);

  try {
    const pull = await syncApi.pull();
    const data = pull?.data;
    if (data) {
      CACHE_KEYS.forEach((key) => {
        if (data[key]) setCache(key, data[key]);
      });
    }
  } catch {
    // pull opcional
  }

  return {
    strategy: response?.strategy || "last-write-wins",
    synced: response?.synced || [],
    failed: response?.failed || [],
    resolved: response?.resolved || [],
    remaining: getQueue().length,
  };
};
