const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
  },
});

const OrderItems = mongoose.model('orderItems', orderItemSchema);

module.exports = OrderItems;
