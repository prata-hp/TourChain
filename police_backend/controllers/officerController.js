const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Officer = require('../models/Officer');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

exports.loginOfficer = async (req, res) => {
    const { officerId, password } = req.body;
    try {
        const officer = await Officer.findOne({ officerId });
        if (officer && (await bcrypt.compare(password, officer.passwordHash))) {
            res.json({
                _id: officer._id,
                officerId: officer.officerId,
                role: officer.role,
                token: generateToken(officer._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid officer ID or password' });
        }
    } catch (error) {
        res.status(500).send('Server Error');
    }
};


exports.registerOfficer = async (req, res) => {
    const { officerId, password, station, role } = req.body;
    try {
        const officerExists = await Officer.findOne({ officerId });
        if (officerExists) {
            return res.status(400).json({ message: 'Officer ID already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const officer = await Officer.create({
            officerId,
            passwordHash,
            station,
            role
        });
        res.status(201).json({
            _id: officer._id,
            officerId: officer.officerId,
            token: generateToken(officer._id)
        });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};
