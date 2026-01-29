import { useEffect } from "react";
import { syncPendingEmergencies } from "../offline/sync.service";

export function useConnectivity() {
  useEffect(() => {
    const handleOnline = () => {
      syncPendingEmergencies();
    };

    if (navigator.onLine) {
      syncPendingEmergencies();
    }

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);
}


