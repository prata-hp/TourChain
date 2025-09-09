
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

Excellent! Since your project also depends on a local blockchain using Hardhat, you need to restart that too after the computer shut down. Below is a complete, step-by-step tutorial covering **MongoDB**, **Backend server**, **Frontend**, and **Blockchain (Hardhat)**.

---

## ✅ **Complete Restart Guide After Shutdown**

---

### 📦 **1. MongoDB – Start Database**

1. Open **PowerShell or Command Prompt as Administrator**.

2. If MongoDB is installed as a service:

   ```bash
   net start MongoDB
   ```

   * If you get an error, start it manually as below.

3. To start manually:

   ```bash
   "C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe" --dbpath "C:\data\db"
   ```

   Replace `<version>` with your version number.

4. In a new terminal, connect to MongoDB to ensure it’s running:

   ```bash
   mongosh
   ```

   If you connect without issues, MongoDB is up.

---

### ⛓ **2. Blockchain (Hardhat) – Start Local Node**

1. Open a terminal.

2. Navigate to your Hardhat project folder:

   ```bash
   cd C:\Users\nilus\Desktop\project\TourChain
   ```

3. Start the Hardhat node:

   ```bash
   npx hardhat node
   ```

   This will start the local blockchain at `http://127.0.0.1:8545` and show funded accounts with private keys.

4. Keep this terminal open while you work.

---

### 📂 **3. Backend Server – Start Express API**

1. Open a **new terminal**.

2. Navigate to the backend folder:

   ```bash
   cd C:\Users\nilus\Desktop\project\TourChain\backend
   ```

3. Install dependencies if needed:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

   or

   ```bash
   npm run dev
   ```

5. Check the logs for:

   ```
   ✅ MongoDB connected
   Server running on port 5000
   ```

---

### 📂 **4. Frontend – Open in Browser**

1. Navigate to the folder containing `sih.html` (maybe in `tourist` folder or elsewhere).

2. Either:

   * Right-click `sih.html` and open with your browser, or
   * Use a development server like `live-server` if installed:

     ```bash
     live-server
     ```

   This should open the browser at `http://127.0.0.1:8080` or another port.

3. Fill in the form and test registration.

---

### ✅ **5. Verify All Connections**

* **Hardhat Node running on port 8545?**
  Check the terminal shows account addresses.

* **Backend connected to MongoDB?**
  Look for `✅ MongoDB connected` in the logs.

* **Frontend making requests to backend?**
  Open the browser console (F12 → Console tab) and check for errors or network requests.

---

### ⚙ **6. Environment Variables Check**

In `backend/.env`, ensure:

```
MONGO_URI=mongodb://127.0.0.1:27017/tourchain
PORT=5000
BLOCKCHAIN_RPC=http://127.0.0.1:8545
PRIVATE_KEY=0x...  # copy from Hardhat node output
CONTRACT_ADDRESS=0x...  # deployed contract address if applicable
ETHERSCAN_API_KEY=  # leave empty if not used
ID_PEPPER=optional-static-pepper
```

---

### 📌 Notes

* Keep MongoDB, Hardhat node, and backend running in separate terminals.
* The frontend doesn’t need installation but must point to the correct backend URL.
* If you restart the computer, Hardhat’s blockchain state will reset unless you configure persistent accounts.

---

### ✅ Summary Workflow

1. ✅ Start MongoDB.
2. ✅ Start the Hardhat node.
3. ✅ Start the backend server.
4. ✅ Open the frontend in the browser.
5. ✅ Fill the form → check the backend logs → check if data is saved in MongoDB.
6. ✅ Ensure Hardhat, backend, and frontend are talking through the correct URLs.

---

