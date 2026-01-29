const API_URL = "api/emergencies";

export async function createEmergency(data: any) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Error creating emergency");
  }

  return res.json();
}


export async function getEmergencies() {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Error fetching emergencies");
  }

  return res.json();
}
