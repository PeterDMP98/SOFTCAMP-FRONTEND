import { useState, useEffect } from "react";
import Input from "../UI/Input";
import Select from "../UI/Select";
import Button from "../UI/Button";
import Modal, { ModalFooter } from "../UI/Modal";

const EmpleadoForm = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    cedula: "",
    telefono: "",
    direccion: "",
    rol: "trabajador",
    salario: "",
  });

  useEffect(() => {
    if (initialData) setFormData({
      nombre: initialData.nombre || "",
      cedula: initialData.cedula || "",
      telefono: initialData.telefono || "",
      direccion: initialData.direccion || "",
      rol: initialData.rol || "trabajador",
      salario: initialData.salario || "",
    });
  }, [initialData]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); const clean = Object.fromEntries(Object.entries(formData).filter(([_, v]) => v !== "")); onSubmit({ ...clean, id_empleado: initialData?.id_empleado, salario: parseFloat(formData.salario) || 0 }); };

  const rolOptions = [
    { value: "trabajador", label: "Trabajador" },
    { value: "administrador", label: "Administrador de Fundo" },
    { value: "encargado", label: "Encargado de Ganado" },
  ];

  return (
    <Modal isOpen={true} onClose={onClose} title={initialData ? "Editar Empleado" : "Nuevo Empleado"} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Cédula" name="cedula" value={formData.cedula} onChange={handleChange} required />
          <Input label="Teléfono" name="telefono" value={formData.telefono} onChange={handleChange} />
        </div>
        <Input label="Dirección" name="direccion" value={formData.direccion} onChange={handleChange} />
        <Select label="Rol" name="rol" value={formData.rol} onChange={handleChange} options={rolOptions} />
        <Input label="Salario" name="salario" type="number" step="0.01" value={formData.salario} onChange={handleChange} />
        <ModalFooter>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit">{initialData ? "Actualizar" : "Crear"}</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default EmpleadoForm;