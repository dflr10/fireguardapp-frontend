import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function timeToTimestamp(time?: string) {
  if (!time) return "";
  const today = new Date();
  const [h, m] = time.split(":");
  today.setHours(Number(h));
  today.setMinutes(Number(m));
  today.setSeconds(0);
  return today.toISOString();
}

function timestampToTime(ts?: string) {
  if (!ts) return "";
  const d = new Date(ts);
  return d.toISOString().substring(11, 16);
}


type Props = {
  value: any;
  onChange: (v: any) => void;
};

export default function OperationForm({ value, onChange }: Props) {

  function setField(name: string, val: any) {
    onChange({ ...value, [name]: val });
  }

  function setAssistant(index: number, val: string) {
    const list = [...(value.assistants || [])];
    list[index] = val;
    setField("assistants", list);
  }

  function addAssistant() {
    setField("assistants", [...(value.assistants || []), ""]);
  }

  function removeAssistant(index: number) {
    const list = [...value.assistants];
    list.splice(index, 1);
    setField("assistants", list);
  }

  return (
    <div className="space-y-4 border rounded-xl p-4 bg-slate-900/40">

      <h3 className="font-bold text-lg">Operación</h3>

      <div className="grid md:grid-cols-2 gap-4">

        <div className="space-y-2">
          <Label>Comandante</Label>
          <Input
            className="bg-slate-800/50"
            value={value.commander || ""}
            onChange={(e) => setField("commander", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Conductor</Label>
          <Input
            className="bg-slate-800/50"
            value={value.driver || ""}
            onChange={(e) => setField("driver", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Vehículo</Label>
          <Input
            className="bg-slate-800/50"
            value={value.vehicle || ""}
            onChange={(e) => setField("vehicle", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Unidades</Label>
          <Input
            className="bg-slate-800/50"
            type="number"
            value={value.units || ""}
            onChange={(e) => setField("units", Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label>Km inicio</Label>
          <Input
            className="bg-slate-800/50"
            type="number"
            value={value.kmstart || ""}
            onChange={(e) => setField("kmstart", Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label>Km fin</Label>
          <Input
            className="bg-slate-800/50"
            type="number"
            value={value.kmend || ""}
            onChange={(e) => setField("kmend", Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label>Hora salida</Label>
          <Input
            className="bg-slate-800/50"
            type="time"
            value={timestampToTime(value.departureTime)}
            onChange={(e) =>
              setField("departureTime", timeToTimestamp(e.target.value))
            }
          />

        </div>

        <div className="space-y-2">
          <Label>Hora llegada</Label>
          <Input
            className="bg-slate-800/50"
            type="time"
            value={timestampToTime(value.arrivalTime)}
            onChange={(e) =>
              setField("arrivalTime", timeToTimestamp(e.target.value))
            }
          />
        </div>

      </div>

      {/* Assistants dinámico */}
      <div className="space-y-2">
        <Label>Auxiliares</Label>

        {(value.assistants || []).map((a: string, i: number) => (
          <div key={i} className="flex gap-2">
            <Input
              className="bg-slate-800/50"
              value={a}
              onChange={(e) => setAssistant(i, e.target.value)}
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => removeAssistant(i)}
            >
              X
            </Button>
          </div>
        ))}

        <Button type="button" onClick={addAssistant}>
          + Agregar auxiliar
        </Button>
      </div>

    </div>
  );
}
