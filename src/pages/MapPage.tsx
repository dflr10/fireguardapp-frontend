import { EmergencyMap } from "../components/features/emergencies/EmergencyMap";

export default function EmergencyPage() {
    return (
        <>
            <div>
                <h3 className="text-3xl font-black tracking-tight">Mapa de Emergencias</h3>
                <p className="text-slate-500 dark:text-slate-400">
                    Estado en tiempo real de las emergencias activas en el departamento de Antioquia.
                </p>
            </div>
            <div className="p-8 grid grid-cols-1 gap-8 w-full">
                <EmergencyMap />
            </div>
        </>
    );
}
