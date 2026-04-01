import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";

export const selectInsights = createSelector(
  [(state: RootState) => state.transactions.list],
  (transactions) => {
    if (!transactions.length) return null;

    let totalIncome = 0;
    let totalExpense = 0;

    const categoryMap: Record<string, number> = {};

    transactions.forEach((tx) => {
      if (tx.type === "income") {
        totalIncome += tx.amount;
      } else {
        totalExpense += tx.amount;

        categoryMap[tx.category] = (categoryMap[tx.category] || 0) + tx.amount;
      }
    });

    // highest expense category
    const topCategory = Object.entries(categoryMap).sort(
      (a, b) => b[1] - a[1],
    )[0];

    const sorted = [...transactions].sort((a, b) =>
      a.date.localeCompare(b.date),
    );

    const currentMonth = sorted.filter((tx) => tx.date.startsWith("2026-04"));

    const prevMonth = sorted.filter((tx) => tx.date.startsWith("2026-03"));

    const currentExpense = currentMonth
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const prevExpense = prevMonth
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const change =
      prevExpense === 0
        ? 0
        : ((currentExpense - prevExpense) / prevExpense) * 100;

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      topCategory: topCategory?.[0],
      topCategoryAmount: topCategory?.[1],
      change: change.toFixed(1)
    };
  },
);
