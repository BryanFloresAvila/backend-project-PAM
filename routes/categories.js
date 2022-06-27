const express = require('express');
const router = express.Router();
const {
  createCategory,
  deleteCategory,
  updateCategory,
} = require('../controllers/categories');
router.post('/create', createCategory);
router.delete('/:categoryId', deleteCategory);
router.put('/:categoryId', updateCategory);
router.get('/:categoryId', updateCategory);
router.get('/', updateCategory);
module.exports = router;
