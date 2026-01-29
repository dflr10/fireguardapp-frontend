import { EmergencyMap } from "../components/features/emergencies/EmergencyMap";
import EmergencyForm from "../components/features/emergencies/EmergencyForm";

export default function EmergencyPage() {
  return (
    <>
      <div>
        <h3 className="text-3xl font-black tracking-tight">Registrar Nueva Emergencia</h3>
        <p className="text-slate-500 dark:text-slate-400">
          Ingrese la información para despachar la unidad correspondiente.
        </p>
      </div>
      <div className="p-8 grid grid-cols-1 xl:grid-cols-2 gap-8">
        <EmergencyForm />
        <div className="xl:col-span-1">
          <EmergencyMap />
        </div>
      </div>
    </>
  );
}
