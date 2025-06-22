import React from "react";

const OrderField = ({ index, order, handleChange, remove }) => {
  return (
    <div className="border p-4 mb-2 rounded-xl bg-green-200 shadow-sm">
      <input
        type="text"
        name="item"
        placeholder="Order Item"
        value={order.item}
        onChange={(e) => handleChange(index, "item", e.target.value)}
        className="w-full p-3 mb-3 border border-green-400 rounded-lg bg-green-50 text-green-900 placeholder-green-700 focus:ring-2 focus:ring-green-600 focus:border-green-600 transition outline-none shadow-sm"
      />
      <input
        type="number"
        name="debitAmount"
        placeholder="Debit Amount"
        value={order.debitAmount}
        onChange={(e) => handleChange(index, "debitAmount", e.target.value)}
        className="w-full p-3 mb-3 border border-green-400 rounded-lg bg-green-50 text-green-900 placeholder-green-700 focus:ring-2 focus:ring-green-600 focus:border-green-600 transition outline-none shadow-sm"
      />
      <button
        type="button"
        onClick={() => remove(index)}
        className="text-red-500 text-sm hover:underline"
      >
        Remove
      </button>
    </div>
  );
};

export default OrderField;
