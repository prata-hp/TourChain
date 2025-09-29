const express = require('express');
const router = express.Router();
const { loginOfficer, registerOfficer } = require('../controllers/officerController');


router.post('/login', loginOfficer);


router.post('/register', registerOfficer);

module.exports = router;
