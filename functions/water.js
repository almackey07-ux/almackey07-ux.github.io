export async function onRequest() {
  try {
    const r = await fetch(
      "https://waterlevel.ie/hydro-data/api/stations/19002/measurements?days=1",
      {
        headers: {
          "Accept": "application/json",
          "User-Agent": "CloudflareWorker/1.0"
        }
      }
    );

    if (!r.ok) {
      return new Response(
        JSON.stringify({
          error: "Fetch failed",
          details: await r.text()
        }),
        { status: r.status }
      );
    }

    const data = await r.json();

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
