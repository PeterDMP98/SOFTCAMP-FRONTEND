import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Sidebar({ children }) {
  const [open, setOpen] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside
      className={`
        ${open ? "w-64" : "w-20"}
        bg-[#f0f8f4]
        shadow-[9px_9px_16px_#b8b9be,_-9px_-9px_16px_#ffffff]
        transition-all duration-300
        p-4 flex flex-col
      `}
    >
      {/* Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="mb-8 ml-2 p-0.5 flex w-min items-center gap-2 text-green-600"
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Menú */}
      <nav className="flex flex-col gap-4 ">
        {typeof children === "function"
          ? children(open)
          : children}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 p-3 text-red-600 hover:bg-red-100 rounded-xl"
      >
        <LogOut size={22} />
        {open && <span>Cerrar sesión</span>}
      </button>
    </aside>
  );
}

export default Sidebar;
