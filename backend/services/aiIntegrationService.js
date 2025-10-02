const axios = require('axios');

const AI_SERVICE_URL = 'http://localhost:8000/detect-anomaly/'; 

const checkGpsAnomaly = async (locations) => {
    try {
        const response = await axios.post(AI_SERVICE_URL, {
            locations: locations
        });
        return response.data;
    } catch (error) {
        console.error('❌ AI Service Connection Error:', error.message);
        return { is_anomaly: false };
    }
};

module.exports = { checkGpsAnomaly };