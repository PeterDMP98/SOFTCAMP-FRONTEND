import { ESTADO_SALUD } from "../../constants/estadoSalud";

const DEFAULT_STYLE =
  "bg-gray-100 text-gray-600 border-gray-300";

const EstadoSaludBadge = ({ estado }) => {
  if (!estado) {
    return (
      <span className={`px-2 py-1 text-xs border rounded-full ${DEFAULT_STYLE}`}>
        Desconocido
      </span>
    );
  }

  const key = estado.toUpperCase().replace(" ", "_");
  const config = ESTADO_SALUD[key];

  return (
    <span
      className={`px-2 py-1 text-xs font-medium border rounded-full ${
        config?.className || DEFAULT_STYLE
      }`}
    >
      {config?.label || estado}
    </span>
  );
};

export default EstadoSaludBadge;
