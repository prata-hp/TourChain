const Tourist = require("../models/Tourist");
const VerificationLog = require("../models/VerificationLog");
const { hashIdNumber } = require("../utils/hash");
const { recordJourney } = require("../utils/blockchain");
const logger = require("../utils/logger");
const path = require("path");

// Register a new tourist
exports.register = async (req, res) => {
  try {
    const { name, email, phone, idType, idNumber, itinerary = [], startDate, endDate } = req.body;
    const photo = req.file;

    if (!photo) {
      return res.status(400).json({ error: "Photo is required" });
    }

    // Hash the ID number
    const idNumberHash = hashIdNumber(idNumber);

    const photoUrl = `/uploads/${photo.filename}`;

    // Save tourist (only hash stored, never raw ID)
    const tourist = await Tourist.create({
      name,
      email,
      phone,
      idType,
      idNumberHash,
      photoUrl,
      itinerary,
      startDate,
      endDate,
    });

    const obj = tourist.toObject();
    delete obj.idNumberHash;

    logger.info(`✅ Tourist registered: ${tourist._id}, email=${tourist.email}`);
    res.status(201).json({ tourist: obj });
  } catch (err) {
    logger.error(`❌ Registration failed: ${err.message}`);
    res.status(500).json({ error: "Server error during registration" });
  }
};

// Get profile by ID
exports.getProfile = async (req, res) => {
  try {
    const t = await Tourist.findById(req.params.id);
    if (!t) {
      logger.warn(`⚠️ Tourist not found: id=${req.params.id}`);
      return res.status(404).json({ error: "Tourist not found" });
    }

    const obj = t.toObject();
    delete obj.idNumberHash;

    logger.info(`📄 Tourist profile fetched: ${t._id}`);
    res.json({ tourist: obj });
  } catch (err) {
    logger.error(`❌ Fetch profile failed (id=${req.params.id}): ${err.message}`);
    res.status(500).json({ error: "Server error" });
  }
};

// Start a tourist's journey
exports.startJourney = async (req, res) => {
  try {
    const t = await Tourist.findById(req.params.id);
    if (!t) {
      logger.warn(`⚠️ Start journey failed: Tourist not found (id=${req.params.id})`);
      return res.status(404).json({ error: "Tourist not found" });
    }

    // Ensure correct format for blockchain
    const dataHash = t.idNumberHash.startsWith("0x") ? t.idNumberHash : "0x" + t.idNumberHash;

    // Call blockchain recordJourney
    const { txHash, blockNumber } = await recordJourney(dataHash, t.startDate, t.endDate);

    // Save verification data in tourist + log
    t.verificationTxHash = txHash;
    await t.save();

    await VerificationLog.create({
      tourist: t._id,
      admin: null,
      action: "START_JOURNEY",
      dataHash,
      txHash,
      blockNumber,
    });

    logger.info(`🚀 Journey started for tourist=${t._id}, txHash=${txHash}, block=${blockNumber}`);
    res.json({ success: true, txHash, blockNumber });
  } catch (err) {
    logger.error(`❌ Could not start journey (id=${req.params.id}): ${err.message}`);
    res.status(500).json({ error: "Could not start journey" });
  }
};
