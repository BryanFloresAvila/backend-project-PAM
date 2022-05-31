const { validationResult } = require('express-validator');
const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    res.status(400).json({
      message: err.array(),
    });
  }
};
module.exports = validateResults;
