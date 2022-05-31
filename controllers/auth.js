const users = require('../models/users');
const { tokenSign, verifyToken } = require('../utils/handlerJWT');
const { encrypt, compare } = require('../utils/handlerPassword');
const { validatorLogin } = require('../utils/handlerValidators/auth');
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const passwordEncrypt = await encrypt(password);
    const user = {
      name,
      email,
      password: passwordEncrypt,
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
module.exports = {
  register,
  login,
};
