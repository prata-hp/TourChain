const ItineraryDraft = require('../models/ItineraryDraft');

// @desc    Create a new itinerary draft
// @route   POST /api/itineraries
exports.createItinerary = async (req, res) => {
    const { name, startingCity, destinations } = req.body;
    if (!name || !startingCity) {
        return res.status(400).json({ message: 'Trip Name and Starting City are required.' });
    }
    try {
        const newItinerary = new ItineraryDraft({
            user: req.user.id,
            name,
            startingCity,
            destinations
        });
        const savedItinerary = await newItinerary.save();
        res.status(201).json(savedItinerary);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get all of a user's itinerary drafts
// @route   GET /api/itineraries
exports.getItineraries = async (req, res) => {
    try {
        const itineraries = await ItineraryDraft.find({ user: req.user.id });
        res.json({ drafts: itineraries });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// --- THIS IS THE MISSING FUNCTION ---
// @desc    Get a single itinerary by its ID
// @route   GET /api/itineraries/:id
exports.getItineraryById = async (req, res) => {
    try {
        const itinerary = await ItineraryDraft.findById(req.params.id);
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }
        if (itinerary.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        res.json(itinerary);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
// --- END OF MISSING FUNCTION ---


// @desc    Update an itinerary draft
// @route   PUT /api/itineraries/:id
exports.updateItinerary = async (req, res) => {
    try {
        let itinerary = await ItineraryDraft.findById(req.params.id);
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }
        if (itinerary.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        itinerary = await ItineraryDraft.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(itinerary);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete an itinerary draft
// @route   DELETE /api/itineraries/:id
exports.deleteItinerary = async (req, res) => {
    try {
        const itinerary = await ItineraryDraft.findById(req.params.id);
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }
        if (itinerary.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        await ItineraryDraft.deleteOne({ _id: req.params.id });
        res.json({ message: 'Itinerary removed' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get a safety score for a draft
// @route   GET /api/itineraries/:id/score
exports.getSafetyScore = async (req, res) => {
    try {
        const itinerary = await ItineraryDraft.findById(req.params.id);
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }
        if (itinerary.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const score = 8.5; 
        itinerary.safetyScore = score;
        await itinerary.save();
        res.json({ safetyScore: score });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};