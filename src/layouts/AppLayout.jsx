import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import SidebarCampesino from "../components/navigation/SidebarCampesino";
import SidebarComprador from "../components/navigation/SidebarComprador";
import Sidebar from "../components/navigation/Sidebar";

function AppLayout() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-[#f0f8f4]">

      {/* Sidebar según rol */}
      {user.grupo === "campesino" && (
        <Sidebar>
          {(open) => <SidebarCampesino open={open} />}
        </Sidebar>
      )}

      {user.grupo === "comprador" && (
        <Sidebar>
          {(open) => <SidebarComprador open={open} />}
        </Sidebar>
      )}

      {/* Contenido dinámico */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}

export default AppLayout;
