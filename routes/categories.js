const express = require('express');
const {authMiddleware} = require('../middlewares/session');
const router = express.Router();
const {
  createCategory,
  deleteCategory,
  updateCategory,
  getCategories,
  getCategory,
} = require('../controllers/categories');
router.post('/create',authMiddleware, createCategory);
router.delete('/:categoryId',authMiddleware, deleteCategory);
router.put('/:categoryId',authMiddleware, updateCategory);
router.get('/:categoryId', getCategory);
router.get('/', getCategories);
module.exports = router;
