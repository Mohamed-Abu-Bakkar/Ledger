const LorryService = require('../models/lorryservice');
// POST /api/lorryservices
const addLorryService = async (req, res) => {
  try {
    const { serviceName, phoneNumber, address, charges, services } = req.body;
    const newService = new LorryService({
      serviceName,
      phoneNumber,
      address,
      charges,
      services: Array.isArray(services) ? services : (typeof services === 'string' ? services.split(',').map(s => s.trim()) : [])
    });
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

// GET /api/lorryservices
const getLorryServices = async (req, res) => {
  try {
    const services = await LorryService.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/lorryservices/:id
const updateLorryService = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedService = await LorryService.findByIdAndUpdate (id, req.body, { new: true });
    if (!updatedService) return res.status(404).json({ message: 'Service not found' }); 
    res.json(updatedService);
    }
    catch (err) {
    res.status(400).json({ error: err.message });
  }
}
// DELETE /api/lorryservices/:id
const deleteLorryService = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await LorryService.findByIdAndDelete(id);
    if (!deletedService) return res.status(404).json({ message: 'Service not found' });
    res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addLorryService,
  getLorryServices,
  updateLorryService,
  deleteLorryService
};