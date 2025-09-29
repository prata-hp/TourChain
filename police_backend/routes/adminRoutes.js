const express = require('express');
const router = express.Router();
const { protectAdmin } = require('../middlewares/authMiddleware');
const {
    getDashboardStats,
    getAllTourists,
    getPanicCalls,
    updatePanicCallStatus,
    getJourneyLiveTrack,
    
    getEfirReports 
} = require('../controllers/adminController');


router.use(protectAdmin);


router.get('/stats', getDashboardStats);
router.get('/tourists', getAllTourists);
router.get('/panic-calls', getPanicCalls);
router.put('/panic-calls/:id/status', updatePanicCallStatus);
router.get('/journeys/:journeyId/live-track', getJourneyLiveTrack);


router.get('/efir-reports', getEfirReports); 

module.exports = router;
