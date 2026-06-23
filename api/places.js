export default async function handler(req, res) {
  // Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") { res.status(200).end(); return; }
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  const { lat, lng, cuisine } = req.body;
  const key = process.env.VITE_GOOGLE_PLACES_KEY;

  if (!key) { res.status(500).json({ error: "No API key configured" }); return; }
  if (!lat || !lng) { res.status(400).json({ error: "Missing lat/lng" }); return; }

  try {
    const response = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "places.displayName,places.rating,places.formattedAddress,places.id,places.priceLevel,places.currentOpeningHours,places.googleMapsUri,places.websiteUri",
      },
      body: JSON.stringify({
        includedTypes: ["restaurant"],
        maxResultCount: 10,
        rankPreference: "DISTANCE",
        locationRestriction: {
          circle: {
            center: { latitude: parseFloat(lat), longitude: parseFloat(lng) },
            radius: 5000.0,
          },
        },
        textQuery: `${cuisine} restaurant`,
      }),
    });

    const data = await response.json();
    if (!response.ok) { res.status(response.status).json(data); return; }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}