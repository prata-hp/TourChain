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


app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 


app.use(morgan("dev"));


app.use("/api/tourists", require("./routes/touristRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api", require("./routes/panicRoutes"));


app.use((err, req, res, next) => {
  logger.error(err.message);
  console.error(err.stack);
  res.status(500).json({ error: "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`🚀 Server running on port ${PORT}`));
