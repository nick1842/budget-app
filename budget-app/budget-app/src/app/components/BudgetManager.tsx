"use client";

import { useEffect, useState } from "react";


const categories = [
  {
    value: "food",
    label: "🍔 Food",
  },
  {
    value: "gas",
    label: "⛽ Gas",
  },
  {
    value: "bills",
    label: "🏠 Bills",
  },
  {
    value: "shopping",
    label: "🛒 Shopping",
  },
  {
    value: "entertainment",
    label: "🎮 Entertainment",
  },
  {
    value: "school",
    label: "🎓 School",
  },
  {
    value: "other",
    label: "💵 Other",
  },
];


export default function BudgetManager({
  onBudgetChanged,
  editingBudget,
  clearEditing,
}: {
  onBudgetChanged: () => void;
  editingBudget?: any;
  clearEditing: () => void;
}) {

  const [category, setCategory] = useState(
  editingBudget?.category || "food"
);

const [amount, setAmount] = useState(
  editingBudget?.amount?.toString() || ""
);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  if (editingBudget) {
    setCategory(editingBudget.category);
    setAmount(editingBudget.amount.toString());
  }
}, [editingBudget]);

  async function saveBudget() {
    if (!amount || Number(amount) <= 0) {
  return;
}

  console.log("Saving budget:", {
    category,
    amount: Number(amount),
  });


    setLoading(true);

    try {

      await fetch("/api/budgets", {
  method: editingBudget ? "PUT" : "POST",

  headers: {
    "Content-Type": "application/json",
  },

  body: JSON.stringify({
    id: editingBudget?.id,
    category,
    amount: Number(amount),
  }),
});


      setAmount("");
clearEditing();
onBudgetChanged();
    } finally {

      setLoading(false);

    }
  }


  return (
    <div className="bg-zinc-900 rounded-2xl p-6 mt-8">

      <h2 className="text-xl font-bold mb-5">
  {editingBudget ? "Edit Weekly Budget" : "Set Weekly Budget"}
</h2>


      <select
        className="w-full bg-black rounded-xl p-3 mb-3"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >

        {categories.map((item) => (
          <option
            key={item.value}
            value={item.value}
          >
            {item.label}
          </option>
        ))}

      </select>


      <input
  className="w-full bg-black text-white rounded-xl p-3 mb-3"
  placeholder="Amount"
  type="number"
  inputMode="decimal"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
/>


      <button
        onClick={saveBudget}
        disabled={loading}
        className="bg-green-500 text-black font-bold rounded-xl px-5 py-3 disabled:opacity-50"
      >
        {loading
  ? "Saving..."
  : editingBudget
  ? "Update Budget"
  : "Save Budget"}
      </button>

      {editingBudget && (
  <button
    onClick={clearEditing}
    className="ml-3 text-gray-400"
  >
    Cancel
  </button>
)}

    </div>
  );
}