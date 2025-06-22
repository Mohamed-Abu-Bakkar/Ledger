import React, { useState } from "react";
import OrderField from "../components/OrderField";
import { api } from "../api";
import { Link } from "react-router-dom";

const AddShop = () => {
  const [shop, setShop] = useState({
    shopName: "",
    address: "",
    phoneNumber: "",
    date: "",
    credit: "",
    orders: [],
  });

  const handleShopChange = (field, value) => {
    setShop({ ...shop, [field]: value });
  };

  const handleOrderChange = (index, field, value) => {
    const updatedOrders = [...shop.orders];
    updatedOrders[index][field] = value;
    setShop({ ...shop, orders: updatedOrders });
  };

  const addOrderField = () => {
    setShop({
      ...shop,
      orders: [...shop.orders, { item: "", debitAmount: 0 }],
    });
  };

  const removeOrderField = (index) => {
    const updatedOrders = [...shop.orders];
    updatedOrders.splice(index, 1);
    setShop({ ...shop, orders: updatedOrders });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/shops", shop);
      alert("Shop added successfully!");
      setShop({
        shopName: "",
        address: "",
        phoneNumber: "",
        date: "",
        credit: 0,
        orders: [],
      });
    } catch (err) {
      console.error(err);
      alert("Error adding shop.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100 min-w-screen">
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className="bg-green-300 hover:bg-green-500 px-5 py-2 rounded-lg font-semibold shadow transition"
        >
          🏠 Home
        </Link>
      </div>
        <div className=" p-4 sm:p-8 bg-green-200 rounded-2xl shadow-xl border border-green-400 ml-40 mr-40 w-1/2">
          <h2 className="text-3xl font-extrabold mb-8 text-green-900 tracking-tight text-center">
            Add New Shop
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 ml-40 mr-40 flex flex-col items-center "
          >
            <div className="flex flex-col gap-6">
              <input
                type="text"
                placeholder="Shop Name"
                value={shop.shopName}
                onChange={(e) => handleShopChange("shopName", e.target.value)}
                className=" p-3 border border-green-400 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition outline-none bg-green-50 text-green-900 placeholder-green-700 shadow-sm "
              />
              <input
                type="text"
                placeholder="Address"
                value={shop.address}
                onChange={(e) => handleShopChange("address", e.target.value)}
                className="w-full p-3 border border-green-400 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition outline-none bg-green-50 text-green-900 placeholder-green-700 shadow-sm"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={shop.phoneNumber}
                onChange={(e) =>
                  handleShopChange("phoneNumber", e.target.value)
                }
                className="w-full p-3 border border-green-400 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition outline-none bg-green-50 text-green-900 placeholder-green-700 shadow-sm"
              />
              <input
                type="date"
                value={shop.date}
                onChange={(e) => handleShopChange("date", e.target.value)}
                className="w-full p-3 border border-green-400 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition outline-none bg-green-50 text-green-900 placeholder-green-700 shadow-sm"
              />
              <input
                type="text"
                placeholder="Advance Amount"
                value={shop.credit}
                onChange={(e) => handleShopChange("credit", e.target.value)}
                className="w-full p-3 border border-green-400 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 transition outline-none bg-green-50 text-green-900 placeholder-green-700 shadow-sm"
              />
            </div>
            <div className="mt-8 bg-green-300 rounded-xl p-6 border border-green-400 shadow-sm w-full">
              <h3 className="text-xl font-semibold mb-4 text-green-900 flex items-center gap-2">
                <span className="inline-block w-2 h-6 bg-green-700 rounded-full mr-2"></span>
                Orders
              </h3>
              <div className="">
                {shop.orders.map((order, index) => (
                  <OrderField
                    key={index}
                    index={index}
                    order={order}
                    handleChange={handleOrderChange}
                    remove={removeOrderField}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={addOrderField}
                className="mt-4 px-4 py-2 bg-green-500 text-green-50 font-medium rounded-lg border border-green-700 hover:bg-green-600 transition"
              >
                + Add Order
              </button>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-green-50 px-8 py-3 rounded-lg font-semibold shadow-md transition"
              >
                Save Shop
              </button>
            </div>
          </form>
        
      </div>
    </div>
  );
};

export default AddShop;
