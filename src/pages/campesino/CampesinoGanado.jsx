// src/pages/campesino/CampesinoGanado.jsx
import { useState, useEffect, useMemo, useCallback } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import CampesinoLayout from "../../layouts/CampesinoLayout";
import { Plus } from "lucide-react";

import GanadoForm from "../../components/GanadoForm";
import GanadoTable from "../../components/GanadoTable";

import {
  obtenerGanado,
  agregarGanado,
  actualizarGanado,
  eliminarGanado
} from "../../api/ganadoService";

// función debounce genérica
function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

const CampesinoGanado = () => {
  const { user } = useAuth();
  const [ganadoList, setGanadoList] = useState([]);
  const [editData, setEditData] = useState(null);

  const [showModal, setShowModal] = useState(false);


  // filtro / búsqueda
  const [search, setSearch] = useState("");
  const [sexoFilter, setSexoFilter] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");
  const [razaFilter, setRazaFilter] = useState("");
  const [pesoMin, setPesoMin] = useState("");
  const [pesoMax, setPesoMax] = useState("");

  // paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // ordenamiento
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");


  // Seguridad: solo campesino puede acceder
  if (!user || user.grupo !== "campesino") {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    cargarGanado();
  }, []);

  const cargarGanado = async () => {
    try {
      const data = await obtenerGanado();
      setGanadoList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error cargando ganado:", err);
      setGanadoList([]);
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editData) {
        await actualizarGanado(editData.id_ganado, data);
        setEditData(null);
      } else {
        await agregarGanado(data);
      }

      setCurrentPage(1); // ✅ regresar a primera página
      setShowModal(false);
      await cargarGanado();
    } catch (err) {
      console.error("Error guardando ganado:", err);
    }
  };


  const handleEdit = (g) => { setEditData(g); setShowModal(true); };


  const handleDelete = async (id) => {
    if (window.confirm("¿Desea eliminar este ganado?")) {
      try {
        await eliminarGanado(id);
        await cargarGanado();
      } catch (err) {
        console.error("Error eliminando ganado:", err);
      }
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };

  // opciones únicas para filtros
  const razaOptions = useMemo(() => {
    const s = new Set();
    ganadoList.forEach(g => g.raza && s.add(g.raza));
    return Array.from(s).sort();
  }, [ganadoList]);

  const estadoOptions = useMemo(() => {
    const s = new Set();
    ganadoList.forEach(g => g.estado_salud && s.add(g.estado_salud));
    return Array.from(s).sort();
  }, [ganadoList]);

  // debounce búsqueda
  const setSearchDebounced = useCallback(
    debounce((val) => setSearch(val), 300),
    []
  );

  // aplicar filtros y búsqueda
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

      const peso = parseFloat(g.peso_actual) || 0;
      if (pesoMin && peso < Number(pesoMin)) return false;
      if (pesoMax && peso > Number(pesoMax)) return false;

      return true;
    });


    // aplicar ordenamiento
    if (sortField) {
      list = [...list].sort((a, b) => {
        const valA = (a[sortField] || "").toString().toLowerCase();
        const valB = (b[sortField] || "").toString().toLowerCase();

        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;
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
    sortDirection
  ]);


  const totalItems = filteredList.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredList.slice(start, start + pageSize);
  }, [filteredList, currentPage, pageSize]);


  const clearFilters = () => {
    setSearch("");
    setSexoFilter("");
    setEstadoFilter("");
    setRazaFilter("");
    setPesoMin("");
    setPesoMax("");
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);


  return (
    <CampesinoLayout>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-2xl relative animate-fade-in">

            {/* Botón cerrar */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold text-green-700 mb-4">
              {editData ? "Editar Ganado" : "Agregar Ganado"}
            </h2>

            <GanadoForm
              initialData={editData}
              onSubmit={handleSubmit}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}


      <div className="mb-6 grid gap-4">
        {/* Buscador y filtros */}
        <div className="bg-white rounded-2xl p-4 shadow-md flex flex-col md:flex-row md:items-center md:gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por nombre, identificación o raza..."
              className="w-full p-2 rounded-md border"
              value={search}
              onChange={(e) => setSearchDebounced(e.target.value)}
            />

          </div>

          <div className="flex gap-2 mt-3 md:mt-0">
            <select
              value={sexoFilter}
              onChange={(e) => { setSexoFilter(e.target.value); setCurrentPage(1); }}
              className="p-2 rounded-md border"
            >
              <option value="">Sexo (Todos)</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>

            <select
              value={estadoFilter}
              onChange={(e) => { setEstadoFilter(e.target.value); setCurrentPage(1); }}
              className="p-2 rounded-md border"
            >
              <option value="">Estado (Todos)</option>
              {estadoOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <select
              value={razaFilter}
              onChange={(e) => { setRazaFilter(e.target.value); setCurrentPage(1); }}
              className="p-2 rounded-md border"
            >
              <option value="">Raza (Todas)</option>
              {razaOptions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>

            <button
              onClick={clearFilters}
              className="ml-2 bg-gray-200 text-gray-700 px-3 rounded-md"
              title="Limpiar filtros"
            >
              Limpiar
            </button>
          </div>
        </div>

        {/* Rango de peso (se muestra debajo en pantallas pequeñas) */}
        <div className="bg-white rounded-2xl p-4 shadow-md flex gap-2 items-center">
          <label className="text-sm text-gray-600 mr-2">Peso (kg):</label>
          <input
            type="number"
            placeholder="Min"
            value={pesoMin}
            onChange={(e) => setPesoMin(e.target.value)}
            className="p-2 rounded-md border w-24"
          />
          <input
            type="number"
            placeholder="Max"
            value={pesoMax}
            onChange={(e) => setPesoMax(e.target.value)}
            className="p-2 rounded-md border w-24"
          />
        </div>
      </div>

      {/* Contenido principal: formulario + tabla */}
      <h1 className="text-2xl text-green-700 mb-4">Gestión de Ganado</h1>

      <p className="text-sm text-gray-600 mb-2">
        Mostrando {(currentPage - 1) * pageSize + 1} –
        {Math.min(currentPage * pageSize, totalItems)} de {totalItems} registros
      </p>


      <div className="relative mt-4">

        <div className="mt-10" />

        <GanadoTable
          ganadoList={paginatedList}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
          onAdd={() => { setEditData(null); setShowModal(true); }}
        />
      </div>


      <div className="flex items-center justify-between mt-4">

        {/* Selector de cantidad */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Registros por página:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="p-1 border rounded"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* Botones de navegación */}
        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-200 text-gray-400" : "bg-green-600 text-white hover:bg-green-700"
              }`}
          >
            Anterior
          </button>

          {/* Números de página */}
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1
                ? "bg-green-700 text-white"
                : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-200 text-gray-400" : "bg-green-600 text-white hover:bg-green-700"
              }`}
          >
            Siguiente
          </button>
        </div>

      </div>

    </CampesinoLayout>
  );
};

export default CampesinoGanado;
