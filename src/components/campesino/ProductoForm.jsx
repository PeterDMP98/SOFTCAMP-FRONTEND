import { useState, useEffect } from "react";
import Input from "../UI/Input";
import Select from "../UI/Select";
import Button from "../UI/Button";
import Modal, { ModalFooter } from "../UI/Modal";

const ProductoForm = ({ initialData, onSubmit, onClose, categorias = [] }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    unidad_medida: "kg",
    precio_unitario: "",
  });

  useEffect(() => {
    if (initialData) setFormData({
      nombre: initialData.nombre || "",
      descripcion: initialData.descripcion || "",
      categoria: initialData.categoria || "",
      unidad_medida: initialData.unidad_medida || "kg",
      precio_unitario: initialData.precio_unitario || "",
    });
  }, [initialData]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, id_producto: initialData?.id_producto, precio_unitario: parseFloat(formData.precio_unitario) || 0 });
  };

  const catOptions = categorias.length > 0 
    ? categorias.map(c => ({ value: c, label: c }))
    : [
        { value: "Frutas", label: "Frutas" },
        { value: "Verduras", label: "Verduras" },
        { value: "Granos", label: "Granos" },
        { value: "Lácteos", label: "Lácteos" },
        { value: "Carnes", label: "Carnes" },
        { value: "Otros", label: "Otros" },
      ];

  const unidadOptions = [
    { value: "kg", label: "Kilogramos" },
    { value: "lb", label: "Libras" },
    { value: "und", label: "Unidades" },
    { value: "lt", label: "Litros" },
    { value: "gal", label: "Galones" },
  ];

  return (
    <Modal isOpen={true} onClose={onClose} title={initialData ? "Editar Producto" : "Nuevo Producto"} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ej: Yuca" required />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Descripción</label>
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows={2} className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-200" />
        </div>
        <Select label="Categoría" name="categoria" value={formData.categoria} onChange={handleChange} options={catOptions} required />
        <Select label="Unidad de Medida" name="unidad_medida" value={formData.unidad_medida} onChange={handleChange} options={unidadOptions} />
        <Input label="Precio Unitario" name="precio_unitario" type="number" step="0.01" value={formData.precio_unitario} onChange={handleChange} placeholder="0.00" required />
        <ModalFooter>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit">{initialData ? "Actualizar" : "Crear"}</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default ProductoForm;