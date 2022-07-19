const express = require('express');
const router = express.Router();
const { validatorLogin } = require('../utils/handlerValidators/auth');
const { register, login, verifyTokenAdmin } = require('../controllers/auth');
router.post('/register', register);
router.post('/login', validatorLogin, login);
router.post('/verifyTokenAdmin', verifyTokenAdmin);

module.exports = router;
