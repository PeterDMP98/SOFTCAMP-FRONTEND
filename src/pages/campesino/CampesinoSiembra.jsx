import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Sprout, MapPinned, PlusCircle, Layers3, Eye, ListTodo } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useLote } from "../../hooks/useLote";
import { useSiembra } from "../../hooks/useSiembra";
import { useTarea } from "../../hooks/useTarea";
import { useEmpleado } from "../../hooks/useEmpleado";
import ModulePageShell from "../../components/campesino/ModulePageShell";
import ExpandableSection from "../../components/campesino/ExpandableSection";
import LoteForm from "../../components/campesino/LoteForm";
import LoteTable from "../../components/campesino/LoteTable";
import SiembraForm from "../../components/campesino/SiembraForm";
import SiembraTable from "../../components/campesino/SiembraTable";
import TareaForm from "../../components/campesino/TareaForm";
import TareaTable from "../../components/campesino/TareaTable";
import Modal from "../../components/UI/Modal";

const actionButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10";

const miniButtonClass =
  "inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/10";

const CampesinoSiembra = () => {
  const { user } = useAuth();
  if (!user || user.grupo !== "campesino") return <Navigate to="/login" replace />;

  const lotes = useLote();
  const siembra = useSiembra();
  const { tareas, loading: loadT, showModal: showTareaFormModal, setShowModal: setShowTareaFormModal, editData: tareaEditData, setEditData: setTareaEditData, guardarTarea, borrarTarea } = useTarea();
  const { empleados } = useEmpleado();

  const [showLotesModal, setShowLotesModal] = useState(false);
  const [showTareasModal, setShowTareasModal] = useState(false);

  const siembrasActivas = siembra.siembras.filter(s => s.estado !== "Cerrado" && s.estado !== "cerrado");
  const tareasSiembra = tareas.filter(t => t.estado !== "completada" && t.tipo_referencia === "siembra");

  const stats = [
    {
      label: "Lotes activos",
      value: lotes.lotes.length,
      hint: "Terrenos disponibles para cultivar",
      icon: <MapPinned size={18} />,
      children: (
        <button
          type="button"
          className={miniButtonClass}
          onClick={() => setShowLotesModal(true)}
        >
          <Eye size={14} />
          Ver lotes
        </button>
      ),
    },
    {
      label: "Siembras activas",
      value: siembrasActivas.length,
      hint: "Cultivos aún no cosechados",
      icon: <Sprout size={18} />,
    },
    {
      label: "Tareas pendientes",
      value: tareasSiembra.length,
      hint: "Relacionadas con siembras",
      icon: <ListTodo size={18} />,
      children: (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={miniButtonClass}
            onClick={() => setShowTareasModal(true)}
          >
            <Eye size={14} />
            Ver tareas
          </button>
          <button
            type="button"
            className={miniButtonClass}
            onClick={() => { setShowTareaFormModal(true); setTareaEditData(null); }}
          >
            <PlusCircle size={14} />
            Agregar tarea
          </button>
        </div>
      ),
    },
  ];

  return (
    <ModulePageShell
      eyebrow="Terrenos y cultivos"
      title="Siembra y lotes en una sola vista"
      description="Organizamos el flujo de tierra, cultivo y seguimiento en dos bloques principales para que el usuario vea el contexto completo sin cambiar de pantalla."
      accent="amber"
      stats={stats}
      actions={
        <>
          <button type="button" className={actionButtonClass} onClick={() => lotes.setShowModal(true)}>
            <PlusCircle size={16} />
            Nuevo lote
          </button>
          <button type="button" className={actionButtonClass} onClick={() => siembra.setShowModal(true)}>
            <PlusCircle size={16} />
            Nueva siembra
          </button>
        </>
      }
    >
      {lotes.showModal && (
        <LoteForm
          initialData={lotes.editData}
          onSubmit={lotes.guardarLote}
          onClose={() => {
            lotes.setShowModal(false);
            lotes.setEditData(null);
          }}
        />
      )}

      {siembra.showModal && (
        <SiembraForm
          initialData={siembra.editData}
          onSubmit={siembra.guardarSiembra}
          onClose={() => {
            siembra.setShowModal(false);
            siembra.setEditData(null);
          }}
          lotes={lotes.lotes}
        />
      )}

      {showLotesModal && (
        <Modal isOpen={true} onClose={() => setShowLotesModal(false)} title="Todos los lotes" size="xl">
          <LoteTable
            lotes={lotes.lotes}
            onEdit={(item) => {
              lotes.setEditData(item);
              lotes.setShowModal(true);
              setShowLotesModal(false);
            }}
            onDelete={lotes.borrarLote}
            onReactivate={lotes.ReactivarLote}
            onAdd={() => {
              lotes.setShowModal(true);
              setShowLotesModal(false);
            }}
          />
        </Modal>
      )}

      {showTareasModal && (
        <Modal isOpen={true} onClose={() => setShowTareasModal(false)} title="Tareas pendientes de siembras" size="xl">
          <TareaTable
            tareas={tareasSiembra}
            onEdit={(item) => {
              setTareaEditData(item);
              setShowTareaFormModal(true);
              setShowTareasModal(false);
            }}
            onDelete={borrarTarea}
            onAdd={() => {
              setTareaEditData(null);
              setShowTareaFormModal(true);
              setShowTareasModal(false);
            }}
          />
        </Modal>
      )}

      {showTareaFormModal && (
        <TareaForm
          initialData={tareaEditData}
          onSubmit={guardarTarea}
          onClose={() => {
            setShowTareaFormModal(false);
            setTareaEditData(null);
          }}
          empleados={empleados}
        />
      )}

      <div className="space-y-4">
        
        <ExpandableSection
          title="Siembras"
          subtitle="Relaciona cada cultivo con su lote y seguimiento."
          badge="Cultivo"
          action={
            <button type="button" className={actionButtonClass} onClick={() => siembra.setShowModal(true)}>
              <PlusCircle size={16} />
              Agregar siembra
            </button>
          }
        >
          <SiembraTable
            siembras={siembra.siembras}
            onEdit={(item) => {
              siembra.setEditData(item);
              siembra.setShowModal(true);
            }}
            onDelete={siembra.borrarSiembra}
            onAdd={() => siembra.setShowModal(true)}
          />
        </ExpandableSection>
      </div>

      {(lotes.loading || siembra.loading || loadT) && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-amber-400" />
        </div>
      )}
    </ModulePageShell>
  );
};

export default CampesinoSiembra;
