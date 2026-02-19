import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  value: any[];
  onChange: (v: any[]) => void;
};

const emptyPatient = {
  name: "",
  document: "",
  age: "",
  diagnosis: "",
  phone: "",
  address: "",
  companion: "",
  injuries: "",
  glasgowEye: "",
  glasgowVerbal: "",
  glasgowMotor: "",
  procedures: "",
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
              <Input value={patient.name || ""} onChange={e=>setPatient(i,"name",e.target.value)} />
            </Field>

            <Field label="Documento">
              <Input value={patient.document || ""} onChange={e=>setPatient(i,"document",e.target.value)} />
            </Field>

            <Field label="Edad">
              <Input type="number" value={patient.age || ""} onChange={e=>setPatient(i,"age",Number(e.target.value))} />
            </Field>

            <Field label="Diagnóstico">
              <Input value={patient.diagnosis || ""} onChange={e=>setPatient(i,"diagnosis",e.target.value)} />
            </Field>

            <Field label="Teléfono">
              <Input value={patient.phone || ""} onChange={e=>setPatient(i,"phone",e.target.value)} />
            </Field>

            <Field label="Dirección">
              <Input value={patient.address || ""} onChange={e=>setPatient(i,"address",e.target.value)} />
            </Field>

            <Field label="Acompañante">
              <Input value={patient.companion || ""} onChange={e=>setPatient(i,"companion",e.target.value)} />
            </Field>

            <Field label="Lesiones">
              <Input value={patient.injuries || ""} onChange={e=>setPatient(i,"injuries",e.target.value)} />
            </Field>

            <Field label="Glasgow Ocular">
              <Input type="number" value={patient.glasgowEye || ""} onChange={e=>setPatient(i,"glasgowEye",Number(e.target.value))} />
            </Field>

            <Field label="Glasgow Verbal">
              <Input type="number" value={patient.glasgowVerbal || ""} onChange={e=>setPatient(i,"glasgowVerbal",Number(e.target.value))} />
            </Field>

            <Field label="Glasgow Motor">
              <Input type="number" value={patient.glasgowMotor || ""} onChange={e=>setPatient(i,"glasgowMotor",Number(e.target.value))} />
            </Field>

            <Field label="Procedimientos">
              <Input value={patient.procedures || ""} onChange={e=>setPatient(i,"procedures",e.target.value)} />
            </Field>

            <Field label="Notas">
              <Input value={patient.notes || ""} onChange={e=>setPatient(i,"notes",e.target.value)} />
            </Field>

            <Field label="Trasladado a">
              <Input value={patient.transferredTo || ""} onChange={e=>setPatient(i,"transferredTo",e.target.value)} />
            </Field>

            <Field label="Estado">
              <Input value={patient.status || ""} onChange={e=>setPatient(i,"status",e.target.value)} />
            </Field>

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
