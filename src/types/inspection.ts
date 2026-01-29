export type InspectionStatus = "pending" | "overdue" | "completed";
export type InspectionPriority = "low" | "medium" | "high";
export type InspectionType = "medical" | "fire" | "rescue";

export interface Inspection {
  id: string;
  type: InspectionType;
  title: string;
  location: string;
  status: InspectionStatus;
  priority: InspectionPriority;
  createdAt: string;
}