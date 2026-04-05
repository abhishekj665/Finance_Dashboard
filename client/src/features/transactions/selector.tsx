

import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";

const selectTransactions = (state: RootState) => state.transactions.list;
const selectFilters = (state: RootState) => state.transactions.filters;

export const selectFilteredTransactions = createSelector(
  [selectTransactions, selectFilters],
  (list, filters) => {
    return list.filter((tx) => {
      const matchSearch = tx.category
        .toLowerCase()
        .includes(filters.search.toLowerCase());

      const matchType = filters.type === "" || tx.type === filters.type;

      const matchCategory =
        filters.category === "" || tx.category === filters.category;

      const matchStartDate =
        filters.startDate === "" || tx.date >= filters.startDate;

      const matchEndDate = filters.endDate === "" || tx.date <= filters.endDate;

      return (
        matchSearch &&
        matchType &&
        matchCategory &&
        matchStartDate &&
        matchEndDate
      );
    });
  }
);
