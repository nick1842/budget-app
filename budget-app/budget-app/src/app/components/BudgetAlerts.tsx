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

  const [budgets, setBudgets] = useState<any[]>([]);
  const [spending, setSpending] = useState<Record<string, number>>({});
  const [weekRange, setWeekRange] = useState("");


  async function deleteBudget(id: number) {

    if (!confirm("Delete this budget?")) {
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


    setBudgets((current) =>
      current.filter(
        (budget) => budget.id !== id
      )
    );


    
  }



  useEffect(() => {

    async function loadData() {

      const budgetRes = await fetch("/api/budgets");
      const budgetData = await budgetRes.json();


      const transactionRes = await fetch("/api/transactions");
      const transactions = await transactionRes.json();



      const today = new Date();


      // Monday start of week
      const startOfWeek = new Date(today);

      const day = today.getDay();

      const difference = day === 0 ? 6 : day - 1;

      startOfWeek.setDate(
        today.getDate() - difference
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

      displayEnd.setDate(
        displayEnd.getDate() - 1
      );


      setWeekRange(
        `${formatDate(startOfWeek)} - ${formatDate(displayEnd)}`
      );



      const totals: Record<string, number> = {};



      transactions.forEach((transaction: any) => {

        const transactionDate = new Date(
          transaction.date
        );


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

    <div className="space-y-6">

      <div>

        <h2 className="text-xl font-bold">
          Weekly Budget Progress
        </h2>

        <p className="text-gray-400">
          Week: {weekRange}
        </p>

      </div>



      {budgets.length === 0 && (

        <p className="text-gray-400">
          No budgets created yet.
        </p>

      )}



      <div className="space-y-6">

        {budgets.map((budget) => {


          const spent =
            spending[budget.category] || 0;


          const rawPercent =
            budget.amount > 0
              ? (spent / budget.amount) * 100
              : 0;


          const percent =
            Math.min(rawPercent, 100);



          let message = "";
          let color = "";



          if (rawPercent >= 100) {

            message = "🚨 Over budget";
            color = "text-red-400";

          } else if (rawPercent >= 75) {

            message = "🟠 Getting close";
            color = "text-orange-400";

          } else if (rawPercent >= 50) {

            message = "🟡 Halfway there";
            color = "text-yellow-400";

          } else {

            message = "🟢 Looking good";
            color = "text-green-400";

          }



          return (

            <div
              key={budget.id}
              className="bg-black rounded-xl p-4"
            >

              <div className="flex justify-between">

                <div>

                  <h3 className="font-bold text-lg">

                    {categoryIcons[budget.category]}{" "}
                    {budget.category}

                  </h3>


                  <p className="text-gray-400 text-sm">

                    Weekly limit: ${budget.amount.toFixed(2)}

                  </p>

                </div>



                <div className="text-right">

                  <p>
                    ${spent.toFixed(2)}
                    {" / "}
                    ${budget.amount.toFixed(2)}
                  </p>


                  <p className="text-gray-400 text-sm">

                    {rawPercent.toFixed(0)}% used

                  </p>


                  <p className={color}>

                    {message}

                  </p>

                </div>

              </div>



              <div className="h-3 bg-zinc-800 rounded-full mt-4">

                <div
                  className={`
                    h-3
                    rounded-full
                    ${
                      rawPercent >= 100
                        ? "bg-red-500"
                        : rawPercent >= 75
                        ? "bg-orange-400"
                        : rawPercent >= 50
                        ? "bg-yellow-400"
                        : "bg-green-500"
                    }
                  `}
                  style={{
                    width: `${percent}%`,
                  }}
                />

              </div>



              <div className="flex gap-4 mt-4">

                

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

    </div>

  );
}