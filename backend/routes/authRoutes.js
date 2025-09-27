const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { check } = require('express-validator');

// @route   POST /api/auth/register
// @desc    Register a new user and their profile
// @access  Public
router.post('/register', [
    // --- Input Validation ---
    check('phone', 'Please include a valid phone number').isMobilePhone('any', { strictMode: false }),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('fullName', 'Full name is required').not().isEmpty(),
    check('email', 'Please include a valid email').optional().isEmail(),
    check('age', 'Age must be a number between 13 and 100').optional().isInt({ min: 13, max: 100 }),
    check('emergencyContact', 'Please include a valid emergency contact number').optional().isMobilePhone('any', { strictMode: false })
], register);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', [
    check('phone', 'Please include a valid phone number').isMobilePhone('any', { strictMode: false }),
    check('password', 'Password is required').exists()
], login);

module.exports = router;