import { useState, useEffect, useCallback } from "react";
import usuarioService from "../api/usuarioService";

export const useContrapartes = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchContrapartes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await usuarioService.getContrapartes();
      setUsuarios(data);
      setError(null);
    } catch (err) {
      setError(typeof err === "string" ? err : "No se pudieron cargar los usuarios");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContrapartes();
  }, [fetchContrapartes]);

  const options = usuarios.map((u) => ({
    value: String(u.id_usuario),
    label: `${u.nombre}${u.correo ? ` (${u.correo})` : ""}`,
  }));

  return { usuarios, options, loading, error, refetch: fetchContrapartes };
};

export default useContrapartes;
