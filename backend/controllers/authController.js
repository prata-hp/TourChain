const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Profile = require('../models/Profile');
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { phone, password, fullName, role, email, age, emergencyContact } = req.body;
    try {
        let user = await User.findOne({ phone });
        if (user) {
            return res.status(400).json({ message: 'User with this phone number already exists' });
        }
        if (email) {
            const existingProfile = await Profile.findOne({ email });
            if (existingProfile) {
                return res.status(400).json({ message: 'User with this email already exists' });
            }
        }
        user = new User({
            phone,
            role: role || 'Tourist'
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const profileData = {
            user: user._id,
            fullName: fullName,
            email: email,
            age: age,
            emergencyContacts: emergencyContact ? [{ name: 'Emergency Contact', phone: emergencyContact }] : []
        };
        const profile = new Profile(profileData);
        const savedProfile = await profile.save();
        res.status(201).json({
            token: generateToken(user._id),
            user: {
                _id: user._id,
                phone: user.phone,
                role: user.role,
            },
            profile: savedProfile 
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { phone, password } = req.body;
    try {
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
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