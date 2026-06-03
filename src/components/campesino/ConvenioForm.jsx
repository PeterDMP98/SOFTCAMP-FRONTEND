import { useState, useEffect } from "react";
import Input from "../UI/Input";
import Select from "../UI/Select";
import Button from "../UI/Button";
import Modal, { ModalFooter } from "../UI/Modal";

const ConvenioForm = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({ id_usuario_comprador: "", descuento: "", detalle_de_contrato: "", fecha_fin: "", estado: "activo" });

  useEffect(() => {
    if (initialData) setFormData({ id_usuario_comprador: initialData.id_usuario_comprador || "", descuento: initialData.descuento || "", detalle_de_contrato: initialData.detalle_de_contrato || "", fecha_fin: initialData.fecha_fin?.split("T")[0] || "", estado: initialData.estado || "activo" });
  }, [initialData]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); onSubmit({ ...formData, id_convenio: initialData?.id_convenio, descuento: parseFloat(formData.descuento) || 0 }); };

  const estadoOptions = [{ value: "activo", label: "Activo" }, { value: "pausado", label: "Pausado" }, { value: "cancelado", label: "Cancelado" }, { value: "finalizado", label: "Finalizado" }];

  return (
    <Modal isOpen={true} onClose={onClose} title={initialData ? "Editar Convenio" : "Nuevo Convenio"} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="ID Comprador" name="id_usuario_comprador" type="number" value={formData.id_usuario_comprador} onChange={handleChange} required />
        <Input label="Descuento (%)" name="descuento" type="number" step="0.01" value={formData.descuento} onChange={handleChange} placeholder="0.15 = 15%" />
        <div className="flex flex-col gap-1"><label className="text-sm font-medium text-gray-700">Detalles del Contrato</label><textarea name="detalle_de_contrato" value={formData.detalle_de_contrato} onChange={handleChange} rows={3} className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-200" /></div>
        <div className="grid grid-cols-2 gap-4"><Input label="Fecha Fin" name="fecha_fin" type="date" value={formData.fecha_fin} onChange={handleChange} /><Select label="Estado" name="estado" value={formData.estado} onChange={handleChange} options={estadoOptions} /></div>
        <ModalFooter><Button variant="secondary" onClick={onClose}>Cancelar</Button><Button type="submit">{initialData ? "Actualizar" : "Crear"}</Button></ModalFooter>
      </form>
    </Modal>
  );
};

export default ConvenioForm;