Perfect 👍 Let’s create a **`docs/INSTALLATION.md`** that your team can use as a **step-by-step copy-paste guide**.
This keeps your main `README.md` clean while giving developers a quick reference.

---

# 📖 docs/INSTALLATION.md

````markdown
# 🛠 Installation Guide for TourChain

Follow these steps to set up the project on your local machine.  

---

## 1. Install Prerequisites (Global)

### Node.js & npm
Download and install **Node.js (>=16)** from:  
👉 https://nodejs.org  

Verify:
```bash
node -v
npm -v
````

### MongoDB

Install **MongoDB Community Edition** from:
👉 [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

Start MongoDB service:

```bash
# macOS/Linux
sudo systemctl start mongod

# Windows
MongoDB runs automatically as a service
```

Verify:

```bash
mongo --version
```

### Git

```bash
git --version
```

---

## 2. Clone Repository

```bash
git clone <repo-url>
cd TourChain
```

---

## 3. Backend Setup

```bash
cd backend

# copy env template
cp .env.example .env

# install dependencies
npm install

# run server
npm start
```

For development (auto-reload with nodemon):

```bash
npm run dev
```

---

## 4. Frontend Setup

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

## 5. Hardhat (Blockchain)

Hardhat is already listed in `backend/package.json`.

Install:

```bash
cd backend
npm install --save-dev hardhat
```

Initialize Hardhat (first time only):

```bash
npx hardhat
```

Common commands:

```bash
npx hardhat compile            # compile smart contracts
npx hardhat test               # run tests
npx hardhat run scripts/deploy.js --network sepolia  # deploy contract
```

---

## 6. Environment Variables

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

✅ Now you are ready to run **TourChain** locally!

````

---

👉 Suggestion: In `README.md`, just add a link like:  

```markdown
📖 [Installation Guide](docs/INSTALLATION.md)
````

---

Do you also want me to prepare a **docs/COMMANDS.md** file (only Git/Node/Hardhat/npm commands in one place), so team members don’t keep asking “what was that command again?”
