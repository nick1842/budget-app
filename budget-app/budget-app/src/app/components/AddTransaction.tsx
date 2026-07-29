"use client";

import { useEffect, useState } from "react";

export default function AddTransaction({
  onTransactionAdded,
  editingTransaction,
  clearEditing,
}: {
  onTransactionAdded: () => void;
  editingTransaction: {
    id: number;
    amount: number;
    type: string;
    category: string;
    note: string | null;
  } | null;
  clearEditing: () => void;
}) {

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

const [date, setDate] = useState(
  new Date().toISOString().split("T")[0]
);

    useEffect(() => {
  if (editingTransaction) {
    setAmount(String(editingTransaction.amount));
    setType(editingTransaction.type);
    setCategory(editingTransaction.category);
    setNote(editingTransaction.note || "");
  }
}, [editingTransaction]);
  
  async function addTransaction() {
  setLoading(true);

  try {

    if (editingTransaction) {

      await fetch("/api/transactions", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  id: editingTransaction.id,
  amount: Number(amount),
  type,
  category,
  note,
  date,
}),
      });

    } else {

      await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  amount: Number(amount),
  type,
  category,
  note,
  date,
}),
      });

    }


    setAmount("");
    setCategory("");
    setNote("");

    clearEditing();
    onTransactionAdded();


  } finally {

    setLoading(false);

  }
}

  return (
    <div className="bg-zinc-900 rounded-2xl p-6 mt-8">

      <h2 className="text-xl font-bold mb-5">
        Add Transaction
      </h2>

    <input
  type="date"
  className="w-full bg-black rounded-xl p-3 mb-3"
  value={date}
  onChange={(e) => setDate(e.target.value)}
/>

      <input
        className="w-full bg-black rounded-xl p-3 mb-3"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />


      <select
        className="w-full bg-black rounded-xl p-3 mb-3"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >

        <option value="expense">
          Expense
        </option>

        <option value="income">
          Income
        </option>

      </select>


      <select
  className="w-full bg-black rounded-xl p-3 mb-3"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>

  <option value="">
    Select Category
  </option>

  <option value="food">
    🍔 Food
  </option>

  <option value="gas">
    ⛽ Gas
  </option>

  <option value="bills">
    🏠 Bills
  </option>

  <option value="shopping">
    🛒 Shopping
  </option>

  <option value="entertainment">
    🎮 Entertainment
  </option>

  <option value="school">
    🎓 School
  </option>

  <option value="income">
    💰 Income
  </option>

  <option value="other">
    💵 Other
  </option>

</select>

      <input
        className="w-full bg-black rounded-xl p-3 mb-3"
        placeholder="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />


      <button
  onClick={addTransaction}
  disabled={loading}
        className="bg-green-500 text-black font-bold rounded-xl px-5 py-3 disabled:opacity-50"
      >
        {loading
  ? "Saving..."
  : editingTransaction
    ? "Save Changes"
    : "Add"}
      </button>

    </div>
  );
  
}