"use client";

import AddTransaction from "../AddTransaction";
import RecentTransactions from "../RecentTransactions";


export default function TransactionsPage({

  refresh,

  refreshData,

  editingTransaction,

  setEditingTransaction,

}: any) {


  return (

    <>

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


    </>

  );

}