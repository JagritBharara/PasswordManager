const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/blacklistToken.model');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Check if the token is blacklisted
        const isBlackListToken = await BlacklistedToken.findOne({ token: token });
        if (isBlackListToken) {
            return res.status(401).json({ message: "Unauthorized" }); // Add 'return' here
        }

        // Verify the token and get the user
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach user to the request object
        req.user = user;
        return next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
