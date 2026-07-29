"use client";

import { useEffect, useState } from "react";

export default function DashboardStats({
  refresh,
  range,
  setRange,
}: {
  refresh: number;
  range: string;
  setRange: React.Dispatch<React.SetStateAction<string>>;
}) {

  const [stats, setStats] = useState({
  income: 0,
  expenses: 0,
  saved: 0,
  balance: 0,
});




  useEffect(() => {

    async function loadStats() {

      const transactionRes = await fetch("/api/transactions");
      const transactions = await transactionRes.json();


      const savingsRes = await fetch("/api/savings");
      const goals = await savingsRes.json();


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

      let income = 0;
      let expenses = 0;


      transactions.forEach((transaction: any) => {

  const transactionDate = new Date(transaction.date);

  if (transactionDate < startDate) {
    return;
  }

        if (transaction.type === "income") {
          income += transaction.amount;
        }

        if (transaction.type === "expense") {
          expenses += transaction.amount;
        }

      });


      let saved = 0;

goals.forEach((goal: any) => {

  goal.contributions?.forEach((contribution: any) => {

    const contributionDate = new Date(contribution.date);

    if (contributionDate >= startDate) {
      saved += contribution.amount;
    }

  });

});

      setStats({
        income,
        expenses,
        saved,
        balance: income - expenses,
      });

    }


    loadStats();

  }, [refresh, range]);


  return (
  <div className="mt-8">

    <div className="mb-4">
      <select
        className="bg-zinc-900 rounded-xl p-3"
        value={range}
        onChange={(e) => setRange(e.target.value)}
      >
        <option value="week">
          This Week
        </option>

        <option value="month">
          This Month
        </option>

        <option value="all">
          All Time
        </option>

      </select>
    </div>


    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

      <div className="bg-zinc-900 rounded-2xl p-5">
        <p className="text-gray-400">
          💵 Income
        </p>

        <h2 className="text-2xl font-bold text-green-400">
          ${stats.income.toFixed(2)}
        </h2>
      </div>
      </div>


      <div className="bg-zinc-900 rounded-2xl p-5">
        <p className="text-gray-400">
          💸 Expenses
        </p>

        <h2 className="text-2xl font-bold text-red-400">
          ${stats.expenses.toFixed(2)}
        </h2>
      </div>


      <div className="bg-zinc-900 rounded-2xl p-5">
        <p className="text-gray-400">
          💰 Saved
        </p>

        <h2 className="text-2xl font-bold text-blue-400">
          ${stats.saved.toFixed(2)}
        </h2>
      </div>


      <div className="bg-zinc-900 rounded-2xl p-5">
        <p className="text-gray-400">
          📈 Balance
        </p>

        <h2 className="text-2xl font-bold">
          ${stats.balance.toFixed(2)}
        </h2>
      </div>


    </div>
  );
}