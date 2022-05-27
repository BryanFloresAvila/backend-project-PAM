const users = require('../models/users');
const { tokenSign, verifyToken } = require('../utils/handlerJWT');
const { encrypt, compare } = require('../utils/handlerPassword');

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
    const dataError = error.errors;
    let errorMessage = Object.keys(dataError).map((key) => dataError[key].message);
    errorMessage = errorMessage.shift();
    res.status(400).json({
      message: errorMessage,
    });
  }
};

module.exports = {
  register,
};
