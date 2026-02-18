export async function handler() {

  const key = process.env.GMAPS_KEY

  const body = {
    origin: { address: "Brookfield Park Rathnew Ireland" },
    destination: { address: "Birchall Lodge and Angling" },
    intermediates: [
      { address: "Cianlea Swords" }
    ],
    travelMode: "DRIVE",
    routingPreference: "TRAFFIC_AWARE"
  }

  const r = await fetch(
    "https://routes.googleapis.com/directions/v2:computeRoutes",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key
      },
      body: JSON.stringify(body)
    }
  )

  const data = await r.json()

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(data)
  }
}
