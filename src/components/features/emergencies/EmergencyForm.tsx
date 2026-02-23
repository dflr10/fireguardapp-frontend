import { useState } from "react";
import { submitEmergency } from "@/services/emergency-submit.service";
import { useEmergencies } from "@/context/EmergencyContext";
import { EmergencyType } from "@/types/emergency";

import OperationForm from "./OperationForm";
import ImpactForm from "./ImpactForm";
import AdditionalDataForm from "./AdditionalDataForm";
import ClosureForm from "./ClosureForm";
import PatientsForm from "./PatientsForm";

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

const TYPE_MODULE_RULES: Record<string, (keyof typeof initialState)[]> = {
  car_crash: ["operations", "impact", "additional", "patients"],
  local_fire_department: ["operations", "impact", "closure"],
  rescue: ["operations", "impact", "patients"],
  search: ["operations", "impact"],
  medical: ["patients", "impact"],
  security: ["operations", "additional"],
  bug_report: [],

  default: ["operations"],
};


const initialState: any = {
  departmentId: "",
  municipalityId: "",
  stationId: "",
  type: "otro",
  description: "",
  lat: "",
  lng: "",
  status: "Abierta",
  createdBy: "",

  operations: [],
  impact: undefined,
  additional: undefined,
  closure: undefined,
  patients: [],
};

export default function EmergencyForm() {

  const { reloadEmergencies } = useEmergencies();

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // Activación visual de módulos
  const [enabled, setEnabled] = useState({
    operations: false,
    impact: false,
    additional: false,
    closure: false,
    patients: false,
  });

  function toggle(section: keyof typeof enabled) {
    setEnabled(prev => ({
      ...prev,
      [section]: !prev[section]
    }));

    // inicializar si se activa
    if (!enabled[section]) {
      setForm((prev: any) => ({
        ...prev,
        [section]: section === "patients" ? [] : {}
      }));
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  }

  function update(section: string, value: any) {
    setForm((prev: any) => ({
      ...prev,
      [section]: value
    }));
  }

  function autoEnableModules(type: string) {

    const modules =
      TYPE_MODULE_RULES[type] ||
      TYPE_MODULE_RULES.default;

    const nextEnabled: any = {
      operations: false,
      impact: false,
      additional: false,
      closure: false,
      patients: false,
    };

    modules.forEach(m => nextEnabled[m] = true);

    setEnabled(nextEnabled);

    setForm((prev: any) => {
      const updated = { ...prev };

      modules.forEach(m => {
        if (updated[m] === undefined) {
          updated[m] = m === "patients" ? [] : {};
        }
      });

      return updated;
    });
  }


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const lat = Number(form.lat);
    const lng = Number(form.lng);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      alert("Latitud y longitud inválidas");
      return;
    }

    setLoading(true);

    const payload = {
      ...form,
      lat,
      lng,
      operations: enabled.operations ? [form.operations] : undefined,
      impact: enabled.impact ? form.impact : undefined,
      additional: enabled.additional ? form.additional : undefined,
      closure: enabled.closure ? form.closure : undefined,
      patients: enabled.patients ? form.patients : undefined,
    };

    try {
      console.log("PAYLOAD ENVIADO >>>");
      console.dir(payload, { depth: null });

      await submitEmergency(payload, reloadEmergencies);

      alert("Emergencia registrada correctamente");

      setForm(initialState);
      setEnabled({
        operations: false,
        impact: false,
        additional: false,
        closure: false,
        patients: false,
      });

    } catch (err) {
      alert("Error al registrar emergencia");
      console.error(err);
    } finally {
      setLoading(false);
      reloadEmergencies();
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

          {/* ================= CAMPOS ORIGINALES ================= */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Departamento" name="departmentId" value={form.departmentId} onChange={handleChange} required={true} />

            <Field label="Municipio" name="municipalityId" value={form.municipalityId} onChange={handleChange} required={true} />

            <Field label="Estación" name="stationId" value={form.stationId} onChange={handleChange} required={true} />
          </div>

          <div className="space-y-2">
            <Label>Tipo de Emergencia</Label>
            <Select
              value={form.type}
              onValueChange={(value) => {
                setForm((prev: any) => ({ ...prev, type: value }));
                autoEnableModules(value);
              }}
            >

              <SelectTrigger className="bg-slate-800/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800">
                {Object.entries(EmergencyType).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Descripción</Label>
            <Textarea className="bg-slate-800/50" name="description" value={form.description} onChange={handleChange} rows={4} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Latitud</Label>
              <Input className="bg-slate-800/50" name="lat" value={form.lat} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label>Longitud</Label>
              <Input className="bg-slate-800/50" name="lng" value={form.lng} onChange={handleChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Estado</Label>
            <Select value={form.status}
              onValueChange={(value) =>
                setForm((prev: any) => ({ ...prev, status: value }))
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

          <Field label="Registrado por" name="createdBy" value={form.createdBy} onChange={handleChange} required={true} />

          {/* ================= TOGGLES ================= */}

          <div className="flex flex-wrap gap-2">
            <Toggle label="Operaciones" active={enabled.operations} onClick={() => toggle("operations")} />
            <Toggle label="Impacto" active={enabled.impact} onClick={() => toggle("impact")} />
            <Toggle label="Datos adicionales" active={enabled.additional} onClick={() => toggle("additional")} />
            <Toggle label="Cierre" active={enabled.closure} onClick={() => toggle("closure")} />
            <Toggle label="Pacientes" active={enabled.patients} onClick={() => toggle("patients")} />
          </div>

          {/* ================= SUBFORMULARIOS ================= */}

          {enabled.operations && (
            <OperationForm
              value={form.operations || []}
              onChange={(v) => update("operations", v)}
            />
          )}

          {enabled.impact && (
            <ImpactForm
              value={form.impact || {}}
              onChange={(v) => update("impact", v)}
            />
          )}

          {enabled.additional && (
            <AdditionalDataForm
              value={form.additional || {}}
              onChange={(v) => update("additional", v)}
            />
          )}

          {enabled.closure && (
            <ClosureForm
              value={form.closure || {}}
              onChange={(v) => update("closure", v)}
            />
          )}

          {enabled.patients && (
            <PatientsForm
              value={form.patients || []}
              onChange={(v) => update("patients", v)}
            />
          )}

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

function Toggle({ label, active, onClick }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1 rounded text-sm border
        ${active
          ? "bg-blue-600 border-blue-500"
          : "bg-slate-800 border-slate-600"}
      `}
    >
      {active ? "✓ " : "+ "}
      {label}
    </button>
  );
}

function Field({ label, name, value, onChange }: any) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        className="bg-slate-800/50"
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}
