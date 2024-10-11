const mongoose = require('mongoose');

const { Schema } = mongoose;

const clothingSchema = require("./Clothing")

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  products: [clothingSchema],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true 
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
