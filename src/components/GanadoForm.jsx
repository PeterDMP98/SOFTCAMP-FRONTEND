import { useEffect, useState } from "react";
import { X } from "lucide-react";

const GanadoForm = ({ initialData, onSubmit, onClose }) => {
  const [form, setForm] = useState({
    nombre_animal: "",
    numero_identificacion: "",
    sexo: "",
    raza: "",
    peso_actual: "",
    estado_salud: ""
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        nombre_animal: initialData.nombre_animal || "",
        numero_identificacion: initialData.numero_identificacion || "",
        sexo: initialData.sexo || "",
        raza: initialData.raza || "",
        peso_actual: initialData.peso_actual || "",
        estado_salud: initialData.estado_salud || ""
      });
    } else {
      setForm({
        nombre_animal: "",
        numero_identificacion: "",
        sexo: "",
        raza: "",
        peso_actual: "",
        estado_salud: ""
      });
    }
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 animate-fadeIn relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-semibold text-green-700 mb-4">
          {initialData ? "Editar Ganado" : "Agregar Ganado"}
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-3">

          <input
            type="text"
            name="nombre_animal"
            placeholder="Nombre"
            value={form.nombre_animal}
            onChange={handleChange}
            className="p-2 border rounded-md"
            required
          />

          <input
            type="text"
            name="numero_identificacion"
            placeholder="Identificación"
            value={form.numero_identificacion}
            onChange={handleChange}
            className="p-2 border rounded-md"
          />

          <select
            name="sexo"
            value={form.sexo}
            onChange={handleChange}
            className="p-2 border rounded-md"
            required
          >
            <option value="">Sexo</option>
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </select>

          <input
            type="text"
            name="raza"
            placeholder="Raza"
            value={form.raza}
            onChange={handleChange}
            className="p-2 border rounded-md"
          />

          <input
            type="number"
            name="peso_actual"
            placeholder="Peso (kg)"
            value={form.peso_actual}
            onChange={handleChange}
            className="p-2 border rounded-md"
            required
          />

          <input
            type="text"
            name="estado_salud"
            placeholder="Estado de salud"
            value={form.estado_salud}
            onChange={handleChange}
            className="p-2 border rounded-md"
            required
          />

          <button
            type="submit"
            className="mt-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition"
          >
            Guardar
          </button>

        </form>
      </div>
    </div>
  );
};

export default GanadoForm;
