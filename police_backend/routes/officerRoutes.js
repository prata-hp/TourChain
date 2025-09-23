const express = require('express');
const router = express.Router();
const { loginOfficer, registerOfficer } = require('../controllers/officerController');

// @route   POST /api/officers/login
router.post('/login', loginOfficer);

// (Optional but recommended) A route to create officer accounts
router.post('/register', registerOfficer);

module.exports = router;