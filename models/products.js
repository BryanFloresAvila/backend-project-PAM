const mongoose = require('mongoose');
const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: 'default.jpg',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'categories',
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
  }
);
const Products = mongoose.model('products', productsSchema);

module.exports = Products;
