import { offlineDB } from "./offlinedb";
import { v4 as uuid } from "uuid";
import type { EmergencyLocal } from "./offlinedb";

export async function saveOfflineEmergency(data: Omit<EmergencyLocal,"id"|"synced"|"createdAt">) {
  await offlineDB.emergencies.add({
    ...data,
    id: uuid(),
    synced: false,
    createdAt: Date.now()
  });
}
