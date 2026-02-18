// netlify/functions/water.js

exports.handler = async function (event, context) {
  try {
    const url = "https://waterlevel.ie/hydro-data/api/Measurements?stationId=19002&numDays=1";

    const r = await fetch(url, {
      headers: {
        "Accept": "application/json"
      }
    });

    if (!r.ok) {
      const text = await r.text();
      return {
        statusCode: r.status,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ error: "water fetch failed", details: text })
      };
    }

    const data = await r.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };

  } catch (e) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ error: "water fetch failed", details: String(e) })
    };
  }
};
