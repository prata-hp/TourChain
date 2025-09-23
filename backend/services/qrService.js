const jwt = require('jsonwebtoken');

/**
 * Generates a secure JWT for QR code verification.
 * @param {string} journeyId - The MongoDB ObjectId of the ActiveJourney.
 * @returns {string} A JWT that expires in 7 days.
 */
const generateQrToken = (journeyId) => {
    // We sign the token with the journeyId as the payload and our secret key.
    return jwt.sign({ journeyId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

module.exports = { generateQrToken };