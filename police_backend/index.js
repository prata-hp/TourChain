const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { initializeSocket } = require('./services/socketService');

dotenv.config();

const app = express();
const server = http.createServer(app);

connectDB();

// --- FIX: Define a single CORS policy ---
// In production, you would change the origin to your frontend's actual URL
// For example: const allowedOrigins = ['https://your-admin-dashboard.com'];
const allowedOrigins = ['*']; 

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins[0] === '*' || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        callback(new Error('Not allowed by CORS'));
    },
    methods: ["GET", "POST"]
};

// --- Initialize Socket.IO with the shared options ---
const io = new Server(server, {
    cors: corsOptions
});
initializeSocket(io);

// --- Middleware ---
// Use the shared CORS options for your Express routes as well
app.use(cors(corsOptions));
app.use(express.json());

// --- ROUTES ---
app.use('/api/officers', require('./routes/officerRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// --- START SERVER ---
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`🚀 Police Backend and Real-time Server running on port ${PORT}`));