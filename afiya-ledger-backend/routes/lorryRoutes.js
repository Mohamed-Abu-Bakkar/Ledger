const express = require('express');
const router = express.Router();
const {
  addLorryService,
  getLorryServices,
  
  updateLorryService,
  deleteLorryService,
  
} = require('../controllers/lorryController');

// POST /api/lorryservices
router.post('/', addLorryService);  
// GET /api/lorryservices
router.get('/', getLorryServices);
// POST /api/lorryservices/:lorryId/orders
//router.post('/:lorryId/orders', addOrderToLorryService);
// PUT /api/lorryservices/:lorryId/orders/:orderIndex
//router.put('/:lorryId/orders/:orderIndex', updateOrderStatus);
router.put('/:id', updateLorryService);
// DELETE /api/lorryservices/:id
router.delete('/:id', deleteLorryService);
// POST /api/lorryservices/:id/payments
//router.post('/:id/payments', addPayment);

module.exports = router;