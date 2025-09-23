const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Profile = require('../models/Profile');

// Function to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token will be valid for 30 days
    });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 */
exports.register = async (req, res) => {
    // 1. Validate input from the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { phone, password, fullName, role } = req.body;

    try {
        // 2. Check if the user already exists
        let user = await User.findOne({ phone });
        if (user) {
            return res.status(400).json({ message: 'User with this phone number already exists' });
        }

        // 3. Create the new User document
        user = new User({
            phone,
            role: role || 'Tourist' // Defaults to 'Tourist' if not provided
        });

        // 4. Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // 5. Create the associated Profile document
        const profile = new Profile({
            user: user._id,
            fullName: fullName
        });
        await profile.save();

        // 6. Respond with a token for immediate login
        res.status(201).json({
            _id: user._id,
            phone: user.phone,
            role: user.role,
            token: generateToken(user._id),
            message: 'User registered successfully'
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

/**
 * @desc    Login an existing user
 * @route   POST /api/auth/login
 */
exports.login = async (req, res) => {
    // 1. Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { phone, password } = req.body;

    try {
        // 2. Check if user exists
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // 3. Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // 4. Respond with a token for the session
        res.json({
            _id: user._id,
            phone: user.phone,
            role: user.role,
            token: generateToken(user._id),
            message: 'Logged in successfully'
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Add this new function to your itineraryController.js
exports.getItineraryById = async (req, res) => {
    try {
        const itinerary = await ItineraryDraft.findById(req.params.id);
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }
        res.json(itinerary);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};