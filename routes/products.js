const express = require('express');
const router = express.Router();
const { validatorProducts } = require('../utils/handlerValidators/products');
const {
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  getProducts,
} = require('../controllers/products');
const uploadImageMiddleware = require('../middlewares/products');
router.post('/create', uploadImageMiddleware, validatorProducts, createProduct);
router.delete('/:productId', deleteProduct);
router.put('/:productId', uploadImageMiddleware, updateProduct);
router.get('/:productId', getProduct);
router.get('/', getProducts);
module.exports = router;
