"use client";

import BudgetManager from "../BudgetManager";
import BudgetProgress from "../BudgetProgress";


export default function BudgetsPage({

  refresh,

  refreshBudgets,

  editingBudget,

  setEditingBudget,

}: any) {


  return (

    <div>

      <BudgetProgress

        refresh={refresh}

        onEdit={setEditingBudget}

        onBudgetChanged={refreshBudgets}

      />


      <button

        className="
        mt-5
        bg-green-500
        text-black
        font-bold
        rounded-xl
        px-5
        py-3
        "

      >

        + Create Budget

      </button>


      <BudgetManager

        onBudgetChanged={refreshBudgets}

        editingBudget={editingBudget}

        clearEditing={() =>
          setEditingBudget(null)
        }

      />


    </div>

  );

}