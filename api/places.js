export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") { res.status(200).end(); return; }
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  const { lat, lng, cuisine } = req.body;
  const key = process.env.VITE_GOOGLE_PLACES_KEY;

  if (!key) { res.status(500).json({ error: "No API key" }); return; }
  if (!lat || !lng) { res.status(400).json({ error: "Missing location" }); return; }

  try {
    // Use Places API Text Search - this is the one working (0 errors in logs)
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(cuisine + " restaurant")}&location=${lat},${lng}&radius=5000&key=${key}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "REQUEST_DENIED") {
      res.status(403).json({ error: data.error_message });
      return;
    }

    const places = (data.results || []).slice(0, 5).map(p => ({
      name: p.name,
      rating: p.rating,
      address: p.formatted_address,
      placeId: p.place_id,
      priceLevel: p.price_level,
      isOpen: p.opening_hours?.open_now ?? null,
      mapsUri: `https://www.google.com/maps/place/?q=place_id:${p.place_id}`,
    }));

    res.status(200).json({ places });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}