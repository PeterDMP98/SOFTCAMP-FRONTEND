import { useState } from "react";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
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
        bg-[#0f1016]
        border-r border-white/10
        shadow-[0_18px_60px_rgba(0,0,0,0.45)]
        transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        p-4 flex flex-col
      `}
    >
      {/* Logo / Brand */}
      <div
        className={`mb-6 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-white ${
          open ? "flex items-center justify-between" : "flex flex-col items-center gap-3"
        }`}
      >
        {open ? (
          <>
            <div className="overflow-hidden">
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">SoftCamp</p>
              <p className="text-sm font-semibold">Agriculture OS</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="shrink-0 rounded-xl border border-white/10 bg-white/5 p-2 text-slate-200 transition hover:bg-white/10"
            >
              <ChevronLeft size={18} />
            </button>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold leading-none">SC</p>
            <button
              onClick={() => setOpen(true)}
              className="shrink-0 rounded-xl border border-white/10 bg-white/5 p-2 text-slate-200 transition hover:bg-white/10"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {typeof children === "function" ? children(open) : children}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className={`mt-auto flex items-center justify-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-3 text-red-200 transition hover:bg-red-500/20 ${
          open ? "" : "flex-col"
        }`}
      >
        <LogOut size={20} />
        <span className={`text-xs ${open ? "block" : "hidden"}`}>Cerrar sesion</span>
      </button>
    </aside>
  );
}

export default Sidebar;
