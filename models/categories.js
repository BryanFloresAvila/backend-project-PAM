const mongoose = require('mongoose');
const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },
  },
  { timestamps: true, versionKey: false }
);
const Categories = mongoose.model('categories', categoriesSchema);

module.exports = Categories;
