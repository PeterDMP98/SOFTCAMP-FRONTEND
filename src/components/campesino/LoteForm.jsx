import { useState, useEffect } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Modal, { ModalFooter } from "../UI/Modal";

const LoteForm = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    ubicacion: "",
    area_hectareas: "",
    descripcion: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || "",
        ubicacion: initialData.ubicacion || "",
        area_hectareas: initialData.area_hectareas || "",
        descripcion: initialData.descripcion || "",
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
      id_lote: initialData?.id_lote,
      area_hectareas: parseFloat(formData.area_hectareas) || 0,
    });
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={initialData ? "Editar Lote" : "Nuevo Lote"}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nombre del Lote"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ej: Lote Norte"
          required
        />

        <Input
          label="Ubicación"
          name="ubicacion"
          value={formData.ubicacion}
          onChange={handleChange}
          placeholder="Ej: Vereda El Carmen"
        />

        <Input
          label="Área (hectáreas)"
          name="area_hectareas"
          type="number"
          step="0.01"
          value={formData.area_hectareas}
          onChange={handleChange}
          placeholder="Ej: 5.5"
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción opcional del lote..."
            rows={3}
            className="p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
          />
        </div>

        <ModalFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            {initialData ? "Actualizar" : "Crear"}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default LoteForm;