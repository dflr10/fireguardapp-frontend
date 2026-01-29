import { createContext, useContext, useEffect, useState } from "react";
import { getAllEmergencies } from "../services/emergency-query.service";
import type { EmergencyLocal } from "../offline/offlinedb";

interface EmergencyContextType {
  emergencies: EmergencyLocal[];
  reloadEmergencies: () => Promise<void>;
}

const EmergencyContext = createContext<EmergencyContextType | null>(null);

export function EmergencyProvider({ children }: { children: React.ReactNode }) {
  const [emergencies, setEmergencies] = useState<EmergencyLocal[]>([]);

  async function reloadEmergencies() {
    const data = await getAllEmergencies();
    setEmergencies(data);
  }

  useEffect(() => {
    reloadEmergencies();

    window.addEventListener("online", reloadEmergencies);
    return () => window.removeEventListener("online", reloadEmergencies);
  }, []);

  return (
    <EmergencyContext.Provider value={{ emergencies, reloadEmergencies }}>
      {children}
    </EmergencyContext.Provider>
  );
}

export function useEmergencies() {
  const ctx = useContext(EmergencyContext);
  if (!ctx) {
    throw new Error("useEmergencies must be used within EmergencyProvider");
  }
  return ctx;
}
