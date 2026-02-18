// netlify/functions/travel.js

exports.handler = async function (event, context) {
  try {
    const key = process.env.GMAPS_KEY;
    if (!key) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "GMAPS_KEY not set" })
      };
    }

    const body = {
      origin: { address: "Brookfield Park Rathnew Ireland" },
      destination: { address: "Birchall Lodge and Angling" },
      intermediates: [
        { address: "Cianlea Swords" }
      ],
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_AWARE"
    };

    const r = await fetch(
      "https://routes.googleapis.com/directions/v2:computeRoutes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": key,
          // REQUIRED: tell Google which fields you want back
          "X-Goog-FieldMask": "routes.duration,routes.distanceMeters"
        },
        body: JSON.stringify(body)
      }
    );

    if (!r.ok) {
      const text = await r.text();
      return {
        statusCode: r.status,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: "google routes failed", details: text })
      };
    }

    const data = await r.json();

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
      body: JSON.stringify({ error: "travel function failed", details: String(e) })
    };
  }
};
