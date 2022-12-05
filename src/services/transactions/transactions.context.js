import React, { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "../authentication/auth.context";
export const TransactionContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(null);

  const updateTransactions = (data) => {
    setTransactions(data)
  }
 
  return (
    <TransactionContext.Provider value={{ transactions, updateTransactions }}>
    {children}
    </TransactionContext.Provider>
  )
}