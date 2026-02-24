import { useState } from "react";
import EmergencyDetailDrawer from "./EmergencyDetailDrawer";
import { EmergencyType } from "@/types/emergency";

interface Emergency {
    type: EmergencyType;
    status: string;
    municipalityId: string;
    stationId: string;
    createdAt: string;
}

export default function EmergencyCard({ emergency }: { emergency: Emergency }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="border rounded-xl p-4 bg-slate-900/50 space-y-2">
                <div className="flex justify-between">
                    <span className="font-semibold">
                        {EmergencyType[emergency.type]}
                    </span>
                    <span className="text-sm">{emergency.status}</span>
                </div>

                <div className="text-sm text-slate-400">
                    {emergency.municipalityId} · {emergency.stationId}
                </div>

                <div className="text-xs">
                    {new Date(emergency.createdAt).toLocaleString()}
                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="text-blue-400 text-sm"
                >
                    Ver detalle
                </button>
            </div>

            {open && (
                <EmergencyDetailDrawer
                    emergency={emergency}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
}