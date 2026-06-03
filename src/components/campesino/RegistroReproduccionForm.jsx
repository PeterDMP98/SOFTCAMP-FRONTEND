import { useState, useEffect } from "react";
import Input from "../UI/Input";
import Select from "../UI/Select";
import Button from "../UI/Button";
import Modal, { ModalFooter } from "../UI/Modal";

const RegistroReproduccionForm = ({ initialData, onSubmit, onClose, animales = [] }) => {
  const [formData, setFormData] = useState({ id_ganado_madre: "", id_ganado_padre: "", tipo: "monta", fecha: "", resultado: "pendiente", numero_crías: "1", notas: "" });

  useEffect(() => {
    if (initialData) setFormData({ id_ganado_madre: initialData.id_ganado_madre || "", id_ganado_padre: initialData.id_ganado_padre || "", tipo: initialData.tipo || "monta", fecha: initialData.fecha?.split("T")[0] || "", resultado: initialData.resultado || "pendiente", numero_crías: initialData.numero_crías || "1", notas: initialData.notas || "" });
  }, [initialData]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); onSubmit({ ...formData, id_reproduccion: initialData?.id_reproduccion, numero_crías: parseInt(formData.numero_crías) || 1 }); };

  const aniOptions = animales.map(a => ({ value: a.id_ganado, label: `${a.nombre} (${a.identificacion})` }));
  const tipoOptions = [{ value: "monta", label: "Monta Natural" }, { value: "inseminacion", label: "Inseminación" }, { value: "embrion", label: "Transferencia de Embrión" }];
  const resultadoOptions = [{ value: "pendiente", label: "Pendiente" }, { value: "exitoso", label: "Exitoso" }, { value: "fallido", label: "Fallido" }];

  return (
    <Modal isOpen={true} onClose={onClose} title={initialData ? "Editar Registro" : "Nueva Reproducción"} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select label="Madre" name="id_ganado_madre" value={formData.id_ganado_madre} onChange={handleChange} options={aniOptions} required />
        <Select label="Padre" name="id_ganado_padre" value={formData.id_ganado_padre} onChange={handleChange} options={aniOptions} />
        <div className="grid grid-cols-2 gap-4"><Select label="Tipo" name="tipo" value={formData.tipo} onChange={handleChange} options={tipoOptions} /><Input label="Fecha" name="fecha" type="date" value={formData.fecha} onChange={handleChange} required /></div>
        <div className="grid grid-cols-2 gap-4"><Select label="Resultado" name="resultado" value={formData.resultado} onChange={handleChange} options={resultadoOptions} /><Input label="Número de Crías" name="numero_crías" type="number" value={formData.numero_crías} onChange={handleChange} /></div>
        <div className="flex flex-col gap-1"><label className="text-sm font-medium text-gray-700">Notas</label><textarea name="notas" value={formData.notas} onChange={handleChange} rows={2} className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-200" /></div>
        <ModalFooter><Button variant="secondary" onClick={onClose}>Cancelar</Button><Button type="submit">{initialData ? "Actualizar" : "Crear"}</Button></ModalFooter>
      </form>
    </Modal>
  );
};

export default RegistroReproduccionForm;