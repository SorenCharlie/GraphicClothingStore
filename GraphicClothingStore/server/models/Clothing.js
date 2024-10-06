const mongoose = require('mongoose');

const { Schema } = mongoose;

const clothingSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  graphics: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
});

// const Clothing = mongoose.model('Clothing', clothingSchema);

module.exports = clothingSchema;
