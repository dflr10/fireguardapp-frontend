import type { Emergency } from "../types/emergency";

export const emergencies: Emergency[] = [
  {
    id: "E-001",
    type: "landslide",
    title: "Deslizamiento de Tierra",
    location: "Av. Las Palmas Km 4.5 Sector El Placer",
    status: "activa",
    priority: "alta",
    createdAt: "2026-01-23T14:32:00Z"
  },
  {
    id: "E-002",
    type: "apartment",
    title: "Incendio Estructural",
    location: "Bodega Zona Industrial Sector Zona Sur",
    status: "atendida",
    priority: "alta",
    createdAt: "2026-01-23T13:10:00Z"
  },
  {
    id: "E-003",
    type: "car_crash",
    title: "Accidente Vehicular",
    location: "Autopista Norte Km 7",
    status: "resuelta",
    priority: "media",
    createdAt: "2026-01-23T09:45:00Z"
  },
  {
    id: "E-004",
    type: "local_fire_department",
    title: "Incendio Forestal",
    location: "Distrito Regional de Manejo Integrado Quitasol",
    status: "activa",
    priority: "alta",
    createdAt: "2026-01-22T16:20:00Z"
  },
    {
    id: "E-005",
    type: "local_hospital",
    title: "Traslado de Paciente",
    location: "Cra 43D con Calle 9A",
    status: "atendida",
    priority: "media",
    createdAt: "2026-01-22T11:15:00Z"
    },
    {
    id: "E-006",
    type: "search",
    title: "Rescate en Altura", 
    location: "Edificio Torre Central",
    status: "activa",
    priority: "alta",
    createdAt: "2026-01-21T15:50:00Z"
    },
    {
    id: "E-007",
    type: "local_hospital",
    title: "Atención por Intoxicación",
    location: "Parque de la 93",
    status: "resuelta",
    priority: "baja",
    createdAt: "2026-01-21T10:30:00Z"
    },
    {
    id: "E-008",
    type: "local_hospital",
    title: "Incendio Vehicular",
    location: "Cra 50 con Calle 12",
    status: "atendida",
    priority: "media",
    createdAt: "2026-01-20T14:05:00Z"
    },
    {
    id: "E-009",
    type: "search",
    title: "Rescate Acuático",
    location: "Embalse La Fe",
    status: "activa",
    priority: "alta",
    createdAt: "2026-01-20T09:40:00Z"
    },
    {
    id: "E-010",
    type: "local_hospital",
    title: "Emergencia Cardíaca",
    location: "Clínica Las Américas",
    status: "resuelta",
    priority: "alta",
    createdAt: "2026-01-19T13:25:00Z"
    }
];
