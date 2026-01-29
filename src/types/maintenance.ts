export type MaintenanceStatus = "close" | "pending" | "completed";
export type MaintenancePriority = "low" | "medium" | "high";
export type MaintenanceType = "extintores" | "equipos de rescate" | "sistemas de alarma" | "otros";

export interface Maintenance {
  id: string;
  type: MaintenanceType;
  title: string;
  location: string;
  status: MaintenanceStatus;
  priority: MaintenancePriority;
  createdAt: string;
}