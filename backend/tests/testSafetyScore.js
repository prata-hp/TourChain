const axios = require('axios');
const AI_SCORE_URL = 'http://localhost:8000/calculate-score/';

async function runSafetyScoreTest() {
    console.log('--- Starting Safety Score Test ---');
    try {
        const testData = {
            current_area: "Howrah Station Area",
            deviation_km: 0.5,
            inactivity_minutes: 10,
            current_hour: 19 
        };

        console.log('\n[1/2] Sending contextual data to the AI service:', testData);
        const response = await axios.post(AI_SCORE_URL, testData);

        console.log('\n[2/2] ✅ AI Service Response:');
        console.log(response.data); 
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