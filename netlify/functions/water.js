export async function handler() {
  try {
    const url = "https://waterlevel.ie/hydro-data/api/Measurements?stationId=19002&numDays=1"
    const r = await fetch(url)
    const data = await r.json()

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }

  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "water fetch failed" })
    }
  }
}
