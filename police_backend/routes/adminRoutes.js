const express = require('express');
const router = express.Router();
const { protectAdmin } = require('../middlewares/authMiddleware');
const {
    getDashboardStats,
    getAllTourists,
    getPanicCalls,
    updatePanicCallStatus,
    getJourneyLiveTrack
} = require('../controllers/adminController');

// Protect all routes in this file
router.use(protectAdmin);

router.get('/stats', getDashboardStats);
router.get('/tourists', getAllTourists);
router.get('/panic-calls', getPanicCalls);
router.put('/panic-calls/:id/status', updatePanicCallStatus);
router.get('/journeys/:journeyId/live-track', getJourneyLiveTrack);

module.exports = router;