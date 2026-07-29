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


export default function BudgetAlerts({
  refresh,
}: {
  refresh: number;
}) {

  const [alerts, setAlerts] = useState<any[]>([]);


  useEffect(() => {

    async function loadAlerts() {

      const budgetRes = await fetch("/api/budgets");
      const budgets = await budgetRes.json();


      const transactionRes = await fetch("/api/transactions");
      const transactions = await transactionRes.json();


      const totals: Record<string, number> = {};


      transactions.forEach((transaction: any) => {

        if (transaction.type === "expense") {

          totals[transaction.category] =
            (totals[transaction.category] || 0) +
            transaction.amount;

        }

      });


      const warnings: any[] = [];


      budgets.forEach((budget: any) => {

        const spent = totals[budget.category] || 0;

        const percent =
          (spent / budget.amount) * 100;


        if (percent >= 75) {

          warnings.push({
            category: budget.category,
            spent,
            amount: budget.amount,
            percent,
          });

        }

      });


      setAlerts(warnings);

    }


    loadAlerts();

  }, [refresh]);


  if (alerts.length === 0) {
    return null;
  }


  return (
    <div className="bg-zinc-900 rounded-2xl p-5 mt-8">

      <h2 className="font-bold text-xl mb-4">
        ⚠️ Budget Alerts
      </h2>


      <div className="space-y-3">

        {alerts.map((alert) => (

          <div
            key={alert.category}
            className="bg-black rounded-xl p-3"
          >

            <p>

              {categoryIcons[alert.category]}{" "}

              {alert.category} is{" "}

              {alert.percent >= 100
                ? "over budget 🚨"
                : `${alert.percent.toFixed(0)}% used`
              }

            </p>


            <p className="text-gray-400 text-sm">

              ${alert.spent.toFixed(2)} / ${alert.amount.toFixed(2)}

            </p>

          </div>

        ))}

      </div>

    </div>
  );
}