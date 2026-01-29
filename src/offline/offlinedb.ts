import Dexie from "dexie";
import type { Table } from "dexie";

export interface EmergencyLocal {
  id: string;
  departmentId: string;
  municipalityId: string;
  stationId: string;
  type: string;
  description: string;
  lat: number;
  lng: number;
  status: string;
  createdBy: string;
  synced: boolean;
  createdAt: number;
}

export class OfflineDB extends Dexie {
  emergencies!: Table<EmergencyLocal>;

  constructor() {
    super("FireguardOfflineDB");
    this.version(1).stores({
      emergencies: "id, stationId, synced, createdAt"
    });
  }
}

export const offlineDB = new OfflineDB();