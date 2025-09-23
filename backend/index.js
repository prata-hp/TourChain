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