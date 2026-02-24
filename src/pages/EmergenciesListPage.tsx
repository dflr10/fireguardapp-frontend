import { useEffect, useState } from "react";
import { getEmergencies } from "@/services/api.service";
import EmergencyCard from "../components/features/emergencies/EmergencyCard";
import EmergencyFilters from "../components/features/emergencies/EmergencyFilters";

export default function EmergenciesListPage() {
  const [emergencies, setEmergencies] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);

  useEffect(() => {
    getEmergencies().then(data => {
      setEmergencies(data);
      setFiltered(data);
    });
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Emergencias registradas</h1>

      <EmergencyFilters
        data={emergencies}
        onChange={setFiltered}
      />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(e => (
          <EmergencyCard key={e.id} emergency={e} />
        ))}
      </div>
    </div>
  );
}