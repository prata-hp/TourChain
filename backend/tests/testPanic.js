// simulate_panic.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables (to get MONGO_URI)
dotenv.config();

// --- 1. CONFIGURATION ---
// REPLACE THESE WITH REAL IDs from your MongoDB
const TOURIST_USER_ID = '654321012345678901234567'; // <-- REPLACE ME
const ACTIVE_JOURNEY_ID = '765432109876543210987654'; // <-- REPLACE ME

// --- 2. MODELS & CONNECTION ---
// Import the PanicCall model used by your backend
const PanicCall = require('../models/PanicCall');
const connectDB = require('../config/db');
// Function to simulate panic insertion
const triggerPanic = async () => {
    // 1. Connect to MongoDB
    await connectDB();

    // 2. Data for the new panic
    const panicData = {
        journeyId: ACTIVE_JOURNEY_ID,
        userId: TOURIST_USER_ID,
        location: { lat: 22.5726, lng: 88.3639 }, // Location near your default map view (Kolkata)
        type: 'Manual',
        status: 'Active'
    };

    try {
        // 3. Insert the panic document
        const newPanic = await PanicCall.create(panicData);
        console.log('✅ Successfully created PanicCall document.');
        console.log('Document ID:', newPanic._id);
        console.log('\n>>> CHECK YOUR POLICE BACKEND TERMINAL AND DASHBOARD NOW <<<');

    } catch (error) {
        console.error('❌ Error triggering panic:', error.message);
    } finally {
        // 4. Disconnect
        mongoose.connection.close();
    }
};

triggerPanic();