import { Link } from "react-router-dom";
import { Home, Package, ShoppingCart, FileText, Handshake, Sparkles } from "lucide-react";

const sections = [
  { label: "Inicio", path: "/comprador", icon: Home },
  { label: "🤖 IA", path: "/comprador/ia", icon: Sparkles },
  { label: "Catálogo", path: "/comprador/catalogo", icon: Package },
  { label: "Carrito", path: "/comprador/carrito", icon: ShoppingCart },
  { label: "Mis Pedidos", path: "/comprador/pedidos", icon: FileText },
  { label: "Convenios", path: "/comprador/convenios", icon: Handshake },
];

function SidebarComprador({ open }) {
  const itemBase = "flex items-center gap-3 p-3 rounded-xl hover:bg-blue-100 transition-colors";
  const labelBase = "whitespace-nowrap transition-all duration-200 ease-out";

  return (
    <>
      {sections.map(({ label, path, icon: Icon }) => (
        <Link key={path} to={path} className={itemBase}>
          <div className="flex justify-center shrink-0">
            <Icon size={22} className="text-blue-700" />
          </div>
          <span className={`${labelBase} ${open ? "opacity-100" : "opacity-0"}`}>
            {label}
          </span>
        </Link>
      ))}
    </>
  );
}

export default SidebarComprador;