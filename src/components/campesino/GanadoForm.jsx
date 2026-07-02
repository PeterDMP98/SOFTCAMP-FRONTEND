import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { ESTADO_SALUD } from "../../constants/estadoSalud";

const initialFormState = {
  nombre_animal: "",
  numero_identificacion: "",
  sexo: "",
  raza: "",
  peso_actual: "",
  estado_salud: "SANO",
  estado_reproductivo: "",
  fecha_gestacion: "",
  fecha_nacimiento: "",
  detalle: "",
  precio: "",
};

const GanadoForm = ({ initialData, onSubmit, onClose }) => {
  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    if (initialData) {
      setForm({
        nombre_animal: initialData.nombre_animal || "",
        numero_identificacion: initialData.numero_identificacion || "",
        sexo: initialData.sexo || "",
        raza: initialData.raza || "",
        peso_actual: initialData.peso_actual || "",
        estado_salud: initialData.estado_salud || "SANO",
        estado_reproductivo: initialData.estado_reproductivo || "",
        fecha_gestacion: initialData.fecha_gestacion || "",
        fecha_nacimiento: initialData.fecha_nacimiento || "",
        detalle: initialData.detalle || "",
        precio: initialData.precio || "",
      });
    } else {
      setForm(initialFormState);
    }
  }, [initialData]);

  /** Resetear campos que no aplican */
  useEffect(() => {
    if (form.sexo === "Macho") {
      setForm((prev) => ({
        ...prev,
        estado_reproductivo: "",
        fecha_gestacion: "",
      }));
    }
  }, [form.sexo]);

  useEffect(() => {
    if (form.estado_reproductivo !== "Gestante") {
      setForm((prev) => ({
        ...prev,
        fecha_gestacion: "",
      }));
    }
  }, [form.estado_reproductivo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...form };

    // Limpiar strings vacíos para que la validación Zod no falle
    for (const key of Object.keys(payload)) {
      if (payload[key] === "") {
        delete payload[key];
      }
    }

    // Limpieza final antes de enviar
    if (payload.sexo === "Macho") {
      delete payload.estado_reproductivo;
      delete payload.fecha_gestacion;
    }

    if (payload.estado_reproductivo !== "Gestante") {
      delete payload.fecha_gestacion;
    }

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#111019] w-full max-w-lg rounded-2xl shadow-2xl p-6 relative border border-white/10">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-white transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-semibold text-emerald-400 mb-4">
          {initialData ? "Editar Ganado" : "Agregar Ganado"}
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-3">

          <input
            name="nombre_animal"
            placeholder="Nombre del animal"
            value={form.nombre_animal}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-[#0d0f15] px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-400/60"
            required
          />

          <input
            name="numero_identificacion"
            placeholder="Identificación"
            value={form.numero_identificacion}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-[#0d0f15] px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-400/60"
          />

          <select
            name="sexo"
            value={form.sexo}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-[#0d0f15] px-4 py-3 text-sm text-white outline-none"
            required
          >
            <option value="">Sexo</option>
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </select>

          <input
            name="raza"
            placeholder="Raza"
            value={form.raza}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-[#0d0f15] px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-400/60"
          />

          <input
            type="number"
            name="peso_actual"
            placeholder="Peso (kg)"
            value={form.peso_actual}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-[#0d0f15] px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-400/60"
            required
          />

          {/* Estado de salud */}
          <select
            name="estado_salud"
            value={form.estado_salud}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-[#0d0f15] px-4 py-3 text-sm text-white outline-none"
          >
            {Object.entries(ESTADO_SALUD).map(([key, value]) => (
              <option key={key} value={key}>
                {value.label}
              </option>
            ))}
          </select>

          {/* Estado reproductivo solo si es hembra */}
          {form.sexo === "Hembra" && (
            <select
              name="estado_reproductivo"
              value={form.estado_reproductivo}
              onChange={handleChange}
              className="rounded-2xl border border-white/10 bg-[#0d0f15] px-4 py-3 text-sm text-white outline-none"
            >
              <option value="">Estado reproductivo</option>
              <option value="Gestante">Gestante</option>
              <option value="Vacía">Vacía</option>
              <option value="Desconocido">Desconocido</option>
            </select>
          )}

          {/* Fecha de gestación solo si está gestante */}
          {form.estado_reproductivo === "Gestante" && (
            <div className="flex flex-col">
              <label className="text-sm text-slate-300">Primer dia de gestacion</label>
              <input
                type="date"
                name="fecha_gestacion"
                value={form.fecha_gestacion}
                onChange={handleChange}
                className="rounded-2xl border border-white/10 bg-[#0d0f15] px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/60"
              />
            </div>
          )}

          <textarea
            name="detalle"
            placeholder="Observaciones"
            value={form.detalle}
            onChange={handleChange}
            className="rounded-2xl border border-white/10 bg-[#0d0f15] px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-400/60 resize-none"
            rows={3}
          />

          <button
            type="submit"
            className="mt-2 rounded-2xl border border-white/10 bg-emerald-500/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500/30"
          >
            Guardar
          </button>

        </form>
      </div>
    </div>
  );
};

export default GanadoForm;
