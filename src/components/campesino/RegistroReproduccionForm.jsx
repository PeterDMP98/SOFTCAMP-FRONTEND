import { useState, useEffect } from "react";
import Select from "../UI/Select";
import Button from "../UI/Button";
import Modal, { ModalFooter } from "../UI/Modal";

const TIPO_SERVICIO_MAP = {
  monta: "MONTA_NATURAL",
  inseminacion: "INSEMINACION_ARTIFICIAL",
  embrion: "INSEMINACION_ARTIFICIAL",
};

const RegistroReproduccionForm = ({ initialData, onSubmit, onClose, animales = [] }) => {
  const [formData, setFormData] = useState({ id_ganado_madre: "", id_ganado_padre: "", tipo: "monta", notas: "" });

  useEffect(() => {
    if (initialData) setFormData({ id_ganado_madre: initialData.id_ganado_madre || initialData.id_madre || "", id_ganado_padre: initialData.id_ganado_padre || initialData.id_padre || "", tipo: initialData.tipo || "monta", notas: initialData.notas || initialData.detalles || "" });
  }, [initialData]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = Object.fromEntries(Object.entries(formData).filter(([_, v]) => v !== ""));
    const { id_ganado_madre, id_ganado_padre, tipo, notas, ...rest } = clean;
    onSubmit({
      ...rest,
      id_reproduccion: initialData?.id_reproduccion,
      id_madre: parseInt(id_ganado_madre),
      id_padre: parseInt(id_ganado_padre) || null,
      tipo_servicio: TIPO_SERVICIO_MAP[tipo] || "MONTA_NATURAL",
      detalles: notas,
    });
  };

  const aniOptions = animales.map(a => ({ value: a.id_ganado, label: `${a.nombre} (${a.identificacion})` }));
  const tipoOptions = [{ value: "monta", label: "Monta Natural" }, { value: "inseminacion", label: "Inseminación" }, { value: "embrion", label: "Transferencia de Embrión" }];

  return (
    <Modal isOpen={true} onClose={onClose} title={initialData ? "Editar Registro" : "Nueva Reproducción"} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select label="Madre" name="id_ganado_madre" value={formData.id_ganado_madre} onChange={handleChange} options={aniOptions} required />
        <Select label="Padre" name="id_ganado_padre" value={formData.id_ganado_padre} onChange={handleChange} options={aniOptions} />
        <Select label="Tipo" name="tipo" value={formData.tipo} onChange={handleChange} options={tipoOptions} />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-white">Notas</label>
          <textarea name="notas" value={formData.notas} onChange={handleChange} rows={2} className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-200 border-white/10 bg-[#111019] text-withe" /></div>
        <ModalFooter><Button variant="secondary" onClick={onClose}>Cancelar</Button><Button type="submit">{initialData ? "Actualizar" : "Crear"}</Button></ModalFooter>
      </form>
    </Modal>
  );
};

export default RegistroReproduccionForm;