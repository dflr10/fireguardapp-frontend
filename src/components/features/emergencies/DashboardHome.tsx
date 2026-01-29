import { emergencies } from "../../../data/emergencies";
import { maintenances } from "../../../data/maintenances";
import { inspections } from "../../../data/inspections";
import { NavLink } from "react-router-dom";


const activeEmergencies = emergencies.filter(
  e => e.status === "activa"
).length;

const pendingInspections = inspections.filter(
  i => i.status === "pending" || i.status === "overdue"
).length;

const maintenanceCount = maintenances.filter(
  m => m.status === "close" || m.status === "pending"
).length;


export default function DashboardHome() {
  return (
    <>
      {/* Heading */}
      <div>
        <h3 className="text-3xl font-black tracking-tight">Vista General</h3>
        <p className="text-slate-500 dark:text-slate-400">
          Estado en tiempo real de las operaciones y tareas activas de la estación.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon="emergency"
          title="Emergencias Activas"
          value={activeEmergencies.toString()}
          color="primary"
          bgIconColor="bgIconPrimary"
          notification="En curso"
          progress={(activeEmergencies / emergencies.length) * 100}
        />
        <StatCard
          icon="assignment_turned_in"
          title="Inspecciones Pendientes"
          value={pendingInspections.toString()}
          color="blue"
          bgIconColor="bgIconBlue"
          notification="Certificación"
          progress={(pendingInspections / inspections.length) * 100}
        />
        <StatCard
          icon="warning"
          title="Mantenimientos Próximos"
          value={maintenanceCount.toString()}
          color="orange"
          bgIconColor="bgIconOrange"
          notification="Extintores"
          progress={(maintenanceCount / maintenances.length) * 100}
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xl font-bold">Registro de Actividad Reciente</h4>
            <button className="text-primary text-sm font-bold hover:underline">Ver Todo</button>
          </div>
          <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl divide-y dark:divide-border-dark">
            {emergencies.slice(0, 4).map(emergency => (
              <ActivityItem
                key={emergency.id}
                icon={
                  emergency.type
                }
                title={emergency.title}
                text={emergency.location}
                time={new Date(emergency.createdAt).toLocaleTimeString()}
                color={
                  emergency.status === "activa"
                    ? "primary"
                    : emergency.status === "atendida"
                      ? "orange"
                      : emergency.status === "resuelta"
                        ? "green"
                        : "slate"
                }
                bgIconColor={
                  emergency.status === "activa"
                    ? "bgIconPrimary"
                    : emergency.status === "atendida"
                      ? "bgIconOrange"
                      : emergency.status === "resuelta"
                        ? "bgIconGreen"
                        : "bgIconSlate"
                }
                status={emergency.status}
                priority={emergency.priority}
              />
            ))}
          </div>
        </div>
        {/* Right Panel */}
        <div className="bg-secondary-blue p-6 rounded-xl text-white">
          <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              map
            </span>
            Cobertura En Vivo
          </h4>

          <div className="aspect-video bg-slate-800 rounded-lg relative overflow-hidden mb-4">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_50%,_rgba(238,43,43,0.2)_0%,_transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-primary rounded-full animate-ping"></div>
          </div>
          <p className="text-xs text-blue-200 mb-4">Observa en tiempo real el estado de las emergencias del departamento de Antioquia.</p>
          <NavLink  
            to="/map"
            className="inline-block w-full text-center bg-primary hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Ver Mapa de Emergencias
          </NavLink>
        </div>
      </div>
    </>
  );
}

/* Subcomponents */

const colorMap: Record<string, string> = {
  primary: "text-red-600",
  blue: "text-blue-600",
  orange: "text-orange-600",
  slate: "text-slate-600",
  green: "text-green-600"

};

const bgColorBar: Record<string, string> = {
  primary: "bg-red-600",
  blue: "bg-blue-600",
  orange: "bg-orange-600",
  slate: "bg-slate-600",
  green: "bg-green-600"
};

const bgIconMap: Record<string, string> = {
  bgIconPrimary: "bg-red-900/30",
  bgIconBlue: "bg-blue-900/30",
  bgIconOrange: "bg-orange-900/30",
  bgIconSlate: "bg-neutral-800/30",
  bgIconGreen: "bg-green-800/30"
};

function StatCard({ icon, title, value, color, bgIconColor, notification, progress }: any) {
  return (
    <div className="bg-white dark:bg-card-dark p-6 rounded-xl border border-slate-200 dark:border-border-dark">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 mb-4 ${bgIconMap[bgIconColor]} w-10 h-10 rounded-lg ${colorMap[color]}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <span className={`${colorMap[color]} text-sm font-bold ${bgIconMap[bgIconColor]} px-2 py-1 rounded`}>{notification}</span>
      </div>
      <p className="text-slate-400 text-sm text-left">{title}</p>
      <p className="text-3xl font-black text-left">{value}</p>
      <div className="mt-4 w-full bg-slate-100 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
        <div
          className={`${bgColorBar[color]} h-full`}
          style={{ width: `${progress}%` }}
        >
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ icon, title, text, time, color, bgIconColor, status, priority }: any) {
  return (
    <div className="p-5 flex gap-4">
      <div
        className={`w-10 h-10 rounded-full ${bgIconMap[bgIconColor]} flex items-center justify-center ${colorMap[color]}`}
      >
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <p className="font-bold">{title}</p>
          <span className="text-xs text-slate-400">{time}</span>
        </div>
        <p className="text-sm text-slate-400 text-left">{text}</p>
        <div className="flex gap-2 mt-2">
          <span className={`px-2 py-0.5 ${bgIconMap[bgIconColor]} ${colorMap[color]} text-[10px] font-bold rounded uppercase`}>Estado: {status}</span>
          <span className={`px-2 py-0.5 dark:bg-neutral-800 text-slate-500 text-[10px] font-bold rounded uppercase`}>Prioridad: {priority}</span>
        </div>
      </div>
    </div>
  );
}