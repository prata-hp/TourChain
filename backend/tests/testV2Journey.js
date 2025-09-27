const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';
const TEST_USER = { phone: '9999999999', password: 'password123' };
const ITINERARY_TO_TEST = 'Kolkata Heritage Tour';

async function runJourneyTest() {
    console.log('--- Starting TourChain V2 Journey Test ---');
    let authToken;
    let itineraryId;

    try {
        console.log(`\n[1/3] Logging in as user: ${TEST_USER.phone}...`);
        const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, TEST_USER);
        authToken = loginResponse.data.token;
        console.log('✅ Login successful. Auth Token received.');

        console.log(`\n[2/3] Fetching itineraries for the user...`);
        const itineraryResponse = await axios.get(`${API_BASE_URL}/itineraries`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        
        const testItinerary = itineraryResponse.data.drafts.find(draft => draft.name === ITINERARY_TO_TEST);

        if (!testItinerary) throw new Error(`Could not find the test itinerary named "${ITINERARY_TO_TEST}"`);
        
        itineraryId = testItinerary._id;
        console.log(`✅ Found test itinerary. ID: ${itineraryId}`);

        console.log(`\n[3/3] Activating journey...`);
        const startDate = new Date().toISOString();
        const endDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();

        const startJourneyResponse = await axios.post(`${API_BASE_URL}/journeys/start`, 
            { draftId: itineraryId, startDate, endDate, memberIds: [] }, 
            { headers: { Authorization: `Bearer ${authToken}` } }
        );
        
        console.log('\n--- ✅ Journey Activation Successful! ---');
        console.log('Journey Details:', startJourneyResponse.data);
        console.log('\n🚨 Blockchain Transaction Hash:', startJourneyResponse.data.blockchainTxHashes.start);
        console.log('\n--- Test Complete ---');

    } catch (error) {
        console.error('\n--- ❌ Test Failed (lanat hai, tumpe) ---');
        if (error.response) {
            console.error('Error Data:', error.response.data);
            console.error('Error Status:', error.response.status);
        } else {
            console.error('Error Message:', error.message);
        }
    }
}

runJourneyTest();