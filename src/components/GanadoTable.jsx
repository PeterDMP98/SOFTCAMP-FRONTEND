// src/components/GanadoTable.jsx
import { Pencil, Trash2 } from "lucide-react";
import { Plus } from "lucide-react";


const GanadoTable = ({
  ganadoList = [],
  onEdit,
  onDelete,
  onSort,
  sortField,
  sortDirection,
  onAdd
}) => {

  if (!ganadoList.length) {
    return (
      <div className="bg-white shadow-md rounded-2xl p-6 text-center text-gray-600">
        No hay registros de ganado aún.
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-2xl px-6 py-3 relative">

      {/* Botón agregar flotante */}
      <div className="flex justify-end mb-2">
        <button
          onClick={onAdd}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg shadow transition flex items-center gap-2">       <Plus size={18} />
          Agregar
        </button>
      </div>


      {/* TABLA — solo visible en pantallas md o superiores */}
      <table className="hidden md:table w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            {[
              { field: "nombre_animal", label: "Nombre" },
              { field: "numero_identificacion", label: "Identificación" },
              { field: "sexo", label: "Sexo" },
              { field: "raza", label: "Raza" },
              { field: "peso_actual", label: "Peso (kg)" },
              { field: "estado_salud", label: "Salud" }
            ].map(({ field, label }) => (
              <th
                key={field}
                className="p-2 cursor-pointer select-none"
                onClick={() => onSort(field)}
              >
                {label} {sortField === field && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
            ))}

            <th className="p-2">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {ganadoList.map((g) => (
            <tr key={g.id_ganado} className="border-b hover:bg-gray-50">
              <td className="p-2">{g.nombre_animal}</td>
              <td className="p-2">{g.numero_identificacion}</td>
              <td className="p-2">{g.sexo}</td>
              <td className="p-2">{g.raza}</td>
              <td className="p-2">{g.peso_actual}</td>
              <td className="p-2">{g.estado_salud}</td>

              <td className="p-2 flex gap-3">
                <Pencil
                  className="text-yellow-600 cursor-pointer hover:scale-110 transition-transform duration-150"
                  onClick={() => onEdit(g)}
                />
                <Trash2
                  className="text-red-600 cursor-pointer hover:scale-110"
                  onClick={() => onDelete(g.id_ganado)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TARJETAS — solo visible en pantallas pequeñas */}
      <div className="md:hidden flex flex-col gap-3 mt-2">
        {ganadoList.map((g) => (
          <div
            key={g.id_ganado}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <p><strong>Nombre:</strong> {g.nombre_animal}</p>
            <p><strong>ID:</strong> {g.numero_identificacion}</p>
            <p><strong>Sexo:</strong> {g.sexo}</p>
            <p><strong>Raza:</strong> {g.raza}</p>
            <p><strong>Peso:</strong> {g.peso_actual} kg</p>
            <p><strong>Salud:</strong> {g.estado_salud}</p>

            <div className="flex justify-end gap-4 mt-3">
              <Pencil
                className="text-yellow-600 cursor-pointer hover:scale-110"
                onClick={() => onEdit(g)}
              />
              <Trash2
                className="text-red-600 cursor-pointer hover:scale-110"
                onClick={() => onDelete(g.id_ganado)}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default GanadoTable;
