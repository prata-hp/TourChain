⚙️ Setup Instructions (to put in README.md)
Prerequisites

Node.js >=16

npm

MongoDB (local or Atlas)

Hardhat

Steps
# clone repo
git clone <repo-url>
cd TourChain

# backend setup
cd backend
cp .env.example .env
npm install

# frontend setup
cd ../frontend
cp .env.example .env
npm install

📅 Day-Wise Breakdown
Day	Task
Day 1	Create repo, push skeleton (TourChain/), add .env.example.
Day 2	Backend: setup index.js (Express server), connect MongoDB.
Day 3	Frontend: scaffold tourist/ and admin/ with Vite/React.
Day 4	Backend: add routes/models (auth, tourists, bookings).
Day 5	Blockchain: init Hardhat, deploy sample contract.
Day 6	Seed data + integrate contract with backend.
Day 7	End-to-end test (tourist UI → backend → blockchain → DB).
