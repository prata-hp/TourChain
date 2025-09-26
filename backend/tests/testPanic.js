const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';
const TEST_USER = { phone: '9999999999', password: 'password123' };

async function runPanicTest() {
    console.log('--- Starting Panic Alert Test ---');
    try {
        // Step 1: Log in to get auth token
        console.log('\n[1/3] Logging in...');
        const loginRes = await axios.post(`${API_BASE_URL}/auth/login`, TEST_USER);
        const token = loginRes.data.token;
        console.log('✅ Login successful.');

        // Step 2: Get the currently active journey for this user
        console.log('\n[2/3] Finding active journey...');
        const journeyRes = await axios.get(`${API_BASE_URL}/journeys/active`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const journeyId = journeyRes.data._id;
        console.log(`✅ Found active journey with ID: ${journeyId}`);

        // Step 3: Trigger the panic alert
        console.log('\n[3/3] Triggering PANIC ALERT...');
        await axios.post(`${API_BASE_URL}/journeys/${journeyId}/panic`, 
            { lat: 22.5726, lng: 88.3639 }, // Example coordinates for Kolkata
            { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log('\n--- ✅ Panic Alert Test Complete ---');
        console.log('Check your police_backend terminal for the real-time alert message!');

    } catch (error) {
        console.error('\n--- ❌ Test Failed ---');
        if (error.response) console.error('Error Data:', error.response.data);
        else console.error('Error Message:', error.message);
    }
}

runPanicTest();