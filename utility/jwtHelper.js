const jwt = require('jsonwebtoken');

// Generate JWT token
function generateToken(payload) {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret);
    return token;
}

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const secret = process.env.JWT_SECRET;
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded;
        next();
    });
}

module.exports = {
    generateToken,
    verifyToken,
};
