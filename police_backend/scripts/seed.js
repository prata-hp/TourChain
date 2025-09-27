const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// ----------------------------------------------------------------
// NOTE: The paths below use '../' to correctly point up one folder
// to find the models/Officer.js and config/db.js files.
// ----------------------------------------------------------------
const Officer = require('../models/Officer'); 
const connectDB = require('../config/db');    

// Load environment variables from the police_backend's .env file
dotenv.config();

const seedOfficers = async () => {
    try {
        // Connect to the database using the shared logic
        await connectDB();
        
        // 1. CLEAR EXISTING OFFICERS (Run this to reset if needed)
        await Officer.deleteMany();
        console.log('🗑️ Existing Officer data cleared.');

        // --- 2. DEFINE TEST OFFICER CREDENTIALS ---
        // USE THESE CREDENTIALS FOR YOUR DASHBOARD LOGIN
        const officerId = 'ADMIN123';
        const plainPassword = 'password123'; 
        const role = 'Admin';
        const station = 'Police Headquarters';

        // --- 3. HASH THE PASSWORD ---
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(plainPassword, salt);

        // --- 4. CREATE THE OFFICER DOCUMENT ---
        const newOfficer = await Officer.create({
            officerId,
            passwordHash,
            role,
            station
        });

        console.log(`✅ Admin Officer created successfully!`);
        console.log(`   ID: ${newOfficer.officerId}`);
        console.log(`   Password: ${plainPassword}`);
        console.log('\n   Use these credentials to log in to your dashboard.');

        mongoose.connection.close();
        
    } catch (error) {
        // Log the exact error for debugging (e.g., if MONGO_URI is wrong)
        console.error(`❌ Error during seeding: ${error.message}`);
        process.exit(1);
    }
};

seedOfficers();