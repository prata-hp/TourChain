Alright 🚀
Let’s turn the **Final Master Prompt** into a **full-fledged `README.md`** for your repo.

I’ll include **setup instructions, folder breakdowns, run commands, and API testing examples** so that **any teammate can clone & run the project without asking you**.

---

# 📘 TourChain – README.md

Prototype submission for **Smart India Hackathon**
Secure Tourist Journey Tracking using **DB + Blockchain + AI**

---

## 🔹 Project Overview

**TourChain** is a system that:

* Registers tourists with Aadhaar/Passport.
* Generates an **AI Safety Score** for their itinerary.
* Allows tourists to **Start Journey** → proof stored on Blockchain (valid until End Date).
* Provides **Panic button** for emergencies.
* Admin Dashboard to:

  * Login securely (JWT).
  * View tourists & journeys.
  * Monitor panic alerts.

---

## 🔹 Repo Structure

```
Root: TourChain/
  ├── backend/
  │     ├── contracts/          # Solidity contracts (TouristRegistry.sol etc.)
  │     ├── scripts/            # Hardhat deploy scripts
  │     ├── models/             # Mongoose schemas
  │     ├── controllers/        # Express business logic
  │     ├── routes/             # API routes
  │     ├── middlewares/        # JWT auth, validation
  │     ├── utils/              # blockchain.js, helpers
  │     ├── seed/               # seed admin users
  │     ├── index.js            # entry point
  │     └── .env.example
  ├── frontend/
  │     ├── tourist/            # Tourist UI (Sambhas)
  │     └── admin/              # Admin Dashboard (Shreya)
  └── README.md
```

---

## 🔹 Tech Stack

* **Backend**: Node.js, Express, MongoDB, JWT, Mongoose
* **Blockchain**: Solidity, Hardhat, ethers.js
* **Frontend**: React + Tailwind (Vite)
* **AI Safety Score**: OpenAI API (mocked in prototype)

---

## 🔹 Setup Instructions

### 1️⃣ Clone Repo

```bash
git clone https://github.com/<your-org>/TourChain.git
cd TourChain
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Copy `.env.example` → `.env` and fill values:

```
MONGO_URI=mongodb://localhost:27017/tourchain
JWT_SECRET=supersecret
BLOCKCHAIN_RPC=https://sepolia.infura.io/v3/<your-id>
PRIVATE_KEY=0xabc123...
AI_API_KEY=sk-xxxx
```

Run backend:

```bash
npm run dev
```

Server → `http://localhost:5000/api`

---

### 3️⃣ Blockchain (Hardhat)

```bash
cd backend
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.js --network sepolia
```

Update deployed contract address in `backend/utils/blockchain.js`.

---

### 4️⃣ Frontend Setup

#### Tourist Frontend (Sambhas)

```bash
cd frontend/tourist
npm install
npm run dev
```

Runs on → `http://localhost:5173`

#### Admin Frontend (Shreya)

```bash
cd frontend/admin
npm install
npm run dev
```

Runs on → `http://localhost:5174`

---

## 🔹 Frontend Structure

### Tourist (Sambhas)

```
frontend/tourist/
  ├── pages/
  │     ├── Register.jsx   # Tourist registration form
  │     ├── StartJourney.jsx # Button to trigger blockchain write
  │     └── Panic.jsx      # Panic button UI
  ├── components/
  │     ├── FormInput.jsx
  │     └── PlaceInput.jsx   # +Add place for itinerary
```

### Admin (Shreya)

```
frontend/admin/
  ├── pages/
  │     ├── Login.jsx
  │     ├── Tourists.jsx      # List tourists
  │     ├── TouristDetails.jsx
  │     ├── PanicList.jsx
  │     └── Dashboard.jsx
  ├── components/
  │     ├── NavBar.jsx
  │     └── StatsCard.jsx
```

---

## 🔹 API Testing (Postman / curl)

### Register Tourist

```bash
curl -X POST http://localhost:5000/api/tourists/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Alice",
    "email":"alice@mail.com",
    "phone":"+91xxxx",
    "idType":"Passport",
    "idNumber":"P123456",
    "itinerary":["Delhi","Agra","Jaipur"],
    "startDate":"2025-09-10",
    "endDate":"2025-09-20"
  }'
```

---

### Start Journey (Blockchain write)

```bash
curl -X POST http://localhost:5000/api/tourists/<id>/startJourney
```

---

### Panic Button

```bash
curl -X POST http://localhost:5000/api/panic \
  -H "Content-Type: application/json" \
  -d '{
    "touristId":"64f123...",
    "location":{"lat":28.61,"lon":77.23},
    "message":"Lost near Red Fort"
  }'
```

---

### Admin Login

```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"shreya@tourchain.gov","password":"mypassword"}'
```

---

## 🔹 Round-1 Prototype Rules

* **DB** = main source of data
* **Blockchain** = only journey proof `{idHash, startDate, endDate}`
* **AI** = backend triggered, stores safety score
* **No sockets** → polling only
* **Checkpoints postponed**

---

