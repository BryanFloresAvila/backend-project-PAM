const express = require('express');
const router = express.Router();
const {
  createCategory,
  deleteCategory,
  updateCategory,
  getCategories,
  getCategory,
} = require('../controllers/categories');
router.post('/create', createCategory);
router.delete('/:categoryId', deleteCategory);
router.put('/:categoryId', updateCategory);
router.get('/:categoryId', getCategory);
router.get('/', getCategories);
module.exports = router;
