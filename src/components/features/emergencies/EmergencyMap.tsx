import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEmergencies } from "@/context/EmergencyContext";
import { emergencyMarker } from "@/map/emergencyMarker";
import { getMarkerColor } from "@/map/getMarkerColor";
import { EmergencyType } from "@/types/emergency";

export function EmergencyMap() {
  const { emergencies } = useEmergencies();

  const validEmergencies = emergencies.filter(e =>
    Number.isFinite(Number(e.lat)) &&
    Number.isFinite(Number(e.lng))
  );

  const truncate = (text?: string, max = 30) => {
    if (!text) return ""
    return text.length > max
      ? text.slice(0, max) + "..."
      : text
  }

  return (
    <MapContainer
      className="z-0 rounded-lg shadow-lg"
      center={[6.2442, -75.5812]}
      zoom={12}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {validEmergencies.map(e => (
        <Marker
          key={e.id}
          position={[Number(e.lat), Number(e.lng)]}
          icon={emergencyMarker(getMarkerColor(e.status))}
        >
          <Popup>
            <strong>{EmergencyType[e.type as EmergencyType]}</strong><br />
            Estado: {e.status}<br />
            {truncate(e.description, 30)}<br />
            {e.synced ? "Sincronizada" : "No sincronizada"}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
