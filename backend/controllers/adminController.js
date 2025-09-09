const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");   // <-- added logger

// Register new admin
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ name, email, password: hashed });

    logger.info(`✅ Admin registered: id=${admin._id}, email=${admin.email}`);
    res.status(201).json({ id: admin._id, email: admin.email });
  } catch (err) {
    logger.error(`❌ Admin registration failed: ${err.message}`);
    res.status(500).json({ error: "Server error during admin registration" });
  }
};

// Admin login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      logger.warn(`⚠️ Login failed - admin not found: email=${email}`);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      logger.warn(`⚠️ Login failed - invalid password for email=${email}`);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    logger.info(`🔑 Admin logged in: id=${admin._id}, email=${admin.email}`);
    res.json({ token });
  } catch (err) {
    logger.error(`❌ Admin login error: ${err.message}`);
    res.status(500).json({ error: "Server error during login" });
  }
};

