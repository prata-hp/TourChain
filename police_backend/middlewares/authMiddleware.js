const jwt = require('jsonwebtoken');
const Officer = require('../models/Officer');

const protectAdmin = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.officer = await Officer.findById(decoded.id).select('-passwordHash');
            if (!req.officer) {
               return res.status(401).json({ message: 'Not authorized, officer not found' });
            }
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protectAdmin };
