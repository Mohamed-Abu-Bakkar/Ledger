const mongoose = require('mongoose');

const lorryServiceSchema = new mongoose.Schema({
    serviceName: { type: String, required: true }, // Name of the lorry service
    phoneNumber: { type: String, default: 0 }, // Contact number for the service
    address: { type: String,  default:0 }, // Address of the service
    date: { type: Date, default: Date.now }, // Date when the service was added
    charges: { type: Number, default: 0 }, // Charges for the service
    services:{ type: [String], required: true }, // List of services provided by the lorry service
    // Charges per trip for the service
});
module.exports = mongoose.model('LorryService', lorryServiceSchema);