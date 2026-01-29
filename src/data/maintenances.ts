import type { Maintenance } from "../types/maintenance";

export const maintenances: Maintenance[] = [
  {
    id: "E-001",
    type: "extintores",
    title: "Emergencia Médica",
    location: "Av. El Poblado con Calle 10",
    status: "close",
    priority: "high",
    createdAt: "2026-01-23T14:32:00Z"
  },
  {
    id: "E-002",
    type: "extintores",
    title: "Incendio Estructural",
    location: "Bodega Industrial Zona Sur",
    status: "pending",
    priority: "high",
    createdAt: "2026-01-23T13:10:00Z"
  },
  {
    id: "E-003",
    type: "equipos de rescate",
    title: "Rescate Vehicular",
    location: "Autopista Norte Km 7",
    status: "close",
    priority: "medium",
    createdAt: "2026-01-23T09:45:00Z"
  },
  {
    id: "E-004",
    type: "extintores",
    title: "Incendio Forestal",
    location: "Parque Natural Los Colores",
    status: "close",
    priority: "high",
    createdAt: "2026-01-22T16:20:00Z"
  },
    {
    id: "E-005",
    type: "sistemas de alarma",
    title: "Atención Prehospitalaria",
    location: "Cra 43D con Calle 9A",
    status: "pending",
    priority: "medium",
    createdAt: "2026-01-22T11:15:00Z"
    },
    {
    id: "E-006",
    type: "otros",
    title: "Rescate en Altura", 
    location: "Edificio Torre Central",
    status: "completed",
    priority: "high",
    createdAt: "2026-01-21T15:50:00Z"
    },
    {
    id: "E-007",
    type: "extintores",
    title: "Atención por Intoxicación",
    location: "Parque de la 93",
    status: "completed",
    priority: "low",
    createdAt: "2026-01-21T10:30:00Z"
    },
    {
    id: "E-008",
    type: "extintores",
    title: "Incendio Vehicular",
    location: "Cra 50 con Calle 12",
    status: "close",
    priority: "medium",
    createdAt: "2026-01-20T14:05:00Z"
    },
    {
    id: "E-009",
    type: "otros",
    title: "Rescate Acuático",
    location: "Embalse La Fe",
    status: "completed",
    priority: "high",
    createdAt: "2026-01-20T09:40:00Z"
    },
    {
    id: "E-010",
    type: "equipos de rescate",    
    title: "Emergencia Cardíaca",
    location: "Clínica Las Américas",
    status: "completed",
    priority: "high",
    createdAt: "2026-01-19T13:25:00Z"
    }
];
