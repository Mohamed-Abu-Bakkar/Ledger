import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { Link } from 'react-router-dom';

const ShopList = () => {
  const [shops, setShops] = useState([]);
  const [search, setSearch] = useState('');
  const [payment, setPayment] = useState({});

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

  const handleStatusChange = async (shopId, orderIndex, field, checked) => {
    try {
      const updatedOrder = { status: { [field]: checked } };
      await api.put(`/shops/${shopId}/orders/${orderIndex}`, updatedOrder);
      // Refetch shops after status change
      const res = await api.get('/shops');
      setShops(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTailorChange = async (shopId, orderIndex, value) => {
    try {
      await api.put(`/shops/${shopId}/orders/${orderIndex}`, { tailorName: value });
      // Refetch shops after tailor change
      const res = await api.get('/shops');
      setShops(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteShop = async (shopId) => {
    try {
      await api.delete(`/shops/${shopId}`);
      // Refetch shops after delete
      const res = await api.get('/shops');
      setShops(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  };

  const handlePaymentSubmit = async (shopId) => {
    try {
      await api.post(`/shops/${shopId}/payments`, payment[shopId]);
      setPayment(prev => ({ ...prev, [shopId]: {} }));
      alert('Payment recorded!');
      // Refetch shops after payment
      const res = await api.get('/shops');
      setShops(res.data);
    } catch (err) {
      console.error(err);
      alert('Payment failed');
    }
  };

  const calculateRemainingCredit = (shop) => {
    const debitTotal = shop.orders.reduce((acc, o) => acc + Number(o.debitAmount || 0), 0);
    return (shop.credit || 0) - debitTotal;
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-white min-w-screen'>
    <div className="flex items-center justify-center min-h-screen bg-green-100 ml-100 mr-100 w-full">
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className="bg-green-300 hover:bg-green-800 text-green-50 px-5 py-2 rounded-lg font-semibold shadow transition"
        >
          🏠 Home
        </Link>
      </div>
      <div className="w-full min-h-screen py-8 flex justify-center ml-40 mr-40">
        <div className="max-w-6xl w-full mx-auto p-6 bg-green-200 rounded-2xl shadow-2xl border border-green-400">
          <h2 className="text-4xl font-extrabold mb-10 text-green-900 tracking-tight text-center py-6 rounded-xl shadow border border-green-300 bg-green-100">
            Shop List
          </h2>

          <div className="mb-8">
            <input
              type="text"
              placeholder="Search by shop name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-4 rounded-xl border border-green-400 shadow-md outline-none focus:ring-2 focus:ring-green-400 text-lg bg-green-50 text-green-900 placeholder-green-700"
            />
          </div>

          {shops
            .filter(shop => shop.shopName.toLowerCase().includes(search.toLowerCase()))
            .map((shop, idx) => (
              <div key={idx} className="border border-green-300 rounded-2xl p-8 mb-10 shadow-xl bg-green-50">
                <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="font-bold text-2xl text-green-800 mb-1">{shop.shopName}</p>
                    <p className="text-base text-green-700">{shop.address}</p>
                    <p className="text-base text-green-700">Phone: {shop.phoneNumber}</p>
                    <p className="text-base text-green-700">Date: {new Date(shop.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right space-y-3">
                    <p className="text-xl text-green-900 font-bold bg-green-200 px-6 py-3 rounded-lg shadow inline-block">
                      Remaining Credit: ₹{calculateRemainingCredit(shop)}
                    </p>
                    <button
                      onClick={() => handleDeleteShop(shop._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 font-semibold"
                    >
                      🗑️ Delete Shop
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {shop.orders.map((order, i) => {
                    const isClosed = order.status?.['paymentReceived'];
                    return (
                      <div key={i} className={`border border-green-200 p-5 rounded-xl bg-green-100 shadow-md ${isClosed ? 'opacity-60 bg-gray-200' : ''}`}>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <p className={`font-semibold text-lg ${isClosed ? 'text-gray-500 line-through' : 'text-green-800'}`}>{order.item}</p>
                            <p className={`text-base ${isClosed ? 'text-gray-500 line-through' : 'text-green-700'}`}>Debit: ₹{order.debitAmount}</p>
                          </div>
                          <div className="flex gap-4 flex-wrap mt-2 md:mt-0">
                            {['material', 'printing', 'stitching', 'parcelled', 'delivered','paymentReceived'].map((stage) => (
                              <label key={stage} className="text-sm capitalize text-green-900 flex items-center gap-1">
                                <input
                                  type="checkbox"
                                  checked={order.status?.[stage]}
                                  onChange={(e) => handleStatusChange(shop._id, i, stage, e.target.checked)}
                                  className="accent-green-600"
                                />
                                {stage === 'paymentReceived' ? 'payment recieved' : stage}
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4">
                          <input
                            type="text"
                            placeholder="Tailor Name"
                            defaultValue={order.tailorName}
                            onBlur={(e) => handleTailorChange(shop._id, i, e.target.value)}
                            className="border border-green-300 p-3 rounded-lg w-full bg-green-50 text-green-900 placeholder-green-700 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition outline-none shadow-sm"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 bg-green-50 p-5 rounded-xl border border-green-300">
                  <p className="font-semibold text-green-800 mb-3 text-lg">💰 Record Payment</p>
                  <div className="flex flex-col md:flex-row gap-4">
                    <input
                      type="text"
                      placeholder="Amount Paid"
                      value={payment[shop._id]?.amount || ''}
                      onChange={(e) =>
                        setPayment(prev => ({
                          ...prev,
                          [shop._id]: { ...prev[shop._id], amount: e.target.value },
                        }))
                      }
                      className="border border-green-300 p-3 rounded-lg w-full bg-green-50 text-green-900 placeholder-green-700 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition outline-none shadow-sm"
                    />
                    <input
                      type="date"
                      value={payment[shop._id]?.date || ''}
                      onChange={(e) =>
                        setPayment(prev => ({
                          ...prev,
                          [shop._id]: { ...prev[shop._id], date: e.target.value },
                        }))
                      }
                      className="border border-green-300 p-3 rounded-lg w-full bg-green-50 text-green-900 placeholder-green-700 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition outline-none shadow-sm"
                    />
                    <button
                      onClick={() => handlePaymentSubmit(shop._id)}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold shadow"
                    >
                      Save Payment
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ShopList;