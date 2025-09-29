
const API_URL = window.API_URL ? window.API_URL.replace(/\/$/, "") : "http://localhost:5000";
const CONTRACT_ADDRESS = window.CONTRACT_ADDRESS || null;

console.log("Frontend config:", { API_URL, CONTRACT_ADDRESS });


function log(...args) { console.log("[app]", ...args); }

async function apiRequest(fullUrlOrPath, opts = {}) {
  const url = fullUrlOrPath.startsWith("http") ? fullUrlOrPath : `${API_URL}${fullUrlOrPath}`;
  log("Request", opts.method || "GET", url, opts);

  try {
    const res = await fetch(url, opts);
    const contentType = res.headers.get("content-type") || "";
    let data = contentType.includes("application/json") ? await res.json() : await res.text();

    log("Response", res.status, data);

    if (!res.ok) {
      throw new Error((data && data.error) || (typeof data === "string" ? data : res.statusText));
    }
    return data;
  } catch (err) {
    log("Network/API error:", err);
    throw err;
  }
}

function saveJSON(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } 
  catch (e) { localStorage.setItem(key, String(value)); }
}
function loadJSON(key) {
  const v = localStorage.getItem(key);
  if (v === null) return null;
  try { return JSON.parse(v); } catch { return v; }
}

function initRegisterPage() {
  const form = document.getElementById("registrationForm");
  const addPlaceBtn = document.getElementById("addPlaceBtn");
  const itineraryContainer = document.getElementById("itineraryContainer");
  if (!form) return;

 
  addPlaceBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    const count = itineraryContainer.querySelectorAll(".itinerary-item").length + 1;
    const div = document.createElement("div");
    div.className = "itinerary-item";
    div.innerHTML = `
      <label>Destination ${count}
        <div style="display:flex; gap:8px; align-items:center;">
          <input type="text" name="itinerary[]" placeholder="Enter place" required style="flex:1;" />
          <button type="button" class="remove-itinerary" title="Remove">✕</button>
        </div>
      </label>
    `;
    itineraryContainer.appendChild(div);
    div.querySelector(".remove-itinerary").addEventListener("click", () => div.remove());
  });

  
  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();

    
    const startDateEl = form.querySelector('input[name="startDate"]');
    const endDateEl = form.querySelector('input[name="endDate"]');
    if (startDateEl && endDateEl) {
      const s = new Date(startDateEl.value), e = new Date(endDateEl.value);
      if (e < s) { alert("End date must be after start date."); return; }
    }

    try {
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;

      const fd = new FormData(form);
      const res = await fetch(`${API_URL}/api/tourists/register`, { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message);

      const tourist = data.tourist || data;
      const id = tourist._id || tourist.id;
      saveJSON("tourist", tourist);
      saveJSON("touristId", id);

      alert("✅ Registered successfully.");
      window.location.href = "journey.html";
    } catch (err) {
      console.error("Register error", err);
      alert("Registration failed: " + err.message);
    } finally {
      form.querySelector('button[type="submit"]').disabled = false;
    }
  });
}


function initJourneyPage() {
  const id = loadJSON("touristId");
  if (!id) {
    alert("No registered tourist found. Please register first.");
    window.location.href = "index.html";
    return;
  }

  async function loadAndRender() {
  try {
    const res = await apiRequest(`/api/tourists/${id}`);
    const t = res.tourist || res;   

    const set = (elId, val) => {
      const el = document.getElementById(elId);
      if (el) el.textContent = val || "";
    };

    set("touristName", t.name);
    set("touristEmail", t.email);
    set("touristPhone", t.phone);
    set("touristStart", t.startDate ? new Date(t.startDate).toLocaleDateString() : "");
    set("touristEnd", t.endDate ? new Date(t.endDate).toLocaleDateString() : "");
  } catch (err) {
    console.error("Error loading tourist:", err);
    alert("Failed to load tourist data.");
  }
}

  loadAndRender();

  const startBtn = document.getElementById("startJourneyBtn");
  startBtn?.addEventListener("click", async () => {
  if (!confirm("Start your journey now? This will write to the blockchain.")) return;
  startBtn.disabled = true;
  try {
    const payload = await apiRequest(`/api/tourists/${id}/startJourney`, { method: "POST" });
    const tx = payload.txHash || payload.tx;


    document.getElementById("txHash").textContent = tx || "—";

   
    const t = await apiRequest(`/api/tourists/${id}`);
    document.getElementById("validUntil").textContent =
      t.endDate ? new Date(t.endDate).toLocaleDateString() : "";

    document.getElementById("journeyResponse").style.display = "block";

    alert("Journey started — txHash: " + (tx || "unknown"));
  } catch (err) {
    console.error("Start journey failed:", err);
    alert("Could not start journey: " + err.message);
  } finally {
    startBtn.disabled = false;
  }
});

}


function initPanicPage() {
  const panicBtn = document.getElementById("panicBtn");
  if (!panicBtn) return;

  panicBtn.addEventListener("click", async () => {
    const msg = (document.getElementById("panicMessage")?.value || "").trim();
    panicBtn.disabled = true;
    panicBtn.textContent = "Sending...";

    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      panicBtn.disabled = false; panicBtn.textContent = "🚨 SEND PANIC ALERT";
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const payload = {
        touristId: loadJSON("touristId"),
        message: msg,
        location: { lat: pos.coords.latitude, lon: pos.coords.longitude }
      };
      try {
        const data = await apiRequest(`/api/panic`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        alert("Panic sent: " + (data.status || "ok"));
      } catch (err) {
        alert("Failed to send panic: " + err.message);
      } finally {
        panicBtn.disabled = false;
        panicBtn.textContent = "🚨 SEND PANIC ALERT";
      }
    }, (err) => {
      alert("Location error: " + err.message);
      panicBtn.disabled = false;
      panicBtn.textContent = "🚨 SEND PANIC ALERT";
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  log("Page:", page);
  if (page === "register") initRegisterPage();
  if (page === "journey") initJourneyPage();
  if (page === "panic") initPanicPage();
});
