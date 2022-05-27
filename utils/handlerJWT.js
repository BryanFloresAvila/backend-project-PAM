const jsonwebtoken = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
/**
 * @param  {Object} user
 * @return {String}
 * TODO: generate token
 */
const tokenSign = (user) => {
  const token = jsonwebtoken.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    JWT_SECRET
  );
  return token;
};
/**
 * @param  {String} token
 * TODO: verify token, return false if token is invalid and return user if token is valid
 */
const verifyToken = (token) => {
  jsonwebtoken.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return false;
    return decoded;
  });
};
