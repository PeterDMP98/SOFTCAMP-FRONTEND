import { Link } from "react-router-dom";
import { Beef, ListTodo, Sprout, Home, Map, Package, ShoppingCart, Users, ClipboardList, Handshake, FileText } from "lucide-react";

const sections = [
  { label: "Inicio", path: "/campesino", icon: Home },
  { label: "Ganado", path: "/campesino/ganado", icon: Beef },
  { label: "Lotes", path: "/campesino/lotes", icon: Map },
  { label: "Siembra", path: "/campesino/siembra", icon: Sprout },
  { label: "Productos", path: "/campesino/productos", icon: Package },
  { label: "Stock", path: "/campesino/stock", icon: ShoppingCart },
  { label: "Historial Clínico", path: "/campesino/historial-clinico", icon: FileText },
  { label: "Registro Pesaje", path: "/campesino/registro-pesaje", icon: FileText },
  { label: "Reproducción", path: "/campesino/registro-reproduccion", icon: Beef },
  { label: "Empleados", path: "/campesino/empleados", icon: Users },
  { label: "Tareas", path: "/campesino/tareas", icon: ClipboardList },
  { label: "Convenios", path: "/campesino/convenios", icon: Handshake },
  { label: "Pedidos", path: "/campesino/pedidos", icon: FileText },
];

function SidebarCampesino({ open }) {

  const itemBase =
    "flex items-center gap-3 p-3 rounded-xl hover:bg-green-100 transition-colors";

  const labelBase =
    "whitespace-nowrap transition-all duration-200 ease-out will-change-transform will-change-opacity";

  return (
    <>
      {sections.map(({label, path, icon: Icon}) => (
        <Link key={path} to={path} className={itemBase}>
        <div className="flex justify-center shrink-0">
          <Icon size={22} className="text-green-700" />
        </div>

        <span
          className={`${labelBase} ${open
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-2 pointer-events-none"
            }`}
        >
          {label}
        </span>
      </Link>
      ))}
    </>
  );
}

export default SidebarCampesino;
