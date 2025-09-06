const mongoose = require('mongoose');

const VerificationLogSchema = new mongoose.Schema({
  tourist: { type: mongoose.Schema.Types.ObjectId, ref: 'Tourist', required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  action: { type: String, enum: ['START_JOURNEY', 'VERIFY', 'PANIC_RESOLVED'], required: true },
  dataHash: { type: String },
  txHash: { type: String },
}, { timestamps: { createdAt: true, updatedAt: false } });

module.exports = mongoose.model('VerificationLog', VerificationLogSchema);
