"use client";

import { useState } from "react";

import HomePage from "./pages/HomePage";
import BudgetsPage from "./pages/BudgetsPage";
import SavingsPage from "./pages/SavingsPage";
import TransactionsPage from "./pages/TransactionsPage";

import BottomNav from "./BottomNav";


type Transaction = {
  id: number;
  amount: number;
  type: string;
  category: string;
  note: string | null;
};


export default function BudgetApp() {


  const [page, setPage] = useState("home");


  const [refresh, setRefresh] = useState(0);


  const [budgetRefresh, setBudgetRefresh] =
    useState(0);


  const [range, setRange] =
    useState("month");


  const [editingBudget, setEditingBudget] =
    useState<any>(null);


  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);



  function refreshData() {

    setRefresh((value) => value + 1);

  }



  function refreshBudgets() {

    setBudgetRefresh((value) => value + 1);

  }



  return (

    <div className="w-full">


      <main
        className="
        w-full
        max-w-2xl
        mx-auto
        px-4
        pb-28
        "
      >


        {page === "home" && (

          <HomePage

            refresh={refresh}

            range={range}

            setRange={setRange}

          />

        )}



        {page === "budgets" && (

          <BudgetsPage

            refresh={refresh}

            refreshBudgets={refreshBudgets}

            editingBudget={editingBudget}

            setEditingBudget={setEditingBudget}

          />

        )}



        {page === "savings" && (

          <SavingsPage

            refreshData={refreshData}

          />

        )}



        {page === "transactions" && (

          <TransactionsPage

            refresh={refresh}

            refreshData={refreshData}

            editingTransaction={editingTransaction}

            setEditingTransaction={
              setEditingTransaction
            }

          />

        )}


      </main>



      <BottomNav

        setPage={setPage}

      />


    </div>

  );

}