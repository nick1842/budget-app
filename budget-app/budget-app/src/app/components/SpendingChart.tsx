"use client";

import { useEffect, useState } from "react";

const categoryIcons: Record<string, string> = {
  food: "🍔",
  gas: "⛽",
  bills: "🏠",
  shopping: "🛒",
  entertainment: "🎮",
  school: "🎓",
  other: "💵",
};


export default function SpendingChart({
  refresh,
  range,
}: {
  refresh: number;
  range: string;
}) {

  const [spending, setSpending] = useState<Record<string, number>>({});


  useEffect(() => {

    async function loadSpending() {

      const res = await fetch("/api/transactions");
      const transactions = await res.json();


      const now = new Date();
      const startDate = new Date();


      if (range === "week") {

        startDate.setDate(
          now.getDate() - now.getDay()
        );

      } else if (range === "month") {

        startDate.setDate(1);

      } else {

        startDate.setFullYear(2000);

      }


      startDate.setHours(0,0,0,0);


      const totals: Record<string, number> = {};


      transactions.forEach((transaction: any) => {

        const date = new Date(transaction.date);


        if (
          transaction.type === "expense" &&
          date >= startDate
        ) {

          totals[transaction.category] =
            (totals[transaction.category] || 0) +
            transaction.amount;

        }

      });


      setSpending(totals);

    }


    loadSpending();

  }, [refresh, range]);


  const total = Object.values(spending)
    .reduce((a,b) => a+b, 0);


  return (
    <div className="bg-zinc-900 rounded-2xl p-6 mt-8">

      <h2 className="text-xl font-bold mb-5">
        📊 Spending Breakdown
      </h2>


      {Object.keys(spending).length === 0 ? (

        <p className="text-gray-400">
          No spending yet
        </p>

      ) : (

        <div className="space-y-4">

          {Object.entries(spending)
  .sort((a, b) => b[1] - a[1])
  .map(([category, amount]) => {

  const percent =
    total === 0
      ? 0
      : (amount / total) * 100;


            return (

              <div key={category}>

                <div className="flex justify-between mb-1">

                  <span>
                    {categoryIcons[category]} {category}
                  </span>

                  <span>
                    ${amount.toFixed(2)}
                  </span>

                </div>


                <div className="h-3 bg-black rounded-full">

                  <div
                    className="h-3 bg-green-500 rounded-full"
                    style={{
                      width: `${percent}%`,
                    }}
                  />

                </div>

              </div>

            );

          })}

        </div>

      )}

    </div>
  );
}