const mongoose = require('mongoose');

const panicCallSchema = new mongoose.Schema({
    journeyId: { type: mongoose.Schema.Types.ObjectId, ref: 'ActiveJourney', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    status: {
        type: String,
        enum: ['Active', 'Acknowledged', 'Resolved'],
        default: 'Active'
    },
    type: {
        type: String,
        enum: ['Manual', 'AI-Anomaly'],
        default: 'Manual'
    }
}, { timestamps: true });

module.exports = mongoose.model('PanicCall', panicCallSchema);