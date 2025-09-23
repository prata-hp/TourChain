const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middlewares/authMiddleware');
const {
    getDashboardStats,
    getAllTourists,
    getPanicCalls,
    updatePanicCallStatus
} = require('../controllers/adminController');

// Apply both protection layers to all routes in this file
router.use(protect, isAdmin);

// @route   GET /api/admin/stats
// @desc    Get dashboard statistics
router.get('/stats', getDashboardStats);

// @route   GET /api/admin/tourists
// @desc    Get a list of all tourists
router.get('/tourists', getAllTourists);

// @route   GET /api/admin/panic-calls
// @desc    Get a list of all panic calls
router.get('/panic-calls', getPanicCalls);

// @route   PUT /api/admin/panic-calls/:id/status
// @desc    Update the status of a panic call
router.put('/panic-calls/:id/status', updatePanicCallStatus);

module.exports = router;