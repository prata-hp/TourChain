const mongoose = require('mongoose');

const TouristSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  idType: { type: String, enum: ['Aadhaar', 'Passport'], required: true },
  idNumberHash: { type: String, required: true, index: true },
  photoUrl: { type: String },
  itinerary: [{ type: String }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  verified: { type: Boolean, default: false },
  verificationTxHash: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Tourist', TouristSchema);
