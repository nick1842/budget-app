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

export default function BudgetProgress({
  refresh,
  onEdit,
  onBudgetChanged,
}: {
  refresh: number;
  onEdit: (budget: any) => void;
  onBudgetChanged: () => void;
}) {
  const [budgets, setBudgets] = useState<any[]>([]);
const [spending, setSpending] = useState<Record<string, number>>({});
const [showHistory, setShowHistory] = useState(false);
const [weekRange, setWeekRange] = useState("");


  async function deleteBudget(id: number) {
    if (!confirm("Are you sure you want to delete this budget?")) {
      return;
    }

    await fetch("/api/budgets", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });


    setBudgets((currentBudgets) =>
      currentBudgets.filter(
        (budget) => budget.id !== id
      )
    );
  }


  useEffect(() => {
    async function loadData() {

      const budgetRes = await fetch("/api/budgets");
      const budgetData = await budgetRes.json();
console.log("Budget data:", budgetData);

      const transactionRes = await fetch("/api/transactions");
      const transactions = await transactionRes.json();


      const totals: Record<string, number> = {};


      const today = new Date();

      const startOfWeek = new Date(today);

startOfWeek.setDate(
  today.getDate() - today.getDay()
);

      startOfWeek.setHours(0, 0, 0, 0);


      const endOfWeek = new Date(startOfWeek);

      endOfWeek.setDate(
        startOfWeek.getDate() + 7
      );

      const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });


const displayEnd = new Date(endOfWeek);

displayEnd.setDate(displayEnd.getDate() - 1);


setWeekRange(
  `${formatDate(startOfWeek)} - ${formatDate(displayEnd)}`
);

      transactions.forEach((transaction: any) => {

        const transactionDate = new Date(transaction.date);


        if (
          transaction.type === "expense" &&
          transactionDate >= startOfWeek &&
          transactionDate < endOfWeek
        ) {

          totals[transaction.category] =
            (totals[transaction.category] || 0) +
            transaction.amount;

        }

      });


      setBudgets(budgetData);
      setSpending(totals);

    }


    loadData();

  }, [refresh]);


  return (
    <div className="bg-zinc-900 rounded-2xl p-6 mt-8">


      <button
        onClick={() => setShowHistory(!showHistory)}
        className="bg-zinc-800 rounded-xl px-4 py-2 mb-4"
      >
        Weekly History {showHistory ? "▲" : "▼"}
      </button>


      <h2 className="text-xl font-bold">
  Budget Progress
</h2>

<p className="text-gray-400 mb-5">
  Week: {weekRange}
</p>


      <div className="space-y-6">

        {budgets.map((budget) => {

          const spent = spending[budget.category] || 0;


          const rawPercent =
  (spent / budget.amount) * 100;

const percent = Math.min(rawPercent, 100);


let warning = "";
let warningColor = "";


if (rawPercent >= 100) {

  warning = "🚨 WOAH WOAH WOAH";
  warningColor = "text-red-400";

} else if (rawPercent >= 90) {

  warning = "🔴 watch it pal";

  warningColor = "text-red-400";

} else if (rawPercent >= 75) {

  warning = "🟠 Bro is NOT a baller";

  warningColor = "text-orange-400";

} else if (rawPercent >= 50) {

  warning = "🟡 nice i suppose";

  warningColor = "text-yellow-400";

} else {

  warning = "🟢 wow what a cool guy!";

  warningColor = "text-green-400";

}


          return (
            <div key={budget.id}>


              <div className="flex justify-between mb-2">

                <div>
  <span>
    {categoryIcons[budget.category]}{" "}
    {budget.category}
  </span>

  <p className="text-gray-400 text-sm">
    Created:{" "}
    {new Date(budget.createdAt).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    )}
  </p>
</div>


                <div className="text-right">

  <span>
    ${spent.toFixed(2)} / ${budget.amount.toFixed(2)}
  </span>

<p className="text-gray-400 text-sm">
  {rawPercent.toFixed(0)}% used
</p>

  <p className={warningColor}>
    {warning}
  </p>

</div>

              </div>


              <div className="h-3 bg-black rounded-full">

  <div
    className={`h-3 rounded-full ${
      rawPercent >= 100
        ? "bg-red-500"
        : rawPercent >= 90
        ? "bg-red-400"
        : rawPercent >= 75
        ? "bg-orange-400"
        : rawPercent >= 50
        ? "bg-yellow-400"
        : "bg-green-500"
    }`}
    style={{
      width: `${Math.min(rawPercent, 100)}%`,
    }}
  />

</div>


              <div className="flex gap-4 mt-3">

                <button
                  onClick={() => onEdit(budget)}
                  className="text-blue-400"
                >
                  ✏️ Edit
                </button>


                <button
                  onClick={() => deleteBudget(budget.id)}
                  className="text-red-400"
                >
                  🗑 Delete
                </button>

              </div>


            </div>
          );

        })}

      </div>


      {showHistory && (
        <div className="mt-6 bg-black rounded-xl p-4">

          <h3 className="font-bold mb-3">
            Previous Weeks
          </h3>


          <p className="text-gray-400">
            History will appear here
          </p>

        </div>
      )}


    </div>
  );
}