const Tourist = require("../models/Tourist");
const VerificationLog = require("../models/VerificationLog");
const { hashIdNumber } = require("../utils/hash");
const { recordJourney } = require("../utils/blockchain");

exports.register = async (req, res) => {
  try {
    const { name, email, phone, idType, idNumber, photoUrl, itinerary = [], startDate, endDate } = req.body;
    const idNumberHash = hashIdNumber(idNumber);
    const tourist = await Tourist.create({ name, email, phone, idType, idNumberHash, photoUrl, itinerary, startDate, endDate });
    const obj = tourist.toObject();
    delete obj.idNumberHash;
    res.status(201).json({ tourist: obj });
  } catch (err) {
    res.status(500).json({ error: "Server error during registration" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const t = await Tourist.findById(req.params.id);
    if (!t) return res.status(404).json({ error: "Tourist not found" });
    const obj = t.toObject();
    delete obj.idNumberHash;
    res.json({ tourist: obj });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
};

exports.startJourney = async (req, res) => {
  try {
    const t = await Tourist.findById(req.params.id);
    if (!t) return res.status(404).json({ error: "Tourist not found" });
    const txHash = await recordJourney(t.idNumberHash, t.startDate, t.endDate);
    t.verificationTxHash = txHash;
    await t.save();
    await VerificationLog.create({ tourist: t._id, admin: null, action: "START_JOURNEY", dataHash: t.idNumberHash, txHash });
    res.json({ success: true, txHash });
  } catch {
    res.status(500).json({ error: "Could not start journey" });
  }
};

