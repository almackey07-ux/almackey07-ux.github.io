export async function onRequest(context) {
  try {
    const requestBody = {
      origin: { address: "Brookfield Park Rathnew" },
      destination: { address: "Birchall Lodge" },
      intermediates: [
        { address: "Cianlea Swords" }
      ],
      travelMode: "DRIVE"
    };

    const response = await fetch(
      "https://routes.googleapis.com/directions/v2:computeRoutes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": context.env.GMAPS_KEY,
          "X-Goog-FieldMask":
            "routes.duration,routes.distanceMeters,routes.legs.duration,routes.legs.distanceMeters"
        },
        body: JSON.stringify(requestBody)
      }
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Exception", details: String(err) }),
      { status: 500 }
    );
  }
}
