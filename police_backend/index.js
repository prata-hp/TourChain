const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // <-- 1. IMPORT the connectDB function
const { initializeSocket } = require('./services/socketService');

// Load environment variables
dotenv.config();

// --- 1. INITIALIZE APP & DATABASE ---
const app = express();
const server = http.createServer(app);

// --- 2. CONNECT TO DATABASE ---
connectDB(); // <-- 2. CALL the imported function

// --- 3. INITIALIZE SOCKET.IO ---
const io = new Server(server, {
    cors: {
        origin: "*", // In production, restrict this to your dashboard's URL
        methods: ["GET", "POST"]
    }
});
// Start the real-time alert service
initializeSocket(io);

// --- 4. MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- 5. ROUTES ---
app.use('/api/officers', require('./routes/officerRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// --- 6. START SERVER ---
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`🚀 Police Backend and Real-time Server running on port ${PORT}`));