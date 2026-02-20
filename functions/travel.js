async function loadTravel() {
  try {
    const r = await fetch("/travel");
    const data = await r.json();

    const raw = data?.routes?.[0]?.duration;
    if (!raw) {
      document.getElementById("travel").textContent = "Travel error";
      return;
    }

    // Handle "14237s", "14237", or 14237
    const durationSec = parseInt(String(raw).replace("s", ""), 10);

    if (isNaN(durationSec)) {
      document.getElementById("travel").textContent = "Travel error";
      return;
    }

    const hours = Math.floor(durationSec / 3600);
    const minutes = Math.floor((durationSec % 3600) / 60);

    document.getElementById("travel").textContent =
      `Travel time: ${hours}h ${minutes}m`;
  } catch {
    document.getElementById("travel").textContent = "Travel error";
  }
}
