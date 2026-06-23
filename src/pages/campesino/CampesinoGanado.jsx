import { Navigate } from "react-router-dom";
import { Beef, HeartPulse, Baby, Scale, PlusCircle, Filter } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useGanado } from "../../hooks/useGanado";
import { useHistorialClinico } from "../../hooks/useHistorialClinico";
import { useRegistroPesaje } from "../../hooks/useRegistroPesaje";
import { useRegistroReproduccion } from "../../hooks/useRegistroReproduccion";
import ModulePageShell from "../../components/campesino/ModulePageShell";
import ExpandableSection from "../../components/campesino/ExpandableSection";
import GanadoForm from "../../components/campesino/GanadoForm";
import GanadoTable from "../../components/campesino/GanadoTable";
import HistorialClinicoForm from "../../components/campesino/HistorialClinicoForm";
import HistorialClinicoTable from "../../components/campesino/HistorialClinicoTable";
import RegistroPesajeForm from "../../components/campesino/RegistroPesajeForm";
import RegistroPesajeTable from "../../components/campesino/RegistroPesajeTable";
import RegistroReproduccionForm from "../../components/campesino/RegistroReproduccionForm";
import RegistroReproduccionTable from "../../components/campesino/RegistroReproduccionTable";

const actionButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10";

const CampesinoGanado = () => {
  const { user } = useAuth();
  if (!user || user.grupo !== "campesino") return <Navigate to="/login" replace />;

  const {
    ganadoList,
    allGanadoList,
    totalItems,
    totalPages,
    loading,
    showModal,
    setShowModal,
    editData,
    setEditData,
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
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    sortField,
    sortDirection,
    guardarGanado,
    borrarGanado,
    ordenarPor,
  } = useGanado();

  const historial = useHistorialClinico();
  const pesaje = useRegistroPesaje();
  const reproduccion = useRegistroReproduccion();

  const healthyCount = allGanadoList.filter((item) => String(item.estado_salud || "").toUpperCase() === "SANO").length;

  const stats = [
    {
      label: "Ganado total",
      value: allGanadoList.length,
      hint: `${totalItems} visibles en este filtro`,
      icon: <Beef size={18} />,
    },
    {
      label: "Saludable",
      value: healthyCount,
      hint: "Animales en estado sano",
      icon: <HeartPulse size={18} />,
    },
    {
      label: "Vacunas y clinica",
      value: historial.registros.length,
      hint: "Registros medicos consolidados",
      icon: <Baby size={18} />,
    },
    {
      label: "Pesajes / repro",
      value: `${pesaje.registros.length} / ${reproduccion.registros.length}`,
      hint: "Seguimiento de peso y reproduccion",
      icon: <Scale size={18} />,
    },
  ];

  return (
    <ModulePageShell
      eyebrow="Modulo unificado"
      title="Ganado, salud y control productivo"
      description="Todo lo relacionado con tus animales vive en una sola vista: registro, filtros, vacunas, pesajes y reproduccion se organizan por secciones para que no tengas que saltar entre paginas."
      accent="green"
      stats={stats}
      actions={
        <>
          <button type="button" className={actionButtonClass} onClick={() => setShowModal(true)}>
            <PlusCircle size={16} />
            Nuevo animal
          </button>
        </>
      }
    >
      {showModal && (
        <GanadoForm
          initialData={editData}
          onSubmit={guardarGanado}
          onClose={() => {
            setShowModal(false);
            setEditData(null);
          }}
        />
      )}

      <div className="grid gap-4 xl:grid-cols-[1.5fr_0.9fr]">
        <ExpandableSection
          title="Registro de ganado"
          subtitle="Listado principal con filtros, orden y paginacion."
          badge="Base"
          defaultOpen
          action={
            <button type="button" className={actionButtonClass} onClick={() => setShowModal(true)}>
              <PlusCircle size={16} />
              Agregar
            </button>
          }
        >
          <div className="space-y-4">
            <div className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm text-slate-300">
                <Filter size={16} />
                Filtros
              </div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
                <input
                  type="text"
                  placeholder="Buscar por nombre, identificacion o raza..."
                  defaultValue={search}
                  onChange={(e) => setSearchDebounced(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-[#0d0f15] px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-400/60"
                />

                <select
                  value={sexoFilter}
                  onChange={(e) => setSexoFilter(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-[#0d0f15] px-4 py-3 text-sm text-white outline-none"
                >
                  <option value="">Sexo (todos)</option>
                  <option value="Macho">Macho</option>
                  <option value="Hembra">Hembra</option>
                </select>

                <select
                  value={estadoFilter}
                  onChange={(e) => setEstadoFilter(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-[#0d0f15] px-4 py-3 text-sm text-white outline-none"
                >
                  <option value="">Estado (todos)</option>
                  {estadoOptions.map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </select>

                <select
                  value={razaFilter}
                  onChange={(e) => setRazaFilter(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-[#0d0f15] px-4 py-3 text-sm text-white outline-none"
                >
                  <option value="">Raza (todas)</option>
                  {razaOptions.map((raza) => (
                    <option key={raza} value={raza}>
                      {raza}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Peso min."
                  value={pesoMin}
                  onChange={(e) => setPesoMin(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-[#0d0f15] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                />

                <input
                  type="number"
                  placeholder="Peso max."
                  value={pesoMax}
                  onChange={(e) => setPesoMax(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-[#0d0f15] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button type="button" onClick={clearFilters} className={actionButtonClass}>
                  Limpiar filtros
                </button>
                <p className="text-xs text-slate-400">
                  Mostrando {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalItems)} de {totalItems}
                </p>
              </div>
            </div>

            <GanadoTable
              ganadoList={ganadoList}
              onEdit={(item) => {
                setEditData(item);
                setShowModal(true);
              }}
              onDelete={borrarGanado}
              onSort={ordenarPor}
              sortField={sortField}
              sortDirection={sortDirection}
              onAdd={() => setShowModal(true)}
            />

            <div className="flex flex-col gap-3 border-t border-white/10 pt-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <span>Registros por pagina</span>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="rounded-xl border border-white/10 bg-[#0d0f15] px-3 py-2 text-sm text-white outline-none"
                >
                  {[5, 10, 20, 50].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={currentPage === 1}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Anterior
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentPage(index + 1)}
                    className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                      currentPage === index + 1
                        ? "bg-emerald-500 text-white"
                        : "border border-white/10 bg-white/5 text-slate-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </ExpandableSection>

        <div className="space-y-4">
          <ExpandableSection
            title="Vacunas y salud"
            subtitle="Aun dentro del mismo animal, el historial clinico queda agrupado con sus vacunas y tratamientos."
            badge="Clinica"
            action={
              <button type="button" className={actionButtonClass} onClick={() => historial.setShowModal(true)}>
                <PlusCircle size={16} />
                Nuevo registro
              </button>
            }
          >
            <HistorialClinicoTable
              registros={historial.registros}
              onEdit={(row) => {
                historial.setEditData(row);
                historial.setShowModal(true);
              }}
              onDelete={() => {}}
              onAdd={() => historial.setShowModal(true)}
            />
          </ExpandableSection>

          <ExpandableSection
            title="Pesaje"
            subtitle="Seguimiento de peso para saber como evoluciona el animal."
            badge="Peso"
            action={
              <button type="button" className={actionButtonClass} onClick={() => pesaje.setShowModal(true)}>
                <PlusCircle size={16} />
                Nuevo pesaje
              </button>
            }
          >
            <RegistroPesajeTable
              registros={pesaje.registros}
              onEdit={(row) => {
                pesaje.setEditData(row);
                pesaje.setShowModal(true);
              }}
              onDelete={() => {}}
              onAdd={() => pesaje.setShowModal(true)}
            />
          </ExpandableSection>

          <ExpandableSection
            title="Reproduccion"
            subtitle="Nacimientos, gestacion y genealogia dentro de la misma ficha."
            badge="Genetica"
            action={
              <button type="button" className={actionButtonClass} onClick={() => reproduccion.setShowModal(true)}>
                <PlusCircle size={16} />
                Nuevo registro
              </button>
            }
          >
            <RegistroReproduccionTable
              registros={reproduccion.registros}
              onEdit={(row) => {
                reproduccion.setEditData(row);
                reproduccion.setShowModal(true);
              }}
              onDelete={() => {}}
              onAdd={() => reproduccion.setShowModal(true)}
            />
          </ExpandableSection>
        </div>
      </div>

      {historial.showModal && (
        <HistorialClinicoForm
          initialData={historial.editData}
          onSubmit={historial.guardarRegistro}
          onClose={() => {
            historial.setShowModal(false);
            historial.setEditData(null);
          }}
          animales={allGanadoList}
        />
      )}

      {pesaje.showModal && (
        <RegistroPesajeForm
          initialData={pesaje.editData}
          onSubmit={pesaje.guardarRegistro}
          onClose={() => {
            pesaje.setShowModal(false);
            pesaje.setEditData(null);
          }}
          animales={allGanadoList}
        />
      )}

      {reproduccion.showModal && (
        <RegistroReproduccionForm
          initialData={reproduccion.editData}
          onSubmit={reproduccion.guardarRegistro}
          onClose={() => {
            reproduccion.setShowModal(false);
            reproduccion.setEditData(null);
          }}
          animales={allGanadoList}
        />
      )}

      {loading && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-emerald-400" />
        </div>
      )}
    </ModulePageShell>
  );
};

export default CampesinoGanado;
