const categories = require('../models/categories');

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = new categories({ name, description });
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
  } catch (error) {
    console.log(JSON.stringify(error.message));
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Category already exists',
      });
    } else {
      return res.status(400).json({
        message: 'Error creating category',
      });
    }
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const response = await categories.findByIdAndDelete(categoryId);
    if (!response) {
      return res.status(400).json({
        message: 'Error deleting category',
      });
    }
    res.json({
      message: 'Category deleted',
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error deleting category',
    });
  }
};
const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, description } = req.body;
    const response = await categories.findByIdAndUpdate(
      categoryId,
      { name, description },
      { new: true }
    );
    if (!response) {
      return res.status(400).json({
        message: 'Error updating category',
      });
    }
    res.json({
      message: 'Category updated',
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error updating category',
    });
  }
};
module.exports = { createCategory, deleteCategory, updateCategory };
