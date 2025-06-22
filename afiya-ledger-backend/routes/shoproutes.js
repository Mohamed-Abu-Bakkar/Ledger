const express = require('express');
const router = express.Router();
const {
  addShop,
  getShops,
  addOrderToShop,
  updateOrderStatus,
  deleteShop,
  addPayment,
  
} = require('../controllers/shopController');



// POST /api/shops
router.post('/', addShop);

// GET /api/shops
router.get('/', getShops);

// POST /api/shops/:shopId/orders
router.post('/:shopId/orders', addOrderToShop);

// PUT /api/shops/:shopId/orders/:orderIndex
router.put('/:shopId/orders/:orderIndex', updateOrderStatus);

// DELETE /api/shops/:id
router.delete('/:id', deleteShop);

// POST /api/shops/:id/payments
router.post('/:id/payments', addPayment);


module.exports = router;
