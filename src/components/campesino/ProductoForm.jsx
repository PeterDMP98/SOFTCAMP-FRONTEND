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
  });

  useEffect(() => {
    if (initialData) setFormData({
      nombre: initialData.nombre || "",
      descripcion: initialData.descripcion || initialData.descriptcion || "",
      categoria: initialData.categoria || initialData.id_categoria || "",
      unidad_medida: initialData.unidad_medida || initialData.unidad_de_medida || "kg",
    });
  }, [initialData]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = Object.fromEntries(Object.entries(formData).filter(([_, v]) => v !== ""));
    const { descripcion, categoria, unidad_medida, ...rest } = clean;
    onSubmit({
      ...rest,
      id_producto: initialData?.id_producto,
      descriptcion: descripcion,
      id_categoria: parseInt(categoria) || 1,
      unidad_de_medida: unidad_medida,
      cantidad_total: 0,
    });
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
          <label className="text-sm font-medium text-white">Descripción</label>
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows={2} className="rounded-2xl border border-white/10 bg-[#0d0f15] px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-400/60 resize-none" />
        </div>
        <Select label="Categoría" name="categoria" value={formData.categoria} onChange={handleChange} options={catOptions} required />
        <Select label="Unidad de Medida" name="unidad_medida" value={formData.unidad_medida} onChange={handleChange} options={unidadOptions} />
        <ModalFooter>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit">{initialData ? "Actualizar" : "Crear"}</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default ProductoForm;