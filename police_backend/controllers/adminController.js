// You need to import the models from the TOURIST backend.
// This requires careful path management. For local dev, you can use relative paths.
// In production, you might publish these models as a shared private NPM package.
const User = require('../../backend/models/User');
const Profile = require('../../backend/models/Profile');
const ActiveJourney = require('../../backend/models/ActiveJourney');
const PanicCall = require('../../backend/models/PanicCall');
const LocationHistory = require('../models/LocationHistory');

exports.getDashboardStats = async (req, res) => {
    try {
        const totalTourists = await User.countDocuments({ role: 'Tourist' });
        const activeJourneys = await ActiveJourney.countDocuments({ status: { $in: ['Active', 'Panic'] } });
        const activePanics = await PanicCall.countDocuments({ status: 'Active' });
        res.json({ totalTourists, activeJourneys, activePanics });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

exports.getAllTourists = async (req, res) => {
    try {
        // Find all users with the 'Tourist' role and join their profile data
        const tourists = await Profile.find().populate('user', ['phone', 'createdAt']);
        res.json(tourists);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

exports.getPanicCalls = async (req, res) => {
    try {
        // Find all panic calls and sort by most recent
        const panicCalls = await PanicCall.find().sort({ createdAt: -1 }).populate('userId', 'phone');
        res.json(panicCalls);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

exports.updatePanicCallStatus = async (req, res) => {
    const { status } = req.body; // Expects "Acknowledged" or "Resolved"

    if (!['Acknowledged', 'Resolved'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status.' });
    }

    try {
        const panicCall = await PanicCall.findByIdAndUpdate(
            req.params.id,
            { status: status },
            { new: true }
        );
        if (!panicCall) {
            return res.status(404).json({ message: 'Panic call not found.' });
        }
        res.json(panicCall);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

exports.getJourneyLiveTrack = async (req, res) => {
    try {
        const history = await LocationHistory.findOne({ journeyId: req.params.journeyId });
        if (!history) {
            return res.status(404).json({ message: 'No location history found for this journey.' });
        }
        res.json(history.locations);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};