import { useState, useEffect } from "react";
import Input from "../UI/Input";
import Select from "../UI/Select";
import Button from "../UI/Button";
import Modal, { ModalFooter } from "../UI/Modal";

const TareaForm = ({ initialData, onSubmit, onClose, empleados = [] }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    id_empleado: "",
    prioridad: "media",
    fecha_limite: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        titulo: initialData.titulo || "",
        descripcion: initialData.descripcion || "",
        id_empleado: initialData.id_empleado || "",
        prioridad: initialData.prioridad || "media",
        fecha_limite: initialData.fecha_limite?.split("T")[0] || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = Object.fromEntries(Object.entries(formData).filter(([_, v]) => v !== ""));
    const { descripcion, id_empleado, ...rest } = clean;
    onSubmit({ ...rest, id_tarea: initialData?.id_tarea, detalle: descripcion });
  };

  const prioridadOptions = [
    { value: "baja", label: "Baja" },
    { value: "media", label: "Media" },
    { value: "alta", label: "Alta" },
  ];

  const empOptions = empleados.map(e => ({ value: e.id_empleado, label: e.nombre }));

  return (
    <Modal isOpen={true} onClose={onClose} title={initialData ? "Editar Tarea" : "Nueva Tarea"} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Título" name="titulo" value={formData.titulo} onChange={handleChange} required />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-white">Descripción</label>
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows={3} className="rounded-2xl border border-white/10 bg-[#0d0f15] px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-400/60 resize-none" />
        </div>
        <Select label="Asignar a" name="id_empleado" value={formData.id_empleado} onChange={handleChange} options={empOptions} placeholder="Sin asignar" />
        <div className="grid grid-cols-2 gap-4">
          <Select label="Prioridad" name="prioridad" value={formData.prioridad} onChange={handleChange} options={prioridadOptions} />
          <Input label="Fecha Límite" name="fecha_limite" type="date" value={formData.fecha_limite} onChange={handleChange} />
        </div>
        <ModalFooter>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit">{initialData ? "Actualizar" : "Crear"}</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default TareaForm;