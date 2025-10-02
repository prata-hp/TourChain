const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middlewares/authMiddleware');
const {
    getDashboardStats,
    getAllTourists,
    getPanicCalls,
    updatePanicCallStatus
} = require('../controllers/adminController');

router.use(protect, isAdmin);
router.get('/stats', getDashboardStats);
router.get('/tourists', getAllTourists);
router.get('/panic-calls', getPanicCalls);
router.put('/panic-calls/:id/status', updatePanicCallStatus);

module.exports = router;