"use client";

import SavingsGoals from "../SavingsGoals";


export default function SavingsPage({

  refreshData,

}: any) {


  return (

    <SavingsGoals

      onSavingsChanged={refreshData}

    />

  );

}