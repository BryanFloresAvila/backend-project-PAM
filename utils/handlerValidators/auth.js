const { check } = require('express-validator');
const validateResults = require('./validateResults');
const validatorLogin = [
  check('email').exists().notEmpty().withMessage('Email is required'),
  check('password').exists().notEmpty().withMessage('Password is required'),
  validateResults,
];

module.exports = { validatorLogin };
