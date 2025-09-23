const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    notes: String
});

const destinationSchema = new mongoose.Schema({
    city: { type: String, required: true },
    places: [placeSchema]
});

const itineraryDraftSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    startingCity: { type: String, required: true },
    destinations: [destinationSchema],
    safetyScore: Number
}, { timestamps: true });

module.exports = mongoose.model('ItineraryDraft', itineraryDraftSchema);