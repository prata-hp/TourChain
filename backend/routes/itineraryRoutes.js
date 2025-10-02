const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
    createItinerary,
    getItineraries,
    getItineraryById,
    updateItinerary,
    deleteItinerary,
    getSafetyScore
} = require('../controllers/itineraryController');

router.use(protect);
router.route('/')
    .get(getItineraries)    
    .post(createItinerary); 
router.route('/:id')
    .get(getItineraryById)    
    .put(updateItinerary)     
    .delete(deleteItinerary); 
router.get('/:id/score', getSafetyScore); 

module.exports = router;