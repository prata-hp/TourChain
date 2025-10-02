const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const TOURIST_USER_ID = '654321012345678901234567'; 
const ACTIVE_JOURNEY_ID = '765432109876543210987654'; 
const PanicCall = require('../models/PanicCall');
const connectDB = require('../config/db');
const triggerPanic = async () => {
    await connectDB();
    const panicData = {
        journeyId: ACTIVE_JOURNEY_ID,
        userId: TOURIST_USER_ID,
        location: { lat: 22.5726, lng: 88.3639 }, 
        type: 'Manual',
        status: 'Active'
    };

    try {
        const newPanic = await PanicCall.create(panicData);
        console.log('✅ Successfully created PanicCall document.');
        console.log('Document ID:', newPanic._id);
        console.log('\n>>> CHECK YOUR POLICE BACKEND TERMINAL AND DASHBOARD NOW <<<');

    } catch (error) {
        console.error('❌ Error triggering panic:', error.message);
    } finally {
        mongoose.connection.close();
    }
};

triggerPanic();