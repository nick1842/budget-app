import BudgetApp from "./components/BudgetApp";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">

      <div className="max-w-5xl mx-auto p-6">

        <h1 className="text-3xl font-bold">
          Budget Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Track your money and stay locked in.
        </p>

      </div>

      <BudgetApp />

    </div>
  );
}