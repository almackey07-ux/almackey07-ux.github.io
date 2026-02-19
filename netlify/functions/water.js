exports.handler = async () => {
  try {
    const r = await fetch(
      "https://waterlevel.ie/hydro-data/api/Measurements?stationId=19002&numDays=1",
      {
        headers: {
          "Accept": "application/json",
          "User-Agent": "NetlifyFunction/1.0"
        }
      }
    );

    if (!r.ok) {
      return {
        statusCode: r.status,
        body: JSON.stringify({
          error: "Fetch failed",
          details: await r.text()
        })
      };
    }

    const data = await r.json();

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
