# Proyojoniyo notun import
import joblib 
import json

import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, RepeatVector, TimeDistributed
from sklearn.preprocessing import MinMaxScaler
import matplotlib.pyplot as plt
def generate_data(n_samples, timesteps):
    normal_data = []
    for _ in range(n_samples):
        start = np.random.rand(2) * 10
        path = [start + np.sin(np.linspace(0, 4 * np.pi, timesteps) + np.random.rand() * 2 * np.pi)[:, np.newaxis] * [1, 0.5]]
        normal_data.append(path)
    
    anomalous_data = []
    for _ in range(n_samples // 4):
        start = np.random.rand(2) * 10
        path = start + np.sin(np.linspace(0, 4 * np.pi, timesteps))[:, np.newaxis] * [1, 0.5]
        path[timesteps // 2:] += 5
        anomalous_data.append([path])
        
        start = np.random.rand(2) * 10
        path = start + np.sin(np.linspace(0, 2 * np.pi, timesteps))[:, np.newaxis] * [1, 0.5]
        path[timesteps // 2:] = path[timesteps // 2]
        anomalous_data.append([path])

    return np.vstack(normal_data), np.vstack(anomalous_data)

TIMESTEPS = 20
FEATURES = 2
train_data, anomaly_data = generate_data(1000, TIMESTEPS)
scaler = MinMaxScaler()
train_data_scaled = scaler.fit_transform(train_data.reshape(-1, FEATURES)).reshape(-1, TIMESTEPS, FEATURES)

model = Sequential([
    LSTM(64, activation='relu', input_shape=(TIMESTEPS, FEATURES), return_sequences=False),
    RepeatVector(TIMESTEPS),
    LSTM(64, activation='relu', return_sequences=True),
    TimeDistributed(Dense(FEATURES))
])
model.compile(optimizer='adam', loss='mae')

print("Starting model training...")
history = model.fit(train_data_scaled, train_data_scaled, epochs=20, batch_size=32, validation_split=0.1, verbose=1)
print("Model training finished.")

model.save('tourist_anomaly_model.h5')
print("✅ Model saved to 'tourist_anomaly_model.h5'")

joblib.dump(scaler, 'scaler.gz')
print("✅ Scaler saved to 'scaler.gz'")

train_reconstructions = model.predict(train_data_scaled)
train_loss = tf.keras.losses.mae(train_reconstructions, train_data_scaled)
threshold = np.mean(train_loss) + 2 * np.std(train_loss)
with open('threshold.json', 'w') as f:
    json.dump({'threshold': threshold}, f)
print(f"✅ Threshold ({threshold:.4f}) saved to 'threshold.json'")