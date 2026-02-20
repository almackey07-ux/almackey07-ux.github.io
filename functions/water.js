export async function onRequest() {
  try {
    const url =
      "https://waterlevel.ie/hydro-data/api/v1/stations/11775/measurements?period=P1D";

    const r = await fetch(url, {
      headers: {
        "Accept": "application/json",
        "User-Agent": "CloudflareWorker/1.0"
      }
    });

    if (!r.ok) {
      return new Response(
        JSON.stringify({
          error: "Fetch failed",
          status: r.status,
          details: await r.text()
        }),
        { status: r.status }
      );
    }

    const data = await r.json();
    const latest = data?.measurements?.[0];

    if (!latest) {
      return new Response(JSON.stringify({ error: "No data" }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(
      JSON.stringify({ value: latest.value }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Exception", details: String(err) }),
      { status: 500 }
    );
  }
}
