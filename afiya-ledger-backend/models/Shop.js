// models/Shop.js
const mongoose = require('mongoose');
const orderSchema = require('./Order');

const shopSchema = new mongoose.Schema({
  payments: [
  {
    amount: { type: Number, required: true },
    date: { type: Date, required: true }
  }
]
,
  shopName: { type: String, required: true },
  address: { type: String },
  phoneNumber: { type: String },
  date: { type: Date, default: Date.now },
  credit: { type: Number, default: 0 },
  orders: [orderSchema]
  
});

module.exports = mongoose.model('Shop', shopSchema);
