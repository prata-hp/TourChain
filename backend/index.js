const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./config/db"); 
const logger = require("./utils/logger");   

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/itineraries", require("./routes/itineraryRoutes"));
app.use("/api/journeys", require("./routes/journeyRoutes"));
app.use("/api/verify", require("./routes/verifyRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.post("/api/panic", async (req, res) => {
    try {
        const panicData = req.body;
        console.log("🚨 PANIC ALERT RECEIVED:", {
            timestamp: panicData.timestamp,
            userName: panicData.userName,
            phone: panicData.phone,
            location: panicData.location,
            hasActiveJourney: !!panicData.activeJourney
        });
        try {
            const PanicCall = require('./models/PanicCall');
            const panicCall = new PanicCall({
                userId: panicData.userId || null,
                journeyId: panicData.activeJourney?._id || null,
                location: panicData.location || { lat: null, lng: null },
                type: 'Emergency',
                additionalData: {
                    userName: panicData.userName,
                    phone: panicData.phone,
                    emergencyContacts: panicData.emergencyContacts,
                    deviceInfo: panicData.deviceInfo
                }
            });
            await panicCall.save();
            console.log("✅ Panic event saved to database");
        } catch (dbError) {
            console.error("❌ Database save failed:", dbError.message);
        }
        res.status(200).json({ 
            message: 'Emergency alert received and processed',
            timestamp: new Date().toISOString(),
            alertId: Date.now()
        });
        
    } catch (error) {
        console.error("❌ Panic endpoint error:", error);
        res.status(200).json({ 
            message: 'Emergency alert received',
            timestamp: new Date().toISOString()
        });
    }
});
app.use((err, req, res, next) => {
  logger.error(err.message);
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
     message: err.message,
     stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`🚀 Server running on port ${PORT}`)); 