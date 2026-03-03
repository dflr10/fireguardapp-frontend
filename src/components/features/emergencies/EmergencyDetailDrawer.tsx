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
          <Field label="Tipo" value={EmergencyType[emergency.type as EmergencyType]} />
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
          <Section title="Detalles de la Operación">
            {emergency.operations.map((op: any, i: number) => (
              <SubCard key={i}>
                {op.commander ? <Field label="Comandante" value={op.commander} /> : <Field label="Comandante" value="No asignado" />}
                {op.driver ? <Field label="Conductor" value={op.driver} /> : <Field label="Conductor" value="No asignado" />}
                {op.vehicle ? <Field label="Vehículo" value={op.vehicle} /> : <Field label="Vehículo" value="No asignado" />}
                {op.departureTime ? <Field label="Salida" value={formatDate(op.departureTime)} /> : <Field label="Salida" value={null} />}
                {op.arrivalTime ? <Field label="Llegada" value={formatDate(op.arrivalTime)} /> : <Field label="Llegada" value={null} />}
                {op.units ? <Field label="Unidades" value={op.units} /> : <Field label="Unidades" value={0} />}
                {op.kmStart ? <Field label="Km inicial" value={op.kmStart} /> : <Field label="Km inicial" value={0} />}
                {op.kmEnd ? <Field label="Km final" value={op.kmEnd} /> : <Field label="Km final" value={0} />}


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
          <Section title="Detalles de la Emergencia">
            {emergency.impact.deaths ? <Field label="Fallecidos" value={emergency.impact.deaths} /> : <Field label="Fallecidos" value={0} />}
            {emergency.impact.injured ? <Field label="Heridos" value={emergency.impact.injured} /> : <Field label="Heridos" value={0} />}
            {emergency.impact.missing ? <Field label="Desaparecidos" value={emergency.impact.missing} /> : <Field label="Desaparecidos" value={0} />}
            {emergency.impact.affectedPeople ? <Field label="Personas afectadas" value={emergency.impact.affectedPeople} /> : <Field label="Personas afectadas" value={0} />}
            {emergency.impact.affectedFamilies ? <Field label="Familias afectadas" value={emergency.impact.affectedFamilies} /> : <Field label="Familias afectadas" value={0} />}
            {emergency.impact.damagedHomes ? <Field label="Viviendas dañadas" value={emergency.impact.damagedHomes} /> : <Field label="Viviendas dañadas" value={0} />}
            {emergency.impact.destroyedHomes ? <Field label="Viviendas destruidas" value={emergency.impact.destroyedHomes} /> : <Field label="Viviendas destruidas" value={0} />}
            {emergency.impact.area ? <Field label="Área" value={emergency.impact.area} /> : <Field label="Área" value="No reportada" />}
          </Section>
        )}

        {/* ===================== */}
        {/* DATOS ADICIONALES */}
        {/* ===================== */}

        {emergency.additional && (
          <Section title="Datos Adicionales">
              {emergency.additional.victimName ? <Field label="Nombre de la víctima" value={emergency.additional.victimName} /> : <Field label="Nombre de la víctima" value="No reportado" />}
              {emergency.additional.idNumber ? <Field label="Documento de la víctima" value={emergency.additional.idNumber} /> : <Field label="Documento de la víctima" value="No reportado" />}
              {emergency.additional.vehiclePlate ? <Field label="Placa del vehículo" value={emergency.additional.vehiclePlate} /> : <Field label="Placa del vehículo" value="No reportada" />}
              {emergency.additional.fireNotes ? <Field label="Notas incendio / rescate" value={emergency.additional.fireNotes} /> : <Field label="Notas incendio / rescate" value="No reportadas" />}
              {emergency.additional.development ? <Field label="Desarrollo del evento" value={emergency.additional.development} /> : <Field label="Desarrollo del evento" value="No reportado" />}
          </Section>
        )}

        {/* ===================== */}
        {/* CIERRE */}
        {/* ===================== */}

        {emergency.closure && (
          <Section title="Cierre Operativo">
            {emergency.closure.distance ? <Field label="Distancia recorrida (km)" value={emergency.closure.distance} /> : <Field label="Distancia (km)" value={0} />}
            {emergency.closure.finalKm ? <Field label="Kilometraje Final" value={emergency.closure.finalKm} /> : <Field label="Kilometraje Final" value={0} />}
            {emergency.closure.cleaning !== undefined ? <Field label="Limpieza realizada" value={emergency.closure.cleaning ? "Sí" : "No"} /> : <Field label="Limpieza realizada" value="No reportada" />}
            {emergency.closure.organization !== undefined ? <Field label="Organización realizada" value={emergency.closure.organization ? "Sí" : "No"} /> : <Field label="Organización realizada" value="No reportada" />}
            {emergency.closure.expenses ? <Field label="Gastos" value={emergency.closure.expenses} /> : <Field label="Gastos" value="No reportados" />}
            {emergency.closure.incidents ? <Field label="Incidentes" value={emergency.closure.incidents} /> : <Field label="Incidentes" value="No reportados" />}
            {emergency.closure.observations ? <Field label="Observaciones" value={emergency.closure.observations} /> : <Field label="Observaciones" value="No reportadas" />}
          </Section>
        )}

        {/* ===================== */}
        {/* PACIENTES */}
        {/* ===================== */}

        {emergency.patients?.length > 0 && (
          <Section title="Datos de Pacientes / Epicrisis">
            {emergency.patients.map((p: any, i: number) => (
              <SubCard key={i}>
                {p.name ? <Field label="Nombre" value={p.name} /> : <Field label="Nombre" value="No reportado" />}
                {p.document ? <Field label="Documento" value={p.document} /> : <Field label="Documento" value="No reportado" />}
                {p.age !== undefined ? <Field label="Edad" value={p.age} /> : <Field label="Edad" value={0} />}
                {p.gender ? <Field label="Género" value={p.gender} /> : <Field label="Género" value="No reportado" />}
                {p.phone ? <Field label="Teléfono" value={p.phone} /> : <Field label="Teléfono" value="No reportado" />}
                {p.address ? <Field label="Dirección" value={p.address} /> : <Field label="Dirección" value="No reportada" />}
                {p.companion ? <Field label="Acompañante" value={p.companion} /> : <Field label="Acompañante" value="No reportado" />}
                {p.status ? <Field label="Estado" value={p.status} /> : <Field label="Estado" value="No reportado" />}
                {p.transferredTo ? <Field label="Trasladado a" value={p.transferredTo} /> : <Field label="Trasladado a" value="No reportado" />}

                {p.injuries ? <ListField label="Lesiones" items={p.injuries} /> : <Field label="Lesiones" value={["No reportadas"]} />}
                {p.procedures ? <ListField label="Procedimientos" items={p.procedures} /> : <Field label="Procedimientos" value={["No reportados"]} />}

                {p.glasgowEye !== undefined ? <Field label="Glasgow Ocular" value={p.glasgowEye} /> : <Field label="Glasgow Ocular" value={null} />}
                {p.glasgowVerbal !== undefined ? <Field label="Glasgow Verbal" value={p.glasgowVerbal} /> : <Field label="Glasgow Verbal" value={null} />}
                {p.glasgowMotor !== undefined ? <Field label="Glasgow Motor" value={p.glasgowMotor} /> : <Field label="Glasgow Motor" value={null} />}
                {p.notes ? <Field label="Notas" value={p.notes} /> : <Field label="Notas" value="No reportadas" />}
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