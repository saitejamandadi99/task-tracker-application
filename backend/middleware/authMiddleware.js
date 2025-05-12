const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info to req
      req.user = await User.findById(decoded.id).select('-password');
      console.log('authMiddleware → req.user:', req.user);


      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      return next(); // Ensure we stop here if all is well
    } catch (error) {
      console.error('Error in authMiddleware:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If token is missing or invalid format
  return res.status(401).json({ message: 'Not authorized, no token provided' });
};

module.exports = authMiddleware;
