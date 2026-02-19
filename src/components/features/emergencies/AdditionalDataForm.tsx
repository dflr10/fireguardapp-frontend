import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  value: any;
  onChange: (v: any) => void;
};

export default function AdditionalDataForm({ value, onChange }: Props) {

  function setField(name: string, val: any) {
    onChange({ ...value, [name]: val });
  }

  return (
    <div className="space-y-4 border rounded-xl p-4 bg-slate-900/40">

      <h3 className="font-bold text-lg">Datos adicionales</h3>

      <div className="grid md:grid-cols-2 gap-4">

        <div className="space-y-2">
          <Label>Nombre víctima</Label>
          <Input
            className="bg-slate-800/50"
            value={value.victimName || ""}
            onChange={(e)=>setField("victimName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Documento</Label>
          <Input
            className="bg-slate-800/50"
            value={value.idNumber || ""}
            onChange={(e)=>setField("idNumber", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Placa vehículo</Label>
          <Input
            className="bg-slate-800/50"
            value={value.vehiclePlate || ""}
            onChange={(e)=>setField("vehiclePlate", e.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Notas incendio / rescate</Label>
          <Input
            className="bg-slate-800/50"
            value={value.fireNotes || ""}
            onChange={(e)=>setField("fireNotes", e.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Desarrollo del evento</Label>
          <Input
            className="bg-slate-800/50"
            value={value.development || ""}
            onChange={(e)=>setField("development", e.target.value)}
          />
        </div>

      </div>
    </div>
  );
}
