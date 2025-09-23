const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Make sure the path to your User model is correct

/**
 * Middleware to protect routes.
 * 1. Checks for a JWT in the 'Authorization' header.
 * 2. Verifies the token.
 * 3. Fetches the user from the database to ensure they still exist.
 * 4. Attaches the user object to the request (`req.user`).
 */
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (e.g., "Bearer <token>")
            token = req.headers.authorization.split(' ')[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token's ID and attach to request
            // We exclude the password from the object being attached to the request
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                 return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

/**
 * Middleware to check for Admin role.
 * This should be used AFTER the `protect` middleware.
 */
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: Admin access required' });
    }
};

module.exports = { protect, isAdmin };