import { Link } from "react-router-dom";
import { Beef, LogOut } from "lucide-react";

function Sidebar({ role }) {
  const menu = {
    campesino: [
      { name: "Ganado", to: "/campesino/ganado", icon: <Beef size={20} /> },
    ],
    comprador: [
      { name: "Ganado", to: "/comprador/ganado", icon: <Beef size={20} /> },
    ],
  };

  return (
    <aside className="
      w-64 h-screen bg-[#f0f8f4]
      shadow-[9px_9px_16px_#b8b9be,_-9px_-9px_16px_#ffffff]
      p-6 flex flex-col
    ">
      <h2 className="text-green-700 text-xl font-semibold mb-6">
        SOFTCAMP
      </h2>

      <nav className="flex flex-col gap-3">
        {menu[role]?.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className="
              flex items-center gap-3 bg-[#e0e5ec] 
              shadow-inner p-3 rounded-lg
              hover:bg-[#e8f5e9] transition
            "
          >
            {item.icon}
            <span className="text-gray-700">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-auto">
        <Link
          to="/login"
          className="
            flex items-center gap-3 p-3 rounded-lg 
            text-red-600 hover:bg-red-100
          "
        >
          <LogOut size={20} />
          Cerrar sesión
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
