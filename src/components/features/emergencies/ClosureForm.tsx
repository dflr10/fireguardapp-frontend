import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  value: any;
  onChange: (v: any) => void;
};

export default function ClosureForm({ value, onChange }: Props) {

  function setField(name: string, val: any) {
    onChange({ ...value, [name]: val });
  }

  return (
    <div className="space-y-4 border rounded-xl p-4 bg-slate-900/40">

      <h3 className="font-bold text-lg">Cierre operativo</h3>

      <div className="grid md:grid-cols-2 gap-4">

        <div className="space-y-2">
          <Label>Distancia recorrida</Label>
          <Input
            className="bg-slate-800/50"
            type="number"
            value={value.distance || ""}
            onChange={(e)=>setField("distance", Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label>Km final</Label>
          <Input
            className="bg-slate-800/50"
            type="number"
            value={value.finalKm || ""}
            onChange={(e)=>setField("finalKm", Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label>Limpieza realizada</Label>
          <select
            className="bg-slate-800/50 border rounded-md h-10 px-2"
            value={value.cleaning ?? false}
            onChange={(e)=>setField("cleaning", e.target.value === "true")}
          >
            <option value="">Seleccionar</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label>Organización realizada</Label>
          <select
            className="bg-slate-800/50 border rounded-md h-10 px-2"
            value={value.organization ?? false}
            onChange={(e)=>setField("organization", e.target.value === "true")}
          >
            <option value="">Seleccionar</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Observaciones</Label>
          <Textarea
            className="bg-slate-800/50"
            value={value.observations || ""}
            onChange={(e)=>setField("observations", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Gastos</Label>
          <Input
            className="bg-slate-800/50"
            value={value.expenses || ""}
            onChange={(e)=>setField("expenses", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Incidentes</Label>
          <Input
            className="bg-slate-800/50"
            value={value.incidents || ""}
            onChange={(e)=>setField("incidents", e.target.value)}
          />
        </div>

      </div>
    </div>
  );
}
