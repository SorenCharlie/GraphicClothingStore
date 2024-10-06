const mongoose = require('mongoose');

const { Schema } = mongoose;

const clothingSchema = require("./Clothing")

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  products: [clothingSchema]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
