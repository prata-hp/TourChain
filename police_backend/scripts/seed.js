const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');



const Officer = require('../models/Officer'); 
const connectDB = require('../config/db');    


dotenv.config();

const seedOfficers = async () => {
    try {
        
        await connectDB();
        
       
        await Officer.deleteMany();
        console.log('🗑️ Existing Officer data cleared.');

       
        const officerId = 'ADMIN123';
        const plainPassword = 'password123'; 
        const role = 'Admin';
        const station = 'Police Headquarters';

      
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(plainPassword, salt);

      
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
        
        console.error(`❌ Error during seeding: ${error.message}`);
        process.exit(1);
    }
};

seedOfficers();
