import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import SidebarCampesino from "../components/navigation/SidebarCampesino";
import SidebarComprador from "../components/navigation/SidebarComprador";
import Sidebar from "../components/navigation/Sidebar";
import SyncBanner from "../components/common/SyncBanner";

function AppLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.10),transparent_26%)]">
        {user?.grupo === "campesino" && (
          <Sidebar>
            {(open) => <SidebarCampesino open={open} />}
          </Sidebar>
        )}

        {user?.grupo === "comprador" && (
          <Sidebar>
            {(open) => <SidebarComprador open={open} />}
          </Sidebar>
        )}

        <main className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6">
          <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-[1600px] flex-col gap-4">
            {user?.grupo === "campesino" && <SyncBanner />}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
