const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middlewares/session');
const { validatorProducts } = require('../utils/handlerValidators/products');
const {
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  getProducts,
} = require('../controllers/products');
const uploadImageMiddleware = require('../middlewares/products');
router.post('/create',authMiddleware, uploadImageMiddleware, validatorProducts, createProduct);
router.delete('/:productId',authMiddleware, deleteProduct);
router.put('/:productId',authMiddleware, uploadImageMiddleware, updateProduct);
router.get('/:productId', getProduct);
router.get('/', getProducts);
module.exports = router;
