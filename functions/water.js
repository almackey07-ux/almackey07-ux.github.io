export async function onRequest() {
  try {
    const url = "http://waterlevel.ie/data/week/30101_0001.csv";

    const r = await fetch(url, {
      headers: {
        "Accept": "text/csv",
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

    const csv = await r.text();
    const lines = csv.trim().split("\n");

    if (lines.length < 3) {
      return new Response(JSON.stringify({ error: "Not enough data" }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    const last = lines[lines.length - 1].split(",");
    const prev = lines[lines.length - 2].split(",");

    const latest = parseFloat(last[1]);
    const previous = parseFloat(prev[1]);

    let trend = "steady";
    if (latest > previous) trend = "rising";
    if (latest < previous) trend = "falling";

    return new Response(
      JSON.stringify({ value: latest, trend }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Exception", details: String(err) }),
      { status: 500 }
    );
  }
}
