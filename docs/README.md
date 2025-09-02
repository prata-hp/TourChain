Got it 🚀 Let’s prepare a clean **README.md** for your `TourChain/` repo.
It will explain the **folder structure, installations, and all basic commands** so your team can get started without confusion.

---

# 📖 README.md (Starter)

```markdown
# TourChain

TourChain is a blockchain + web application for managing tourist and admin operations.  
This repo contains both **backend (Node.js, MongoDB, Hardhat)** and **frontend (React, Vite)** projects.

---

## 📂 Folder Structure

```

TourChain/
│── backend/         # Express + MongoDB + Hardhat
│   ├── index.js
│   ├── routes/
│   ├── models/
│   ├── utils/
│   ├── seed/
│   ├── package.json
│   ├── hardhat.config.js
│   └── .env.example
│
│── frontend/        # React + Vite
│   ├── tourist/
│   ├── admin/
│   ├── package.json
│   └── .env.example
│
│── docs/
│   └── README.md
│
└── README.md        # (this file)

````

---

## ⚙️ Prerequisites (Install once globally)

- **Node.js >= 16** → [Download](https://nodejs.org)  
- **npm** (comes with Node)  
- **MongoDB** → [Download](https://www.mongodb.com/try/download/community)  
- **Git**  

Verify installation:
```bash
node -v
npm -v
mongo --version
git --version
````

---

## 🛠 Setup Instructions

### 1. Clone the Repo

```bash
git clone <repo-url>
cd TourChain
```

### 2. Backend Setup

```bash
cd backend

# copy env template
cp .env.example .env

# install dependencies
npm install

# run server
npm start
```

For development with auto-reload:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend

# copy env template
cp .env.example .env

# install dependencies
npm install

# run frontend
npm run dev
```

---

## ⛓ Hardhat (Blockchain)

Install Hardhat (already in backend `package.json`):

```bash
cd backend
npm install --save-dev hardhat
```

Run Hardhat commands:

```bash
# compile contracts
npx hardhat compile

# run tests
npx hardhat test

# deploy contract
npx hardhat run scripts/deploy.js --network sepolia
```

---

## 📦 Useful Commands

### Backend

```bash
npm start        # run server
npm run dev      # run server with nodemon (auto-restart)
```

### Frontend

```bash
npm run dev      # run development server
npm run build    # build production files
npm run preview  # preview production build
```

### Git

```bash
git status
git add .
git commit -m "message"
git push origin main
```

---

## 🔑 Environment Variables

Fill these before running:

### backend/.env

```
PORT=4000
MONGO_URI=mongodb://localhost:27017/tourchain
JWT_SECRET=your-secret-key
PRIVATE_KEY=your-wallet-private-key
RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
CONTRACT_ADDRESS=0xYourContractAddressHere
```

### frontend/.env

```
VITE_API_URL=http://localhost:4000
VITE_CONTRACT_ADDRESS=0xYourContractAddressHere
```

---

## 🗓 Suggested Timeline

| Day   | Task                              |
| ----- | --------------------------------- |
| Day 1 | Repo setup + env config           |
| Day 2 | Backend server + MongoDB connect  |
| Day 3 | Frontend scaffold (tourist/admin) |
| Day 4 | Routes + Models                   |
| Day 5 | Hardhat setup + contract deploy   |
| Day 6 | Seed + Integration                |
| Day 7 | End-to-end testing                |

---

```

---

👉 Do you want me to also create a **docs/INSTALLATION.md** with just the installation commands (copy-paste friendly), so the main README stays clean?
```
