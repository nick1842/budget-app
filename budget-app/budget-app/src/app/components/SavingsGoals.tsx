"use client";

import { useEffect, useState } from "react";

export default function SavingsGoals({
  onSavingsChanged,
  showCreateButton = true,
}: {
  onSavingsChanged: () => void;
  showCreateButton?: boolean;
}) {

  const [goals, setGoals] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);
const [addingTo, setAddingTo] = useState<number | null>(null);
const [contributionAmount, setContributionAmount] = useState("");
const [editingGoal, setEditingGoal] = useState<any>(null);
const [editingContribution, setEditingContribution] = useState<any>(null);
const [editAmount, setEditAmount] = useState("");

  async function loadGoals() {
  const res = await fetch("/api/savings");
  const data = await res.json();

  setGoals(data);
}


useEffect(() => {
  loadGoals();
}, []);
useEffect(() => {
  if (editingGoal) {
    setName(editingGoal.name);
    setTarget(editingGoal.target.toString());
  }
}, [editingGoal]);

async function addMoney(goalId: number) {
  console.log("Adding money to goal:", goalId);
  console.log("Amount:", contributionAmount);

  if (!contributionAmount) return;

  const response = await fetch("/api/savings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      goalId,
      amount: Number(contributionAmount),
    }),
  });

  const data = await response.json();

  console.log("API response:", data);

  setContributionAmount("");
  setAddingTo(null);

  loadGoals();
  onSavingsChanged();
}

async function deleteGoal(id: number) {

  if (!confirm("Delete this savings goal?")) {
    return;
  }

  await fetch("/api/savings", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  });

  loadGoals();
  onSavingsChanged();
}

async function deleteContribution(id: number) {

  if (!confirm("Delete this contribution?")) {
    return;
  }

  const res = await fetch("/api/savings", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      type: "contribution",
    }),
  });

  const data = await res.json();

  console.log("Delete response:", data);

  loadGoals();
  onSavingsChanged();
}

async function updateContribution() {

  await fetch("/api/savings", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: editingContribution.id,
      amount: Number(editAmount),
    }),
  });

  setEditingContribution(null);
  setEditAmount("");

  loadGoals();
  onSavingsChanged();
}

async function createGoal() {

  if (!name || !target) return;

  setLoading(true);

  await fetch("/api/savings", {
    method: editingGoal ? "PATCH" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
  id: editingGoal?.id,
  name,
  target: Number(target),
}),
  });

  setName("");
  setTarget("");

setEditingGoal(null);

  await loadGoals();

onSavingsChanged();

  setLoading(false);
}

  return (
    <div className="bg-zinc-900 rounded-2xl p-6 mt-8">


      <h2 className="text-xl font-bold mb-5">
        💰 Savings Goals
      </h2>


      <div className="space-y-5">

        {goals.map((goal) => {

          const percent = Math.min(
            (goal.saved / goal.target) * 100,
            100
          );


          return (
            <div
              key={goal.id}
              className="bg-black rounded-xl p-4"
            >

              <h3 className="font-bold text-lg">
                {goal.name}
              </h3>


              <p className="text-gray-400">
  ${(goal.saved || 0).toFixed(2)} / ${goal.target.toFixed(2)}
</p>

<button
  onClick={() => {
    console.log("Clicked goal:", goal.id);
    setAddingTo(Number(goal.id));
  }}
  className="mt-3 bg-green-500 text-black rounded-xl px-4 py-2 font-bold"
>
  ➕ Add Money/Edit Goal
</button>
                
{addingTo === Number(goal.id) && (
  <div className="mt-3">

    <input
  className="w-full bg-zinc-900 rounded-xl p-3 mb-2"
  placeholder="Amount"
  type="number"
  inputMode="decimal"
  value={contributionAmount}
  onChange={(e) => setContributionAmount(e.target.value)}
/>

    <div className="flex gap-2">
      <button
        onClick={() => addMoney(Number(goal.id))}
        className="bg-blue-500 rounded-xl px-4 py-2"
      >
        Save
      </button>

      <button
        onClick={() => {
          setAddingTo(null);
          setContributionAmount("");
        }}
        className="bg-zinc-700 rounded-xl px-4 py-2"
      >
        Cancel
      </button>
    </div>
<div className="flex gap-3 mt-3">

  <button
    onClick={() => setEditingGoal(goal)}
    className="text-blue-400"
  >
    ✏️ Edit
  </button>

{editingGoal && (
  <button
    onClick={() => {
      setEditingGoal(null);
      setName("");
      setTarget("");
    }}
    className="ml-3 text-gray-400"
  >
    Cancel
  </button>
)}
  <button
    onClick={() => deleteGoal(goal.id)}
    className="text-red-400"
  >
    🗑 Delete
  </button>

</div>


  </div>
)}

{goal.contributions?.length > 0 && (
  <div className="mt-4 bg-zinc-900 rounded-xl p-3">

    <h4 className="font-bold mb-2">
      Recent Contributions
    </h4>

    <div className="space-y-2">

      {goal.contributions.slice(0, 5).map((item: any) => (
  <div
    key={item.id}
    className="flex justify-between items-center text-sm"
  >

    <span className="text-gray-400">
      {new Date(item.date).toLocaleDateString()}
    </span>

    <div className="flex items-center gap-3">

      <span className="text-green-400">
        +${item.amount.toFixed(2)}
      </span>

      <button
        onClick={() => {
          setEditingContribution(item);
          setEditAmount(item.amount.toString());
        }}
        className="text-blue-400"
      >
        ✏️
      </button>

      <button
        onClick={() => deleteContribution(item.id)}
        className="text-red-400"
      >
        🗑
      </button>

    </div>

  </div>
))}

{editingContribution && (
  <div className="mt-3">

    <input
  className="w-full bg-black rounded-xl p-3"
  type="number"
  inputMode="decimal"
  value={editAmount}
  onChange={(e) => setEditAmount(e.target.value)}
/>

    <button
      onClick={updateContribution}
      className="mt-2 bg-blue-500 rounded-xl px-4 py-2"
    >
      Save Change
    </button>

  </div>
)}

    </div>

  </div>
)}

              <div className="h-3 bg-zinc-800 rounded-full mt-3">

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


      {showCreateButton && (
  <div className="mt-6">

    <input
      className="w-full bg-black rounded-xl p-3 mb-3"
      placeholder="Goal name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />


    <input
      className="w-full bg-black rounded-xl p-3 mb-3"
      placeholder="Target amount"
      type="number"
      inputMode="decimal"
      value={target}
      onChange={(e) => setTarget(e.target.value)}
    />


    <button
      onClick={createGoal}
      disabled={loading}
      className="bg-green-500 text-black font-bold rounded-xl px-5 py-3 w-full sm:w-auto"
    >
      {loading
        ? "Saving..."
        : editingGoal
        ? "Update Goal"
        : "Create Goal"}
    </button>

  </div>
)}

    </div>
  );
}