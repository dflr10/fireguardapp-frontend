import { offlineDB, type EmergencyLocal } from "./offlinedb";
import { v4 as uuid } from "uuid";

export async function saveEmergencyOffline(
  data: Omit<EmergencyLocal, "id" | "synced" | "createdAt">
) {
  const lat = Number(data.lat);
  const lng = Number(data.lng);
  if (!data.createdBy) {
    throw new Error("createdBy is required");
  }
  if (!Number.isFinite(data.lat) || !Number.isFinite(data.lng)) {
    throw new Error("Invalid coordinates");
  }

  return await offlineDB.emergencies.add({
    ...data,
    lat,
    lng,
    id: uuid(),
    synced: false,
    createdAt: Date.now(),
  });
}

export async function getPendingEmergencies() {
  return offlineDB.emergencies.filter((e) => e.synced === false).toArray();
}

export async function markAsSynced(id: string) {
  return offlineDB.emergencies.update(id, { synced: true });
}
