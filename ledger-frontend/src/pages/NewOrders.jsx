import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { Link } from "react-router-dom";
const NewOrders = () => {
  const [shops, setShops] = useState([]);
  const [newOrder, setNewOrder] = useState({});

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await api.get('/shops');
        setShops(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchShops();
    // Refetch shops every 5 seconds for auto-refresh
    const interval = setInterval(fetchShops, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleOrderChange = (shopId, field, value) => {
    setNewOrder({
      ...newOrder,
      [shopId]: {
        ...newOrder[shopId],
        [field]: value,
      },
    });
  };

  const submitNewOrder = async (shopId) => {
    const order = newOrder[shopId];
    if (!order || !order.item || !order.debitAmount) {
      alert('Fill both item and debit amount');
      return;
    }

    try {
      await api.post(`/shops/${shopId}/orders`, order);
      alert('Order added');
      setNewOrder({ ...newOrder, [shopId]: {} });
      // Refetch shops after adding order
      const res = await api.get('/shops');
      setShops(res.data);
    } catch (err) {
      console.error(err);
      alert('Error adding order');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white min-w-screen">
        <div className="absolute top-6 left-6 z-20">
                <Link
                  to="/"
                  className="bg-green-300 hover:bg-green-800 text-green-50 px-5 py-2 rounded-lg font-semibold shadow transition"
                >
                  🏠 Home
                </Link>
              </div>
    <div className="min-h-screen bg-green-100 py-8 ml-100 mr-100 w-full">
      <div className="max-w-5xl mx-auto p-4 ml-40 mr-40 bg-green-200 rounded-2xl shadow-xl border border-green-400">
        <h2 className="text-3xl font-extrabold mb-8 text-green-900 tracking-tight text-center bg-green-200 py-4 rounded-xl shadow border border-green-300">
          Add New Orders
        </h2>
        {shops.map((shop, idx) => (
          <div key={idx} className="border border-green-300 rounded-2xl p-6 mb-8 shadow-lg bg-green-50">
            <p className="font-bold text-xl text-green-800 mb-2">{shop.shopName}</p>
            <div className="mt-2 space-y-1">
              {shop.orders.map((order, i) => (
                <p key={i} className="text-sm text-green-700 flex items-center gap-2">🔹 <span>{order.item}</span> <span className='font-semibold'>₹{order.debitAmount}</span></p>
              ))}
            </div>
            <div className="mt-6 bg-green-100 p-4 rounded-xl border border-green-200 shadow-sm">
              <p className="font-medium mb-3 text-green-900">New Order</p>
              <input
                type="text"
                placeholder="Order Item"
                value={newOrder[shop._id]?.item || ''}
                onChange={(e) => handleOrderChange(shop._id, 'item', e.target.value)}
                className="border border-green-400 p-3 mb-3 w-full rounded-lg bg-green-50 text-green-900 placeholder-green-700 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition outline-none shadow-sm"
              />
              <input
                type="number"
                placeholder="Debit Amount"
                value={newOrder[shop._id]?.debitAmount || ''}
                onChange={(e) => handleOrderChange(shop._id, 'debitAmount', e.target.value)}
                className="border border-green-400 p-3 mb-3 w-full rounded-lg bg-green-50 text-green-900 placeholder-green-700 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition outline-none shadow-sm"
              />
              <button
                className="bg-green-700 hover:bg-green-800 text-green-50 px-6 py-2 rounded-lg font-semibold shadow-md transition w-full"
                onClick={() => submitNewOrder(shop._id)}
              >
                ➕ Add Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default NewOrders;
