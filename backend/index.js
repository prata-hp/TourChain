const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");             // ← for serving static files
const connectDB = require("./config/db");
const logger = require("./utils/logger");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data if needed

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // ← added

// Morgan logs all incoming HTTP requests
app.use(morgan("dev"));

// Routes
app.use("/api/tourists", require("./routes/touristRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api", require("./routes/panicRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.message);
  console.error(err.stack);
  res.status(500).json({ error: "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`🚀 Server running on port ${PORT}`));
