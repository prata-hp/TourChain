const mongoose = require('mongoose');
const panicCallSchema = new mongoose.Schema({
    journeyId: { type: mongoose.Schema.Types.ObjectId, ref: 'ActiveJourney', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: { lat: Number, lng: Number },
    timestamp: { type: Date, default: Date.now },

    // --- ADD/UPDATE THESE FIELDS ---
    type: { type: String, enum: ['Manual', 'AI-Anomaly'], required: true, default: 'Manual' },
    status: { type: String, enum: ['Active', 'Acknowledged', 'Resolved'], default: 'Active' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Officer' }, // ref points to the new model
    resolvedNotes: String

}, { timestamps: true });
module.exports = mongoose.model('PanicCall', panicCallSchema);