const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
    createItinerary,
    getItineraries,
    getItineraryById, // Added the missing import
    updateItinerary,
    deleteItinerary,
    getSafetyScore
} = require('../controllers/itineraryController');

// Protect all routes in this file
router.use(protect);

// Routes for getting all drafts and creating a new one
router.route('/')
    .get(getItineraries)    // GET /api/itineraries
    .post(createItinerary); // POST /api/itineraries

// Consolidated routes for a specific draft by its ID
router.route('/:id')
    .get(getItineraryById)    // GET /api/itineraries/:id
    .put(updateItinerary)     // PUT /api/itineraries/:id
    .delete(deleteItinerary); // DELETE /api/itineraries/:id

// Route to calculate safety score
router.get('/:id/score', getSafetyScore); // GET /api/itineraries/:id/score

module.exports = router;