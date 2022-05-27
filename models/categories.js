const mongoose = require('mongoose');
const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
});
const Categories = mongoose.model('categories', categoriesSchema);

module.exports = Categories;
