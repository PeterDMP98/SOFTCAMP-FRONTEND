import { useState, useEffect } from "react";
import Input from "../UI/Input";
import Select from "../UI/Select";
import Button from "../UI/Button";
import Modal, { ModalFooter } from "../UI/Modal";

const StockForm = ({ initialData, onSubmit, onClose, productos = [] }) => {
  const [formData, setFormData] = useState({
    id_producto: "",
    cantidad: "",
    stock_minimo: "",
    ubicacion: "",
  });

  useEffect(() => {
    if (initialData) setFormData({
      id_producto: initialData.id_producto || "",
      cantidad: initialData.cantidad || initialData.cantidad_stock || "",
      stock_minimo: initialData.stock_minimo || "",
      ubicacion: initialData.ubicacion || "",
    });
  }, [initialData]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = Object.fromEntries(Object.entries(formData).filter(([_, v]) => v !== ""));
    const { cantidad, stock_minimo, ubicacion, ...rest } = clean;
    onSubmit({
      ...rest,
      id_stock: initialData?.id_stock,
      cantidad_stock: parseInt(cantidad) || 0,
      unidad_de_medida: "kg",
      cantidad_en_paquetes: 0,
      precio: 0,
    });
  };

  const prodOptions = productos.map(p => ({ value: p.id_producto, label: p.nombre }));

  return (
    <Modal isOpen={true} onClose={onClose} title={initialData ? "Editar Stock" : "Nuevo Stock"} size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select label="Producto" name="id_producto" value={formData.id_producto} onChange={handleChange} options={prodOptions} required />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Cantidad" name="cantidad" type="number" value={formData.cantidad} onChange={handleChange} required />
          <Input label="Stock Mínimo" name="stock_minimo" type="number" value={formData.stock_minimo} onChange={handleChange} />
        </div>
        <Input label="Ubicación" name="ubicacion" value={formData.ubicacion} onChange={handleChange} placeholder="Ej: Bodega A" />
        <ModalFooter>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit">{initialData ? "Actualizar" : "Crear"}</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default StockForm;