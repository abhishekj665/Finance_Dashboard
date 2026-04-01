// src/features/transactions/chartSelectors.ts

import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";

export const selectMonthlyData = createSelector(
  [(state: RootState) => state.transactions.list],
  (transactions) => {
    const monthlyMap: Record<string, { income: number; expense: number }> = {};

    transactions.forEach((tx) => {
      const month = tx.date.slice(0, 7); // "2026-04"

      if (!monthlyMap[month]) {
        monthlyMap[month] = { income: 0, expense: 0 };
      }

      if (tx.type === "income") {
        monthlyMap[month].income += tx.amount;
      } else {
        monthlyMap[month].expense += tx.amount;
      }
    });

    return Object.entries(monthlyMap).map(([month, data]) => ({
      month,
      ...data,
    }));
  }
);

// chartSelectors.ts (add this)

export const selectCategoryData = createSelector(
  [(state: RootState) => state.transactions.list],
  (transactions) => {
    const map: Record<string, number> = {};

    transactions.forEach((tx) => {
      if (tx.type === "expense") {
        map[tx.category] = (map[tx.category] || 0) + tx.amount;
      }
    });

    return Object.entries(map).map(([name, value]) => ({
      name,
      value,
    }));
  }
);