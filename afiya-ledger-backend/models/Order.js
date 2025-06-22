// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  item: { type: String, required: true },        // Description of the item ordered
  status: {
    material: { type: Boolean, default: false },
    printing: { type: Boolean, default: false },
    stitching: { type: Boolean, default: false },
    parcelled: { type: Boolean, default: false },
    delivered: { type: Boolean, default: false },
    paymentReceived: { type: Boolean, default: false }
  },
  tailorName: { type: String, default: '' },
  debitAmount: { type: Number, default: 0 }
});

module.exports = orderSchema; // not a model, just the schema
