import { useState, useEffect } from "react";
import Input from "../UI/Input";
import Select from "../UI/Select";
import Button from "../UI/Button";
import Modal, { ModalFooter } from "../UI/Modal";

const SiembraForm = ({ initialData, onSubmit, onClose, lotes = [] }) => {
  const [formData, setFormData] = useState({
    id_lote: "",
    tipo_cultivo: "",
    fecha_siembra: "",
    fecha_cosecha_estimada: "",
    area_sembrada: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id_lote: initialData.id_lote || "",
        tipo_cultivo: initialData.tipo_cultivo || initialData.nombre || "",
        fecha_siembra: initialData.fecha_siembra?.split("T")[0] || initialData.fecha_de_siembra?.split("T")[0] || "",
        fecha_cosecha_estimada: initialData.fecha_cosecha_estimada?.split("T")[0] || initialData.fecha_de_cosecha?.split("T")[0] || "",
        area_sembrada: initialData.area_sembrada || initialData.cantidad || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = Object.fromEntries(Object.entries(formData).filter(([_, v]) => v !== ""));
    const { tipo_cultivo, fecha_siembra, fecha_cosecha_estimada, area_sembrada, ...rest } = clean;
    onSubmit({
      ...rest,
      id_siembra: initialData?.id_siembra,
      nombre: tipo_cultivo,
      fecha_de_siembra: fecha_siembra,
      fecha_de_cosecha: fecha_cosecha_estimada,
      cantidad: parseFloat(area_sembrada) || 0,
      estado: "Abierta",
    });
  };

  const loteOptions = lotes.map(l => ({ value: l.id_lote, label: l.nombre }));

  return (
    <Modal isOpen={true} onClose={onClose} title={initialData ? "Editar Siembra" : "Nueva Siembra"} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Lote"
          name="id_lote"
          value={formData.id_lote}
          onChange={handleChange}
          options={loteOptions}
          required
        />

        <Input
          label="Tipo de Cultivo"
          name="tipo_cultivo"
          value={formData.tipo_cultivo}
          onChange={handleChange}
          placeholder="Ej: Yuca, Maíz, Plátano"
          required
        />

        <Input
          label="Fecha de Siembra"
          name="fecha_siembra"
          type="date"
          value={formData.fecha_siembra}
          onChange={handleChange}
          required
        />

        <Input
          label="Fecha de Cosecha Estimada"
          name="fecha_cosecha_estimada"
          type="date"
          value={formData.fecha_cosecha_estimada}
          onChange={handleChange}
        />

        <Input
          label="Área Sembrada (ha)"
          name="area_sembrada"
          type="number"
          step="0.01"
          value={formData.area_sembrada}
          onChange={handleChange}
        />

        <ModalFooter>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit">{initialData ? "Actualizar" : "Crear"}</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default SiembraForm;