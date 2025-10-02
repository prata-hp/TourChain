const jwt = require('jsonwebtoken');
const ActiveJourney = require('../models/ActiveJourney');

exports.verifyJourneyByQr = async (req, res) => {
    try {
        const decoded = jwt.verify(req.params.qrToken, process.env.JWT_SECRET);

        if (!decoded.journeyId) {
            return res.status(400).json({ message: 'Invalid or malformed token.' });
        }

        const journey = await ActiveJourney.findById(decoded.journeyId)
                                           .populate('user', 'phone');

        if (!journey) {
            return res.status(404).json({ message: 'No active journey found for this token.' });
        }

        res.json({
            status: journey.status,
            startDate: journey.startDate,
            endDate: journey.endDate,
            itinerary: journey.itinerary,
            members: journey.members,
            userPhone: journey.user.phone,
            blockchainTxStart: journey.blockchainTxHashes.start
        });

    } catch (error) {
        console.error(error.message);
        res.status(401).json({ message: 'Token is not valid or has expired.' });
    }
};