import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useGanado } from "../../hooks/useGanado";

import GanadoForm from "../../components/campesino/GanadoForm";
import GanadoTable from "../../components/campesino/GanadoTable";

const CampesinoGanado = () => {
  const { user } = useAuth();

  // Seguridad
  if (!user || user.grupo !== "campesino") {
    return <Navigate to="/login" replace />;
  }

  const {
    // data
    ganadoList,
    totalItems,
    totalPages,
    loading,

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
  } = useGanado();

  return (
    <div>
      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <GanadoForm
            initialData={editData}
            onSubmit={guardarGanado}
            onClose={() => setShowModal(false)}
          />
        </div>
      )}

      {/* FILTROS */}
      <div className="mb-6 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-md flex flex-col md:flex-row md:items-center gap-4">
          <input
            type="text"
            placeholder="Buscar por nombre, identificación o raza..."
            defaultValue={search}
            onChange={(e) => setSearchDebounced(e.target.value)}
            className="flex-1 p-2 border rounded-md"
          />

          <select
            value={sexoFilter}
            onChange={(e) => setSexoFilter(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Sexo (Todos)</option>
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </select>

          <select
            value={estadoFilter}
            onChange={(e) => setEstadoFilter(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Estado (Todos)</option>
            {estadoOptions.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>

          <select
            value={razaFilter}
            onChange={(e) => setRazaFilter(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Raza (Todas)</option>
            {razaOptions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          <button
            onClick={clearFilters}
            className="bg-gray-200 text-gray-700 px-3 rounded-md"
          >
            Limpiar
          </button>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-md flex items-center gap-2">
          <span className="text-sm text-gray-600">Peso (kg):</span>
          <input
            type="number"
            placeholder="Min"
            value={pesoMin}
            onChange={(e) => setPesoMin(e.target.value)}
            className="w-24 p-2 border rounded-md"
          />
          <input
            type="number"
            placeholder="Max"
            value={pesoMax}
            onChange={(e) => setPesoMax(e.target.value)}
            className="w-24 p-2 border rounded-md"
          />
        </div>
      </div>

      {/* HEADER */}
      <h1 className="text-2xl text-green-700 mb-2">Gestión de Ganado</h1>
      <p className="text-sm text-gray-600 mb-4">
        Mostrando {(currentPage - 1) * pageSize + 1} –{" "}
        {Math.min(currentPage * pageSize, totalItems)} de {totalItems}
      </p>

      {/* TABLA */}
      <GanadoTable
        ganadoList={ganadoList}
        onEdit={(g) => { setEditData(g); setShowModal(true); }}
        onDelete={borrarGanado}
        onSort={ordenarPor}
        onAdd={() => { setEditData(null); setShowModal(true); }}
      />

      {/* PAGINACIÓN */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Registros por página:</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="p-1 border rounded"
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            Anterior
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-green-700 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampesinoGanado;
