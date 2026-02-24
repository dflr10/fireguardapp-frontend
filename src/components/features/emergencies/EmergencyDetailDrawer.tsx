import { EmergencyType } from "@/types/emergency";

type Props = {
  emergency: any;
  onClose: () => void;
};

export default function EmergencyDetailDrawer({ emergency, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-end">
      <div className="w-full md:w-[700px] bg-slate-900 h-full overflow-y-auto p-6 space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h2 className="text-xl font-bold">
              {EmergencyType[emergency.type as EmergencyType]}
            </h2>
            <p className="text-sm text-slate-400">
              {new Date(emergency.createdAt).toLocaleString()}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-red-400 text-sm"
          >
            Cerrar
          </button>
        </div>

        {/* ===================== */}
        {/* DATOS BASE */}
        {/* ===================== */}

        <Section title="Información General">
          <Field label="Descripción" value={emergency.description} />
          <Field label="Estado" value={emergency.status} />
          <Field label="Departamento" value={emergency.departmentId} />
          <Field label="Municipio" value={emergency.municipalityId} />
          <Field label="Estación" value={emergency.stationId} />
          <Field label="Creado por" value={emergency.createdBy} />
          <Field label="Latitud" value={emergency.lat} />
          <Field label="Longitud" value={emergency.lng} />
        </Section>

        {/* ===================== */}
        {/* OPERACIONES */}
        {/* ===================== */}

        {emergency.operations?.length > 0 && (
          <Section title="Operaciones">
            {emergency.operations.map((op: any, i: number) => (
              <SubCard key={i}>
                <Field label="Comandante" value={op.commander} />
                <Field label="Vehículo" value={op.vehicle} />
                <Field label="Salida" value={formatDate(op.departureTime)} />
                <Field label="Llegada" value={formatDate(op.arrivalTime)} />
                <Field label="Personal" value={op.personnel} />

                {op.assistants?.length > 0 && (
                  <div>
                    <p className="font-semibold mt-2">Asistentes</p>
                    <ul className="list-disc list-inside text-sm">
                      {op.assistants.map((a: string, idx: number) => (
                        <li key={idx}>{a}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </SubCard>
            ))}
          </Section>
        )}

        {/* ===================== */}
        {/* IMPACTO */}
        {/* ===================== */}

        {emergency.impact && (
          <Section title="Impacto">
            <Field label="Fallecidos" value={emergency.impact.deaths} />
            <Field label="Heridos" value={emergency.impact.injured} />
            <Field label="Desaparecidos" value={emergency.impact.missing} />
            <Field label="Personas afectadas" value={emergency.impact.affectedPeople} />
            <Field label="Familias afectadas" value={emergency.impact.affectedFamilies} />
            <Field label="Viviendas dañadas" value={emergency.impact.damagedHomes} />
            <Field label="Viviendas destruidas" value={emergency.impact.destroyedHomes} />
            <Field label="Área" value={emergency.impact.area} />
          </Section>
        )}

        {/* ===================== */}
        {/* DATOS ADICIONALES */}
        {/* ===================== */}

        {emergency.additional && (
          <Section title="Datos Adicionales">
            {Object.entries(emergency.additional).map(([key, value]) => (
              <Field key={key} label={key} value={String(value)} />
            ))}
          </Section>
        )}

        {/* ===================== */}
        {/* CIERRE */}
        {/* ===================== */}

        {emergency.closure && (
          <Section title="Cierre Operativo">
            <Field label="Organización" value={emergency.closure.organization} />
            <Field label="Distancia (km)" value={emergency.closure.distance} />
            <Field label="Kilometraje Final" value={emergency.closure.finalKm} />
            <Field label="Gastos" value={emergency.closure.expenses} />
            <Field label="HEAS" value={emergency.closure.heas} />
            <Field label="Incidentes" value={emergency.closure.incidents} />
            <Field label="Limpieza realizada" value={emergency.closure.cleaning ? "Sí" : "No"} />
            <Field label="Observaciones" value={emergency.closure.observations} />
          </Section>
        )}

        {/* ===================== */}
        {/* PACIENTES */}
        {/* ===================== */}

        {emergency.patients?.length > 0 && (
          <Section title="Pacientes / Epicrisis">
            {emergency.patients.map((p: any, i: number) => (
              <SubCard key={i}>
                <Field label="Nombre" value={p.name} />
                <Field label="Documento" value={p.document} />
                <Field label="Edad" value={p.age} />
                <Field label="Género" value={p.gender} />
                <Field label="Teléfono" value={p.phone} />
                <Field label="Dirección" value={p.address} />
                <Field label="Acompañante" value={p.companion} />
                <Field label="Estado" value={p.status} />
                <Field label="Trasladado a" value={p.transferredTo} />

                {p.injuries?.length > 0 && (
                  <ListField label="Lesiones" items={p.injuries} />
                )}

                {p.procedures?.length > 0 && (
                  <ListField label="Procedimientos" items={p.procedures} />
                )}

                <Field label="Glasgow Ocular" value={p.glasgowEye} />
                <Field label="Glasgow Verbal" value={p.glasgowVerbal} />
                <Field label="Glasgow Motor" value={p.glasgowMotor} />
                <Field label="Notas" value={p.notes} />
              </SubCard>
            ))}
          </Section>
        )}

      </div>
    </div>
  );
}

/* ========================= */
/* COMPONENTES AUXILIARES */
/* ========================= */

function Section({ title, children }: any) {
  return (
    <div className="border rounded-xl p-4 bg-slate-800/40 space-y-3">
      <h3 className="font-bold text-lg">{title}</h3>
      {children}
    </div>
  );
}

function SubCard({ children }: any) {
  return (
    <div className="border rounded-lg p-4 bg-slate-700/40 space-y-2">
      {children}
    </div>
  );
}

function Field({ label, value }: any) {
  if (!value && value !== 0) return null;

  return (
    <div className="text-sm">
      <span className="font-semibold">{label}: </span>
      <span>{value}</span>
    </div>
  );
}

function ListField({ label, items }: any) {
  return (
    <div className="text-sm">
      <p className="font-semibold">{label}:</p>
      <ul className="list-disc list-inside">
        {items.map((item: string, i: number) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function formatDate(date: string) {
  if (!date) return null;
  return new Date(date).toLocaleString();
}