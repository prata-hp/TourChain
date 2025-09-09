Here’s a beautifully structured **Installation.md** for your TourChain project. It’s written clearly, with headings, code blocks, and checklists to make onboarding smooth.

---

```markdown
# 🚀 TourChain – Installation Guide

Welcome to **TourChain**, a decentralized tourism tracking system built with **Node.js**, **MongoDB**, **Hardhat**, and **Ethers.js**. This document walks you through setting up the project from scratch after cloning or restarting your machine.

---

## 📂 Folder Structure

```

TourChain/
├── backend/          # Node.js backend (Express + MongoDB)
├── contracts/        # Solidity smart contracts
├── scripts/          # Deployment and test scripts
├── tourist/          # Frontend (HTML, CSS, JS)
└── .env files        # Configuration files

````

---

## ✅ Prerequisites

Make sure you have the following installed:

✔ [Node.js (v18 or later)](https://nodejs.org/)  
✔ [npm](https://www.npmjs.com/get-npm)  
✔ [MongoDB](https://www.mongodb.com/try/download/community)  
✔ [Git](https://git-scm.com/downloads)  
✔ [Hardhat](https://hardhat.org/getting-started/) (will be installed locally)  
✔ A modern web browser (Chrome, Firefox)

---

## 📥 Step 1 – Clone the Repository

```bash
git clone https://github.com/your-username/TourChain.git
cd TourChain
````

---

## 📦 Step 2 – Setup MongoDB

1. Create the database directory (if not already):

   ```bash
   mkdir C:\data\db
   ```

2. Start MongoDB:

   ```bash
   "C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe" --dbpath "C:\data\db"
   ```

   Replace `<version>` with your MongoDB version folder.

3. Open `mongosh` in a new terminal to check the connection:

   ```bash
   mongosh
   ```

---

## ⛓ Step 3 – Start the Hardhat Node

1. Open a new terminal.
2. Navigate to the project folder:

   ```bash
   cd C:\Users\nilus\Desktop\project\TourChain
   ```
3. Start the local blockchain:

   ```bash
   npx hardhat node
   ```
4. Copy one of the **private keys** and **account addresses** from the terminal output for `.env` configuration.

Keep this terminal open while developing.

---

## 🟠 Step 4 – Configure Environment Variables

Create a file at `backend/.env` with the following:

```env
MONGO_URI=mongodb://127.0.0.1:27017/tourchain
PORT=5000

BLOCKCHAIN_RPC=http://127.0.0.1:8545
PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE
CONTRACT_ADDRESS=0xYOUR_CONTRACT_ADDRESS_HERE
ETHERSCAN_API_KEY=
ID_PEPPER=optional-static-pepper
```

Also create a `.env.example` (without actual secrets):

```env
MONGO_URI=mongodb://127.0.0.1:27017/tourchain
PORT=5000

BLOCKCHAIN_RPC=http://127.0.0.1:8545
PRIVATE_KEY=0x...
CONTRACT_ADDRESS=0x...
ETHERSCAN_API_KEY=
ID_PEPPER=
```

---

## 📂 Step 5 – Setup Backend

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the server:

   ```bash
   npm start
   ```

   or for development:

   ```bash
   npm run dev
   ```

Check the terminal logs for:

```
✅ MongoDB connected
Server running on port 5000
```

---

## 🌐 Step 6 – Run the Frontend

1. Navigate to the folder where `sih.html` is located.
2. Open `sih.html` with a browser by double-clicking or right-click → Open With → Chrome.
3. Alternatively, if you have `live-server` installed:

   ```bash
   live-server
   ```

You should now see the registration form.

---

## ✅ Step 7 – Verify Everything Works

✔ Fill the registration form → Submit → Check if MongoDB stores the tourist data
✔ Check backend logs for registration events
✔ Start journey and panic features should function
✔ Transactions should be sent to the Hardhat node

---

## 🧱 Notes

* Keep MongoDB, Hardhat node, and backend running in separate terminals.
* Use the correct `PRIVATE_KEY` and `CONTRACT_ADDRESS` from the Hardhat output.
* The frontend communicates with the backend via relative URLs like `/api/tourists/register`.
* All errors will be visible in the backend terminal and browser console.

---

## 🎯 Next Steps

✔ Implement further features
✔ Deploy contracts to testnet/mainnet
✔ Improve UI/UX
✔ Add authentication and validation

---

Made with ❤️ by the TourChain team

```

Let me know if you want it styled with badges, links, or diagrams as well. This format is ready to be added to your GitHub or shared with your team! 📂✅⛓️🌐
```
