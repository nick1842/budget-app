"use client";

import { useState } from "react";
import DashboardStats from "./DashboardStats";
import SpendingBreakdown from "./SpendingBreakdown";
import SpendingChart from "./SpendingChart";
import BudgetAlerts from "./BudgetAlerts";
import DashboardHeader from "./DashboardHeader";
import DashboardActions from "./DashboardActions";

type Transaction = {
  id: number;
  amount: number;
  type: string;
  category: string;
  note: string | null;
};


export default function BudgetApp() {

  const [refresh, setRefresh] = useState(0);
  const [budgetRefresh, setBudgetRefresh] = useState(0);
  const [range, setRange] = useState("month");

const [editingTransaction, setEditingTransaction] =
  useState<Transaction | null>(null);

const [editingBudget, setEditingBudget] = useState<any>(null);

const [savingsRefresh, setSavingsRefresh] = useState(0);



  function refreshData() {
    setRefresh((value) => value + 1);
  }

  function refreshBudgets() {
  setBudgetRefresh((value) => value + 1);
}

  return (
  <div className="w-full">
    <button
      onClick={() => alert("BUTTON WORKS")}
      className="bg-green-500 text-black p-10 rounded-xl"
    >
      TEST BUTTON
    </button>
  </div>
);
}