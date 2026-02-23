import { saveEmergencyOffline } from "../offline/offline.service";
import { createEmergency } from "./api.service";

export async function submitEmergency(
  data: any,
  onSuccess?: () => Promise<void>
) {
  let sentToServer = false;

  if (navigator.onLine) {
    try {
      await createEmergency(data);
      sentToServer = true;
    } catch (err) {
      console.warn("API falló → fallback offline", err);
    }
  }

  if (!sentToServer) {
    await saveEmergencyOffline({
      ...data,
      synced: false
    });
  }

  if (onSuccess) {
    await onSuccess();
  }
}
