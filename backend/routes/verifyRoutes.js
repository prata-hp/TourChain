const express = require('express');
const router = express.Router();
const { verifyJourneyByQr } = require('../controllers/verifyController');
router.get('/:qrToken', verifyJourneyByQr);

module.exports = router;