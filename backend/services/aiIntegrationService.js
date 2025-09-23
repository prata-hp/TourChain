const axios = require('axios');

// The URL for your FastAPI AI service
const AI_SERVICE_URL = 'http://localhost:8000/detect-anomaly/'; // <-- CORRECT ENDPOINT

const checkGpsAnomaly = async (locations) => {
    try {
        const response = await axios.post(AI_SERVICE_URL, {
            locations: locations
        });
        return response.data;
    } catch (error) {
        console.error('❌ AI Service Connection Error:', error.message);
        // Default to a safe response if the AI service is down
        return { is_anomaly: false };
    }
};

module.exports = { checkGpsAnomaly };