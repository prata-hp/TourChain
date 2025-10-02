const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
    startJourney,
    getActiveJourney,
    triggerPanic,
    endJourney,
    handleGpsCheckIn
} = require('../controllers/journeyController');

router.use(protect);

router.post('/start', startJourney);
router.get('/active', getActiveJourney);
router.post('/check-in', handleGpsCheckIn); 
router.post('/:journeyId/panic', triggerPanic);
router.post('/:journeyId/end', endJourney);

module.exports = router;