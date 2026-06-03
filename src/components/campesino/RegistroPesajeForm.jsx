import { useState, useEffect } from "react";
import Input from "../UI/Input";
import Select from "../UI/Select";
import Button from "../UI/Button";
import Modal, { ModalFooter } from "../UI/Modal";

const RegistroPesajeForm = ({ initialData, onSubmit, onClose, animales = [] }) => {
  const [formData, setFormData] = useState({ id_ganado: "", peso_kg: "", fecha_pesaje: "", notas: "" });

  useEffect(() => {
    if (initialData) setFormData({ id_ganado: initialData.id_ganado || "", peso_kg: initialData.peso_kg || "", fecha_pesaje: initialData.fecha_pesaje?.split("T")[0] || "", notas: initialData.notas || "" });
  }, [initialData]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); onSubmit({ ...formData, id_pesaje: initialData?.id_pesaje, peso_kg: parseFloat(formData.peso_kg) || 0 }); };

  const aniOptions = animales.map(a => ({ value: a.id_ganado, label: `${a.nombre} (${a.identificacion})` }));

  return (
    <Modal isOpen={true} onClose={onClose} title={initialData ? "Editar Pesaje" : "Nuevo Pesaje"} size="sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select label="Animal" name="id_ganado" value={formData.id_ganado} onChange={handleChange} options={aniOptions} required />
        <Input label="Peso (kg)" name="peso_kg" type="number" step="0.01" value={formData.peso_kg} onChange={handleChange} required />
        <Input label="Fecha" name="fecha_pesaje" type="date" value={formData.fecha_pesaje} onChange={handleChange} required />
        <div className="flex flex-col gap-1"><label className="text-sm font-medium text-gray-700">Notas</label><textarea name="notas" value={formData.notas} onChange={handleChange} rows={2} className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-200" /></div>
        <ModalFooter><Button variant="secondary" onClick={onClose}>Cancelar</Button><Button type="submit">{initialData ? "Actualizar" : "Crear"}</Button></ModalFooter>
      </form>
    </Modal>
  );
};

export default RegistroPesajeForm;