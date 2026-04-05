// src/components/dashboard/FiltersBar.tsx

import { Button, TextField, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useThemeMode } from "../../context/ThemeContext";
import {
  resetFilters,
  setSearch,
  setType,
  setCategory,
  setStartDate,
  setEndDate,
} from "../../features/transactions/transactionSlice";

const FiltersBar = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useThemeMode();
  const filters = useSelector((state: RootState) => state.transactions.filters);

  return (
    <div
      className={`animate-fade-up transition-surface grid grid-cols-1 gap-4 rounded-2xl p-4 shadow-sm sm:grid-cols-2 xl:grid-cols-12 ${
        isDarkMode ? "bg-slate-900" : "bg-white"
      }`}
    >
      {/* Search (smaller) */}
      <div className="w-full sm:col-span-2 xl:col-span-4">
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
        fullWidth
        size="small"
        label="Type"
        value={filters.type}
        onChange={(e) =>
          dispatch(setType(e.target.value as "income" | "expense" | ""))
        }
        className="xl:col-span-2"
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="income">Income</MenuItem>
        <MenuItem value="expense">Expense</MenuItem>
      </TextField>

      {/* Category (wider) */}
      <TextField
        select
        fullWidth
        size="small"
        label="Category"
        value={filters.category}
        onChange={(e) => dispatch(setCategory(e.target.value))}
        className="xl:col-span-2"
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Food">Food</MenuItem>
        <MenuItem value="Rent">Rent</MenuItem>
        <MenuItem value="Shopping">Shopping</MenuItem>
        <MenuItem value="Transport">Transport</MenuItem>
        <MenuItem value="Salary">Salary</MenuItem>
        <MenuItem value="Freelance">Freelance</MenuItem>
      </TextField>

      <TextField
        fullWidth
        size="small"
        label="From"
        type="date"
        value={filters.startDate}
        onChange={(e) => dispatch(setStartDate(e.target.value))}
        InputLabelProps={{ shrink: true }}
        className="xl:col-span-2"
      />

      <TextField
        fullWidth
        size="small"
        label="To"
        type="date"
        value={filters.endDate}
        onChange={(e) => dispatch(setEndDate(e.target.value))}
        InputLabelProps={{ shrink: true }}
        className="xl:col-span-2"
      />

      <div className="sm:col-span-2 xl:col-span-12 xl:flex xl:justify-end">
        <Button
          variant="outlined"
          onClick={() => dispatch(resetFilters())}
          className="h-10 w-full sm:w-auto"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default FiltersBar;
