import { saveEmergencyOffline } from "../offline/offline.service";
import { createEmergency } from "./api.service";

export async function submitEmergency(
  data: any,
  onSuccess?: () => Promise<void>
) {
  if (navigator.onLine) {
    try {
      await createEmergency(data);
    } catch {
      await saveEmergencyOffline(data);
    }
  } else {
    await saveEmergencyOffline(data);
  }
  if (onSuccess) {
    await onSuccess();
  }
}
