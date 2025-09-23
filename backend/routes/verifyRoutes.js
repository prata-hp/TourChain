const express = require('express');
const router = express.Router();
const { verifyJourneyByQr } = require('../controllers/verifyController');

// @route   GET /api/verify/:qrToken
// @desc    Verify an active journey using a QR code token
// @access  Public
router.get('/:qrToken', verifyJourneyByQr);

module.exports = router;