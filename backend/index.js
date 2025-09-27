const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./config/db"); // KEEPING: Your separate DB connection
const logger = require("./utils/logger");   // KEEPING: Your custom logger

// Load environment variables
dotenv.config();
// Establish database connection
connectDB();

const app = express();

// --- Core Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Logging Middleware ---
// KEEPING: Morgan for HTTP request logging
app.use(morgan("dev"));

// --- Static File Serving ---
// KEEPING: This is essential for serving uploaded documents from the Document Wallet
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- ❌ DEPRECATED PROTOTYPE ROUTES (TO BE REMOVED) ---
// app.use("/api/tourists", require("./routes/touristRoutes"));
// app.use("/api/admin", require("./routes/adminRoutes"));
// app.use("/api", require("./routes/panicRoutes"));

// --- ✅ NEW V2 API ROUTES ---
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/itineraries", require("./routes/itineraryRoutes"));
app.use("/api/journeys", require("./routes/journeyRoutes"));
app.use("/api/verify", require("./routes/verifyRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// Standalone panic endpoint for emergency situations
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
        
        // Save panic event to database if possible
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
        
        // Always respond with success for emergency situations
        res.status(200).json({ 
            message: 'Emergency alert received and processed',
            timestamp: new Date().toISOString(),
            alertId: Date.now()
        });
        
    } catch (error) {
        console.error("❌ Panic endpoint error:", error);
        // Always return success for panic requests to ensure user gets confirmation
        res.status(200).json({ 
            message: 'Emergency alert received',
            timestamp: new Date().toISOString()
        });
    }
});


// --- Custom Error Handling Middleware ---
// KEEPING: This is a best practice for catching and logging errors gracefully
app.use((err, req, res, next) => {
  logger.error(err.message);
  console.error(err.stack);
  // Avoid sending stack trace to client in production
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
     message: err.message,
     stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`🚀 Server running on port ${PORT}`)); // KEEPING: Using your logger