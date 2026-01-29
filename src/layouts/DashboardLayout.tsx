import { NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <>
      {/* SIDEBAR */}
      <aside className="w-64 bg-secondary-blue dark:bg-[#0a192f] text-white flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-primary p-2 rounded-lg">
              <span className="material-symbols-outlined text-white">
                fire_truck
              </span>
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">
                Fireguard
              </h1>
              <p className="text-blue-200 text-xs font-medium uppercase tracking-wider">
                Command Center
              </p>
            </div>
          </div>

          <nav className="space-y-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 py-3 rounded-lg font-medium text-left transition-colors
     ${isActive ? "bg-white/10 text-white" : "text-blue-100 hover:bg-white/5"}`
              }
            >
              <span className="material-symbols-outlined">dashboard</span>
              Dashboard
            </NavLink>


            <NavLink
              to="/emergencies"
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 py-3 rounded-lg font-medium text-left transition-colors
     ${isActive ? "bg-white/10 text-white" : "text-blue-100 hover:bg-white/5"}`
              }
            >
              <span className="material-symbols-outlined">assignment_late</span>
              Ver Emergencias
            </NavLink>


            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-blue-100 hover:bg-white/5 transition-colors text-left">
              <span className="material-symbols-outlined">fact_check</span>
              Inspeciones
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-blue-100 hover:bg-white/5 transition-colors text-left">
              <span className="material-symbols-outlined">
                inventory_2
              </span>
              Equipamiento
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-blue-100 hover:bg-white/5 transition-colors text-left">
              <span className="material-symbols-outlined">settings</span>
              Configuración
            </button>
          </nav>
        </div>

        <div className="mt-auto p-6">
          <NavLink
            to="/emergencies"
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-red-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined text-sm">
              add_alert
            </span>
            Nueva Emergencia
          </NavLink>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="ml-64 min-h-screen bg-[#0b0f14] text-white">
        {/* HEADER */}
        <header className="sticky top-0 z-40 bg-black/80 backdrop-blur border-b border-white/10 px-8 py-4 flex items-center justify-between">
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors">search</span>
              <input className="w-64 pl-10 pr-4 py-2 bg-slate-100 dark:bg-card-dark border-none rounded-lg focus:ring-2 text-sm" placeholder="Busca registros, inspecciones..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined">notifications</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">
                Capt. Luis Hernandez
              </span>
              <div className="w-8 h-8 rounded-full bg-slate-600" />
            </div>
          </div>
        </header>

        {/* PAGE */}
        <main className="flex-1 p-8 space-y-8 overflow-y-auto"><Outlet /></main>
      </div>
    </>
  );
}
