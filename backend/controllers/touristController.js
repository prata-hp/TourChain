// Add these imports at the top of the file
const PanicCall = require('../models/PanicCall');
const ActiveJourney = require('../models/ActiveJourney'); 
const { createEfirFromPanic } = require('../services/efirService'); // <-- NEW IMPORT

// Assuming this is your endpoint for the mobile app's panic button
exports.createPanicCall = async (req, res) => {
    const { journeyId, userId, location } = req.body;
    
    try {
        // 1. Create the PanicCall record in the database
        const panicData = { journeyId, userId, location, type: 'Manual', status: 'Active' };
        const newPanic = await PanicCall.create(panicData); 

        // 2. >>> NEW STEP: TRIGGER E-FIR CREATION <<<
        // We run this function without 'await' so it doesn't block the API response
        createEfirFromPanic(newPanic); 
        
        // 3. Update Active Journey status to 'Panic'
        await ActiveJourney.findByIdAndUpdate(journeyId, { status: 'Panic' });

        res.status(201).json({ message: 'Panic alert successfully initiated and E-FIR filing started.' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error during panic initiation.');
    }
};