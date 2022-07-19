const { verifyToken } = require('../utils/handlerJWT');
const users = require('../models/users');
const authMiddleware = async (req, res, next) => {
  if(!req.headers.authorization) {
    return res.status(401).json({
      message: 'No token provided'
    });
  }
  const token = req.get('Authorization').split(' ')[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
  if(decoded.role !== 'admin') {
    return res.status(401).json({
      message: 'You are not admin',
    });
  }
  //The error in the following query needs to be handled
  const user = await users.findById(decoded._id);
  req.user = user;
  next();
};
module.exports = { authMiddleware };
