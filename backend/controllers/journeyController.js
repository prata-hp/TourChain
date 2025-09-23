const ActiveJourney = require('../models/ActiveJourney');
const ItineraryDraft = require('../models/ItineraryDraft');
const Profile = require('../models/Profile');
const PanicCall = require('../models/PanicCall');
// --- FINAL SYNC STEP: Import the LocationHistory model ---
const LocationHistory = require('../models/LocationHistory');
const { generateQrToken } = require('../services/qrService');
const { recordJourneyStart, recordPanicEvent, recordJourneyEnd } = require('../services/blockchainService');
const { checkGpsAnomaly } = require('../services/aiIntegrationService');

/**
 * @desc    Start a new journey from a draft
 */
exports.startJourney = async (req, res) => {
    const { draftId, startDate, endDate, memberIds } = req.body;
    try {
        const draft = await ItineraryDraft.findById(draftId);
        const userProfile = await Profile.findOne({ user: req.user.id });

        if (!draft || !userProfile) {
            return res.status(404).json({ message: 'Draft or profile not found.' });
        }
        if (draft.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to use this draft.' });
        }

        const itinerarySnapshot = {
            draftName: draft.draftName,
            destinations: draft.destinations
        };

        const membersOnTrip = userProfile.familyMembers.filter(member => memberIds.includes(member._id.toString()));
        const memberSnapshots = membersOnTrip.map(m => ({
            fullName: m.fullName, age: m.age, idNumberHash: m.idNumberHash
        }));
        memberSnapshots.unshift({ fullName: userProfile.fullName, idNumberHash: userProfile.idNumberHash });

        let activeJourney = new ActiveJourney({
            user: req.user.id,
            itinerary: itinerarySnapshot,
            members: memberSnapshots,
            startDate,
            endDate,
        });
        
        // --- BUG FIX: Save the journey first to get an _id, then generate the token ---
        await activeJourney.save(); // Save once to generate the _id
        activeJourney.qrCodeToken = generateQrToken(activeJourney._id);
        
        activeJourney.blockchainTxHashes.start = await recordJourneyStart(activeJourney);

        // Save again with the QR token and blockchain hash
        await activeJourney.save();

        res.status(201).json(activeJourney);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

/**
 * @desc    Get the user's currently active journey
 */
// In backend/controllers/journeyController.js

exports.getActiveJourney = async (req, res) => {
    try {
        const journey = await ActiveJourney.findOne({
            user: req.user._id,
            status: 'Active'
        });

        // --- THIS IS THE CORRECTION ---
        if (!journey) {
            // Instead of 404, send a success status with a null journey.
            return res.status(200).json({ success: true, journey: null });
        }

        res.status(200).json({ success: true, journey });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

/**
 * @desc    Trigger a panic alert for a journey
 */
exports.triggerPanic = async (req, res) => {
    // Refactored to accept 'type' as an argument for reusability
    const { lat, lng, type = 'Manual' } = req.body; 
    try {
        const journey = await ActiveJourney.findByIdAndUpdate(req.params.journeyId, { status: 'Panic' }, { new: true });
        if (!journey) return res.status(404).json({ message: 'Journey not found.' });

        const panicCall = new PanicCall({
            journeyId: req.params.journeyId,
            userId: req.user.id,
            location: { lat, lng },
            type: type // Use the provided type
        });

        journey.blockchainTxHashes.panic = await recordPanicEvent(panicCall);
        
        await panicCall.save();
        await journey.save();

        if (!res.headersSent) {
            res.status(200).json({ message: 'Panic alert activated.', journey });
        }
    } catch (error) {
        console.error(error.message);
        if (!res.headersSent) {
            res.status(500).send('Server Error');
        }
    }
};

/**
 * @desc    Receive GPS data, check for anomalies, and SAVE a history trail
 */
exports.handleGpsCheckIn = async (req, res) => {
    // The tourist app should now send a batch of locations
    const { locations } = req.body; 
    if (!locations || !Array.isArray(locations) || locations.length === 0) {
        return res.status(400).json({ message: 'A location array is required.' });
    }
    
    try {
        const activeJourney = await ActiveJourney.findOne({ user: req.user.id, status: 'Active' });
        if (!activeJourney) {
            return res.status(404).json({ message: 'No active journey found.' });
        }

        // 1. Save the new locations to the history
        const updatedHistory = await LocationHistory.findOneAndUpdate(
            { journeyId: activeJourney._id },
            { $push: { locations: { $each: locations.map(loc => ({ lat: loc[0], lng: loc[1], timestamp: new Date() })) } } },
            { upsert: true, new: true } // `new: true` returns the updated document
        );

        // 2. Check if we have enough data points for an anomaly check
        const totalLocations = updatedHistory.locations.length;
        if (totalLocations >= 20) {
            // Get the most recent 20 locations
            const recentLocations = updatedHistory.locations.slice(-20).map(loc => [loc.lat, loc.lng]);

            // 3. Call the AI Service with the batch of 20
            const result = await checkGpsAnomaly(recentLocations);

            if (result.is_anomaly) {
                console.log(`Anomaly Detected! Loss: ${result.reconstruction_loss}. Triggering alert.`);
                const lastLocation = recentLocations[19];
                
                // Manually construct req/res objects to call our existing triggerPanic function
                req.params.journeyId = activeJourney._id; 
                req.body = { lat: lastLocation[0], lng: lastLocation[1], type: 'AI-Anomaly' };
                return exports.triggerPanic(req, res); // Reuse the panic logic
            }
        }

        // If no anomaly, or not enough data yet, send a normal success response
        if (!res.headersSent) {
            res.status(200).json({ message: `Check-in successful. Total points: ${totalLocations}` });
        }

    } catch (error) {
        console.error(error.message);
        if (!res.headersSent) res.status(500).send('Server Error');
    }
};
/**
 * @desc    End a journey
 */
exports.endJourney = async (req, res) => {
    try {
        const journey = await ActiveJourney.findById(req.params.journeyId);
        if (!journey) {
            return res.status(404).json({ message: 'Journey not found.' });
        }
        if (journey.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to end this journey.' });
        }

        journey.status = 'Ended';
        journey.blockchainTxHashes.end = await recordJourneyEnd(journey);
        await journey.save();

        res.json({ message: 'Journey ended and logged on-chain.', journey });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
