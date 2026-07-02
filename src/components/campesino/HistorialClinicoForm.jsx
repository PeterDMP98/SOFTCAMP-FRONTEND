import { useState, useEffect } from "react";
import Input from "../UI/Input";
import Select from "../UI/Select";
import Button from "../UI/Button";
import Modal, { ModalFooter } from "../UI/Modal";

const HistorialClinicoForm = ({ initialData, onSubmit, onClose, animales = [] }) => {
  const [formData, setFormData] = useState({
    id_ganado: "",
    tipo_registro: "vacuna",
    fecha_registro: "",
    descripcion: "",
    notes: "",
  });

  useEffect(() => {
    if (initialData) setFormData({
      id_ganado: initialData.id_ganado || "",
      tipo_registro: initialData.tipo_registro || "vacuna",
      fecha_registro: initialData.fecha_registro?.split("T")[0] || "",
      descripcion: initialData.descripcion || "",
      notes: initialData.notes || "",
    });
  }, [initialData]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); const clean = Object.fromEntries(Object.entries(formData).filter(([_, v]) => v !== "")); onSubmit({ ...clean, id_historial: initialData?.id_historial }); };

  const tipoOptions = [
    { value: "vacuna", label: "Vacuna" },
    { value: "tratamiento", label: "Tratamiento" },
    { value: "cirugia", label: "Cirugía" },
    { value: "revision", label: "Revisión" },
    { value: "otro", label: "Otro" },
  ];

  const aniOptions = animales.map(a => ({ value: a.id_ganado, label: `${a.nombre} (${a.identificacion})` }));

  return (
    <Modal isOpen={true} onClose={onClose} title={initialData ? "Editar Registro" : "Nuevo Registro Clínico"} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select label="Animal" name="id_ganado" value={formData.id_ganado} onChange={handleChange} options={aniOptions} required />
        <Select label="Tipo de Registro" name="tipo_registro" value={formData.tipo_registro} onChange={handleChange} options={tipoOptions} />
        <Input label="Fecha" name="fecha_registro" type="date" value={formData.fecha_registro} onChange={handleChange} required />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-white">Descripción</label>
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows={2} className="p-2 rounded-lg outline-none focus:ring-2 focus:ring-green-200 border border-white/10 bg-[#111019] text-withe" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-white">Notas</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} rows={2} className="p-2 rounded-lg outline-none focus:ring-2 focus:ring-green-200 border border-white/10 bg-[#111019] text-withe" />
        </div>
        <ModalFooter>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit">{initialData ? "Actualizar" : "Crear"}</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default HistorialClinicoForm;