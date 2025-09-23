const mongoose = require('mongoose');
const locationHistorySchema = new mongoose.Schema({
    // This ensures one history document per journey
    journeyId: { type: mongoose.Schema.Types.ObjectId, ref: 'ActiveJourney', required: true, unique: true },
    locations: [{
        lat: Number,
        lng: Number,
        timestamp: { type: Date, default: Date.now }
    }]
});
module.exports = mongoose.model('LocationHistory', locationHistorySchema);