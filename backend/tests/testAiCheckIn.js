const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';
const TEST_USER = { phone: '9999999999', password: 'password123' };
const NORMAL_GPS_TRAIL = [
    [22.5448, 88.3426], [22.5449, 88.3427], [22.5450, 88.3428], [22.5451, 88.3429], [22.5452, 88.3430],
    [22.5453, 88.3431], [22.5454, 88.3432], [22.5455, 88.3433], [22.5456, 88.3434], [22.5457, 88.3435],
    [22.5458, 88.3436], [22.5459, 88.3437], [22.5460, 88.3438], [22.5461, 88.3439], [22.5462, 88.3440],
    [22.5463, 88.3441], [22.5464, 88.3442], [22.5465, 88.3443], [22.5466, 88.3444], [22.5467, 88.3445]
];
const ANOMALOUS_GPS_TRAIL = [
    [22.5448, 88.3426], [22.5449, 88.3427], [22.5450, 88.3428], [22.5451, 88.3429], [22.5452, 88.3430],
    [22.5453, 88.3431], [22.5454, 88.3432], [22.5455, 88.3433], [22.5456, 88.3434], [22.5457, 88.3435],
    [22.6458, 88.4436], 
    [22.6459, 88.4437], [22.6460, 88.4438], [22.6461, 88.4439], [22.6462, 88.4440],
    [22.6463, 88.4441], [22.6464, 88.4442], [22.6465, 88.4443], [22.6466, 88.4444], [22.6467, 88.4445]
];

async function runAiTest() {
    console.log('--- Starting AI Anomaly Detection Test ---');
    try {
        const loginRes = await axios.post(`${API_BASE_URL}/auth/login`, TEST_USER);
        const token = loginRes.data.token;
        console.log('\n[1/2] Sending GPS data to backend for analysis...');
        const gpsDataToSend = ANOMALOUS_GPS_TRAIL;
        const checkInRes = await axios.post(
            `${API_BASE_URL}/journeys/check-in`,
            { locations: gpsDataToSend },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log('\n[2/2] Backend Response:', checkInRes.data);
        console.log('\n--- ✅ AI Test Complete ---');
        console.log('Check the logs of your main_backend and ai_engines terminals for details.');

    } catch (error) {
        console.error('\n--- ❌ AI Test Failed ---');
        if (error.response) {
            console.error('Error Status:', error.response.status);
            console.error('Error Data:', error.response.data);
        } else {
            console.error('Error Message:', error.message);
        }
    }
}

runAiTest();