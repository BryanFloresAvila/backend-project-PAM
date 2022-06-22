const express = require('express');
const router = express.Router();
const categories = require('../models/categories');
router.post('/', async (req, res) => {
  const { name, icon, color } = req.body;
  const category = new categories({ name, icon, color });
  const response = await categories.create(category);
  if (!response) {
    return res.status(400).json({
      message: 'Error creating category',
    });
  }
  res.json({
    message: 'Category created',
    data: response,
  });
});

module.exports = router;
