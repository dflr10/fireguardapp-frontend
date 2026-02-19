import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  value: any;
  onChange: (v: any) => void;
};

export default function ImpactForm({ value, onChange }: Props) {

  function setField(name: string, val: any) {
    onChange({ ...value, [name]: val });
  }

  return (
    <div className="space-y-4 border rounded-xl p-4 bg-slate-900/40">

      <h3 className="font-bold text-lg">Impacto</h3>

      <div className="grid md:grid-cols-2 gap-4">

        <div className="space-y-2">
          <Label>Heridos</Label>
          <Input
            type="number"
            className="bg-slate-800/50"
            value={value.injured ?? ""}
            onChange={(e)=>setField("injured", Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label>Fallecidos</Label>
          <Input
            type="number"
            className="bg-slate-800/50"
            value={value.deceased ?? ""}
            onChange={(e)=>setField("deceased", Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label>Desaparecidos</Label>
          <Input
            type="number"
            className="bg-slate-800/50"
            value={value.missing ?? ""}
            onChange={(e)=>setField("missing", Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label>Personas afectadas</Label>
          <Input
            type="number"
            className="bg-slate-800/50"
            value={value.affectedPersons ?? ""}
            onChange={(e)=>setField("affectedPersons", Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label>Familias afectadas</Label>
          <Input
            type="number"
            className="bg-slate-800/50"
            value={value.families ?? ""}
            onChange={(e)=>setField("families", Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label>Viviendas afectadas</Label>
          <Input
            type="number"
            className="bg-slate-800/50"
            value={value.housesAffected ?? ""}
            onChange={(e)=>setField("housesAffected", Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label>Viviendas destruidas</Label>
          <Input
            type="number"
            className="bg-slate-800/50"
            value={value.housesDestroyed ?? ""}
            onChange={(e)=>setField("housesDestroyed", Number(e.target.value))}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Área afectada</Label>
          <Input
            className="bg-slate-800/50"
            value={value.area || ""}
            onChange={(e)=>setField("area", e.target.value)}
          />
        </div>

      </div>
    </div>
  );
}
