import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { Transaction } from "../../types";

import { mockTransactions } from "../../data/mockData";

interface Filters {
  search: string;
  type: "income" | "expense" | "";
  category: string;
  startDate: string;
  endDate: string;
}

interface TransactionState {
  list: Transaction[];
  filters: Filters;
}

const initialState: TransactionState = {
  list: mockTransactions,
  filters: {
    search: "",
    type: "",
    category: "",
    startDate: "",
    endDate: "",
  },
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.list.unshift(action.payload);
    },
    updateTransaction(state, action: PayloadAction<Transaction>) {
      const index = state.list.findIndex((tx) => tx.id === action.payload.id);

      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    setType(state, action: PayloadAction<string>) {
      state.filters.type = action.payload as any;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.filters.category = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.filters.search = action.payload;
    },
    setStartDate(state, action: PayloadAction<string>) {
      state.filters.startDate = action.payload;
    },
    setEndDate(state, action: PayloadAction<string>) {
      state.filters.endDate = action.payload;
    },
    resetFilters(state) {
      state.filters = {
        search: "",
        type: "",
        category: "",
        startDate: "",
        endDate: "",
      };
    },
  },
});

export const {
  addTransaction,
  updateTransaction,
  setType,
  setCategory,
  setSearch,
  setStartDate,
  setEndDate,
  resetFilters,
} = transactionSlice.actions;

export default transactionSlice.reducer;
