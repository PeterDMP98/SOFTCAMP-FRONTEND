import { NavLink } from "react-router-dom";
import { Package, ShoppingCart, FileText, Handshake } from "lucide-react";

const sections = [
  { label: "Catálogo", path: "/comprador/catalogo", icon: Package },
  { label: "Carrito", path: "/comprador/carrito", icon: ShoppingCart },
  { label: "Pedidos", path: "/comprador/pedidos", icon: FileText },
  { label: "Convenios", path: "/comprador/convenios", icon: Handshake },
];

function SidebarComprador({ open }) {
  const itemBase =
    "group flex items-center rounded-2xl border border-transparent text-sm font-medium text-slate-300 transition";

  return (
    <>
      <div
        className={`mb-2 text-[11px] uppercase tracking-[0.24em] text-slate-500 ${
          open ? "px-3 block" : "hidden text-center"
        }`}
      >
        Menu
      </div>

      {sections.map(({ label, path, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          end={path === "/comprador/catalogo"}
          className={({ isActive }) =>
            `${itemBase} ${
              open ? "gap-3 px-3 py-3" : "justify-center px-0 py-3"
            } ${
              isActive
                ? "border-sky-500/30 bg-sky-500/15 text-white shadow-[0_12px_30px_rgba(56,189,248,0.14)]"
                : "bg-white/0 hover:border-white/10 hover:bg-white/5"
            }`
          }
        >
          <div className="flex justify-center">
            <Icon size={20} className="text-sky-300" />
          </div>
          <span
            className={`overflow-hidden whitespace-nowrap transition-all duration-200 ease-out ${
              open ? "max-w-[120px] opacity-100" : "max-w-0 opacity-0"
            }`}
          >
            {label}
          </span>
        </NavLink>
      ))}
    </>
  );
}

export default SidebarComprador;
