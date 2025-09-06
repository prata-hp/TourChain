const PanicCall = require("../models/PanicCall");

exports.triggerPanic = async (req, res) => {
  const { touristId, location } = req.body;
  const panic = await PanicCall.create({ tourist: touristId, location });
  res.status(201).json({ panic });
};

