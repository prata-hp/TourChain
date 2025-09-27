# main.py

import datetime
import json
from typing import List, Tuple

import joblib
import numpy as np
import tensorflow as tf
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# ... (App initialization and model loading code remains the same) ...
# --- App Initialization ---
app = FastAPI(
    title="Tourist Safety API",
    description="API for Safety Score and Anomaly Detection."
)

# --- Anomaly Detection Model Loading ---
# --- Anomaly Detection Model Loading ---
try:
    # --- THIS IS THE FIX ---
    # Add compile=False to load the model for prediction purposes only.
    MODEL = tf.keras.models.load_model("tourist_anomaly_model.h5", compile=False)
    
    SCALER = joblib.load("scaler.gz")
    with open("threshold.json", 'r') as f:
        THRESHOLD = json.load(f)['threshold']
    print("✅ Anomaly detection model and helpers loaded successfully.")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    MODEL, SCALER, THRESHOLD = None, None, None

# --- Pydantic Models for Data Validation ---
class TouristData(BaseModel):
    current_area: str
    deviation_km: float
    inactivity_minutes: int
    current_hour: int | None = None

class LocationSequence(BaseModel):
    locations: List[Tuple[float, float]]

# --- API Endpoints ---
@app.get("/")
def read_root():
    return {"status": "Tourist Safety API is running!"}


# --- NEW, IMPLEMENTED Safety Score Endpoint ---
@app.post("/calculate-score/")
def get_safety_score(data: TouristData):
    """
    Calculates a safety score based on contextual risk factors.
    Starts with a base score of 10 and deducts points for risks.
    """
    base_score = 10.0
    risk_factors = []

    # --- Risk Factor 1: Time of Day ---
    # If current_hour is not provided, use the server's current hour.
    hour = data.current_hour if data.current_hour is not None else datetime.datetime.now().hour
    if hour < 6 or hour > 22: # Late night / early morning
        base_score -= 2.0
        risk_factors.append("Late-night activity")

    # --- Risk Factor 2: Inactivity ---
    if data.inactivity_minutes > 30:
        # Penalize inactivity more during late hours
        inactivity_penalty = (data.inactivity_minutes / 30) * (1.5 if (hour < 6 or hour > 22) else 1.0)
        base_score -= inactivity_penalty
        risk_factors.append(f"High inactivity ({data.inactivity_minutes} mins)")

    # --- Risk Factor 3: Deviation from Route ---
    if data.deviation_km > 1.0:
        deviation_penalty = data.deviation_km * 0.5
        base_score -= deviation_penalty
        risk_factors.append(f"Route deviation ({data.deviation_km} km)")
    
    # --- Risk Factor 4: Area Risk (Simulated) ---
    # In a real system, you might look this up in a database.
    area_risk_scores = {
        "park_street": 0,       # Safe area
        "victoria_memorial": 0, # Safe area
        "howrah_station_area": -1, # Moderately risky at night
        "unlit_alley": -3         # High risk
    }
    area_penalty = area_risk_scores.get(data.current_area.lower().replace(" ", "_"), -0.5) # Default penalty for unknown areas
    if area_penalty < 0:
        base_score -= abs(area_penalty)
        risk_factors.append(f"Entered a potentially unsafe area: {data.current_area}")


    # Ensure the score does not go below 0
    final_score = max(0, round(base_score, 2))

    return {
        "safety_score": final_score,
        "risk_factors": risk_factors
    }


# --- Anomaly Detection Endpoint (remains the same) ---
@app.post("/detect-anomaly/")
def detect_anomaly(sequence: LocationSequence):
    # ... (code remains the same)
    if not all([MODEL, SCALER, THRESHOLD]):
         raise HTTPException(status_code=500, detail="Model not loaded. Please check server logs.")

    if len(sequence.locations) != 20:
        raise HTTPException(status_code=400, detail="Input must contain exactly 20 location points.")

    try:
        tourist_path = np.array(sequence.locations).reshape(1, 20, 2)
        tourist_path_scaled = SCALER.transform(tourist_path.reshape(-1, 2)).reshape(1, 20, 2)
        reconstruction = MODEL.predict(tourist_path_scaled)
        loss = np.mean(tf.keras.losses.mae(reconstruction, tourist_path_scaled))
        is_anomaly = loss > THRESHOLD

        return {
            "is_anomaly": bool(is_anomaly),
            "reconstruction_loss": float(loss),
            "threshold": float(THRESHOLD)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred during prediction: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)