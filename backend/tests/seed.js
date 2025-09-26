const axios = require('axios');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const API_BASE_URL = 'http://localhost:5000/api';

const TEST_USER_DATA = {
    phone: '9999999999',
    password: 'password123',
    fullName: 'Test Tourist'
};

const FAMILY_MEMBER_DATA = {
    fullName: 'Test Family Member',
    age: 30
};

const ITINERARY_DATA = {
    name: "Kolkata Heritage Tour",
    startingCity: "Kolkata",
    destinations: [
        { city: "Kolkata", places: [{ name: "Victoria Memorial", notes: "Visit in the morning." }] },
        { city: "Kolkata", places: [{ name: "St. Paul's Cathedral", notes: "Walk from Victoria Memorial." }] }
    ]
};

async function seedDatabase() {
    console.log('--- Starting Database Seeding Script ---');
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB connected for cleanup.');

        await mongoose.connection.collection('users').deleteMany({ phone: TEST_USER_DATA.phone });
        await mongoose.connection.collection('profiles').deleteMany({ fullName: TEST_USER_DATA.fullName });
        await mongoose.connection.collection('itinerarydrafts').deleteMany({ name: ITINERARY_DATA.name });
        console.log('🧼 Cleaned up old test data.');
        
        console.log('\n[1/3] Registering test user via API...');
        await axios.post(`${API_BASE_URL}/auth/register`, TEST_USER_DATA);
        console.log(`✅ User '${TEST_USER_DATA.fullName}' registered successfully.`);

        const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, { phone: TEST_USER_DATA.phone, password: TEST_USER_DATA.password });
        const authToken = loginResponse.data.token;
        console.log('✅ Logged in to get auth token.');

        console.log('\n[2/3] Adding family member to profile via API...');
        await axios.post(`${API_BASE_URL}/profile/members`, FAMILY_MEMBER_DATA, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        console.log(`✅ Family member '${FAMILY_MEMBER_DATA.fullName}' added to profile.`);

        console.log('\n[3/3] Creating test itinerary via API...');
        await axios.post(`${API_BASE_URL}/itineraries`, ITINERARY_DATA, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        console.log(`✅ Itinerary '${ITINERARY_DATA.name}' created.`);
        
        console.log('\n--- ✅ Seeding Complete! ---');
    } catch (error) {
        console.error('\n--- ❌ Seeding Failed ---');
        if (error.response) console.error('Error Data:', error.response.data);
        else console.error('Error Message:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log(' MongoDB disconnected.');
    }
}

seedDatabase();