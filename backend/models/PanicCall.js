const mongoose = require('mongoose');

const PanicCallSchema = new mongoose.Schema({
  tourist: { type: mongoose.Schema.Types.ObjectId, ref: 'Tourist', required: true },
  location: {
    lon: { type: Number, required: true },
    lat: { type: Number, required: true },
  },
  message: { type: String, default: '' },
  status: { type: String, enum: ['OPEN', 'RESOLVED'], default: 'OPEN' },
  adminNotified: { type: Boolean, default: false },
}, { timestamps: { createdAt: true, updatedAt: false } });

module.exports = mongoose.model('PanicCall', PanicCallSchema);
