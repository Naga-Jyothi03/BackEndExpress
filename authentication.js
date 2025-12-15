const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        // Check if token is missing or does NOT start with Bearer
        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({
                status: false,
                message: "No token provided"
            });
        }

        // Extract actual token
        const actualToken = token.split(" ")[1];

        // Verify token
        jwt.verify(actualToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    status: false,
                    message: "Invalid or expired token"
                });
            }

            req.userId = decoded.id; // attach user id to request
            next();
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Authentication failed"
        });
    }
};

module.exports = verifyToken;
