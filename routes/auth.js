const express = require('express');
const router = express.Router();
const { validatorLogin } = require('../utils/handlerValidators/auth');
const { register, login } = require('../controllers/auth');
router.post('/register', (req, res) => {
  register(req, res);
});
router.post('/login', validatorLogin, login);
router.get('/confirm/:confirmationCode', (req, res) => {});

module.exports = router;
