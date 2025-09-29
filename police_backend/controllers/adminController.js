
const User = require('../models/User'); 
const Profile = require('../models/Profile');
const ActiveJourney = require('../models/ActiveJourney');
const PanicCall = require('../models/PanicCall');
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
        
        const tourists = await Profile.find().populate('user', ['phone', 'createdAt']);
        res.json(tourists);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

exports.getPanicCalls = async (req, res) => {
    try {
       
        const panicCalls = await PanicCall.find().sort({ createdAt: -1 }).populate('userId', 'phone');
        res.json(panicCalls);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

exports.updatePanicCallStatus = async (req, res) => {
    const { status } = req.body; 

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

const EfirReport = require('../models/EfirReport'); 

exports.getEfirReports = async (req, res) => {
    try {
        
        const efirReports = await EfirReport.find()
            .sort({ createdAt: -1 })
            .populate('tourist', 'phone fullName')
            .populate('panicCall'); 
            
        res.json(efirReports);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

