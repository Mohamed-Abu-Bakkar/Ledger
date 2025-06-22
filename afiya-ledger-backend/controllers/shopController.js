const Shop = require('../models/Shop');

// DELETE /api/shops/:id
const deleteShop = async (req, res) => {
  try {
    const deleted = await Shop.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Shop not found' });
    res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//post/api/lorryservices/name/service


// POST /api/shops/:id/payments
const addPayment = async (req, res) => {
  try {
    const { amount, date } = req.body;
    const shop = await Shop.findById(req.params.id);
    if (!shop) return res.status(404).json({ message: 'Shop not found' });

    shop.payments.push({ amount, date });
    shop.credit = (shop.credit || 0) + Number(amount); // Optional: adjust credit
    await shop.save();

    res.status(200).json({ message: 'Payment added' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// POST /api/shops
const addShop = async (req, res) => {
  try {
    const newShop = new Shop(req.body);
    const saved = await newShop.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /api/shops
const getShops = async (req, res) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/shops/:shopId/orders
const addOrderToShop = async (req, res) => {
  try {
    const { shopId } = req.params;
    const shop = await Shop.findById(shopId);
    if (!shop) return res.status(404).json({ error: "Shop not found" });

    shop.orders.push(req.body);
    await shop.save();

    res.status(201).json(shop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /api/shops/:shopId/orders/:orderIndex
const updateOrderStatus = async (req, res) => {
  try {
    const { shopId, orderIndex } = req.params;
    const updatedFields = req.body;

    const shop = await Shop.findById(shopId);
    if (!shop) return res.status(404).json({ error: "Shop not found" });

    const order = shop.orders[orderIndex];
    if (!order) return res.status(404).json({ error: "Order not found" });

    // Update fields like status, tailorName, debitAmount
    Object.assign(order, updatedFields);

    await shop.save();
    res.json(shop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getShops,
  addShop,
  addOrderToShop,
  updateOrderStatus,
  deleteShop,
  addPayment

};
