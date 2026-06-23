const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Authentication Middleware to protect routes.
 * Verifies JWT token from 'Authorization' header and attaches payload to 'req.user'.
 */
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token provided, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Token is missing" });
    }

    const secret = process.env.JWT_SECRET || "super_secret_skillmatch_key_change_in_production";
    const decoded = jwt.verify(token, secret);
    
    // Attach decoded token payload (id, role) to the request object
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    res.status(401).json({ msg: "Token is not valid or has expired" });
  }
};

module.exports = authMiddleware;
