require('dotenv').config();
const jwt = require("jsonwebtoken");

function adminAuth(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
        if (decoded.isAdmin) {
          req.user = decoded;
          return next();
        } else {
          return res.status(403).json({ error: "Forbidden" });
        }
      } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }
    }
    
    module.exports = adminAuth;