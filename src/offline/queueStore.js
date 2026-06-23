const QUEUE_KEY = "softcamp_offline_queue";

export const getQueue = () => {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveQueue = (queue) => {
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
};

export const enqueueOperation = (entity, action, payload) => {
  const item = {
    id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    entity,
    action,
    payload,
    createdAt: new Date().toISOString(),
  };
  const queue = getQueue();
  queue.push(item);
  saveQueue(queue);
  return item;
};

export const removeFromQueue = (ids) => {
  const set = new Set(ids);
  const next = getQueue().filter((op) => !set.has(op.id));
  saveQueue(next);
  return next;
};

export const getQueueCount = () => getQueue().length;

export const setCache = (entity, data) => {
  localStorage.setItem(`softcamp_cache_${entity}`, JSON.stringify({ data, cachedAt: new Date().toISOString() }));
};

export const getCache = (entity) => {
  try {
    const raw = localStorage.getItem(`softcamp_cache_${entity}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const isOnline = () => typeof navigator !== "undefined" && navigator.onLine;
