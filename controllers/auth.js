const users = require('../models/users');
const { tokenSign, verifyToken } = require('../utils/handlerJWT');
const { encrypt, compare } = require('../utils/handlerPassword');
const register = async (req, res) => {
  try {
    const { name, email, password, rol } = req.body;
    const passwordEncrypt = await encrypt(password);
    const user = {
      name,
      email,
      password: passwordEncrypt,
      rol: rol ? rol : 'user',
    };
    const data = await users.create(user);
    data.set('password', undefined, { strict: false });
    res.json({
      token: tokenSign(data),
      user: data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid password',
      });
    }
    user.set('password', undefined, { strict: false });
    res.send({
      token: tokenSign(user),
      user,
    });
  } catch (error) {}
};
const verifyTokenAdmin = (req, res) => {
  try {
    if(!req.headers.authorization) {
      return res.status(401).json({
        message: 'No token provided'
      });
    }
    const token = req.headers.authorization.split(' ')[1];
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
    res.send(decoded);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  verifyTokenAdmin,
};
