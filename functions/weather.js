export async function onRequest() {
  try {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=53.43&longitude=-9.32&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code";
    const r = await fetch(url);
    const data = await r.json();

    const current = data.current ?? {};

    const temp = current.temperature_2m ?? null;
    const wind = current.wind_speed_10m ?? null;
    const dir  = current.wind_direction_10m ?? null;

    // Weather code → description
    const codes = {
      0: "clear",
      1: "mainly clear",
      2: "partly cloudy",
      3: "overcast",
      51: "drizzle",
      61: "rain",
      63: "rain",
      80: "showers",
      95: "thunderstorm"
    };

    const description = codes[current.weather_code] ?? "unknown";

    return new Response(JSON.stringify({
      temp,
      wind,
      dir,
      description
    }), { headers: { "Content-Type": "application/json" } });

  } catch (err) {
    return new Response(JSON.stringify({
      temp: null,
      wind: null,
      dir: null,
      description: "unknown"
    }), { headers: { "Content-Type": "application/json" } });
  }
}
