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
    rendimiento_esperado: "",
    observaciones: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id_lote: initialData.id_lote || "",
        tipo_cultivo: initialData.tipo_cultivo || "",
        fecha_siembra: initialData.fecha_siembra?.split("T")[0] || "",
        fecha_cosecha_estimada: initialData.fecha_cosecha_estimada?.split("T")[0] || "",
        area_sembrada: initialData.area_sembrada || "",
        rendimiento_esperado: initialData.rendimiento_esperado || "",
        observaciones: initialData.observaciones || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id_siembra: initialData?.id_siembra,
      area_sembrada: parseFloat(formData.area_sembrada) || 0,
      rendimiento_esperado: parseFloat(formData.rendimiento_esperado) || 0,
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

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Área Sembrada (ha)"
            name="area_sembrada"
            type="number"
            step="0.01"
            value={formData.area_sembrada}
            onChange={handleChange}
          />

          <Input
            label="Rendimiento Esperado (kg/ha)"
            name="rendimiento_esperado"
            type="number"
            value={formData.rendimiento_esperado}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Observaciones</label>
          <textarea
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            rows={3}
            className="p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>

        <ModalFooter>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit">{initialData ? "Actualizar" : "Crear"}</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default SiembraForm;