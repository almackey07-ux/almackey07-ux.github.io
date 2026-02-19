exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body || "{}");

    const origin = body.origin;
    const destination = body.destination;
    const waypoints = body.waypoints || [];

    const requestBody = {
      origin: { address: origin },
      destination: { address: destination },
      intermediates: waypoints.map(w => ({ address: w })),
      travelMode: "DRIVE"
    };

    const response = await fetch(
      "https://routes.googleapis.com/directions/v2:computeRoutes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GMAPS_KEY,
          "X-Goog-FieldMask":
            "routes.duration,routes.distanceMeters,routes.legs.duration,routes.legs.distanceMeters"
        },
        body: JSON.stringify(requestBody)
      }
    );

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Exception", details: String(err) })
    };
  }
};
