import { offlineDB } from "../offline/offlinedb";
import { getEmergencies } from "./api.service";

export async function getAllEmergencies() {
  let local = await offlineDB.emergencies.toArray();

  if (navigator.onLine) {
    try {
      const remote = await getEmergencies();

      for (const e of remote) {
        await offlineDB.emergencies.put({
          ...e,
          synced: true,
          createdAt: new Date(e.createdAt).getTime()
        });
      }

      local = await offlineDB.emergencies.toArray();
    } catch {
      // fallback offline silencioso
    }
  }

  return local;
}
