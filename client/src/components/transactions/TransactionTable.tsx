// components/transactions/TransactionsTable.tsx

import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CategoryIcon from "@mui/icons-material/Category";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRole } from "../../context/RoleContext";
import { useThemeMode } from "../../context/ThemeContext";
import { selectFilteredTransactions } from "../../features/transactions/selector";
import {
  addTransaction,
  updateTransaction,
} from "../../features/transactions/transactionSlice";
import type { AppDispatch, RootState } from "../../redux/store";
import type { Transaction } from "../../types";

const categories = [
  "Salary",
  "Food",
  "Rent",
  "Transport",
  "Shopping",
  "Freelance",
];
const rowsPerPage = 5;

const getDefaultFormValues = (): Transaction => ({
  id: "",
  date: new Date().toISOString().split("T")[0],
  amount: 0,
  category: "Food",
  type: "expense",
});

const TransactionsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const transactions = useSelector(selectFilteredTransactions);
  const totalTransactions = useSelector(
    (state: RootState) => state.transactions.list.length,
  );
  const { role } = useRole();
  const { isDarkMode } = useThemeMode();
  const isAdmin = role === "admin";
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [editingTransactionId, setEditingTransactionId] = useState<
    string | null
  >(null);
  const [formValues, setFormValues] =
    useState<Transaction>(getDefaultFormValues);

  const dialogTitle = editingTransactionId
    ? "Edit Transaction"
    : "Add Transaction";
  const totalPages = Math.ceil(transactions.length / rowsPerPage);
  const paginatedTransactions = transactions.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  useEffect(() => {
    setPage(1);
  }, [transactions]);

  const handleOpenAddDialog = () => {
    setEditingTransactionId(null);
    setFormValues(getDefaultFormValues());
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (transaction: Transaction) => {
    setEditingTransactionId(transaction.id);
    setFormValues(transaction);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingTransactionId(null);
    setFormValues(getDefaultFormValues());
  };

  const handleChange = (field: keyof Transaction, value: string) => {
    setFormValues((current) => ({
      ...current,
      [field]: field === "amount" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    if (!formValues.category || !formValues.date || formValues.amount <= 0) {
      return;
    }

    const transactionPayload: Transaction = {
      ...formValues,
      id: editingTransactionId ?? Date.now().toString(),
    };

    if (editingTransactionId) {
      dispatch(updateTransaction(transactionPayload));
    } else {
      dispatch(addTransaction(transactionPayload));
    }

    handleCloseDialog();
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Paper
      className={
        isDarkMode
          ? "animate-fade-up transition-surface overflow-hidden rounded-2xl bg-slate-900 shadow-sm"
          : "animate-fade-up transition-surface overflow-hidden rounded-2xl shadow-sm"
      }
    >
      <div className="flex flex-col gap-3 px-5 pt-5 pb-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Typography variant="h6" className="font-semibold">
            Transactions
          </Typography>
          <Typography className={isDarkMode ? "text-sm text-slate-400" : "text-sm text-gray-500"}>
            {isAdmin
              ? "Admin can add and edit transactions"
              : "Viewer has read-only access"}
          </Typography>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:justify-end">
          <Typography className={isDarkMode ? "text-sm text-slate-400" : "text-sm text-gray-500"}>
            {totalTransactions} total
          </Typography>

          {isAdmin && (
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={handleOpenAddDialog}
            >
              Add
            </Button>
          )}
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className={isDarkMode ? "px-5 py-10 text-center text-slate-400" : "px-5 py-10 text-center text-gray-500"}>
          No transactions found
        </div>
      ) : (
        <TableContainer sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow className={isDarkMode ? "bg-slate-800" : "bg-gray-50"}>
                <TableCell>Date</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Type</TableCell>
                <TableCell align="right">Amount</TableCell>
                {isAdmin && <TableCell align="center">Actions</TableCell>}
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedTransactions.map((tx) => {
                const isIncome = tx.type === "income";

                return (
                  <TableRow
                    key={tx.id}
                    hover
                    className="transition-surface"
                  >
                    <TableCell>
                      <Typography
                        variant="body2"
                        className={isDarkMode ? "text-slate-300" : "text-gray-600"}
                      >
                        {tx.date}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CategoryIcon
                          className={isDarkMode ? "text-slate-500" : "text-gray-400"}
                          fontSize="small"
                        />
                        <Typography variant="body2">{tx.category}</Typography>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={tx.type}
                        size="small"
                        color={isIncome ? "success" : "error"}
                        variant="outlined"
                      />
                    </TableCell>

                    <TableCell align="right">
                      <div className="flex justify-end items-center gap-1">
                        {isIncome ? (
                          <ArrowUpwardIcon
                            className="text-green-500"
                            fontSize="small"
                          />
                        ) : (
                          <ArrowDownwardIcon
                            className="text-red-500"
                            fontSize="small"
                          />
                        )}

                        <Typography
                          className={`font-semibold ${
                            isIncome ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {isIncome ? "+" : "-"} Rs.{" "}
                          {tx.amount.toLocaleString()}
                        </Typography>
                      </div>
                    </TableCell>

                    {isAdmin && (
                      <TableCell align="center">
                        <Button
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleOpenEditDialog(tx)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {transactions.length > rowsPerPage && (
        <div className="overflow-x-auto px-4 pb-5 pt-4">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            size="small"
            className="flex justify-center min-w-max"
          />
        </div>
      )}

      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{dialogTitle}</DialogTitle>

        <DialogContent className="space-y-4 pt-4!">
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={formValues.date}
            onChange={(event) => handleChange("date", event.target.value)}
            sx={{ marginBottom: "20px" }}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Category"
            select
            fullWidth
            value={formValues.category}
            onChange={(event) => handleChange("category", event.target.value)}
            sx={{ marginBottom: "20px" }}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Type"
            select
            fullWidth
            value={formValues.type}
            onChange={(event) => handleChange("type", event.target.value)}
            sx={{ marginBottom: "20px" }}
          >
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </TextField>

          <TextField
            label="Amount"
            type="number"
            fullWidth
            value={formValues.amount}
            onChange={(event) => handleChange("amount", event.target.value)}
            sx={{ marginBottom: "20px" }}
          />
        </DialogContent>

        <DialogActions className="px-6 pb-4">
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editingTransactionId ? "Save Changes" : "Add Transaction"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default TransactionsTable;
