document.addEventListener("DOMContentLoaded", () => {
  initRegister();
  initJourney();
  initPanic();
});

// Registration
function initRegister() {
  const form = document.getElementById("registrationForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    // add itinerary field (since your HTML has just one input)
    const itinerary = document.getElementById("itinerary").value;
    formData.append("itinerary[]", itinerary);

    const response = await fetch("/api/tourists/register", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    alert("Registered! Tourist ID: " + data._id);

    localStorage.setItem("touristId", data._id);
  });
}

// Journey
function initJourney() {
  const btn = document.getElementById("startJourneyBtn");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const touristId = localStorage.getItem("touristId");
    if (!touristId) return alert("No Tourist ID found. Register first!");

    const response = await fetch(`/api/tourists/${touristId}/startJourney`, {
      method: "POST"
    });

    const data = await response.json();
    alert("Journey started! TxHash: " + data.txHash);
  });
}

// Panic
function initPanic() {
  const btn = document.getElementById("panicBtn");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const msg = document.getElementById("panicMessage").value || "";
    if (!navigator.geolocation) {
      return alert("Geolocation not supported");
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const body = {
        message: msg,
        location: {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        }
      };

      const res = await fetch("/api/panic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      alert("Panic sent! Status: " + data.status);
    });
  });
}
