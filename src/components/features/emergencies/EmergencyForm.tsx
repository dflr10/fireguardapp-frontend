import { useState } from "react";
import { submitEmergency } from "@/services/emergency-submit.service";
import { useEmergencies } from "@/context/EmergencyContext";
import { EmergencyType } from "@/types/emergency";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const initialState = {
  departmentId: "",
  municipalityId: "",
  stationId: "",
  type: "otro",
  description: "",
  lat: "",
  lng: "",
  status: "abierta",
  createdBy: "",
};

export default function EmergencyForm() {
  const { reloadEmergencies } = useEmergencies();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const lat = Number(form.lat);
    const lng = Number(form.lng);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      alert("Latitud y longitud deben ser números válidos");
      return;
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      alert("Latitud o longitud fuera de rango");
      return;
    }

    setLoading(true);

    try {
      await submitEmergency(
        {
          ...form,
          lat,
          lng,
        },
        reloadEmergencies
      );

      alert("Emergencia registrada correctamente");
      setForm(initialState);
    } catch (err) {
      alert("Error al registrar emergencia");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="dark:bg-card-dark max-w-3xl w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-black">
          Datos de la Emergencia
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Ubicación administrativa */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Departamento</Label>
              <Input
                className="bg-slate-800/50"
                name="departmentId"
                value={form.departmentId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Municipio</Label>
              <Input
                className="bg-slate-800/50"
                name="municipalityId"
                value={form.municipalityId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Estación</Label>
              <Input
                className="bg-slate-800/50"
                name="stationId"
                value={form.stationId}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Tipo */}
          <div className="space-y-2">
            <Label>Tipo de Emergencia</Label>
            <Select
              value={form.type}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger className="bg-slate-800/50">
                <SelectValue />
              </SelectTrigger >
              <SelectContent className="bg-slate-800">
                {Object.entries(EmergencyType).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label>Descripción</Label>
            <Textarea
              className="bg-slate-800/50"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          {/* Coordenadas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Latitud</Label>
              <Input
                className="bg-slate-800/50"
                name="lat"
                value={form.lat}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Longitud</Label>
              <Input
                className="bg-slate-800/50"
                name="lng"
                value={form.lng}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Estado */}
          <div className="space-y-2">
            <Label>Estado</Label>
            <Select
              value={form.status}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger className="bg-slate-800/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800">
                <SelectItem value="Abierta">Abierta</SelectItem>
                <SelectItem value="En proceso">En proceso</SelectItem>
                <SelectItem value="Cerrada">Cerrada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Usuario */}
          <div className="space-y-2">
            <Label>Registrado por</Label>
            <Input
              className="bg-slate-800/50"
              name="createdBy"
              value={form.createdBy}
              onChange={handleChange}
              required
            />
          </div>

          {/* Acción */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Registrar Emergencia"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
