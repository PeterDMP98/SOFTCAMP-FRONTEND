import { NavLink } from "react-router-dom";
import {
  Beef,
  Sprout,
  Package,
  Home,
  Users,
  ClipboardList,
  Handshake,
  FileText,
  Sparkles,
} from "lucide-react";

const sections = [
  { label: "Inicio", path: "/campesino", icon: Home },
  { label: "Ganado", path: "/campesino/ganado", icon: Beef },
  { label: "Siembra", path: "/campesino/siembra", icon: Sprout },
  { label: "Inventario", path: "/campesino/productos", icon: Package },
  { label: "Empleados", path: "/campesino/empleados", icon: Users },
  { label: "Tareas", path: "/campesino/tareas", icon: ClipboardList },
  { label: "Convenios", path: "/campesino/convenios", icon: Handshake },
  { label: "Pedidos", path: "/campesino/pedidos", icon: FileText },
  { label: "IA", path: "/campesino/ia", icon: Sparkles },
];

function SidebarCampesino({ open }) {
  const itemBase =
    "group flex items-center rounded-2xl border border-transparent text-sm font-medium text-slate-300 transition";
  const labelBase = "whitespace-nowrap transition-all duration-200 ease-out overflow-hidden";

  return (
    <>
      <div className={`mb-2 text-[11px] uppercase tracking-[0.24em] text-slate-500 ${open ? "px-3 block" : "hidden text-center"}`}>
        Menu
      </div>

      {sections.map(({ label, path, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          end={path === "/campesino"}
          className={({ isActive }) =>
            `${itemBase} ${
              open
                ? "gap-3 px-3 py-3"
                : "justify-center px-0 py-3"
            } ${
              isActive
                ? "border-emerald-500/30 bg-emerald-500/15 text-white shadow-[0_12px_30px_rgba(16,185,129,0.14)]"
                : "bg-white/0 hover:border-white/10 hover:bg-white/5"
            }`
          }
        >
          <div className="flex justify-center">
            <Icon size={20} className="text-emerald-300" />
          </div>

          <span
            className={`${labelBase} ${
              open
                ? "max-w-[120px] opacity-100"
                : "max-w-0 opacity-0"
            }`}
          >
            {label}
          </span>
        </NavLink>
      ))}
    </>
  );
}

export default SidebarCampesino;
