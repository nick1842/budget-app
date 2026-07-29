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


export default function SpendingBreakdown({
  refresh,
}: {
  refresh: number;
}) {

  const [spending, setSpending] = useState<Record<string, number>>({});


  useEffect(() => {

    async function loadSpending() {

      const response = await fetch("/api/transactions");

      const transactions = await response.json();


      const totals: Record<string, number> = {};


      transactions.forEach((transaction: any) => {

        if (transaction.type === "expense") {

          if (!totals[transaction.category]) {
            totals[transaction.category] = 0;
          }

          totals[transaction.category] += transaction.amount;

        }

      });


      setSpending(totals);

    }


    loadSpending();

  }, [refresh]);


  return (
    <div className="bg-zinc-900 rounded-2xl p-6 mt-8">

      <h2 className="text-xl font-bold mb-5">
        Spending Breakdown
      </h2>


      {Object.keys(spending).length === 0 && (
        <p className="text-gray-400">
          No expenses yet
        </p>
      )}


      <div className="space-y-4">

        {Object.entries(spending).map(([category, amount]) => (

          <div
            key={category}
            className="flex justify-between"
          >

            <span>
              {categoryIcons[category]}{" "}
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>


            <span className="font-bold text-red-400">
              ${amount.toFixed(2)}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}