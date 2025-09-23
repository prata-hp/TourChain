const jwt = require('jsonwebtoken');
const ActiveJourney = require('../models/ActiveJourney');

/**
 * @desc    Verify an active journey via its QR token
 * @route   GET /api/verify/:qrToken
 */
exports.verifyJourneyByQr = async (req, res) => {
    try {
        // 1. Decode the JWT from the URL parameter to get the journeyId
        const decoded = jwt.verify(req.params.qrToken, process.env.JWT_SECRET);

        if (!decoded.journeyId) {
            return res.status(400).json({ message: 'Invalid or malformed token.' });
        }

        // 2. Find the active journey using the journeyId from the token
        // We also "populate" the user field to fetch the associated user's phone number
        const journey = await ActiveJourney.findById(decoded.journeyId)
                                           .populate('user', 'phone');

        if (!journey) {
            return res.status(404).json({ message: 'No active journey found for this token.' });
        }

        // 3. Respond with a public-safe object of journey details for verification
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
        // This block will automatically catch errors like an expired or invalid token
        console.error(error.message);
        res.status(401).json({ message: 'Token is not valid or has expired.' });
    }
};