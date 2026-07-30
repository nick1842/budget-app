"use client";

export default function DashboardHeader() {
  return (
    <div className="bg-zinc-900 rounded-2xl p-6 mt-6">

      <h1 className="text-2xl font-bold">
        🤫
      </h1>

      <p className="text-gray-400 mt-1">
        Stay on top of your money
      </p>


      <div className="grid grid-cols-2 gap-3 mt-6">

        <div className="bg-black rounded-xl p-4">
          <p className="text-gray-400 text-sm">
            Income
          </p>

          <p className="text-xl font-bold text-green-400">
            $0.00
          </p>
        </div>


        <div className="bg-black rounded-xl p-4">
          <p className="text-gray-400 text-sm">
            Saved
          </p>

          <p className="text-xl font-bold text-blue-400">
            $0.00
          </p>
        </div>

      </div>


    </div>
  );
}