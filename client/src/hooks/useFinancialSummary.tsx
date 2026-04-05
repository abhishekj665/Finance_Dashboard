import { useMemo } from "react";
import { mockTransactions } from "../data/mockData";

export const useFinancialSummary = () => {
  return useMemo(() => {
    const income = mockTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = mockTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, []);
};
