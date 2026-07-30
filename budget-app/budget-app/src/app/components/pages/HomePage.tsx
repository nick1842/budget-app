"use client";

import DashboardHeader from "../DashboardHeader";
import DashboardStats from "../DashboardStats";
import SpendingChart from "../SpendingChart";
import SpendingBreakdown from "../SpendingBreakdown";
import BudgetAlerts from "../BudgetAlerts";


export default function HomePage({
  refresh,
  range,
  setRange,
}: any) {


  return (

    <>

      <DashboardHeader />


      <BudgetAlerts
        refresh={refresh}
      />


      <DashboardStats

        refresh={refresh}

        range={range}

        setRange={setRange}

      />


      <SpendingChart

        refresh={refresh}

        range={range}

      />


      <SpendingBreakdown

        refresh={refresh}

      />


    </>

  );

}