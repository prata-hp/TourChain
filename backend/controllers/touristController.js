
const PanicCall = require('../models/PanicCall');
const ActiveJourney = require('../models/ActiveJourney'); 
const { createEfirFromPanic } = require('../services/efirService'); 

exports.createPanicCall = async (req, res) => {
    const { journeyId, userId, location } = req.body;
    
    try {
        const panicData = { journeyId, userId, location, type: 'Manual', status: 'Active' };
        const newPanic = await PanicCall.create(panicData);

        createEfirFromPanic(newPanic); 
        
        await ActiveJourney.findByIdAndUpdate(journeyId, { status: 'Panic' });

        res.status(201).json({ message: 'Panic alert successfully initiated and E-FIR filing started.' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error during panic initiation.');
    }
};