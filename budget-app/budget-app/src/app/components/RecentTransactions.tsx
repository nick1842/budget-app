"use client";

import { useEffect, useState } from "react";

const categoryIcons: Record<string, string> = {
  food: "🍔",
  gas: "⛽",
  bills: "🏠",
  shopping: "🛒",
  entertainment: "🎮",
  school: "🎓",
  income: "💰",
  other: "💵",
};

type Transaction = {
  id: number;
  amount: number;
  type: string;
  category: string;
  note: string | null;
  date: string;
};


export default function RecentTransactions({
  refresh,
  onTransactionChanged,
  onEdit,
}: {
  refresh: number;
  onTransactionChanged: () => void;
  onEdit: (transaction: any) => void;
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function deleteTransaction(id: number) {

if (!confirm("Are you sure you want to delete this transaction?")) {
  return;
}

  const response = await fetch("/api/transactions", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  });


  if (!response.ok) {
  const error = await response.text();
  console.error("Delete failed:", error);
  return;
}

  onTransactionChanged();
}

  useEffect(() => {

    async function loadTransactions() {

      const response = await fetch("/api/transactions");

      const data = await response.json();

      setTransactions(data);

    }

    loadTransactions();

  }, [refresh]);


  return (
    <div className="bg-zinc-900 rounded-2xl p-6 mt-8">

      <h2 className="text-xl font-bold mb-5">
        Recent Transactions
      </h2>


      {transactions.length === 0 && (
        <p className="text-gray-400">
          No transactions yet
        </p>
      )}


      <div className="space-y-4">

        {transactions.map((transaction) => (

          <div
            key={transaction.id}
            className="flex justify-between items-center"
          >

            <div>

            <p className="text-gray-400 text-sm">
  {new Date(transaction.date).toLocaleDateString()}
</p>

              <p className="font-bold">
                {transaction.note || "No note"}
              </p>

              <p className="text-gray-400 text-sm">
                {categoryIcons[transaction.category]}{" "}
{transaction.category.charAt(0).toUpperCase() +
 transaction.category.slice(1)}
              </p>

            </div>

 <div className="flex gap-3 mt-2">

  <button
    onClick={() => onEdit(transaction)}
    className="text-blue-400 text-sm"
  >
    Edit
  </button>


  <button
    onClick={() => deleteTransaction(transaction.id)}
    className="text-red-400 text-sm"
  >
    Delete
  </button>

</div>
            <div className="text-right">

              <p
                className={
                  transaction.type === "income"
                    ? "text-green-400 font-bold"
                    : "text-red-400 font-bold"
                }
              >

                {transaction.type === "income"
                  ? "+"
                  : "-"}
                
                ${transaction.amount.toFixed(2)}

              </p>


              <p className="text-gray-400 text-sm">

                {new Date(transaction.date)
                  .toLocaleDateString()}

              </p>

            </div>


          </div>

        ))}

      </div>

    </div>
  );
}