import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  value: any[];
  onChange: (v: any[]) => void;
};

const emptyPatient = {
  name: "",
  document: "",
  age: "",
  gender: "",
  phone: "",
  address: "",
  companion: "",
  injuries: [""],
  glasgowEye: "",
  glasgowVerbal: "",
  glasgowMotor: "",
  procedures: [""],
  notes: "",
  transferredTo: "",
  status: ""
};

export default function PatientsForm({ value = [], onChange }: Props) {

  function setPatient(index: number, field: string, val: any) {
    const copy = [...value];
    copy[index] = { ...copy[index], [field]: val };
    onChange(copy);
  }

  function addPatient() {
    onChange([...value, { ...emptyPatient }]);
  }

  function removePatient(index: number) {
    const copy = value.filter((_, i) => i !== index);
    onChange(copy);
  }

  function setArrayField(index: number, field: string, arr: string[]) {
    const copy = [...value];
    copy[index] = { ...copy[index], [field]: arr };
    onChange(copy);
  }

  function addArrayItem(pIndex: number, field: string) {
    const list = [...(value[pIndex][field] || []), ""];
    setArrayField(pIndex, field, list);
  }

  function updateArrayItem(pIndex: number, field: string, i: number, val: string) {
    const list = [...(value[pIndex][field] || [])];
    list[i] = val;
    setArrayField(pIndex, field, list);
  }

  function removeArrayItem(pIndex: number, field: string, i: number) {
    const list = [...(value[pIndex][field] || [])];
    list.splice(i, 1);
    setArrayField(pIndex, field, list);
  }

  return (
    <div className="space-y-4 border rounded-xl p-4 bg-slate-900/40">

      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">Pacientes / Epicrisis</h3>

        <button
          type="button"
          onClick={addPatient}
          className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-sm"
        >
          + Agregar paciente
        </button>
      </div>

      {value.map((patient, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-4 bg-slate-800/40">

          <div className="flex justify-between items-center">
            <h4 className="font-semibold">Paciente #{i + 1}</h4>

            <button
              type="button"
              onClick={() => removePatient(i)}
              className="text-red-400 text-sm"
            >
              Eliminar
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">

            <Field label="Nombre">
              <Input value={patient.name || ""} onChange={e => setPatient(i, "name", e.target.value)} />
            </Field>

            <Field label="Documento">
              <Input value={patient.document || ""} onChange={e => setPatient(i, "document", e.target.value)} />
            </Field>

            <Field label="Edad">
              <Input type="number" value={patient.age || ""} onChange={e => setPatient(i, "age", Number(e.target.value))} />
            </Field>

            <div className="space-y-2">
              <Label>Género</Label>
              <br />
              <select
                className="bg-slate-800/50 border rounded-md h-9 px-2"
                value={patient.gender ?? ""}
                onChange={(e) => setPatient(i, "gender", e.target.value)}
              >
                <option value="">Seleccionar</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
                <option value="No especifica">No especifica</option>
              </select>
            </div>

            <Field label="Teléfono">
              <Input value={patient.phone || ""} onChange={e => setPatient(i, "phone", e.target.value)} />
            </Field>

            <Field label="Dirección">
              <Input value={patient.address || ""} onChange={e => setPatient(i, "address", e.target.value)} />
            </Field>

            <Field label="Acompañante">
              <Input value={patient.companion || ""} onChange={e => setPatient(i, "companion", e.target.value)} />
            </Field>

            <div className="space-y-2">
              <Label>Lesiones</Label>

              {(patient.injuries || []).map((inj: string, j: number) => (
                <div key={j} className="flex gap-2">
                  <Input
                    value={inj}
                    onChange={e =>
                      updateArrayItem(i, "injuries", j, e.target.value)
                    }
                  />

                  <button
                    type="button"
                    onClick={() => removeArrayItem(i, "injuries", j)}
                    className="text-red-400"
                  >
                    X
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addArrayItem(i, "injuries")}
                className="text-blue-400 text-sm"
              >
                + Agregar lesión
              </button>
            </div>

            <Field label="Glasgow Ocular">
              <Input type="number" value={patient.glasgowEye || ""} onChange={e => setPatient(i, "glasgowEye", Number(e.target.value))} />
            </Field>

            <Field label="Glasgow Verbal">
              <Input type="number" value={patient.glasgowVerbal || ""} onChange={e => setPatient(i, "glasgowVerbal", Number(e.target.value))} />
            </Field>

            <Field label="Glasgow Motor">
              <Input type="number" value={patient.glasgowMotor || ""} onChange={e => setPatient(i, "glasgowMotor", Number(e.target.value))} />
            </Field>

            <div className="space-y-2">
              <Label>Procedimientos</Label>

              {(patient.procedures || []).map((proc: string, j: number) => (
                <div key={j} className="flex gap-2">
                  <Input
                    value={proc}
                    onChange={e =>
                      updateArrayItem(i, "procedures", j, e.target.value)
                    }
                  />

                  <button
                    type="button"
                    onClick={() => removeArrayItem(i, "procedures", j)}
                    className="text-red-400"
                  >
                    X
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addArrayItem(i, "procedures")}
                className="text-blue-400 text-sm"
              >
                + Agregar procedimiento
              </button>
            </div>


            <Field label="Trasladado a">
              <Input value={patient.transferredTo || ""} onChange={e => setPatient(i, "transferredTo", e.target.value)} />
            </Field>

            <Field label="Estado">
              <Input value={patient.status || ""} onChange={e => setPatient(i, "status", e.target.value)} />
            </Field>

            <div className="space-y-2">
              <Label>Notas</Label>
              <Textarea className="bg-slate-800/50" name="notes" value={patient.notes || ""} onChange={e => setPatient(i, "notes", e.target.value)} rows={4} required />
            </div>

          </div>

        </div>
      ))}
    </div>
  );
}


function Field({ label, children }: any) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="bg-slate-800/50">
        {children}
      </div>
    </div>
  );
}
