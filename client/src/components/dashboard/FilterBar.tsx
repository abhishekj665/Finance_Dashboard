// src/components/dashboard/FiltersBar.tsx

import { TextField, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import {
  setSearch,
  setType,
  setCategory,
} from "../../features/transactions/transactionSlice";

const FiltersBar = () => {
  const dispatch = useDispatch();

  const filters = useSelector((state: RootState) => state.transactions.filters);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4">
      {/* Search (smaller) */}
      <div className="w-full md:w-1/3">
        <TextField
          fullWidth
          size="small"
          placeholder="Search by category..."
          value={filters.search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
      </div>

      {/* Type (wider) */}
      <TextField
        select
        size="small"
        label="Type"
        value={filters.type}
        onChange={(e) =>
          dispatch(setType(e.target.value as "income" | "expense" | ""))
        }
        className="w-full md:w-1/4"
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="income">Income</MenuItem>
        <MenuItem value="expense">Expense</MenuItem>
      </TextField>

      {/* Category (wider) */}
      <TextField
        select
        size="small"
        label="Category"
        value={filters.category}
        onChange={(e) => dispatch(setCategory(e.target.value))}
        className="w-full md:w-1/4"
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Food">Food</MenuItem>
        <MenuItem value="Rent">Rent</MenuItem>
        <MenuItem value="Shopping">Shopping</MenuItem>
        <MenuItem value="Transport">Transport</MenuItem>
        <MenuItem value="Salary">Salary</MenuItem>
        <MenuItem value="Freelance">Freelance</MenuItem>
      </TextField>
    </div>
  );
};

export default FiltersBar;
