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


const allowedOrigins = ['*']; 

const corsOptions = {
    origin: (origin, callback) => {
        
        if (!origin) return callback(null, true);
        if (allowedOrigins[0] === '*' || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        callback(new Error('Not allowed by CORS'));
    },
    methods: ["GET", "POST"]
};


const io = new Server(server, {
    cors: corsOptions
});
initializeSocket(io);


app.use(cors(corsOptions));
app.use(express.json());


app.use('/api/officers', require('./routes/officerRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));


const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`🚀 Police Backend and Real-time Server running on port ${PORT}`));
