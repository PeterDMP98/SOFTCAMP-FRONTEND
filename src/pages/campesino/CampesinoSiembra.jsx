import { Navigate } from "react-router-dom";
import { Sprout, MapPinned, PlusCircle, Layers3 } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useLote } from "../../hooks/useLote";
import { useSiembra } from "../../hooks/useSiembra";
import ModulePageShell from "../../components/campesino/ModulePageShell";
import ExpandableSection from "../../components/campesino/ExpandableSection";
import LoteForm from "../../components/campesino/LoteForm";
import LoteTable from "../../components/campesino/LoteTable";
import SiembraForm from "../../components/campesino/SiembraForm";
import SiembraTable from "../../components/campesino/SiembraTable";

const actionButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10";

const CampesinoSiembra = () => {
  const { user } = useAuth();
  if (!user || user.grupo !== "campesino") return <Navigate to="/login" replace />;

  const lotes = useLote();
  const siembra = useSiembra();

  const stats = [
    {
      label: "Lotes activos",
      value: lotes.lotes.length,
      hint: "Terrenos disponibles para cultivar",
      icon: <MapPinned size={18} />,
    },
    {
      label: "Siembras registradas",
      value: siembra.siembras.length,
      hint: "Cultivos y seguimientos activos",
      icon: <Sprout size={18} />,
    },
    {
      label: "Vista consolidada",
      value: "2 secciones",
      hint: "Lotes y siembra en una sola pagina",
      icon: <Layers3 size={18} />,
    },
    {
      label: "Estado",
      value: lotes.loading || siembra.loading ? "Sincronizando" : "Listo",
      hint: "Control local y remoto",
      icon: <PlusCircle size={18} />,
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

      <div className="space-y-4">
        <ExpandableSection
          title="Lotes"
          subtitle="Administra los terrenos y su estado actual."
          badge="Base"
          defaultOpen
          action={
            <button type="button" className={actionButtonClass} onClick={() => lotes.setShowModal(true)}>
              <PlusCircle size={16} />
              Agregar lote
            </button>
          }
        >
          <LoteTable
            lotes={lotes.lotes}
            onEdit={(item) => {
              lotes.setEditData(item);
              lotes.setShowModal(true);
            }}
            onDelete={lotes.borrarLote}
            onReactivate={lotes.ReactivateLote}
            onAdd={() => lotes.setShowModal(true)}
          />
        </ExpandableSection>

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

      {(lotes.loading || siembra.loading) && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-amber-400" />
        </div>
      )}
    </ModulePageShell>
  );
};

export default CampesinoSiembra;
