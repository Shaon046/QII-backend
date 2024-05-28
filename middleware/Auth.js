const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

  // Check if token is not provided
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  try {
    // Verify the token
    const secretKey = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secretKey);

    // Attach user to request object
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
