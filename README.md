🌍 TourChain – Smart Tourist Safety & Incident Response System


📝 Overview

TourChain is a Smart Tourist Safety Monitoring & Incident Response System built for enhancing the security of tourists using AI, Blockchain, IoT, and Geo-Fencing technologies.
It enables authorities to monitor, respond, and protect visitors in real time, while ensuring privacy, transparency, and secure digital identity management.

By integrating digital tourist IDs, AI-based anomaly detection, geo-fencing alerts, and panic response systems, TourChain aims to revolutionize travel safety in high-risk and remote areas.



🔥 Features

1. 🆔 Digital Tourist ID: Blockchain-based, tamper-proof digital IDs with KYC and trip details.

2. 📍 Geo-Fencing Alerts: Real-time notifications when tourists enter unsafe or restricted zones.

3. 🆘 Panic Button & SOS: Instant live location sharing with police, family, and emergency contacts.

4. 🤖 AI-Powered Safety Monitoring: Detects unusual travel patterns, sudden drop-offs, or prolonged inactivity.

5. 📊 Police & Tourism Dashboard: Heatmaps, tourist clusters, ID verification, and automated e-FIR generation.

6. ⌚ IoT Integration: Optional smart bands for continuous location/health signals in high-risk zones.

7. 🌐 Multilingual Support: App available in 10+ Indian languages + English, with voice/text emergency access.

8. 🔒 Data Privacy & Security: End-to-end encryption with blockchain-backed secure records.


🛠 Technologies Used

Frontend

1. 🌐 HTML, Tailwind CSS, React.js, Netlify

Backend

1. ⚙️ Node.js, Express.js

2. 🗄 MongoDB, Mongoose, AWS

3. 🔑 JSON Web Tokens (JWT), bcrypt.js

4. 📡 WebSockets (socket.io), MQTT (IoT)

5. ⛓ Blockchain: Solidity, Hardhat, Ethers.js, Metamask, Ethereum Testnet

AI/ML Engine

1. 🚀 FastAPI, Pydantic

2. 📊 Scikit-learn, Numpy, Joblib

3. 🤖 TensorFlow, LSTM Autoencoder for anomaly detection

4. 🗺 Geofencing APIs: Google Maps, Mapbox



🚀 Installation

Clone the repository:

git clone https://github.com/prata-hp/TourChain.git


Navigate to the project folder:

cd TourChain


Install dependencies:

npm install        # For Node.js backend
pip install -r requirements.txt  # For AI/ML engine


Start the application:

npm start          # For frontend
python backend/server.py  # For AI/ML + API services



🎯 Usage

1. 🆔 Tourist Registration – Generate a blockchain-secured Digital Tourist ID.

2. 🗺 Trip Creation – Enter itinerary and checkpoints.

3. 📍 Geo-Fencing Alerts – Get notified when entering unsafe zones.

4. 🆘 Emergency SOS – Panic button triggers alerts to police and family.

5. 📊 Authority Dashboard – Monitor clusters, risk maps, and respond to incidents in real time.


🔐 Security Measures

1. ⛓ Blockchain-based ID immutability & tamper-proof records.

2. 🔑 Multi-factor authentication for ID verification.

3. 🔒 End-to-end encrypted communication.

4. 🛡 AI anomaly detection for proactive safety monitoring.


📂 File Structure

TourChain/
    ├── backend/
    │   ├── ai_engines/
    │   │   ├── _pycache_/
    │   │   ├── anomaly_detector.py
    │   │   ├── main.py
    │   │   ├── requirements.txt
    │   │   ├── scaler.gz
    │   │   ├── threshold.json
    │   │   └── tourist_anomaly_model.h5
    │   │
    │   ├── config/
    │   │   └── db.js
    │   │
    │   ├── contracts/
    │   │   └── TourChainLedger.sol
    │   │
    │   ├── controllers/
    │   │   ├── adminController.js
    │   │   ├── authController.js
    │   │   ├── itineraryController.js
    │   │   ├── journeyController.js
    │   │   ├── profileController.js
    │   │   ├── touristController.js
    │   │   └── verifyController.js
    │   │
    │   ├── logs/
    │   │   ├── combined.log
    │   │   └── error.log
    │   │
    │   ├── middlewares/
    │   │   ├── authMiddleware.js
    │   │   └── validate.js
    │   │
    │   ├── models/
    │   │   ├── ActiveJourney.js
    │   │   ├── EFirReport.js
    │   │   ├── ItineraryDraft.js
    │   │   ├── LocationHistory.js
    │   │   ├── PanicCall.js
    │   │   ├── Profile.js
    │   │   ├── User.js
    │   │   └── VerificationLog.js
    │   │
    │   ├── routes/
    │   │   ├── adminRoutes.js
    │   │   ├── authRoutes.js
    │   │   ├── itineraryRoutes.js
    │   │   ├── journeyRoutes.js
    │   │   ├── profileRoutes.js
    │   │   └── verifyRoutes.js
    │   │
    │   ├── scripts/
    │   │   ├── deploy.js
    │   │   └── seed.js
    │   │
    │   ├── services/
    │   │   ├── aiIntegrationService.js
    │   │   ├── blockchainService.js
    │   │   ├── efirService.js
    │   │   └── qrService.js
    │   │
    │   ├── tests/
    │   │   ├── seed.js
    │   │   ├── testAICheckin.js
    │   │   ├── testSafetyScore.js
    │   │   └── testV2Journey.js
    │   │
    │   ├── uploads/
    │   │   ├── (various .png and .jpg files)
    │   │
    │   ├── utils/
    │   │
    │   ├── .env.example
    │   ├── hardhat.config.js
    │   ├── index.js
    │   ├── package-lock.json
    │   └── package.json
    │
    ├── frontend/
    │   ├── admin/
    │   │   ├── config.js
    │   │   └── index.html
    │   │
    │   ├── tourist/
    │   │   ├── config.js
    │   │   └── index.html
    │   │
    │   └── .env.example
    │
    ├── police_backend/
    │   ├── config/
    │   │   └── db.js
    │   │
    │   ├── controllers/
    │   │   ├── adminController.js
    │   │   └── officerController.js
    │   │
    │   ├── middlewares/
    │   │   └── authMiddleware.js
    │   │
    │   ├── models/
    │   │   ├── ActiveJourney.js
    │   │   ├── EFirReport.js
    │   │   ├── ItineraryDraft.js
    │   │   ├── LocationHistory.js
    │   │   ├── Officer.js
    │   │   ├── PanicCall.js
    │   │   ├── Profile.js
    │   │   ├── User.js
    │   │   └── VerificationLog.js
    │   │
    │   ├── routes/
    │   │   ├── adminRoutes.js
    │   │   └── officerRoutes.js
    │   │
    │   ├── scripts/
    │   │   └── seed.js
    │   │
    │   ├── services/
    │   │   └── socketService.js
    │   │
    │   ├── .env.example
    │   ├── index.js
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── .gitignore
    │   ├── README.md
    │   └── start_admin.sh
    │
    ├── .gitignore
    └── package-lock.json
