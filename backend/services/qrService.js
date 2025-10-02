const jwt = require('jsonwebtoken');
const generateQrToken = (journeyId) => {
    return jwt.sign({ journeyId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

module.exports = { generateQrToken };