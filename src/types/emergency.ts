export type EmergencyStatus = "activa" | "atendida" | "resuelta";
export type EmergencyPriority = "baja" | "media" | "alta";
export type EmergencyType = "flight" | "car_crash" | "security" | "person_remove" | "search" | "park" | "apartment" | "bug_report" | "waves" | "droplet" | "water_drop" | "plumbing" | "terrain" | "explosion" | "power_off" | "notifications_off" | "air" | "grain" | "local_fire_department" | "landslide" | "forest" | "directions_car" | "construction" | "warning" | "helping_hand" | "group" | "favorite" | "record_voice_over" | "block" | "pets" | "wb_sunny" | "sensors" | "flash_on" | "local_hospital" | "groups" | "heart_plus" | "campaign" | "flame_delete";

export interface Emergency {
  id: string;
  type: EmergencyType;
  title: string;
  location: string;
  status: EmergencyStatus;
  priority: EmergencyPriority;
  createdAt: string;
}

export const EmergencyType: Record<EmergencyType, string> = {
  flight: "ACCIDENTE AÉREO",
  car_crash: "ACCIDENTE DE TRANSITO",
  security: "ACTIVIDAD DE PREVENCIÓN",
  person_remove: "BÚSQUEDA Y RECUPERACIÓN DE CUERPO",
  search: "BÚSQUEDA Y RESCATE DE PERSONA",
  park: "CAÍDA DE ÁRBOL",
  landslide: "COLAPSO",
  bug_report: "CONTROL DE ABEJAS O AVISPAS",
  waves: "CRECIENTE SÚBITA",
  droplet: "DERRAME DE HIDROCARBUROS",
  water_drop: "ABASTECIMIENTO DE AGUA",
  plumbing: "DESBORDAMIENTO",
  terrain: "DESLIZAMIENTO",
  explosion: "EXPLOSIÓN",
  power_off: "FALLA ELÉCTRICA",
  notifications_off: "FALSA ALARMA",
  air: "FUGA DE GAS",
  grain: "GRANIZADA",
  local_fire_department: "INCENDIO DE INTERFAZ",
  apartment: "INCENDIO ESTRUCTURAL",
  forest: "INCENDIO FORESTAL",
  directions_car: "INCENDIO VEHICULAR",
  construction: "INUNDACIÓN",
  warning: "MATERIALES PELIGROSOS",
  helping_hand: "APOYO OPERATIVO",
  group: "CAPACITACIÓN",
  record_voice_over: "DESPLAZAMIENTO",
  block: "SIN INTERVENCIÓN",
  favorite: "ENTREGA DE AYUDA HUMANITARIA",
  groups: "EVENTO MASIVO",
  heart_plus: "RESCATE CASO SUICIDA",
  campaign: "SERVICIOS ESPECIALES A LA COMUNIDAD",
  flame_delete: "QUEMAS PROHIBIDAS",
  pets: "RESCATE ANIMAL",
  wb_sunny: "SEQUIA",
  sensors: "SISMO",
  flash_on: "TORMENTA ELÉCTRICA",
  local_hospital: "TRASLADO DE PACIENTE"
};