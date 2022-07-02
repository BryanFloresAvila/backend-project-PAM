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
// missing validation
const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, description } = req.body;
    const response = await categories.findByIdAndUpdate(categoryId, { name }, { new: true });
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

const getCategories = async (req, res) => {
  try {
    const response = await categories.find().select('name');
    if (!response) {
      return res.status(400).json({
        message: 'Error getting categories',
      });
    }
    res.json({
      message: 'Categories retrieved',
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error getting categories',
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const response = await categories.findById(categoryId).select('name');
    if (!response) {
      return res.status(400).json({
        message: 'Error getting category',
      });
    }
    res.json({
      message: 'Category retrieved',
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error getting category',
    });
  }
};

module.exports = {
  createCategory,
  deleteCategory,
  updateCategory,
  getCategories,
  getCategory,
};
