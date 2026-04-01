import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { Transaction } from "../../types";

import { mockTransactions } from "../../data/mockData";

interface Filters {
  search: string;
  type: "income" | "expense" | "";
  category: string;
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
  },
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setType(state, action: PayloadAction<string>) {
      state.filters.type = action.payload as any;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.filters.category = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.filters.search = action.payload;
    },
    resetFilters(state) {
      state.filters = {
        search: "",
        type: "",
        category: "",
      };
    },
  },
});

export const { setType, setCategory, setSearch } = transactionSlice.actions;

export default transactionSlice.reducer;
