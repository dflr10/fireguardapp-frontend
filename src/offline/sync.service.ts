import { getPendingEmergencies, markAsSynced } from "./offline.service";
import { createEmergency } from "../services/api.service";
import { offlineDB } from "./offlinedb";

function mapToApiPayload(e: any) {
  return {
    departmentId: e.departmentId,
    municipalityId: e.municipalityId,
    stationId: e.stationId,
    type: e.type,
    description: e.description,
    lat: e.lat,
    lng: e.lng,
    status: e.status,
    createdBy: e.createdBy
  };
}

export async function syncPendingEmergencies() {
  const pending = await getPendingEmergencies();

  for (const emergency of pending) {
    try {
      await createEmergency(mapToApiPayload(emergency));
      await markAsSynced(emergency.id);
      await offlineDB.emergencies.delete(emergency.id);
    } catch (err) {
      console.error("Error syncing", emergency.id, err);
    }
  }
}
