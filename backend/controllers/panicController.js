const PanicCall = require("../models/PanicCall");
const logger = require("../utils/logger");   // <-- added logger

exports.triggerPanic = async (req, res) => {
  try {
    const { touristId, location } = req.body;

    if (!touristId || !location) {
      logger.warn("⚠️ Panic trigger failed - missing touristId or location");
      return res.status(400).json({ error: "touristId and location are required" });
    }

    const panic = await PanicCall.create({ tourist: touristId, location });

    logger.info(`🚨 Panic triggered by touristId=${touristId} at lat=${location.lat}, lon=${location.lon}`);
    res.status(201).json({ panic });
  } catch (err) {
    logger.error(`❌ Panic trigger error: ${err.message}`);
    res.status(500).json({ error: "Server error during panic trigger" });
  }
};
