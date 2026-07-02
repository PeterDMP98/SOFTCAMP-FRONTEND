import { useState, useEffect } from "react";
import Input from "../UI/Input";
import Select from "../UI/Select";
import Button from "../UI/Button";
import Modal, { ModalFooter } from "../UI/Modal";
import { useContrapartes } from "../../hooks/useContrapartes";

const ConvenioCompradorForm = ({ initialData, onSubmit, onClose }) => {
  const { options, loading: loadingUsers, error: usersError } = useContrapartes();
  const [formData, setFormData] = useState({
    id_usuario_campesino: "",
    descuento: "",
    detalle_de_contrato: "",
    fecha_fin: "",
    estado: "activo",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id_usuario_campesino: String(initialData.id_usuario_campesino || ""),
        descuento: initialData.descuento ?? "",
        detalle_de_contrato: initialData.detalle_de_contrato || "",
        fecha_fin: initialData.fecha_fin?.split("T")[0] || "",
        estado: initialData.estado || "activo",
      });
    }
  }, [initialData]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = Object.fromEntries(Object.entries(formData).filter(([_, v]) => v !== ""));
    onSubmit({
      ...clean,
      id_convenio: initialData?.id_convenio,
      id_usuario_campesino: parseInt(formData.id_usuario_campesino, 10),
      descuento: parseFloat(formData.descuento) || 0,
    });
  };

  const estadoOptions = [
    { value: "activo", label: "Activo" },
    { value: "pausado", label: "Pausado" },
    { value: "cancelado", label: "Cancelado" },
    { value: "finalizado", label: "Finalizado" },
  ];

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={initialData ? "Editar Convenio" : "Nuevo Convenio con Campesino"}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {!initialData && (
          <>
            <Select
              label="Campesino"
              name="id_usuario_campesino"
              value={formData.id_usuario_campesino}
              onChange={handleChange}
              placeholder={loadingUsers ? "Cargando..." : "Seleccione campesino"}
              options={options}
              required
              disabled={loadingUsers}
            />
            {usersError && <p className="text-sm text-red-600">{usersError}</p>}
          </>
        )}
        <Input
          label="Descuento (decimal)"
          name="descuento"
          type="number"
          step="0.01"
          min="0"
          max="1"
          value={formData.descuento}
          onChange={handleChange}
          placeholder="0.15 = 15%"
        />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-white">Detalles del contrato</label>
          <textarea
            name="detalle_de_contrato"
            value={formData.detalle_de_contrato}
            onChange={handleChange}
            rows={3}
            className="rounded-2xl border border-white/10 bg-[#0d0f15] px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-400/60 resize-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Fecha fin" name="fecha_fin" type="date" value={formData.fecha_fin} onChange={handleChange} />
          <Select label="Estado" name="estado" value={formData.estado} onChange={handleChange} options={estadoOptions} />
        </div>
        <ModalFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={!initialData && !formData.id_usuario_campesino}>
            {initialData ? "Actualizar" : "Crear"}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default ConvenioCompradorForm;
