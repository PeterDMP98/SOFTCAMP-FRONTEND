import { useState, useEffect, useCallback } from "react";
import { CloudOff, RefreshCw } from "lucide-react";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";
import { getQueueCount } from "../../offline/queueStore";
import { syncPendingOperations } from "../../offline/syncRunner";
import syncApi from "../../api/syncService";

const SyncBanner = () => {
  const online = useOnlineStatus();
  const [pending, setPending] = useState(getQueueCount());
  const [serverPending, setServerPending] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState(null);

  const refreshCount = useCallback(() => {
    setPending(getQueueCount());
  }, []);

  const loadServerStatus = useCallback(async () => {
    if (!online) return;
    try {
      const res = await syncApi.status();
      const d = res?.data || {};
      const total = Object.keys(d).reduce((sum, k) => sum + (Number(d[k]) || 0), 0);
      setServerPending(total);
    } catch {
      setServerPending(null);
    }
  }, [online]);

  useEffect(() => {
    refreshCount();
    loadServerStatus();
    const id = setInterval(() => {
      refreshCount();
      loadServerStatus();
    }, 5000);
    return () => clearInterval(id);
  }, [refreshCount, loadServerStatus]);

  const runSync = useCallback(async () => {
    if (!online) return;
    setSyncing(true);
    setMessage(null);
    try {
      const result = await syncPendingOperations();
      refreshCount();
      await loadServerStatus();
      const parts = [];
      if (result.synced?.length) parts.push(`${result.synced.length} subidos`);
      if (result.failed?.length) parts.push(`${result.failed.length} con error`);
      if (result.resolved?.length) parts.push(`${result.resolved.length} IDs locales resueltos`);
      setMessage(parts.length ? parts.join(" · ") : "Todo sincronizado");
    } catch (err) {
      setMessage(typeof err === "string" ? err : "Error al sincronizar");
    } finally {
      setSyncing(false);
    }
  }, [online, refreshCount, loadServerStatus]);

  useEffect(() => {
    if (online && pending > 0) {
      runSync();
    }
  }, [online]); // eslint-disable-line react-hooks/exhaustive-deps

  const showBanner = !online || pending > 0 || (serverPending != null && serverPending > 0) || message;

  if (!showBanner) return null;

  return (
    <div
      className={`mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm ${
        online ? "border-amber-200 bg-amber-50 text-amber-900" : "border-red-200 bg-red-50 text-red-800"
      }`}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <CloudOff size={18} />
          <span>
            {!online
              ? "Sin conexión — los cambios se guardan en cola local"
              : pending > 0
                ? `${pending} cambio(s) local(es) por subir`
                : "Conectado"}
          </span>
        </div>
        {online && serverPending != null && serverPending > 0 && (
          <span className="text-xs opacity-80">{serverPending} registro(s) con sync pendiente en servidor</span>
        )}
        {message && <span className="text-xs font-medium">{message}</span>}
      </div>
      {online && pending > 0 && (
        <button
          type="button"
          onClick={runSync}
          disabled={syncing}
          className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-3 py-1.5 text-white hover:bg-amber-700 disabled:opacity-50"
        >
          <RefreshCw size={16} className={syncing ? "animate-spin" : ""} />
          Sincronizar
        </button>
      )}
    </div>
  );
};

export default SyncBanner;
