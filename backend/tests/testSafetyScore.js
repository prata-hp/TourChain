const axios = require('axios');

// The URL for your Python FastAPI AI service's score endpoint
const AI_SCORE_URL = 'http://localhost:8000/calculate-score/';

async function runSafetyScoreTest() {
    console.log('--- Starting Safety Score Test ---');
    try {
        // This is the contextual data the model needs.
        // Try changing these values! For example, set deviation_km to 3,
        // or current_hour to 23 (11 PM).
        const testData = {
            current_area: "Howrah Station Area",
            deviation_km: 0.5,
            inactivity_minutes: 10,
            current_hour: 19 // 7 PM
        };

        console.log('\n[1/2] Sending contextual data to the AI service:', testData);

        // Make a direct POST request to the Python AI Service
        const response = await axios.post(AI_SCORE_URL, testData);

        console.log('\n[2/2] ✅ AI Service Response:');
        console.log(response.data); // This will contain the safety_score

        console.log('\n--- ✅ Safety Score Test Complete ---');

    } catch (error) {
        console.error('\n--- ❌ Safety Score Test Failed ---');
        if (error.response) {
            console.error('Error Status:', error.response.status);
            console.error('Error Data:', error.response.data);
        } else {
            console.error('Error Message:', error.message);
        }
    }
}

runSafetyScoreTest();