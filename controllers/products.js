const products = require('../models/products');
const fs = require('fs');
const createProduct = async (req, res) => {
  try {
    const file = req.file;
    let data = JSON.parse(JSON.stringify(req.body));
    let image = 'default.jpg';
    if (file != undefined) image = file.filename;
    data.image = image;
    const product = new products(data);
    const response = await products.create(product);

    if (!response) {
      return res.status(400).json({
        message: 'Error creating product',
      });
    }
    res.json({
      message: 'Product created',
      data: response,
    });
  } catch (error) {
    console.log(JSON.stringify(error.message));
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Product already exists',
      });
    } else {
      return res.status(400).json({
        message: 'Error creating product',
      });
    }
  }
};
const deleteProduct = async (req, res) => {
  try {
    const response = await products.findByIdAndDelete(req.params.productId);
    if (!response) {
      return res.status(400).json({
        message: 'Product not found',
      });
    }
    res.json({
      message: 'Product deleted',
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error deleting product',
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const idProduct = req.params.productId;
    if (!idProduct)
      return res.status(400).json({
        message: 'Product ID is required',
      });
    const file = req.file;
    let data = JSON.parse(JSON.stringify(req.body));
    let image = '';
    console.log(file);
    if (file != undefined) {
      image = file.filename;
      console.log(image);
      try {
        if (data.oldImage != 'default.jpg') {
          fs.unlinkSync(`./uploads/products/${data.oldImage}`);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      image = data.oldImage;
    }
    data.image = image;
    console.log(data);
    const response = await products.findByIdAndUpdate(idProduct, data, { new: true });
    if (!response) {
      return res.status(400).json({
        message: 'Error updating category',
      });
    }
    res.json({
      message: 'Product updated',
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error updating product',
    });
  }
};
const getProduct = async (req, res) => {
  try {
    const response = await products.findById(req.params.productId);
    if (!response) {
      return res.status(400).json({
        message: 'Error getting product',
      });
    }
    res.json({
      message: 'Product retrieved',
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error getting product',
    });
  }
};
const getProducts = async (req, res) => {
  try {
    const response = await products.find();
    if (!response) {
      return res.status(400).json({
        message: 'Error getting products',
      });
    }
    res.json({
      message: 'Products retrieved',
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error getting products',
    });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  getProducts,
};
