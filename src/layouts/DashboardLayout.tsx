import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function DashboardLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Persistir colapso en desktop
  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved) setIsCollapsed(saved === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", String(isCollapsed));
  }, [isCollapsed]);


  const location = useLocation();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex">

      {/* OVERLAY MÓVIL */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:fixed inset-y-0 left-0 z-50
          bg-secondary-blue dark:bg-[#0a192f] text-white
          flex flex-col transition-all duration-300
          ${isCollapsed ? "w-20" : "w-64"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-primary p-2 rounded-lg">
              <span className="material-symbols-outlined text-white">
                fire_truck
              </span>
            </div>

            {!isCollapsed && (
              <div>
                <h1 className="text-lg font-bold leading-tight">
                  Fireguard
                </h1>
                <p className="text-blue-200 text-xs font-medium uppercase tracking-wider">
                  Command Center
                </p>
              </div>
            )}
          </div>

          <nav className="space-y-1">
            <MenuLink
              to="/"
              icon="dashboard"
              label="Dashboard"
              collapsed={isCollapsed}
              onClick={() => setIsMobileOpen(false)}
            />

            <MenuLink
              to="/emergencies/list"
              icon="assignment_late"
              label="Ver Emergencias"
              collapsed={isCollapsed}
              onClick={() => setIsMobileOpen(false)}
            />

            <MenuLink
              to="/inspections"
              icon="fact_check"
              label="Inspecciones"
              collapsed={isCollapsed}
              onClick={() => setIsMobileOpen(false)}
            />

            <MenuLink
              to="/equipment"
              icon="inventory_2"
              label="Equipamiento"
              collapsed={isCollapsed}
              onClick={() => setIsMobileOpen(false)}
            />

            <MenuLink
              to="/settings"
              icon="settings"
              label="Configuración"
              collapsed={isCollapsed}
              onClick={() => setIsMobileOpen(false)}
            />

          </nav>
        </div>

        <div className="mt-auto p-6">
          <NavLink
            to="/emergencies"
            onClick={() => setIsMobileOpen(false)}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-red-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined text-md">
              add_alert
            </span>
            {!isCollapsed && "Nueva Emergencia"}
          </NavLink>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div
        className={`
          flex-1 min-h-screen bg-[#0b0f14] text-white transition-all duration-300
          ${isCollapsed ? "md:ml-20" : "md:ml-64"}
        `}
      >
        {/* HEADER */}
        <header className="sticky top-0 z-40 bg-black/80 backdrop-blur border-b border-white/10 px-4 md:px-8 py-4 flex items-center justify-between">

          {/* IZQUIERDA */}
          <div className="flex items-center gap-3">

            {/* HAMBURGUESA MÓVIL */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileOpen(true)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>

            {/* BOTÓN COLAPSAR DESKTOP */}
            <button
              className="hidden md:block"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <span className="material-symbols-outlined">
                {isCollapsed ? "chevron_right" : "chevron_left"}
              </span>
            </button>
          </div>

          {/* BUSCADOR */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                search
              </span>
              <input
                className="w-48 md:w-64 pl-10 pr-4 py-2 bg-slate-100 dark:bg-card-dark border-none rounded-lg focus:ring-2 text-sm"
                placeholder="Busca registros..."
                type="text"
              />
            </div>
          </div>

          {/* USER */}
          <div className="hidden md:flex items-center gap-4">
            <span className="material-symbols-outlined">notifications</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">
                Capt. Luis Hernandez
              </span>
              <div className="w-8 h-8 rounded-full bg-slate-600" />
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8 space-y-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/* COMPONENTES AUXILIARES */

function MenuLink({ to, icon, label, collapsed, onClick }: any) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `
        w-full flex items-center
        ${collapsed ? "justify-center px-0" : "gap-3 px-3"}
        py-3 rounded-lg font-medium transition-colors
        ${isActive
          ? "bg-white/10 text-white"
          : "text-blue-100 hover:bg-white/5"}
        `
      }
    >
      <span className="material-symbols-outlined">
        {icon}
      </span>

      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
}
