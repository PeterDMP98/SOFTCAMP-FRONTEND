import { X, Calendar, Syringe, HeartPulse, Scale, Baby, Pill, FileText, AlertTriangle, AlertCircle, CheckCircle, ChevronDown, ChevronUp, PawPrint, Mars, Venus, Shield, Thermometer, Stethoscope, User } from "lucide-react";

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES");
};

const EstadoSaludBadge = ({ estado }) => {
  const states = {
    SANO: "bg-green-500/20 text-green-400 border-green-500/30",
    ENFERMO: "bg-red-500/20 text-red-400 border-red-500/30",
    EN_TRATAMIENTO: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    RECUPERANDOSE: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    VACUNADO: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  };
  const style = states[estado?.toUpperCase()] || "bg-slate-500/20 text-slate-400 border-slate-500/30";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${style}`}>
      {estado || "SIN ESTADO"}
    </span>
  );
};

const Section = ({ title, icon: Icon, children, emptyMessage = "No hay registros", count, open = true, onToggle }) => {
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-white/5 to-transparent hover:from-white/10 transition-colors"
      >
        {Icon && <Icon size={18} className="text-emerald-400 flex-shrink-0" />}
        <h3 className="text-sm font-semibold text-white flex-1">{title} {count !== undefined && `(${count})`}</h3>
        {onToggle && <span className="flex-shrink-0 text-slate-400">{open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>}
      </button>
      {open && (
        <div className="p-4 space-y-3">
          {children || <p className="text-slate-400 text-sm text-center py-4">{emptyMessage}</p>}
        </div>
      )}
    </div>
  );
};

const InfoRow = ({ label, value, icon: Icon }) => (
  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
    {Icon && <Icon size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />}
    <div className="flex-1 min-w-0">
      <p className="text-xs text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-sm text-white break-words">{value ?? "-"}</p>
    </div>
  </div>
);

const ClinicalRecordCard = ({ record }) => (
  <div className="border border-white/10 rounded-lg p-4 bg-white/5">
    <div className="flex items-start justify-between gap-3 mb-3">
      <div className="flex-1">
        <p className="font-medium text-white">{record.tipo || "Registro clínico"}</p>
        <p className="text-xs text-slate-400">{formatDate(record.fecha)}</p>
      </div>
      <EstadoSaludBadge estado={record.estado_salud} />
    </div>
    <div className="grid gap-2 sm:grid-cols-2 text-sm">
      {record.diagnostico && <InfoRow label="Diagnóstico" value={record.diagnostico} icon={Stethoscope} />}
      {record.tratamiento && <InfoRow label="Tratamiento" value={record.tratamiento} icon={Pill} />}
      {record.medicamento && <InfoRow label="Medicamento" value={record.medicamento} icon={Syringe} />}
      {record.dosis && <InfoRow label="Dosis" value={record.dosis} icon={Thermometer} />}
      {record.veterinario && <InfoRow label="Veterinario" value={record.veterinario} icon={User} />}
      {record.observaciones && <InfoRow label="Observaciones" value={record.observaciones} icon={FileText} />}
    </div>
  </div>
);

const WeightRecordCard = ({ record }) => (
  <div className="border border-white/10 rounded-lg p-4 bg-white/5">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <Scale size={18} className="text-emerald-400" />
        <span className="font-medium text-white">Pesaje - {formatDate(record.fecha)}</span>
      </div>
      <span className="text-lg font-bold text-emerald-400">{record.peso} kg</span>
    </div>
    <div className="grid gap-2 sm:grid-cols-2 text-sm">
      {record.ganancia_peso_diaria && <InfoRow label="Ganancia diaria" value={`${record.ganancia_peso_diaria} kg/día`} />}
      {record.observaciones && <InfoRow label="Observaciones" value={record.observaciones} icon={FileText} />}
    </div>
  </div>
);

const ReproductionRecordCard = ({ record }) => (
  <div className="border border-white/10 rounded-lg p-4 bg-white/5">
    <div className="flex items-start justify-between gap-3 mb-3">
      <div className="flex-1">
        <p className="font-medium text-white">{record.tipo || "Reproducción"}</p>
        <p className="text-xs text-slate-400">{formatDate(record.fecha)}</p>
      </div>
      <EstadoSaludBadge estado={record.estado} />
    </div>
    <div className="grid gap-2 sm:grid-cols-2 text-sm">
      {record.padre && <InfoRow label="Padre" value={record.padre} icon={Mars} />}
      {record.madre && <InfoRow label="Madre" value={record.madre} icon={Venus} />}
      {record.fecha_parto_estimada && <InfoRow label="Parto estimado" value={formatDate(record.fecha_parto_estimada)} icon={Calendar} />}
      {record.fecha_parto_real && <InfoRow label="Parto real" value={formatDate(record.fecha_parto_real)} icon={CheckCircle} />}
      {record.numero_crias && <InfoRow label="N° crías" value={record.numero_crias} icon={Baby} />}
      {record.observaciones && <InfoRow label="Observaciones" value={record.observaciones} icon={FileText} />}
    </div>
  </div>
);

const GanadoDetailModal = ({ animal, historialClinico = [], registrosPesaje = [], registrosReproduccion = [], allGanado = [], onClose }) => {
  if (!animal) return null;

  const animalHistorial = historialClinico.filter(h => h.id_ganado === animal.id_ganado);
  const animalPesajes = registrosPesaje.filter(p => p.id_ganado === animal.id_ganado).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  const animalReproduccion = registrosReproduccion.filter(r => r.id_ganado === animal.id_ganado).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  
  const padre = allGanado.find(g => g.id_ganado === animal.id_padre);
  const madre = allGanado.find(g => g.id_ganado === animal.id_madre);
  const ultimaPeso = animalPesajes[0];

  const enTratamiento = animalHistorial.some(h => 
    String(h.estado_salud || "").toUpperCase() === "EN_TRATAMIENTO" || 
    String(h.tipo || "").toUpperCase() === "TRATAMIENTO"
  );
  const tratamientoActual = animalHistorial
    .filter(h => String(h.estado_salud || "").toUpperCase() === "EN_TRATAMIENTO" || String(h.tipo || "").toUpperCase() === "TRATAMIENTO")
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] bg-[#111019] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gradient-to-r from-emerald-500/10 to-transparent">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <PawPrint size={28} className="text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{animal.nombre_animal}</h2>
              <p className="text-sm text-slate-400">ID: {animal.numero_identificacion}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <InfoRow label="Sexo" value={animal.sexo} icon={animal.sexo === "Hembra" ? Venus : Mars} />
            <InfoRow label="Raza" value={animal.raza} icon={Shield} />
            <InfoRow label="Fecha nacimiento" value={formatDate(animal.fecha_nacimiento)} icon={Calendar} />
            <InfoRow label="Estado salud" value={<EstadoSaludBadge estado={animal.estado_salud} />} />
            <InfoRow label="Peso actual" value={`${animal.peso_actual || "-"} kg`} icon={Scale} />
            <InfoRow label="Último peso" value={ultimaPeso ? `${ultimaPeso.peso} kg (${formatDate(ultimaPeso.fecha)})` : "-"} icon={Scale} />
            {animal.id_padre && <InfoRow label="Padre" value={padre ? `${padre.nombre_animal} (${padre.numero_identificacion})` : "No registrado"} icon={Mars} />}
            {animal.id_madre && <InfoRow label="Madre" value={madre ? `${madre.nombre_animal} (${madre.numero_identificacion})` : "No registrada"} icon={Venus} />}
          </div>

          {enTratamiento && tratamientoActual && (
            <Section title="⚠ Tratamiento Actual" icon={AlertTriangle} count={1} open={true}>
              <div className="border border-amber-500/30 bg-amber-500/10 rounded-lg p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <InfoRow label="Diagnóstico" value={tratamientoActual.diagnostico} icon={Stethoscope} />
                  <InfoRow label="Tratamiento" value={tratamientoActual.tratamiento} icon={Pill} />
                  <InfoRow label="Medicamento" value={tratamientoActual.medicamento} icon={Syringe} />
                  <InfoRow label="Dosis" value={tratamientoActual.dosis} icon={Thermometer} />
                  <InfoRow label="Fecha inicio" value={formatDate(tratamientoActual.fecha)} icon={Calendar} />
                  <InfoRow label="Veterinario" value={tratamientoActual.veterinario} icon={User} />
                </div>
                {tratamientoActual.observaciones && (
                  <InfoRow label="Observaciones" value={tratamientoActual.observaciones} icon={FileText} className="sm:col-span-2" />
                )}
              </div>
            </Section>
          )}

          <Section 
            title="Historial Clínico y Vacunas" 
            icon={FileText} 
            count={animalHistorial.length}
            emptyMessage="Sin registros clínicos ni vacunas"
          >
            {animalHistorial.map((record) => (
              <ClinicalRecordCard key={record.id_historial} record={record} />
            ))}
          </Section>

          <Section 
            title="Control de Pesajes" 
            icon={Scale} 
            count={animalPesajes.length}
            emptyMessage="Sin registros de pesaje"
          >
            {animalPesajes.map((record) => (
              <WeightRecordCard key={record.id_pesaje} record={record} />
            ))}
          </Section>

          <Section 
            title="Registro Reproductivo" 
            icon={Baby} 
            count={animalReproduccion.length}
            emptyMessage="Sin registros reproductivos"
          >
            {animalReproduccion.map((record) => (
              <ReproductionRecordCard key={record.id_reproduccion} record={record} />
            ))}
          </Section>
        </div>
      </div>
    </div>
  );
};

export default GanadoDetailModal;