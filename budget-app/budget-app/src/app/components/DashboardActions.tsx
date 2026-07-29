"use client";

import { useState } from "react";
import BudgetManager from "./BudgetManager";
import BudgetProgress from "./BudgetProgress";
import SavingsGoals from "./SavingsGoals";
import AddTransaction from "./AddTransaction";
import RecentTransactions from "./RecentTransactions";

export default function DashboardActions({
  refresh,
  refreshData,
  refreshBudgets,
  editingBudget,
  setEditingBudget,
  editingTransaction,
  setEditingTransaction,
}: any) {

  const [open, setOpen] = useState<string | null>(null);
const [showBudgetForm, setShowBudgetForm] = useState(false);
const [showSavingsForm, setShowSavingsForm] = useState(false);


  return (
    <div className="space-y-5 mt-8">


      {/* Budgets */}

      <div className="bg-zinc-900 rounded-2xl p-5">

        <h2 className="text-xl font-bold">
          💳 Budgets
        </h2>

        <p className="text-gray-400 mt-2">
          Manage your spending limits
        </p>

        


        <div className="mt-5">

  <BudgetProgress
    refresh={refresh}
    onEdit={setEditingBudget}
    onBudgetChanged={refreshData}
  />


  <button
  type="button"
  onClick={() => alert("BUTTON WORKED")}
  style={{
    background: "green",
    color: "black",
    padding: "20px",
    borderRadius: "20px",
    width: "100%",
  }}
>
  TEST BUTTON
</button>


  {showBudgetForm && (
    <div className="mt-5">

      <BudgetManager
        onBudgetChanged={refreshBudgets}
        editingBudget={editingBudget}
        clearEditing={() => setEditingBudget(null)}
      />

    </div>
  )}

</div>

      </div>



      {/* Savings */}

      <div className="bg-zinc-900 rounded-2xl p-5">

        <h2 className="text-xl font-bold">
          💰 Savings
        </h2>

        <p className="text-gray-400 mt-2">
          Track your savings goals
        </p>


        <div className="mt-5">

  <SavingsGoals
    onSavingsChanged={refreshData}
    showCreateButton={showSavingsForm}
  />


  <button
    onClick={() =>
      setShowSavingsForm(!showSavingsForm)
    }
    className="
bg-green-500
text-black
font-bold
rounded-xl
px-4
py-3
select-none
touch-manipulation
cursor-pointer
"
  >
    + Create Savings Goal
  </button>

</div>

      </div>



      {/* Transactions */}

      <div className="bg-zinc-900 rounded-2xl p-5">

        <h2 className="text-xl font-bold">
          📋 Transactions
        </h2>

        <p className="text-gray-400 mt-2">
          Add and review transactions
        </p>


        <button
          onClick={() =>
            setOpen(open === "transactions" ? null : "transactions")
          }
          className="
bg-green-500
text-black
font-bold
rounded-xl
px-4
py-3
select-none
touch-manipulation
cursor-pointer
"
        >
          View Transactions
        </button>


        {open === "transactions" && (
          <div className="mt-5">

            <AddTransaction
              onTransactionAdded={refreshData}
              editingTransaction={editingTransaction}
              clearEditing={() =>
                setEditingTransaction(null)
              }
            />

            <RecentTransactions
              refresh={refresh}
              onTransactionChanged={refreshData}
              onEdit={setEditingTransaction}
            />

          </div>
        )}

      </div>


    </div>
  );
}