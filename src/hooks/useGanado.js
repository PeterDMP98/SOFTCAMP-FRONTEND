import { useState, useEffect, useMemo, useCallback } from "react";
import {obtenerGanado, agregarGanado, actualizarGanado, eliminarGanado} from "../api/ganadoService";

// debounce simple
function debounce(fn, wait = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

export const useGanado = () => {
  // =========================
  // DATA
  // =========================
  const [ganadoList, setGanadoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // =========================
  // UI STATE
  // =========================
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  // =========================
  // FILTROS
  // =========================
  const [search, setSearch] = useState("");
  const [sexoFilter, setSexoFilter] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");
  const [razaFilter, setRazaFilter] = useState("");
  const [pesoMin, setPesoMin] = useState("");
  const [pesoMax, setPesoMax] = useState("");

  // =========================
  // PAGINACIÓN
  // =========================
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // =========================
  // ORDENAMIENTO
  // =========================
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  // =========================
  // CARGAR GANADO
  // =========================
  const cargarGanado = async () => {
    try {
      setLoading(true);
      const data = await obtenerGanado();
      setGanadoList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Error cargando ganado");
      setGanadoList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarGanado();
  }, []);

  // =========================
  // CRUD
  // =========================
  const guardarGanado = async (data) => {
    try {
      if (editData) {
        await actualizarGanado(editData.id_ganado, data);
      } else {
        await agregarGanado(data);
      }
      setShowModal(false);
      setEditData(null);
      setCurrentPage(1);
      await cargarGanado();
    } catch (err) {
      console.error(err);
      setError("Error guardando ganado");
    }
  };

  const borrarGanado = async (id) => {
    if (!window.confirm("¿Desea eliminar este ganado?")) return;
    try {
      await eliminarGanado(id);
      await cargarGanado();
    } catch (err) {
      console.error(err);
      setError("Error eliminando ganado");
    }
  };

  // =========================
  // ORDENAR
  // =========================
  const ordenarPor = (field) => {
    if (sortField === field) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };

  // =========================
  // FILTROS OPCIONES
  // =========================
  const razaOptions = useMemo(() => {
    return [...new Set(ganadoList.map((g) => g.raza).filter(Boolean))].sort();
  }, [ganadoList]);

  const estadoOptions = useMemo(() => {
    return [...new Set(ganadoList.map((g) => g.estado_salud).filter(Boolean))].sort();
  }, [ganadoList]);

  // =========================
  // SEARCH DEBOUNCE
  // =========================
  const setSearchDebounced = useCallback(
    debounce((val) => setSearch(val)),
    []
  );

  // =========================
  // LISTA FILTRADA
  // =========================
  const filteredList = useMemo(() => {
    let list = ganadoList.filter((g) => {
      const q = search.toLowerCase();

      if (q) {
        const match =
          g.nombre_animal?.toLowerCase().includes(q) ||
          g.numero_identificacion?.toLowerCase().includes(q) ||
          g.raza?.toLowerCase().includes(q);

        if (!match) return false;
      }

      if (sexoFilter && g.sexo !== sexoFilter) return false;
      if (estadoFilter && g.estado_salud !== estadoFilter) return false;
      if (razaFilter && g.raza !== razaFilter) return false;

      const peso = Number(g.peso_actual) || 0;
      if (pesoMin && peso < pesoMin) return false;
      if (pesoMax && peso > pesoMax) return false;

      return true;
    });

    if (sortField) {
      list = [...list].sort((a, b) => {
        const A = (a[sortField] ?? "").toString().toLowerCase();
        const B = (b[sortField] ?? "").toString().toLowerCase();
        if (A < B) return sortDirection === "asc" ? -1 : 1;
        if (A > B) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return list;
  }, [
    ganadoList,
    search,
    sexoFilter,
    estadoFilter,
    razaFilter,
    pesoMin,
    pesoMax,
    sortField,
    sortDirection,
  ]);

  // =========================
  // PAGINACIÓN
  // =========================
  const totalItems = filteredList.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredList.slice(start, start + pageSize);
  }, [filteredList, currentPage, pageSize]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

  // =========================
  // LIMPIAR FILTROS
  // =========================
  const clearFilters = () => {
    setSearch("");
    setSexoFilter("");
    setEstadoFilter("");
    setRazaFilter("");
    setPesoMin("");
    setPesoMax("");
    setCurrentPage(1);
  };

  return {
    // data
    ganadoList: paginatedList,
    totalItems,
    totalPages,
    loading,
    error,

    // ui
    showModal,
    setShowModal,
    editData,
    setEditData,

    // filtros
    search,
    setSearchDebounced,
    sexoFilter,
    setSexoFilter,
    estadoFilter,
    setEstadoFilter,
    razaFilter,
    setRazaFilter,
    pesoMin,
    setPesoMin,
    pesoMax,
    setPesoMax,
    clearFilters,

    // opciones
    razaOptions,
    estadoOptions,

    // paginación
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,

    // acciones
    guardarGanado,
    borrarGanado,
    ordenarPor,
  };
};
