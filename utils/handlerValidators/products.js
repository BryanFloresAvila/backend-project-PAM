const { body } = require('express-validator');
const validateResults = require('./validateResults');
const validatorProducts = [
  body('name').exists().notEmpty().withMessage('Name is required'),
  body('price').exists().notEmpty().withMessage('Price is required'),
  body('description').exists().notEmpty().withMessage('Description is required'),
  body('category').exists().notEmpty().isMongoId().withMessage('Category is required'),
  body('stock')
    .exists()
    .notEmpty()
    .isInt({ min: 0, max: 100 })
    .withMessage('Stock is required'),
  validateResults,
];

module.exports = { validatorProducts };
