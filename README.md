<h1 align="center">🌍 TourChain</h1>
<h3 align="center">Smart Tourist Safety & Incident Response System</h3>

<hr/>

<h2>📝 Overview</h2>
<p>
TourChain is a <b>Smart Tourist Safety Monitoring & Incident Response System</b> built for enhancing the security of tourists using <b>AI, Blockchain, IoT, and Geo-Fencing technologies</b>.
It enables authorities to monitor, respond, and protect visitors in real time, while ensuring <b>privacy, transparency, and secure digital identity management</b>.
</p>

<p>
By integrating <b>digital tourist IDs, AI-based anomaly detection, geo-fencing alerts, and panic response systems</b>, TourChain aims to <b>revolutionize travel safety</b> in high-risk and remote areas.
</p>

<hr/>

<h2>🔥 Features</h2>
<ol>
    <li>🆔 <b>Digital Tourist ID</b>: Blockchain-based, tamper-proof digital IDs with KYC and trip details.</li>
    <li>📍 <b>Geo-Fencing Alerts</b>: Real-time notifications when tourists enter unsafe or restricted zones.</li>
    <li>🆘 <b>Panic Button & SOS</b>: Instant live location sharing with police, family, and emergency contacts.</li>
    <li>🤖 <b>AI-Powered Safety Monitoring</b>: Detects unusual travel patterns, sudden drop-offs, or prolonged inactivity.</li>
    <li>📊 <b>Police & Tourism Dashboard</b>: Heatmaps, tourist clusters, ID verification, and automated e-FIR generation.</li>
    <li>⌚ <b>IoT Integration</b>: Optional smart bands for continuous location/health signals in high-risk zones.</li>
    <li>🌐 <b>Multilingual Support</b>: App available in 5+ Indian languages + English, with voice/text emergency access.</li>
    <li>🔒 <b>Data Privacy & Security</b>: End-to-end encryption with blockchain-backed secure records.</li>
</ol>

<!-- Example animated SVG/GIF demo above features -->
<p align="center">
    <img src="assets/demo.gif" alt="TourChain Demo Animation" width="400"/>
</p>

<!-- Example animated badge -->
<p align="center">
    <img src="https://img.shields.io/badge/status-active-brightgreen?style=for-the-badge&logo=appveyor&logoColor=white&labelColor=black&color=green&label=TourChain" alt="Status Badge"/>
</p>

<hr/>

<h2>🛠 Technologies Used</h2>

<h3>Frontend</h3>
<ul>
    <li>🌐 HTML, Tailwind CSS, React.js, Netlify</li>
</ul>

<h3>Backend</h3>
<ul>
    <li>⚙ Node.js, Express.js</li>
    <li>🗄 MongoDB, Mongoose, AWS</li>
    <li>🔑 JSON Web Tokens (JWT), bcrypt.js</li>
    <li>📡 WebSockets (socket.io), MQTT (IoT)</li>
    <li>⛓ Blockchain: Solidity, Hardhat, Ethers.js, Metamask, Ethereum Testnet</li>
</ul>

<h3>AI/ML Engine</h3>
<ul>
    <li>🚀 FastAPI, Pydantic</li>
    <li>📊 Scikit-learn, Numpy, Joblib</li>
    <li>🤖 TensorFlow, LSTM Autoencoder for anomaly detection</li>
    <li>🗺 Geofencing APIs: Google Maps, Mapbox</li>
</ul>

<hr/>

<h2>🚀 Installation</h2>

📋 Copy the code below:
<pre>
# Clone the repository
git clone https://github.com/prata-hp/TourChain.git

# Navigate to the project folder
cd TourChain

# Install dependencies
npm install        # For Node.js backend
pip install -r requirements.txt  # For AI/ML engine

# Start the application
npm start          # For frontend
python backend/server.py  # For AI/ML + API services
</pre>

<hr/>

<h2>🎯 Usage</h2>
<ol>
    <li>🆔 Tourist Registration – Generate a blockchain-secured Digital Tourist ID.</li>
    <li>🗺 Trip Creation – Enter itinerary and checkpoints.</li>
    <li>📍 Geo-Fencing Alerts – Get notified when entering unsafe zones.</li>
    <li>🆘 Emergency SOS – Panic button triggers alerts to police and family.</li>
    <li>📊 Authority Dashboard – Monitor clusters, risk maps, and respond to incidents in real time.</li>
</ol>

<hr/>

<h2>🔐 Security Measures</h2>
<ol>
    <li>⛓ Blockchain-based ID immutability & tamper-proof records.</li>
    <li>🔑 Multi-factor authentication for ID verification.</li>
    <li>🔒 End-to-end encrypted communication.</li>
    <li>🛡 AI anomaly detection for proactive safety monitoring.</li>
</ol>

<hr/>

<h2>📂 File Structure</h2>

📋 Copy the code below:
<pre>
TourChain/
        ├── backend/
        │   ├── ai_engines/
        │   │   ├── __pycache__/
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
</pre>

<hr/>
