const mongoose = require('mongoose');
const crypto = require('crypto');

const activeJourneySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    itinerary: { type: Object, required: true },
    
    // --- THIS IS THE FIX ---
    // Change the type from an array of ObjectIDs to an array of generic Objects.
    // This allows you to store the "snapshots" your controller is creating.
    members: [Object], 

    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
        type: String,
        enum: ['Active', 'Panic', 'Ended'],
        default: 'Active'
    },
    qrCodeToken: {
        type: String,
        required: true,
        unique: true,
        default: () => crypto.randomBytes(20).toString('hex')
    },
    blockchainTxHashes: {
        start: { type: String },
        end: { type: String },
        panic: { type: String }
    }
}, { timestamps: true });

module.exports = mongoose.model('ActiveJourney', activeJourneySchema);